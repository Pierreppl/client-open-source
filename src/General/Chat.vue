<style src="../css/chat.css">
</style>

<template>
<div ref="chatContainer" id="chat-container">
   <div>
      <div id="show-hide-canal-nom" ref="flchAffNomCanal" v-on:click="chatShowHideCanal" title="Afficher les canaux disponibles">«</div>
      <div id="show-hide-chat">
         <span v-if="oeilChatUtilisable > 0" v-on:click="chatShowHideChat" id="oeil-shw-hd-chat">
            <img src="../I/oeilChat.svg" width="13" height="9" alt="Show/hide chat" />
         </span>
         <img v-if="oeilChatUtilisable <= 0" src="../I/oeilChatGris.svg" width="13" height="9" alt="Show/hide chat" id="oeil-gris-shw-hd-chat" style="display:inline" />
      </div>
   </div>
   <!-- Liste gauche sur laquelle cliquer -->
   <div id="chat-choix-canal" ref="choixCanal">
      <div ref="canauxDeBase" class="canauxDeBase"></div>
   </div>
   <!-- Cadre avec le chat -->
   <div ref="chatbox" id="chat-box" class="chat-box-petit">
      <!-- Zone avec les messages -->
      <div ref="chat" id="chat" class="chat-petit"></div>

      <!-- Barre en dessous des messages -->
      <div id="barre-chat">
         <!-- Agrandir/rétrécir le chat -->
         <div><a id="chat-loupe" v-on:click="alternerTaille"><img src="../I/loupe.gif" width="13" height="14" alt="&#128270;" /></a>&nbsp;</div>
         <!-- Canal en cours -->
         <div><a ref="nomCanal" id="canal" class="canalTous" v-on:click="chgmtCanal">Tous : </a></div>
         <!-- Input pour les messages à envoyer -->
         <div id="input-msg"><input ref="inputChat" id="id-input-chat" type="text" name="MsgChat" maxlength="175" v-on:keypress="keyDownBarreChat" /></div>
      </div>
   </div>

   <Vignette ref="vignette"></Vignette>
</div>
</template>

<script>

const Cnl = require("./Canal.js");

import Vue from "vue";
import * as Cmd from "./CmdPretraitee.js";
import * as General from "../utils/General.js";
import VignetteMenu from "../components/VignetteMenu.vue";

import * as Parseur from "./ParseurMsg.js";

