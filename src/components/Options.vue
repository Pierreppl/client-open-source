<style>
.containerOption {
  display: flex;
  flex-direction: row;
  border: 2px solid #787878;
  border-radius: 3px;
  width: 400px;
  height: 450px;
  margin: auto auto;
  background-color: #303036;
  overflow-y: auto;
  padding: 10px 0;
}

.nomOption {
  font-size: 16px;
  border: 2px solid #000000;
  border-radius: 0px 10px 10px 0px;
  cursor: pointer;
  background-color: #212127;
  margin-top: 8px;
  margin-bottom: 8px;
  padding: 5px;

  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.nomOption:hover {
  background-color: #33333C;
}

.nomOptions-container {
  padding-right: 5px;
  margin-right: 10px;
}

.drapLangueOption {
  margin-right: 15px;
  margin-left: 15px;

  border: 1px solid #000000;
  cursor: pointer;

  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  vertical-align: middle;
}

.drapLangueOption:hover {
  box-shadow: 0 0 5px #029489;
}

.drapLangueEnCoursOption {
  margin-right: 15px;
  margin-left: 15px;
  border: 1px solid #339966;
  cursor: pointer;

  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  vertical-align: middle;
}

.boutonOption {
  color: #BCC2D9;
  font-size: 15px;
  text-decoration: none;
  cursor: pointer;
  padding-right: 10px;

  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.boutonOption:hover {
  text-shadow: 0 0 2px #029489;
}

.detailOptions {
  padding-right: 4px;
}

.dadOpt {
  cursor: default;
}

.persoFortoOption {
  cursor: pointer;
  margin-top: auto;
  margin-bottom: auto;
  padding-left: 5px;
  padding-right: 5px;
}

</style>

<template>
   <!--<div v-if="!optionsVisibles" v-on:click="menuOptionsVisible" title="Options" style="cursor: pointer;">&#9881;</div>
-->
   <div v-if="optionsVisibles" class="containerOption">
      <div class="nomOptions-container">
         <div class="nomOption" @click="afficherOption('g')">Général</div>
         <div class="nomOption" @click="afficherOption('f')">Forteresse</div>
         <div class="nomOption" @click="afficherOption('a')">Aaaah!</div>
         <div class="nomOption" @click="afficherOption('ctrl')">Contrôles</div>
         <div class="nomOption" @click="afficherOption('chat')">Chat</div>
      </div>

      <div class="detailOptions">
        <br />
        <!-- Options Générales -->
        <div v-if="option === 'g'">
           <div>Langue : <img ref="drapFR" src="../I/Drapeaux/fr.png" @click="choixLangue('fr')" alt="FR" width="16" height="13" class="drapLangueEnCoursOption" />
                         <img ref="drapEN" src="../I/Drapeaux/en.png" @click="choixLangue('en')" alt="EN" width="16" height="13" class="drapLangueOption" />
           </div><br />

           <input ref="affCoDeco" type="checkbox" name="affCoDeco" :checked="$etat.joueur.optGene.connexionsSalonVisibles()" />
           <label for="affCoDeco">{{ $config.txt.OPT_CODECO[$config.lang] }}</label><br /><br />

           <input ref="affCoDecoAmis" type="checkbox" name="affCoDecoAmis" :checked="$etat.joueur.optGene.connexionsAmisVisibles()" />
           <label for="affCoDecoAmis">{{ $config.txt.OPT_CODECOAMIS[$config.lang] }}</label><br /><br />

           <input ref="bullesMsg" type="checkbox" name="bullesMsg" :checked="$etat.joueur.optGene.bullesMsgVisibles()" />
           <label for="bullesMsg">{{ $config.txt.OPT_MSGJOUEUR[$config.lang] }}</label><br /><br />

           <input ref="activStat" type="checkbox" name="activStat" :checked="$etat.joueur.optGene.statsActives()" />
           <label for="activStat">{{ $config.txt.OPT_STAT[$config.lang] }}</label><br /><br />

           <input ref="activMessagerie" type="checkbox" name="activMessagerie" :checked="$etat.joueur.optGene.messagerieActive()" />
           <label for="activMessagerie">{{ $config.txt.OPT_MP[$config.lang] }}</label><br /><br />

           <form action="" ref="affRecmplElo">
              <input type="radio" name="rcmpelo" value="voirAll">Voir les récompenses des parties classées<br>
              <input type="radio" name="rcmpelo" value="masqPerso">Masquer ses récompenses<br>
              <input type="radio" name="rcmpelo" value="masqAll">Masquer toutes les récompenses
           </form>

       </div>

        <!-- Options Forteresse -->
        <div v-if="option === 'f'">
           <div>
              <p>Choix du personnage par défaut :</p>

              <div style="height: 42px; display: flex; flex-direction: row; align-items: center;">

              <div>

              <img :src="getImg('cosmo', persoForto === 1, 'gif')" alt="Choix Cosmonaute" @click="choixPersoForto(1)" class="persoForto" />
              <img :src="getImg('blonde', persoForto === 0, 'gif')" alt="Choix Blonde" @click="choixPersoForto(0)" class="persoForto" />
              <img :src="getImg('fio', persoForto === 2, 'gif')" alt="Choix Fio" @click="choixPersoForto(2)" class="persoForto" />
              <img :src="getImg('marco', persoForto === 3, 'gif')" alt="Choix Marco" @click="choixPersoForto(3)" class="persoForto" />
              <img :src="getImg('jack', persoForto === 4, 'gif')" alt="Choix Jack" @click="choixPersoForto(4)" class="persoForto" />
              </div>
            </div>
           </div>


           <input ref="triFrag" type="checkbox" name="triFrag" :checked="$etat.joueur.optGene.optForto.getOrdreTri()" />
           <label for="triFrag">{{ $config.txt.OPTF_TRI[$config.lang] }}</label><br /><br />

           <input ref="voirJack" type="checkbox" name="voirJack" :checked="false" />
           <label for="voirJack">{{ $config.txt.OPTF_JACK[$config.lang] }}</label>
        </div>

        <!-- Options Aaaah! -->
        <div v-if="option === 'a'">
           <input ref="voirVotes" type="checkbox" name="voirVotes" :checked="$etat.joueur.optGene.optAaaah.votesMapsOn()" />
           <label for="voirVotes">{{ $config.txt.OPTA_VOTE[$config.lang] }}</label><br /><br />

           <input ref="sonGuide" type="checkbox" name="sonGuide" :checked="$etat.joueur.optGene.optAaaah.sonGuideOn()" />
           <label for="sonGuide">{{ $config.txt.OPTA_SON[$config.lang] }}</label>
        </div>

        <!-- Options Contrôles -->
        <div v-if="option === 'ctrl'">
           Aucune option possible pour le moment.
        </div>

        <!-- Options Chat -->
        <div v-if="option === 'chat'">
           <input ref="sonChucho" type="checkbox" name="sonChucho" :checked="$etat.joueur.optGene.sonOn()" />
           <label for="sonChucho">{{ $config.txt.OPT_SONCHUCHO[$config.lang] }}</label><br /><br />

           <input ref="masquerCP" type="checkbox" name="masquerCP" :checked="$etat.joueur.optGene.chatPrincipalOn()" />
           <label for="masquerCP">{{ $config.txt.OPT_CP[$config.lang] }}</label><br /><br />

           <input ref="desacCorrOrthoChat" type="checkbox" name="desacCorrOrthoChat" />
           <label for="desacCorrOrthoChat">{{ $config.txt.OPT_CORR_ORTHO_CHAT[$config.lang] }}</label>
        </div>

        <br /><br />
        <div style="border-top: 3px solid #212127; padding-top: 7px">
          <span class="boutonOption" style="bottom: 10px; float: left" @click="enregistrer">Enregistrer</span>
          <span class="boutonOption" style="bottom: 10px; float: right" @click="annuler">Annuler&nbsp;</span>
        </div>
      </div>
   </div>
</template>

<script>

import * as OptGene from "../Joueur/OptionGenerale.js";

export default {
  name: "Options",

  data() {
    return { optionsVisibles: false,
             option: 'g',
             sonGuide: this.$etat.joueur.optGene.sonOn(),
             persoForto: this.$etat.joueur.optGene.getPersonnage()
           };
  },

  created() {
    this.$root.$on("afficher-fenetre-options", (v) => {
       this.optionsVisibles = v;
     });
  },

  mounted() {
     this.persoForto = this.$etat.joueur.optGene.getPersonnage();
     console.log(this.persoForto, typeof this.persoForto);
  },

  methods: {
    afficherOption(opt) {
      this.option = opt;

      if (opt === 'g') {
         this.choixLangue(this.$config.lang);
      }
    },

    getImg(nom, selectionnee, extension) {
      return require("../I/Opt/" + nom + (selectionnee ? "_s." : ".") + extension);
    },

    choixLangue(langue) {
      console.log("Choix langue : " + langue);
      if ((langue === "fr" || langue === this.$config.txt.LANGUE_FR) && this.$config.lang !== this.$config.txt.LANGUE_FR) {
         this.resetDrapeaux();

         this.$config.lang = this.$config.txt.LANGUE_FR;
         this.$refs.drapFR.className = "drapLangueEnCoursOption";
      } else if ((langue === "en" || langue === this.$config.txt.LANGUE_EN) && this.$config.lang !== this.$config.txt.LANGUE_EN) {
         this.resetDrapeaux();

         this.$config.lang = this.$config.txt.LANGUE_EN;
         this.$refs.drapEN.className = "drapLangueEnCoursOption";
      }
    },

    resetDrapeaux() {
      this.$refs.drapFR.className = "drapLangueOption";
      this.$refs.drapEN.className = "drapLangueOption";
    },

    choixPersoForto(perso) {
      this.persoForto = perso;
    },

    enregistrer() {
      this.optionsVisibles = false;
      const opt = this.$etat.joueur.optGene;

      switch (this.option) {
         case "g":
            opt.setCoSalonVisibles(this.$refs.affCoDeco.checked);
            opt.setCoAmisVisibles(this.$refs.affCoDecoAmis.checked);
            opt.setBullesMsgVisibles(this.$refs.affCoDecoAmis.checked);
            opt.setStatsActives(this.$refs.activStat.checked);
            opt.setMessagerieActive(this.$refs.activMessagerie.checked);

            switch (this.$refs.affRcmpElo) {
               case "voirAll":
                  opt.setRecompElo(OptGene.OPT_RECELO_VOIR_TOUT);
                  break;
               case "masqPerso":
                  opt.setRecompElo(OptGene.OPT_RECELO_CACHER_PERSO);
                  break;
               case "masqAll":
                  opt.setRecompElo(OptGene.OPT_RECELO_VOIR_RIEN);
                  break;
            }
            break;
         case "f":
            //this.$refs.voirJack.checked
            opt.setPersonnage(this.persoForto);
            opt.setOrdreTris(this.$refs.triFrag.checked);
            break;
         case "a":
            opt.setVotesMaps(this.$refs.voirVotes.checked);
            opt.setSonGuide(this.$refs.sonGuide.checked);
            break;
         case "ctrl":
            break;
         case "chat":
            opt.setChatPrincipal(this.$refs.masquerCP.checked);
            opt.setSon(this.$refs.sonChucho.checked);
            //this.$refs.desacCorrOrthoChat.checked
            break;
      }
    },

    annuler() {
      this.optionsVisibles = false;
    }
  }
}

</script>
