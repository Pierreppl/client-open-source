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
                    type: "txt",
                    txt: "&#9881;",
                    title: "Options",
                    sigNom: "afficher-fenetre-options",
                    sigData: true
                   }
            };
  }
}

</script>
