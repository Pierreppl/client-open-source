import MondeAbstrait from "./MondeAbstrait.js";
import * as SM from "../../AaaahSpritesManager.js";
import * as PIXI from "pixi.js";

export default class Monde_39 extends MondeAbstrait {
    constructor(jeu) {
        super(jeu);

        this.monde = SM.AaaahSpritesManager.getSprite(SM.Sprites.Monde39);
        this.monde.x = -7;
        this.monde.y = -19;
        this.ajouterTexture(this.monde);

        this.M1 = SM.AaaahSpritesManager.getSprite(SM.Sprites.Monde_39_M1);
        this.M1.x = 470;
        this.M1.y = 150;
        this.M1.pivot.x = this.M1.width/2;
        this.M1.pivot.y = this.M1.height/2;
        this.ajouterTexture(this.M1);

        this.effet = SM.AaaahSpritesManager.getSprite(SM.Sprites.Monde_39_Effet);
        this.effet.x = 568;
        this.effet.y = 269;
        this.ajouterTexture(this.effet);

        this.mask1 = new PIXI.Graphics();
        this.mask1.beginFill(0xFF0000);
        this.mask1.drawRect(-40, 3, 46, 50);
        this.mask1.endFill();

        this.mask2 = new PIXI.Graphics();
        this.mask2.beginFill(0xFF0000);
        this.mask2.drawRect(-56, 60, 46, 55);
        this.mask2.endFill();

        this.container = new PIXI.Container();
        this.ajouterTexture(this.container);
        this.container.addChild(this.mask1);
        this.container.addChild(this.mask2)
        this.container.x = 568;
        this.container.y = 273;

        this.effet.mask = this.container;
    }

    tic(tempsRel) {
        this.M1.angle = tempsRel/500;

        this.mask1.x = (125*(tempsRel/12500))%125;
        this.mask1.height = 50 - (25*(tempsRel/12500))%25
        this.mask2.x = (170*(tempsRel/12500))%170;
    }
}