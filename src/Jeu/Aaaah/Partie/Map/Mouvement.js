import * as AG from "../../Global.js";

/**
 * Classe permettant la gestion des mouvements.
 */
export default class Mouvement {
    /**
     * Constructeur.
     * 
     * @param {*} element Element dont on veut gérer les mouvements. 
     *                    Doit implémenter les méthodes rotation, getX, getY, setX et setY.
     */
    constructor(element) {
        this.element = element;

        // Translation
        this.translation = false;
        this.debutTranslation = 0;
        this.tempsTrajet = 0;
        this.positionInitialeX = element.getX();
        this.positionInitialeY = element.getY();
        this.positionCibleX = 0;
        this.positionCibleY = 0;
        this.mouvementTranslation = AG.MouvementMap.Stop;

        // Rotation
        this.rotation = false;
        this.debutRotation = 0;
        this.dureeRotation = 0;
        this.degres = 0;
        this.mouvementRotation = AG.MouvementMap.Stop;
    }

    /**
     * Appelé à chaque frame.
     * 
     * @param {int} tempsRel Temps relatif en millisecondes depuis le début de la map.
     */
    tic(tempsRel) {
        if(tempsRel > AG.DUREE_PARTIE) {
            this.translation = false;
            this.rotation = false;
        }

        if(this.translation && tempsRel >= this.debutTranslation) {

            let posX = this.positionInitialeX;
            let posY = this.positionInitialeY;

            let deplacementX = this.positionCibleX-this.positionInitialeX;
            let deplacementY = this.positionCibleY-this.positionInitialeY;

            let tempsRelDebutTrans = (tempsRel-this.debutTranslation)/1000;

            switch(this.mouvementTranslation) {
                case AG.MouvementMap.Boucler:
                    if(deplacementX != 0) {
                        posX = this.positionInitialeX + (deplacementX/(this.tempsTrajet/1000)*tempsRelDebutTrans) % deplacementX;
                    }
                    if(deplacementY != 0) {
                        posY = this.positionInitialeY + (deplacementY/(this.tempsTrajet/1000)*tempsRelDebutTrans) % deplacementY;
                    }
                    break;

                case AG.MouvementMap.AllerRetour:

                    if(Math.floor((tempsRel-this.debutTranslation)/this.tempsTrajet) % 2 == 0) {
                        if(deplacementX != 0) {
                            posX = this.positionInitialeX + (deplacementX/(this.tempsTrajet/1000)*tempsRelDebutTrans) % deplacementX;
                        }
                        if(deplacementY != 0) {
                            posY = this.positionInitialeY + (deplacementY/(this.tempsTrajet/1000)*tempsRelDebutTrans) % deplacementY;
                        }
                    }
                    else {
                        if(deplacementX != 0) {
                            posX = this.positionInitialeX + deplacementX - ((deplacementX/(this.tempsTrajet/1000)*tempsRelDebutTrans) % deplacementX);
                        }
                        if(deplacementY != 0) {
                            posY = this.positionInitialeY + deplacementY - ((deplacementY/(this.tempsTrajet/1000)*tempsRelDebutTrans) % deplacementY);
                        }
                    }
                    break;

                default:

                    posX = this.positionInitialeX + deplacementX/(this.tempsTrajet/1000)*tempsRelDebutTrans;
                    posY = this.positionInitialeY + deplacementY/(this.tempsTrajet/1000)*tempsRelDebutTrans;

                    if((deplacementX > 0 && posX > this.positionCibleX) || (deplacementX < 0 && posX < this.positionCibleX)) {
                        this.translation = false;
                        posX = this.positionCibleX;
                        posY = this.positionCibleY;
                    }
            }

            this.element.setX(posX);
            this.element.setY(posY);
        }

        if(this.rotation && tempsRel >= this.debutRotation) {

            let tempsRelDebutRota = (tempsRel-this.debutRotation)/1000;
            let angle = 0;

            switch(this.mouvementRotation) {
                case AG.MouvementMap.Boucler:
                    angle = this.degres/(this.dureeRotation/1000)*tempsRelDebutRota % (this.degres != 0 ? this.degres : 1);
                    break;

                case AG.MouvementMap.AllerRetour:
                    if(Math.floor((tempsRel-this.debutRotation)/this.dureeRotation) % 2 == 0) {
                        angle = this.degres/(this.dureeRotation/1000)*tempsRelDebutRota % (this.degres != 0 ? this.degres : 1);
                    }
                    else {
                        angle = this.degres - (this.degres/(this.dureeRotation/1000)*tempsRelDebutRota % (this.degres != 0 ? this.degres : 1));
                    }
                    break;

                default:
                    angle = this.degres/(this.dureeRotation/1000)*tempsRelDebutRota;

                    if(this.degres > 0 && angle > this.degres || this.degres < 0 && angle < this.degres) {
                        this.rotation = false;
                        angle = this.degres;
                    }
            }

            this.element.rotation(angle);
        }
    }

    /**
     * Permet d'appliquer une translation à l'élement.
     * 
     * @param {int} depart Temps de départ de la translation en millisecondes relatif au départ de la map.
     * @param {int} tempsTrajet Temps de trajet de la translation en millisecondes.
     * @param {float} cX Position ciblée en x.
     * @param {float} cY Position ciblée en y.
     * @param {AG.MouvementMap} mouvement Type de mouvement à effectuer (boucler, aller-retour, aller simple).
     */
    appliquerTranslation(depart, tempsTrajet, cX, cY, mouvement) {
        this.translation = true;

        this.debutTranslation = depart;
        this.tempsTrajet = tempsTrajet;
        this.positionCibleX = cX;
        this.positionCibleY = cY;
        this.mouvementTranslation = mouvement;

        if(this.debutTranslation < 0) {
            this.debutTranslation = 0;
        }

        if(this.tempsTrajet < 1) {
            this.tempsTrajet = 1;
        }
    }

    /**
     * Permet d'appliquer une rotation à l'élement.
     * 
     * @param {int} depart Temps de départ de la rotation en millisecondes relatif au départ de la map.
     * @param {int} dureeRotation Durée de la rotation en millisecondes.
     * @param {float} degres Rotation à appliquer sur l'élement en degrés.
     * @param {AG.MouvementMap} mouvement Type de mouvement à effectuer (boucler, aller-retour, aller simple).
     */
    appliquerRotation(depart, dureeRotation, degres, mouvement) {
        this.rotation = true;

        this.debutRotation = depart;
        this.dureeRotation = dureeRotation;
        this.degres = degres;
        this.mouvementRotation = mouvement;

        if(this.debutRotation < 0) {
            this.debutRotation = 0;
        }

        if(this.dureeRotation < 1) {
            this.dureeRotation = 1;
        }
    }

    /**
     * Permet de mettre à jour la position initiale d'une forme.
     * Utile dans le cas des groupes, car lorsque l'on ajoute une forme la position initiale de
     * l'ensemble du groupe est susceptible de changer.
     */
    updatePosition() {
        this.positionInitialeX = this.element.getX();
        this.positionInitialeY = this.element.getY();
    }
}