# Extinction-minijeux.fr - Code source client HTML

Ce repo contient le code source de la version client HTML qui était en cours de développement, voici les principales fonctionnalités qu'elle comprend :
- Inscription/Connexion/Visiteur
- Chat (principal, chuchotements, teams, etc.)
- Messagerie privée
- Forum
- Bouboum
- Aaaah

## Code source serveur
Nous ne fournissons pas le code source du serveur, consultez le site-web : https://sites.google.com/view/extinction-minijeux et la partie "Obtenir le code source" si
vous êtes vraiment intéressé pour le récupérer.

## Environnement nécessaire
- NodeJS installé et configuré dans votre PATH
- Être à l'aise avec JavaScript (https://developer.mozilla.org/fr/docs/Web/JavaScript), VueJS (https://vuejs.org/) & PixiJS (https://www.pixijs.com/)

### Installation
- Récupérer le code source de ce projet (git clone)
- Lancer la commande `npm install` pour récupérer & installer les dépendances
- Il vous faudra donc récupérer le code source serveur et le lancer en local, pensez à vérifier que le port 
- Avant tout 1er lancement, modifier le fichier `src/Global.js` et les variables `$config.ipLocale` et/ou `$config.ipOnline`
(si `$config.local` = `true` alors `$config.ipLocale` est utilisée, sinon `$config.ipOnline` est utilisée)

### Lancement & compilation en temps réel
- Lancer la commande `npm run serve`, puis se connecter sur http://localhost:8080, vous obtiendrez une version compilée en temps réel. Chaque modification du code source
rechargera automatiquement la compilation.

### Compilation prête à déployer
- Lancer la commande `npm run build`, puis récupérer le contenu du dossier `dist` et l'héberger sur un serveur-web

## Support
Nous ne pouvons pas nous engager à fournir un support, mais nous sommes présent sur le discord oficiel Extinction (https://discordapp.com/invite/YHX4uVR)
