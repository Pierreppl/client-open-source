import FormeAbstraite from "./FormeAbstraite.js";
import * as PIXI from "pixi.js";

/**
 * Classe permettant de gérer les rectangles sur les maps.
 */
export default class Rectangle extends FormeAbstraite {
    /**
     * Constructeur.
     * 
     * @param {PIXI.Container} stage Scène sur laquelle la forme est affichée.
     * @param {float} x Position en abscisse sur la scène.
     * @param {float} y Position en ordonnées sur la scène.
     * @param {float} w Lageur du rectangle.
     * @param {float} h Hauteur du rectangle.
     * @param {Boolean} remplir Vrai si la forme doit être remplie, faux sinon.
     * @param {int} taille Epaisseur de la forme.
     * @param {String} couleur Couleur en héxadécimal de la forme.
     */
    constructor(stage, x, y, w, h, remplir, taille, couleur) {
        super(stage, x, y, taille, couleur);

        this.graphic = new PIXI.Graphics();
        this.addChild(this.graphic);
        
        if(remplir === true) {
            this.graphic.beginFill(this.couleur);
        }

        this.graphic.lineStyle(this.taille, this.couleur, 1)
                    .drawRect(w < 0 ? w : 0, h < 0 ? h : 0, Math.abs(w), Math.abs(h));

        if(remplir === true) {
            this.graphic.endFill();
        }
        
        this.minX = w < 0 ? this.x+w : this.x;
        this.minY = h < 0 ? this.y+h : this.y;
        
        this.setPivot(w/2, h/2);
    }
}