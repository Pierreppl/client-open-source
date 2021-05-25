import Global from "../Global.js";

const N_CANAL_TOUS =      0b1;
const N_CANAL_VIP =       0b10;
const N_CANAL_MP =        0b100;
const N_CANAL_TEAM =      0b1000;
const N_CANAL_CT =        0b10000;
const N_CANAL_SALON =     0b100000;
const N_CANAL_ALLIES =    0b1000000;
const N_CANAL_ELO =       0b10000000;
const N_CANAL_CHUCHOTER = 0b100000000;
const N_MAX_CANAL =       0b1000000000;

const N_CANAL_FORUM =     N_MAX_CANAL << 1;

const N_CANAL_TOUS_CANAUX_CIBLES = (N_CANAL_FORUM << 1) - 1;

class Canal {
   /**
    * @param {String} nom : nom du canal dans la liste des canaux disponibles.
    *
    * @param {int} type : type du canal (N_CANAL_*)
    *
    * @param {String} destinataires : destinataires (pseudo de la personne ou '*'
    *                                 pour tous)
    *
    * @returns {Canal}
    */
   constructor(nom, type, destinataires="*") {
       this.nom = nom;
       this.type = type;
       this.destinataires = destinataires;
       this.nbNonLus = 0;
       this.baliseNomHTML = null;

       this.html = document.createElement("div");
       this.html.style.paddingLeft = "7px";

       const span = document.createElement("span");
       let that = this;

       this.nomHTML = span;

       span.setAttribute("class", "canal-nom " + IdCanalToNomCouleur(this.type));
       span.innerHTML = this.nom;
       span.onclick = function() { that.utiliserCommeCanal(); };
       span.oncontextmenu = function(event) { that.menuCanal(event); };

       this.html.appendChild(span);

       this.lsMsg = [];
   }

   getNom() {
      return this.nom;
   }

   getType() {
      return this.type;
   }

   /**
    * Utiliser le canal comme canal d'envoi et affichage (le canal a
    * été cliqué dans la liste des canaux disponibles).
    *
    * @returns {None}
    */
   utiliserCommeCanal() {
     if (this.type === N_CANAL_TOUS_CANAUX_CIBLES) {
         Global.$etat.instanceChat.chgmtCanalSuivantActive = true;
     } else {
         Global.$etat.instanceChat.chgmtCanalSuivantActive = false;
         Global.$etat.instanceChat.changerCanalVisible(this.type);
     }

     this.nbNonLus = 0;
     this.nomHTML.innerHTML = this.nom;

     Global.$etat.instanceChat.destinatairesCanal = this.destinataires;

     Global.$etat.instanceChat.nouveauCanalAffichage(this);
     Global.$etat.instanceChat.cleanMessagesChat();
     this.remplirMsgDuCanal();
   }

   menuCanal(event) {
      console.log(event);
      event.preventDefault();
      Global.$etat.instanceChat.afficherVignette(event, this);
   }

   getHTMLElement() {
     return this.html;
   }

   memeNom(nom) {
     return nom === this.nom;
   }

   /**
    * Ajouter <msg> à la liste des message du canal.
    *
    * @param {DOM} msg
    *
    * @returns {None}
    */
   addMessage(msg) {
     if (this.lsMsg.length > 200)
         this.lsMsg.shift();

     this.lsMsg.push(msg);
   }

   /**
    * Ajouter <DOMmsg> à la liste des messages du canal si le
    * canal ciblé <typeCanal> pour ce message est dans les
    * messages ajoutables pour le canal.
    *
    * @param {DOM} DOMmsg : message HTML (dans un div) à ajouter
    *
    * @param {int} typeCanal : type du canal de <DOMmsg>
    *
    * @param {String} nomSpecial : nom spécial du canal (si le type
    *        du canal ne suffit pas)
    *
    * @return {Boolean} : true si le message a été ajouté.
    */
   addMessageSiBonType(DOMmsg, typeCanal, nomSpecial="") {
     if (this.concerneParMsg(typeCanal, nomSpecial)) {
        this.addMessage(DOMmsg);

        if (this.type === N_CANAL_TOUS_CANAUX_CIBLES) { // On ne marque pas tous les messages comme "non lus"
           if (!(typeCanal === N_CANAL_MP || typeCanal === N_CANAL_VIP || typeCanal === N_CANAL_TOUS_CANAUX_CIBLES))
              return false;
        }

        if (!Global.$etat.instanceChat.estCanalEnUtilisation(this) && !Global.$etat.instanceChat.estCanalGeneralEnUti()) {
           this.nbNonLus++;
           this.nomHTML.innerHTML = this.nom + " (" + this.nbNonLus + ")";
        }

        return true;
     }

     return false;
   }

