<!--

Passer un objet en propriété nommé data avec :

 > Pour une représentation en texte :
    * .type : "txt"
    * .txt : le texte à afficher
    * .title : si un titre doit être par dessus
    * .sigNom : signal à émettre en cas de clic
    * .sigData : données à transmettre au signal

 > Pour une représentation en image :
    * .type : "img"
    * .src : source de l'image
    * .alt : alt
    * .height : height
    * .width : width
    * .title : si un titre doit être par dessus
    * .sigNom : signal à émettre en cas de clic
    * .sigData : données à transmettre au signal
-->

<template>
  <div style="cursor: pointer" @click="emettre">
     <div v-if="data.type === 'img'"><img :src="data.src" :alt="data.alt" :height="data.height" :width="data.width" :title="data.title" /></div>
     <div v-if="data.type === 'txt'" :title="data.title" v-html="data.txt"></div>
  </div>
</template>

<script>

export default {
  name: "Declencheur",

  props: {
    data : Object
  },

  methods: {
    emettre() {
      this.$root.$emit(this.data.sigNom, this.data.sigData);
    }
  }
};

</script>
