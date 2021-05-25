import InfosTeam from "../General/InfosTeam.js";
import * as OptGene from "./OptionGenerale.js";
import Autorisation from "./Autorisation.js";
import JEvent from "./JEvent.js";
import * as Cnl from "../General/Canal.js";

import Global from "../Global.js";

export default class Joueur {
   constructor() {
     this.autorisations = new Autorisation();
     this.infosTeam = new InfosTeam();
     this.jEvent = new JEvent();

     this.salonDiscussion = false;
     this.silenceChat = false;
     this.nbMessagesPrives = 0;

     this.nom = undefined;

     this.auteurDernierChuchoRecu = undefined;
   }

   utilisable() {
      return this.nom !== undefined;
   }

   initInvite(nom) {
     this.nom = nom;
     this.optGene = new OptGene.OptionGenerale();
   }

   refreshCanaux() {
     //CleanCanauxChat(true);
     const chat = Global.$etat.instanceChat;
     const txt = Global.$config.txt, lang = Global.$config.lang;

     chat.addCanalToListe(new Cnl.Canal(txt.CANAL_TOUS[lang], Cnl.N_CANAL_TOUS), true);

     if (this.dansTeam()) {
         if (this.teamEnFusion()) {
             chat.addCanalToListe(new Cnl.Canal(txt.CANAL_TEAM[lang], Cnl.N_CANAL_CT), true);
             chat.addCanalToListe(new Cnl.Canal(txt.CANAL_FUSION[lang], Cnl.N_CANAL_TEAM), true);
         } else {
             chat.addCanalToListe(new Cnl.Canal(txt.CANAL_TEAM[lang], Cnl.N_CANAL_TEAM), true);
         }
     }

     /*if (this.salonDiscussion)
         AddCanalToListe(new Canal(Vue.$config.txt.CANAL_SALON[Vue.$config.lang], N_CANAL_SALON), true);*/
   }

   initViaCxID(infos) {
     this.nom = infos[1];
     this.avatar = infos[3];
     this.id = parseInt(infos[4]);

     this.infosTeam.setIdEtRole(parseInt(infos[16]), parseInt(infos[17]));

     this.optGene = new OptGene.OptionGenerale(infos[2], infos[5], infos[6], infos[7], infos[8]
                                          , infos[9], infos[10], infos[11], infos[12], infos[13]
                                          , infos[14], infos[19], infos[20], infos[21], infos[22]
                                          , infos[23], infos[24]);

     /*
      "CxID#"
      1 JOUEUR.NomJoueur
      2 JOUEUR._Forteresse.Sexe
      3 JOUEUR.Avatar
      4 JOUEUR.IdJoueur 4
      5 JOUEUR.SonActif
      6 JOUEUR.SonGuideActif
      7 JOUEUR.AfficherCoDeco
      8 JOUEUR.AfficherCoAmis
      9 JOUEUR.AfficherBulles
      10 JOUEUR.TriForteresse
      11 JOUEUR.OldSprite
      12 JOUEUR.NoLag
      13 JOUEUR.NoVote
      14 (JOUEUR.AutorisationForum ? "1" : "0")
      15 (JOUEUR.Membre ? "1" : "0") 15
      16 JOUEUR.IdTeam
      17 JOUEUR.RoleInt()
      18 (JOUEUR.AutorisationModoTeam ? "1" : (JOUEUR.AutorisationRespoTriTeam ? "2" : "0"))
      19 JOUEUR.TirContinu
      20 JOUEUR.NoChat
      21 JOUEUR.NoStats
      22 JOUEUR.NoMP
      23 JOUEUR.DerniereCoForum
      24 JOUEUR.recompenseElo.recompensesActives

      */
   }

   /**
    * @returns {String}
    */
   getPseudo() {
     return this.nom;
   }

   memePseudo(pseudo) {
     return this.nom === pseudo;
   }

   /**
    * @returns {Boolean}
    */
   dansTeam() {
     return this.infosTeam.aUneTeam();
   }

   /**
    * @returns {Boolean}
    */
   teamEnFusion() {
     return this.infosTeam.teamEnFusion();
   }

   /**
    * @returns {Boolean}
    */
   aSalonDiscussion() {
     return this.salonDiscussion;
   }

   rejoindreSalonDiscu() {
     const chat = Global.$etat.instanceChat;
     const txt = Global.$config.txt, lang = Global.$config.lang;

     if (!this.salonDiscussion)
         chat.addCanalToListe(new Cnl.Canal(txt.CANAL_SALON[lang], Cnl.N_CANAL_SALON), true);

     this.salonDiscussion = true;
   }

   quitterSalonDiscu() {
     this.salonDiscussion = false;
     this.refreshCanaux();
   }

   inverseSilenceChat() {
     const chat = Global.$etat.instanceChat;

     this.silenceChat = !this.silenceChat;

     if (this.silenceChat)
        chat.messageInfo("Vous ne recevrez plus les messages du salon.");
     else
        chat.messageInfo("Vous avez réactivé le chat.");
   }

   veutMessageSalon() {
     return !this.silenceChat && this.optGene.chatPrincipalOn();
   }

   membreModeration() {
     return this.autorisations.isDansModeration();
   }

   estModoJeu() {
     return this.autorisations.isModoJeu();
   }

   estModoForum() {
     return this.autorisations.isModoForum(true);
   }

   estInvite() {
       return this.autorisations.isInvite();
   }

   aAccesAnimateur() {
       return this.autorisations.isAnimateur(true);
   }

   /**
    * Regarde si le joueur a les commandes d'arbitrage pour le
    * jeu <jeu> ("*" = tous, "a" = Aaaah!, "b" = Bouboum, "f"=
    * Forteresse).
    *
    * @return {Boolean} true s'il y a accès (false sinon)
    */
   aCmdArbitrage(jeu) {
      jeu = jeu.toLowerCase();

      if (jeu === "*")
         return this.autorisations.isArbitreIT(true);
      else if (jeu === "a" || jeu === "b")
         return this.autorisations.isArbitreITAB(true);
      else if (jeu === "f")
         return this.autorisations.isArbitreITF(true);
   }

   addFlag(flag) {
     this.autorisations.addAutorisation(flag);
   }

   rejoindreFusion() {
     this.infosTeam.rejoindreFusion();
   }
}
