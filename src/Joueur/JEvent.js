class JEvent {
  constructor() {
    // Saturnaaaahles
    this.lsMuteSaturnaaahles = [];
    this.lsKickSaturnaaahles = [];
    this.lsBanSaturnaaahles = [];
  }

  /**
   * Indique si <pseudo> a été banni ou kick par le joueur
   * pour les Saturnaaaahles.
   *
   * @param {String} pseudo
   *
   * @return {Boolean} : true = a été banni/kick ; false sinon
   */
  estBanKickSaturnaaaahles(pseudo) {
    return this.lsKickSaturnaaahles.indexOf(pseudo) || this.lsBanSaturnaaahles.indexOf(pseudo);
  }

  /**
   * Indique si <pseudo> a été mute par le joueur pour les
   * Saturnaaaahles.
   *
   * @param {String} pseudo
   *
   * @return {Boolean} : true = a été mute ; false sinon
   */
  estMuteSaturnaaaahles(pseudo) {
    return this.lsMuteSaturnaaahles.indexOf(pseudo);
  }
}

export default JEvent;
