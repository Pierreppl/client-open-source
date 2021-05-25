import MondeAbstrait from "./MondeAbstrait.js";
import * as SM from "../../AaaahSpritesManager.js";
import * as AG from "../../Global.js";

export default class Monde_57 extends MondeAbstrait {
    constructor(jeu) {
        super(jeu);

        this.M1 = SM.AaaahSpritesManager.getSprite(SM.Sprites.Monde57_M1);
        this.M1.x = -800;
        this.ajouterTexture(this.M1);

        this.setConstanteFlexible(AG.ConstantesFlexibles.GRAVITE_Y, 0.55);
        this.setConstanteFlexible(AG.ConstantesFlexibles.BOOST, 0.7);
    }

    tic(tempsRel) {
        this.M1.x = -800 + tempsRel/60;
    }
}