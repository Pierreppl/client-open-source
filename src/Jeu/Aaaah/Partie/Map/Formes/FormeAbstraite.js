import * as PIXI from "pixi.js";
import Mouvement from "../Mouvement.js";
import * as AG from "../../../Global.js";

/**
 * Classe abstraite de toute forme d'une map.
 */
export default class FormeAbstraite extends PIXI.Container {
    /**
     * Constructeur.
     * 
     * @param {PIXI.Container} stage Scène sur laquelle la forme est affichée.
     * @param {float} x Position en abscisse sur la scène.
     * @param {float} y Position en ordonnées sur la scène.
     * @param {int} taille Epaisseur de la forme.
     * @param {String} couleur Couleur en héxadécimal de la forme.
     */
    constructor(stage, x, y, taille, couleur) {
        super();

        if(typeof(couleur) == 'undefined') {
            this.couleur = 0x000000;
        }
        else {
            this.couleur = couleur;
        }

        // Largeur d'un trait
        if(typeof(taille) == 'undefined') {
            this.taille = 3;
        }
        else {
            this.taille = taille;
        }

        this.stage = stage;
        this.stage.addChild(this);

        this.x = x+AG.DECALAGE_MAP;;
        this.y = y-AG.DECALAGE_MAP;;

        this.mouvement = new Mouvement(this);

        // A définir dans les sous classes pour obtenir les coordonnées du coin supérieur gauche de la forme.
        this.minX = null;   // La plus petite valeur en x de la forme.
        this.minY = null;   // La plus petite valeur en y de la forme.
    }

    /**
     * Supprime la forme.
     */
    supprimer() {
        this.stage.removeChild(this);
        this.destroy();
    }

    /**
     * @return La plus petite valeur en abscisse de la forme sur la scène.
     */
    getMinX() {
        return this.minX;
    }

    /**
     * @return La plus petite valeur en ordonnées de la forme sur la scène.
     */
    getMinY() {
        return this.minY;
    }

    /**
     * @return La largeur de la forme.
     */
    getWidth() {
        return this.width - this.taille;
    }

    /**
     * @return La hauteur de la forme.
     */
    getHeight() {
        return this.height - this.taille;
    }

    /**
     * @return La position de la forme en abscisses.
     */
    getX() {
        return this.x - this.pivot.x;
    }

    /**
     * @return La position de la forme en ordonnées.
     */
    getY() {
        return this.y - this.pivot.y;
    }

    /**
     * Modifie la position en abscisses de la forme.
     * 
     * @param {float} x Nouvelle valeur en abscisses de la forme.
     */
    setX(x) {
        this.x = x + this.pivot.x;
    }

    /**
     * Modifie la position en ordonnées de la forme.
     * 
     * @param {float} y Nouvelle valeur en ordonnées de la forme.
     */
    setY(y) {
        this.y = y + this.pivot.y;
    }

    /**
     * Modifie la position du centre de rotation de la forme.
     * 
     * @param {float} x Nouveau x
     * @param {float} y Nouveau y
     */
    setPivot(x, y) {
        let reelX = this.getX();
        let reelY = this.getY();

        this.pivot.x = x;
        this.pivot.y = y;

        // On doit ensuite modifie les coordonnées de la forme
        // car modifier le pivot affecte également la position de la forme.
        this.x = reelX + x;
        this.y = reelY + y;
    }

    /**
     * Applique une rotation sur la forme.
     * 
     * @param {float} angle Valeur en degrés de la rotation à appliquer.
     */
    rotation(angle) {
        this.angle = angle;
    }

    /**
     * Déplace la forme de façon relative.
     * 
     * @param {float} x Déplace la forme de x en abscisses.
     * @param {float} y Déplace la forme de y en ordonnées.
     */
    deplacer(x, y) {
        this.x += x;
        this.y += y;
    }
}