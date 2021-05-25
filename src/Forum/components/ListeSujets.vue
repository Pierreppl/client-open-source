<template>
   <div>
      <FenetreSaisie v-if="menuInteractif"
         :texte=texteAafficher :titre=titre
         @fermetureFenetre="menuInteractif = false"
         @saisieValidee="validerSaisie">
      </FenetreSaisie>
      <VignetteMenu ref="menu"></VignetteMenu>
      <VignetteSujet v-for="msg in sujets"
         :messageServeur="msg" :key="msg.id"
         :modeAffichage="modeAffichage"
         @eventRequeteSujet="propagerEventRequeteSujet"
         @ouvertureMenu="ouvrirMenu">
      </VignetteSujet>
   </div>
</template>

<script>

import VignetteSujet from "./VignetteSujet.vue";
import VignetteMenu from "../../components/VignetteMenu.vue";
import Global from "../../Global.js";
import FenetreSaisie from "../../components/FenetreSaisie.vue";

export default {
   name: "ListeSujets",

   components: {
      "VignetteSujet": VignetteSujet,
      "VignetteMenu": VignetteMenu,
      "FenetreSaisie": FenetreSaisie
   },

   data: function() {
      return {
         menuInteractif: false,
         texteAafficher: "",
         code: "",
         idSujet: 0,
      }
   },

   props: {
      sujets: Array,
      modeAffichage: Number
   },

   methods: {
      propagerEventRequeteSujet(titre, id, etat, page) {
         this.$emit("eventRequeteSujet", titre, id, etat, page);
      },

      ouvrirMenu(event, id) {
         console.log(event);
         const self = Global.$etat.joueur;
         const send = Global.$config.reseau.Envoie;
         let options = [];

         if (self.estModoForum() || self.estModoJeu()) {
            options.push(["Fermer la discussion", function() {send("FoX#" + id + "#" + self.nom);}]);
            options.push(["Supprimer la discussion", function() {send("FoD#" + id);}]);
            //traitement spécifique requis
            options.push(["Déplacer la discussion", () => {
               this.titre = "Déplacer le sujet";
               this.texteAafficher = "Aaaah=2 Boum=3 Forto=4 Bugs=5 Général=6 VIP=7 Modo=0 Art=8 Anim=9 Poubelle=10";
               this.menuInteractif = true;
               this.code = "FoM";
               this.id = id;
            }]);
            //traitement spécifique requis
            options.push(["Editer le titre", () => {
               this.titre = "Editer le titre"
               this.texteAafficher = "";
               this.menuInteractif = true;
               this.x = (800 - this.width)/2;
               this.y = (600 - this.height)/2;
               this.code = "FoT";
               this.id = id;
            }]);
            options.push(["Post-it", function() {send("FoPI#" + id);}]);
            options.push(["Topic Animateur", function() {send("FoTA#" + id);}]);
            options.push(["Copier le lien de la discussion", function() {alert("Copier le lien de la discussion");}]);
            this.$refs.menu.ouvrir(event, options);
         }
      },

      validerSaisie(saisie) {
         Global.$config.reseau.Envoie(this.code + "#" + this.id + "#" + saisie);
      }
   }
}
</script>
