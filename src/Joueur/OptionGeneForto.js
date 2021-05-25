import Global from "../Global.js";

export default class OptionGeneForto {
  constructor(personnage, ordreTri) {
    this.personnage = personnage;
    this.ordreTri = ordreTri;
  }

  getPersonnage() {
    return this.personnage;
  }

  getOrdreTri() {
    return this.ordreTri;
  }

  setPersonnage(v) {
    this.personnage = v;
    Global.$config.reseau.Envoie("CxSF#" + v);
  }

  setOrdreTris(b) {
    this.ordreTri = b;
    Global.$config.reseau.Envoie("CxOF#" + (b ? 1 : 0));
  }
}
