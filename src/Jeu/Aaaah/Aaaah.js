import * as Jeu from "../Jeu.js";
import * as AEH from "./AaaahEventHandler.js";
import Partie from "./Partie/Partie.js";
import Directions, * as AG from "./Global.js";
import Global from "../../Global.js";
import * as PIXI from "pixi.js";

var TEMPS_TIC = 0;

/**
 * Classe principale du jeu Aaaah
 */
class Aaaah extends Jeu.Jeu {
   /**
    * Constructeur.
    * 
    * @param {ZoneJeux} container Zone dans laquelle le jeu doit se dérouler.
    * @param {Reseau} reseau Interface réseau pour communiquer.
    * @param {Object} etat Ensemble de variables globales à l'application
    * @param {int} width Longueur de l'interface de jeu.
    * @param {int} height Hauteur de l'interface de jeu.
    */
    constructor(container, reseau, etat, width, height) {
      super(container, AG.MODE_RUN, reseau, etat, width, height);
      this.adaptateur = 0; // permet de réguler les IPS.
      TEMPS_TIC = Date.now();

      this.gl = this.pixi.view.getContext('webgl2');

      // La partie en cours
      this.partie = new Partie(this);

      // Gestion des évènements
      this.eventHandler = new AEH.AaaahEventHandler(this);
    }

    /**
     * Hérité.
     */
    start() {
      super.start();
      Global.$etat.instanceListeJoueur.entrerDansPartie('Aaaah');
      this.reseau.Envoie("CxJ#2");
    }

    /**
     * Hérité.
     */
    initTicker() {
      PIXI.settings.TARGET_FPMS = AG.IPS * 0.001;
   }

   /**
    * Hérité.
    */
   quitter() {
      super.quitter();

      Global.$etat.instanceListeJoueur.entrerDansPartie('');
      this.reseau.Envoie("CxJ#0");
      this.supprimer();
      delete this;
   }

   /**
    * Supprime proprement l'instance du jeu.
    */
   supprimer() {
      for (let i = this.stage.children.length - 1; i >= 0; i--) {	
         this.stage.removeChild(this.stage.children[i]);
      }

      for (let i = this.foreground.children.length - 1; i >= 0; i--) {	
         this.foreground.removeChild(this.foreground.children[i]);
      }

      delete this.partie;
   }

   /**
    * Hérité.
    */
   traiterReponse(code, message, data) {
      switch(code) {
         case "IdL":
            this.IdL(message);
            break;

         case "IdIC":
            // TODO : init du record et du taux de survie
            break;

         case "IdO":
            this.IdO(message);
            break;

         case "ChI":
            this.ChI(message);
            break;

         case "IdP":
            this.IdP(message);
            break;

         case "ChP":
            // TODO : fin guidage
            break;

         case "EdV":
            // TODO : fin de carte (vote)
            break;

         case "IdJ":
            this.IdJ(message);
            break;

         case "IdD":
            this.IdD(message);
            break;

         case "IdA":
         case "IdB":
            this.cri(message);
            break;

         case "MvG":
         case "MvD":
         case "MvH":
         case "MvS":
         case "MvA":
            this.deplacementAdversaires(message);
            break;

         case "DeS":
         case "DeT":
            this.guidage(message);
            break;

         case "IdX":
            this.mort(message);
            break;

         case "IdW":
            this.victoire(message);
            break;

         case "ZoP":
         case "ZoC":
            this.contamination(message);
            break;

         default:
            super.traiterReponse(code, message, data);
      }
   }

   /**
    * Hérité.
    */
   tic(deltaFactor) {
      this.adaptateur += deltaFactor;

      // Adapte les FPS
      while(this.adaptateur > 1) {
         this.adaptateur--;
         TEMPS_TIC = Date.now();

         if(this.partie) {
            this.partie.tic();
         }
      }
   }

   /**
    * Gestion des évènement lorsqu'une touche est pressée.
    */
   keyDown(event) {
      if(this.eventHandler) {
      this.eventHandler.keyDown(event);
      return;
      }
   }
  
   /**
    * Gestion des évènements lorsqu'une touche est relachée.
    */
   keyUp(event) {
      if(this.eventHandler) {
         this.eventHandler.keyUp(event);
         return;
      }
   }

   /**
    * Gestion des évènements de souris.
    */
   mouseEvent(event, type) {
      if(this.eventHandler) {
         this.eventHandler.mouseEvent(event, type);
      }
   }

   /**
    * Gestion des évènements de redimensionnement de fenêtre.
    */
   resizeEvent(event) {
      if(this.eventHandler) {
         this.eventHandler.resizeEvent(event);
      }
   }

   /**
    * Hérité.
    */
   estAaaah() {
      return true;
   }

   /**
    * @returns L'instance de la partie.
    */
   getPartie() {
      return this.partie;
   }

   /**
    * Chargement des données des joueurs à l'arrivée sur la map.
    * 
    * @param {Array} message Données.
    */
   IdL(message) {
      let infos = message[5].split(",");
      this.getPartie().setJoueurPrincipal(infos[0]);
      Global.$etat.instanceListeJoueur.addJoueur(infos[0], false, 0);

      for(let i = 6; i < message.length; ++i) {
         infos = message[i].split(",");
         this.getPartie().ajouterAdversaire(infos[0]);
         Global.$etat.instanceListeJoueur.addJoueur(infos[0], false, parseInt(infos[1], 10));
      }
   }

   /**
    * Mise à jour des données sur le bloc de droite.
    * 
    * @param {Array} message Données.
    */
   ChI(message) {
      this.getPartie().setGuide(message[1]);
      this.getPartie().setTempsDepart(parseInt(message[2], 10));
      this.getPartie().setInfosJoueurs(message[4]);
   }

