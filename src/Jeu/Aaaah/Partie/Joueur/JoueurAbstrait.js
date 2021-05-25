import * as Joueur from "../../../JoueurJeu.js";
import * as Aaaah from "../../Aaaah.js";
import Directions from "../../Global.js";
import * as AG from "../../Global.js";

/**
 * Classe abstraite représentant les intéractions de base avec un joueur.
 */
export default class AaaahJoueurAbstrait extends Joueur.JoueurJeu {
    /**
     * Constructeur.
     * 
     * @param {String} pseudo Pseudo du joueur.
     * @param {AaaahJoueurSkin} skin Apparence du joueur.
     * @param {Aaaah.Aaaah} jeu Instance du jeu sur lequel le joueur joue.
     */
    constructor(pseudo, skin, jeu) {
        super(pseudo, AG.MAX_VITESSE_X, AG.MAX_VITESSE_Y);
        this.aaaah = jeu;
        this.skin = skin;

        this.TEMPS_ENTRE_CRI = AG.TEMPS_ENTRE_CRI;
        this.TEMPS_ENTRE_SAUTS = AG.TEMPS_ENTRE_SAUTS;
        this.DEPLACEMENT_X = AG.DEPLACEMENT_X;
        this.DEPLACEMENT_CONTA_X = AG.DEPLACEMENT_CONTA_X;
        this.GRAVITE_X = AG.GRAVITE_X;
        this.GRAVITE_Y = AG.GRAVITE_Y;
        this.PUISSANCE_CRI_X = AG.PUISSANCE_CRI_X;
        this.PUISSANCE_CRI_Y = AG.PUISSANCE_CRI_Y;
        this.BOOST = AG.BOOST;

        this.setActiver(false);
        this.reset();
    }

    /**
     * Réinitialise le joueur.
     */
    reset() {
        this.directionCourante = Directions.StatiqueDroite; // Direction du stickman

        this.cri = false;                                   // Si vrai => crie au prochain tic
        this.tempsDernierCri = Date.now();                  // Temps en ms du dernier cri
        this.tempsDernierSaut = 0;

        this.incontrolableY = false;                        // Si vrai => soumis à la gravité
        this.ticVide = 0;                                   // Nb de tic depuis qu'on est soumis à la gravité

        this.vitesseX = 0;
        this.vitesseY = 0;

        this.estVivant = true;
        this.contamine = false;
    }

    /**
     * Appelé à chaque frame.
     */
    tic() {
        if(this.activer) {
            // Màj des constantes
            this.updateConstantes();

            // Met à jour l'affichage du stickman en fonction de la direction
            this.skin.update(this.directionCourante);

            // Gestion de l'affichage du cri
            if(this.cri) {
                this.skin.crier();
                this.cri = false;
            }

            // Déplace les joueurs selon la physique du jeu
            this.physique();
        }
    }

    /**
     * Gestion des demandes de cri. Si le dernier cri est assez ancien on accepte la demande.
     */
    crier() {
        if(this.isCriDisponible()) {
            this.cri = true;
            this.tempsDernierCri = Aaaah.TEMPS_TIC;
        }
    }

    /**
     * Projète le joueur courant à la suite d'un cri.
     * 
     * @param {Boolean} droite Si vrai, le cri pousse vers la droite, sinon vers la gauche.
     * @param {AaaahJoueurAbstrait} auteur Auteur du cri.
     */
    projeter(droite, auteur) {
        let direction = droite ? 1 : -1;

        this.vitesseY = this.PUISSANCE_CRI_Y;
        if(this.contamine) {
            this.vitesseX += this.PUISSANCE_CRI_X*direction*2;
        }
        else {
            this.vitesseX += this.PUISSANCE_CRI_X*direction;
        }
    }

    /**
     * Modifie la direction du joueur.
     * 
     * @param {Directions} direction Nouvelle direction du joueur.
     */
    setDirection(direction) {
        if(this.activer) {
            this.directionCourante = direction;
        }
    }

    /**
     * Gestion des demandes de saut. Si le joueur n'est pas attiré par la gravité, il peut sauter.
     */
    sauter() {
        if(this.isSautDisponible()) {
            this.incontrolableY = true;
            this.vitesseY = -5;

            this.tempsDernierSaut = Aaaah.TEMPS_TIC;
        }
    }

