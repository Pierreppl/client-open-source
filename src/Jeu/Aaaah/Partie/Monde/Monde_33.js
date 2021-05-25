import MondeAbstrait from "./MondeAbstrait.js";

export default class Monde_33 extends MondeAbstrait {
    constructor(jeu) {
        super(jeu);
    }

    tic(tempsRel) {
        if(tempsRel > 5000) {
            this.aaaah.getPartie().getGuidage().decallerY(0.45);
        }
    }
}