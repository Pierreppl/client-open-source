<style>
   .joueur {
      height: 18px;
      line-height: 18px;
      background-color: #1E1E24;
      border: 1px solid grey;
      padding-left: 5px;
      text-align: left;
      vertical-align: middle;
      left: 5px;
      top: 3px;
      margin-bottom: 2px;
      user-select: none;
   }

   .joueur img {
      float: right;
      margin-right: 2px;
      position: relative;
      top: -17px;
      user-select: none;
   }

   .donnees {
      white-space: nowrap;
      text-overflow: ellipsis;
      width: 130px;
      overflow: hidden;
   }

   .donnees span {
      margin-left: 3px;
   }

   .self {
      color: #029696;
   }

   .score {
      color: #C9CD36;
   }

   .secondaire {
      color: #7C7E9E;
   }
</style>

<template>
   <div class="joueur" :class="{self: isSelf}">
      <div class="donnees">
         {{data.nom}}
         <span v-if="type == 'Aaaah'"><span class="score">{{data.score}}</span></span>
         <span v-else-if="type == 'Bouboum'">- <span class="score">{{data.score}}</span> - <span class="secondaire">{{data.autre}}</span></span>
         <span v-else-if="type == 'Forteresse'"><span class="score">{{data.score}}</span>  <span class="secondaire">{{data.autre}}</span></span>
      </div>
      <img v-if="data.estSurForum" src="../I/miniForum.gif" alt="[F]" height="14" width="14" />
   </div>
</template>

<script>
import Global from '../Global.js';

export default {
   name: "Joueur",

   props: {
      data: Object,
      type: String
   },

   computed: {
      isSelf: function() {
         return Global.$etat.joueur.memePseudo(this.data.nom);
      },
   }
}
</script>
