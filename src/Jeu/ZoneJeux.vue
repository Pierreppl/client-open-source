<style>

canvas {
  position: absolute;
}

</style>

<template>
   <div>
      <div tabindex="1" width="800" height="600" ref="zoneCanvas" @keydown="keyDown" @keyup="keyUp">
         
        
      </div>
      <InfoBouboum> </InfoBouboum>
   </div>
</template>

<script>

import * as Jeu from "./Jeu.js";
import * as Aaaah from "./Aaaah/Aaaah.js";
import * as Bouboum from "./Bouboum/Bouboum.js";
import {BoumImageLoader} from "./Bouboum/BoumImageLoader.js";
import {AaaahSpritesManager} from "./Aaaah/AaaahSpritesManager.js";

import Global from "../Global.js";

import InfoBouboum from "./InfoBouboum.vue";

export default {
   name: "ZoneJeux",

   components: {
      "InfoBouboum": InfoBouboum,
   },

   data: function() {
      return {
         eventHandler: null,
         boumImgLoader: new BoumImageLoader().loadImages()
      };
   },

   mounted() {
      document.body.onmousemove = this.mouseMove;
      document.body.onmousedown = this.mouseDown;
      document.body.onmouseup = this.mouseUp;
      document.body.onmouseleave = this.mouseLeave;
      window.onresize = this.resize;
   },

   methods: {

      startJeu(typeJeu) {
         let jeu;

         if (this.$etat.jeu != null) {
            console.log("Une instance de jeu est toujours présente");
            return;
         } 
         
            AaaahSpritesManager.load(() => {
            switch (typeJeu) {
               case Jeu.JEU_AAAAH:
                  jeu = new Aaaah.Aaaah(this, Global.$config.reseau, Global.$etat, 800, 393);
                  break;

               case Jeu.JEU_BOUBOUM:
                  jeu = new Bouboum.Bouboum(this, Global.$config.reseau, Global.$etat, 580, 380, this.boumImgLoader);
                  
                  break;

               case Jeu.JEU_FORTERESSE:
                  // @TODO
                  break;
            }

            this.setEventHandler(jeu.getEventHandler());
            jeu.start();

            // Remove existing chilg
            while (this.$refs.zoneCanvas.firstChild) {
               this.$refs.zoneCanvas.removeChild(this.$refs.zoneCanvas.firstChild);
            }
            this.$refs.zoneCanvas.appendChild(jeu.getPixiView());
            this.$refs.zoneCanvas.appendChild(jeu.getForegroundView());

            this.$refs.zoneCanvas.focus();
            this.$etat.jeu = jeu;
         });
      },

      exitJeu() {
         if (this.$etat.jeu != null) {
            this.$etat.jeu.quitter();
            this.$etat.jeu = null;
         }
      },

      cleanCanvas() {
         while (this.$refs.zoneCanvas.firstChild) {
            this.$refs.zoneCanvas.removeChild(this.$refs.zoneCanvas.firstChild);
         }
      },

      setEventHandler(handler) {
         this.eventHandler = handler;
      },

      keyDown(key) {
         if (this.eventHandler != null)
            this.eventHandler.keyDown(key);
      },

      keyUp(key) {
         if (this.eventHandler != null)
            this.eventHandler.keyUp(key);
      },

      mouseUp(mouse) {
        if (this.eventHandler != null)
           this.eventHandler.mouseEvent(mouse, 'U');
      },

      mouseDown(mouse) {
        if (this.eventHandler != null)
           this.eventHandler.mouseEvent(mouse, 'D');
      },

      mouseMove(mouse) {
        if (this.eventHandler != null)
           this.eventHandler.mouseEvent(mouse, 'M');
      },

      mouseLeave(mouse) {
         if (this.eventHandler != null)
           this.eventHandler.mouseEvent(mouse, 'L');
      },

      resize(event) {
         if (this.eventHandler != null)
           this.eventHandler.resizeEvent(event);
      }
   }
};
</script>
