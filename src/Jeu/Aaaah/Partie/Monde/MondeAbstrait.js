import * as AG from "../../Global.js";

/**
 * Classe abstraite permettant la gestion des mondes (maps officielles).
 */
export default class MondeAbstrait {
    /**
     * Constructeur.
     * 
     * @param {Aaaah} jeu Instance du jeu.
     */
    constructor(jeu) {
        this.aaaah = jeu;
        this.stage = jeu.stage;

        this.constantesFlexiblesModifMap = {};
        this.textures = [];
    }

    /**
     * Méthode à implémenter dans les mondes qui doivent intéragir de manière spéciale sur les joueurs.
     * La méthode est appelée à chaque calcul de physique du joueur.
     * 
     * @param {JoueurAbstrait} joueur Joueur auquel on veut appliquer une intéraction spéciale.
     */
    interactionsSpeciales(joueur) {}

    /**
     * Appelé à chaque frame.
     * 
     * @param {int} tempsRel Temps relatif en millisecondes depuis le début de la map.
     */
    tic(tempsRel) {}

    /**
     * Permet de modifier une constante sur ce monde.
     * 
     * @param {AG.ConstantesFlexibles} constante Constante fléxible à modifier.
     * @param {*} valeur Valeur à mettre dans la constante fléxible.
     */
    setConstanteFlexible(constante, valeur) {
        this.constantesFlexiblesModifMap[constante] = valeur;
    }

    /**
     * Permet de récupérer la valeur de la constante fléxible demandée.
     * Si aucune constante fléxible n'est déclarée pour cette constante, alors on renvoie la valeur de la constante.
     * 
     * @param {AG.ConstantesFlexibles} constante Constante fléxible.
     * @returns La valeur de la constante fléxible si elle est renseignée, sinon retourne la valeur de la constante portant le même nom.
     */
    getConstanteFlexible(constante) {
        switch(constante) {
            case AG.ConstantesFlexibles.GRAVITE_X:
                return typeof(this.constantesFlexiblesModifMap[constante]) == 'undefined' ? AG.GRAVITE_X : this.constantesFlexiblesModifMap[constante];
            case AG.ConstantesFlexibles.GRAVITE_Y:
                return typeof(this.constantesFlexiblesModifMap[constante]) == 'undefined' ? AG.GRAVITE_Y : this.constantesFlexiblesModifMap[constante];
            case AG.ConstantesFlexibles.PUISSANCE_CRI_X:
                return typeof(this.constantesFlexiblesModifMap[constante]) == 'undefined' ? AG.PUISSANCE_CRI_X : this.constantesFlexiblesModifMap[constante];
            case AG.ConstantesFlexibles.PUISSANCE_CRI_Y:
                return typeof(this.constantesFlexiblesModifMap[constante]) == 'undefined' ? AG.PUISSANCE_CRI_Y : this.constantesFlexiblesModifMap[constante];
            case AG.ConstantesFlexibles.TEMPS_ENTRE_CRI:
                return typeof(this.constantesFlexiblesModifMap[constante]) == 'undefined' ? AG.TEMPS_ENTRE_CRI : this.constantesFlexiblesModifMap[constante];
            case AG.ConstantesFlexibles.TEMPS_TRAIT_GUIDE:
                return typeof(this.constantesFlexiblesModifMap[constante]) == 'undefined' ? AG.TEMPS_TRAIT_GUIDE : this.constantesFlexiblesModifMap[constante];
            case AG.ConstantesFlexibles.TEMPS_ENTRE_SAUTS:
                return typeof(this.constantesFlexiblesModifMap[constante]) == 'undefined' ? AG.TEMPS_ENTRE_SAUTS : this.constantesFlexiblesModifMap[constante];
            case AG.ConstantesFlexibles.DEPLACEMENT_X:
                return typeof(this.constantesFlexiblesModifMap[constante]) == 'undefined' ? AG.DEPLACEMENT_X : this.constantesFlexiblesModifMap[constante];
            case AG.ConstantesFlexibles.DEPLACEMENT_CONTA_X:
                return typeof(this.constantesFlexiblesModifMap[constante]) == 'undefined' ? AG.DEPLACEMENT_CONTA_X : this.constantesFlexiblesModifMap[constante];
            case AG.ConstantesFlexibles.DUREE_PARTIE:
                return typeof(this.constantesFlexiblesModifMap[constante]) == 'undefined' ? AG.DUREE_PARTIE : this.constantesFlexiblesModifMap[constante];
            case AG.ConstantesFlexibles.BOOST:
                return typeof(this.constantesFlexiblesModifMap[constante]) == 'undefined' ? AG.BOOST : this.constantesFlexiblesModifMap[constante];
            case AG.ConstantesFlexibles.ZONES_GUIDABLE:
                return typeof(this.constantesFlexiblesModifMap[constante]) == 'undefined' ? AG.ZONES_GUIDABLE : this.constantesFlexiblesModifMap[constante];
            default:
                return null;
        }
    }

    /**
     * Ajoute une texture à la scène.
     * 
     * @param {PIXI.Texture} texture Texture à ajouter.
     * @param {PIXI.Container} stage Scène sur laquelle ajouter la texture.
     */
    ajouterTexture(texture, stage) {
        if(stage === undefined)
            this.stage.addChild(texture);
        else 
            stage.addChild(texture);

        this.textures.push(texture);
    }

    /**
     * Supprime le monde et toutes ses textures.
     */
    supprimer() {
        this.textures.forEach(element => {
            element.parent.removeChild(element);
        });
        delete this;
    }
}