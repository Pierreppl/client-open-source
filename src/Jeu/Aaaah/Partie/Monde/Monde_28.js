import MondeAbstrait from "./MondeAbstrait.js";
import * as SM from "../../AaaahSpritesManager.js";

export default class Monde_28 extends MondeAbstrait {
    constructor(jeu) {
        super(jeu);

        this.monde = SM.AaaahSpritesManager.getSprite(SM.Sprites.Monde28);
        this.monde.x = -54;
        this.monde.y = -27;
        this.ajouterTexture(this.monde);

        this.M1 = SM.AaaahSpritesManager.getSprite(SM.Sprites.Monde28_M1);
        this.M1.x = 465.4;
        this.M1.y = 192.45;
        this.M1.pivot.x = this.M1.width/2;
        this.M1.pivot.y = this.M1.height/2;
        this.ajouterTexture(this.M1);

        this.M2 = SM.AaaahSpritesManager.getSprite(SM.Sprites.Monde28_M2);
        this.M2.x = 454.05;
        this.M2.y = 12.85;
        this.M2.pivot.x = this.M2.width/2;
        this.M2.pivot.y = this.M2.height/2;
        this.ajouterTexture(this.M2);

        this.M3 = SM.AaaahSpritesManager.getSprite(SM.Sprites.Monde28_M2);
        this.M3.x = 466.05;
        this.M3.y = 361.1;
        this.M3.pivot.x = this.M3.width/2;
        this.M3.pivot.y = this.M3.height/2;
        this.ajouterTexture(this.M3);
    }

    tic(tempsRel) {
        this.M1.angle = -tempsRel/500;
        this.M2.angle = -tempsRel/500;
        this.M2.angle = -tempsRel/500;
    }
}