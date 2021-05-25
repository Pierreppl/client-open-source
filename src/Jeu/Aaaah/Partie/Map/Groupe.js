import Mouvement from "./Mouvement.js";

/**
 * Classe permettant de gérer les groupes de formes.
 * Il est possible d'appliquer des translations et rotations globales à toutes les formes d'un groupe.
 */
export default class Groupe {
    /**
     * Constructeur.
     */
    constructor() {
        this.listeFormes = [];
        this.x = this.y = this.minX = this.minY = this.maxX = this.maxY = 0;

        this.mouvement = new Mouvement(this);
    }

    /**
     * Ajoute une forme au groupe.
     * 
     * @param {FormeAbstraite} forme Nouvelle forme dans le groupe.
     */
    ajouter(forme) {
        if(this.listeFormes.length === 0) {
            this.x = forme.getX();
            this.y = forme.getY();
            this.minX = forme.getMinX();
            this.minY = forme.getMinY();
            this.maxX = forme.getMinX() + forme.getWidth();
            this.maxY = forme.getMinY() + forme.getHeight();
        }
        else {
            if(this.x > forme.getX()) {
                this.x = forme.getX();
            }

            if(this.y > forme.getY()) {
                this.y = forme.getY();
            }

            if(this.minX > forme.getMinX()) {
                this.minX = forme.getMinX();
            }

            if(this.minY > forme.getMinY()) {
                this.minY = forme.getMinY();
            }

            if(this.maxX < forme.getMinX() + forme.getWidth()) {
                this.maxX = forme.getMinX() + forme.getWidth();
            }

            if(this.maxY < forme.getMinY() + forme.getHeight()) {
                this.maxY = forme.getMinY() + forme.getHeight();
            }
        }

        let cAbsX = this.minX + Math.abs(this.minX-this.maxX)/2;
        let cAbsY = this.minY + Math.abs(this.minY-this.maxY)/2;

        this.listeFormes.push(forme);
        this.listeFormes.forEach(e => e.setPivot(cAbsX - e.getX(), cAbsY - e.getY()));

        this.mouvement.updatePosition();
    }

    /**
     * Supprime le groupe et donc toutes les formes qu'il contient.
     */
    supprimer() {
        this.listeFormes.forEach(e => e.supprimer());
    }

    /**
     * Applique une rotation sur le groupe.
     * 
     * @param {float} angle Valeur en degrés de la rotation à appliquer.
     */
    rotation(angle) {
        this.listeFormes.forEach(e => e.rotation(angle));
    }

    /**
     * Déplace le gorupe de façon relative.
     * 
     * @param {float} x Déplace le groupe de x en abscisses.
     * @param {float} y Déplace le groupe de y en ordonnées.
     */
    deplacer(x, y) {
        this.listeFormes.forEach(e => {
            e.x += x;
            e.y += y;
        })
    }

    /**
     * @return La position de du groupe en abscisses.
     */
    getX() {
        return this.x;
    }

    /**
     * @return La position de du groupe en ordonnées.
     */
    getY() {
        return this.y;
    }

    /**
     * Modifie la position en abscisses du groupe.
     * 
     * @param {float} x Nouvelle valeur en abscisses du groupe.
     */
    setX(x) {
        this.listeFormes.forEach(e => e.deplacer(x-this.x,0));
        this.x = x;
    }

    /**
     * Modifie la position en ordonnées du groupe.
     * 
     * @param {float} x Nouvelle valeur en ordonnées du groupe.
     */
    setY(y) {
        this.listeFormes.forEach(e => e.deplacer(0, y-this.y));
        this.y = y;
    }
}