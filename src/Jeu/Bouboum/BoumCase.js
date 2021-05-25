const CASE_VIDE = 0;
const CASE_INDESTRUCTIBLE = 1;
const CASE_DESTRUCTIBLE = 2;
const CASE_TRESOR = 3;
const BONUS_CRANE = 0;
const BONUS_BOMBE = 1;
const BONUS_PUISSANCE = 2;
const CASE_TAILLE = 20;
const EXPLO_CENTRE = 6;
const EXPLO_HORIZONTALE = 4;
const EXPLO_VERTICALE = 5;
const EXPLO_DROITE = 0;
const EXPLO_GAUCHE = 1;
const EXPLO_BAS = 2;
const EXPLO_HAUT = 3;


            // indice 0 = droite, 1 gauche, 2 bas, 3 haut

import * as PIXI from 'pixi.js';
import { DELTA_T } from './Bouboum.js'
import { MapElement } from './BoumMap.js';

class BoumCase extends MapElement {
   constructor(caseTxt, colonne, ligne, loader, stage) {
      super(colonne, ligne, loader, stage);
      this.type = parseInt(caseTxt);
      switch (this.type) {
         case CASE_INDESTRUCTIBLE:
            this.sprite = new PIXI.Sprite(loader.resources["bloc_noir.png"].texture);
            break;
         case CASE_DESTRUCTIBLE:
            this.sprite = new PIXI.Sprite(loader.resources["bloc_bleu.png"].texture);
            break;
         case CASE_TRESOR:
            this.sprite = new PIXI.Sprite(loader.resources["bloc_orange.png"].texture);
            break;
         case CASE_VIDE:
            this.sprite = null;
            break;
         default:
            console.log("ERREUR: Type de bloc inconnu");
            this.sprite = null;
      }
      if (this.sprite) {
         this.sprite.x = colonne * CASE_TAILLE;
         this.sprite.y = ligne * CASE_TAILLE;
         this.stage.addChild(this.sprite);
      }
   }

   isCase() {
      return true;
   }
}

class BoumBonusCase extends MapElement {
   constructor(type, colonne, ligne, loader, stage) {
      super(colonne, ligne, loader, stage);
      this.type = type;
      switch (type) {
         case BONUS_CRANE:
            this.sprite = new PIXI.Sprite(loader.resources["bonus_crane.png"].texture);
            break;
         case BONUS_PUISSANCE:
            this.sprite = new PIXI.Sprite(loader.resources["bonus_puissance.png"].texture);
            break;
         case BONUS_BOMBE:
            this.sprite = new PIXI.Sprite(loader.resources["bonus_bombe.png"].texture);
            break;
         default:
            console.log("ERREUR: Type de bonus inconnu");
            break;
      }
      this.sprite.x = colonne * CASE_TAILLE;
      this.sprite.y = ligne * CASE_TAILLE;
      this.stage.addChild(this.sprite);
      this.sprite.alpha = 0.5;
   }

   tic(deltaFactor) {
      if (this.sprite.alpha < 1) {
         this.sprite.alpha += (DELTA_T*2*deltaFactor);
      }
   }

   isCaseBonus() {
      return true;
   }
}

class Explo extends MapElement {
   constructor(type, colonne, ligne, loader, stage, refMap) {
      super(colonne, ligne, loader, stage);
      this.type = type;
      this.refMap = refMap;
      switch (type) {
         case EXPLO_CENTRE:
            this.sprite = new PIXI.Sprite(loader.resources["explo_centre.png"].texture);
            break;
         case EXPLO_HORIZONTALE:
            this.sprite = new PIXI.Sprite(loader.resources["explo_horizontale.png"].texture);
            break;
         case EXPLO_VERTICALE:
            this.sprite = new PIXI.Sprite(loader.resources["explo_verticale.png"].texture);
            break;
         case EXPLO_DROITE:
            this.sprite = new PIXI.Sprite(loader.resources["explo_droite.png"].texture);
            break;
         case EXPLO_GAUCHE:
            this.sprite = new PIXI.Sprite(loader.resources["explo_gauche.png"].texture);
            break;
         case EXPLO_HAUT:
            this.sprite = new PIXI.Sprite(loader.resources["explo_haut.png"].texture);
            break;
         case EXPLO_BAS:
            this.sprite = new PIXI.Sprite(loader.resources["explo_bas.png"].texture);
            break;
         default:
            console.log("ERREUR: Type d'explosion inconnu");
            break;
      }
      this.sprite.x = colonne * CASE_TAILLE;
      this.sprite.y = ligne * CASE_TAILLE;
      this.stage.addChild(this.sprite);
      this.sprite.alpha = 0;
   }

   tic(deltaFactor) {
      super.tic(deltaFactor);
      if (this.time < 0.1) {
         this.sprite.alpha = this.time * 10;
      } else if (this.time <= 0.5) {
         this.sprite.alpha = 1.25 - 2.5 * this.time;
      } else {
         super.destroy();
         this.refMap.removeExplo(this.colonne, this.ligne);
      }
   }

   isExplo() {
      return true;
   }
}

export {
   CASE_VIDE, CASE_INDESTRUCTIBLE, CASE_DESTRUCTIBLE, CASE_TRESOR, CASE_TAILLE,
   BoumCase, BoumBonusCase, 
   Explo, EXPLO_CENTRE, EXPLO_HORIZONTALE, EXPLO_VERTICALE, EXPLO_BAS, EXPLO_DROITE, EXPLO_HAUT, EXPLO_GAUCHE
};
