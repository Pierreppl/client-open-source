import MondeAbstrait from "./MondeAbstrait.js";
import * as SM from "../../AaaahSpritesManager.js";

export default class Monde_63 extends MondeAbstrait {
    constructor(jeu) {
        super(jeu);

        this.monde = SM.AaaahSpritesManager.getSprite(SM.Sprites.Monde63);
        this.monde.y = -52;
        this.ajouterTexture(this.monde);

        this.M1 = SM.AaaahSpritesManager.getSprite(SM.Sprites.Monde63_M1);
        this.M1.x = 450;
        this.M1.y = 179.3;
        this.M1.pivot.x = this.M1.width/2;
        this.M1.pivot.y = this.M1.height/2;
        this.ajouterTexture(this.M1);

        this.texte = SM.AaaahSpritesManager.getSprite(SM.Sprites.Monde63_Texte);
        this.texte.x = 405;
        this.texte.y = 160;
        this.ajouterTexture(this.texte);

        this.dernierTemps = 0;
    }

    tic(tempsRel) {
        if(tempsRel - this.dernierTemps > 20) {
            this.dernierTemps = tempsRel;
            this.M1.angle += 12;
        }
    }
}