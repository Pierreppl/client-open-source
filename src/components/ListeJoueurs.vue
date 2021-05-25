<style>
   #joueurs {
      width: 160px;
      height: 198px;
      display: flex;
      flex-direction: column;
      position: absolute;
      bottom: 0px;
      left: 442px;
      padding: 3px;
      border-top: 1px solid #15151A;
      border-right: 1px solid #15151A;
      overflow: auto;
      z-index: 80;
      box-sizing: border-box;
  }
</style>

<template>
   <div id="joueurs">
      <VignetteMenu ref="menu"></VignetteMenu>
      <div v-if="type==''">
         <Joueur v-for="joueur in joueurs" :key="joueur.nom" :data="joueur" :type="type" @click.native="ouvrirMenu($event, joueur.nom)"></Joueur>
      </div>
      <div v-else>
         <Joueur v-for="joueur in orderedJoueurs" :key="joueur.nom" :data="joueur" :type="type" @click.native="ouvrirMenu($event, joueur.nom)"></Joueur>
      </div>
   </div>
</template>

<script>
import Global from '../Global.js';
import * as Cnl from "../General/Canal.js";
import Joueur from "./Joueur.vue";
import VignetteMenu from "./VignetteMenu.vue";

export default {
   name: "ListeJoueurs",

   components: {
      "Joueur": Joueur,
      "VignetteMenu": VignetteMenu
   },

   data: function() {
      return {
         joueurs: [],
         type: '',
         _mountedPrecedemment: false
      };
   },

   mounted() {
      if (!this._mountedPrecedemment) {
         this._mountedPrecedemment = true;
         Global.$config.reseau.registerTraitementReponse(this);
      }
   },

   computed: {
      orderedJoueurs() {
         return _.orderBy(this.joueurs, 'score', 'desc');
      }
   },

   methods: {
      traiterReponse(code, msg, _data) {
         if(this.type === '') {
            if (this.messageJoueursCo(code, msg));
            else if (this.messageJoueurCoDeco(code, msg));
            else
               return false;
            return true;
         }
      },

      messageJoueursCo(code, msg) {
         if (code === "CxJ") {
            this.joueurs = [];
            if (msg.length < 3) return true; // Cas où aucun pseudo n'est listé.
            const joueurs = msg[2].slice(1).split(";");
            let info;
            let i = 0;
            const sz = joueurs.length;
            for (; i < sz; i++) {
                  info = joueurs[i].split(",");
                  info[1] = (info[1] === "0" ? false : true);
                  // addJoueur(nom, estSurForum)
                  this.addJoueur(info[0], info[1]);
            }
            return true;
         } else if (code === "CxVF") {
            let pseudo = msg[1];
            for (let i = this.joueurs.length - 1; i >= 0; --i) {
               if (this.joueurs[i]["nom"] === pseudo) {
                  this.$set(this.joueurs[i], "estSurForum", (msg.length === 2));
                  break;
               }
            }
         }
         return false;
      },

      messageJoueurCoDeco(code, msg) {
         if (code === "CxO")
            this.addJoueur(msg[1], false);
         else if (code === "CxX")
            this.removeJoueur(msg[1]);
         else if (code === "CxR") {
            this.removeJoueur(msg[1]);
            return false;
         }
         else
            return false;
         return true;
      },

      addJoueur(nom, estSurForum, score, autre) {
         if(!score) {
            score = 0;
         }

         if(!autre) {
            autre = 0;
         }

         this.joueurs.push({"nom": nom, "estSurForum": estSurForum, "score": score, "autre": autre});
      },

      removeJoueur(nom) {
         this.joueurs = this.joueurs.filter(function(item) {
            return item.nom !== nom
         });
      },

      ouvrirMenu(event, nomCible) {
         console.log(event);
         const self = Global.$etat.joueur;
         const cmd = Global.$etat.instanceChat.simulerCmd;
         const cibleEstPseudo = nomCible.substring(0, 1) === "*";
         let options = [];

         if (self.estInvite()) {
            if (!cibleEstPseudo) {
               options.push(["Profil de " + nomCible, function() { cmd("profil " + nomCible); }]);
               options.push(["Ignorer/Ne plus ignorer " + nomCible, function() { cmd("ignore " + nomCible); }]);
            }
            options.push(["Statistiques de " + nomCible, function() { cmd("stat " + nomCible); }]);
            this.$refs.menu.ouvrir(event, options);
            return;
         }

         if (self.getPseudo() !== nomCible) {
            options.push(["Chuchoter à " + nomCible, function() { Global.$etat.instanceChat.addCanalEtSelectionne(new Cnl.Canal(nomCible, Cnl.N_CANAL_CHUCHOTER, nomCible)); }]);
            if (!cibleEstPseudo) {
               options.push(["Ajouter " + nomCible + " à la liste d'amis", function() { cmd("ami " + nomCible); }]);

               // Todo :
               //
               // if (RECRUTEUR || LEADER) {
               //    options.push(["Accepter " + nomCible + " dans la team", "inviter", nomCible]);
               // }

               options.push(["Ignorer/Ne plus ignorer " + nomCible, function() { cmd("ignore " + nomCible); }]);
            }
            options.push(["Voter le banissement de " + nomCible, function() { cmd("bannir " + nomCible); }]);
            if (self.estModoJeu()) {
               options.push(["Infos sur " + nomCible, function() { alert("cmd Infos sur " + nomCible); }]);
               options.push(["Historique de " + nomCible, function() { alert("cmd Historique de " + nomCible); }]);
            }
            // Todo :
            //
            // if (ARBITREPLUS) {
            //    options.push(["Historique de " + nomCible, function() { alert("cmd Historique de " + nomCible); }]);
            // }
         }

         if (!cibleEstPseudo) {
            options.push(["Profil de " + nomCible, function() { cmd("profil " + nomCible); }]);
         }

         // Todo :
         //
         // if ((MODO || ARBITRE || VISION) && !FILMEUR) {
         //    options.push(["Ping de " + nomCible, function() { cmd("ping " + nomCible); }]);
         // }
         // if (MODO || ARBITRE || VISION) {
         //    if (_Forteresse.visible) {
         //       options.push(["Vision de " + nomCible, function() { alert("cmd Vision de " + nomCible); }]);
         //    }
         // }

         if (!cibleEstPseudo) {
            options.push(["Statistiques de " + nomCible, function() { cmd("stat " + nomCible); }]);
         }

         this.$refs.menu.ouvrir(event, options);
      },

      setDonnees(pseudo, libelle, valeur) {
         for(let i = 0; i < this.joueurs.length; ++i) {
            if(this.joueurs[i].nom === pseudo) {
               this.joueurs[i][libelle] = valeur;
               break;
            }
         }
      },

      entrerDansPartie(type) {
         this.type = type;
         this.joueurs = [];
      }
   }
}
</script>
