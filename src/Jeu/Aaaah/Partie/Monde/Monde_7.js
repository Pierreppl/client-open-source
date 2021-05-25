import MondeAbstrait from "./MondeAbstrait.js";
import * as SM from "../../AaaahSpritesManager.js";

export default class Monde_7 extends MondeAbstrait {
    constructor(jeu) {
        super(jeu);

        this.M1 = SM.AaaahSpritesManager.getSprite(SM.Sprites.Monde7_M1);
        this.M1.x = 397.4;
        this.M1.y = 173.6;
        this.M1.pivot.x = this.M1.width/2;
        this.M1.pivot.y = this.M1.height/2;
        this.ajouterTexture(this.M1);

        this.monde = SM.AaaahSpritesManager.getSprite(SM.Sprites.Monde7);
        this.monde.x = -106.95;
        this.monde.y = -28;
        this.ajouterTexture(this.monde);
    }

    tic(tempsRel) {
        this.M1.angle = tempsRel/500;
    }
}