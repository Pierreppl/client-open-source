import MondeAbstrait from "./MondeAbstrait.js";
import * as SM from "../../AaaahSpritesManager.js";

export default class Monde_21 extends MondeAbstrait {
    constructor(jeu) {
        super(jeu);

        this.monde = SM.AaaahSpritesManager.getSprite(SM.Sprites.Monde21);
        this.monde.x = 0;
        this.monde.y = -8;
        this.ajouterTexture(this.monde);

        this.M1 = SM.AaaahSpritesManager.getSprite(SM.Sprites.Monde21_M1);
        this.M1.x = 378.2;
        this.M1.y = 63.2;
        this.M1.pivot.x = this.M1.width/2;
        this.M1.pivot.y = this.M1.height/2;
        this.M1.scale.set(0.935, 0.935);
        this.ajouterTexture(this.M1);

        this.M2 = SM.AaaahSpritesManager.getSprite(SM.Sprites.Monde21_M1);
        this.M2.x = 498.45;
        this.M2.y = 198.95;
        this.M2.pivot.x = this.M2.width/2;
        this.M2.pivot.y = this.M2.height/2;
        this.M2.scale.set(0.4, 0.4);
        this.ajouterTexture(this.M2);

        this.M3 = SM.AaaahSpritesManager.getSprite(SM.Sprites.Monde21_M1);
        this.M3.x = 338.5;
        this.M3.y = 197.35;
        this.M3.pivot.x = this.M3.width/2;
        this.M3.pivot.y = this.M3.height/2;
        this.M3.scale.set(0.35, 0.35);
        this.ajouterTexture(this.M3);

        this.M4 = SM.AaaahSpritesManager.getSprite(SM.Sprites.Monde21_M1);
        this.M4.x = 423.45;
        this.M4.y = 185.45;
        this.M4.pivot.x = this.M4.width/2;
        this.M4.pivot.y = this.M4.height/2;
        this.M4.scale.set(0.4, 0.4);
        this.ajouterTexture(this.M4);

        this.M5 = SM.AaaahSpritesManager.getSprite(SM.Sprites.Monde21_M1);
        this.M5.x = 608.5;
        this.M5.y = 235.45;
        this.M5.pivot.x = this.M5.width/2;
        this.M5.pivot.y = this.M5.height/2;
        this.M5.scale.set(0.45, 0.45);
        this.ajouterTexture(this.M5);

        this.M6 = SM.AaaahSpritesManager.getSprite(SM.Sprites.Monde21_M1);
        this.M6.x = 250.1;
        this.M6.y = 272.4;
        this.M6.pivot.x = this.M6.width/2;
        this.M6.pivot.y = this.M6.height/2;
        this.M6.scale.set(0.6, 0.6);
        this.ajouterTexture(this.M6);

        this.M7 = SM.AaaahSpritesManager.getSprite(SM.Sprites.Monde21_M1);
        this.M7.x = 379.7;
        this.M7.y = 337.5;
        this.M7.pivot.x = this.M7.width/2;
        this.M7.pivot.y = this.M7.height/2;
        this.M7.scale.set(0.80, 0.80);
        this.ajouterTexture(this.M7);

        this.M8 = SM.AaaahSpritesManager.getSprite(SM.Sprites.Monde21_M1);
        this.M8.x = 510.25;
        this.M8.y = 327.65;
        this.M8.pivot.x = this.M8.width/2;
        this.M8.pivot.y = this.M8.height/2;
        this.M8.scale.set(0.62, 0.62);
        this.ajouterTexture(this.M8);

        this.M9 = SM.AaaahSpritesManager.getSprite(SM.Sprites.Monde21_M1);
        this.M9.x = 594.25;
        this.M9.y = 360.15;
        this.M9.pivot.x = this.M9.width/2;
        this.M9.pivot.y = this.M9.height/2;
        this.M9.scale.set(0.40, 0.40);
        this.ajouterTexture(this.M9);
    }

    tic(tempsRel) {
        this.M1.angle = tempsRel/500;
        this.M2.angle = tempsRel/500;
        this.M3.angle = -tempsRel/500;
        this.M4.angle = tempsRel/500;
        this.M5.angle = -tempsRel/500;
        this.M6.angle = tempsRel/500;
        this.M7.angle = -tempsRel/500;
        this.M8.angle = tempsRel/500;
        this.M9.angle = -tempsRel/500;
    }
}