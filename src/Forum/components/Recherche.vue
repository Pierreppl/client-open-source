   <style>
   .boite-recherche {
      border: solid 2px black;
      width: 182px;
      background-color: inherit;
      position: absolute;
      left: 90px;
      top: 500px;

      padding: 5px;
   }

   .bouton {
      margin-left: 20px;
   }

   .label-bouton {
      margin-right: 20px;
   }

   .input-texte {
      background-color: #1E1E24;
      color: #BCC2D9;
      padding-left: 5px;
   }

   .action-recherche {
      margin-left: 20px;
      margin-right: 20px;
   }
</style>

<template>
<div class="boite-recherche">
   <form>
      <input class="bouton" type="radio" name="auteur" value="auteur" v-model="choisi">
      <label class="label-bouton" for="one">Auteur</label>
      <input class="bouton" type="radio" name="titre" value="titre" v-model="choisi">
      <label class="label-bouton" for="one">Titre</label>
   </form>
   <input class="input-texte" v-model="inputTexte" type="text" name="texte" maxlength="50">
   <br />
   <span class="Fenetre_lien action-recherche" @click.prevent="rechercher"> Confirmer </span>
   <span class="Fenetre_lien action-recherche" @click.prevent="quitter"> Annuler </span>
</div>
</template>

<script>

export default {
   name: "Recherche",
   data: function() {
      return {
         choisi: "auteur",
         inputTexte: ""
      }
   },

   props: {
      reseau: Object
   },

   methods: {
      rechercher() {
         let code = this.choisi === "auteur" ? 1 : 0;
         this.$emit("eventRechercheForum", code, this.inputTexte);
         this.quitter();
      },

      quitter() {
         this.choisi = "auteur";
         this.$emit("eventFinRecherche");
      }

   }
}
</script>
