<template>
<div>
   <img :src="getImg(modeAffichage)" alt="Mode d'affichage des sujets"
      width="15" height="10" style="cursor: pointer" />
</div>
</template>

<script>
export default {
   name: "BtnModeAffichageSujets",

   props: {
      modeAffichage: Number
   },

   data() {
      return {
         imageSrc: require("../../I/Forum/fofoModeNormal.gif")
      }
   },

   methods: {
      getImg(v) {
         if (v === 0)
            return require("../../I/Forum/fofoModeNormal.gif")
         else
            return require("../../I/Forum/fofoModeListe.gif");
      }
   }
}
</script>
