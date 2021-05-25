import Directions from "./Global.js";

/**
 * Classe permettant de réceptionner les évènements.
 */
class AaaahEventHandler {
    constructor(aaaah) {
        this.aaaah = aaaah;

        this.droiteEnfonce = false;
        this.gaucheEnfonce = false;

        this.mouseEnfonce = false;

        this.rect = this.aaaah.container.$refs.zoneCanvas.getBoundingClientRect();
    }

    /**
     * Gestion des touches pressées.
     * 
     * @param {*} event 
     */
    keyDown(event) {
        event.preventDefault();
        this.eventAction(event, true);
    }
  
    /**
     * Gestion des touches relachées.
     * 
     * @param {*} event 
     */
    keyUp(event) {
        event.preventDefault();
        this.eventAction(event, false);
    }
  
    /**
     * Gestion des évènements souris.
     * 
     * @param {*} event 
     * @param {String} type Type d'évènement souris (U => Up / L => Left / D => Down / M => Move).
     */
    mouseEvent(event, type) {
        let partie = this.aaaah.getPartie();

        if(partie) {
            switch(type) {
            case 'U':   // Up
            case 'L':
                this.mouseEnfonce = false;
                break;
            
            case 'D':   // Down
            partie.getGuidage().start(event.clientX-this.rect.left, event.clientY-this.rect.top);
                this.mouseEnfonce = true;
                break;

            case 'M':   // Move
                if(this.mouseEnfonce) {
                    partie.getGuidage().dessiner(event.clientX-this.rect.left, event.clientY-this.rect.top);
                }
                break;
            }
        }
    }

    /**
     * Gestion des évènements claviers.
     * 
     * @param {*} event 
     * @param {Boolean} enfonce Si vrai alors la touche est enfoncé, sinon elle est relachée.
     */
    eventAction(event, enfonce) {
        let joueur = this.aaaah.getPartie().getJoueurPrincipal();
        
        if(!joueur)
            return;

        switch (event.keyCode) {
        case 40:    // flèche du bas
        case 83:    // S
            if(enfonce) {
                joueur.crier();
            }
            break;

        case 38:    // flèche du haut
        case 90:    // Z
            if(enfonce) {
                joueur.sauter();
            }
            break;

        case 39:    // flèche droite
        case 68:    // D

            if(enfonce) {
                joueur.setDirection(Directions.AvancerDroite);
                this.droiteEnfonce = true;
                this.gaucheEnfonce = false;
            }
            else {
                if(this.droiteEnfonce) {
                    joueur.setDirection(Directions.StatiqueDroite);
                    this.droiteEnfonce = false;
                }
            }

            break;

        case 37:    // flèche gauche
        case 81:    // Q

            if(enfonce) {
                joueur.setDirection(Directions.AvancerGauche);
                this.gaucheEnfonce = true;
                this.droiteEnfonce = false;
            }
            else {
                if(this.gaucheEnfonce) {
                    joueur.setDirection(Directions.StatiqueGauche);
                    this.gaucheEnfonce = false;
                }
            }

            break;
        }
     }

     /**
      * Gestion des évènements de redimensionnement de fenêtre.
      * 
      * @param {*} event 
      */
     resizeEvent(event) {
        this.rect = this.aaaah.container.$refs.zoneCanvas.getBoundingClientRect();
    }
}

export { 
    AaaahEventHandler 
};