<style src="../css/messagerie.css">
</style>

<template>
    <div>
        <!--<div v-if="!messagerieVisible" v-on:click="ouvrirMessagerie" title="Messagerie">Messagerie {{nbMessagesRecus}}</div>-->
        <div class="window" v-if="messagerieVisible" style="cursor: auto;">
            <div class="window-header">
                <div class="window-title couleur-gris">{{ $config.txt.FEN_MESSAGERIE[$config.lang] }}</div>
            </div>
            <div class="window-body" id="messagerie">
                <span class="titre-messagerie yellow">{{ titreActuel }} {{ nbMessages }}</span>
                <span class="message-erreur red" v-if="erreur">{{ erreur }}</span>
                <div class="liste-messages" v-if="!envoiMessage && (messagesRecus.visible || messagesEnvoyes.visible)">
                    <div v-if="messagesActuels.messages.length === 0">Votre messagerie est vide.</div>
                    <div v-for="message in messagesActuels.messages" :key="message.id" v-if="messagesActuels.visible" class="message">
                        <div class="info-message">
                            <span class="red">Envoyé {{messagesRecus.visible ? "par" : "à"}}</span>
                            <span class="yellow">{{ messagesRecus.visible ? message.auteur : message.destinataire }}</span>
                            <span class="red">le</span> <span class="green">{{ message.date }}</span>
                        </div>
                        <div v-html="message.contenu" class="contenu-message"></div>
                    </div>
                </div>
                <div class="envoi-message" v-if="envoiMessage">
                    Destinataire : <input id="destinataire" v-on:keyup="keyupInput" v-model="messageAEnvoyer.destinataire" type="text"
                      maxlength="12" minlength="1" autocomplete="off" autocorrect="off" spellcheck="false" class="inputTextNoir" /><br>
                    <textarea id="contenu" v-on:keyup="keyupInput" v-model="messageAEnvoyer.contenu" class="contenu-message-envoi"></textarea>
                    <a class="Fenetre_lien taille-medium" @click.prevent="annulerMessage">Annuler</a>
                    <a class="Fenetre_lien taille-medium" @click.prevent="envoyerMessage">Envoyer</a>
                </div>
                <div class="bottom">
                    <a class="Fenetre_lien taille-medium" @click.prevent="afficherNouveauMessage">Nouveau message</a>
                    <a class="Fenetre_lien taille-medium" @click.prevent="afficherMessagesRecus">Messages reçus</a>
                    <a class="Fenetre_lien taille-medium" @click.prevent="afficherMessagesEnvoyes">Messages envoyés</a>
                    <a class="Fenetre_lien taille-medium">Supprimer les messages reçus</a>
                </div>
            </div>
            <div class="window-footer">
                <a id="close-text" class="Fenetre_lien taille-medium" @click.prevent="fermerMessagerie">{{ $config.txt.FEN_CLOSE[$config.lang] }}</a>
            </div>
        </div>
    </div>
</template>

