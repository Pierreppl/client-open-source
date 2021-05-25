import FormeAbstraite from "./FormeAbstraite.js";
import * as PIXI from "pixi.js";

/**
 * Classe permettant de gérer les lignes sur les maps.
 */
export default class Ligne extends FormeAbstraite {
    /**
     * Constructeur.
     * 
     * @param {PIXI.Container} stage Scène sur laquelle la forme est affichée.
     * @param {float} x1 Position en abscisse sur la scène.
     * @param {float} y1 Position en ordonnées sur la scène.
     * @param {float} x2 Point de destination x relatif à la position de la forme sur la scène.
     * @param {float} y2 Point de destination y relatif à la position de la forme sur la scène.
     * @param {int} taille Epaisseur de la forme.
     * @param {String} couleur Couleur en héxadécimal de la forme.
     */
    constructor(stage, x1, y1, x2, y2, taille, couleur) {
        super(stage, x1, y1, taille, couleur);

        this.graphic = new PIXI.Graphics();
        this.addChild(this.graphic);
        
        this.graphic.lineStyle({
            width: this.taille,
            color: this.couleur,
            alpha: 1,
            cap: PIXI.LINE_CAP.ROUND
        });
        this.graphic.lineTo(x2, y2);

        this.minX = x2 < 0 ? this.x1+x2 : this.x1;
        this.minY = y2 < 0 ? this.y1+y2 : this.y1;

        this.setPivot(x2/2, y2/2);
    }
}