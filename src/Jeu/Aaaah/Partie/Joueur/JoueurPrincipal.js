import AaaahJoueurAbstrait from "./JoueurAbstrait.js"
import Directions from "../../Global.js";
import * as Aaaah from "../../Aaaah.js";
import AaaahJoueurPrincipalSkin from "./Skin/JoueurPrincipalSkin.js";

/**
 * Classe réprésentant les intéractions avec le joueur principal.
 */
export default class AaaahJoueurPrincipal extends AaaahJoueurAbstrait {
    /**
     * Constructeur.
     * 
     * @param {String} pseudo Pseudo du joueur connecté.
     * @param {Aaaah} jeu Instance du jeu sur laquelle on joue.
     */
    constructor(pseudo, jeu) {
        super(pseudo, new AaaahJoueurPrincipalSkin(pseudo, 60, 320, jeu.foreground), jeu);

        this.flag = false;
        this.nbTicContaminations = 0;
        this.dernierTemps = Date.now();
    }

    /**
     * Hérité.
     */
    tic() {
        if(this.activer) {
            // Met à jour la valeur du curseur de cri
            let tempsDepuisDernierCri = Aaaah.TEMPS_TIC - this.tempsDernierCri;
            if(tempsDepuisDernierCri < this.TEMPS_ENTRE_CRI) {
                this.skin.updateCurseur(tempsDepuisDernierCri/this.TEMPS_ENTRE_CRI);
            }
            else {
                this.skin.updateCurseur(1);
            }

            let temps = Date.now();
            if(temps-this.dernierTemps >= 2000) {
                this.dernierTemps = temps;
                this.aaaah.reseau.Envoie("MvA#" + this.getX() + "#" + this.getY() + "#" + 
                                         (this.getVitesseX() * 100) + "#" + (this.getVitesseY() * 100));
            }

            super.tic();
        }
    }

    /**
     * Hérité.
     */
    crier() {
        if(this.isCriDisponible()) {
            this.cri = true;
            this.tempsDernierCri = Aaaah.TEMPS_TIC;

            this.aaaah.reseau.Envoie("IdB#" + this.getX() + "#" + this.getY());
        }
    }

    /**
     * Hérité.
     */
    setDirection(direction) {
        if(direction != this.directionCourante && this.activer) {
            this.directionCourante = direction;

            switch(direction) {
                case Directions.StatiqueGauche:
                case Directions.StatiqueDroite:
                    this.aaaah.reseau.Envoie("MvS#" + this.getX() + "#" + this.getY());
                    break;
                    
                case Directions.AvancerGauche:
                    this.aaaah.reseau.Envoie("MvG#" + this.getX() + "#" + this.getY());
                    break;
                case Directions.AvancerDroite:
                    this.aaaah.reseau.Envoie("MvD#" + this.getX() + "#" + this.getY());
                    break;
            }
        }
    }

    /**
     * Hérité.
     */
    sauter() {
        if(this.isSautDisponible()) {
            this.incontrolableY = true;
            this.vitesseY = -5;

            this.tempsDernierSaut = Aaaah.TEMPS_TIC;

            switch(this.directionCourante) {
                case Directions.AvancerGauche:
                    this.aaaah.reseau.Envoie("MvH#" + this.getX() + "#" + this.getY() + "#" + 2);
                    break;
                case Directions.AvancerDroite:
                    this.aaaah.reseau.Envoie("MvH#" + this.getX() + "#" + this.getY() + "#" + 1);
                    break;
                default:
                    this.aaaah.reseau.Envoie("MvH#" + this.getX() + "#" + this.getY() + "#" + 0);
            }
        }
    }

    /**
     * Hérité.
     */
    physique() {
        super.physique();

        if(this.estVivant && !this.contamine) {
            if(this.flag) {
                this.flag = false;
            }
            else {
                let contamines = this.aaaah.getPartie().getJoueursContamines();
                let taille = contamines.length;

                for(let i = 0; i < taille; ++i) {
                    let joueurConta = contamines[i];
                    let c1 = this.getX() - joueurConta.getX();
                    let c2 = this.getY() - joueurConta.getY();

                    if(Math.sqrt(c1*c1+c2*c2) < 10) {
                        this.nbTicContaminations++;

                        if(this.nbTicContaminations == 15 || taille < 2) {
                            this.contaminer(true);
                            this.aaaah.reseau.Envoie("ZoC#" + joueurConta.pseudo);
                        }
                        break;
                    }
                }
            }
        }
    }

    /**
     * Hérité.
     */
    contaminer(contamine) {
        super.contaminer(contamine);

        if(contamine) {
            this.skin.setCouleurPseudo('0xCB546B');
            this.skin.setVisibleCurseurCri(false);
        }
    }

    /**
     * Hérité.
     */
    reset() {
        super.reset();
        this.skin.setCouleurPseudo('0xC2C2DA');
        this.skin.setVisibleCurseurCri(true);
    }
}