    /**
     * Calcul des éléments de physique qui se produisent à chaque frame.
     */
    physique() {
        // Gestion des intéractions spéciales des mondes
        this.aaaah.getPartie().interactionsSpeciales(this);

        if (this.pseudo === this.aaaah.refEtat.joueur.nom) {
            // Gestion de la mort
            if(this.getY() > 380 || (this.getX() > 740 && this.getY() > 70)) {
                this.aaaah.reseau.Envoie("IdX");
            }

            // Gestion de la victoire
            if((this.getX() > 740 && this.getY() < 60) && !this.contamine) {
                this.aaaah.reseau.Envoie("IdW");
            }
        }

        // On calcule la vitesse pour ce tic
        // La vitesse est le mouvement qui n'est pas dû au déplacement
        this.calculerVitesseX();
        this.vitesseY += this.GRAVITE_Y;

        // Mouvement sur l'axe des abscisses pour ce tic
        let mouvementX = this.vitesseX + this.calculerDeplacementX();

        let sensVitesseX = (mouvementX < 0 && this.BOOST >= 0 || mouvementX >= 0 && this.BOOST < 0) ? -1 : 1;
        let sensVitesseY = this.vitesseY < 0 ? -1 : 1; // -1 si vers le haut, 1 si vers le bas
        let vitesseXABS = Math.floor(mouvementX * sensVitesseX * this.BOOST);
        let vitesseYABS = Math.floor(this.vitesseY * sensVitesseY);

        let plusGrand = vitesseXABS > vitesseYABS ? vitesseXABS : vitesseYABS;
        plusGrand = plusGrand > 0 ? plusGrand : 1;
        let puissance = plusGrand > 2 ? 2 : 1;

        let X_Ok = false;
        let Y_Ok = false;

        for(let i = 0; i < plusGrand; i += puissance) {
            if(i < vitesseXABS) {
                this.setRelX(sensVitesseX*puissance);
            }
           
            if(i < vitesseYABS) {
                this.setRelY(sensVitesseY*puissance);
            }

            let x = this.getX();
            let y = this.getY();
            let collisionDroite = this.aaaah.getPartie().detecterCollision(x+AG.PD.x, y+AG.PD.y);
            let collisionGauche = this.aaaah.getPartie().detecterCollision(x+AG.PG.x, y+AG.PG.y);
            let collisionBas = this.aaaah.getPartie().detecterCollision(x+AG.PB.x, y+AG.PB.y);

            if(collisionDroite && collisionGauche && collisionBas) {
                let mz = this.contamine ? -1 : 1;

                if(this.vitesseX != 0) {
                    this.setRelX(-2*mz);
                }
                this.setRelY(2*mz);

                this.vitesseX = 0;
                this.vitesseY = 0;
                break;
            }

            if(collisionDroite || collisionGauche) {
                if(sensVitesseY == -1 && !collisionBas) {
                    Y_Ok = true;
                    this.setRelY(1);
                    this.vitesseY = -this.vitesseY;
                }

                this.setRelX(2*puissance*(collisionDroite ? -1 : 1));
                this.vitesseX = 0;
                X_Ok = true;
            }

            if(collisionBas) {
                if(sensVitesseY == -1 && this.incontrolableY) {
                    this.vitesseY = 0;
                }
                else {
                    this.setRelY(-1);
                    if(this.aaaah.getPartie().detecterCollision(this.getX()+AG.PB.x, this.getY()+AG.PB.y)) {
                        this.setRelY(-1);
                    }
                    this.vitesseY = 0;
                    Y_Ok = true;
                    this.ticVide = 0;
                    this.incontrolableY = false;
                }
            }
            else {
                this.ticVide++;
                if(this.ticVide == 30) {
                    this.incontrolableY = true;
                }
            }

            if(X_Ok && Y_Ok) {
                break;
            }
        }

        if(this.getX() < AG.PD.x) {
            this.setX(AG.PD.x);
        }

        if(this.getY() > 600) {
            this.setY(600);
        }
    }

    /**
     * Déplace le joueur sur l'axe des abscisses relativement à sa position.
     * 
     * @param {int} x Déplacement sur l'axe des abscisses.
     */
    setRelX(x) {
        this.skin.setRelX(x);
    }

    /**
     * Déplace le joueur sur l'axe des ordonnées relativement à sa position.
     * 
     * @param {int} y Déplacement sur l'axe des ordonnées.
     */
    setRelY(y) {
        this.skin.setRelY(y);
    }

    /**
     * Déplace le joueur de façon absolue sur l'axe des abscisses.
     * 
     * @param {int} x Déplacement absolu sur l'axe des abscisses.
     */
    setX(x) {
        this.skin.setX(x);
    }

    /**
     * Déplace le joueur de façon absolue sur l'axe des ordonnées.
     * 
     * @param {int} y Déplacement absolu sur l'axe des ordonnées.
     */
    setY(y) {
        this.skin.setY(y);
    }

    /**
     * Permet de récupérer la position en abscisses du joueur.
     * 
     * @return La position en x du joueur.
     */
    getX() {
        return this.skin.getX();
    }

    /**
     * Permet de récupérer la position en ordonnées du joueur.
     * 
     * @return La position en y du joueur.
     */
    getY() {
        return this.skin.getY();
    }

    /**
     * Modifie la vitesse que le joueur possède sur l'axe des abscisses.
     * 
     * @param {float} vX Nouvelle valeur de vitesse en x.
     */
    setVitesseX(vX) {
        this.vitesseX = vX;
    }

    /**
     * Modifie la vitesse que le joueur possède sur l'axe des ordonnées.
     * 
     * @param {float} vY Nouvelle valeur de vitesse en y.
     */
    setVitesseY(vY) {
        this.vitesseY = vY;
    }

