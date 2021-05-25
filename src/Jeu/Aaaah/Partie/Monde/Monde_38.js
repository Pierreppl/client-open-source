import MondeAbstrait from "./MondeAbstrait.js";
import * as SM from "../../AaaahSpritesManager.js";

export default class Monde_38 extends MondeAbstrait {
    constructor(jeu) {
        super(jeu);

        this.M1 = SM.AaaahSpritesManager.getSprite(SM.Sprites.Monde38_M1);
        this.M1.y = -200;
        this.ajouterTexture(this.M1);
    }

    tic(tempsRel) {
        if(tempsRel < 20000) {
            this.M1.x = 700 * (tempsRel / 20000);
         }
         else if(tempsRel < 40000)
         {
            this.M1.x = 700 - 700 * (tempsRel - 20000) / 20000;
         }
         else if(tempsRel < 60000)
         {
            this.M1.x = 700 * ((tempsRel - 40000) / 20000);
         }
         else if(tempsRel < 80000)
         {
            this.M1.x = 700 - 700 * (tempsRel - 60000) / 20000;
         }
         else if(tempsRel < 100000)
         {
            this.M1.x = 700 * ((tempsRel - 80000) / 20000);
         }
         else if(tempsRel < 120000)
         {
            this.M1.x = 700 - 700 * (tempsRel - 100000) / 20000;
         }
    }
}