import MondeAbstrait from "./MondeAbstrait.js";
import * as SM from "../../AaaahSpritesManager.js";

export default class Monde_49 extends MondeAbstrait {
    constructor(jeu) {
        super(jeu);

        this.M1 = SM.AaaahSpritesManager.getSprite(SM.Sprites.Monde49_M1);
        this.M1.x = 212;
        this.M1.y = 348;
        this.M1.pivot.x = 49;
        this.M1.pivot.y = 50;
        this.ajouterTexture(this.M1);

        this.E1 = SM.AaaahSpritesManager.getSprite(SM.Sprites.Monde49_E1);
        this.E1.x = 136.3;
        this.E1.y = 302.4;
        this.ajouterTexture(this.E1);

        this.barre = SM.AaaahSpritesManager.getSprite(SM.Sprites.Monde49_Barre);
        this.barre.x = 143;
        this.barre.y = 298.55;
        this.ajouterTexture(this.barre);

        this.fleche = true;
    }

    tic(tempsRel) {
        if(tempsRel > 10000) {
            if(this.fleche) {
                this.fleche = false;
                this.E1.visible = false;
                this.barre.visible = false;
            }

            if(tempsRel < 90000) {
                let pourcent = (tempsRel-10000)/80000;
                this.M1.x = 212 + 433*pourcent;
                this.M1.y = 348 - 315*pourcent;

                if(tempsRel > 50000) {
                    this.M1.angle = (tempsRel-50000)/30;
                }
            }
            else {
                this.M1.angle = 180;
            }
        }
    }
}