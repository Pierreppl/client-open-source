<style>
#game-body {
  height: 600px;
  width: 800px;
  border: 2px solid #000000;
  padding: 0px;
  margin: 0 auto;
  position: relative;

  background-color: #303036;
  color: #BCC2D9;
}

.cadre-partie{
   border: 2px solid black;
   border-left: 0;
   border-top: 0;
}

.fenetreJeu {
  position: absolute;
}

.menu-right {
    position: absolute;
    bottom: 162px;
    right: 70px;
}

</style>

<template>
   <div padding-top="100">
      <div id="game-body">
         <ZoneJeux ref="znJeux" class="fenetreJeu"></ZoneJeux>
         <Forum :reseau="reseau" class="fenetreJeu"></Forum>
         <Tooltip v-on:register="registerTooltip"></Tooltip>
         <Options class="fenetreJeu" style="margin: 73px 198px; z-index: 90"></Options>
         <Messagerie fenetreJeu="fenetreJeu" class="fenetreJeu" style="z-index: 100"></Messagerie>
         <Profil class="fenetreJeu" style="margin: 73px 198px; z-index: 1000"></Profil>
         <div class="menu-right">
            <div @click="partieBoumRapide"> Bouboum </div>
            <div @click="partieAaaah">Aaaah!</div>
            <div @click="finPartieBoumRapide"> Quitter  </div>
         </div>

         <ChatPrincipal></ChatPrincipal>
      </div>
   </div>
</template>

<script>

import ChatPrincipal from "./ChatPrincipal.vue";
import Forum from "../Forum/Forum.vue";
import Options from "../components/Options.vue";
import Messagerie from "../components/Messagerie.vue";
import Profil from "../Joueur/Profil.vue";
import ZoneJeux from "../Jeu/ZoneJeux.vue";
import * as Bouboum from "../Jeu/Bouboum/Bouboum.js";
import * as Jeu from "../Jeu/Jeu.js";
import Tooltip from "../components/Tooltip";

export default {
  name: "Jeu",

  data: function() {
     return {
        enPartie: false
     }
  },

  components: {
  	Tooltip,
    "ChatPrincipal": ChatPrincipal,
    "Forum": Forum,
    "Options": Options,
    "Messagerie": Messagerie,
    "Profil": Profil,
    "ZoneJeux": ZoneJeux
  },

  props: {
    reseau: Object,
    forumVisible: Boolean
  },

  methods: {
   registerTooltip(tooltip) {
      this.$root.tooltip = tooltip;
   },
   partieBoumRapide() {
      this.$refs.znJeux.startJeu(Jeu.JEU_BOUBOUM);
      /*
      this.$config.reseau.Envoie("CxJ#1");
      this.enPartie = true;
      this.bouboum = new Bouboum(this.$refs.canvas, this.reseau);
      this.$etat.bouboum = this.bouboum;
      this.$config.reseau.registerTraitementReponse(this.bouboum);*/
   },

   finPartieBoumRapide() {
      this.$refs.znJeux.exitJeu();
      /*
      this.$config.reseau.Envoie("CxJ#0");
      this.enPartie = false;
      this.bouboum.clean();
      this.$config.reseau.stopRegTraitementReponse(this.bouboum);
      this.$etat.bouboum = null;
      this.bouboum = null;*/
   },

   partieAaaah() {
      this.$refs.znJeux.startJeu(Jeu.JEU_AAAAH);
   }
 },

  mounted() {
     if (this.forumVisible !== undefined && this.forumVisible === true) {
        this.$etat.instanceChat.simulerCmd("forum");
     }
  }
}

</script>
