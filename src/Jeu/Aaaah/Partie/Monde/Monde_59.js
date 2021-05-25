import MondeAbstrait from "./MondeAbstrait.js";
import * as SM from "../../AaaahSpritesManager.js";
import * as AG from "../../Global.js";

export default class Monde_59 extends MondeAbstrait {
    constructor(jeu) {
        super(jeu);

        this.monde = SM.AaaahSpritesManager.getSprite(SM.Sprites.Monde59);
        this.monde.x = -37;
        this.monde.y = -100;
        this.ajouterTexture(this.monde);

        this.setConstanteFlexible(AG.ConstantesFlexibles.GRAVITE_Y, 0.3);
        this.setConstanteFlexible(AG.ConstantesFlexibles.BOOST, 3);
    }
}