export default {
  name: "Chat",

  components: {
    "Vignette": VignetteMenu
  },

  props: {
    userConnected: Boolean,
    reseau: Object
  },

  data: function() {
    return { canalEnCours: Cnl.N_CANAL_TOUS_CANAUX_CIBLES, // Canal d'envoi des messages
             destinatairesCanal: "*", // Personnes destinées à l'envoi des messages
             canalAffichage: null, // Canal choisi pour afficher les messages
             chatEstPetit: true,
             chgmtCanalSuivantActive: true,

             lsCanauxDeBase: [],
             lsCanauxSupplem: [],
             lsCanauxDeBaseCaches: [],

             hideShowCanalNom: Object,
             oeilChatUtilisable: 0, // Compteur du nombre de fenêtre demandant l'activation de l'option pour mettre le chat au premier plan

             bipChucho: null,

             _mountedPrecedemment: false
           };
  },

  mounted() {
    if (!this._mountedPrecedemment) {
       this._mountedPrecedemment = true;

       this.reseau.registerTraitementReponse(this);

       const canalGeneral = new Cnl.Canal(this.$config.txt.CANAL_GENERAL[this.$config.lang], Cnl.N_CANAL_TOUS_CANAUX_CIBLES);

       this.addCanalToListe(canalGeneral, true);
       canalGeneral.utiliserCommeCanal();

       this.bipChucho = new Audio(require("../assets/bipChucho.mp3"));
    }
  },

  methods: {

    /**
     * Affiche/cache la liste des canaux en cours.
     *
     * @returns {None}
     * @public
     */
    chatShowHideCanal() {
      const flchAffNomCanal = this.$refs.flchAffNomCanal;
      const choixCanal = this.$refs.choixCanal;

      if (flchAffNomCanal.innerHTML === "«") {
          flchAffNomCanal.innerHTML = "»";
          choixCanal.style.display = "block";
          this.$refs.chatContainer.parentNode.style.left = "-" + (18 + 149 + 2) + "px";
          flchAffNomCanal.title = "Masquer les canaux disponibles";
      } else {
          flchAffNomCanal.innerHTML = "«";
          choixCanal.style.display = "none";
          this.$refs.chatContainer.parentNode.style.left = "-18px";
          flchAffNomCanal.title = "Afficher les canaux disponibles";
      }
    },

    /**
     * Activer l'oeil pour faire passer le chat au premier
     * plan.
     *
     * @return {None}
     */
    activerOeilChat() {
      this.oeilChatUtilisable++;
    },

    /**
     * Désctiver l'oeil pour faire passer le chat au premier
     * plan. N'est réellement désactivé que lorsque qu'autant
     * d'appel de désactivation ont été faits que d'activation.
     *
     * @return {None}
     */
    desactiverOeilChat() {
      this.oeilChatUtilisable--;
      if (this.oeilChatUtilisable < 0) {
         this.oeilChatUtilisable = 0;
         this.chatZindexNormal();
      }
    },

    /********************************************************
      **               Gestion barre de chat              **
     ********************************************************/

    /**
     * Fonction gérant les événements keyUp de la barre de
     * chat.
     *
     * /!\ .key pas supporté sur Safari apparemment
     *
     * @param {KeyboardEvent} event
     *
     * @returns {None}
     * @public
     */
    keyDownBarreChat(event) {
      let k = event.key;

      if (k === "Enter") {
          let m = this.$refs.inputChat.value;

          if (m !== "" && m.length <= 175) {
              this.$refs.inputChat.value = "";
              this.envoyerMessageChat(m);
          }
      } else if (k === "<" || k === ">" || k === "#") {
          event.preventDefault();

          if (k === "<")
             this.chgmtCanal();
      }
    },

      /********************************************************
        **       Gestion envoie/réception de messages       **
       ********************************************************/

      /**
       * Traite <msg> en tant que message envoyé depuis le chat
       * en appuyant sur ENTER (traite donc les commandes locales
       * et générales).
       *
       * @return {None}
       */
      envoyerMessageChat(msg) {
        if (msg.charAt(0) === '/') {
            if (!Cmd.VerifEtFaitCmdPretraitee(msg.substr(1)))
               this.reseau.Envoie("CxC#" + msg.substr(1));
        } else {
            if (!this.$etat.joueur.estInvite())
               this.reseau.Envoie("CxC#" + Cnl.CanalToMessageReseau(this.canalEnCours) + " " + Parseur.ParseMessageChat(msg));
            else
               this.messageInfo("Vous devez créer un compte pour pouvoir parler.");

        }
      },

      /**
       * Simule l'utilisation de la commande "/<cmd>".
       */
      simulerCmd(cmd) {
        if (!Cmd.VerifEtFaitCmdPretraitee(cmd))
           this.reseau.Envoie("CxC#" + cmd);
      },

      /**
       * Traite les messages canaux.
       */
      traiterReponse(code, msg, _data) {
        if (!this.traiterMessageCanaux(code, msg));
        else if (!this.traiterMessageJeu(code, msg));
        else
           return false;


        return true;
      },

      /**
       * Reçoit le code <code> d'un message de joueur reçu
       * depuis le réseau. Les différentes partie du message
       * sont dans le tableau <msg>.
       *
       * @param
       *   {String} code
       * @param
       *   {String[]} msg
       * @returns
       *   {Boolean} true (le message a été traité), false
       *             sinon.
       * @public
       */
      traiterMessageCanaux(code, msg) {
        for (let i = msg.length - 1; i >= 1; --i)
           msg[i] = this.msgSur(msg[i]);

        if (code === "TxT") { // Canal team / chucho team
            this.addMessageChat("", "13:42", msg[1], Cnl.N_CANAL_TEAM);
        } else if (code === "TxCT") { // Canal team / chucho team
            this.addMessageChat("", "13:42", msg[1], Cnl.N_CANAL_CT);
        } else if (code === "CxSalon") {
            this.addMessageChat("", "13:42", msg[1], Cnl.N_CANAL_SALON);
        } else if (code === "CxMSI") {
            this.addMessageChat("", "13:42", msg[1], Cnl.N_CANAL_MP);
        } else if (code === "CxMSA") {
            this.addMessageChat("", "13:42", msg[1], Cnl.N_CANAL_VIP);
        } else if (code === "CxMSF") {
            this.addMessageChat("", "13:42", msg[1], Cnl.N_CANAL_FORUM);
        } else if (code === "CxMELO") {
            this.addMessageChat("", "13:42", msg[1], Cnl.N_CANAL_ELO);
        } else if (code === "CxM") {
            if (msg.length < 4) { // Message canal Tous
                if (!this.$etat.joueur.veutMessageSalon())
                   return;
                if (this.$etat.evenement.saturnaaaahles) {
                   if (this.$etat.joueur.jEvent.estMuteSaturnaaaahles(msg[2]))
                      msg[1] = "<span style='font-size: 7px'>" + msg[1] + "</span>";
                   if (this.$etat.joueur.jEvent.estBanKickSaturnaaaahles(msg[2]))
                      msg[2] = "?";
                }

                    this.addMessageChat(msg[2], "13:42", msg[1], Cnl.N_CANAL_TOUS);
                } else if (msg.length === 4) { // Chuchotement
                    // Ajout d'un canal chuchotement
                    if (!Vue.prototype.$etat.joueur.memePseudo(msg[3])) {
                        if (!this.canalDejaPresent(msg[3])) {
                            this.addCanalToListe(new Cnl.Canal(msg[3], Cnl.N_CANAL_CHUCHOTER, msg[3]));
                        }

                        if (!General.PageVisible()) {
                           this.bipChucho.currentTime = 0;
                           this.bipChucho.play();
                        }
                    } else {
                        if (!this.canalDejaPresent(msg[1])) {
                            this.addCanalToListe(new Cnl.Canal(msg[1], Cnl.N_CANAL_CHUCHOTER, msg[1]));
                        }
                    }

                    this.addMessageChat(msg[3], "13:42", msg[2], Cnl.N_CANAL_CHUCHOTER, msg[1]);
                } else if (msg.length === 5) { // Connexion/déco d'ami
                    if (msg[4] === "0") {
                        this.addMessageChat("", "13:42", msg[1] + this.$config.txt.CO_AMI[this.$config.lang], Cnl.N_CANAL_CHUCHOTER);
                    } else {
                        this.addMessageChat("", "13:42", msg[1] + this.$config.txt.DECO_AMI[this.$config.lang], Cnl.N_CANAL_CHUCHOTER);
                    }
                } else { // Chuchotement échoué
                    this.messageInfo(this.$config.txt.NON_CO[this.$config.lang]);
                }
        }

        else
            return true;

        return false;
      },

      /**
       * Reçoit le code <code> d'un message d'annonce reçu
       * depuis le réseau. Les différentes partie du message
       * sont dans le tableau <msg>.
       *
       * @param
       *   {String} code
       * @param
       *   {String[]} msg
       * @returns
       *   {Boolean} true (le message a été traité), false
       *             sinon.
       * @public
       */
      traiterMessageJeu(code, msg) {
        if (code === "CxINFO") {
            this.messageInfo(msg[1]);
        } else if (code === "CxMS") {
            this.messageModeration(msg[1]);
        } else if (code === "CxMSS") {
            this.messageServeur(msg[1]);
        } else if (code === "CxMSV") {
            this.messageAV(msg[1]);
        } else if (code === "CxMSF") {
            this.messageAVF(msg[1]);
        } else if (code === "CxMANIM") {
            this.messageAnim(msg[1]);
        }

        else
            return true;

        return false;
      },

      /**
       * Évite l'insertion frauduleuse de balises dans des messages du chat.
       */
      msgSur(msg) {
         return msg.replace(/</g, "&lt;").replace(/>/g, "&gt;");
      },


      /********************************************************
        **           Gestion affichage message              **
       ********************************************************/

      /**
       * Affiche <message> sur le chat.
       *
       * @param {String} auteur : Auteur du message
       *
       * @param {String} date : Date d'envoi du message
       *
       * @param {String} message : Message à afficher
       *
       * @param {String} canal : Nom du canal sur lequel le message
       *                         a été envoyé.
       *
       * @param {String} recepteur : joueur à qui est adressé le
       *                             message (optionnel, cf chucho).
       *
       * @returns {None}
       * @public
       */
      addMessageChat(auteur, date, message, canal=-1, recepteur="") {
        let typeMessage = "msgRecu";

        if (auteur !== "" && Vue.prototype.$etat.joueur.memePseudo(auteur)) {
            typeMessage = "msgEnv";
        }

        if (canal === Cnl.N_CANAL_TOUS)
            this.messageCanalTous(auteur, date, message, typeMessage);
        else if (canal === Cnl.N_CANAL_VIP)
            this.messageCanalVIP(date, message, typeMessage);
        else if (canal === Cnl.N_CANAL_MP)
            this.messageCanalMP(date, message, typeMessage);
        else if (canal === Cnl.N_CANAL_TEAM)
            this.messageCanalTeam(date, message, typeMessage);
        else if (canal === Cnl.N_CANAL_CT)
            this.messageCanalChuchoTeam(date, message, typeMessage);
        else if (canal === Cnl.N_CANAL_SALON)
            this.messageCanalSalon(date, message, typeMessage);
        else if (canal === Cnl.N_CANAL_ALLIES)
            this.messageCanalAllies(date, message, typeMessage);
        else if (canal === Cnl.N_CANAL_ELO)
            this.messageCanalElo(date, message, typeMessage);
        else if (canal === Cnl.N_CANAL_FORUM)
            this.messageCanalF(message);
        else if (canal === Cnl.N_CANAL_CHUCHOTER)
            this.messageCanalChucho(auteur, date, message, typeMessage, recepteur);
      },

      /**
       * Ajoute <str> dans la zone de chat.
       *
       * @param {String} str : texte HTML à ajouter
       * @param {String} className : nom de la classe du div
       *        contnenant le fichier.
       * @param
       * @returns {DOM} div element with the text added
       * @private
       */
      addStrAuChat(str, couleur, divClass, typeCanal, nomSpecial="") {
        let div = Parseur.ParseMessageLien(str, divClass);

        div.style.color = couleur;

        if (this.canalAffichage.concerneParMsg(typeCanal, nomSpecial) || this.chgmtCanalSuivantActive) {
            this.addDivMessageAuChat(div);
            this.rafraichirScrollChat();
        }

        this.addMsgCanauxConcernes(div, typeCanal, nomSpecial);
      },

      cleanMessagesChat() {
        while (this.$refs.chat.firstChild)
            this.$refs.chat.removeChild(this.$refs.chat.firstChild);
      },

      addDivMessageAuChat(divMsg) {
        this.$refs.chat.appendChild(divMsg);
      },

      /**
       * Scroll le chat au maximum
       */
      rafraichirScrollChat() {
        this.$refs.chat.scrollTop = this.$refs.chat.scrollHeight;
      },

      /**
       * Ajoute le message <divMsg> à la liste des messages des canaux
       * dont le type correspond.
       *
       * @param {DOM} divMsg : élément div qui contient le message
       *
       * @param {String} typeCanal : type de canal concerné
       *
       * @param {String} nomSpecial : nom spécial du canal (si le type
       *        du canal ne suffit pas)
       *
       * @returns {None}
       * @private
       */
      addMsgCanauxConcernes(divMsg, typeCanal, nomSpecial="") {
        let aUp = [];

        for (let i = this.lsCanauxSupplem.length - 1; i >= 0; --i) {
           if (this.lsCanauxSupplem[i].addMessageSiBonType(divMsg, typeCanal, nomSpecial) && i !== 0)
              aUp.push(this.lsCanauxSupplem[i]);
        }

        for (let i = aUp.length - 1; i >= 0; --i) {
          this.supprCanalListe(aUp[i], false);
          this.addCanalToListe(aUp[i], false, true);
        }

        for (let i = this.lsCanauxDeBase.length - 1; i >= 0; --i)
            this.lsCanauxDeBase[i].addMessageSiBonType(divMsg, typeCanal, nomSpecial);
      },

      messageCanalTous(auteur, date, message, typeMsg) {
        if (this.$etat.evenement.stVal) {
            this.addStrAuChat(Parseur.REF_PSEUDO_DEB + auteur + Parseur.REF_PSEUDO_FIN
                       + " : " + message, "#ED67EA", typeMsg + "CnlTous", Cnl.N_CANAL_TOUS);
        } else {
            this.addStrAuChat(Parseur.REF_PSEUDO_DEB + auteur + Parseur.REF_PSEUDO_FIN
                       + " : " + message, "#C2C2DA", typeMsg + "CnlTous", Cnl.N_CANAL_TOUS);
        }
      },

      messageCanalChucho(auteur, date, message, typeMsg, recepteur) {
        if (auteur === "") {
            this.addStrAuChat(message, "#A7D889", typeMsg, Cnl.N_CANAL_CHUCHOTER);
        } else if (Vue.prototype.$etat.joueur.memePseudo(recepteur)) {
            this.$etat.joueur.auteurDernierChuchoRecu = auteur;

            if (this.$etat.evenement.stVal) {
              this.addStrAuChat("["
                       + Parseur.REF_PSEUDO_DEB + auteur + Parseur.REF_PSEUDO_FIN
                       + "]" + this.$config.txt.VOUS_SUSURRE[this.$config.lang]
                       + message, "#A7D889", typeMsg, Cnl.N_CANAL_CHUCHOTER, auteur);
           } else {
              this.addStrAuChat("["
                       + Parseur.REF_PSEUDO_DEB + auteur + Parseur.REF_PSEUDO_FIN
                       + "]" + this.$config.txt.VOUS_CHUCHOTE[this.$config.lang]
                       + message, "#A7D889", typeMsg, Cnl.N_CANAL_CHUCHOTER, auteur);
           }
        } else {
            if (this.$etat.evenement.stVal) {
              this.addStrAuChat(this.$config.txt.VOUS_SUSURREZ[this.$config.lang] + recepteur
                       + " : "
                       + message, "#D3A769", typeMsg, Cnl.N_CANAL_CHUCHOTER, recepteur);
           } else {
              this.addStrAuChat(this.$config.txt.VOUS_CHUCHOTEZ[this.$config.lang] + recepteur
                       + " : "
                       + message, "#D3A769", typeMsg, Cnl.N_CANAL_CHUCHOTER, recepteur);
           }
        }

        this.$root.$emit("message-prive-recu", true);

      },

      messageCanalAllies(date, message, typeMsg) {
        this.addStrAuChat(message, "#C2C2DA", typeMsg, Cnl.N_CANAL_ALLIES);
      },

      messageCanalTeam(date, message, typeMsg, canalFusion=false) {
        this.addStrAuChat(message, "#68EDAD", typeMsg, (canalFusion ? Cnl.N_CANAL_CT : Cnl.N_CANAL_TEAM));
      },

      messageCanalChuchoTeam(date, message, typeMsg) {
        this.messageCanalTeam(date, message, typeMsg, true);
      },

      messageCanalSalon(date, message, typeMsg) {
        this.addStrAuChat(message, "#77B5FE", typeMsg, Cnl.N_CANAL_SALON);
      },

      messageServeur(message) {
        this.addStrAuChat(this.$config.txt.ENTETE_MSG_SERVEUR[this.$config.lang]
                         + " " + message, "#B84DD2", "msgRecu", Cnl.N_CANAL_TOUS_CANAUX_CIBLES);
      },

      messageModeration(message) {
        if (this.$etat.evenement.halloween) {
            this.addStrAuChat(this.$config.txt.ENTETE_MSG_MODERATION_HALLOWEEN[this.$config.lang] + " "
                     + message,"#B84DD2", "msgRecu", Cnl.N_CANAL_TOUS_CANAUX_CIBLES);
        } else {
            this.addStrAuChat(this.$config.txt.ENTETE_MSG_MODERATION[this.$config.lang] + " "
                     + message, "#B84DD2", "msgRecu", Cnl.N_CANAL_TOUS_CANAUX_CIBLES);
        }
      },

      messageBot(message) {
        this.addStrAuChat("[Bot] " + message, "#009D9D", "msgRecu", Cnl.N_CANAL_TOUS);
      },

      messageCanalElo(date, message, typeMsg) {
        this.addStrAuChat("[Elo]" + message, "#FFD5EA", typeMsg, Cnl.N_CANAL_ELO);
      },

      messageCanalMP(date, message, typeMsg) {
        this.addStrAuChat("[MP] " + message, "#ED67EA", typeMsg, Cnl.N_CANAL_MP);
      },

      messageCanalVIP(date, message, typeMsg) {
        this.addStrAuChat("<span style='color: #E4C76D'>[VIP] </span>"
                         + message, "#7BA3CA", typeMsg, Cnl.N_CANAL_VIP);
      },

      messageAV(message) {
        this.addStrAuChat("[AV] " + message, "#E491EE", "msgRecu", Cnl.N_CANAL_MP);
      },

      messageAVF(message) {
        MessageCanalF(message);
      },

      messageCanalF(message) {
        this.addStrAuChat("[F] " + message, "#02A0DE", "msgRecu", Cnl.N_CANAL_FORUM);
      },

      messageAnim(message) {
        this.addStrAuChat(message, "#B174DA", "msgRecu", Cnl.N_CANAL_TOUS_CANAUX_CIBLES);
      },

      messageInfo(message) {
        this.addStrAuChat(message, "#7C7E9E", "msgRecu", Cnl.N_CANAL_TOUS);
      },

      messageTousJeu(auteur, message) {
         let typeMessage = "msgRecu";

         if (auteur !== "" && Vue.prototype.$etat.joueur.memePseudo(auteur)) {
            typeMessage = "msgEnv";
         }

         this.messageCanalTous(auteur, "13:42", message, typeMessage);
      },

      /********************************************************
        **                  Gestion canal                   **
       ********************************************************/

      afficherVignette(event, canal) {
         let i = this.getCanalIndice(canal, false);

         if (i === -1) // Canal de base => pas d'option
            return;

         let opt = [];
         const vm = this;

         opt.push(["Supprimer le canal",
                   function() { vm.supprCanalListe(canal, false); }
                 ]);

         opt.push(["Monter le canal",
                   function() {
                      vm.supprCanalListe(canal, false);
                      vm.addCanalToListe(canal, false, true);
                   }
                 ]);

         this.$refs.vignette.ouvrir(event, opt, { x: 0, y: 0});
      },

      addCanalEtSelectionne(canal, canalDeBase=false) {
         let cnl = this.getCanalLsCanaux(canal.getNom(), canalDeBase);

         if (cnl === null) {
            this.addCanalToListe(canal);
            cnl = canal;
         }

         cnl.utiliserCommeCanal();
      },

      /**
       * Permet de passer au canal suivant (clic sur le canal ou touche "<>\").
       *
       * @returns {None}
       * @public
       */
      chgmtCanal() {
          if (!this.chgmtCanalSuivantActive)
              return;

          if (this.canalEnCours === Cnl.N_CANAL_TOUS_CANAUX_CIBLES)
              this.canalEnCours = Cnl.N_CANAL_TOUS;


          let canauxDispo = Cnl.GetCanauxDispo() & (~Cnl.N_CANAL_CHUCHOTER);
          let i;

          i = 1;
          for(; (canauxDispo & (this.canalEnCours << i)) === 0 && (this.canalEnCours << i) !== Cnl.N_MAX_CANAL ; ++i);

          this.changerCanalVisible(((this.canalEnCours << i) !== Cnl.N_MAX_CANAL ? (this.canalEnCours << i) : Cnl.N_CANAL_TOUS));
      },

      /**
       * Met à jour le canal en cours en <canal>.
       *
       * @param {int} canal : valeur du canal (cf Cnl.N_CANAL_*) à rendre visible
       *
       * @returns {None}
       * @private
       */
      changerCanalVisible(canal) {
        this.canalEnCours = canal;

        if (canal === Cnl.N_CANAL_TOUS)
           this.updateCanal(this.$config.txt.CANAL_TOUS[this.$config.lang] + this.$config.txt.SP_DBL_PONCT[this.$config.lang] + ":", Cnl.IdCanalToNomCouleur(Cnl.N_CANAL_TOUS));
        else if (canal === Cnl.N_CANAL_VIP)
           this.updateCanal(this.$config.txt.CANAL_VIP[this.$config.lang] + this.$config.txt.SP_DBL_PONCT[this.$config.lang] + ":", Cnl.IdCanalToNomCouleur(Cnl.N_CANAL_VIP));
        else if (canal === Cnl.N_CANAL_MP)
           this.updateCanal(this.$config.txt.CANAL_MP[this.$config.lang] + this.$config.txt.SP_DBL_PONCT[this.$config.lang] + ":", Cnl.IdCanalToNomCouleur(Cnl.N_CANAL_MP));
        else if (canal === Cnl.N_CANAL_TEAM)
           this.updateCanal(this.$config.txt.CANAL_TEAM[this.$config.lang] + this.$config.txt.SP_DBL_PONCT[this.$config.lang] + ":", Cnl.IdCanalToNomCouleur(Cnl.N_CANAL_TEAM));
        else if (canal === Cnl.N_CANAL_CT)
           this.updateCanal(this.$config.txt.CANAL_CT[this.$config.lang] + this.$config.txt.SP_DBL_PONCT[this.$config.lang] + ":", Cnl.IdCanalToNomCouleur(Cnl.N_CANAL_CT));
        else if (canal === Cnl.N_CANAL_SALON)
           this.updateCanal(this.$config.txt.CANAL_SALON[this.$config.lang] + this.$config.txt.SP_DBL_PONCT[this.$config.lang] + ":", Cnl.IdCanalToNomCouleur(Cnl.N_CANAL_SALON));
        else if (canal === Cnl.N_CANAL_ALLIES)
           this.updateCanal(this.$config.txt.CANAL_ALLIES[this.$config.lang] + this.$config.txt.SP_DBL_PONCT[this.$config.lang] + ":", Cnl.IdCanalToNomCouleur(Cnl.N_CANAL_ALLIES));
        else if (canal === Cnl.N_CANAL_ELO)
           this.updateCanal(this.$config.txt.CANAL_ELO[this.$config.lang] + this.$config.txt.SP_DBL_PONCT[this.$config.lang] + ":", Cnl.IdCanalToNomCouleur(Cnl.N_CANAL_ELO));
        else if (canal === Cnl.N_CANAL_CHUCHOTER)
           this.updateCanal(this.$config.txt.CANAL_CHUCHOTER[this.$config.lang] + this.$config.txt.SP_DBL_PONCT[this.$config.lang] + ":", Cnl.IdCanalToNomCouleur(Cnl.N_CANAL_CHUCHOTER));
        else if (canal === Cnl.N_CANAL_TOUS_CANAUX_CIBLES)
           this.updateCanal(this.$config.txt.CANAL_GENERAL[this.$config.lang] + this.$config.txt.SP_DBL_PONCT[this.$config.lang] + ":", Cnl.IdCanalToNomCouleur(Cnl.N_CANAL_TOUS_CANAUX_CIBLES))
      },

      estCanalEnUtilisation(canal) {
        return this.canalAffichage === canal;
      },

      estCanalGeneralEnUti() {
        return (this.canalAffichage !== null && this.canalAffichage.getType() === Cnl.N_CANAL_TOUS_CANAUX_CIBLES);
      },

      /**
       * Permet d'acutaliser le HTML représentant le canal.
       *
       * @param {String} nouvNom : nom du canal à mettre (inclure " :")
       *
       * @param {String} classe : class du canal à utiliser
       *
       * @returns {None}
       * @private
       */
      updateCanal(nouvNom, classe) {
        this.$refs.nomCanal.innerHTML = nouvNom;
        this.$refs.nomCanal.className = classe;
      },

      /**
       * Passer/retirer le chat au premier plan.
       */
      chatShowHideChat() {
        if (this.$refs.chatContainer.parentNode.style.zIndex === "999")
            this.chatZindexNormal();

        else
            this.$refs.chatContainer.parentNode.style.zIndex = "999";
      },

      /**
       * Retirer le chat du premier plan
       */
      chatZindexNormal() {
        this.$refs.chatContainer.parentNode.style.zIndex = "80";
      },

      /**
       * Ajoute un canal dans la liste gauche.
       *
       * @param {Canal} canal : canal à ajouter
       *
       * @param {Boolean} canalDeBase : indique si le canal est un de base (Tous,
       *                                Salon, Team, ...)
       *
       * @returns {None}
       * @public
       */
      addCanalToListe(canal, canalDeBase=false, first=false) {
        let html;
        let lsCanal;

        if (!canalDeBase) {
            html = this.$refs.choixCanal;
            lsCanal = this.lsCanauxSupplem;
        } else {
            html = this.$refs.canauxDeBase;
            lsCanal = this.lsCanauxDeBase;
        }

        if (!first || lsCanal.length === 0) {
           html.appendChild(canal.getHTMLElement());
           lsCanal.push(canal);
        } else {
           if (canal === lsCanal[0])
              return;

           html.insertBefore(canal.getHTMLElement(), lsCanal[0].getHTMLElement());
           lsCanal.unshift(canal);
        }
      },

      supprCanalListe(canal, canalDeBase=false) {
         let i = this.getCanalIndice(canal, canalDeBase);
         let child, lsCanal = this.getLsCanal(canalDeBase);

         if (i === -1)
            return;


         if (!canalDeBase) {
             this.$refs.choixCanal.removeChild(canal.getHTMLElement());
         } else {
             this.$refs.canauxDeBase.removeChild(canal.getHTMLElement());
         }

         lsCanal.splice(i, 1);
      },

      getLsCanal(canalDeBase) {
         if (canalDeBase)
            return this.lsCanauxDeBase;

         return this.lsCanauxSupplem;
      },

      addCanalInvisible(canal) {
        this.lsCanauxDeBaseCaches.push(canal);
      },

      nouveauCanalAffichage(canal) {
        this.canalAffichage = canal;
      },

      /**
       * Indique si un canal nommé <nomCanal> existe
       * déjà dans la liste des canaux.
       *
       * @param {String} nomCanal : nom du canal dont on
       *                            cherche l'existence.
       *
       * @param {Boolean} canalDeBase : chercher si c'est un
       *                                canal de base ou nom.
       *
       * @returns {Boolean} true = canal existe, false sinon
       * @public
       */
      canalDejaPresent(nomCanal, canalDeBase=false) {
          return this.getCanalLsCanaux(nomCanal, canalDeBase) !== null;
      },

     /**
      * Recherche un canal nommé <nomCanal> dans la liste
      * des canaux.
      *
      * @param {String} nomCanal : nom du canal dont on
      *                            cherche l'existence.
      *
      * @param {Boolean} canalDeBase : chercher si c'est un
      *                                canal de base ou nom.
      *
      * @returns {Canal} le canal (null s'il n'existait pas)
      * @public
      */
      getCanalLsCanaux(nomCanal, canalDeBase=false) {
         let canal = this.getLsCanal(canalDeBase);

         let i = canal.length - 1;
         for (; i >= 0; --i) {
            if (canal[i].memeNom(nomCanal))
                return canal[i];
         }

         return null;
      },

      /**
       * Recherche un canal <canal> dans la liste  des canaux
       * et retourne son indice.
       *
       * @param {Canal} canal
       *
       * @param {Boolean} canalDeBase
       *
       * @returns {Canal} l'indice du canal (-1 s'il n'existait pas)
       * @public
       */
      getCanalIndice(canal, canalDeBase) {
         let lsCanal = this.getLsCanal(canalDeBase);

         let i = lsCanal.length - 1;
         for (; i >= 0; --i) {
            if (lsCanal[i] === canal)
                return i;
         }

         return -1;
      },

      /**
       * Supprimer la liste de canaux en cours.
       *
       * @param {Boolean} canalDeBase
       *
       * @returns {None}
       * @public
       */
      cleanCanauxChat(canalDeBase) {
        let lsCanaux;
        let zoneCanaux;

        if (canalDeBase) {
            lsCanaux = this.lsCanauxDeBase;
            zoneCanaux = this.$refs.canauxDeBase;
        } else {
            lsCanaux = this.lsCanauxSupplem;
            zoneCanaux = this.$refs.choixCanal;
        }

        let i = lsCanaux.length - 1;
        for (; i >= 0; --i) {
            zoneCanaux.removeChild(lsCanaux[i].getHTMLElement());
        }

        if (canalDeBase)
            this.lsCanauxDeBase = [];
        else
            this.lsCanauxSupplem = [];
      },

      /********************************************************
        **                Gestion taille chat               **
       ********************************************************/

      /**
       * Augmenter/réduire la taille du chat.
       *
       * @returns {None}
       * @public
       */
      alternerTaille() {
        if (this.chatEstPetit) {
            this.$refs.chatbox.className  = "chat-box-grand";
            this.$refs.chat.className  = "chat-grand";
            //document.getElementById("joueurs-cp").style.height = "597px";
            //console.log(document.getElementById("joueurs-cp"));
            this.chatEstPetit = false;
        } else {
            this.$refs.chatbox.className  = "chat-box-petit";
            this.$refs.chat.className  = "chat-petit";
            //document.getElementById("joueurs-cp").style.height = "197px";
            this.chatEstPetit = true;
        }
      },
  }


}

</script>
