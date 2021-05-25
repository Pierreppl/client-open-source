import AaaahJoueurAbstrait from "./JoueurAbstrait.js";
import AaaahJoueurSkin from "./Skin/JoueurSkin.js";

/**
 * Classe réprésentant les intéractions avec un joueur adverse.
 */
export default class AaaahJoueur extends AaaahJoueurAbstrait {
    /**
     * Constructeur.
     * 
     * @param {String} pseudo Pseudo de l'adversaire.
     * @param {Aaaah} jeu Instance du jeu sur laquelle on joue.
     */
    constructor(pseudo, jeu) {
        super(pseudo, new AaaahJoueurSkin(pseudo, 60, 320, jeu.foreground), jeu);
    }

    /**
     * Hérité.
     */
    contaminer(contamine) {
        // Si jaune (presque contaminé)
        if(!contamine) {
            this.skin.setCouleurPseudo('0xC9CD36');
        }
        // Si contamination effective
        else {
            this.skin.setCouleurPseudo('0xFF0044');
            this.contamine = true;
        }
    }

    /**
     * Hérité.
     */
    reset() {
        super.reset();
        this.skin.setCouleurPseudo('0x6C77C1');
    }

    /**
     * Appelé lorsqu'un cri adverse est effectué. Si le joueur principal se trouve proche du joueur courant, 
     * alors le joueur principal est projeté.
     * 
     * @param {int} x Position en x du joueur courant selon le serveur.
     * @param {int} y Position en y du joueur courant selon le serveur.
     */
    pousser(x, y) {
        let joueurPrincipal = this.aaaah.getPartie().getJoueurPrincipal();
        let jX = joueurPrincipal.getX();
        let jY = joueurPrincipal.getY();
        let c1 = jX - x + 4;
        let c2 = jY - y;

        if(Math.sqrt(c1 * c1 + c2 * c2) < 50) {
            let direction;

            if(joueurPrincipal.getX() < x) {
                direction = 0;
                joueurPrincipal.projeter(false, this);
            }
            else {
                direction = 1;
                joueurPrincipal.projeter(true, this);
            }
            this.aaaah.reseau.Envoie("IdA#" + jX + "#" + jY + "#" + direction);
        }
    }
}