<style>

   .saisie-header {
      background-image: linear-gradient(#080818, #02010f);
      padding: 5px;
      text-align: center;
   }

   .saisie-corps {
      height: 70px;
   }

   .zone-saisie {
      background-color: #1E1E24;
      color: #BCC2D9;
      padding-left: 5px;
      margin-left: auto;
      margin-right: auto;
      margin-top: 10px;
      width: 95%;
   }

   .saisie-footer {
      background-image: linear-gradient(#080818, #02010f);
      position: absolute;
      bottom: 0px;
      padding-top: 5px;
      padding-bottom: 5px;
      width: 100%;
      text-align: center;
   }

   .saisie-lien, .saisie-lien:hover, .saisie-lien:visited, .saisie-lien:focus {
     color: #BCC2D9;
     text-decoration: none;
     margin-left: 30px;
     margin-right: 30px;
   }

   .saisie-lien:hover {
     text-shadow: 0 0 2px #029489;
   }
</style>


<template>
<div class="window" v-bind:style="{
   width: '400px',
   height: '130px',
   position: 'absolute',
   top: '200px',
   left: '250px'
   }">

   <div class="saisie-header"> {{ titre }}</div>
   <div class="saisie-corps">
      <div> {{ texte }} </div>
      <input class="zone-saisie" v-model="inputTexte" type="text" name="texte">
   </div>
   <div class="saisie-footer">
      <a class="saisie-lien" @click="fermerFenetre"> Annuler </a>
      <a class="saisie-lien" @click="valider"> Valider </a>
   </div>
</div>
</template>

<script>
export default {
   name: 'FenetreSaisie',

   data: function() {
      return {
         inputTexte: ""
      }
   },

   props: {
      titre: String,
      width: Number,
      height: Number,
      component: Object,
      x: Number,
      y: Number,
      texte: String
   },

   methods: {
      fermerFenetre() {
         this.$emit("fermetureFenetre");
      },

      valider() {
         this.$emit("saisieValidee", this.inputTexte);
         this.fermerFenetre();
      }
   }
}
</script>
