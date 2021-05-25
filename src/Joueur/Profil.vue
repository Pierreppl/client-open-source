<style scoped src="./profil.css"></style>

<template>
<div class="profil" v-if="visible">
   <div class="bandeau">
      <div class="etat-connexion" :class="getEtatCo"></div>
      <span class="titre">{{ nom }}</span>
      <div v-if="estInscrit && ciblePasMoi" class="icone icone-chuchoter" @click="chuchoter"></div>
      <div v-if="estInscrit && ciblePasInvite && ciblePasMoi" class="icone icone-ajouter-ami" @click="ajouterAmi"></div>
      <div v-if="ciblePasInvite" class="icone icone-medaille" @click="afficherPalmares"></div>
      <div class="icone-separateur"></div>
      <div class="icone icone-fermer" @click="fermer"></div>
   </div>

   <div class="corps">
      <div class="desc-container">
         <div class="avatar">
            <img ref="avatar" width="120" heigt="80"
                 :src="avatar" :alt="'Avatar de ' + nom"
                 @error="corrigeAvatarLienRompu" />
         </div>
         <div class="desc-texte">{{ description }}</div>
      </div>
      <div class="texte-fermer" @click="fermer">{{ $config.txt.FEN_CLOSE[$config.lang] }}</div>
   </div>
</div>
</template>

<script>

import * as General from "../utils/General.js";
import * as Cnl from "../General/Canal.js";
import Global from "../Global.js";

export default {
   name: "Profil",

   data: function() {
      return {
         visible: false,

         nom: "",
         dateInscription: "",
         dateDeconnexion: "",
         etatConnexion: "",
         avatar: "",
         description: "",
         descriptionVide: "\n\nCe joueur n'a pas rempli sa description.",

         idTeam: "",
         nomTeam: "",
         roleTeam: "",
         gradeTeam: "",

         medailles: [],

         eloAaaah: 0,
         eloBoum: 0,
         eloForto: 0,

         aaaahPartieGuide: 0,
         aaaahPrctSauvetage: 0,
         aaaahPartiePremier: 0,
         aaaahPrctPremier: 0,

         boumPrctGagnee: 0,
         boumPartieGagnee: 0,
         boumTPM: 0,

         oldStatExistantes: false,

         aaaahOldGuidees: 0,
         aaaahOldPrctGuidees: 0,
         aaaahOldPremier: 0,
         aaaahPrctPremier: 0,

         boumOldGagnee: 0,
         boumOldPrctGagnee: 0
      };
   },

   methods: {
      corrigeAvatarLienRompu(event) {
         if (this.$refs.avatar !== undefined && this.$refs.avatar.src !== Global.AVATAR_PAR_DEFAUT) {
            this.$refs.avatar.src = Global.AVATAR_PAR_DEFAUT;
            event.preventDefault();
         }
      },

      initDistinctions(distinctions) {
         const $ = String.fromCharCode(2);

         if (distinctions == "0") // Pas de médailles
            return;

         let lsRecomps = distinctions.split($+$);
         lsRecomps.shift(); // On supprime l'indicateur de médaille

         for (let i = 0; i < lsRecomps.length; ++i) {
            let medaille = {};
            let contenu = lsRecomps[i].split($);

            medaille.src = General.MedailleViaID(contenu[0]);
            medaille.txt = contenu[1];

            this.medailles.push(medaille);
         }
      },

      init(data) {
         // Général
         this.nom = data[0].substr(0,1).toUpperCase() + data[0].substr(1);
         this.avatar = General.AttribuerAvatar(data[15]);
         this.description = (data[16] === "" ? this.descriptionVide : data[16].replace(/\r/g, "\n"));
         this.dateInscription = new Date(parseInt(data[1]) * 1000).toLocaleDateString();
         this.dateConnexion = new Date(parseInt(data[17]) * 1000).toLocaleDateString();
         this.etatConnexion = data[18];

         // Distinctions (médailles)
         this.initDistinctions(data[19]);

         // Statistiques en jeu
         this.aaaahPartieGuide = parseInt(data[2]);
         this.aaaahPrctSauvetage = parseInt(data[3]) / 100;
         this.aaaahPartiePremier = parseInt(data[4]);
         this.aaaahPrctoPremier = parseInt(data[5]) / 100;

         const boumPartieJouee = parseInt(data[6]);
         this.boumPartieGagnee = parseInt(data[7]); // -> stat : parseInt(1000 * pg/pj)
         this.boumPrctGagnee = parseInt((10000 * this.boumPartieGagnee) / boumPartieJouee) / 100;
         this.boumTPM = parseInt(data[8]) / 100;

         // Anciennes statistiques
         this.oldStatExistantes = (data[9] !== "-1");

         if (this.oldStatExistantes) {
            this.aaaahOldGuidees = this.aaaahPartieGuide + parseInt(data[9]);
            this.aaaahOldPrctGuidees = parseInt(data[10]) / 100;
            this.aaaahOldPremier = this.aaaahPartiePremier + parseInt(data[11]);
            this.aaaahPrctPremier = parseInt(data[12]) / 100;

            this.boumOldGagnee = this.boumPartieGagnee + parseInt(data[13]);
            this.boumOldPrctGagnee = parseInt(data[14]) / 100;
         }

         // Team
         this.idTeam = data[20];
         if (this.idTeam !== "0") {
            this.nomTeam = data[21];
            this.grade = General.MedailleViaID(data[22], General.TYPE_MEDAILLE_GRADE);
            this.role = data[23];
         }
      },

      chuchoter() {
         this.$etat.instanceChat.addCanalEtSelectionne(new Cnl.Canal(this.nom, Cnl.N_CANAL_CHUCHOTER, this.nom));
      },

      ajouterAmi() {
         this.$etat.instanceChat.simulerCmd("ami " + this.nom);
      },

      afficherPalmares() {
         // Afficher les médailles dans une petite fenêtre (par exemple)
         console.log("afficherPalmares " + this.nom);
      },

      fermer() {
         this.visible = false;
      }
   },

   computed: {
      getEtatCo() {
         if (this.etatConnexion === "0")
            return "deconnecte";
         else if (this.etatConnexion === "1")
            return "connecte";
         else if (this.etatConnexion === "2")
            return "absent";
      },

      estInscrit() {
         return !this.$etat.joueur.estInvite();
      },

      ciblePasMoi() {
         return !this.$etat.joueur.memePseudo(this.nom);
      },

      ciblePasInvite() {
         return this.nom.substring(0, 1) !== "*";
      }
   },

   created() {
      let vm = this;
      this.$root.$on("afficher-profil-joueur", (data) => {
         vm.init(data);
         vm.visible = true;
      });
   }
};

</script>
