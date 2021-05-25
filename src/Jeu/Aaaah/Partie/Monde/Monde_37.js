import MondeAbstrait from "./MondeAbstrait.js";
import * as SM from "../../AaaahSpritesManager.js";

export default class Monde_37 extends MondeAbstrait {
    constructor(jeu) {
        super(jeu);

        this.monde = SM.AaaahSpritesManager.getSprite(SM.Sprites.Monde37);
        this.monde.x = -17;
        this.monde.y = -15;
        this.ajouterTexture(this.monde);
    }
}