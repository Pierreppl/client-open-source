<style>
   .charte-forum {
      background-color: #212127;
      border: 3px solid black;
      border-radius: 5px;
      margin-left: 5px;
      margin-right: 0px;
      margin-top: 0px;
      padding: 5px;
      width: 290px;
      position: absolute;
   }

   .regles-charte {
      color: #BCC2D9;
   }

</style>

<template>
<div class="charte-forum">
   <h3 style="color:#019787">Règles d'utilisation des forums :</h3>
   <div class="regles-charte" v-html="$config.txt.FORUM_CHARTE[$config.lang]">
   </div>
</div>
</template>
