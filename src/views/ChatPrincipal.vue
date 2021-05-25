<style>

.CP {
  width: 800px;

  display: flex;
  flex-direction: column;
}

.MenusParties {
  /* ... */
  display: flex;
  flex-direction: row;
}

#Options {
  position: absolute;
  top: 0px;
  right: 0px;

  cursor: pointer;
}

#chat-container2 {
  position: absolute;
  bottom: 0px;
  left: -18px;
  padding: 0px;
}

.menuHaut {
  right: 5px;
  top: 2px;
  position: absolute;
  user-select: none;
  display: flex;
  flex-direction: row;
}

.iconeMenuHaut {
  cursor: pointer;
  margin-left: 5px;
  margin-right: 5px;
}

</style>

<template>
  <!--
    Forme générale :

    |--------------------|
    |                    |
    |         (1)        |
    |                    |
    |                    |
    |--------------------|
    |                    |
    |         (2)        |
    |--------------------|

    (1) : Liste des parties + création parties
    (2) : Chat + liste joueurs co + accès rapides
  -->
  <div>
  <div id="game-container">
     <div class="menuHaut">
        <img src="../I/miniForum.gif" alt="Afficher le forum" @click="$etat.instanceChat.simulerCmd('forum')" class="iconeMenuHaut" width="14" height="14" />
        <MessagerieIcone class="iconeMenuHaut" v-if="!$etat.joueur.estInvite()"></MessagerieIcone>
        <OptionsIcone></OptionsIcone>
     </div>

     <ListeParties></ListeParties>

     <div class="CP">
        <div class="MenusParties">
           <!--<div>Liste parties en cours...</div>
           <div>Options création partie...</div>-->
        </div>

        <div class="MenusGeneraux" style="padding: 0px;">
           <div id="chat-container2" ref="instanceChat"></div> <!-- Chat -->
           <ListeJoueurs ref="listeJoueurs"></ListeJoueurs>
           <!-- qq menus d'accès rapide -->
        </div>
     </div>
  </div>
</div>
</template>

<script>

import Chat from "../General/Chat.vue";
import ListeJoueurs from "../components/ListeJoueurs.vue";
import OptionsIcone from "../components/OptionsIcone.vue";
import MessagerieIcone from "../components/MessagerieIcone.vue";
import ListeParties from "../components/ListeParties.vue";
import Global from "../Global.js";

export default {
  name: "ChatPrincipal",

  components: {
    "Chat": Chat,
    "ListeJoueurs": ListeJoueurs,
    "OptionsIcone": OptionsIcone,
    "MessagerieIcone": MessagerieIcone,
    "ListeParties": ListeParties
  },

  mounted() {
    // Instancier le chat
    this.$etat.instanceChat.userConnected = true;
    this.$etat.instanceChat.$mount();
    this.$refs.instanceChat.appendChild(this.$etat.instanceChat.$el);

    Global.$etat.instanceListeJoueur = this.$refs.listeJoueurs;
  },

  created() {
    this.$config.reseau.Envoie("CxJ#0");
  },

  methods: {
    afficherOptions() {
      this.$refs.options.afficher();
    }
  }
}

</script>
