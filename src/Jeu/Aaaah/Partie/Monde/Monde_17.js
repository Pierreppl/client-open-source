import MondeAbstrait from "./MondeAbstrait.js";
import * as SM from "../../AaaahSpritesManager.js";

export default class Monde_17 extends MondeAbstrait {
    constructor(jeu) {
        super(jeu);

        this.monde = SM.AaaahSpritesManager.getSprite(SM.Sprites.Monde17);
        this.monde.x = -22;
        this.monde.y = -34;
        this.ajouterTexture(this.monde);

        this.M1 = SM.AaaahSpritesManager.getSprite(SM.Sprites.Monde17_M1);
        this.M1.x = 407.25;
        this.M1.y = 187.3;
        this.M1.pivot.x = this.M1.width/2;
        this.M1.pivot.y = this.M1.height/2;
        this.ajouterTexture(this.M1);

        this.M2 = SM.AaaahSpritesManager.getSprite(SM.Sprites.Monde17_M1);
        this.M2.x = 406.6;
        this.M2.y = 189.8;
        this.M2.pivot.x = this.M2.width/2;
        this.M2.pivot.y = this.M2.height/2;
        this.M2.scale.set(0.537, 0.537);
        this.ajouterTexture(this.M2);
    }

    tic(tempsRel) {
        this.M1.angle = tempsRel/500;
        this.M2.angle = -tempsRel/500;
    }
}