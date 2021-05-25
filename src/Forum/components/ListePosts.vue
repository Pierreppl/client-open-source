<style>
   .barre-posts {
      background-color: #232228;
      height: 20px;
      border-top: 2px solid black;
      border-bottom: 2px solid black;
      padding-bottom: 0px;
      padding-left: 20px;
      padding-right: 20px;
   }

   .LSPosts-lienOptions {
      font-size: 15px;
   }

   .LSPosts-lienOptions {
      color: #BCC2D9;
      font-size: 15px;
      position: relative;
      cursor: pointer;
      top: 2px;
      margin-right: 5px;
      margin-left: 5px;
   }

   .LSPosts-lienOptions:hover {
      text-shadow: 0 0 2px #029489;
   }

</style>

<template>
<div>
   <FenetreSaisie v-if="menuOuvert"
      :texte=texteAafficher :titre=titre
      @fermetureFenetre="menuOuvert = false"
      @saisieValidee="validerSaisie">
   </FenetreSaisie>
   <VignetteMenu ref="menu"></VignetteMenu>

   <!-- ensemble des posts -->
   <Post v-for="post in posts" :postArray="post" :type="'normal'" :key="post.id"
         ref="refPost" @ouvertureMenuAvatar="ouvrirMenu"
         @finReponse="finReponse">
   </Post>

   <Post v-if="postReponse" :type="'reponse'" :postArray="postArrayReponse"
      ref="reponse" @finReponse="finReponse">
   </Post>

   <!-- barre à la fin du dernier post, contenant les boutons suivant prec répondre -->
   <div v-if="!postReponse" class="barre-posts">
      <span v-if="pageCourante > 1"
         @click="allerPagePrecedente"
         class="LSPosts-lienOptions">
         {{ pagePrecedente }}
      </span>

      <span v-if="pageCourante == nbPages && (!sujetClos || $etat.joueur.estModoForum()) && !$etat.joueur.estInvite()"
         @click="repondre"
         class="LSPosts-lienOptions"
         style="float:right">
         {{ repondreMessage }}
      </span>

      <span v-if="auteurDernierPost && pageCourante == nbPages"
         @click="modifier"
         class="LSPosts-lienOptions"
         style="float:right">
         {{ texteModifier }}
      </span>

      <span v-if="pageCourante < nbPages"
         @click.prevent="allerPageSuivante"
         class="LSPosts-lienOptions"
         style="float:right">
         {{ pageSuivante }}
      </span>
   </div>
</div>
</template>

<script>

import Post from "./Post.vue";
import VignetteMenu from "../../components/VignetteMenu.vue";
import Global from "../../Global.js";
import FenetreSaisie from "../../components/FenetreSaisie.vue";

