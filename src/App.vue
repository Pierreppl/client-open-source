<template>
  <div id="app" class="mt-4">
    <div id="alertBox" class="alert" :class="'alert-'+alert.className" v-if="alert.message">{{alert.message}}</div>
    <Reseau :userConnected="userConnected" v-on:updateUserConnected="updateUserConnected" :traduire="traduire"></Reseau>
  </div>
</template>

<style>
  #alertBox {
    position: absolute;
    top: 15px;
    right: 10px;
    background: #1E1E24;
    color: #ffffff;
    padding: 10px;
    font-family: Verdana;
  }

  #alertBox.alert-error {
    color: #fd6a6a;
  }

  #alertBox.alert-success {
    color: #009D9D;
  }

  html {
    height: 100%
  }

  body {
    height: 100%;
    margin: 0;
    background: #2a2e43; /* Old browsers */
    background: -moz-linear-gradient(top, #2a2e43 0%, #454f63 100%); /* FF3.6-15 */
    background: -webkit-linear-gradient(top, #2a2e43 0%,#454f63 100%); /* Chrome10-25,Safari5.1-6 */
    background: linear-gradient(to bottom, #2a2e43 0%,#454f63 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#2a2e43', endColorstr='#454f63',GradientType=0 ); /* IE6-9 */
    background-attachment: fixed;
    background-repeat: no-repeat;
  }
</style>

<script>
  import Trad from './utils/Traduction.js';
  import Global from "./Global.js";

  const txt = Trad.txt;
  export default {
    data() {
      return {
        userConnected: null,
        alert: {
          message: null,
          className: null
        },
        lang: Trad.txt.LANGUE_FR
      }
    },
    watch: {
      $route() {
        console.log("$route watch path: " + this.$route.path);
        if (!this.userConnected && (this.$route.path === "/forum" || this.$route.path.substr(0, 7) === "/forum/"))
           return;
        else if (!this.userConnected && !this.$route.meta.isLogging)
           this.$router.push("/login");
      }
    },

    mounted() {
      const route = this.getInitialRoute();
      if (!this.userConnected && (route === "/forum" || route.substr(0, 7) === "/forum/"))
         return;
      else if (!this.userConnected)
         this.$router.push("/login");
    },

    methods: {
      updateUserConnected(user) {
        this.userConnected = user;
      },

      traduire(cle) {
        return txt[cle][this.lang];
      },

      afficherForum(v) {
        this.forumVisible = v;
      },

      getInitialRoute() {
         const i = document.URL.indexOf("#");
         return (i === -1 ? "/" : document.URL.slice(i + 1));
      }
    }
  }
</script>
