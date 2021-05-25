import MondeAbstrait from "./MondeAbstrait.js";
import * as SM from "../../AaaahSpritesManager.js";
import * as PIXI from "pixi.js";

export default class Monde_22 extends MondeAbstrait {
    constructor(jeu) {
        super(jeu);

        this.monde = SM.AaaahSpritesManager.getSprite(SM.Sprites.Monde23);
        this.monde.x = -3;
        this.monde.y = 127;
        this.ajouterTexture(this.monde);

        this.M1 = SM.AaaahSpritesManager.getSprite(SM.Sprites.Monde23_M1);
        this.M1.x = 92;
        this.M1.y = 266;
        this.M1.pivot.x = 96;
        this.M1.pivot.y = 70;
        this.ajouterTexture(this.M1);

        this.E2 = SM.AaaahSpritesManager.getSprite(SM.Sprites.Monde23_E2);
        this.E2.x = 22;
        this.E2.y = 127;
        this.ajouterTexture(this.E2);

        const style = new PIXI.TextStyle({
            fontFamily: 'Arial',
            fontSize: 12,
            fill: '0xFF0000'
        });

        this.texte = new PIXI.Text("", style);
        this.texte.anchor.set(0.5, 0.5);
        this.texte.position.set(27, 288);
        this.ajouterTexture(this.texte);

        this.chrono = 20000;
        this.ejecter = true;
        this.tempsRelatif = 0;
    }

    tic(tempsRel) {
        this.tempsRelatif = tempsRel;

        if(tempsRel < this.chrono) {
            this.texte.text = Math.floor((1000+this.chrono-tempsRel)/1000);
        }
        else {
            this.texte.text = "^^";
            this.E2.visible = false;

            if(tempsRel < this.chrono + 200) {
                this.M1.angle = (tempsRel-this.chrono)/7;
            }
        }
    }

    interactionsSpeciales(joueur) {
        if(this.tempsRelatif < this.chrono) {
            joueur.setPourcentageCri(0);
        }
        else if(this.tempsRelatif >= this.chrono && this.ejecter) {
            this.ejecter = false;
            this.aaaah.getPartie().getGuidage().clear();
            joueur.setPourcentageCri(1);

            if(joueur.getX() > -27 && joueur.getX() < 104 && joueur.getY() > 175 && joueur.getY() < 274) {
                joueur.setVitesseX(20);
                joueur.setVitesseY(-12);
            }
        }
    }
}