export default {
   name: "ListePosts",

   components: {
      "Post": Post,
      "VignetteMenu": VignetteMenu,
      "FenetreSaisie": FenetreSaisie
   },

   data: function() {
      return {
         postReponse: false,
         postVisu: false,
         pagePrecedente: this.$config.txt.FORUM_PAGE_PRECEDENTE[this.$config.lang],
         pageSuivante: this.$config.txt.FORUM_PAGE_SUIVANTE[this.$config.lang],
         repondreMessage: this.$config.txt.FORUM_REPONDRE_SUJET[this.$config.lang],
         texteModifier: this.$config.txt.FORUM_MODIFIFIER_SUJET[this.$config.lang],
         auteur: "test",
         auteurDernierPost: false,
         avatar: "",

         /* data liées au menu accessible par click sur l'avatar d'un post */
         menuOuvert: false,
         titre: "",
         texteAafficher: "",
         typeSaisie: "",
         auteurPost: "",
         idPost: 0,
         contenuCitation: "",
         postArrayReponse: [],
      }
   },

   props: {
      posts: Array,
      pageCourante: Number,
      nbPages: Number,
      reseau: Object,
      sujetClos: Boolean
   },

   methods: {
      allerPageSuivante() {
         this.$emit("eventPageSuivantePrecedente", this.pageCourante + 1);
      },

      allerPagePrecedente() {
         this.$emit("eventPageSuivantePrecedente", this.pageCourante - 1);
      },

      repondre() {
         this.postReponse = true;
         this.$set(this.postArrayReponse, 0, "reponse");
         this.$set(this.postArrayReponse, 1, "" + (Number(new Date()) / 1000));
         this.$set(this.postArrayReponse, 2, this.$etat.joueur.nom);
         this.$set(this.postArrayReponse, 3, this.$etat.joueur.avatar);
         this.$set(this.postArrayReponse, 4, "");
      },

      propagerEventScroll() {
         this.$emit("eventScrollBasForum");
      },

      ouvrirMenu(event, id, auteur, message) {
         console.log(event);
         const envoyer = Global.$config.reseau.Envoie;
         const self = Global.$etat.joueur;
         const cmd = Global.$etat.instanceChat.simulerCmd;
         const forum = Global.$etat.forum;
         let boutonModifierPresent = false;
         let options = [];
         options.push(["Profil", () => { cmd("profil " + auteur); }]);
         this.auteurPost = auteur;
         this.idPost = id;
         if (!self.estInvite()) {
            options.push(["Citer", () => {
               if (!this.postReponse) {
                  this.repondre();
                  this.$set(this.postArrayReponse, 4, "[c=" + auteur + "]" + this.supprimerBalises(message) + "[/c]");
               } else {
                  this.$refs.reponse.$refs.textarea.contenu +=
                     "[c=" + auteur + "]" + this.supprimerBalises(message) + "[/c]";
               }
            }]);
            //Premier post (modifiable par le joueur).
            if (this.indicePost(id) === 0 && this.$refs.refPost[0].auteur === self.nom
                  && Global.$etat.forum.sujet.page === 1) {
               options.push(["Modifier", () => {
                  this.$refs.refPost[this.indicePost(id)].modeEdition = true;
               }]);
               boutonModifierPresent = true;
            }
            options.push(["Signaler ce message", () => {
               this.titre = "Signaler un message";
               this.texteAafficher = "Si vous estimez que ce message enfreint la charte\
                  du forum et nécessite l'intervention immédiate d'un modérateur, merci\
                  d'indiquer le motif : ";
               this.menuOuvert = true;
               this.typeSaisie = "signalement";
               this.message = message;
            }]);
         }
         if (self.estModoForum() || self.estModoJeu()) {
            if (!boutonModifierPresent) {
               options.push(["Modifier", () => {
                  this.$refs.refPost[this.indicePost(id)].modeEdition = true;
               }]);
            }
            options.push(["Supprimer", () => { envoyer("FoE#" + id)}]);
            options.push(["Supprimer en arrière-plan", () => { envoyer("FoEA#" + id)}]);
            options.push(["Rendre " + auteur + " muet sur le forum", () => {
               console.log("pas implémenté");
            }]); //TODO
            options.push(["Ajouter une note sur " + auteur, () => {
               this.menuOuvert = true;
               this.titre = "Ajouter une note"
               this.texteAafficher = ""
               this.typeSaisie = "note";
            }]);
            options.push(["Fermer la discussion", () => {
               envoyer("FoX#" + forum.sujet.id + "#" + self.nom)
            }]);
            options.push(["Historique des sanctions forum", () => {
               console.log("pas implémenté");
            }]); //TODO
         }
         this.$refs.menu.ouvrir(event, options);
      },

      validerSaisie(saisie) {
         if (this.typeSaisie === "signalement") {
            //1: auteur du post, 2: motif, 3: Sujet, 4: message 5: Nom Forum
            const forum = Global.$etat.forum;
            const envoyer = Global.$config.reseau.Envoie;
            envoyer("CxSigF#" + this.auteurPost + "#" + saisie + "#" + forum.sujet.nom + "#" + this.message + "#" + forum.nom);
         } else if (this.typeSaisie === "note") {
            //TODO
            console.log("pas implémenté");
         }
      },

      /**
      * Retourne true si le joueur est l'auteur du dernier post.
      */
      estAuteurDernierPost() {
         this.auteurDernierPost = (this.posts[this.posts.length - 1][2] === Global.$etat.joueur.nom);
      },

      modifier() {
         this.$refs.refPost[this.posts.length - 1].modeEdition = true;
      },
      /**
      * Retourne l'indice du post dans le tableau posts à partir de l'id fourni
      */
      indicePost(id) {
         for (let i = 0; i < this.posts.length; i++) {
            if (this.posts[i][0] === id)
               return i
         }
      },

      finReponse() {
         this.postReponse = false;
         this.postVisu = false;
      },

      supprimerBalises(text) {
         return text.replace(/\[.*]/gi, "").replace(/<.*>/gi, "");
      }
   },

   created() {
      this.estAuteurDernierPost()
   }
}
</script>
