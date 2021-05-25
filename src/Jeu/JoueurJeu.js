const DIRECTION_J_GAUCHE = 1;
const DIRECTION_J_DROITE = 2;
const DIRECTION_J_HAUT = 4;
const DIRECTION_J_BAS = 8;

const ETAT_J_MORT = 0;
const ETAT_J_VIVANT = 1;
const ETAT_J_HORS_JEU = 2; // vient de rejoindre une partie en cours

class JoueurJeu {
   constructor(pseudo, limiteVitesseX, limiteVitesseY) {
      this.pseudo = pseudo;
      this.x = 0.0;
      this.y = 0.0;
      this.direction = DIRECTION_J_DROITE;
      this.vitesseX = 0.0;
      this.vitesseY = 0.0;
      this.instanceJoueur = false;
      this.etat = ETAT_J_HORS_JEU;


      // ...
      this.distParcourue = 0.0;
      this.instantDebutMvt = -1;

      this.limiteVitesseX = limiteVitesseX;
      this.limiteVitesseY = limiteVitesseY;
   }

   estStatique() {
      return this.vitesse === 0.0;
   }

   coeffDireHorizontale() {
      if (this.direction & DIRECTION_J_GAUCHE === DIRECTION_J_GAUCHE)
         return -1;
      else if (this.direction & DIRECTION_J_DROITE === DIRECTION_J_DROITE)
         return 1;

      return 0;
   }

   coeffDirVerticale() {
      if (this.direction & DIRECTION_J_HAUT === DIRECTION_J_HAUT)
         return -1;
      else if (this.direction & DIRECTION_J_BAS === DIRECTION_J_BAS)
         return 1;

      return 0;
   }

   setVitesse(vitesseX, vitesseY) {
      this.vitesseX = vitesseX;
      this.vitesseY = vitesseY;
   }

   getVitesseX() {
      return this.vitesseX;
   }

   getVitesseY() {
      return this.vitesseY;
   }

   getX() {
      return this.x;
   }

   getY() {
      return this.y;
   }

   repositionner(x, y) {
      this.x = x;
      this.y = y;
   }

   rafraichir(x, y, vitesseX, vitesseY) {
      this.repositionner(x, y);
      this.setVitesse(vitesseX, vitesseY, true);
   }

   estVivant() {
      return this.etat === ETAT_J_VIVANT;
   }

   tic() {
      // ... @TODO
   }
}

export { DIRECTION_J_GAUCHE, DIRECTION_J_DROITE, DIRECTION_J_HAUT, DIRECTION_J_BAS,
         ETAT_J_MORT, ETAT_J_VIVANT, ETAT_J_HORS_JEU,

         JoueurJeu };
