import MondeAbstrait from "./MondeAbstrait.js";
import * as SM from "../../AaaahSpritesManager.js";
import * as Aaaah from "../../Aaaah.js";

export default class Monde_0 extends MondeAbstrait {
    constructor(jeu) {
        super(jeu);

        this.souffler = false;

        this.nuage = SM.AaaahSpritesManager.getSprite(SM.Sprites.Monde0_Nuage);
        this.nuage.x = 240;
        this.nuage.y = 50;

        this.nuage.onLoop = () => {
            this.nuage.stop();

            setTimeout(function(e) {
                e.nuage.play();
                e.souffler = true;
            }, 1000, this);
        };
        this.nuage.play();

        this.ajouterTexture(this.nuage);
    }

    interactionsSpeciales(joueur) {
        if(this.souffler) {
            this.souffler = false;

            if(joueur.getY() > 70 && joueur.getX() > 300 && joueur.getX() < 600) {
                joueur.setVitesseX(-13);
                joueur.setVitesseY(-8);
            }
        }
    }
}