<style src="../css/connexion.css">
</style>

<template>
  <div v-if="modeReduit">
     <span v-if="messageErreur !== ''"> {{ messageErreur }} <br /></span>
     Pseudo :
     <input type="text" id="inputPseudo" maxlength="13" minlength="3" autocomplete="off" autocorrect="off" autocapitalize="true" spellcheck="false"
     v-model="pseudoReduit" @focus="clearInput" @keydown="restrictionTouchesPseudo" />

     &nbsp;Mot de passe :
     <input v-model="mdpReduit" type="password" id="inputMdp" autocomplete="off" v-on:keydown="restrictionTouchesMdp" />
  </div>

  <div v-else>
    <div id="accueil" v-if="!userConnected">
      <div id="title">Extinction<br>Minjeux</div>
      <div id="connexionRow">
       <div id="ZoneInfosCo">
          <div id="menuConnexion">
            <router-link to="/guest" class="lien">invité</router-link>
            <router-link to="/login" class="lien">Connexion</router-link>
            <router-link to="/register" class="lien">Inscription</router-link>
          </div>
          <!--<p>
            <br /><br />

            <span style="color: #CB546B;"> {{ messageErreur }} </span>
          </p>-->
          <div id="formConnexion">
            <div id="messageHelp">
              <p v-if="estRoute('guest')">Jouez avec un compte invité</p>
              <p v-if="estRoute('login')">Utilisez vos identifiants pour pouvoir jouer avec votre profil</p>
              <p v-if="estRoute('register')">Créez votre profil et accédez à 100% des fonctionnalités</p>
            </div>

            <div id="Pseudo">
               <input type="text" id="inputPseudo" maxlength="13" minlength="3" autocomplete="off" autocorrect="off" autocapitalize="true" spellcheck="false"
                 v-model="pseudo" @focus="clearInput" @keydown="restrictionTouchesPseudo" placeholder="Nom d'utilisateur" />
            </div>

            <div id="Mdp" v-if="estRoute('login') || estRoute('register')">
              <input v-model="mdp" type="password" id="inputMdp" autocomplete="off" v-on:keydown="restrictionTouchesMdp" placeholder="Mot de passe" />
            </div>

            <div id="MdpConf" v-if="estRoute('register')">
              <input v-model="mdpConf" type="password" id="inputMdpConf" autocomplete="off" v-on:keydown="restrictionTouchesMdp" placeholder="Vérification du mot de passe" />
            </div>

            <span v-if="nbDmdConnexionEnv > 5" class="valider-desactive connexion-lien">Valider</span>
            <div v-on:click="connexionJeu" class="connexion-lien lien" v-else-if="!connexionEnCours">Valider</div>
            <span v-else class="CnxEnCours">Connexion en cours...</span>

            <div id="JEnLigne" v-if="joueursEnLigne !== ''">{{ joueursEnLigne }} joueurs en ligne</div>
          </div>
       </div>
       <div id="Maj">
         <div id="currentVersion">Version: {{$config.versionMajeure}}</div>
         <LsMaj></LsMaj>
       </div> <!-- Maj list -->
      </div>

       <div id="barQuickAcces">
          <router-link to="/forum"><i class="fas fa-comments"></i></router-link>
          <a href="https://www.facebook.com/extinction.minijeux/" target="_blank"><i class="fab fa-facebook-square"></i></a>
          <a href="https://www.facebook.com/extinction.minijeux/" target="_blank"><i class="fab fa-discord"></i></a>
       </div>
     </div>
   </div>
</template>

<script>

import LsMaj from "../components/ListeMaj.vue";

