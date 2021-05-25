import * as MF from "./MapForteresse.js";
import * as JF from "./JoueurForteresse.js";

const TRI_FRIG = 0;
const TRI_KILL = 1;

class Forteresse {
   constructor() {
     this.Forteresse = true;

     this.lsJoueurs = [];
     this.map = new MF.MapForteresse();
     this.joueur = new JF.JoueurForteresse();
   }

   init() {
     setCouleurFond("#9E9EAF");
   }

   /**
    * Charge une nouvelle map.
    *
    * @param
    *   {int} monde : id du monde qui contient la map
    * @param
    *   {String} data : blocs + couleurs à charger
    *
    * @returns {undefined}
    */
   nouvelleMap(monde, data) {
     this.map.loadMondeOfficiel(monde, data);
   }

   /**
    * @param {KeyEvent} key
    * @returns {undefined}
    */
   keydown(key) {
     if (!JeuAFocus()) // Touche pas destinée au jeu
         return;

     if (key.code === "ArrowDown") {
         this.joueur.goto(0, 10);
     } else if (key.code === "ArrowUp") {
         this.joueur.goto(0, -10);
     } else if (key.code === "ArrowRight") {
         this.joueur.goto(10, 0);
     } else if (key.code === "ArrowLeft") {
         this.joueur.goto(-10, 0);
     }

     ctx.clearRect(0, 0, canvas.width, canvas.height);
     this.map.refresh(this.joueur);
   }

   handleMessage(msg) {
     return true;
   }
}

export { TRI_FRIG, TRI_KILL,

         Forteresse };
