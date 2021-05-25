import FormeAbstraite from "./FormeAbstraite.js";
import * as PIXI from "pixi.js";

/**
 * Classe permettant de gérer les courbes sur les maps.
 */
export default class Courbe extends FormeAbstraite {
    /**
     * Constructeur.
     * 
     * @param {PIXI.Container} stage Scène sur laquelle la forme est affichée.
     * @param {float} x Position en abscisse sur la scène.
     * @param {float} y Position en ordonnées sur la scène.
     * @param {float} cpX Point de contrôle x relatif à la position de la forme sur la scène.
     * @param {float} cpY Point de contrôle y relatif à la position de la forme sur la scène.
     * @param {float} toX Point de destination x relatif à la position de la forme sur la scène.
     * @param {float} toY Point de destination y relatif à la position de la forme sur la scène.
     * @param {int} taille Epaisseur de la forme
     * @param {String} couleur Couleur de la forme en héxadécimal.
     */
    constructor(stage, x, y, cpX, cpY, toX, toY, taille, couleur) {
        super(stage, x, y, taille, couleur);

        this.graphic = new PIXI.Graphics();
        this.addChild(this.graphic);

        this.graphic.lineStyle({
            width: this.taille,
            color: this.couleur,
            alpha: 1,
            cap: PIXI.LINE_CAP.ROUND
        });

        this.graphic.quadraticCurveTo(cpX, cpY, toX, toY);
        
        let width = this.width-this.taille;
        let height = this.height-this.taille;

        this.minX = this.min(this.x, toX, cpX, width);
        this.minY = this.min(this.y, toY, cpY, height);

        let pX = this.minX + width/2;
        let pY = this.minY + height/2;

        this.setPivot(pX-this.x, pY-this.y);
    }

    /**
     * Magouille pour déterminer les positions minimales de la courbe.
     * 
     * @param {float} position Position en x ou y de la forme.
     * @param {float} direction Point de destination en x ou y relatif
     * @param {float} courbure Point de contrôle en x ou y relatif
     * @param {int} l Largeur ou hauteur de la courbe.
     */
    min(position, direction, courbure, l) {
        let min = direction < 0 ? position+direction : position;
        let max = direction < 0 ? position : position+direction;

        if(Math.abs(Math.abs(max - min) - l) <= 0.1 || courbure > 0) {
            return min;
        }
        else {
            return max-l;
        }
    }
}