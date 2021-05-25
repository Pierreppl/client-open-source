import AaaahJoueurSkin from "./JoueurSkin";
import * as PIXI from "pixi.js";

/**
 * Classe graphique permettant de réprésenter l'apparence du joueur principal sur une scène et d'intéragir avec lui.
 */
export default class AaaahJoueurPrincipalSkin extends AaaahJoueurSkin {
    /**
     * Constructeur.
     * 
     * @param {String} pseudo Pseudo du joueur.
     * @param {int} x Position d'origine en abscisses du joueur.
     * @param {int} y Position d'origine en ordonnées du joueur.
     * @param {PIXI.Container} stage Scène sur laquelle le joueur est affiché.
     */
    constructor(pseudo, x, y, stage) {
        super(pseudo, x, y, stage);

        // Gestion du curseur de cri
        this.fondCurseur = new PIXI.Graphics();
        this.skin.addChild(this.fondCurseur);

        this.fondCurseur.position.set(-9, -6.5);
        this.fondCurseur.lineStyle(1, 0x000000, 1);
        this.fondCurseur.beginFill(0x303036);
        this.fondCurseur.drawRect(0, 0, 31.5, 3);
        this.fondCurseur.endFill();

        this.curseur = new PIXI.Graphics();
        this.skin.addChild(this.curseur);

        this.curseur.position.set(-8.5, -5);
        this.curseur.lineStyle(1, 0x009D9D, 1)
                    .lineTo(30, 0);

        // Modifications au niveau du pseudo
        const style = new PIXI.TextStyle({
            fontFamily: 'Arial',
            fontSize: 12,
            fill: '0xC2C2DA'
        });
        
        this.pseudo.style = style;
        this.pseudo.position.set(7, -15);
    }

    /**
     * Met à jour le curseur de cri
     * 
     * @param {float} valeur Valeur entre 0 et 1 du curseur
     */
    updateCurseur(valeur) {
        this.curseur.width = valeur*32;
    }

    /**
     * Permet d'afficher ou non le curseur de cri.
     * 
     * @param {Boolean} visible Si vrai affiche le curseur, sinon le cache.
     */
    setVisibleCurseurCri(visible) {
        this.fondCurseur.visible = visible;
        this.curseur.visible = visible;
    }
}