import MondeAbstrait from "./MondeAbstrait.js";
import * as SM from "../../AaaahSpritesManager.js";
import * as AG from "../../Global.js";

export default class Monde_61 extends MondeAbstrait {
    constructor(jeu) {
        super(jeu);

        this.background = SM.AaaahSpritesManager.getSprite(SM.Sprites.Monde61_background);
        this.background.x = -26;
        this.background.y = -121;
        this.ajouterTexture(this.background);

        this.foreground = SM.AaaahSpritesManager.getSprite(SM.Sprites.Monde61_foreground);
        this.foreground.x = -26;
        this.foreground.y = -121;
        this.ajouterTexture(this.foreground, this.aaaah.foreground);

        this.tempsRelatif = 0;
    }

    tic(tempsRel) {
        this.tempsRelatif = tempsRel;
    }

    interactionsSpeciales(joueur) {
        if(this.tempsRelatif >= 5000) {
            let x = joueur.getX()+AG.PB.x;
            let y = joueur.getY()+AG.PB.y+1;

            if(this.aaaah.getPartie().detecterCouleur(x, y, 255, 0, 0)) {
                joueur.setVitesseY(-10);
            }
        }
    } 
}