<script>
import Global from '../Global.js';
export default {
   name: 'Messagerie',

   data() {
      return {
         erreur: null,
         envoiMessage: false, // Est-ce qu'on est sur la fenêtre d'envoi d'un message
         messagerieVisible: false,
         titreActuel: "Messages reçus",
         messagesActuels: { // Pour ne pas générer d'erreur puisque c'est pré-compilé
            visible: false,
            messages: [],
         },
         messagesRecus: {
            visible: true,
            messages: []
         },
         messagesEnvoyes: {
            visible: false,
            messages: []
         },
         messageAEnvoyer: {
            contenu: null,
            destinataire: null
         },
      }
   },

   methods: {
      traiterReponse(code, msg, _data) {
         if (code === "MPxLR" || code === "MPxLE") { // Contenu des messages reçus (LR) et envoyés (LE)
            if (msg[1]) {
               const char = "\x02";
               const messages = msg[1].split(char + char);

               if (code === "MPxLR")
                  this.messagesRecus.messages = [];
               if (code === "MPxLE")
                  this.messagesEnvoyes.messages = [];
               for (let i = 1; i<messages.length;i++) {
                  const message = messages[i].split(char);
                  const nouveauMessage = {
                     date: message[0],
                     auteur: message[1],
                     destinataire: message[2],
                     contenu: message[3].replace(/\r/g, "<br>"),
                     id: message[4]
                  };

                  if (code === "MPxLR") // Si on traite des messages reçus
                     this.messagesRecus.messages.push(nouveauMessage);
                  if (code === "MPxLE") // Si on traite des messages envoyés
                     this.messagesEnvoyes.messages.push(nouveauMessage);
               }
            }
         } else if (code === "MPxNB") { // Nombre de messages reçus
            if (msg[1])
               Global.$etat.joueur.nbMessagesPrives = parseInt(msg[1]);
         } else if (code === "MPxNM") {
            if (msg[1] === "1")
               this.erreur = "Vous ne possédez pas le temps nécessaire pour envoyer des messages privés";
            else if (msg[1] === "2")
               this.erreur = "Ce joueur est dans votre liste noire";
            else if (msg[1] === "4")
               this.erreur = "Vous devez patienter 30 secondes entre chaque envoi de message";
            else if (msg[1] === "5")
               this.erreur = "Votre destinataire a désactivé sa messagerie";
            else if (msg[1] === "6")
               this.erreur = "Ce joueur n'existe pas";
            else if (msg[1] === "7")
               this.erreur = "Vous ne pouvez pas envoyer de message pour le moment";
            else if (msg[1] === "8")
               this.erreur = "Vous pouvez envoyer au maximum 4 messages par destinataire toutes les 24 heures";
            else if (msg[1] === "9")
               this.erreur = "La boite de votre destinataire est pleine";
            else if (msg[1] === "10")
               this.erreur = "Vous ne pouvez pas envoyer plus de 20 messages en moins de 24 heures";
         } else {
            return false;
         }
      },

      afficherMessagesEnvoyes() {
         Global.$config.reseau.Envoie("MPxLE"); // Demander les messages envoyés
         this.titreActuel = "Messages envoyés";
         this.messagesEnvoyes.visible = true;
         this.messagesRecus.visible = false;
         this.messagesActuels = this.messagesEnvoyes;
         this.envoiMessage = false;
      },

      afficherMessagesRecus() {
         Global.$config.reseau.Envoie("MPxLR"); // Demander les messages reçus
         this.titreActuel = "Messages reçus";
         this.messagesEnvoyes.visible = false;
         this.messagesRecus.visible = true;
         this.messagesActuels = this.messagesRecus;
         this.envoiMessage = false;
      },

      afficherNouveauMessage() {
         this.erreur = null;
         this.titreActuel = "Nouveau message";
         this.envoiMessage = true;
      },

      ouvrirMessagerie() {
         this.afficherMessagesRecus();
         this.messagerieVisible = true;
         Global.$etat.instanceChat.activerOeilChat();
      },

      fermerMessagerie() {
         Global.$etat.instanceChat.desactiverOeilChat();
         this.messagerieVisible = false;
         this.messagesActuels = {
            visible: false,
            messages: []
         }
      },

      envoyerMessage() {
        this.erreur = null;
        if (this.messageAEnvoyer.destinataire && this.messageAEnvoyer.destinataire.length > 0 && this.messageAEnvoyer.destinataire.length < 13) {
           if (this.messageAEnvoyer.contenu && this.messageAEnvoyer.contenu.length > 0) {
              Global.$config.reseau.Envoie("MPxNM#" + this.messageAEnvoyer.destinataire + "#" + this.messageAEnvoyer.contenu);
           } else {
              this.erreur = "Vous devez préciser un contenu";
           }
        } else {
           this.erreur = "Vous devez préciser un destinataire";
        }
      },

      annulerMessage() {
        this.messageAEnvoyer.contenu = null;
        this.messageAEnvoyer.destinataire = null;
        this.afficherMessagesRecus();
      },

      keyupInput(event) {
         let data = this.messageAEnvoyer[event.target.id];
         // Remplacer tous les caractères "interdits"
         if (data)
            this.messageAEnvoyer[event.target.id] = data.replace(/[^\x00-\xFF]/g, "");
      }
   },

   computed: {
      /**
       * @returns {String} : nombre de messages (envoyés ou reçus) affichés actuellement
       */
      nbMessages() {
        if(this.messagesActuels.visible && !this.envoiMessage) {
           return this.messagesActuels.messages.length > 0 ? '(' + this.messagesActuels.messages.length + ')' : "";
        } else {
           return "";
        }
      },

      /**
       * @returns {String} : nombre de messages reçus
       */
      nbMessagesRecus() {
         return Global.$etat.joueur.nbMessagesPrives > 0 ? '(' + Global.$etat.joueur.nbMessagesPrives + ')' : "";
      }
   },

   mounted() {
      Global.$etat.messagerie = this;
      Global.$config.reseau.registerTraitementReponse(this);
   },

   created() {
     this.$root.$on("afficher-fenetre-messagerie", (v) => {
        if (v)
           this.ouvrirMessagerie();
        else
           this.fermerMessagerie();
      });
   },

   beforedestroyed() {
      this.$config.reseau.stopRegTraitementReponse(this);
   }
}
</script>
