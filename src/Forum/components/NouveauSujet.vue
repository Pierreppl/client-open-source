<style>
   .titreSujet {
      margin-left: auto;
      margin-right: auto;
      width: 99%;
      text-align: center;
      background-color: #232228;
      color: #CCCCCC;
      font-size: 16px;
   }
</style>

<template>
   <div>
      <input type="text" v-model="titre" placeholder="Tapez votre titre ici." class="titreSujet">
      <Post :type="'sujet'" :postArray="postArray" @finSujet="envoyer" @annulerSujet="annuler">
      </Post>
   </div>
</template>

<script>
import Global from "../../Global.js";
import Post from "./Post.vue"
export default {

   name: "NouveauSujet",

   components: {
      "Post": Post
   },

   data: function() {
      return {
         postArray: [0,
            new Date().toLocaleDateString(),
            Global.$etat.joueur.nom,
            Global.$etat.joueur.avatar,
            ""
         ],

         titre: ""
      }
   },

   methods: {
      envoyer(msg) {
         if (this.titre !== "") {
            Global.$config.reseau.Envoie("FoN#" + this.titre + "#" + msg);
            this.$emit("finNouveauSujet");
         }
      },

      annuler() {
         this.$emit("finNouveauSujet");
      },
   }
}
</script>
