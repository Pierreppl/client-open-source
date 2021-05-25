<style>
   .vignette-menu {
      padding: 7px;
      background-color: #303036;
      border: 2px black solid;
      box-shadow: 2px 2px 2px 0px rgba(0,0,0,0.75);
      display: flex;
      flex-direction: column;
      position: fixed;
      white-space: nowrap;
      z-index: 9999;
   }

   .cmd {
      cursor: pointer;
      user-select: none;
   }

   .cmd:not(:last-child) {
      margin-bottom: 2px;
   }

   .cmd:hover {
      text-shadow: 0 0 2px #029489;
   }
</style>

<template>
   <div ref="vignette" v-if="visible" :style="style" class="vignette-menu">
      <span class="cmd" v-for="(option, index) in options" @click="executerCommande(index)" :key="index">{{option[0]}}</span>
   </div>
</template>

<script>
import Global from "../Global.js";

export default {
   name: "VignetteMenu",

   computed: {
      style () {
         return { top: this.top + "px", left: this.left + "px" };
      },
   },

   data: function() {
      return {
         visible: false,
         top: null,
         left: null,
         options: [],

         fctClickDehors: null
      }
   },

   methods: {
      executerCommande(index) {
         this.fermer();
         this.options[index][1]();
      },

      ouvrir(event, options, offset = {x: -20, y: -15}) {
         if (this.visible)
            this.fermer();

         this.options = options;
         this.visible = true;
         this.positionner(event.pageY + offset.y, event.pageX + offset.x);

         const vm = this;

         this.fctClickDehors = function (event) {
             if (vm.visible && vm.$refs.vignette !== event.target.closest(".vignette-menu")) {
                vm.fermer();
             }
         };

         document.addEventListener("click", this.fctClickDehors);
         event.stopPropagation();
      },

      fermer() {
         this.visible = false;

         document.removeEventListener("click", this.fctClickDehors);
      },

      positionner(top, left) {
         const maxHeight = window.innerHeight - this.$el.offsetHeight - 25;
         const maxWidth = window.innerWidth - this.$el.offsetWidth - 25;
         if (top > maxHeight)
            top = maxHeight;
         if (left > maxWidth)
            left = maxWidth;
         this.top = top;
         this.left = left;
      }
  },

  beforedestroyed() {
    document.removeEventListener("click", this.fctClickDehors);
  }
}
</script>
