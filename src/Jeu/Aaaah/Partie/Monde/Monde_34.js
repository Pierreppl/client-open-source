import MondeAbstrait from "./MondeAbstrait.js";
import * as SM from "../../AaaahSpritesManager.js";

export default class Monde_34 extends MondeAbstrait {
    constructor(jeu) {
        super(jeu);

        this.monde = SM.AaaahSpritesManager.getSprite(SM.Sprites.Monde34);
        this.monde.x = 297;
        this.monde.y = 125;
        this.ajouterTexture(this.monde);
    }

    tic(tempsRel) {
        if(tempsRel > 5000) {
            this.aaaah.getPartie().getGuidage().decallerX(0.64);
            this.aaaah.getPartie().getGuidage().decallerY(0.3);
        }
    }
}