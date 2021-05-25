import Ligne from "./Formes/Ligne.js";
import Rectangle from "./Formes/Rectangle.js";
import Courbe from "./Formes/Courbe.js";
import Ellipse from "./Formes/Ellipse.js";
import Polygone from "./Formes/Polygone.js";
import Groupe from "./Groupe.js";
import * as AG from "../../Global.js";

/**
 * Classe de gestion d'une map.
 */
export default class Map {
    constructor(partie) {
        this.partie = partie;
        this.stage = partie.stage;
        this.listeFormes = [];
    }

    /**
     * Appelé à chaque frame.
     * 
     * @param {int} tempsRel Temps relatif en millisecondes depuis le début de la map.
     */
    tic(tempsRel) {
        this.listeFormes.forEach(e => e.mouvement.tic(tempsRel));
    }

    /**
     * Charge une map.
     * 
     * @param {String} carte Code de la map en format XML.
     * @param {String} auteur Auteur de la map qui est affiché s'il n'apparaît pas dans le code.
     */
    charger(carte, auteur) {

        // On vide la map
        this.vider();

        carte = carte.replace(/> +/g, '>');

        let parser = new DOMParser();
        let xmlDoc = parser.parseFromString(carte, "text/xml");

        if(xmlDoc.documentElement.nodeName == "parsererror" || xmlDoc.getRootNode().firstChild.childNodes.length !== 2) {
            return;
        }

        let racine = xmlDoc.getRootNode().firstChild;

        let nomMap = "-";
        let auteurMap = "-";

        let nAttr = racine.getAttribute('N');
        if(nAttr != null && nAttr != "") {
            nomMap = nAttr;
        }

        let aAttr = racine.getAttribute('A');
        if(aAttr != null && aAttr != "") {
            auteurMap = aAttr;
        }
        else {
            auteurMap = auteur;
        }

        this.partie.setInfoMap(nomMap, auteurMap);
        
        let groupes = racine.childNodes[0];
        let formes = racine.childNodes[1];

        // Gestion des groupes
        for(let i = 0; i < groupes.childNodes.length; i++) {
            let groupeXML = groupes.childNodes[i];
            let groupePIXI = new Groupe();
            this.listeFormes.push(groupePIXI);

            for(let j = 0; j < groupeXML.childNodes.length; j++) {
                let formeXML = groupeXML.childNodes[j];
                let formePIXI = this.creerForme(formeXML);

                if(formePIXI !== null) {
                    groupePIXI.ajouter(formePIXI);

                    // On ne lit que les mouvements de la première forme d'un groupe
                    if(j == 0) {
                        this.creerMouvements(formeXML, groupePIXI);
                    }
                }
            }
        }

        // Gestion des formes simples
        for(let i = 0; i < formes.childNodes.length; i++) {
            let formeXML = formes.childNodes[i];
            let formePIXI = this.creerForme(formeXML);

            if(formePIXI !== null) {
                this.listeFormes.push(formePIXI);
                this.creerMouvements(formeXML, formePIXI);
            }
        }
    }

    /**
     * Crée une forme à partir d'un noeud XML.
     * 
     * @param {ChildNode} formeXML Noeud XML représentant la forme.
     * @return Une forme ou null si la formeXML est invalide.
     */
    creerForme(formeXML) {
        let pAttr = formeXML.getAttribute('P');
        if(pAttr != null && pAttr != "") {
            let valeurs = this.splitValeurs(pAttr);

            if(valeurs.length === 0) {
                return null;
            }

            // Création de la forme
            switch(formeXML.nodeName) {
                case 'L': // Ligne
                    if(valeurs.length === 5) {
                        return new Ligne(this.stage, valeurs[1], valeurs[2], valeurs[3], valeurs[4], valeurs[0]);
                    }
                    return null;
    
                case 'C': // Courbe
                    if(valeurs.length === 7) {
                        return new Courbe(this.stage, valeurs[1], valeurs[2], valeurs[3], valeurs[4], valeurs[5], valeurs[6], valeurs[0]);
                    }
                    return null;
    
                case 'R': // Rectangle
                    if(valeurs.length === 6) {
                        return new Rectangle(this.stage, valeurs[1], valeurs[2], valeurs[3], valeurs[4], valeurs[5] == 1, valeurs[0]);
                    }
                    return null;
                
                case 'E': // Ellipse
                    if(valeurs.length === 6) {
                        return new Ellipse(this.stage, valeurs[1], valeurs[2], valeurs[3], valeurs[4], valeurs[5] == 1, valeurs[0]);
                    }
                    return null;
    
                case 'P': // Polygone
                    if(valeurs.length === 6) {
                        let zAttr = formeXML.getAttribute('Z');
                        if(zAttr != null && zAttr != "") {
                            let path = this.splitValeurs(zAttr.replace(/;/g, ','));
                            if(path.length >= 2) {
                                return new Polygone(this.stage, valeurs[1], valeurs[2], path, valeurs[5] == 1, valeurs[0]);
                            }
                        }
                    }
                    return null;

                default:
                    return null;
            }
        }
        else {
            return null;
        }
    }

    /**
     * Applique un mouvement à une forme ou un groupe.
     * @param {ChildNode} XML Noeuf XML représentant le mouvement.
     * @param {*} formePIXI Forme ou groupe auquel appliquer le mouvement.
     */
    creerMouvements(XML, formePIXI) {
        for(let i = 0; i < XML.childNodes.length; i++) {
            let mouvement = XML.childNodes[i];
            
            let pAttr = mouvement.getAttribute('P');
            if(pAttr != null && pAttr != "") {
                let valeurs = this.splitValeurs(pAttr);

                switch(mouvement.nodeName) {
                    case 'T': // Translation
                        if(valeurs.length === 5) {
                            let mouvement;

                            if(valeurs[4] == 1) {
                                mouvement = AG.MouvementMap.Boucler;
                            }
                            else if(valeurs[4] == 2) {
                                mouvement = AG.MouvementMap.AllerRetour;
                            }
                            else {
                                mouvement = AG.MouvementMap.Stop;
                            }

                            formePIXI.mouvement.appliquerTranslation(valeurs[0]*1000, valeurs[1]*1000, valeurs[2], valeurs[3], mouvement);
                        }
                        break;

                    case 'R': // Rotation
                        if(valeurs.length === 4) {
                            let mouvement;

                            if(valeurs[3] == 1) {
                                mouvement = AG.MouvementMap.Boucler;
                            }
                            else if(valeurs[3] == 2) {
                                mouvement = AG.MouvementMap.AllerRetour;
                            }
                            else {
                                mouvement = AG.MouvementMap.Stop;
                            }

                            formePIXI.mouvement.appliquerRotation(valeurs[0]*1000, valeurs[1]*1000, valeurs[2], mouvement);
                        }
                        break;
                }
            }
        }
    }

    /**
     * Permet de split toutes les valeurs flottantes d'une chaine séparées par une virgule.
     * 
     * @param {String} chaine Chaine à split.
     */
    splitValeurs(chaine) {
        let tab = chaine.split(',');
        let tabRet = [];

        tab.forEach(e => {
            let f = parseFloat(e);

            if(f === NaN) {
                return [];
            }
            else {
                tabRet.push(f);
            }
        });

        return tabRet;
    }

    /**
     * Vide et détruit la map.
     */
    vider() {
        while(this.listeFormes.length > 0) {
            this.listeFormes.shift().supprimer();
        }
        delete this;
    }
}