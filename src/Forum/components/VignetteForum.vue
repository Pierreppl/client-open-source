<style src="../css/vignette.css"></style>

<template>
<div class="vignette" @click.prevent="requeteForum">
   <img class="photo-vignette" width="120" heigt="80" v-bind:src="image"
      :alt="'Image ' + titreForum.type" />
   <div class="contenu-vignette">
      <span class="titreForum"> {{ titreForum }} </span>
      <div class="texteBleuGris"> {{ descriptionForum }} </div>
   </div>
</div>
</template>

<script>
export default {
   name: "VignetteForum",

   data: function() {
      return {
         page: 1
      };
   },

   props: {
      titreForum: {
         type: String,
         default: "Forum inconnu"
      },

      descriptionForum: {
         type: String,
         default: "Pas de description"
      },

      image: {
         type: String,
         default: ""
      },

      id: {
         type: Number,
         default: 0
      },

      modeAffichage: Number
   },

   methods: {
      requeteForum() {
         console.log("requete forum après un clic sur une vignette");
         console.log("emission de l'evenement eventRequeteforum au parent");
         this.$emit("eventRequeteForum", this.titreForum, this.id);
      }
   },

   const: {
      AFFICHAGE_NORMAL: 0,
      AFFICHAGE_LISTE: 1
   }
}
</script>
