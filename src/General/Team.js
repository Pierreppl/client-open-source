const TEAM_INEXISTANTE = 0;

class Team {
  constructor(id) {
    this.id = id;
    this.fusion = false;
  }

  setId(id) {
    this.id = id;
  }

  /**
   * @returns {int}
   */
  getID() {
    return this.id;
  }

  /**
   * @returns {Boolean}
   */
  existe() {
    return this.id !== TEAM_INEXISTANTE;
  }

  /**
   * @returns {Boolean}
   */
  enFusion() {
    return this.fusion;
  }

  rejoindreFusion() {
    this.fusion = true;
  }
}

export {TEAM_INEXISTANTE, Team};
