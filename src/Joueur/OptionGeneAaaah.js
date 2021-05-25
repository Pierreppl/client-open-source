import Global from "../Global.js";

export default class OptionGeneAaaah {
  constructor(sonGuide, votesMaps) {
    this.sonGuide = sonGuide;
    this.votesMaps = votesMaps;
  }

  sonGuideOn() {
    return this.sonGuide;
  }

  setSonGuide(b) {
    this.sonGuide = b;
    Global.$config.reseau.Envoie("CxOG#"+ (b ? 1 : 0));
  }

  votesMapsOn() {
    return this.votesMaps;
  }

  setVotesMaps(b) {
    this.votesMaps = b;
    Global.$config.reseau.Envoie("CxOV#"+ (b ? 1 : 0));
  }
}
