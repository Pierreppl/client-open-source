import * as Jeu from "../Jeu.js";
import * as JB from "./JBouboum.js";
import * as BoumMap from "./BoumMap.js";
import * as BEH from "./BoumEventHandler.js";
import * as BoumCase from "./BoumCase.js";
import * as PIXI from 'pixi.js';
import { EXPLO_CENTRE, EXPLO_HORIZONTALE, EXPLO_VERTICALE, EXPLO_BAS, EXPLO_DROITE, EXPLO_GAUCHE, EXPLO_HAUT } from "./BoumCase.js";


const SANS_EQUIPE = -1;
const EQUIPE_ROUGE = 0;
const EQUIPE_BLEUE = 1;

const MODE_B_NORMAL = 0;
const MODE_B_TEAM = 1;
const MODE_B_CIBLE = 2;
const MODE_B_DRAPEAU = 3;
const MODE_B_BATAILLE_ROYALE = 4;

const IMAGES_PAR_SECONDES = 48;
const DELTA_T = 1 / IMAGES_PAR_SECONDES;

// Bonus

// ...

// @TODO : classes Bombe & Bonus à faire


class Bouboum extends Jeu.Jeu {
   constructor(container, reseau, etat, width, height, imgLoader) {
      super(container, MODE_B_NORMAL, reseau, etat, width, height);
      this.map = null;
      this.eventHandler = new BEH.BoumEventHandler(this);
      this.deplacementEnCours = false;
      this.bombesDispo = 1;
      this.puissanceBombe = 1;
      this.typeBombe = 0;
      this.bonusVitesse = 0;
      this.loader = imgLoader;
      this.partieInitialisee = false;
   }

   start() {
      this.reseau.Envoie("CxJ#1");
      super.start();
   }

   initTicker() {
      PIXI.settings.TARGET_FPMS = IMAGES_PAR_SECONDES * 0.001;
   }

   quitter() {
      this.reseau.Envoie("CxJ#0");
      this.destroy();
      super.quitter();
   }

   destroy() {
      this.lsJoueurs.forEach(j => j.destroy);
      this.map.destroy();
   }

   traiterReponse(code, message, data) {
      switch (code) {
         // Getting of a new map.
         case "SaN":
            this.nouvelleMapReseau(message);
            break;

         // Player placement at game start.
         case "SaJ":
            this.initPlayerPlacement(message);
            this.partieInitialisee = true;
            break;

         // Score reset
         case "SaR":
            break;

         // Message tous
         case "ChM":
            this.refChat.messageTousJeu(message[2], message[1]);
            break;

         /***** MOVEMENTS ******/
         case "MvD": case "MvG": case "MvH": case "MvB": case "MvS":
            if (!this.partieInitialisee) {
               return;
            }
            let joueur = this.getJoueur(message[3]);
            if (joueur == null) {
               return;
            }
            if (joueur.instanceJoueur) {
               return;
            }
            let colonne = message[1];
            let ligne = message[2];
            switch (code[2]) {
               // Right
               case "D":
                  this.deplacement(joueur, colonne, ligne, JB.DROITE);
                  return;
               // Left
               case "G":
                  this.deplacement(joueur, colonne, ligne, JB.GAUCHE);
                  return;
               // Up
               case "H":
                  this.deplacement(joueur, colonne, ligne, JB.HAUT);
                  return;
               // Down
               case "B":
                  this.deplacement(joueur, colonne, ligne, JB.BAS);
                  return;
               // Movement stop
               case "S":
                  this.arret(joueur, colonne, ligne, JB.DROITE);
                  return;
            }
            break;
         
         /***** BOMBS *****/
         // Drop a bomb
         case "BoP":
            ligne = parseInt(message[1]);
            colonne = parseInt(message[2]);
            joueur = this.getJoueur(message[3]);
            let type = parseInt(message[4]);
            this.map.addBombe(colonne, ligne, type, joueur);
            if (joueur.instanceJoueur) {
               this.retraitBombe();
            }
            break;
         // Bomb explosion
         case "BoE":
            ligne = parseInt(message[1]);
            colonne = parseInt(message[2]);
            let puissance = parseInt(message[3]);
            let propagation = parseInt(message[4]);
            let typeBombe = parseInt(message[5]);
            this.explosion(colonne, ligne, puissance, propagation, typeBombe);
            break;
         // Player's death
         case "BoM":
            let killer = this.getJoueur(message[2]);
            this.getJoueur(message[1]).mort(killer.pseudo, 0, false);
         // Getting a Bomb or a Power
         case "BoU":
            let is_bomb = message[1] == "0";
            if (is_bomb) {
               this.ajoutBombe(parseInt(message[2]));
            } else {
               this.puissanceBombe += parseInt(message[2]);
               this.updatePuissance();
            }
            break;
         
         // Apparition d'un bonus
         case "BoB":
            let bonusType = parseInt(message[1]);
            let bonusColonne = parseInt(message[2]);
            let bonusLigne = parseInt(message[3]);
            this.map.ajouterBonus(bonusType, bonusColonne, bonusLigne) 
            break;

         case "CxFPA": // Fin pose auto
            this.getJoueur().finPoseAuto();
            break;
         case "ChB": // Changer de bonus
            this.getJoueur(message[2]).changerBonusReseau(message[1]);
            this.updateBonus();
            break;
         case "ChBS": // Changer de bonus secondaire
            break; // @TODO
         case "ChS":
            this.refChat.messageInfo("Vous entrez dans le salon : <span style='color: #C9CD36;'>"
                  + this.refChat.msgSur(message[1]) + "</span>. Tapez /salon NomDuSalon pour créer ou rejoindre un salon.");
            break;
         case "ChLS":
            this.refChat.messageInfo(this.refChat.msgSur(message[1]));
            break;
         default:
            return super.traiterReponse(code, message, data);
      }

      return true;
   }

