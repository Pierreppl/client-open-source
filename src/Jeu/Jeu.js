const JEU_AAAAH = 0;
const JEU_BOUBOUM = 1;
const JEU_FORTERESSE = 2;

import * as PIXI from 'pixi.js';

class Jeu {
   constructor(container, mode, reseau, etat, width, height) {
      this.container = container;

      this.lsJoueurs = [];
      this.mode = mode;
      this.joueur = null;

      this.width = width;
      this.height = height;
      
      // Background
      this.reseau = reseau;
      this.refEtat = etat;
      this.refChat = etat.instanceChat;
      this.refListeJoueurs = etat.instanceListeJoueurs;
      
      this.pixi = new PIXI.Application({
         width: width,
         height: height,
         antialias: true,
         transparent: true,
         resolution: 1
      });
      this.stage = this.pixi.stage;

      // Foreground
      this.pixiForeground = new PIXI.Application({
         width: width,
         height: height,
         antialias: true,
         transparent: true,
         resolution: 1
      });
      this.foreground = this.pixiForeground.stage;
      this.persoForto = etat.joueur.optGene.optForto.personnage;
      this.sexeFeminin = this.persoForto == 0 || this.persoForto == 2;
   }

   traiterReponse(code, message, data) {
      //id de la map en cours. 1: id
      if (code == "CxIMEC") {
         // Le serveur envoie un code d'identification de la map.
         // Tous les messages envoyés par le joueur au serveur doivent etre prefixés par ce code.
         // Le code a toujours 5 chiffres, si le serveur envoie un code dont la taille est plus petit que 5, il faut le préfixer de 0
         this.reseau.idMapPartieEnCours = "00000".substring(0, 5-message[1].length) + message[1];
      }
   }

   start() {
      console.log("START");
      this.reseau.registerTraitementReponse(this);
      this.refEtat.jeu = this;

      let that = this;
      this.ticker = PIXI.Ticker.shared;
      this.initTicker(this.ticker)
      
      this.ticker.autoStart = false;

      this.ticker.add((deltaFactor) => {
         that.tic(deltaFactor);
      });
      this.ticker.start();
   }

   // Override this method in the game to change its target FPS
   initTicker() {
      PIXI.settings.TARGET_FPMS = 0.06;
   }

   quitter() {
      if (this.ticker != null) {
         this.ticker.stop();
         this.ticker.destroy();
      }
      this.reseau.stopRegTraitementReponse(this);
      this.container.cleanCanvas();
   }

   changerMode(mode) {
      this.mode = mode;
   }

   getLsJoueurs() {
      return this.lsJoueurs;
   }

   getPixiView() {
      return this.pixi.view;
   }
   
   getForegroundView() {
      return this.pixiForeground.view;
   }

   getForegroundView() {
      return this.pixiForeground.view;
   }

   /**
    * Obtenir le joueur nommé <pseudo>.
    *
    * Si aucun <pseudo> n'est précisé (= null), le joueur
    * du client est donné.
    */
   getJoueur(pseudo=null) {
      if (pseudo === null)
         return this.joueur;

      if (this.joueur.pseudo === pseudo)
         return this.joueur;
      for (let i = this.lsJoueurs.length - 1; i >= 0; --i) {
         if (this.lsJoueurs[i].pseudo === pseudo) {
            return this.lsJoueurs[i];
         }
      }

      return null;
   }

   addJoueur(j) {
      lsJoueurs.push(j);
   }

   retirerJoueur(j) {
      let i = this.lsJoueurs.indexOf(j);

      if (i !== -1)
         this.lsJoueurs.splice(i, 1);
   }

   setIdMap(idMap) {
      this.idMap = idMap;
   }

   getIdMap() {
      return this.idMap;
   }

   getEventHandler() {
      return this;
   }

   tic(deltaFactor) {}

   estAaaah() {
      return false;
   }

   /* À override en fonction du jeu */

   estBouboum() {
      return false;
   }

   estForteresse() {
      return false;
   }

   envoieMessage(message) {
      this.reseau.Envoie(message);
   }
}

export { JEU_AAAAH, JEU_BOUBOUM, JEU_FORTERESSE,

         Jeu };
