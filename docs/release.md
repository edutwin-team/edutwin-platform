# Release Front

Ce document décrit le processus de release du front du projet de manière simple et structurée.

## 1. Déploiement automatique

Le projet est hébergé sur Netlify et le déploiement est automatique.

### Environnement de développement

Pour déployer en environnement de développement, il suffit de :

1. attendre que la pipeline passe sur la PR ;
2. merger la PR sur la branche develop.

## 2. Mise en production

Pour préparer une release en production, suivre la procédure suivante :

1. Travailler sur la branche develop.
2. Mettre à jour la version dans le fichier package.json.
   - utiliser un patch pour une correction mineure ;
   - utiliser un minor pour une nouvelle fonctionnalité ;
   - utiliser un major pour un changement important.
3. Créer un commit avec un message de type :
   - `Release: 1.1.0 EDT-000`
4. Ouvrir une pull request de develop vers main.
5. Désactiver l’option squash afin de conserver tous les commits.
6. Attendre la fin de la pipeline.
7. Merger la PR.
8. Vérifier que le déploiement en production s’effectue automatiquement.

## 3. Vérification après la release

Après le merge, vérifier le site de production à l’adresse suivante :

- https://develop--edutwin.netlify.app/

### Contrôles à effectuer

- confirmer que la bonne version est bien affichée ;
- survoler le logo avec la souris pour vérifier la version affichée.

## 4. Checklist rapide

- [ ] la PR est prête ;
- [ ] la version a bien été mise à jour dans package.json ;
- [ ] le commit de release a bien été créé ;
- [ ] la PR develop -> main est ouverte ;
- [ ] le squash est désactivé ;
- [ ] la pipeline est verte ;
- [ ] la version est vérifiée sur le site de production.
