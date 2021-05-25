import * as JoueurJeu from "../JoueurJeu.js";
import * as Bouboum from "./Bouboum.js";
import * as BoumBonus from "./BoumBonus.js";
import * as BoumCase from "./BoumCase.js";
import { DELTA_T } from "./Bouboum.js";

import * as PIXI from 'pixi.js';

const HAUT = 0;
const BAS = 1;
const GAUCHE = 2;
const DROITE = 3;

class JBouboum extends JoueurJeu.JoueurJeu {
   constructor(pseudo, ligne, colonne, container, loader, stage, instanceJoueur) {
      super(pseudo, 1.6, 1.6);

      this.bonus = new BoumBonus.BoumBonus();
      this.puissance = 0;
      this.nbBombes = 0;
      //this.skin = new ImgJBoum.ImgJBouboum(); // Créer classe SkinBouboum

      this.equipe = Bouboum.SANS_EQUIPE;

      this.bouboum = container;

      this.dateStart = Date.now();

      this.ligneCourante = ligne;
      this.colonneCourante = colonne;
      this.directionCourante = -1;

      this.setVitesse(1.4, 1.4);

      this.instanceJoueur = instanceJoueur;

      this.stage = stage;
      this.loader = loader;

      if (this.bouboum.sexeFeminin && this.instanceJoueur) {
         this.sprites = [
            new PIXI.Sprite(loader.resources["chatfilleOr_haut.png"].texture),
            new PIXI.Sprite(loader.resources["chatfilleOr_bas.png"].texture),
            new PIXI.Sprite(loader.resources["chatfilleOr_gauche.png"].texture),
            new PIXI.Sprite(loader.resources["chatfilleOr_droite.png"].texture),
         ];
      } else {
         this.sprites = [
            new PIXI.Sprite(loader.resources["chatOr_haut.png"].texture),
            new PIXI.Sprite(loader.resources["chatOr_bas.png"].texture),
            new PIXI.Sprite(loader.resources["chatOr_gauche.png"].texture),
            new PIXI.Sprite(loader.resources["chatOr_droite.png"].texture),
         ];
      }
      

      this.animationMort = [
         new PIXI.Sprite(loader.resources["mort1_blanc.png"].texture), 
         new PIXI.Sprite(loader.resources["mort2.png"].texture), 
         new PIXI.Sprite(loader.resources["mort3.png"].texture) 
      ];  
  

      let skin = new PIXI.Container();
      this.sprites.forEach(sprite => skin.addChild(sprite));
      this.animationMort.forEach(sprite => skin.addChild(sprite));


      // Gestion de l'écriture du pseudo     
      let color = "0x586DB3";
      if (this.instanceJoueur) {
         color = "0xC5C345";
      } 
      
      const style = new PIXI.TextStyle({
         fontFamily: 'Arial',
         fontSize: 12,
         fill: color
     });

      this.skinPseudo = new PIXI.Text(pseudo, style);
      this.skinPseudo.anchor.set(0.5, 0.5);
      this.skinPseudo.position.set(7, -15);
      skin.addChild(this.skinPseudo);

      // Position correcte des sprites:
      if (this.bouboum.sexeFeminin) {
         this.sprites[0].y = -7; // haut
         this.sprites[1].y = -8; // bas
         this.sprites[2].y = -5; // gauche
         this.sprites[3].y = -5; // droite
         this.sprites[3].x = 1; // droite
      } else {
         this.sprites[0].y = -2; // haut
         this.sprites[1].y = -2; // bas
         this.sprites[2].y = -3; // gauche
         this.sprites[3].y = -3; // droite
      }
      this.skin = skin;
      this.skin.x = BoumCase.CASE_TAILLE * colonne;
      this.skin.y = BoumCase.CASE_TAILLE * ligne;
      this.stage.addChild(this.skin);
      this.vivant = true;
      this.setDirection(BAS);
      this.timeDeath = 0;

   }

   destroy() {
      this.stage.removeChild(this.skin);
   }

   // ----------- Bonus -----------
   changerBonusReseau(msg) {
      this.bonus.loadBonusReseau(msg);
      this.actualiserVitesse();
   }

   finPoseAuto() {
      this.bonus.finPoseAuto();
   }

   actualiserVitesse() {
      if (this.bonus.type == BoumBonus.BONUS_LENTEUR) {
         this.setVitesse(1.2, 1.2);
      } else if (this.bonus.type == BoumBonus.BONUS_VITESSE) {
         this.setVitesse(1.6, 1.6);
      } else {
         this.setVitesse(1.4, 1.4);
      }
   }

   getColonneFromPosition() {
      return Math.round(this.skin.x / BoumCase.CASE_TAILLE);
   }

   getLigneFromPosition() {
      return Math.round(this.skin.y / BoumCase.CASE_TAILLE);
   }

   setDirection(direction) {
      for (let i = 0; i < 4; ++i) {
         this.sprites[i].visible = direction == i && this.vivant;
      }
      for (let i = 0; i < 3; ++i) {
         this.animationMort[i].visible = false;
      }
   }

