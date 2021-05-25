import MondeAbstrait from "./MondeAbstrait.js";
import * as SM from "../../AaaahSpritesManager.js";

export default class Monde_24 extends MondeAbstrait {
    constructor(jeu) {
        super(jeu);

        this.invisible = SM.AaaahSpritesManager.getSprite(SM.Sprites.Monde24_Invisible);
        this.invisible.x = -34;
        this.invisible.y = -5;
        this.ajouterTexture(this.invisible);

        this.monde_foreground = SM.AaaahSpritesManager.getSprite(SM.Sprites.Monde24_1);
        this.monde_foreground.x = 0;
        this.monde_foreground.y = 24;
        this.ajouterTexture(this.monde_foreground, this.aaaah.foreground);

        this.monde_background = SM.AaaahSpritesManager.getSprite(SM.Sprites.Monde24_2);
        this.monde_background.x = 110;
        this.monde_background.y = -5;
        this.ajouterTexture(this.monde_background);

        this.bloc = SM.AaaahSpritesManager.getSprite(SM.Sprites.Bloc);
        this.bloc.x = 693;
        this.bloc.y = 44;
        this.ajouterTexture(this.bloc);

        this.indice = 7500;
        this.dureeIndice = 1000;
        this.reapparition = 8*this.indice;
    }

    tic(tempsRel) {
        if(tempsRel > this.reapparition) {
            this.updateAlpha(1);
        }
        else if(tempsRel % this.indice > this.dureeIndice) {
            this.updateAlpha(0);
        }
        else if(tempsRel % this.indice < this.dureeIndice) {
            let a = tempsRel%this.indice/(this.dureeIndice/2);

            if(a > 1) {
                a = 1-(a-1);
            }
            this.updateAlpha(a);
        }
        else {
            this.updateAlpha((this.indice-tempsRel%this.indice)/(this.dureeIndice/2));
        }
    }

    updateAlpha(alpha) {
        this.monde_foreground.alpha = alpha;
        this.monde_background.alpha = alpha;
    }
}