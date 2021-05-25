import * as JB from "./JBouboum.js";

class BoumEventHandler {
   constructor(bouboum) {
      this.bouboum = bouboum;
      this.droiteEnfonce = false;
      this.gaucheEnfonce = false;
      this.hautEnfonce = false;
      this.basEnfonce = false;
      this.espaceEnfonce = false;
   }

   keyDown(event) {
      if (event.key === " ") {
         this.espaceEnfonce = true;
         this.poserBombe();
      }
      let direction = this.eventEnJBDirection(event, true);
      if (direction != -1) {
         let joueur = this.bouboum.getJoueur();
         if (!this.bouboum.deplacementEnCours) {
            this.bouboum.deplacement(joueur, joueur.colonneCourante, joueur.ligneCourante, direction);
         }
         event.preventDefault();
         return true;
      }
      return false;
   }

   keyUp(event) {
      if (event.key === " ") {
         this.espaceEnfonce = false;
         event.preventDefault();
         return;
      }
      this.eventEnJBDirection(event, false);
      event.preventDefault();
   }

   mouseEvent(event) {
      return; // Pas d'event souris sur Bouboum
   }

   resizeEvent(event) {
      return;  // Pas de resize sur Bouboum
   }

   eventEnJBDirection(event, enfonce) {
      switch (event.key) {
         case "ArrowDown":
            this.basEnfonce = enfonce;
            return JB.BAS;
         case "ArrowUp":
            this.hautEnfonce = enfonce;
            return JB.HAUT;
         case "ArrowRight":
            this.droiteEnfonce = enfonce;
            return JB.DROITE;
         case "ArrowLeft":
            this.gaucheEnfonce = enfonce;
            return JB.GAUCHE;

         default:
            return -1;
      }
   }

   poserBombe() {
      this.bouboum.poserBombe();
      return true;
   }
}

export { BoumEventHandler };
