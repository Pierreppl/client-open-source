<style src="../css/vignette.css"></style>

<template>
<div>
   <div v-if="modeAffichage === 0" class="vignetteNormale">
      <img class="photo-vignette" ref="avatar" width="120" heigt="80"
           v-bind:src="avatar" :alt="'Avatar de ' + auteur"
           @error="corrigeAvatarLienRompu"
          @click="propagerEventMenu($event)"/>
      
      <div class="contenu-vignette" @click.prevent="requeteSujet" style="position:relative">
         <div class="premiere-ligne-vignette">
            <img v-if="estFerme" width="9" height="10"
               src="../../I/Forum/fofoLock.gif" title="Discussion close"
               style="margin: auto 6px auto 0px" />
            <div ref="titre" class="titreForum" style="max-width: 480px; height: 20px;" :title="infobulleTitre">{{ titre }}</div>
            <span class="aller-derniere-page" title="Dernière page" @click.stop="allerDernierePage">
                &#8631;
             </span>
            <img v-if="estEpingle" class="epingle-topic" src="../../I/miniForum.gif"
               title="Discussion épinglée" width="13" height="14" alt="&#128270;" />
         </div>

         <div class="deuxieme-ligne-vignette">
            <span class="auteur-topic-forum"> {{ auteur }} </span>
            <span class="texteBleuGris"> {{ dateCreation }}</span>
            <span v-if="estFerme" class="texteRouge">, Discussion close </span>
            <img v-if="aEtoile" class="etoile-jaune-topic" src="../../I/etoile.gif"
               width="13" height="14" alt="&#128270;" />
         </div>

         <div class="contenu-droite-vignette">
            <div class="texteGris"> {{ nbMessages }} messages </div>
            <span class="texteBleuGris"> {{ auteurDernierPost }} </span>
            <span class="texteGris"> {{ dateDernierPost }} </span>
         </div>
      </div>
   </div>

   <div v-if="modeAffichage === 1" class="vignetteListe" @click.prevent="requeteSujet">
      <div class="contenu-vignette">
         <div class="premiere-ligne-vignette">
            <img v-if="estFerme" width="9" height="10" src="../../I/Forum/fofoLock.gif"
               title="Discussion close" style="margin: auto 6px auto 0px" />
            <div ref="titre" class="titreForum" style="max-width: 560px;" :title="infobulleTitre">{{ titre }}</div>
            <span class="aller-derniere-page" title="Dernière page" @click.stop="allerDernierePage">
               &#8631;
            </span>

            <div style="margin-left: auto;">
               <img v-if="estEpingle" class="epingle-topic" src="../../I/miniForum.gif"
                  title="Discussion épinglée" width="13" height="14" alt="&#128270;" />
               <img v-if="aEtoile" class="etoile-jaune-topic" src="../../I/etoile.gif"
                  width="13" height="14" alt="&#128270;" />
            </div>
         </div>

         <div class="deuxieme-ligne-vignette">
            <span class="auteur-topic-forum"> {{ auteur }} </span>
            <span class="texteBleuGris"> {{ dateCreation }}</span>
            <span class="texteGris">, {{ nbMessages }} messages </span>

            <div style="margin-left: auto;">
               <span class="texteBleuGris"> {{ auteurDernierPost }},&nbsp; </span>
               <span class="texteGris" style="float: right"> {{ dateDernierPost }} </span>
            </div>
         </div>
      </div>
   </div>
</div>
</template>

<script>

import * as General from "../../utils/General.js";
import Global from "../../Global.js";

export default {
   name: "VignetteSujet",
   data: function() {
      return {
         id: 0,
         avatar: Global.AVATAR_PAR_DEFAUT,
         titre: "???",
         auteur: "?",
         dateCreation: "undefined",
         nbMessages: 0,
         auteurDernierPost: "?",
         dateDernierPost: "undefined",
         estFerme: false,
         estEpingle: false,
         aEtoile: false,

         infobulleTitre: ""
      }
   },

   props: {
      messageServeur: Array,
      modeAffichage: Number
   },

   watch: {
      modeAffichage() {
        if (this.$refs.titre.offsetWidth < this.$refs.titre.scrollWidth)
           this.infobulleTitre = this.titre;
      }
   },

   methods: {
      corrigeAvatarLienRompu(event) {
         if (this.$refs.avatar !== undefined && this.$refs.avatar.src !== Global.AVATAR_PAR_DEFAUT) {
            this.$refs.avatar.src = Global.AVATAR_PAR_DEFAUT;
            event.preventDefault();
         }
      },

      requeteSujet() {
         this.$emit("eventRequeteSujet", this.titre, this.id, this.estFerme, 1);
      },

      allerDernierePage() {
         this.$emit("eventRequeteSujet", this.titre, this.id, this.estFerme, Math.ceil(this.nbMessages / 20));
      },

      propagerEventMenu(event) {
         this.$emit("ouvertureMenu", event, this.id);
      }
   },

   /* 0 => identifiant topic
   * 1 => date création
   * 2 => auteur
   * 3 => avatar
   * 4 => titre
   * 5 => date dernier message
   * 6 => nombre de messages
   * 7 => dernier posteur
   * 8 => clos
   * 9 =>
   * 10 => epinglé
   * 11 => etoilé
   * A partir des informations du serveur, cree un bandeau
   * de sujet et l'ajoute dans la liste.
   */
   created() {
      let msgSlice = this.messageServeur;

      this.id = msgSlice[0];
      this.avatar =  General.AttribuerAvatar(msgSlice[3]);
      this.titre = msgSlice[4];
      this.auteur = msgSlice[2];
      this.dateCreation = new Date(parseInt(msgSlice[5]) * 1000).toLocaleDateString();
      this.dateDernierPost = new Date(parseInt(msgSlice[1]) * 1000).toLocaleDateString();
      this.nbMessages = msgSlice[6];
      this.auteurDernierPost = msgSlice[7];

      if (msgSlice[8] === "1")
         this.estFerme = true;

      if (msgSlice[10] === "1")
         this.estEpingle = true;

      if (msgSlice[11] === "1")
         this.aEtoile = true;
   },

   mounted() {
      if (this.$refs.titre.offsetWidth < this.$refs.titre.scrollWidth)
         this.infobulleTitre = this.titre;
   }
}
</script>
