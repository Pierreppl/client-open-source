import MondeAbstrait from "./MondeAbstrait.js";
import * as SM from "../../AaaahSpritesManager.js";

export default class Monde_47 extends MondeAbstrait {
    constructor(jeu) {
        super(jeu);

        this.monde = SM.AaaahSpritesManager.getSprite(SM.Sprites.Monde47);
        this.monde.x = -8;
        this.monde.y = -10;
        this.ajouterTexture(this.monde);
    }
}