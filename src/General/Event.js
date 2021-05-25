class Evenement {
  consturctor() {
    this.halloween = false;
    this.noel = false;
    this.nouvAn = false;
    this.carnaval = false;
    this.paques = false;
    this.avril = false;
    this.stVal = false;
    this.saturnaaaahles = false;
  }

  noev() {
    return (this.halloween && this.noel && this.nouvAn && this.carnaval && this.paques
         && this.avril && this.stVal && this.saturnaaaahles);
  }
}

export { Evenement };
