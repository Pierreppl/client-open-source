<template>
   <div>
      <Declencheur :data="data"></Declencheur>
   </div>
</template>

<script>

import Declencheur from "./DeclencheurSignal.vue";

export default {
  name: "OptionesIcone",

  components: {
    "Declencheur": Declencheur
  },

  data() {
    return { data: {
                    type: "img",
                    src: require("../I/messagerie.svg"),
                    alt: "Messagerie",
                    width: "20",
                    height: "20",
                    title: "Messagerie",

                    sigNom: "afficher-fenetre-messagerie",
                    sigData: true
                   }
            };
  }
}

</script>
