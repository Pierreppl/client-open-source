import * as BoumCase from "./BoumCase.js";
import { Explo, EXPLO_CENTRE, EXPLO_HORIZONTALE, EXPLO_VERTICALE } from "./BoumCase.js";
import * as BoumBombe from "./BoumBombe.js";
import * as Bouboum from "./Bouboum.js";

class BoumMap {
   constructor(mapReseau, reseau, stage, loader) {
      let ligneMap = mapReseau.split(";");
      ligneMap.shift();

      this.map = [];
      this.joueurs = [];

      this.reseau = reseau;
      this.stage = stage;
      this.loader = loader;

      this.explos = new Map();

      for (let i = 0; i < ligneMap.length; ++i) {
         let cases = ligneMap[i].split(",");
         cases.shift();

         this.map.push([]);

         for (let j = 0; j < cases.length; ++j) {
            let newCase = new BoumCase.BoumCase(cases[j], i, j, loader, stage);
            this.map[i].push(newCase);
         }
      }
   }

   addJoueur(j) {
      this.joueurs.push(j);
   }

   addBombe(colonne, ligne, type, poseur) {
      this.map[colonne][ligne] = new BoumBombe.BoumBombe(colonne, ligne, type, poseur, this.loader, this.stage);
   }

   modifierCase(type, colonne, ligne) {
      this.map[colonne][ligne].destroy();
      this.map[colonne][ligne] = new BoumCase.BoumCase(type, colonne, ligne, this.loader, this.stage);
   }

   explosionCase(colonneExplo, ligneExplo, type, dernierePropa, typeExplo) {
      if (colonneExplo < 0 || colonneExplo >= 29 || ligneExplo < 0 || ligneExplo >= 19) {
         return false;
      } 
      const superbombe = type == BoumBombe.BOMBE_SUPER;
      const ultrabombe = type == BoumBombe.BOMBE_ULTRA;
      let mapObject = this.map[colonneExplo][ligneExplo];
      // Bombe
      if (mapObject.isBombe()) {
         return false;
      // Case
      } else if (mapObject.isCaseBonus()) {
         this.nettoyerCase(colonneExplo, ligneExplo, false);
         this.addExplo(colonneExplo, ligneExplo, new Explo(typeExplo, colonneExplo, ligneExplo, this.loader, this.stage, this));
         return !dernierePropa;
      } else {
         if (mapObject.type == BoumCase.CASE_DESTRUCTIBLE || mapObject.type == BoumCase.CASE_TRESOR) {
            this.modifierCase(BoumCase.CASE_VIDE, colonneExplo, ligneExplo);
            return !dernierePropa && superbombe
         } else if (mapObject.type == BoumCase.CASE_INDESTRUCTIBLE) {         
            if (ultrabombe) {
               this.modifierCase(BoumCase.CASE_VIDE, colonneExplo, ligneExplo);
            }
            return false;
         } else {
            this.addExplo(colonneExplo, ligneExplo, new Explo(typeExplo, colonneExplo, ligneExplo, this.loader, this.stage, this));
            return !dernierePropa;
         }
      }
   }

   addExplo(colonne, ligne, explo) {
      let key = colonne + 39 * ligne;
      if (this.explos.has(key)) {
         this.explos.get(key).destroy();
      }
      this.explos.set(colonne + 39 * ligne , explo);
   }

   removeExplo(colonne, ligne) {
      this.explos.delete(colonne + 39 * ligne);
   }

   destroy() {
      for (let i = 0; i < 29; ++i) {
         for (let j = 0; j < 19; ++j) {
            this.map[i][j].destroy();
         }
      }
      for (let explo of this.explos.values()) {
         explo.destroy()
      }
      this.explos.clear();
   }

   /**
    * Charger une map depuis le réseau.
    */
   chargerMap(mapReseau) {
      console.log("Charger map");
      let ligneMap = mapReseau.split(";");
      ligneMap.shift();

      for (let i = 0; i < ligneMap.length; ++i) {
         let cases = ligneMap[i].split(",");
         cases.shift();

         for (let j = 0; j < cases.length; ++j) {
            this.modifierCase(parseInt(cases[j]), i, j);
         }
      }
   }

   /**
    * Rafraichir les images sur la map (appelée par tic()).
    */
   rafraichir(deltaFactor) {
      for (let i = 0; i < 29; ++i) {
         for (let j = 0; j < 19; ++j) {
            this.map[i][j].tic(deltaFactor);
         }
      }
      for (let explo of this.explos.values()) {
         explo.tic(deltaFactor);
      }
   }

   caseEstLibre(colonne, ligne) {
      if (colonne < 0 || colonne > 28 || ligne < 0 || ligne > 18) {
         return false;
      } else {
         let mapObject = this.map[colonne][ligne];
         if (mapObject.isCaseBonus()) {
            return true;
         }
         if (mapObject.isBombe()) {
            return mapObject.type == BoumBombe.BOMBE_FANTOME; 
         } else {
            return mapObject != null && mapObject.type == BoumCase.CASE_VIDE;
         }
      }
      
   }

   getPoseurBombe(colonne, ligne) {
      if (this.map[colonne][ligne].isBombe()) {
         return this.map[colonne][ligne].poseur;
      } else {
         console.log("Error: Pas de compte en (" + colonne + ", " + ligne + ")");
         return ""
      }
   }

   removeBombe(colonne, ligne) {
      this.modifierCase(0, colonne, ligne);
   }

   ajouterBonus(type, colonne, ligne) {
      this.map[colonne][ligne].destroy();
      this.map[colonne][ligne] = new BoumCase.BoumBonusCase(type, colonne, ligne, this.loader, this.stage);
   }

   nettoyerCase(colonne, ligne, instanceJoueur) {
      if (this.map[colonne][ligne] && this.map[colonne][ligne].isCaseBonus()) {
         this.modifierCase(BoumCase.CASE_VIDE, colonne, ligne);
         if (instanceJoueur) {
            this.reseau.Envoie("BoB#" + colonne +"#" + ligne);
         }
      } 
   }
}

class MapElement {
   constructor(colonne, ligne, loader, stage) {
      this.loader = loader;
      this.stage = stage;
      this.colonne = colonne;
      this.ligne = ligne;
      this.time = 0
      this.sprite = null;
   }

   tic(deltaFactor) {
      this.time += (Bouboum.DELTA_T * deltaFactor);
   }

   destroy() {
      if (this.sprite != null) {
         this.stage.removeChild(this.sprite);
      }
   }

   isCase() {
      return false;
   }
   isCaseBonus() {
      return false;
   }
   isBombe() {
      return false;
   }
   isExplo() {
      return false;
   }
}


export { BoumMap, MapElement };
