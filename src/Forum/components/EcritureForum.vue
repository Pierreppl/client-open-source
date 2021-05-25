<style>
#edition-post, #edition-post:focus {
   height: 400px;
   width: 95%;
   background-color: #303036;
   color: inherit;
   font-size: 12px;
   font: inherit;
   resize: none;
   border: 0px solid black;
   margin-top: 15px;
   outline: none !important;
}
</style>

<template>
   <div class="contenu-post">
      <BarreChoixBalises @balise="insererBalise"> </BarreChoixBalises>
      <textarea ref="editionPost" id="edition-post" maxlength="10000"  cols="98"
         :placeholder="$config.txt.FORUM_TAPEZ_VOTRE_MSG[$config.lang]"
         v-model="contenu" @keyup="majContenu">
      </textarea>
   </div>
</template>

<script>
import BarreChoixBalises from "./BarreChoixBalises.vue";
export default {
   name: "EcritureForum",
   components: {
      "BarreChoixBalises": BarreChoixBalises
   },
   data: function() {
      return {
         contenu: ""
      }
   },
   props: {
      reseau: Object,
      contenuParent: String
   },

   methods: {
      insererBalise(code) {
         console.log(code);
         console.log(this.positionCurseur());

         const curseurs = this.positionCurseur();
         const debut = this.contenu.slice(0, curseurs[0]);
         const selection = this.contenu.slice(curseurs[0], curseurs[1]);
         const fin = this.contenu.slice(curseurs[1], this.contenu.length);

         this.contenu = debut + "[" + code + "]" + selection + "[/" + code + "]" + fin;

         this.$refs.editionPost.focus();
         this.$nextTick(function() {
            let nouvelle_position = curseurs[0] + code.length + 2;
            if(curseurs[0] !== curseurs[1]) {
               nouvelle_position += selection.length;
            }
            this.$refs.editionPost.selectionEnd = nouvelle_position;
         });

         this.majContenu();
      },

      positionCurseur() {
         const texte = document.getElementById("edition-post");
         return [texte.selectionStart, texte.selectionEnd];
      },

      majContenu() {
         this.$emit("majContenu", this.contenu);
      }
   },

   created() {
      this.contenu = this.contenuParent;
   }
}
</script>
