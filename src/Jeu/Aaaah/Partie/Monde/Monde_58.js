import MondeAbstrait from "./MondeAbstrait.js";
import * as SM from "../../AaaahSpritesManager.js";
import * as AG from "../../Global.js";
import * as PIXI from "pixi.js";

export default class Monde_58 extends MondeAbstrait {
    constructor(jeu) {
        super(jeu);

        this.monde = SM.AaaahSpritesManager.getSprite(SM.Sprites.Monde58);
        this.monde.x = -9;
        this.monde.y = -120;
        this.ajouterTexture(this.monde);

        const style = new PIXI.TextStyle({
            fontFamily: 'Arial',
            fontSize: 12,
            fill: '0xC7C8DC'
        });

        this.sens = new PIXI.Text(">", style);
        this.sens.position.set(323, 185);
        this.sens.pivot.x = this.sens.width/2;
        this.sens.pivot.y = this.sens.height/2;
        this.sens.angle = 90;
        this.ajouterTexture(this.sens);

        this.bas = true;
    }

    tic(tempsRel) {
        if(Math.floor(tempsRel/10000)%2 == 0) {
            if(!this.bas) {
                this.bas = true;
                this.sens.angle = 90;
                this.setConstanteFlexible(AG.ConstantesFlexibles.GRAVITE_Y, 0.3);
            }
        }
        else if(this.bas) {
            this.bas = false;
            this.sens.angle = -90;
            this.setConstanteFlexible(AG.ConstantesFlexibles.GRAVITE_Y, -0.3);
        }
    }
}