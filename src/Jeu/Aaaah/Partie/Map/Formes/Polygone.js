import FormeAbstraite from "./FormeAbstraite.js";
import * as PIXI from "pixi.js";

/**
 * Classe permettant de gérer les polygones sur les maps.
 */
export default class Polygone extends FormeAbstraite {
    /**
     * Constructeur.
     * 
     * @param {PIXI.Container} stage Scène sur laquelle la forme est affichée.
     * @param {float} x Position en abscisse sur la scène.
     * @param {float} y Position en ordonnées sur la scène.
     * @param {Array} path Tableau de coordonnées permettant de tracer le polygone.
     * @param {Boolean} remplir Vrai si la forme doit être remplie, faux sinon.
     * @param {int} taille Epaisseur de la forme.
     * @param {String} couleur Couleur en héxadécimal de la forme.
     */
    constructor(stage, x, y, path, remplir, taille, couleur) {
        super(stage, x, y, taille, couleur);

        path.unshift(0);
        path.unshift(0);

        this.graphic = new PIXI.Graphics();
        this.addChild(this.graphic);

        if(remplir === true) {
            this.graphic.beginFill(this.couleur);
        }

        this.graphic.lineStyle({
            width: this.taille,
            color: this.couleur,
            alpha: 1,
            join: PIXI.LINE_JOIN.ROUND
        });

        this.graphic.drawPolygon(path);

        if(remplir === true) {
            this.graphic.endFill();
        }

        this.minX = 0
        this.minY = 0;
        for(let i = 2; i < path.length; i++) {
            if(i%2 == 0 && path[i] < this.minX) {
                this.minX = path[i];
            } else if(i%2 != 0 && path[i] < this.minY) {
                this.minY = path[i];
            }
        } 

        let pX = this.minX + (this.width-this.taille)/2;
        let pY = this.minY + (this.height-this.taille)/2;
        
        this.setPivot(pX-this.x, pY-this.y);
    }
}