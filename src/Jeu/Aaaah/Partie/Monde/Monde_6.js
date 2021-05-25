import MondeAbstrait from "./MondeAbstrait.js";
import * as SM from "../../AaaahSpritesManager.js";

export default class Monde_6 extends MondeAbstrait {
    constructor(jeu) {
        super(jeu);

        this.monde = SM.AaaahSpritesManager.getSprite(SM.Sprites.Monde6);
        this.monde.x = -24;
        this.monde.y = 56.4;
        this.ajouterTexture(this.monde);

        this.M1 = SM.AaaahSpritesManager.getSprite(SM.Sprites.Monde6_M1);
        this.M1.x = 289.55;
        this.M1.y = 240.95;
        this.M1.pivot.x = this.M1.width/2;
        this.M1.pivot.y = this.M1.height/2;
        this.ajouterTexture(this.M1);

        this.M2 = SM.AaaahSpritesManager.getSprite(SM.Sprites.Monde6_M2);
        this.M2.x = 527.65;
        this.M2.y = 131.6;
        this.M2.pivot.x = this.M2.width/2;
        this.M2.pivot.y = this.M2.height/2;
        this.ajouterTexture(this.M2);
    }

    tic(tempsRel) {
        this.M1.angle = tempsRel/500;
        this.M2.angle = -tempsRel/500;
    }
}