export default {
   name: "Connexion",

   components: {
     "LsMaj": LsMaj
   },

   props: {
     userConnected: Boolean,
     reseau: Object,
     modeReduit: Boolean
   },

   data: function() {
     return { joueursEnLigne: "",
              nbDmdConnexionEnv: 0,
              pseudo: "Pseudo",
              mdp: "",
              mdpConf: "",
              connexionEnCours: false,
              messageErreur: "",
              mdpReduit: "",
              pseudoReduit: "Pseudo"
            };
   },

   methods: {
      /**
      * Enlève "Pseudo" de l'input pseudo quand il a le focus.
      */
      clearInput(event) {
         if (!this.modeReduit && this.pseudo === "Pseudo")
            this.pseudo = "";
         else if (this.modeReduit && this.pseudoReduit === "Pseudo")
            this.pseudoReduit = "";
      },

     /**
      * Traite une demande de connexion via le bouton "Valider" et
      * vérifie que les conditions de validation sont respectées.
      */
     connexionJeu() {
        let pseudo = this.modeReduit ? this.pseudoReduit : this.pseudo;
        let mdp = this.modeReduit ? this.mdpReduit : this.mdp;

        if (pseudo === "") {
           this.messageErreur = "Aucun pseudo spécifié.";
           return;
        } else if (this.modeReduit && mdp === "") {
           this.messageErreur = "Aucun mot de passe spécifié.";
           return;
        } else if (this.nbDmdConnexionEnv > 5) {
           this.messageErreur = "Trop de tentatives incorrectes.";
           return;
        }

        this.connexionEnCours = true;
        this.reseau.registerTraitementReponse(this);

        if (!this.modeReduit && (this.estRoute("guest") || mdp === "")) {
           this.reseau.Envoie("CxN#" + pseudo);
        } else if (this.estRoute("login") || this.modeReduit) {
           // Connexion d'un compte obligatoire en mode réduit
           //this.$SHA256(mdp).then(this.finaliserConnexion);
           this.finaliserConnexion(this.$SHA256(mdp));
        } else {
           if (this.mdpConf !== mdp) {
              this.messageErreur = "Les mots de passe sont différents.";
              this.connexionEnCours = false;
              this.reseau.stopRegTraitementReponse(this);
              return;
           }

           //this.$SHA256(mdp).then(this.finaliserInscription);
           this.finaliserInscription(this.$SHA256(mdp));
        }

        ++this.nbDmdConnexionEnv;
     },

    estRoute(route) {
      return this.$route.name === route;
    },

    finaliserConnexion(hash) {
      this.reseau.Envoie("CxN#" + (this.modeReduit ? this.pseudoReduit : this.pseudo) + "#" + hash);
    },

    finaliserInscription(hash) {
      this.reseau.Envoie("CxCC#" + (this.modeReduit ? this.pseudoReduit : this.pseudo) + "#" + hash);
    },

    restrictionTouchesPseudo(event) {
      if (event.key === "Enter" && !this.connexionEnCours) {
          this.connexionJeu();
      } else if (!(/[a-zA-Z]/.test(event.key)) && event.key !== "Tab") {
          event.preventDefault();
      }
    },

    restrictionTouchesMdp(event) {
      if (event.key === "Enter" && !this.connexionEnCours) {
          this.connexionJeu();
      }
    },

    traiterReponse(code, msg) {
      if (code === "CxN") { // Connexion invité
         const joueur = this.$etat.joueur;

         joueur.initInvite(msg[1]);
         joueur.addFlag("inv");

         this.reseau.updateUserConnected(true);
         this.connexionEnCours = false;
         this.reseau.stopRegTraitementReponse(this);

         this.$etat.mode = "jeu";

         this.$router.push("/jeu");
      } else if (code === "CxHACK") { // Tentative de co sur un compte déjà co
         this.messageErreur = "Ce compte était déjà connecté.";
         this.connexionEnCours = false;
         this.reseau.stopRegTraitementReponse(this);
      } else if (code === "CxID") { // Infos tentative de connexion
          if (msg.length === 2) { // @INCOMPLET
             this.messageErreur = this.$config.txt.ERR_J_DEJA_CO[this.$config.lang];
              //this.makeAlert("danger", this.$config.txt.ERR_J_DEJA_CO[this.$config.lang]);
             this.connexionEnCours = false;
             this.reseau.stopRegTraitementReponse(this);
          } else if (msg.length === 25) {
              const joueur = this.$etat.joueur;

             joueur.initViaCxID(msg, true);
             joueur.refreshCanaux(true);

             this.reseau.updateUserConnected(true);
             this.connexionEnCours = false;
             this.reseau.stopRegTraitementReponse(this);

             this.$etat.mode = "jeu";

             this.$router.push("/jeu");
          } else {
             this.messageErreur = this.$config.txt.ERR_LOG_INCORRECT[this.$config.lang];

              //this.makeAlert("danger", this.$config.txt.ERR_LOG_INCORRECT[this.$config.lang]);
             this.connexionEnCours = false;
             this.reseau.stopRegTraitementReponse(this);
          }
      } else if (code === "CxBANC") { // Connexion bannie
          this.connexionEnCours = false;
          this.reseau.stopRegTraitementReponse(this);
      } else {
          return false;
      }

      return true;
    }
  },

  mounted() {
    // Précharger le chat
    this.$etat.instanceChat.userConnected = true;
    this.$etat.instanceChat.$mount();

    this.$root.NbJoueurCo

    this.$root.$on("CnxNbJoueursCo", (j) => {
       this.joueursEnLigne = j;
     });
  },
}

</script>