   nouvelleMapReseau(message) {
      if (this.map == null)
         this.map = new BoumMap.BoumMap(message[1], this.reseau, this.stage, this.loader);
      else
         this.map.chargerMap(message[1]);

      this.bombesDispo = 1;
      this.puissanceBombe = 1;
      this.updatePuissance();
      this.updateBombes();
      this.mouvementEnCours = false;
   }

   tic(deltaFactor) {
      this.lsJoueurs.forEach(joueur => joueur.tic(deltaFactor));
      if (this.map !== null) {
         this.map.rafraichir(deltaFactor);
      }
      // On regarde s'il est possible de poser une bombe lorsque espace est enfonce.
      if (this.eventHandler.espaceEnfonce) {
         this.poserBombe();
      }
   }

   estBouboum() {
      return true;
   }

   keyDown(event) {
      this.eventHandler.keyDown(event);
      return;
   }

   keyUp(event) {
      this.eventHandler.keyUp(event);
      return;
   }

   mouseEvent(event) {
      this.eventHandler.mouseEvent(event);
      return;
   }

   resizeEvent(event) {
      this.eventHandler.resizeEvent(event);
      return;
   }

   deplacement(joueur, colonneDepart, ligneDepart, direction) {
      joueur.colonneCourante = colonneDepart;
      joueur.ligneCourante = ligneDepart;

      if (joueur.instanceJoueur && joueur.vivant) {
         switch(direction) {
            case JB.HAUT:
               if (this.map.caseEstLibre(colonneDepart, ligneDepart - 1)) {
                  joueur.mouvementEnCours = direction;
                  this.envoieMessage("MvH#" + joueur.colonneCourante + "#" + joueur.ligneCourante);
               } else {
                  this.arret(joueur, colonneDepart, ligneDepart, true);
                  return;
               }
               break;
            case JB.BAS:
               if (this.map.caseEstLibre(colonneDepart, ligneDepart + 1)) {
                  joueur.mouvementEnCours = direction;
                  this.envoieMessage("MvB#" + joueur.colonneCourante + "#" + joueur.ligneCourante);
               } else {
                  this.arret(joueur, colonneDepart, ligneDepart, true);
                  return;
               }
               break;
            case JB.DROITE: 
               if (this.map.caseEstLibre(colonneDepart + 1, ligneDepart)) {
                  joueur.mouvementEnCours = direction;
                  this.envoieMessage("MvD#" + joueur.colonneCourante + "#" + joueur.ligneCourante);
               } else {
                  this.arret(joueur, colonneDepart, ligneDepart, true);
                  return;
               }
               break;
            case JB.GAUCHE: 
               if (this.map.caseEstLibre(colonneDepart - 1, ligneDepart)) {
                  joueur.mouvementEnCours = direction;
                  this.envoieMessage("MvG#" + joueur.colonneCourante + "#" + joueur.ligneCourante);
               } else {
                  this.arret(joueur, colonneDepart, ligneDepart, true);
                  return;
               }
               break;
            default:
               this.arret(joueur, colonneDepart, ligneDepart, true);
               return;
         }       
         this.deplacementEnCours = true;
      }

      joueur.setDirection(direction);

      // Partie commune a tous les joueurs à aficher deplacer
      joueur.skin.x = colonneDepart * BoumCase.CASE_TAILLE;
      joueur.skin.y = ligneDepart * BoumCase.CASE_TAILLE;
      joueur.directionCourante = direction;
   }

   arret(joueur, colonneArret, ligneArret, envoieMessageServeur) {
      joueur.colonneCourante = colonneArret;
      joueur.ligneCourante = ligneArret;
      joueur.skin.x = colonneArret * BoumCase.CASE_TAILLE;
      joueur.skin.y = ligneArret * BoumCase.CASE_TAILLE;

      if (joueur.instanceJoueur && this.deplacementEnCours) {
         this.deplacementEnCours = false;
         if (envoieMessageServeur) {
            this.envoieMessage("MvS#" + colonneArret + "#" + ligneArret);
         }
      }
      this.map.nettoyerCase(colonneArret, ligneArret, false);
      joueur.directionCourante = -1;
      // TODO: Actualiser la position du skin 
   }

