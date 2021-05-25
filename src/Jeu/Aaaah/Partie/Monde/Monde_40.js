import MondeAbstrait from "./MondeAbstrait.js";

export default class Monde_40 extends MondeAbstrait {
    constructor(jeu) {
        super(jeu);
    }

    tic(tempsRel) {
        if(tempsRel > 5000) {
            this.aaaah.getPartie().getGuidage().decallerX(0.9);
        }
    }
}