import MondeAbstrait from "./MondeAbstrait.js";
import * as SM from "../../AaaahSpritesManager.js";
import * as AG from "../../Global.js";

export default class Monde_20 extends MondeAbstrait {
    constructor(jeu) {
        super(jeu);

        this.monde = SM.AaaahSpritesManager.getSprite(SM.Sprites.Monde20);
        this.monde.x = 402;
        this.monde.y = 195;
        this.monde.pivot.x = 360;
        this.monde.pivot.y = 243;
        this.ajouterTexture(this.monde);

        this.setConstanteFlexible(AG.ConstantesFlexibles.GRAVITE_Y, 0.2);
    }

    tic(tempsRel) {
        this.monde.angle = tempsRel/500;
    }
}