import MondeAbstrait from "./MondeAbstrait.js";
import * as SM from "../../AaaahSpritesManager.js";

export default class Monde_12 extends MondeAbstrait {
    constructor(jeu) {
        super(jeu);

        this.monde = SM.AaaahSpritesManager.getSprite(SM.Sprites.Monde12);
        this.monde.x = -66.95;
        this.monde.y = -16;
        this.ajouterTexture(this.monde);
    }
}