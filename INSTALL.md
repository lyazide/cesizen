# GUIDE D'INSTALLATION MANUEL
## PREREQUIS
Avant de commencer l’installation, assurez-vous d’avoir :
•	Node.js installé (v18+ recommandé) - Télécharger Node.js
•	npm ou yarn pour la gestion des dépendances
•	Un accès à la base de données utilisée par CESIZEN (PostgreSQL, MySQL, etc.)


## TELECHARGER LE PROJET
	Cloner le projet depuis GitHub (ou récupérer le code source) :
git clone https://github.com/.git cd CESIEZN

## INSTALLER LES DEPENDANCES
Dans le dossier du projet, installez les dépendances :
```bash
npm install # OU avec Yarn yarn install
```
Cela installera tous les modules nécessaires pour faire fonctionner l’application.

## CONFIGURATION
Créer le fichier .env.local et y ajouter les variables d’environnement :
```yaml
NEXTAUTH_URL=http://localhost:3000 
NEXTAUTH_SECRET=your-secret-key 
DATABASE_URL=postgresql://user:password@localhost:5432/cesizen
```
⚠️ Remplacez user, password, et cesizen par les informations de votre base de données.

## INITIALISER LA BASE DE DONNEES
Exécutez :
```bash
npx prisma migrate dev
```
Sinon, exécutez les commandes de migration propres à votre base de données.

## LANCER L'APPLICATION
Démarrer en mode développement :
```bash
npm run dev*
```
Ouvrez votre navigateur et accédez à http://localhost:3000 pour tester l’application.
Démarrer en mode production :
```bash
npm run build
npm start
```

## VERIFICATION
•	Accédez à http://localhost:3000 et connectez-vous.
•	Testez les routes /dashboard, /signin, /signup pour voir si tout fonctionne bien.
•	Consultez les logs dans le terminal en cas d’erreur (CTRL + C pour stopper et relancer l’application).

##	PROBLEMES COURANTS ET SOLUTIONS
•	Erreur NEXTAUTH_URL ? → Vérifiez votre fichier .env.local
•	Base de données non connectée ? → Assurez-vous que DATABASE_URL est correct
•	Problème de permissions (403) ? → Vérifiez votre middleware.ts
