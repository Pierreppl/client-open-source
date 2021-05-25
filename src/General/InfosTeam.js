import * as Team from "./Team.js"

export default class InfosTeam {
  constructor() {
    this.team = new Team.Team(Team.TEAM_INEXISTANTE);
    this.role = 0;
  }

  setIdEtRole(idTeam, role) {
    this.team.setId(idTeam);
    this.role = role;
  }

  getIDTeam() {
    return this.team.getID();
  }

  aUneTeam() {
    return this.team.existe();
  }

  teamEnFusion() {
    return this.team.enFusion();
  }

  rejoindreFusion() {
    this.team.rejoindreFusion();
  }
}
