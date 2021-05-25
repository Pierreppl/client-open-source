<style>
#inputPseudo, #inputMdp, #inputMdpConf, #inputPseudo:focus, #inputMdp:focus, #inputMdpConf:focus, .inputTextNoir, .inputTextNoir:focus {
 color: #029489;
 background-color: #1E1E24;
 border-radius: 3px;
 border-color: #4F4F4F;
 outline: none;
 margin-left: 5px;
 padding-left: 2px;
 font-weight: bold;
 text-align: center;
}

.lien, .lien:hover {
 font-weight: bold;
 text-decoration: none;
 outline: none;
 color: #BCC2D9;
 cursor: pointer;

 -webkit-user-select: none;
 -moz-user-select: none;
 -ms-user-select: none;
 user-select: none;
}

.lien:hover {
 text-shadow: 0 0 2px #029489;
}
</style>

<template>

<div>
   <div style="width: 800px; margin: 0 auto; position: relative; text-align: center"><Connexion :reseau="reseau" :userConnected="userConnected" :modeReduit="true"></Connexion></div>

   <Jeu v-if="connecte" :reseau="reseau" :forumVisible="true"></Jeu>
</div>
</template>

<script>

import Jeu from "./Jeu.vue";
import Connexion from "./Connexion.vue";

export default {
  name: "ForumAccesDirect",

  components: {
    "Jeu": Jeu,
    "Connexion": Connexion
  },

  data: function() {
    return { connecte: false,

             connexionEnCours: false,
             pseudo: "",
             mdp: "",
             nbDmdConnexionEnv: 0,
             messageErreur: ""
           };
  },

  props: {
    reseau: Object,
    userConnected: Boolean
  },

  methods: {
    traiterReponse(code, msg) {
       if (code === "CxN") { // Connexion invité
          const joueur = this.$etat.joueur;

          joueur.initInvite(msg[1]);
          joueur.addFlag("inv");

          this.reseau.updateUserConnected(true);
          this.reseau.stopRegTraitementReponse(this);

          this.connecte = true;

          //this.$etat.instanceChat.simulerCmd("forum");
       } else {
          return false;
       }

       return true;
    },

    /**
    * Enlève "Pseudo" de l'input pseudo quand il a le focus.
    */
    clearInput(event) {
       if (this.pseudo === "Pseudo")
          this.pseudo = "";
    },

    restrictionTouchesPseudo(event) {
       if (event.key === "Enter" && !this.connexionEnCours)
          this.connexionJeu();
       else if (!(/[a-zA-Z]/.test(event.key)) && event.key !== "Tab")
          event.preventDefault();

    },

    restrictionTouchesMdp(event) {
      if (event.key === "Enter" && !this.connexionEnCours)
          this.connexionJeu();
    },

    /**
     * Traite une demande de connexion via le bouton "Valider" et
     * vérifie que les conditions de validation sont respectées.
     */
    connexionJeu() {
       if (this.pseudo === "") {
          this.messageErreur = "Aucun pseudo spécifié.";
          return;
       } else if (this.mdp === "") {
          this.messageErreur = "Aucun mot de passe spécifié.";
          return;
       } else if (this.nbDmdConnexionEnv > 5) {
          this.messageErreur = "Trop de tentatives incorrectes.";
          return;
       }

       this.connexionEnCours = true;
       this.reseau.registerTraitementReponse(this);

       if (this.estRoute("guest") || this.mdp === "") {
          this.reseau.Envoie("CxN#" + this.pseudo);
       } else if (this.estRoute("login")) {
          this.$SHA256(this.mdp).then(this.finaliserConnexion);
       } else {
          if (this.mdpConf !== this.mdp)
             return;

          this.$SHA256(this.mdp).then(this.finaliserInscription);
       }

       ++this.nbDmdConnexionEnv;
    },

    finaliserConnexion(hash) {
      this.reseau.Envoie("CxN#" + this.pseudo + "#" + hash);
    }
  },

  mounted() {
     this.reseau.registerTraitementReponse(this);
     this.reseau.Envoie("CxN#Forum");
  }
}

</script>
