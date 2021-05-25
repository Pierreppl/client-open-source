<style src="./css/forum.css"></style>

<template>
<div class="window" v-if="forumVisible">
   <div class="window-header">
      <div class="window-title couleur-gris"> {{titre}} </div>
      <a v-if="!fenetrePrincipale" @click.prevent="changementPage = true" id="numero-page-forum" class="Fenetre_lien">
         Page {{ pageCourante }}/{{ nbPages }}
      </a>

      <img :src="getEnveloppe()" :style="'margin-top:auto; margin-bottom: auto; padding-right: 5px;' + (chuchoRecu ? 'cursor: pointer' : 'cursor: normal')" @click="chuchoRecu = false" width="16" height="11" alt="Enveloppe de messages" />

      <div v-if="fenetreSujets" @click="nextModeAffichage" class="bouton-menu-header"><BtnModeAffichage :modeAffichage="modeAffichage"></BtnModeAffichage></div>
      <div @click="fermerFenetre" class="bouton-menu-header" style="margin-left: 13px;"><FermerFenetre></FermerFenetre></div>
   </div>
   <div class="window-body" ref="forum">
      <!-- Liste des forums -->
      <div v-if="fenetrePrincipale">
         <div class="page-principale-forum">
            <div class="cadre-forums">
               <VignetteForum v-for="info in forumsAccessibles"
                  :titreForum="info.titre"
                  :descriptionForum="info.description"
                  :image="info.image"
                  :id="info.code"
                  :key="info.code"
                  :reseau="reseau"
                  @eventRequeteForum="requeteForum">
               </VignetteForum>
            </div>
            <div style="right: 0px;"><Charte></Charte></div>
         </div>
      </div>

      <!-- Liste des topics -->
      <ListeSujets v-else-if="fenetreSujets"
         :sujets="msgArray"
         :modeAffichage="modeAffichage"
         @eventRequeteSujet="requeteSujet">
      </ListeSujets>

      <!-- Liste des messages -->
      <ListePosts v-else-if="fenetrePosts"
         :posts="msgArray"
         :pageCourante="pageCourante"
         :nbPages="nbPages"
         :reseau="reseau"
         :sujetClos="sujetClos"
         @eventPageSuivantePrecedente="allerPageSuivantePrecedente"
         @eventScrollBasForum="scrollBasForum">
      </ListePosts>

      <NouveauSujet v-if="fenetreNouveauSujet" @finNouveauSujet="finNouveauSujet">
      </NouveauSujet>
   </div>

   <div class="window-footer">
      <a v-if="fenetreSujets" id="recherche-sujet" class="Fenetre_lien taille-medium"
         @click.prevent="rechercheSujet = true">
         {{texteRechercher}}
      </a>
      <a id="close-text" class="Fenetre_lien taille-medium"  @click.prevent="fermerFenetre">
         {{texteFermeture}}
      </a>
      <a v-if="fenetreSujets" id="creer-sujet" class="Fenetre_lien taille-medium"
         @click="nouveauSujet"> {{texteCreer}}
      </a>
   </div>

   <!-- Elements html placé par le css uniquement -->
   <ChangementPage v-if="changementPage"
      :pageCourante="pageCourante"
      :nbPages="nbPages"
      @eventChangementPage="changerPage">
   </ChangementPage>

   <Recherche v-if="rechercheSujet"
      :reseau="reseau"
      @eventRechercheForum="rechercherSujet"
      @eventFinRecherche="finirRecherche">
   </Recherche>
</div>
</template>

<script>

import VignetteForum from "./components/VignetteForum.vue";
import ChangementPage from "./components/ChangementPage.vue";
import ListeSujets from "./components/ListeSujets.vue";
import ListePosts from "./components/ListePosts.vue";
import Charte from "./components/Charte.vue";
import FermerFenetre from "../components/BoutonFermer.vue";
import BtnModeAffichageSujets from "./components/BtnModeAffichageSujets.vue";
import Recherche from "./components/Recherche.vue";
import NouveauSujet from "./components/NouveauSujet.vue";

import Global from "../Global.js";

const codeEnum = {
   GENERAL: 0, BUG: 1, ARTISTE: 2, AAAAH: 3, BOUM: 4, FORTO: 5,
   FORUM_ACCES_NORMAL: 5, TEAM: 6, VIP: 7, ANIM: 8, MODO: 9,
   NB_FORUMS: 9
};

