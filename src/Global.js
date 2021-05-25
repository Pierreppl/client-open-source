import Trad from "./utils/Traduction.js";
import * as Evenement from "./General/Event.js";

const GLOBAL = {
  $config: {
    local: false,
    ipLocale: '127.0.0.1:4444',
    ipOnline: '90.0.0.0:4444',
    ssl: false,
    versionMajeure: "1.X",
    versionMineure: "a",
    reseau: null,
    lang: Trad.txt.LANGUE_FR,
    txt: Trad.txt
  },

  $etat: {
    joueur: null,
    jeu: null,
    bouboum: null,
    instanceChat: null,
    instanceListeJoueur: null,
    evenement: new Evenement.Evenement(),
    forum: null,
    mode: "?"
  },

  vue: {
    $root: null
  },

  AVATAR_PAR_DEFAUT: "http://img.atelier801.com/6524f115.jpg"
};

export default GLOBAL;