   concerneParMsg(typeCanal, nomSpecial) {
      return ((this.type & typeCanal) !== 0 && (this.type !== N_CANAL_CHUCHOTER || this.memeNom(nomSpecial)));
   }

   /**
    * Charge dans <instanceChat> la liste des messages
    * du canal.
    *
    * @returns {None}
    */
   remplirMsgDuCanal() {
     let i = 0;
     const sz = this.lsMsg.length;

     for (; i < sz; ++i)
         Global.$etat.instanceChat.addDivMessageAuChat(this.lsMsg[i]);

     Global.$etat.instanceChat.rafraichirScrollChat();
   }
};

/**
 * Donner un flag des canaux accessibles au joueur.
 *
 * @returns {int} entier représentant le flag
 * @private
 */
function GetCanauxDispo() {
    return   N_CANAL_TOUS /* Tous */
           | (Global.$etat.joueur.membreModeration() ? N_CANAL_VIP : 0) /* VIP */
           | (Global.$etat.joueur.estModoJeu() ? N_CANAL_MP : 0) /* MP */
           | (Global.$etat.joueur.dansTeam() ? N_CANAL_TEAM : 0) /* Team */
           | (Global.$etat.joueur.teamEnFusion() ? N_CANAL_CT : 0) /* CT */
           | (Global.$etat.joueur.aSalonDiscussion() ? N_CANAL_SALON : 0) /* Salon */
           | (Global.$etat.jeu !== null && Global.$etat.jeu.Forteresse !== undefined ? N_CANAL_ALLIES : 0) /* Alliés */
           | (0 << N_CANAL_ELO) /* Elo [TODO] */
           | (N_CANAL_CHUCHOTER); /* Chuchoter À */
};

/**
 * Retourne le nom de la "class" CSS correspondant
 * à la couleur du nom du canal associé à <canal>.
 *
 * @param {int} canal : N_CANAL_*
 *
 * @returns {String}
 */
function IdCanalToNomCouleur(canal) {
  if (canal === N_CANAL_TOUS)
     return "canalTous";
  else if (canal === N_CANAL_VIP)
     return "canalVIP";
  else if (canal === N_CANAL_MP)
     return "canalMP";
  else if (canal === N_CANAL_TEAM)
     return "canalTeam";
  else if (canal === N_CANAL_CT)
     return "canalCT";
  else if (canal === N_CANAL_SALON)
     return "canalSalon";
  else if (canal === N_CANAL_ALLIES)
     return "canalAllies";
  else if (canal === N_CANAL_ELO)
     return "canalELO";
  else if (canal === N_CANAL_CHUCHOTER)
     return "canalChucho";
  else if (canal === N_CANAL_TOUS_CANAUX_CIBLES)
     return "canalGeneral";
};

/**
 * Retourne la commande à envoyer pour envoyer
 * un message sur le canal en cours (<canalEnCours>).
 *
 * Prend en compte <Global.$etat.instanceChat.destinatairesCanal>
 * quand nécessaire.
 *
 * @returns {String} la commande à envoyer
 */
function CanalToMessageReseau(canalEnCours) {
  if (canalEnCours === N_CANAL_TOUS)
      return "ts";
  else if (canalEnCours === N_CANAL_VIP)
      return "a";
  else if (canalEnCours === N_CANAL_MP)
      return "mp";
  else if (canalEnCours === N_CANAL_TEAM)
      return "t";
  else if (canalEnCours === N_CANAL_CT)
      return "ct";
  else if (canalEnCours === N_CANAL_SALON)
      return "s";
  else if (canalEnCours === N_CANAL_ALLIES)
      return "al";
  else if (canalEnCours === N_CANAL_ELO)
      return "melo";
  else if (canalEnCours === N_CANAL_CHUCHOTER)
      return "m " + Global.$etat.instanceChat.destinatairesCanal;
  else
      return "ts";

};

export {N_CANAL_TOUS, N_CANAL_VIP, N_CANAL_MP, N_CANAL_TEAM, N_CANAL_CT, N_CANAL_SALON, N_CANAL_ALLIES,
        N_CANAL_ELO, N_CANAL_CHUCHOTER, N_MAX_CANAL, N_CANAL_FORUM, N_CANAL_TOUS_CANAUX_CIBLES,

        Canal,

        GetCanauxDispo, IdCanalToNomCouleur, CanalToMessageReseau};
