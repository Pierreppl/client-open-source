import * as SM from "../../../AaaahSpritesManager.js";
import * as PIXI from "pixi.js";
import Directions from "../../../Global.js";

/**
 * Classe graphique permettant de réprésenter l'apparence d'un joueur sur une scène et d'intéragir avec lui.
 */
class AaaahJoueurSkin {
    /**
     * Constructeur.
     * 
     * @param {String} pseudo Pseudo du joueur.
     * @param {int} x Position d'origine en abscisses du joueur.
     * @param {int} y Position d'origine en ordonnées du joueur.
     * @param {PIXI.Container} stage Scène sur laquelle le joueur est affiché.
     */
    constructor(pseudo, x, y, stage) {
        this.stage = stage;

        // Gestions du stickman
        this.animations = [];
        this.animations[SM.Sprites.AvancerDroite] = SM.AaaahSpritesManager.getSprite(SM.Sprites.AvancerDroite);
        this.animations[SM.Sprites.AvancerGauche] = SM.AaaahSpritesManager.getSprite(SM.Sprites.AvancerGauche);
        this.animations[SM.Sprites.StatiqueDroite] = SM.AaaahSpritesManager.getSprite(SM.Sprites.StatiqueDroite);
        this.animations[SM.Sprites.StatiqueGauche] = SM.AaaahSpritesManager.getSprite(SM.Sprites.StatiqueGauche);

        this.animations[SM.Sprites.AvancerDroite].play();
        this.animations[SM.Sprites.AvancerGauche].play();

        this.animations[SM.Sprites.AvancerDroite].position.set(-2, 0);
        this.animations[SM.Sprites.AvancerGauche].position.set(-1, 0);

        this.skin = new PIXI.Container();
        this.skin.pivot.x = 6;
        
        this.skin.x = x;
        this.skin.y = y;
        
        this.animations.forEach(sprite => {
            this.skin.addChild(sprite);
            sprite.visible = false;
        });

        this.animationCourante = this.animations[SM.Sprites.StatiqueDroite];
        this.animationCourante.visible = true;

        // Gestion de l'écriture du pseudo
        const style = new PIXI.TextStyle({
            fontFamily: 'Arial',
            fontSize: 12,
            fill: '0x6C77C1'
        });
        this.pseudo = new PIXI.Text(pseudo, style);
        this.pseudo.anchor.set(0.5, 0.5);
        this.pseudo.position.set(7, -11);
        this.skin.addChild(this.pseudo);

        // Gestion du cri
        this.cri = SM.AaaahSpritesManager.getSprite(SM.Sprites.Cri);
        this.skin.addChild(this.cri);

        this.cri.position.set(-8.5, 3);
        this.cri.loop = false;
        this.cri.visible = false;

        this.stage.addChild(this.skin);
    }

    /**
     * Met à jour l'affichage du stickman en fonction de son mouvement.
     * 
     * @param {Directions} direction Nouveau mouvement du stickman.
     */
    update(direction) {
        this.animationCourante.visible = false;

        switch(direction) {
            case Directions.AvancerDroite:
                this.animationCourante = this.animations[SM.Sprites.AvancerDroite];
                break;

            case Directions.AvancerGauche:
                this.animationCourante = this.animations[SM.Sprites.AvancerGauche];
                break;

            case Directions.StatiqueGauche:
                this.animationCourante = this.animations[SM.Sprites.StatiqueGauche];
                break;
            
            default:
                this.animationCourante = this.animations[SM.Sprites.StatiqueDroite];
        }

        this.animationCourante.visible = true;
    }

    /**
     * Déplace le skin sur l'axe des abscisses relativement à sa position.
     * 
     * @param {int} x Déplacement sur l'axe des abscisses.
     */
    setRelX(x) {
        this.skin.x += x;
    }

    /**
     * Déplace le skin sur l'axe des ordonnées relativement à sa position.
     * 
     * @param {int} y Déplacement sur l'axe des ordonnées.
     */
    setRelY(y) {
        this.skin.y += y;
    }

    /**
     * Déplace le skin de façon absolue sur l'axe des abscisses.
     * 
     * @param {int} x Déplacement absolu sur l'axe des abscisses.
     */
    setX(x) {
        this.skin.x = x;
    }

    /**
     * Déplace le skin de façon absolue sur l'axe des ordonnées.
     * 
     * @param {int} y Déplacement absolu sur l'axe des ordonnées.
     */
    setY(y) {
        this.skin.y = y;
    }

    /**
     * Permet de récupérer la position en abscisses du skin.
     * 
     * @return La position en x du skin.
     */
    getX() {
        return this.skin.x;
    }

    /**
     * Permet de récupérer la position en ordonnées du skin.
     * 
     * @return La position en y du skin.
     */
    getY() {
        return this.skin.y;
    }

    /**
     * Lance l'animation du cri.
     */
    crier() {
        this.cri.visible = true;
        this.cri.gotoAndPlay(0);
    }

    /**
     * Supprime le skin de la scène et le supprime.
     */
    supprimer() {
        this.stage.removeChild(this.skin);
    }

    /**
     * Affiche/cache le skin du joueur.
     * 
     * @param {Boolean} visible Si vrai affiche le skin, sinon le cache.
     */
    visible(visible) {
        for (let i = 0; i < this.skin.children.length; ++i) {
            this.skin.children[i].visible = visible;
        }

        if(visible) {
            this.animationCourante = this.animations[SM.Sprites.StatiqueDroite];
            this.animations[SM.Sprites.AvancerDroite].visible = false;
            this.animations[SM.Sprites.AvancerGauche].visible = false;
            this.animations[SM.Sprites.StatiqueGauche].visible = false;
            this.cri.visible = false;
        }
    }
    
    /**
     * Modifie la couleur d'affichage du pseudo.
     * 
     * @param {String} couleur Nouvelle couleur du pseudo en héxadécimal.
     */
    setCouleurPseudo(couleur) {
        this.pseudo.style.fill = couleur;
    }
}

export default AaaahJoueurSkin;