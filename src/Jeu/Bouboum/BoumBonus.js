import * as BoumBombe from "./BoumBombe.js";

const BONUS_INVICIBILITE = 0;
const BONUS_SUPER_BOMBE = 1;
const BONUS_MAUVAIS_CONTACT = 2;
const BONUS_PAUSE_AUTOMATIQUE = 3;
const BONUS_AUCUN = 4;
const BONUS_LENTEUR = 5;
const BONUS_VITESSE = 6;
const BONUS_ULTRA_BOMBE = 7;
const BONUS_ALL_IN = 8;
const BONUS_BOMBE_FANTOME = 9;
const BONUS_CHASSEUR = 50;
const BONUS_BOMBE_CUPIDONNE = 90;
const BONUS_BOMBE_FLOCON = 91;
//parseInt((Date.now() - this.startTemps) / this.delais) % this.lsImages.length;
class BoumBonus {
   constructor() {
      this.type = BONUS_AUCUN;
      this.bonusSecondaire = BONUS_AUCUN;

      this.enAllIn = false;
   }

   finPoseAuto() {
      this.setBonus(BONUS_AUCUN);
   }

   loadBonusReseau(msg) {
      if (msg === "0") // Bonus pas pris car en All-in
         return;

      this.setBonus(parseInt(msg));
   }

   setInvincible() {
      this.debutInvincibilite = Date.now();
      this.type = BONUS_INVICIBILITE;
   }

   setBonus(bonus, allin=false) {
      if (bonus === BONUS_INVICIBILITE) {
         this.setInvincible();
      } else {
         this.type = bonus;
      }

      if (allin)
         this.enAllIn = true;
   }

   setBonusSecondaire(bonus) {
      if (bonus === BONUS_INVICIBILITE || bonus === BONUS_PAUSE_AUTOMATIQUE) {
         console.log("Bonus secondaire impossible");
         return;
      }

      this.bonusSecondaire = bonus;
   }

   aBonus(bonus) {
      return this.type === bonus || this.bonusSecondaire === bonus;
   }

   aVitesse() {
      return this.aBonus(BONUS_VITESSE);
   }

   aLenteur() {
      return this.aBonus(BONUS_LENTEUR);
   }

   getTypeBombe() {
      let bombe = BoumBombe.BOMBE_NORMALE;

      if (this.aBonus(BONUS_SUPER_BOMBE))
         return BoumBombe.BOMBE_SUPER;
      else if (this.aBonus(BONUS_MAUVAIS_CONTACT))
         return BoumBombe.BOMBE_MC;
      else if (this.aBonus(BONUS_ULTRA_BOMBE))
         return BoumBombe.BOMBE_ULTRA;
      else if (this.aBonus(BONUS_BOMBE_FANTOME))
         return BOMBE_FANTOME;
      else if (this.aBonus(BONUS_BOMBE_FLOCON))
         return BoumBombe.BOMBE_FLOCON;
      else if (this.aBonus(BONUS_BOMBE_CUPIDONNE))
         return this.aBonus(BoumBombe.BOMBE_CUPITONNE);

      return bombe;
   }

   // --------------------------

   toString() {
      let nom;

      if (this.enAllIn)
         nom = this.nomBonus(BONUS_ALL_IN) + " (" + this.nomBonus(this.type) + ")";
      else
         nom = this.nomBonus(this.type);

      if (this.bonusSecondaire != BONUS_AUCUN)
         nom += " (" + this.nomBonus(this.bonusSecondaire) + ")";

      return nom;
   }

   poseAuto() {
      return this.type == BONUS_PAUSE_AUTOMATIQUE;
   }

   nomBonus() {
      switch(this.type) {
         case BONUS_INVICIBILITE:
            return "Invincible";
         case BONUS_SUPER_BOMBE:
            return "Super bombe";
         case BONUS_MAUVAIS_CONTACT:
            return "Mauvais contact";
         case BONUS_PAUSE_AUTOMATIQUE:
            return "Pause automatique !"
         case BONUS_AUCUN:
            return "Aucun";
         case BONUS_LENTEUR:
            return "Lenteur";
         case BONUS_VITESSE:
            return "Vitesse";
         case BONUS_ULTRA_BOMBE:
            return "Ultra bombe";
         case BONUS_ALL_IN:
            return "All-in";
         case BONUS_BOMBE_FANTOME:
            return "Bombe fantôme";
         case BONUS_CHASSEUR:
            return "Chasseur";
         case BONUS_BOMBE_CUPIDONNE:
            return "Bombe cupidonne";
         case BONUS_BOMBE_FLOCON:
            return "Bombe flocon";
         default:
            return "???";
      }
   }
}

export { 
   BoumBonus,
   BONUS_INVICIBILITE,
   BONUS_SUPER_BOMBE,
   BONUS_MAUVAIS_CONTACT,
   BONUS_PAUSE_AUTOMATIQUE,
   BONUS_AUCUN,
   BONUS_LENTEUR,
   BONUS_VITESSE,
   BONUS_ULTRA_BOMBE,
   BONUS_ALL_IN,
   BONUS_BOMBE_FANTOME,
   BONUS_CHASSEUR,
   BONUS_BOMBE_CUPIDONNE,
   BONUS_BOMBE_FLOCON
};
