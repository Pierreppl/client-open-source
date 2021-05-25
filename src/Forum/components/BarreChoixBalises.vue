<style>
   .barre-balises {
      height: 20px;
      width: 80%;
      background-color: #232228;
      display: flex;
      border: solid 2px #000000;
      cursor: pointer;
   }

   .rectangle-couleur {
      width: 30px;
      height: 20px;
      margin-left: 2px;
      margin-right: 2px;

      user-select: none;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
   }

   .rectangle {
      width: 40px;
      height: 20px;
      background-color:  #15152E;
      text-align: center;
      margin-left: 2px;
      margin-right: 2px;
      margin-top: 1px;

      user-select: none;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
   }

   .rec-margin {
      margin-left: 5px;
      margin-right: 5px;
   }

   .rectangle-couleur:hover {
      margin-left: 0px;
      margin-right: 0px;
      border: solid 2px #BCC2D9;
   }

   .rectangle:hover {
      /*margin-left: 3px;
      margin-right: 3px;
      border: solid 2px #BCC2D9;*/
      text-shadow: 0 0 3px #FF0000;
   }

</style>

<template>
   <div class="barre-balises">
      <div v-for="couleur in couleurs" class="rectangle-couleur"
         :style="couleur"
         @mouseover="$root.tooltip.displayTooltip(couleur.nom, $event)" @mouseout="$root.tooltip.reset()"
         @click.prevent="choisirCouleur(couleur)">
      </div>
      <div @mouseover="$root.tooltip.displayTooltip('Souligné', $event)" @mouseout="$root.tooltip.reset()" class="rectangle rec-margin" @click.prevent="$emit('balise', 'u')"> Ṵ </div>
      <div @mouseover="$root.tooltip.displayTooltip('Gauche', $event)" @mouseout="$root.tooltip.reset()" class="rectangle rec-margin" @click.prevent="$emit('balise', 'gauche')"> &lt;☰ </div>
      <div @mouseover="$root.tooltip.displayTooltip('Milieu', $event)" @mouseout="$root.tooltip.reset()" class="rectangle rec-margin" @click.prevent="$emit('balise', 'milieu')"> ☰ </div>
      <div @mouseover="$root.tooltip.displayTooltip('Droite', $event)" @mouseout="$root.tooltip.reset()" class="rectangle rec-margin" @click.prevent="$emit('balise', 'droite')"> ☰&gt; </div>
      <div @mouseover="$root.tooltip.displayTooltip('Titre', $event)" @mouseout="$root.tooltip.reset()" class="rectangle rec-margin" @click.prevent="$emit('balise', 'titre')"> T </div>
      <div @mouseover="$root.tooltip.displayTooltip('Sous-titre', $event)" @mouseout="$root.tooltip.reset()" class="rectangle rec-margin" @click.prevent="$emit('balise', 'stitre')"> ST </div>
      <div @mouseover="$root.tooltip.displayTooltip('Petit', $event)" @mouseout="$root.tooltip.reset()" class="rectangle rec-margin" @click.prevent="$emit('balise', 'petit')"> P </div>
      <div @mouseover="$root.tooltip.displayTooltip('Spoiler', $event)" @mouseout="$root.tooltip.reset()" class="rectangle rec-margin" @click.prevent="$emit('balise', 'spoiler')"> S </div>
      <!-- ☰ -->
   </div>
</template>

<script>
export default {
   name: "BarreChoixBalises",
   data: function() {
      return {
         couleurs: [
            {nom: "vert", backgroundColor: "#009D9D", balise: "v"},
            {nom: "orange", backgroundColor: "#D3A769", balise: "o"},
            {nom: "jaune", backgroundColor: "#C9CD36", balise: "j"},
            {nom: "bleu", backgroundColor: "#0066CE", balise: "b"},
            {nom: "vertClair", backgroundColor: "#70DB93", balise: "vc"},
            {nom: "mauve", backgroundColor: "#B84DD2", balise: "m"},
            {nom: "rose", backgroundColor: "#ED67EA", balise: "ro"},
            {nom: "gris", backgroundColor: "#C2C2DA", balise: "gr"},
            {nom: "bleuGris", backgroundColor: "#7C7E9E", balise: "bg"}
         ],
      }
   },

   methods: {
      choisirCouleur(couleur) {
         this.$emit("balise", couleur.balise);
      }
   }
}
</script>