export default {
   name: "Forum",

   components: {
      "VignetteForum": VignetteForum,
      "ListeSujets": ListeSujets,
      "ListePosts": ListePosts,
      "ChangementPage": ChangementPage,
      "Charte": Charte,
      "FermerFenetre": FermerFenetre,
      "BtnModeAffichage": BtnModeAffichageSujets,
      "Recherche": Recherche,
      "NouveauSujet": NouveauSujet
   },

   data: function() {
      return {
         /* Ces 3 variables permettent d'identifier sur quelle partie du forum
         * l'utilisateur se situe. Elles doivent être actualisées à tout changement
         * de page car elles conditionnes l'affichage (grace aux v-if).
         * Les methodes changerPropriete permettent de le faire. */
         fenetrePrincipale: true,
         fenetreSujets: false,
         fenetrePosts: false,
         fenetreNouveauSujet: false,
         /* Détermine si le forum est affiché ou non. Typiquement la fermeture via
         * la crois ou le bouton de fermeture va set le booleen à false */
         forumVisible: false,
         /* Titre visible dans la header de la fenetre (titre forum, topic...)*/
         titre: "Forum",

         texteFermeture: this.$config.txt.FORUM_RETOUR_PARTIES[this.$config.lang],
         texteRechercher: this.$config.txt.FORUM_RECHERCHER_SUJET[this.$config.lang],
         texteCreer: this.$config.txt.FORUM_CREER_SUJET[this.$config.lang],
         pageCourante: 1,
         nbPages: 1,
         modeAffichage: 0,
         /* Déternine si la fenêtre de changement de page doit etre ouverte ou non */
         changementPage: false,
         /* Déternine si la fenêtre de changement de page doit etre ouverte ou non */
         rechercheSujet: false,
         /* Propiétée passée à ListePosts qui premet de savoir au sein du composant
         * si le sujet concerné est fermé */
         sujetClos: false,
         /* Identifiant du Forum, sujet ou post */
         identifiant: 0,

         chuchoRecu: false,

         /* message serveur: tableau de tableaux qui est passé à la ListePosts ou à
         * ListeForums. */
         msgArray: new Array(),
         /* Information des forums disponibles*/
         infoForum: [
         {
            titre: this.$config.txt.FORUM_GENERAL[this.$config.lang],
            description: this.$config.txt.FORUM_DESCR_GENERAL[this.$config.lang],
            code: 6,
            image: "http://img.atelier801.com/7ba4f115.png",
            filtre: null
         },

         {
            titre: this.$config.txt.FORUM_BUGS[this.$config.lang],
            description: this.$config.txt.FORUM_DESCR_BUGS[this.$config.lang],
            code: 5,
            image: "http://img.atelier801.com/7b24f115.png",
            filtre: null
         },

         {
            titre: this.$config.txt.FORUM_ARTISTES[this.$config.lang],
            description: this.$config.txt.FORUM_DESCR_ARTISTES[this.$config.lang],
            code: 8,
            image: "http://img.atelier801.com/7aa4f115.png",
            filtre: null
         },

         {
            titre: this.$config.txt.FORUM_AAAAH[this.$config.lang],
            description: this.$config.txt.FORUM_DESCR_AAAAH[this.$config.lang],
            code: 2,
            image: "http://img.atelier801.com/7a24f115.png",
            filtre: null
         },

         {
            titre: this.$config.txt.FORUM_BOUBOUM[this.$config.lang],
            description: this.$config.txt.FORUM_DESCR_BOUBOUM[this.$config.lang],
            code: 3,
            image: "http://img.atelier801.com/79a4f115.png",
            filtre: null
         },

         {
            titre: this.$config.txt.FORUM_FORTO[this.$config.lang],
            description: this.$config.txt.FORUM_DESCR_FORTO[this.$config.lang],
            code: 4,
            image: "http://img.atelier801.com/7924f115.png",
            filtre: null
         },

         {
            titre: this.$config.txt.FORUM_TEAM[this.$config.lang],
            description: this.$config.txt.FORUM_DESCR_TEAM[this.$config.lang],
            code: 11,
            image: "http://img.atelier801.com/6524f115.jpg",
            filtre: "dansTeam"
         },

         {
            titre: "Forum VIP",
            description: "???",
            code: 7,
            image: "http://img.atelier801.com/6524f115.jpg",
            filtre: "membreModeration"
         },

         {
            titre: "Forum Animateurs",
            description: "???",
            code: 9,
            image: "http://img.atelier801.com/6524f115.jpg",
            filtre: "aAccesAnimateur"
         },

         {
            titre: "Forum Modo",
            description: "???",
            code: 0,
            image: "http://img.atelier801.com/6524f115.jpg",
            filtre: "estModoJeu"
         }],
      }
   },

   props: {
      reseau: Object
   },

   methods: {
      /* Détermine le comportement lors d'un clic sur la croix selon la page
      * sur laquelle se situe le joueur */
      fermerFenetre() {
         if (this.fenetrePrincipale) {
            this.$root.$emit("afficher-forum", false);
            Global.$etat.forum = null;
         } else if (this.fenetreSujets) {
            this.changerProprieteListeForum();
         } else if (this.fenetrePosts) {
            Global.$etat.forum.sujet = null;
            this.changerProprieteListeTopic();
            this.msgArray = [];
            /* Lors du retour à la liste des sujets depuis un sujet, on veut retourner
            * à la page où ce sujet a été choisi, préalablement stockée dans this.pageForum */
            this.pageCourante = this.pageForum;
            this.requeteForum(this.titreForum, this.idForum);
         } else if (this.fenetreNouveauSujet) {
            this.changerProprieteListeTopic();
         }
         this.changementPage = false;

         this.actualiserLienForum();
      },

      nextModeAffichage() {
         this.modeAffichage = (this.modeAffichage + 1) % 2;
      },

      requeteForum(titre, id) {
         this.titre = titre;
         this.identifiant = id;
         this.msgArray = [];
         this.reseau.Envoie("FoF#" + id + "#" + (this.pageCourante - 1).toString());
         Global.$etat.forum = { nom: titre, id: id, page: this.pageCourante, sujet: null};
         this.actualiserLienForum();
      },

      requeteSujet(titre, id, estFerme, page) {
         this.titreForum = this.titre;
         this.pageForum = this.pageCourante;
         this.titre = titre;
         this.sujetClos = estFerme;
         this.pageCourante = page;
         this.msgArray = [];
         /* On stocke l'id du forum dans une variavble à part pour pouvoir retourner
         * sur le forum correspondant après fermeture du la page du sujet. */
         this.idForum = this.identifiant;
         this.identifiant = id;
         this.reseau.Envoie("FoS#" + id + "#" + (this.pageCourante - 1));
         Global.$etat.forum.sujet = { nom: titre, id: id, page: this.pageCourante};
         this.actualiserLienForum();
      },

      actualiserLienForum() { /// @TODO
         let route = "/forum";

         if (Global.$etat.forum !== null) {
            route += "/" + Global.$etat.forum.id;
            if (Global.$etat.forum.sujet !== null)
               route += "/" + Global.$etat.forum.sujet.id + "/p" + Global.$etat.forum.sujet.page;
         }

         this.$router.push(route);
      },

      allerUrlForum() { /// @TODO
         let chemins = this.$route.path.split(",");

         if (chemins[0] === "/forum" || chemins[0] === "/forum/")
            this.$root.$emit("afficher-forum", true);
         else
            return;

         if (chemins.lentgh === 1) {
            // ...
         } else if (chemins.length === 2) { // /forum/IdForum
            if (isNaN(chemins[1])) {
               this.$root.push("/forum");
               return;
            }

            this.requeteForum("temporaire", Number(chemins[1]));
         } else if (chemins.length === 4) { // /forum/IdForum/IdTopic/IdPage
            if (isNaN(chemins[1]) || isNaN(chemins[2]) || isNaN(chemins[3])) {
               this.$root.push("/forum");
               return;
            }
            this.requeteForum("temporaire", Number(chemins[1]));
            this.requeteSujet("temporaire", Number(chemins[2]), true, Number(chemins[3]));
         }
      },

      /**
      * traite les réponses de serveur relatives au forum
      * @param {String} code : code du messages
      * @param {Array} array: tableau de string, contient les arguments du message
      * après le code. Typiquement les premiers correspondent à des informations
      * générales comme le nombre de pages, de messages, la page courante...
      * puis la suite des arguments contient les informations de chaque sujet/post
      * C'est le même schéma qui se répète pour chaque post et qui sera traité par
      * le composant concerné (ListePosts ou ListeForum). La méthode ajoute simplement
      * les sous tableaux concernant à un sujet/post dans msgArray
      * @returns {Boolean} : true si le message est traité, false sinon
      */
      traiterReponse(code, array, _data) {
         /* si ce n'est pas un message pour le forum, on ne le traite pas*/
         if (code !== "FoS" && code !== "FoF")
            return false;
         console.log(Global.$etat.forum);

         /* nombre de paramètre dans un sujet/post, index de début des information
         * relative au sujet/post, indice de boucle */
         let nbChamps, debut, i;
         let n = array.length;
         /* Réinitialisation du tableau à passer */
         this.msgArray = [];

         this.pageCourante = (1 + parseInt(array[2]));
         /* Liste des sujets d'un forum */
         if (code === "FoF") {
            this.nbPages = parseInt(array[3]);
            debut = 4;
            nbChamps = 12;
            this.changerProprieteListeTopic();
            Global.$etat.forum.page = this.pageCourante;
         /* Liste des posts d'un sujet */
         } else if (code === "FoS") {
            let postsParPage = 20;
            debut = 3;
            nbChamps = 7;
            this.nbPages = Math.ceil(parseInt(array[1]) / postsParPage);
            this.changerProprieteListePost();
            Global.$etat.forum.sujet.page = this.pageCourante;
         }

         /* On ajoute au tableau msgArray le soustableau correspondant aux propriétés
         * d'un post/sujet */
         for(i = debut; i < n; i+= nbChamps)
            this.msgArray.push(array.slice(i, i + nbChamps + 1));

         /* Le message a été traité */
         return true;
      },

      /* Actualisation des propriétés lors du passage sur la fenêtre de liste des forums */
      changerProprieteListeForum() {
         this.fenetrePrincipale = true;
         this.fenetreSujets = false;
         this.fenetrePosts = false;
         this.changementPage = false;
         this.rechercheSujet = false;
         this.pageCourante = 1;
         this.texteFermeture = this.$config.txt.FORUM_RETOUR_PARTIES[this.$config.lang];
         this.titre = "Forum";
      },

      /* Actualisation des propriétés lors du passage sur la fenêtre de liste des sujets */
      changerProprieteListeTopic() {
         this.fenetrePrincipale = false;
         this.fenetreSujets = true;
         this.fenetrePosts = false;
         this.fenetreNouveauSujet = false;
         this.changementPage = false;
         this.texteFermeture = this.$config.txt.FORUM_RETOUR_FORUMS[this.$config.lang];
      },

      /* Actualisation des propriétés lors du passage sur la fenêtre de liste des posts */
      changerProprieteListePost() {
         this.fenetrePrincipale = false;
         this.fenetreSujets = false;
         this.fenetrePosts = true;
         this.changementPage = false;
         this.rechercheSujet = false;
         this.texteFermeture = this.$config.txt.FORUM_RETOUR_SUJETS[this.$config.lang];
      },

      changerPage(page) {
         let code = this.fenetreSujets ? "FoF#" : "FoS#";
         this.pageCourante = page;
         this.changementPage = false;
         this.msgArray = [];
         this.reseau.Envoie(code + this.identifiant + "#" + (page - 1));
      },

      allerPageSuivantePrecedente(page) {
         this.msgArray = [];
         this.reseau.Envoie("FoP#" + (page - 1));
      },

      rechercherSujet(code, message) {
         this.msgArray = [];
         this.reseau.Envoie("FoSea#" + code + "#" + message);
      },

      finirRecherche() {
         this.rechercheSujet = false;
      },

      scrollBasForum() {
         this.$refs.forum.scrollTop = this.$refs.forum.scrollHeight;
      },

      nouveauSujet() {
         this.fenetreNouveauSujet = true;
         this.fenetrePrincipale = false;
         this.fenetreSujets = false;
         this.fenetrePosts = false;
         this.texteFermeture = this.$config.txt.FORUM_RETOUR_SUJETS[this.$config.lang];
      },

      finNouveauSujet() {
         this.reseau.Envoie("FoF#" + Global.$etat.forum.id + "#" + (this.pageCourante - 1).toString());
         this.changerProprieteListeTopic();
      },

      getEnveloppe() {
         if (this.chuchoRecu === true)
            return require("../I/Forum/enveloppe.gif");

         return require("../I/Forum/enveloppeGrise.png");
      }
   },

   computed: {
      /* Filtre les forum accessibles au joueur */
      forumsAccessibles: function() {
         return this.infoForum.filter(function(fofo) {
            return (fofo.filtre === null || Global.$etat.joueur[fofo.filtre]());
         });
      }
   },

   created() {
      /* Ajoute Forum parmis les réceptionneurs de message serveur */
      this.reseau.registerTraitementReponse(this);

      this.$root.$on("afficher-forum", (v) => {
         this.forumVisible = v;
         this.reseau.Envoie("CxVF" + (v ? "" : "#0#0"));
         if (v) {
            this.chuchoRecu = false;
            this.$etat.instanceChat.activerOeilChat();
            this.$router.push("/forum");
         }
         else {
            this.$etat.instanceChat.desactiverOeilChat();
            this.$router.push("/jeu");
         }
      });

      this.$root.$on("message-prive-recu", (v) => {
         this.chuchoRecu = v;
      });
   },

   mounted() {
      this.allerUrlForum();
   }
}
</script>
