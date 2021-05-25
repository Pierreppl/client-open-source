import MondeAbstrait from "./MondeAbstrait.js";
import * as SM from "../../AaaahSpritesManager.js";

export default class Monde_56 extends MondeAbstrait {
    constructor(jeu) {
        super(jeu);

        this.background = SM.AaaahSpritesManager.getSprite(SM.Sprites.Monde56_background);
        this.background.x = -38.9;
        this.background.y = 340;
        this.ajouterTexture(this.background);

        this.foreground = SM.AaaahSpritesManager.getSprite(SM.Sprites.Monde56_foreground);
        this.foreground.x = -38.9;
        this.foreground.y = 340;
        this.ajouterTexture(this.foreground, this.aaaah.foreground);

        this.dernierTemps = 0;
        this.declencher = false;
    }

    tic(tempsRel) {
        if(5000 < tempsRel-this.dernierTemps) {
            this.declencher = true;
            this.dernierTemps = tempsRel;
        }
        else {
            this.declencher = false;
        }
    }

    interactionsSpeciales(joueur) {
        if(this.declencher) {
            if(joueur.getY() > 309) {
                if(joueur.getX() < 159) {
                    joueur.setVitesseX(13);
                    joueur.setVitesseY(-8);
                }
                else if(joueur.getX() > 523) {
                    joueur.setVitesseX(-13);
                    joueur.setVitesseY(-8);
                }
            }
        }
    }
}