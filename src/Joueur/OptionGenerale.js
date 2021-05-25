import OptionGeneAaaah from "./OptionGeneAaaah";
import OptionGeneForto from "./OptionGeneForto";

import * as Forto from "../Forteresse/Forteresse.js";
import Global from "../Global.js";

const OPT_RECELO_VOIR_TOUT = 0;
const OPT_RECELO_CACHER_PERSO = 1;
const OPT_RECELO_VOIR_RIEN = 2;

class OptionGenerale {
  // ("Old Sprite" option suppr)
  // TODO: forcer tir continu
  constructor(persoForto=0, sonActif=true, sonGuide=true, coDecoVisibles=true, coDecoAmis=true
              , bullesMsg=true, triForto=Forto.TRI_FRIG, degradAff=false, votesMapsAaaah=true
              , CPVisible=true, statsOff=false, messagerieOff=false, recEloVisibles=true) {

    this.optAaaah = new OptionGeneAaaah(sonGuide, votesMapsAaaah);
    this.optForto = new OptionGeneForto(persoForto, triForto);

    this.sonActif = sonActif;
    this.coDecoVisible = coDecoVisibles;
    this.coDecoAmis = coDecoAmis;
    this.bullesMsg = bullesMsg;
    this.degradAff = degradAff; // TODO: Suppr ?
    this.CPVisible = CPVisible;
    this.statsOff = statsOff;
    this.messagerieOff = messagerieOff;
    this.recEloVisibles = recEloVisibles;
  }

  sonOn() {
    return this.sonActif;
  }

  setSon(b) {
    this.sonActif = b;
    Global.$config.reseau.Envoie("CxOS#" + (b ? 1 : 0));
  }

  connexionsSalonVisibles() {
    return this.coDecoVisible;
  }

  setCoSalonVisibles(b) {
    this.coDecoVisible = b;
    Global.$config.reseau.Envoie("CxOC#" + (b ? 1 : 0));
  }

  connexionsAmisVisibles() {
    return this.coDecoAmis;
  }

  setCoAmisVisibles(b) {
    this.coDecoAmis = b;
    Global.$config.reseau.Envoie("CxOA#" + (b ? 1 : 0));
  }

  bullesMsgVisibles() {
    return this.bullesMsg;
  }

  setBullesMsgVisibles(b) {
    this.bullesMsg = b;
    Global.$config.reseau.Envoie("CxOM#" + (b ? 1 : 0));
  }

  chatPrincipalOn() {
    return this.CPVisible;
  }

  setChatPrincipal(b) {
    this.bullesMsg = b;
    Global.$config.reseau.Envoie("CxONC#" + (b ? 1 : 0));
  }

  statsActives() {
    return !this.statsOff;
  }

  setStatsActives(b) {
    this.statsOff = !b;
    Global.$config.reseau.Envoie("CxONS#" + (!b ? 1 : 0));
  }

  messagerieActive() {
    return this.messagerieOff;
  }

  setMessagerieActive(b) {
    this.messagerieOff = b;
    Global.$config.reseau.Envoie("CxONMP#" + (b ? 1 : 0));
  }

  voitRecompElo() {
    return this.recEloVisibles;
  }

  setRecompElo(v) {
    this.recEloVisibles = v;
    Global.$config.reseau.Envoie("CxORE#" + v);
  }

  setVotesMaps(b) {
    this.optAaaah.setVotesMaps(b);
  }

  setSonGuide(b) {
    this.optAaaah.setVotesMaps(b);
  }

  setPersonnage(v) {
    this.optForto.setPersonnage(v);
  }

  setOrdreTris(b) {
    this.optForto.setOrdreTris(b);
  }

  getPersonnage() {
    return this.optForto.getPersonnage();
  }
}

export { OPT_RECELO_VOIR_TOUT, OPT_RECELO_CACHER_PERSO, OPT_RECELO_VOIR_RIEN,

         OptionGenerale };
