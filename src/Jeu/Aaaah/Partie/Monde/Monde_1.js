import MondeAbstrait from "./MondeAbstrait.js";
import * as SM from "../../AaaahSpritesManager.js";

export default class Monde_1 extends MondeAbstrait {
    constructor(jeu) {
        super(jeu);

        this.M1 = SM.AaaahSpritesManager.getSprite(SM.Sprites.Monde1_M1);
        this.M1.x = 252;
        this.M1.y = 244;
        this.M1.pivot.x = this.M1.width/2;
        this.M1.pivot.y = this.M1.height/2;
        this.ajouterTexture(this.M1);

        this.M2 = SM.AaaahSpritesManager.getSprite(SM.Sprites.Monde1_M1);
        this.M2.x = 612;
        this.M2.y = 167;
        this.M2.pivot.x = this.M2.width/2;
        this.M2.pivot.y = this.M2.height/2;
        this.M2.scale.set(0.923, 1.3);
        this.ajouterTexture(this.M2);
    }

    tic(tempsRel) {
        this.M1.angle = -tempsRel/500;
        this.M2.angle = -tempsRel/500;
    }
}