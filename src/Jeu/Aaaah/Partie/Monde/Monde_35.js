import MondeAbstrait from "./MondeAbstrait.js";
import * as SM from "../../AaaahSpritesManager.js";

export default class Monde_35 extends MondeAbstrait {
    constructor(jeu) {
        super(jeu);

        this.monde = SM.AaaahSpritesManager.getSprite(SM.Sprites.Monde35);
        this.monde.x = -26;
        this.monde.y = -22;
        this.ajouterTexture(this.monde);
    }
}