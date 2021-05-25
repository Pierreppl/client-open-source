import MondeAbstrait from "./MondeAbstrait.js";
import * as SM from "../../AaaahSpritesManager.js";

export default class Monde_18 extends MondeAbstrait {
    constructor(jeu) {
        super(jeu);

        this.monde = SM.AaaahSpritesManager.getSprite(SM.Sprites.Monde18);
        this.monde.x = 66;
        this.monde.y = -105;
        this.ajouterTexture(this.monde);

        this.M1 = SM.AaaahSpritesManager.getSprite(SM.Sprites.Monde18_M1);
        this.M1.x = 513.85;
        this.M1.y = 302;
        this.M1.pivot.x = this.M1.width/2;
        this.M1.pivot.y = this.M1.height/2;
        this.ajouterTexture(this.M1);

        this.M2 = SM.AaaahSpritesManager.getSprite(SM.Sprites.Monde18_M2);
        this.M2.x = 135.95;
        this.M2.y = 181;
        this.M2.pivot.x = this.M2.width/2;
        this.M2.pivot.y = this.M2.height/2;
        this.M2.scale.set(0.667, 0.667);
        this.ajouterTexture(this.M2);

        this.M3 = SM.AaaahSpritesManager.getSprite(SM.Sprites.Monde18_M2);
        this.M3.x = 307.9;
        this.M3.y = 282;
        this.M3.pivot.x = this.M3.width/2;
        this.M3.pivot.y = this.M3.height/2;
        this.M3.scale.set(0.733, 0.733);
        this.ajouterTexture(this.M3);

        this.M4 = SM.AaaahSpritesManager.getSprite(SM.Sprites.Monde18_M2);
        this.M4.x = 410.9;
        this.M4.y = 130;
        this.M4.pivot.x = this.M4.width/2;
        this.M4.pivot.y = this.M4.height/2;
        this.M4.scale.set(0.8, 0.8);
        this.ajouterTexture(this.M4);

        this.M5 = SM.AaaahSpritesManager.getSprite(SM.Sprites.Monde18_M2);
        this.M5.x = 601;
        this.M5.y = 131;
        this.M5.pivot.x = this.M5.width/2;
        this.M5.pivot.y = this.M5.height/2;
        this.ajouterTexture(this.M5);
    }

    tic(tempsRel) {
        this.M1.angle = tempsRel/500;
        this.M2.angle = -tempsRel/500;
        this.M3.angle = tempsRel/500;
        this.M4.angle = -tempsRel/500;
        this.M5.angle = tempsRel/500;
    }
}