   initPlayerPlacement(array) {
      // Reset joueurs
      this.lsJoueurs.forEach(j => j.destroy());
      //format: 1: name,column,line,score%victoiries 2: ...
      this.lsJoueurs = []
      const n = array.length;
      for (let i = 1; i < n; i++) {
         let j = array[i].split(',');
         let stats = j[3].split('%');
         let joueur = new JB.JBouboum(j[0], parseInt(j[2]), parseInt(j[1]), this, this.loader, this.foreground, j[0] === this.refEtat.joueur.nom);
         this.lsJoueurs.push(joueur);
         if (joueur.instanceJoueur) {
            this.joueur = joueur;
         }
      }
      this.deplacementEnCours = false;
   }

   /*
      Methode appellee lorsque le client demande de poser une bombe (pression espace)
   */
   poserBombe() {
      if (this.bombesDispo && this.joueur.vivant) {
         let colonne = this.joueur.colonneCourante;
         let ligne =  this.joueur.ligneCourante;
         if (this.deplacementEnCours) {
            colonne = this.joueur.getColonneFromPosition();
            ligne = this.joueur.getLigneFromPosition();
         } 
         if (this.map.caseEstLibre(colonne, ligne)) {
            this.envoieMessage("BoP#" + colonne + "#" + ligne);
         }
      }
   }

   /*
      Methode appellee lorsque le serveur notifie l'explosion d'une bombe
   */
   explosion(colonne, ligne, puissance, propagation, type) {
      // propagation: 0 : La bombe n'a pas ete reliee, 1 = reliee par la doite, 2 = gauche, 3 = bas, 4 = haut
      // ordre d'explosion: droite gauche bas haut
      let explos = [propagation != 1,  propagation != 2,  propagation != 3,  propagation != 4];
      let colonneExplo = colonne;
      let ligneExplo = ligne;
      // Incremente le nombre de bombe si c'est celle du client qui explose
      if (this.map.getPoseurBombe(colonne, ligne).instanceJoueur) {
         this.ajoutBombe(1);
      } 
      // Enleve la bombe de la map
      let bombe = this.map.map[colonne][ligne];
      let poseur = "JoueurInvisible";
      if (bombe.isBombe()) {
         poseur = bombe.poseur.pseudo;
      }
      this.map.removeBombe(colonne, ligne);
      // Explosion centrale
      this.map.explosionCase(colonneExplo, ligneExplo, type, false, EXPLO_CENTRE);
      
      let colonneJ = this.joueur.colonneCourante;
      let ligneJ = this.joueur.ligneCourante;

      if (colonneJ == colonneExplo && ligneJ == ligneExplo) {
         this.joueur.mort(poseur, type);
      }

      for (let i = 1; i <= puissance; i++) {
         for (let direction = 0; direction < explos.length; direction++) {
            // indice 0 = droite, 1 gauche, 2 bas, 3 haut
            if (direction < 2) {  
               colonneExplo = (direction % 2 == 0 ? colonne + i : colonne - i);
               let r = colonne + i;
               ligneExplo = ligne;
            } else {
               colonneExplo = colonne;
               ligneExplo = (direction % 2 == 0 ? ligne + i : ligne - i);
            }
            if (explos[direction]) {
               let typeExplo = (direction < 2 ? EXPLO_HORIZONTALE : EXPLO_VERTICALE);
               explos[direction] = this.map.explosionCase(colonneExplo, ligneExplo, type, puissance == i, puissance == i ? direction : typeExplo);
               if (colonneJ == colonneExplo && ligneJ == ligneExplo) {
                  this.joueur.mort(poseur, type);
               }
            }   
         }
      }
   }

   onJoueurChangeDeCase(joueur, colonne, ligne) {
      if (colonne >= 0 && colonne < 29) {
         this.map.nettoyerCase(colonne, ligne, joueur.instanceJoueur);
      }
   }

   ajoutBombe(nombre) {
      this.bombesDispo += nombre;
      this.updateBombes();
   }

   retraitBombe() {
      this.bombesDispo -= 1;
      this.updateBombes();
   }

   updatePuissance() {
      document.getElementById("nb-po").textContent = "Puissance : " + this.puissanceBombe;
   }

   updateBombes() {
      document.getElementById("nb-bombes").textContent = "Bombes : " + this.bombesDispo;
   }

   updateBonus() {
      document.getElementById("boum-bonus").textContent = "Bonus : " + this.joueur.bonus.nomBonus();
   }
}

export { SANS_EQUIPE, EQUIPE_ROUGE, EQUIPE_BLEUE,
         MODE_B_NORMAL, IMAGES_PAR_SECONDES, DELTA_T,
         Bouboum };
