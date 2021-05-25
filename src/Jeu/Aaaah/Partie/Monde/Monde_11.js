import MondeAbstrait from "./MondeAbstrait.js";
import * as SM from "../../AaaahSpritesManager.js";

export default class Monde_11 extends MondeAbstrait {
    constructor(jeu) {
        super(jeu);

        this.monde = SM.AaaahSpritesManager.getSprite(SM.Sprites.Monde11);
        this.monde.x = 358.4;
        this.monde.y = 185.2;
        this.monde.pivot.x = this.monde.width/2;
        this.monde.pivot.y = this.monde.height/2;
        this.ajouterTexture(this.monde);
    }

    tic(tempsRel) {
        this.monde.angle = tempsRel/500;
    }
}