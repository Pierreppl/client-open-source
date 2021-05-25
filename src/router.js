import Vue from "vue";
import Router from "vue-router";

import Global from "./Global.js";

Vue.use(Router);

const metas = [ { name: "author", content: "Tigrounette" },
                { name: "description", content: "Jeux web multijoueurs entièrement gratuits : Aaaah!, Bouboum et Forteresse." },
                { name: "keywords", content: "extinction, aaaah, bouboum, forteresse, jeu, gratuit, multijoueur, transformice" }
              ];

let routeur = new Router({
  routes: [
    {path: "/login", name: "login", component: view("Connexion"), meta: {isLogging: true, metaTags: metas, title: "Extinction - Connexion"}},
    {path: "/guest", name: "guest", component: view("Connexion"), meta: {isLogging: true, metaTags: metas, title: "Extinction - Invité"}},
    {path: "/register", name: "register", component: view("Connexion"), meta: {isLogging: true, metaTags: metas, title: "Extinction - Inscription"}},

    {path: "/jeu", name: "jeu", component: view("Jeu"), meta: {metaTags: metas, title: "Extinction"}},
    {path: "/forum", name: "forum", component: view("ForumAccesDirect"), meta: {isLogging: true, metaTags: metas, title: "Extinction"}}
  ]
});

routeur.beforeEach((to, from, next) => {
   if (to.path === "/forum" || to.path.substr(0, 7) === "/forum/") {
      if (Global.$etat.mode === "?") {
         Global.$etat.mode = "forum";
         next();
      }
   } else {
      next();
   }
});

function view(name) {
  return () => import("./views/" + name + ".vue");
}

export default routeur;
