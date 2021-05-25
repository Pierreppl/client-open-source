/* eslint-disable */

import Vue from "vue"
import App from "./App.vue"
import router from "./router.js"
import SHA256 from "./utils/SHA256.js";
import Trad from "./utils/Traduction.js";
import Joueur from "./Joueur/Joueur.js";
import Reseau from "./General/Reseau.vue";
import Chat from "./General/Chat.vue";

require("./assets/css/style.css");
require("./assets/js/lodash.min.js");
require("./assets/js/all.min.js");

Vue.config.productionTip = false;

import Global from "./Global.js";

Vue.prototype.$config = Global.$config;

Vue.prototype.$etat = Global.$etat;

Vue.prototype.$etat.joueur = new Joueur();

const ChatClass = Vue.extend(Chat);
Vue.prototype.$etat.instanceChat = new ChatClass({
  propsData: {
    userConnected: false,
    reseau: null
  }
});


Vue.prototype.$SHA256 = SHA256.sha256;

Vue.component("Reseau", Reseau);

Vue.prototype.makeAlert = function(className, message) {
  const vm = this;

  vm.$root.$children[0].alert.message = null;
  vm.$root.$children[0].alert.className = className;

  setTimeout(function () {
    vm.$root.$children[0].alert.message = message;
    setTimeout(function() {
      vm.$root.$children[0].alert.message = null;
    }, 2000);
  }, 10)
};

const tagsAdded = []; // Liste de tous les meta présents dans la page, afin d'éviter les doublons
router.beforeEach(function(to, from, next) {
   if (to.meta.title)
      document.title = to.meta.title;

   if (to.meta.metaTags) {
      to.meta.metaTags.forEach(function(tag) {
         if (tagsAdded.indexOf(tag.name) === -1) {
            const tagHTML = document.createElement("meta");
            tagHTML.setAttribute(tag.name, tag.content);
            document.head.appendChild(tagHTML);
            tagsAdded.push(tag.name);
         }
      });
   }

   next();
});

window.app = new Vue({
  router,
  render: h => h(App),
   data() {
     return {
        tooltip: null,
     }
   }
}).$mount("#app");

Global.vue.$root = window.app.$root;