    /**
     * Modifie le taux de dispoibilité du cri (!= 1 => cri pas disponible).
     * 
     * @param {float} pourcentage Pourcentage de disponibilité du cri entre 0 et 1.
     */
    setPourcentageCri(pourcentage) {
        if(pourcentage >= 0 && pourcentage <= 1) {
            this.tempsDernierCri = Aaaah.TEMPS_TIC - this.TEMPS_ENTRE_CRI*pourcentage;
        }
    }

    /**
     * Met à jour les nouvelles vitesses en fonction de la gravité qui est exercée.
     */
    calculerVitesseX() {
        if(this.vitesseX > 0) {
            this.vitesseX -= this.GRAVITE_X;
            if(this.vitesseX < 0) {
                this.vitesseX = 0;
            }
        }
        else {
            if(this.vitesseX < 0) {
                this.vitesseX += this.GRAVITE_X;
                if(this.vitesseX > 0) {
                    this.vitesseX = 0;
                }
            }
        }
    }

    /**
     * Récupère la bonne valeur de déplacement en fonction de l'état du joueur.
     */
    calculerDeplacementX() {
        switch(this.directionCourante) {
            case Directions.AvancerDroite:
                return this.contamine ? this.DEPLACEMENT_CONTA_X : this.DEPLACEMENT_X;

            case Directions.AvancerGauche:
                return (this.contamine ? this.DEPLACEMENT_CONTA_X : this.DEPLACEMENT_X)*-1;

            default:
                return 0;
        }
    }

    /**
     * Met à jour les constantes fléxibles.
     */
    updateConstantes() {
        this.TEMPS_ENTRE_CRI = this.aaaah.getPartie().getConstanteFlexible(AG.ConstantesFlexibles.TEMPS_ENTRE_CRI);
        this.TEMPS_ENTRE_SAUTS = this.aaaah.getPartie().getConstanteFlexible(AG.ConstantesFlexibles.TEMPS_ENTRE_SAUTS);
        this.DEPLACEMENT_X = this.aaaah.getPartie().getConstanteFlexible(AG.ConstantesFlexibles.DEPLACEMENT_X);
        this.DEPLACEMENT_CONTA_X = this.aaaah.getPartie().getConstanteFlexible(AG.ConstantesFlexibles.DEPLACEMENT_CONTA_X);
        this.GRAVITE_X = this.aaaah.getPartie().getConstanteFlexible(AG.ConstantesFlexibles.GRAVITE_X);
        this.GRAVITE_Y = this.aaaah.getPartie().getConstanteFlexible(AG.ConstantesFlexibles.GRAVITE_Y);
        this.PUISSANCE_CRI_X = this.aaaah.getPartie().getConstanteFlexible(AG.ConstantesFlexibles.PUISSANCE_CRI_X);
        this.PUISSANCE_CRI_Y = this.aaaah.getPartie().getConstanteFlexible(AG.ConstantesFlexibles.PUISSANCE_CRI_Y);
        this.BOOST = this.aaaah.getPartie().getConstanteFlexible(AG.ConstantesFlexibles.BOOST);
    }

    /**
     * Supprime le joueur.
     */
    supprimer() {
        this.skin.supprimer();
    }

    /**
     * Active ou désactive le joueur. Un joueur en jeu est forcément activé.
     * 
     * @param {Boolean} activer Si vrai le joueur est activé, sinon il est désactivé.
     */
    setActiver(activer) {
        this.activer = activer;
        this.skin.visible(activer);
        this.estVivant = activer;
    }

    /**
     * Si le joueur est en train de se déplacer, alors il s'arrête. Sinon il ne se passe rien.
     */
    stop() {
        if(this.directionCourante == Directions.AvancerDroite) {
            this.directionCourante = Directions.StatiqueDroite;
        }
        else if(this.directionCourante == Directions.AvancerGauche) {
            this.directionCourante = Directions.StatiqueGauche;
        }
    }

    /**
     * Passe le joueur dans l'état presque contaminé (jaune), ou contaminé, ce qui le tue.
     * 
     * @param {Boolean} contamine Si vrai le joueur est contaminé, sinon il est jaune.
     */
    contaminer(contamine) {
        if(contamine) {
            this.contamine = true;
            this.estVivant = false;
        }
    }

    /**
     * Permet de savoir si le cri est disponible ou non.
     * 
     * @return Vrai si le cri est disponible, faux sinon.
     */
    isCriDisponible() {
        return Aaaah.TEMPS_TIC - this.tempsDernierCri >= this.TEMPS_ENTRE_CRI && this.activer && this.estVivant;
    }

    /**
     * Permet de savoir si le saut est disponible ou non.
     * 
     * @return Vrai si le saut est disponible, faux sinon.
     */
    isSautDisponible() {
        return !this.incontrolableY && Aaaah.TEMPS_TIC - this.tempsDernierSaut >= this.TEMPS_ENTRE_SAUTS && this.activer;
    }
}