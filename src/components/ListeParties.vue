<style>
</style>

<template>
<div>
   <div v-for="p in lsParties" :key="p.id">
      {{ p.jeu + " ## " + p.nom + " ## " + p.nbJoueurs }}
   </div>
</div>
</template>

<script>

export default {
  name: "ListeParties",

  data: function() {
    return {
      _mounted: 0,
      lsParties: []
    };
  },

  methods: {
    traiterReponse(code, msg, _) {
      if (code === "CxNP") { // Nouvelle partie créée
         // CxNP#" + CodePartie + "#" + CodeJeu + "#" + NomPartie + "#0#" + (hasMotDePasse() ? "1" : "0") + "#" + TypePartie()
         let infos = msg.slice(1);
         infos.splice(5, 0, "0");

         this.$set(this.lsParties, this.lsParties.length, this.creerPartie(infos));
      } else if (code === "CxQ") { // Un joueur quitte une partie
         // serveur.MAJ_Liste_Partie("CxQ#" + CodePartie + "#" + NbJoueur + "#", this);
         const i = this.getPartieViaID(Number(msg[1]));
         if (i !== undefined) {
            if (Number(msg[2]) <= 0)
               this.lsParties.splice(i, 1);
            else
               this.$set(this.lsParties[i], "nbJoueurs", Number(msg[2]));
         }
      } else if (code === "CxR") { // Un joueur rejoint une partie
         // "CxR#" + JOUEUR.NomJoueur + "#" + CodePartie + "#" + JOUEUR.PartieEnCours.getLsJoueurPartie().size() + "#"
         if (msg.length === 1) // Quitter l'éditeur Aaaah!
            return false;

         const i = this.getPartieViaID(Number(msg[2]));
         if (i !== undefined)
            this.$set(this.lsParties[i], "nbJoueurs", Number(msg[3]));

      } else if (code === "CxJ") { // Liste des parties en cours
         const $ = String.fromCharCode(2);

         let parties = msg[2].split($ + $);
         const sz = parties.length;
         let infos;

         this.lsParties = [];

         for (let i = 0; i < sz; ++i) {
            // Info.append($ + $ + Partie.CodePartie + $ + Partie.CodeJeu + $ + Partie.NomPartie + $ + NbJoueur + $ + (Partie.hasMotDePasse() ? "1":"0") + $ + Partie.Couleur_Partie(JOUEUR) + $ + Partie.TypePartie());
            infos = parties.split($);
            this.$set(this.lsParties, i, this.creerPartie(infos));
         }

         return false;
      }

      else
         return false;

      return false; // Composant passif ()
    },

    /**
     * Créer un objet "partie" sur bases des données de <infos>.
     * Celles-ci sont sous forme de String dans l'ordre suivant :
     *    id, jeu, nbJoueurs, mdpPresent, choixEquipe, type
     *
     * @param {String[]} infos
     *
     * @return {Object}
     */
    creerPartie(infos, i) {
       return {
         id: Number(infos[0]),
         jeu: infos[1],
         nom: infos[2],
         nbJoueurs: Number(infos[3]),
         mdpPresent: (infos[4] === "1"),
         choixEquipe: (infos[5] === "1"),
         type: infos[6]
       }
    },

    getPartieViaID(id) {
       for (let i = this.lsParties.length - 1; i >= 0; --i) {
          if (this.lsParties[i].id === id)
             return i;
       }

       return undefined;
    }
  },

  mounted() {
     if (this._mounted === false) {
        this._mounted = true;
        this.$config.reseau.registerTraitementReponse(this);
     }
  },

  beforedestroyed() {
     this.$config.reseau.stopRegTraitementReponse(this);
  }
}

</script>
