<style>

   #changement-page-forum {
      display: flex;
      position: absolute;
      top: 20px;
      right: 50px;
      flex-direction: column;
      border: 2px solid black;
      padding-right: 10px;
      padding-left: 10px;
      padding-bottom: 10px;
      margin-right: 25px;
      background-color: #303036;
   }

   .Fenetre_lien, .Fenetre_lien:hover, .Fenetre_lien:visited, .Fenetre_lien:focus {
      color: #BCC2D9;
      position: relative;
      top: 5px;
      text-decoration: none;
   }

   .Fenetre_lien:hover {
      text-shadow: 0 0 2px #029489;
   }

   .input-page {
      width: 60px;
      display: inline-flex;
      flex: 1;
      background-color: #1E1E24;
   }

</style>

<template>
<div id="changement-page-forum">
   <div v-for="page in pagesSelectionnables" @click.prevent="selectionnerPage(page)"
      class="num-page Fenetre_lien">
      Page {{ page }}
   </div>
   <input class="Fenetre_lien input-page" type="number" textContent="Autre"
      id="input-changement-page" ref="inputChgmtPage"
      @keypress.enter="selectionnerPageInput">
   <input class="Fenetre_lien input-page" type="submit" :value="valider"
      @click.prevent="selectionnerPageInput">
</div>
</template>

<script>
export default {
   name: "ChangementPage",

   data: function() {
      return {
         pagesaAfficher: 4,
         pagesSelectionnables: new Array(),
         valider: this.$config.txt.FORUM_VALIDER_PAGE[this.$config.lang]
      }
   },

   props: {
      pageCourante: Number,
      nbPages: Number
   },

   methods: {
      selectionnerPage(page) {
         this.$emit("eventChangementPage", page);
      },

      selectionnerPageInput() {
         let page = parseInt(this.$refs.inputChgmtPage.value);
         if (page < 1) {
            page = 1;
         } else if (page > this.nbPages) {
            page = this.nbPages;
         } else if (isNaN(page)) {
            page = this.pageCourante;
         }
         this.selectionnerPage(page);
      }
   },

   created() {
      /* Gestion des pages proposée aux joueurs (dépend de la page courante et
      * du nombre de page)
      * Propose les n = pagesaAfficher premieres pages, les n au dessus et au
      * dessous de la page courantes, la médianne entre la page courant et la première,
      * la médiane entre la courant et la dernière, puis la dernière. */
      let i, max, diff;

      if (this.nbPages <= 10) {
         for (i = 1; i <= this.nbPages; i++)
         this.pagesSelectionnables.push(i);
      } else {
         if (this.pageCourante > this.pagesaAfficher) {
            for (i = 1; i <= this.pagesaAfficher && i < this.pageCourante - this.pagesaAfficher; i++)
               this.pagesSelectionnables.push(i);
            if (this.pageCourante > 2 * this.pagesaAfficher + 1)
               this.pagesSelectionnables.push(Math.trunc(this.pageCourante / 2));
         }
         diff = this.pageCourante - this.pagesaAfficher;
         max =  diff > 1 ? diff : 1;
         for (i = max; i < this.pageCourante; i++)
            this.pagesSelectionnables.push(i);

         for (i = this.pageCourante; i <= this.pageCourante + this.pagesaAfficher && i <= this.nbPages; i++)
            this.pagesSelectionnables.push(i);

         if (this.pageCourante + this.pagesaAfficher < this.nbPages) {
            if (this.pageCourante + this.pagesaAfficher + 1 < this.nbPages)
               this.pagesSelectionnables.push(Math.trunc((this.nbPages + this.pageCourante + this.pagesaAfficher) / 2));
            this.pagesSelectionnables.push(this.nbPages);
         }
      }
   }
}
</script>
