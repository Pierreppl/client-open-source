import * as Aaaah from "../Aaaah.js";
import * as AG from "../Global.js";
import Ligne from "./Map/Formes/Ligne.js";
import Partie from "./Partie.js";

/**
 * Classe permettant la gestion du guidage.
 */
export default class Guidage {
    /**
     * Constructeur.
     * 
     * @param {Partie} partie Instance de la partie en cours.
     */
    constructor(partie) {
        this.aaaah = partie.aaaah;
        this.partie = partie;
        this.stage = this.partie.stage;
        this.listeLigne = [];

        this.x = null;
        this.y = null;
        this.ancienX = null;
        this.ancienY = null;

        this.ZONES_GUIDABLE = [];

        this.pseudoGuide = null;
    }

    /**
     * Appelé à chaque frame.
     */
    tic() {
        if(this.ancienX && this.x && (this.ancienX != this.x || this.ancienY != this.y)) {
            this.ajouterTrait(this.x, this.y);
        }

        // Supprime les lignes dont le temps a expiré.
        let TEMPS_TRAIT_GUIDE = this.partie.getConstanteFlexible(AG.ConstantesFlexibles.TEMPS_TRAIT_GUIDE);
        while(this.listeLigne.length > 0 && Aaaah.TEMPS_TIC - this.listeLigne[0][0] > TEMPS_TRAIT_GUIDE) {
            this.listeLigne.shift()[1].supprimer();
        }
    }

    /**
     * Initialise le début d'un traçage (quand on enfonce le bouton gauche de la souris).
     * 
     * @param {int} x Position en abscisses du début du traçage.
     * @param {int} y Position en ordonnées du début du traçage.
     */
    initialiserTrait(x, y) {
        this.x = null;
        this.y = null;

        this.ancienX = x;
        this.ancienY = y;
    }

    /**
     * Initialise le début d'un traçage (quand on enfonce le bouton gauche de la souris).
     * Utilisé lorsque le joueur courant est guide et doit envoyer les données de son guidage.
     * 
     * @param {int} x Position en abscisses du début du traçage.
     * @param {int} y Position en ordonnées du début du traçage.
     */
    start(x, y) {
        if(this.estGuide()) {
            this.aaaah.reseau.Envoie("DeS#" + x + "#" + y);
            this.initialiserTrait(x, y);
        }
    }

    /**
     * Ajoute une nouvelle ligne au traçage si la souris a bougé tout en restant enfoncée 
     * depuis le dernier tic.
     * 
     * @param {int} x Position d'arrivée en abscisses de la nouvelle ligne.
     * @param {int} y Position d'arrivée en ordonnées de la nouvelle ligne.
     */
    ajouterTrait(x, y) {
        this.ZONES_GUIDABLE = this.partie.getConstanteFlexible(AG.ConstantesFlexibles.ZONES_GUIDABLE);
        let pos = this.calculerLigne(this.ancienX, this.ancienY, x, y);

        if(pos !== null) {
            if(this.estGuide()) {
                this.aaaah.reseau.Envoie("DeT#" + pos[2] + "#" + pos[3]);
            }

            let ligne = new Ligne(this.stage,
                pos[0],
                pos[1],
                pos[2] - pos[0],
                pos[3] - pos[1]);

            this.listeLigne.push([Date.now(), ligne]);
        }

        this.ancienX = x;
        this.ancienY = y;
    }

    /**
     * Modifie la position d'arrivée de la nouvelle ligne pour qu'elle arrive à cette position
     * au moment du tic.
     * 
     * @param {int} x Position d'arrivée en abscisses de la nouvelle ligne.
     * @param {int} y Position d'arrivée en ordonnées de la nouvelle ligne.
     */
    dessiner(x, y) {
        if(this.estGuide()) {
            this.x = x;
            this.y = y;
        }
    }

    /**
     * Nettoie tous les traits de guidage.
     */
    clear() {
        while(this.listeLigne.length > 0) {
            this.listeLigne.shift()[1].supprimer();
        }
    }

    /**
     * Permet de décaller le guidage sur l'axe des abscisses.
     * 
     * @param {float} x Décallage du guidage de x sur l'axe des abscisses.
     */
    decallerX(x) {
        this.listeLigne.forEach(e => {
            e[1].setX(e[1].getX()+x);
        });
    }

    /**
     * Permet de décaller le guidage sur l'axe des ordonnées.
     * 
     * @param {float} y Décallage du guidage de y sur l'axe des ordonnées.
     */
    decallerY(y) {
        this.listeLigne.forEach(e => {
            e[1].setY(e[1].getY()+y);
        });
    }