   /**
    * Chargement d'une map ou d'un monde officiel.
    * 
    * @param {Array} message Données.
    */
   IdO(message) {
      this.getPartie().setGuide(message[1]);
      this.getPartie().setNbJoueurDepart(parseInt(message[2], 10));
      let code = message[3];

      if(code.indexOf("<C") == 0 && message.length == 6) {
         this.getPartie().chargerMap(code, message[5]);
      }
      else {
         let numeroMonde = parseInt(code, 10);

         if(!isNaN(numeroMonde)) {
            this.getPartie().chargerMonde(numeroMonde);
         }
      }

      let infosJoueurs = message[4].split(";");
      for(let i = 0; i < infosJoueurs.length; ++i) {
         this.updateCoord(infosJoueurs[i]);
      }
   }

   /**
    * Mise à jour des données des joueurs en fin de map.
    * 
    * @param {Array} message Données.
    */
   IdP(message) {
      for(let i = 1; i < message.length; ++i) {
         this.updateCoord(message[i]);
      }
   }

   /**
    * Gestion des nouveaux joueurs.
    * 
    * @param {Array} message Doonées.
    */
   IdJ(message) {
      let infos = message[1].split(",");
      let joueur = this.getPartie().ajouterAdversaire(infos[0]);
      Global.$etat.instanceListeJoueur.addJoueur(infos[0], false, 0);

      if(joueur) {
         this.updateCoord(message[1]);
      }
   }

   /**
    * Gestion des déconnexions.
    * 
    * @param {Array} message Données.
    */
   IdD(message) {
      this.getPartie().supprimerAdversaire(message[1]);
      Global.$etat.instanceListeJoueur.removeJoueur(message[1]);
   }

   /**
    * Mise à jour des données des joueurs.
    * 
    * @param {Array} message Données.
    */
   updateCoord(message) {
      let infos = message.split(",");
      let joueur = this.getPartie().getJoueur(infos[0]);

      if(joueur) {
         joueur.setX(parseInt(infos[1], 10));
         joueur.setY(parseInt(infos[2], 10));
         Global.$etat.instanceListeJoueur.setDonnees(joueur.pseudo, 'score', infos[4]);
      }
   }

   /**
    * Gestion des déplacements des adversaires.
    * 
    * @param {Array} message Données.
    */
   deplacementAdversaires(message) {
      let pseudo = message[message.length-1];
      let joueur = this.getPartie().getJoueur(pseudo);

      if(joueur && joueur.pseudo != this.refEtat.joueur.nom) {

         joueur.setX(parseInt(message[1], 10));
         joueur.setY(parseInt(message[2], 10));

         switch(message[0]) {
            case "MvH":
               joueur.sauter();
               break;
            
            case "MvS":
               joueur.stop();
               break;

            case "MvD":
               joueur.setDirection(Directions.AvancerDroite);
               break;

            case "MvG":
               joueur.setDirection(Directions.AvancerGauche);
               break;

            case "MvA":
               joueur.setX(parseInt(message[1], 10));
               joueur.setY(parseInt(message[2], 10));
               joueur.setVitesseX(Math.floor(parseInt(message[3], 10)/100));
               joueur.setVitesseY(Math.floor(parseInt(message[4], 10)/100));
               break;
         }
      }
   }

   /**
    * Gestion des informations relatives au guidage.
    * 
    * @param {Array} message Données.
    */
   guidage(message) {
      let guidage = this.getPartie().getGuidage();

      if(!guidage.estGuide()) {
         let x = parseInt(message[1], 10);
         let y = parseInt(message[2], 10);

         switch(message[0]) {
            case "DeS":
               guidage.initialiserTrait(x, y);
               break;

            case "DeT":
               guidage.ajouterTrait(x, y);
               break;
         }
      }
   }

   /**
    * Prise en compte des morts.
    * 
    * @param {Array} message Données.
    */
   mort(message) {
      let pseudo = message[1];
      let joueur = this.getPartie().getJoueur(pseudo);

      if(joueur) {
         this.getPartie().tuerJoueur(joueur);
      }
   }

   /**
    * Prise en compte des arrivées à la pharmacie.
    * 
    * @param {Array} message Données.
    */
   victoire(message) {
      let pseudo = message[1];
      let joueur = this.getPartie().getJoueur(pseudo);

      if(joueur) {
         this.getPartie().gagnerJoueur(joueur, parseInt(message[2], 10));
      }
   }

   /**
    * Gestion des cris.
    * 
    * @param {Array} message Données.
    */
   cri(message) {
      if(message.length === 4 || message.length === 5) {
         let joueur = this.getPartie().getJoueur(message[(message[0] == "IdA" ? 4 : 3)]);

         if(joueur && joueur.pseudo != this.refEtat.joueur.nom) {
            // Projection
            if(message[0] == "IdA") {
               joueur.projeter(message[3] == "1");
            }
            // Pousser
            else {
               joueur.crier();
               joueur.pousser(parseInt(message[1], 10), parseInt(message[2], 10));
            }
         }
      }
   }

   /**
    * Gestion de la contamination.
    * 
    * @param {Array} message Données.
    */
   contamination(message) {
      let joueur = this.getPartie().getJoueur(message[1]);

      if(joueur) {
         if(message[0] === "ZoP") {
            this.getPartie().contaminer(joueur, false);
         }
         else {
            this.getPartie().contaminer(joueur, true);
         }
      }
   }
}

export {
   TEMPS_TIC,
   Aaaah
}