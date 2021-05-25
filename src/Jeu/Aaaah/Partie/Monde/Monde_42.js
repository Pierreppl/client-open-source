import MondeAbstrait from "./MondeAbstrait.js";
import * as SM from "../../AaaahSpritesManager.js";

export default class Monde_42 extends MondeAbstrait {
    constructor(jeu) {
        super(jeu);

        this.monde = SM.AaaahSpritesManager.getSprite(SM.Sprites.Monde42);
        this.monde.x = 13;
        this.monde.y = 20;
        this.ajouterTexture(this.monde);

        this.M1 = SM.AaaahSpritesManager.getSprite(SM.Sprites.Monde42_M1);
        this.M1.x = 322;
        this.M1.y = 236;
        this.M1.pivot.x = this.M1.width/2;
        this.M1.pivot.y = this.M1.height/2;
        this.ajouterTexture(this.M1);
    }

    tic(tempsRel) {
        this.M1.angle = tempsRel/500;
    }
}