    /**
     * Permet de savoir si un rectangle de coin supérieur gauche (x1,y1) et de coin inférieur droit (x2,y2)
     * contient un point de coordonnées (x,y).
     * 
     * @param {float} x1 Valeur en abscisses du coin supérieur gauche du rectangle.
     * @param {float} x2 Valeur en abscisses du coin inférieur droit du rectangle.
     * @param {float} y1 Valeur en ordonnées du coin supérieur gauche du rectangle.
     * @param {float} y2 Valeur en ordonnées du coin inférieur droit du rectangle.
     * @param {float} x Valeur en abscisses du point.
     * @param {float} y Valeur en ordonnées du point.
     * 
     * @return Vrai si le point est contenu dans le rectangle, faux sinon.
     */
    contient(x1, x2, y1, y2, x, y) {
        return x >= x1 && x <= x2 && y >= y1 && y <= y2;
    }

    /**
     * Permet d'adapter les traits du guide en fonction des zones guidables effectives sur la map.
     *
     * @param {float} ancienX Valeur en abscisses du trait.
     * @param {float} ancienY Valeur en ordonnées du trait.
     * @param {float} x Position en abscisses absolue de destination du trait.
     * @param {float} y Position en ordonnées absolue de destination du trait.
     * 
     * @return Un tableau possédant les valeurs adaptées de la ligne si le traçage se trouve totalement ou
     * en partie dans une zone guidage, sinon retourne null.
     */
    calculerLigne(ancienX, ancienY, x, y) {
        for(let i = 0; i < this.ZONES_GUIDABLE.length; i++) {
            let x1 = this.ZONES_GUIDABLE[i][0], x2 = this.ZONES_GUIDABLE[i][1], y1 = this.ZONES_GUIDABLE[i][2], y2 = this.ZONES_GUIDABLE[i][3];

            if(this.contient(x1, x2, y1, y2, ancienX, ancienY) && this.contient(x1, x2, y1, y2, x, y))
                return [ancienX, ancienY, x, y];
            else if(this.contient(x1, x2, y1, y2, ancienX, ancienY)) {
                let c = this.intersection(x1, x2, y1, y2);
                return [ancienX, ancienY, c[0], c[1]];
            }
            else if(this.contient(x1, x2, y1, y2, x, y)) {
                let c = this.intersection(x1, x2, y1, y2);
                return [c[0], c[1], x, y];
            }
        }
        return null;
    }

    /**
     * Permet de déterminer le point d'intersection entre le trait du guide et 
     * le rectangle qui délimite la zone guidage.
     * 
     * @param {float} x1 Valeur en abscisses du coin supérieur gauche du rectangle.
     * @param {float} x2 Valeur en abscisses du coin inférieur droit du rectangle.
     * @param {float} y1 Valeur en ordonnées du coin supérieur gauche du rectangle.
     * @param {float} y2 Valeur en ordonnées du coin inférieur droit du rectangle.
     * 
     * @return L'un des points d'intersection s'il y en a, sinon null.
     */
    intersection(x1, x2, y1, y2) {
        if(this.ancienX == this.x)
            this.x++;

         let t = (this.ancienY - this.y) / (this.ancienX - this.x);

         if(this.btwn(this.ancienX, x1, this.x) || this.btwn(this.x, x1, this.ancienX))
            return [x1, this.ancienY - t * (this.ancienX - x1)];
         if(this.btwn(this.ancienX, x2, this.x) || this.btwn(this.x, x2, this.ancienX))
            return [x2, this.ancienY - t * (this.ancienX - x2)];
         if(this.btwn(this.ancienY, y1, this.y) || this.btwn(this.y, y1, this.ancienY))
            return [(y1 - this.ancienY) / t + this.ancienX, y1];
         if(this.btwn(this.ancienY, y2, this.y) || this.btwn(this.y, y2, this.ancienY))
            return [(y2 - this.ancienY) / t + this.ancienX, y2];

         return null;
    }

    /**
     * Permet de savoir si une valeur est entre deux autre valeur.
     * 
     * @param {float} x1 Valeur inférieure.
     * @param {float} entre Valeur dont on veut savoir si elle est comprise entre x1 et x2.
     * @param {float} x2 Valeur supérieure
     * 
     * @return Vrai si la valeur est comprise entre x1 et x2, faux sinon.
     */
    btwn(x1, entre, x2) {
        return entre >= x1 && entre <= x2;
    }

    /**
     * Modifie le guide.
     * 
     * @param {String} pseudo Pseudo du nouveau guide.
     */
    setGuide(pseudo) {
        this.pseudoGuide = pseudo;
    }

    /**
     * @returns Le pseudo du guide courant.
     */
    getGuide() {
        return this.pseudoGuide != null ? this.pseudoGuide : "";
    }

    /**
     * @returns Vrai si le joueur courant est guide, faux sinon.
     */
    estGuide() {
        return this.aaaah.refEtat.joueur.nom === this.pseudoGuide;
    }
}