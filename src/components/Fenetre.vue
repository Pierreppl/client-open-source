<style src="../css/fenetre.css">
</style>


<template>
  <div class="window" v-bind:style="{height: this.height + 'px', width: this.width + 'px'}">
    <div class="window-header">
      <span class="window-title"> {{ titre }}</span>
      <button class="close-button" @click.prevent="fermerFenetre" ></button>
    </div>
    <div class="window-body" v-bind:style="tailleCorps">

    </div>
    <div class="window-footer">
      <a class="close-text Fenetre_lien" @click.prevent="fermerFenetre"> {{ texteFermeture }} </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Fenetre',

  data: function() {
    return {
      tailleCorps: {
        height: (this.height - 60).toString() + "px",
      },

      titre: "Fenetre",
      texteFermeture: "Fermer la fenetre"
    }
  },

  props: {
    titre: {
      type: String,
      default: "Fenêtre"
    },

    texteFermeture: {
      type: String,
      default: "Fermer la fenetre"
    },

    width: Number,
    height: Number,
    component: Object
  },

  methods: {
    fermerFenetre() {
      this.$el.remove();
      this.$destroy();
    }
  },

  computed: {
    tailleBody() {
      return (this.height - 60).toString() + "px";
    }
  }
}
</script>
