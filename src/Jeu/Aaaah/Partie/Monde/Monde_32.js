import MondeAbstrait from "./MondeAbstrait.js";
import * as SM from "../../AaaahSpritesManager.js";
import * as PIXI from "pixi.js";
import * as AG from "../../Global.js";

export default class Monde_32 extends MondeAbstrait {
    constructor(jeu) {
        super(jeu);

        this.monde = SM.AaaahSpritesManager.getSprite(SM.Sprites.Monde32);
        this.monde.x = -0;
        this.monde.y = -304;
        this.ajouterTexture(this.monde);

        const style = new PIXI.TextStyle({
            fontFamily: 'Arial',
            fontSize: 12,
            fill: '0xC7C8DC'
        });

        this.texte = new PIXI.Text("Activation d'anti-matière dans 30 secondes !", style);
        this.texte.anchor.set(0.5, 0.5);
        this.texte.position.set(500, 280);
        this.ajouterTexture(this.texte);

        this.tempsRelatif = 0;
        this.declenchement = true;
        this.declenchement2 = true;
    }

    tic(tempsRel) {
        this.tempsRelatif = tempsRel;

        if(tempsRel < 30000) {
            this.texte.text = "Activation d'anti-matière dans " + (30-Math.floor(tempsRel/1000)) + " secondes !"
        }
        else if(tempsRel < 35000) {
            this.texte.text = "Désactivation d'anti-matière dans " + (5-Math.floor((tempsRel-30000)/1000)) + " secondes !";
        }
        else {
            this.texte.text = "Aaaaaaaaaaaah !";
        }
    }

    interactionsSpeciales(joueur) {
        if(this.tempsRelatif < 30000) {
            joueur.setPourcentageCri(0);
        }
        else {
            if(this.declenchement) {
                this.declenchement = false;
                joueur.setPourcentageCri(1);
                this.setConstanteFlexible(AG.ConstantesFlexibles.GRAVITE_Y, -0.4);
            }
            
            if(this.tempsRelatif >= 35000 && this.declenchement2) {
                this.declenchement2 = false;
                this.setConstanteFlexible(AG.ConstantesFlexibles.GRAVITE_Y, 0.4);
                joueur.setVitesseY(0);
            }
        }
    }
}