   mort(tueur, typeBombe, envoieMsg=true) {
      if (Date.now() - this.dateStart < 10000) {
         return;
      }
      this.vivant = false;
      for (let i = 0; i < 4; ++i) {
         this.sprites[i].visible = false;
      }
      this.animationMort[0].visible = true;
      if (envoieMsg) {
         this.bouboum.envoieMessage("BoM#"+ tueur + "#" + typeBombe);
      }
   }

   tic(deltaFactor) {
      // Animation mort
      if (!this.vivant) {
         this.timeDeath += DELTA_T;
         if (this.timeDeath > 1.0) {
            this.destroy()
         } else if (this.timeDeath > 0.666) {       
            this.animationMort[1].visible = false;
            this.animationMort[2].visible = true;
         } else if (this.timeDeath > 0.333) {
            this.animationMort[0].visible = false;
            this.animationMort[1].visible = true;
         }
         return;
      }
      
      if (this.directionCourante == -1) {
         return;
      }
      // Actualisation de la position et de l'etat du joueur
      switch(this.directionCourante) {
         case HAUT: 
            this.skin.y -= (this.vitesseY * deltaFactor);
            break;
         case BAS:
            this.skin.y += (this.vitesseY * deltaFactor);
            break;
         case DROITE:
            this.skin.x += (this.vitesseX * deltaFactor);
            break;
         case GAUCHE:
            this.skin.x -= (this.vitesseX * deltaFactor);
            break;
         default:
            break;
      }

      let colonneEnCours = this.colonneCourante;
      let ligneEnCours = this.ligneCourante;
      
      switch(this.directionCourante) {
         case DROITE:
            colonneEnCours = Math.ceil(this.skin.x/BoumCase.CASE_TAILLE);
            break;
         case GAUCHE:
            colonneEnCours = Math.floor(this.skin.x/BoumCase.CASE_TAILLE);
            break;
         case BAS:
            ligneEnCours = Math.ceil(this.skin.y/BoumCase.CASE_TAILLE);
            break;
         case HAUT:
            ligneEnCours = Math.floor(this.skin.y/BoumCase.CASE_TAILLE);
      }      
      
      // Traitement à faire lors d'un changement de case courante.
      if (colonneEnCours != this.colonneCourante || ligneEnCours != this.ligneCourante) {    
         // On actualise la colonne / ligne en cours qui a pu changer pendant le déplacement
         this.colonneCourante = colonneEnCours;
         this.ligneCourante = ligneEnCours;
         
         // Dans le cas où c'est le joueur client qui bouge, on a des infos à envoyer
         // et on doit vérifier si la case vers laquelle il se dirige est libre
         if (this.instanceJoueur) {
            /*
            On veut peut-être partir dans une autre direction (touche dans
            la direction en cours relâchée pdt le déplacement)
            */
            if ((this.directionCourante == DROITE && !this.bouboum.eventHandler.droiteEnfonce) || 
                  (this.directionCourante == GAUCHE && !this.bouboum.eventHandler.gaucheEnfonce) || 
                  (this.directionCourante == HAUT && !this.bouboum.eventHandler.hautEnfonce) || 
                  (this.directionCourante == BAS && !this.bouboum.eventHandler.basEnfonce)) 
            {
               
               switch (this.directionCourante) {
                  case DROITE:
                     this.colonneCourante -= 1;
                     break;
                  case GAUCHE:
                     this.colonneCourante += 1;
                     break;
                  case HAUT:
                     this.ligneCourante += 1;
                     break;
                  case BAS:
                     this.ligneCourante -= 1;
                     break;
               }

               let nouvelle_direction = -1;
               if (this.bouboum.eventHandler.droiteEnfonce) {
                  nouvelle_direction = DROITE;
               } else if (this.bouboum.eventHandler.gaucheEnfonce) {
                  nouvelle_direction = GAUCHE;
               } else if (this.bouboum.eventHandler.hautEnfonce) {
                  nouvelle_direction = HAUT;
               } else if (this.bouboum.eventHandler.basEnfonce) {
                  nouvelle_direction = BAS;
               }
               this.bouboum.deplacement(this, this.colonneCourante, this.ligneCourante, nouvelle_direction);

            } else {
               // Si la case dans la direction choisie par le joueur n'est pas libre, on le repositionne
               // sur la case precedente et on l'arrete
               if (!this.bouboum.map.caseEstLibre(colonneEnCours, ligneEnCours)) {
                  switch (this.directionCourante) {
                     case DROITE:
                        this.colonneCourante -= 1;
                        break;
                     case GAUCHE:
                        this.colonneCourante += 1;
                        break;
                     case HAUT:
                        this.ligneCourante += 1;
                        break;
                     case BAS:
                        this.ligneCourante -= 1;
                        break;
                  }
                  this.bouboum.arret(this, this.colonneCourante, this.ligneCourante, true);
               }
            }
            // PoseAuto
            if (this.bonus.poseAuto()) {
               this.bouboum.poserBombe();
            }
         }
         
         this.bouboum.onJoueurChangeDeCase(this, this.colonneCourante, this.ligneCourante);
      }
   }
}

export { JBouboum, HAUT, BAS, GAUCHE, DROITE };
