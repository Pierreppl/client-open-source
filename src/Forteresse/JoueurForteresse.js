const JF_COULEUR_ROUGE = 0;
const JF_COULEUR_BLEUE = 1;

const JF_ACTION_STATIQUE = 0;
const JF_ACTION_COURSE = 1;
const JF_ACTION_RECHARGE = 2;
const JF_ACTION_TIR = 3;

const JF_DIR_GAUCHE = 0;
const JF_DIR_DROITE = 1;

class JoueurForteresse {
   constructor() {
     this.vie = 10;
     this.couleur = JF_COULEUR_ROUGE;

     this.balles = 12;
     this.jambombes = 3;
     this.construction = 100;

     this.x = -1;
     this.y = -1;
     this.vx = 0;
     this.vy = 0;

     this.image = new Image();
     this.action = JF_ACTION_STATIQUE;
     this.direction = JF_DIR_DROITE;
   }

   /**
    * Déplacer le joueur dans la direction <direction> (cf JF_DIR_*).
    *
    * @param
    *   {JF_DIR_*} direction
    *
    * @returns {undefined}
    */
   deplacement(direction) {
     this.direction = direction;

     if (direction === JF_DIR_GAUCHE) {
         this.x -= 10;
     } else {
         this.x += 10;
     }
   }

   goto(dx, dy) {
     this.x += dx;
     this.y += dy;
   }

   tirer(x, y) {
     this.action = JF_ACTION_TIR;
   }

   sauter() {
     // ...
   }

   recharger() {
     this.action = JF_ACTION_RECHARGE;
   }

   actualiser(x, y, direction, action, saut, vx, vy) {
     this.x = x;
     this.y = y;
     this.direction = direction;
     this.action = action;
     this.saut = saut;
     this.vx = vx;
     this.vy = vy;
   }
}

export { JF_COULEUR_ROUGE, JF_COULEUR_BLEUE, JF_ACTION_STATIQUE, JF_ACTION_COURSE, JF_ACTION_RECHARGE,
         JF_ACTION_TIR, JF_DIR_GAUCHE, JF_DIR_DROITE,

         JoueurForteresse };
