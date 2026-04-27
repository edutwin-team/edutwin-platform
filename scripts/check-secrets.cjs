const { execSync } = require('child_process');

// fichiers stagés
const files = execSync('git diff --cached --name-only', {
  encoding: 'utf-8',
})
  .split('\n')
  .filter(Boolean);

// 🔥 fichiers interdits (.env + similaires)
const forbiddenPatterns = [
  /^\.env(\..*)?$/, // .env, .env.local, .env.production...
  /^meta\.env$/, // meta.env
];

// ❌ secrets hardcodés
const secretPatterns = [
  /API_KEY\s*=\s*['"`][^'"`]+['"`]/i,
  /SECRET\s*=\s*['"`][^'"`]+['"`]/i,
  /TOKEN\s*=\s*['"`][^'"`]+['"`]/i,
  /PASSWORD\s*=\s*['"`][^'"`]+['"`]/i,
];

const ignoredFiles = ['scripts/check-secrets.cjs'];

let found = false;

// 1. check fichiers interdits
for (const file of files) {
  const isForbidden = forbiddenPatterns.some((p) => p.test(file));

  if (isForbidden) {
    console.error(`❌ Fichier .env interdit détecté : ${file}`);
    console.error('👉 Utilise un .env.example à la place\n');
    found = true;
  }
}

// 2. scan contenu des fichiers
for (const file of files) {
  if (ignoredFiles.includes(file)) continue;

  try {
    const content = execSync(`git show :${file}`, {
      encoding: 'utf-8',
    });

    const lines = content.split('\n');

    for (const line of lines) {
      const trimmed = line.trim();

      // ❌ ignorer commentaires
      if (trimmed.startsWith('//') || trimmed.startsWith('/*') || trimmed.startsWith('*')) {
        continue;
      }

      // ✅ autoriser Vite env
      if (trimmed.includes('import.meta.env')) continue;

      // ❌ détecter secrets en dur
      const isSecret = secretPatterns.some((p) => p.test(trimmed)) || trimmed.includes('meta.env');

      if (isSecret) {
        console.error(`❌ Secret suspect détecté dans ${file}`);
        console.error(`   → ${trimmed}`);
        found = true;
      }
    }
  } catch (e) {
    // ignore fichiers binaires
  }
}

if (found) {
  console.error('\n🚨 Commit bloqué : sécurité détectée.');
  process.exit(1);
}

console.log('✅ OK : aucun secret détecté');
