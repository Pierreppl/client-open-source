<template>
  <div>
    <img :src="imageSrc" alt="Fermer" width="13" height="13" @mouseover="modeSourisOn" @mouseout="modeSourisOut"
    style="cursor: pointer" />
  </div>
</template>

<script>
export default {
  name: "BoutonFermer",

  data() {
    return {
      imageSrc: require("../I/fermer.gif")
    }
  },

  methods: {
    modeSourisOn() {
      this.imageSrc = require("../I/fermerHover.gif");
    },

    modeSourisOut() {
      this.imageSrc = require("../I/fermer.gif");
    }
  }
}

</script>
