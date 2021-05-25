export default class Autorisation {
   constructor() {
     this.modoJeu = false;
     this.arbitreJeu = false;
     this.modoForum = false;
     this.arbitreIT = false;
     this.animateur = false;
     this.respomapAaaah = false;
     this.respomapForto = false;
     this.invite = false;
   }

   addAutorisation(flag) {
     if (flag === "modoj")
       this.modoJeu = true;
     else if (flag === "arbj")
       this.arbitreJeu = true;
     else if (flag === "modof")
       this.modoForum = true;
     else if (flag === "anim")
       this.animateur = true;
     else if (flag === "respoa")
       this.respomapAaaah = true;
     else if (flag === "respof")
       this.respoForto = true;
     else if (flag === "arbit")
       this.arbitreIT = true;
     else if (flag === "inv")
       this.invite = true;
   }

   isInvite() {
     return this.invite;
   }

   isDansModeration() {
     return this.isArbitreJeu(true) || this.isModoForum(true);
   }

   isModoJeu() {
     return this.modoJeu;
   }

   isArbitreJeu(ouPlus) {
     if (ouPlus)
         return this.arbitreJeu || this.isModoJeu(true);

      return this.arbitreJeu;
    }

   isModoForum(ouPlus) {
     if (ouPlus)
         return this.modoForum || this.isModoJeu(true);

     return this.modoForum;
   }

   isArbitreIT(ouPlus) {
     if (ouPlus)
         return this.arbitreIT || this.isModoJeu(true);

     return this.arbitreIT;
   }

   isArbitreITAB(ouPlus) {
     /// @TODO : gérer différence arbitre IT Aaaah!
     return this.isArbitreIT(ouPlus);
   }

   isArbitreIT(ouPlus) {
     /// @TODO : gérer différence arbitre IT Forto
     return this.isArbitreIT(ouPlus);
   }

   isAnimateur(ouPlus) {
     if (ouPlus)
         return this.animateur || this.isModoJeu(true);

     return this.animateur;
   }

   isRespomapAaaah(ouPlus) {
     if (ouPlus)
         return this.respomapAaaah || this.isModoJeu(true);

     this.respomapAaaah;
   }

   isRespomapForto(ouPlus) {
     if (ouPlus)
         return this.respomapForto || this.isModoJeu(true);

     return this.respomapForto;
   }
}
