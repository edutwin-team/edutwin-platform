const { execSync } = require('child_process');

//todo : use this file in huskey
// files
const files = execSync('git diff --cached --name-only', {
  encoding: 'utf-8',
})
  .split('\n')
  .filter(Boolean);

// 🔥 not allowed
const forbiddenPatterns = [
  /^\.env(\..*)?$/, // .env, .env.local, .env.production...
  /^meta\.env$/, // meta.env
];

// ❌ secrets
const secretPatterns = [
  /API_KEY\s*=\s*['"`][^'"`]+['"`]/i,
  /SECRET\s*=\s*['"`][^'"`]+['"`]/i,
  /TOKEN\s*=\s*['"`][^'"`]+['"`]/i,
  /PASSWORD\s*=\s*['"`][^'"`]+['"`]/i,
];

const ignoredFiles = ['scripts/check-secrets.cjs'];

let found = false;

// 1. check files
for (const file of files) {
  const isForbidden = forbiddenPatterns.some((p) => p.test(file));

  if (isForbidden) {
    console.error(`❌ Fichier .env interdit détecté : ${file}`);
    console.error('👉 Utilise un .env.example à la place\n');
    found = true;
  }
}

// 2. scan
for (const file of files) {
  if (ignoredFiles.includes(file)) continue;

  try {
    const content = execSync(`git show :${file}`, {
      encoding: 'utf-8',
    });

    const lines = content.split('\n');

    for (const line of lines) {
      const trimmed = line.trim();

      // ❌ ignore comment
      if (trimmed.startsWith('//') || trimmed.startsWith('/*') || trimmed.startsWith('*')) {
        continue;
      }

      // ✅ autorise vite
      if (trimmed.includes('import.meta.env')) continue;

      // ❌ detect secret
      const isSecret = secretPatterns.some((p) => p.test(trimmed)) || trimmed.includes('meta.env');

      if (isSecret) {
        console.error(`❌ Secret suspect détecté dans ${file}`);
        console.error(`   → ${trimmed}`);
        found = true;
      }
    }
  } catch (e) {
    // ignore files
  }
}

if (found) {
  console.error('\n🚨 Commit bloqué : sécurité détectée.');
  process.exit(1);
}

console.log('✅ OK : aucun secret détecté');
