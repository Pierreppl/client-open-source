import MondeAbstrait from "./MondeAbstrait.js";
import * as SM from "../../AaaahSpritesManager.js";
import * as AG from "../../Global.js";

export default class Monde_22 extends MondeAbstrait {
    constructor(jeu) {
        super(jeu);

        this.monde = SM.AaaahSpritesManager.getSprite(SM.Sprites.Monde22);
        this.monde.x = 5;
        this.monde.y = 4;
        this.ajouterTexture(this.monde);

        this.setConstanteFlexible(AG.ConstantesFlexibles.TEMPS_TRAIT_GUIDE, 4000);
    }
}