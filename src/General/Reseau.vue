<template>
    <div>
        <div v-if="!waiting">
           <router-view v-on:updateUserConnected="updateUserConnected" v-on:register="registerTraitementReponse" :userConnected="userConnected" :reseau="this" v-if="!reseau.isClosed" />
        </div>

        <div v-if="reseau.message" class="row justify-content-center">
            <div class="alert alert-info col-lg-3">
                {{reseau.message}}
            </div>
        </div>
    </div>
</template>

<script>
  import Serveur from "../utils/Serveur.js";
  import Global from "../Global.js";

  export default {
    name: "Reseau",
    props: {
      userConnected: Boolean,
      traduire: Function
    },
    data() {
      return {
        socket: null,
        waiting: true,
        nbTentativeReco: 0,
        reseau: {
          isClosed: false,
          message: null
        },
        idMapPartieEnCours: "00000",
        reseauHandlers: []
      }
    },
    methods: {
      initReseau() {
         const vm = this;
         if (!window.WebSocket) {
            this.makeAlert("danger", this.$config.txt.SUPPORT_WS[this.$config.lang]);
            return false;
         }

         try {
            this.socket = new WebSocket((this.$config.local ? `ws://${this.$config.ipLocale}` : "ws" + (this.$config.ssl ? "s" : "") + `://${this.$config.ipOnline}`));
         } catch (erreur) {
            this.makeAlert("danger", this.$config.txt.ECHEC_CO[this.$config.lang] + erreur);
            return false;
         }

         this.socket.onopen = this.onOpen;
         this.socket.onerror = this.erreurSocket;
         this.socket.onmessage = this.reception;
         this.socket.onclose = this.closeSocket;

         console.log("connected ws : "+ vm.socket.url);
         this.$etat.instanceChat.reseau = this;

         return true;
      },

      onOpen() {
         this.waiting = false;
         this.nbTentativeReco = 0;
         this.EnvoieBrut(this.$config.versionMajeure + this.$config.versionMineure);
      },

      erreurSocket(event) {
         console.log("Erreur socket : " + event.error);
      },

      reception(event) {
         let data = event.data;

         console.log("Reçu : " + data);

         const message = data.split('#');
         const code = message[0];

         for (let i = this.reseauHandlers.length - 1; i >= 0; --i) {
            // On sort de la boucle lorsque le message est traité
            if (this.reseauHandlers[i].traiterReponse(code, message, data))
               return;
         }

         Serveur.HandleMessageServeur(data);
      },

      closeSocket(event) {
         console.log("Close " + event.code + "###" + event.reason);
         this.reseau.isClosed = true;
         this.reseau.message = "Connexion interrompue !";
      },

      Envoie(message) {
         this.EnvoieBrut("0000" + this.idMapPartieEnCours + message);
      },

      EnvoieBrut(message) {
         if (this.waiting || this.reseau.isClosed) {
            this.makeAlert("warning", "Waiting reseau");
            return;
         }

        /*while (this.socket.bufferedAmount > 0);*/

         try {
            this.socket.send(message);
            console.log("Send : "+message);
         } catch (e) {
            console.log("FAIL SEND: " + e);
         }
      },

      /**
       * Ajouter <handler> comme un objet écoutant et traitant
       * les messages réseau.
       *
       * <handler> doit posséder une méthode :
       *    bool traiterReponse(String code, String message, String data)
       *
       * Une fois que l'objet n'a plus besoin d'écouter le réseau,
       * il DOIT appeler stopRegTraitementReponse().
       *
       * @param {Object} handler
       *
       * @return {None}
       */
      registerTraitementReponse(handler) {
         this.reseauHandlers.push(handler);
      },

      /**
       * Retire <handler> de la liste des objets écoutant le
       * réseau.
       *
       * Cette fonction doit être appelée autant de fois
       * que registerTraitementReponse().
       *
       * La fonction retourne true si le handler était
       * enregistré et qu'il a été retiré et, retourne false
       * si le handler n'était pas enregistré.
       *
       * @param {Object} handler
       *
       * @return {Boolean}
       */
      stopRegTraitementReponse(handler) {
         let i = this.reseauHandlers.indexOf(handler);

         if (i !== -1) {
            this.reseauHandlers.splice(i, 1);
            return true;
         }

         return false;
      },

      updateUserConnected(user) {
         this.$emit("updateUserConnected", user);
      }
    },

    mounted() {
       this.initReseau();
       Global.$config.reseau = this;
    }
  }
</script>
