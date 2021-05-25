import * as SM from "../AaaahSpritesManager.js";
import * as Aaaah from "../Aaaah.js";
import Guidage from "./Guidage.js";
import AaaahMap from "./Map/Map.js";
import * as PIXI from "pixi.js";
import MultiStyleText from "pixi-multistyle-text";
import * as AG from "../Global.js";
import AaaahJoueur from "./Joueur/Joueur.js";
import AaaahJoueurPrincipal from "./Joueur/JoueurPrincipal.js";

import Monde_0 from "./Monde/Monde_0.js";
import Monde_1 from "./Monde/Monde_1.js";
import Monde_2 from "./Monde/Monde_2.js";
import Monde_3 from "./Monde/Monde_3.js";
import Monde_4 from "./Monde/Monde_4.js";
import Monde_5 from "./Monde/Monde_5.js";
import Monde_6 from "./Monde/Monde_6.js";
import Monde_7 from "./Monde/Monde_7.js";
import Monde_8 from "./Monde/Monde_8.js";
import Monde_9 from "./Monde/Monde_9.js";
import Monde_10 from "./Monde/Monde_10.js";
import Monde_11 from "./Monde/Monde_11.js";
import Monde_12 from "./Monde/Monde_12.js";
import Monde_13 from "./Monde/Monde_13.js";
import Monde_14 from "./Monde/Monde_14.js";
import Monde_15 from "./Monde/Monde_15.js";
import Monde_16 from "./Monde/Monde_16.js";
import Monde_17 from "./Monde/Monde_17.js";
import Monde_18 from "./Monde/Monde_18.js";
import Monde_19 from "./Monde/Monde_19.js";
import Monde_20 from "./Monde/Monde_20.js";
import Monde_21 from "./Monde/Monde_21.js";
import Monde_22 from "./Monde/Monde_22.js";
import Monde_23 from "./Monde/Monde_23.js";
import Monde_24 from "./Monde/Monde_24.js";
import Monde_25 from "./Monde/Monde_25.js";
import Monde_26 from "./Monde/Monde_26.js";
import Monde_27 from "./Monde/Monde_27.js";
import Monde_28 from "./Monde/Monde_28.js";
import Monde_29 from "./Monde/Monde_29.js";
import Monde_30 from "./Monde/Monde_30.js";
import Monde_31 from "./Monde/Monde_31.js";
import Monde_32 from "./Monde/Monde_32.js";
import Monde_33 from "./Monde/Monde_33.js";
import Monde_34 from "./Monde/Monde_34.js";
import Monde_35 from "./Monde/Monde_35.js";
import Monde_36 from "./Monde/Monde_36.js";
import Monde_37 from "./Monde/Monde_37.js";
import Monde_38 from "./Monde/Monde_38.js";
import Monde_39 from "./Monde/Monde_39.js";
import Monde_40 from "./Monde/Monde_40.js";
import Monde_41 from "./Monde/Monde_41.js";
import Monde_42 from "./Monde/Monde_42.js";
import Monde_43 from "./Monde/Monde_43.js";
import Monde_44 from "./Monde/Monde_44.js";
import Monde_45 from "./Monde/Monde_45.js";
import Monde_46 from "./Monde/Monde_46.js";
import Monde_47 from "./Monde/Monde_47.js";
import Monde_48 from "./Monde/Monde_48.js";
import Monde_49 from "./Monde/Monde_49.js";
import Monde_50 from "./Monde/Monde_50.js";
import Monde_51 from "./Monde/Monde_51.js";
import Monde_52 from "./Monde/Monde_52.js";
import Monde_53 from "./Monde/Monde_53.js";
import Monde_54 from "./Monde/Monde_54.js";
import Monde_55 from "./Monde/Monde_55.js";
import Monde_56 from "./Monde/Monde_56.js";
import Monde_57 from "./Monde/Monde_57.js";
import Monde_58 from "./Monde/Monde_58.js";
import Monde_59 from "./Monde/Monde_59.js";
import Monde_60 from "./Monde/Monde_60.js";
import Monde_61 from "./Monde/Monde_61.js";
import Monde_62 from "./Monde/Monde_62.js";
import Monde_63 from "./Monde/Monde_63.js";
import Monde_64 from "./Monde/Monde_64.js";
import AaaahJoueurAbstrait from "./Joueur/JoueurAbstrait.js";

/**
 * Classe de gestion des parties.
 */
class Partie {
    /**
     * Constructeur.
     * 
     * @param {Aaaah.Aaaah} jeu Instance du jeu.
     */
    constructor(jeu) {
        this.aaaah = jeu;
        this.stage = this.aaaah.pixi.stage;

        this.guidage = new Guidage(this);

        this.tempsDebutPartie = Aaaah.TEMPS_TIC;

        //On affiches les composantes de base de la map
        this.passerelle = SM.AaaahSpritesManager.getSprite(SM.Sprites.PasserelleDepart);
        this.passerelle.y = 353;
        this.stage.addChild(this.passerelle);

        this.bloc = SM.AaaahSpritesManager.getSprite(SM.Sprites.Bloc);
        this.bloc.x = 693;
        this.bloc.y = 44;
        this.stage.addChild(this.bloc);

        this.infirmerie = SM.AaaahSpritesManager.getSprite(SM.Sprites.Infirmerie);
        this.infirmerie.x = 740;
        this.infirmerie.y = 7;
        this.aaaah.foreground.addChild(this.infirmerie);

        this.textBloc = SM.AaaahSpritesManager.getSprite(SM.Sprites.TextBloc);
        this.textBloc.x = 695;
        this.textBloc.y = 60;
        this.aaaah.foreground.addChild(this.textBloc);

        // Gestion des infos de la partie
        const styleGuide = new PIXI.TextStyle({
            fontFamily: 'Arial',
            fontSize: 12,
            fill: '0xC8CC35'
        });

        const styleLabel = new PIXI.TextStyle({
            fontFamily: 'Arial',
            fontSize: 12,
            fill: '0x009D9D'
        });

        const styleValeur = new PIXI.TextStyle({
            fontFamily: 'Arial',
            fontSize: 12,
            fill: '0x6B76C0'
        });

        this.infoMapFormat = "<sl>Carte : </sl><sv>{0}</sv>\n<sl>Auteur : </sl><sv>{1}</sv>";
        this.infoMapText = new MultiStyleText("", {
            "sl": styleLabel,
            "sv": styleValeur
        });
        this.setInfoMap("-", "-");
        this.infoMapText.position.set(705, 235);
        this.aaaah.foreground.addChild(this.infoMapText);

        this.nomGuideText = new PIXI.Text("Aucun", styleGuide);
        this.nomGuideText.anchor.set(0.5, 0.5);
        this.nomGuideText.position.set(750, 330);
        this.aaaah.foreground.addChild(this.nomGuideText);

        this.tempsMapText = new PIXI.Text("00:00", styleValeur);
        this.tempsMapText.position.set(756, 342);
        this.aaaah.foreground.addChild(this.tempsMapText);

        this.nombreJoueurText = new PIXI.Text("1", styleValeur);
        this.nombreJoueurText.position.set(763, 357);
        this.aaaah.foreground.addChild(this.nombreJoueurText);

        this.nombreJoueurEnVieText = new PIXI.Text("1/1", styleValeur);
        this.nombreJoueurEnVieText.position.set(755, 371);
        this.aaaah.foreground.addChild(this.nombreJoueurEnVieText);

        this.monde = null;
        this.map = null;

        this.joueur = null;
        this.adversaires = new Map();
        this.joueursEnVie = new Map();
        this.joueursContamines = [];

        this.setNbJoueurTotal(1);
        this.nbJoueursDebutPartie = 1;

        this.premiereContamination = true;

        this.pixels = new Uint8Array(this.aaaah.width*this.aaaah.height*4);
    }

    /**
     * Appelé à chaque frame.
     */
    tic() {
        this.guidage.tic();

        if(this.monde !== null) {
            this.monde.tic(Aaaah.TEMPS_TIC - this.tempsDebutPartie);
        }
        else if(this.map !== null) {
            this.map.tic(Aaaah.TEMPS_TIC - this.tempsDebutPartie);
        }

        // Mise à jour de la matrice de collision
        this.aaaah.gl.readPixels(0, 0, this.aaaah.width, this.aaaah.height, this.aaaah.gl.RGBA, this.aaaah.gl.UNSIGNED_BYTE, this.pixels);

        this.joueursEnVie.forEach(joueur => {
            joueur.tic();
        });

        this.updateTemps();
        this.updatePasserelle();
    }

    /**
     * Détermine s'il y a collision aux coordonnées choisies.
     * @param {int} x Abscisses
     * @param {int} y Ordonnées
     * @return Vrai s'il y a une collision, faux sinon.
     */
    detecterCollision(x, y) {
        if(x <= 0 || x > this.aaaah.width || y <= 0 || y > this.aaaah.height) {
            return false;
        }

        let index = ((this.aaaah.height-y)*this.aaaah.width+x)*4;
        return this.pixels[index+3] !== 0;
    }

    /**
     * Détermine si le pixel à la position (x,y) est bien de la couleur (r,g,b).
     * 
     * @param {int} x Abscisses
     * @param {int} y Ordonnées
     * @param {int} r Valeur de rouge (entre 0 et 255).
     * @param {int} g Valeur de vert (entre 0 et 255).
     * @param {int} b Valeur de bleu (entre 0 et 255).
     * 
     * @returns Vrai si le pixel ciblé est bien de la couleur indiquée, faux sinon.
     */
    detecterCouleur(x, y, r, g, b) {
        if(x < 0 || y > this.aaaah.height) {
            return false;
        }

        let index = ((this.aaaah.height-y)*this.aaaah.width+x)*4;
        return this.pixels[index] == r && this.pixels[index+1] == g && this.pixels[index+2] == b;
    }

    /**
     * Permet de charger une map.
     * 
     * @param {String} carte Code de la map au format XML.
     * @param {String} auteur Auteur de la map qui est affiché s'il n'apparaît pas dans le code.
     */
    chargerMap(code, auteur) {
        this.reinitialiserChargement(true);

        this.map = new AaaahMap(this);
        this.map.charger(code, auteur);

        this.tempsDebutPartie = Aaaah.TEMPS_TIC;
    }

    /**
     * @returns La classe de gestion du guidage pour cette partie.
     */
    getGuidage() {
        return this.guidage;
    }

    /**
     * Modifie les valeurs de nom de carte et d'auteur sur le bloc de droite.
     * 
     * @param {String} carte Nom de la carte.
     * @param {String} auteur Nom de l'auteur de la carte.
     */
    setInfoMap(carte, auteur) {
        let splitCarte = carte.split(" ");
        let carteFormate = "";
        let flag = true;

        // Formatage du nom de la carte
        for(let i = 0; i < splitCarte.length; i++) {
            if(flag) {
                let text = new PIXI.Text(splitCarte[i], {fontFamily: 'Arial',fontSize: 12});
                let textCF = new PIXI.Text(carteFormate, {fontFamily: 'Arial',fontSize: 12});

                if(textCF.width + text.width <= 50) {
                    carteFormate += " " + text.text;
                }
                else {
                    flag = false;
                    carteFormate += "\n" + text.text;
                }
            }
            else {
                carteFormate += " " + splitCarte[i];
            }
        }

        // Formatage de l'auteur
        let auteurFormate;
        if(new PIXI.Text(auteur, {fontFamily: 'Arial',fontSize: 12}).width <= 44) {
            auteurFormate = auteur;
        }
        else {
            auteurFormate = "\n" + auteur;
        }

        this.infoMapText.text = this.infoMapFormat.replace("{0}", carteFormate)
                                              .replace("{1}", auteurFormate);
    }

    /**
     * Rend visible/invisible les informations d'une carte (nom carte, auteur) sur le bloc de droite.
     * 
     * @param {Boolean} b Si vrai les informations son visibles, sinon elles sont invisibles.
     */
    setInfoMapVisible(b) {
        this.infoMapText.visible = b;
    }

    /**
     * Modifie le guide courant.
     * 
     * @param {String} pseudo Pseudo du nouveau guide.
     */
    setGuide(pseudo) {
        this.nomGuideText.text = pseudo;
        this.guidage.setGuide(pseudo);
    }

    /**
     * Modifie le nombre de joueurs présents au départ de la map.
     * 
     * @param {int} nbJoueurDepart Nombre de joueurs présents au début de la map.
     */
    setNbJoueurDepart(nbJoueurDepart) {
        this.nbJoueursDebutPartie = nbJoueurDepart;
    }

    /**
     * Modifie le nombre de joueurs en vie sur le bloc de droite.
     * 
     * @param {int} joueursEnVie Nombre de joueurs en vie restant.
     */
    setInfosJoueurs(joueursEnVie) {
        this.nombreJoueurEnVieText.text = joueursEnVie + "/" + this.nbJoueursDebutPartie;
    }

    /**
     * Modifie le nombre de joueurs total se trouvant sur la partie.
     * 
     * @param {int} nbJoueurs Nombre de joueurs total présents sur la partie.
     */
    setNbJoueurTotal(nbJoueurs) {
        this.nbJoueursTotal = nbJoueurs;
        this.nombreJoueurText.text = nbJoueurs;
    }

    /**
     * @returns Le nombre de joueur total se trouvant sur la partie.
     */
    getNbJoueurTotal() {
        return this.nbJoueursTotal;
    }

    /**
     * Modifie le temps de départ de la map.
     * 
     * @param {int} temps Nombre de millisecondes depuis que la map a commencé.
     */
    setTempsDepart(temps) {
        this.tempsDebutPartie = Aaaah.TEMPS_TIC - temps;
    }

    /**
     * Met à jour l'affichage du temps sur le bloc droit.
     */
    updateTemps() {
        let dureePartie = Aaaah.TEMPS_TIC - this.tempsDebutPartie;
        let tempsRestant = AG.DUREE_PARTIE - dureePartie;

        if(tempsRestant < 0) {
            this.tempsMapText.text = "00:00";
        }
        else {
            let nbMin = Math.floor(tempsRestant/60000);
            let nbSec = Math.floor((tempsRestant%60000)/1000);
            
            let nbMinString = nbMin < 10 ? "0"+nbMin : nbMin.toString();
            let nbSecString = nbSec < 10 ? "0"+nbSec : nbSec.toString();

            this.tempsMapText.text = nbMinString + ":" + nbSecString;
        }
    }

    /**
     * Met à jour la position de la passerelle.
     */
    updatePasserelle() {
        let dureePartie = Aaaah.TEMPS_TIC - this.tempsDebutPartie;

        if(dureePartie < 21100) {
            this.passerelle.y = 353 + Math.floor(dureePartie/500);
        }
        else {
            this.passerelle.y = 550;
        }
    }

    /**
     * Gestion des intéractions spéciales seulement si l'on se trouve sur une map officielle.
     * 
     * @param {AaaahJoueurAbstrait} joueur Joueur qui doit subir une intéraction spéciale.
     */
    interactionsSpeciales(joueur) {
        if(this.monde !== null) {
            this.monde.interactionsSpeciales(joueur);
        }
    }

    /**
     * Si on joue sur un monde, alors on récupère la valeur de la constante flexible sur ce monde, sinon
     * on récupère la valeur de la constante portant le même nom.
     * 
     * @param {AG.ConstantesFlexibles} constante $
     * 
     * @returns La valeur associée à la constante flexible saisie si elle existe, sinon la constante de même nom.
     */
    getConstanteFlexible(constante) {
        if(this.monde !== null) {
            return this.monde.getConstanteFlexible(constante);
        }
        else {
            switch(constante) {
                case AG.ConstantesFlexibles.GRAVITE_X:
                    return AG.GRAVITE_X;
                case AG.ConstantesFlexibles.GRAVITE_Y:
                    return AG.GRAVITE_Y;
                case AG.ConstantesFlexibles.PUISSANCE_CRI_X:
                    return AG.PUISSANCE_CRI_X;
                case AG.ConstantesFlexibles.PUISSANCE_CRI_Y:
                    return AG.PUISSANCE_CRI_Y;
                case AG.ConstantesFlexibles.TEMPS_ENTRE_CRI:
                    return AG.TEMPS_ENTRE_CRI;
                case AG.ConstantesFlexibles.TEMPS_TRAIT_GUIDE:
                    return AG.TEMPS_TRAIT_GUIDE;
                case AG.ConstantesFlexibles.TEMPS_ENTRE_SAUTS:
                    return AG.TEMPS_ENTRE_SAUTS;
                case AG.ConstantesFlexibles.DEPLACEMENT_X:
                    return AG.DEPLACEMENT_X;
                case AG.ConstantesFlexibles.DEPLACEMENT_CONTA_X:
                    return AG.DEPLACEMENT_CONTA_X;
                case AG.ConstantesFlexibles.DUREE_PARTIE:
                    return AG.DUREE_PARTIE;
                case AG.ConstantesFlexibles.BOOST:
                    return AG.BOOST;
                case AG.ConstantesFlexibles.ZONES_GUIDABLE:
                    return AG.ZONES_GUIDABLE;
                default:
                    return null;
            }
        }
    }

    /**
     * Permet de charger un monde (une map officielle).
     * 
     * @param {int} num Numéro de monde.
     */
    chargerMonde(num) {
        this.reinitialiserChargement(false);

        switch(num) {
            case 0:
                this.monde = new Monde_0(this.aaaah);
                break;
            case 1:
                this.monde = new Monde_1(this.aaaah);
                break;
            case 2:
                this.monde = new Monde_2(this.aaaah);
                break;
            case 3:
                this.monde = new Monde_3(this.aaaah);
                break;
            case 4:
                this.monde = new Monde_4(this.aaaah);
                break;
            case 5:
                this.monde = new Monde_5(this.aaaah);
                break;
            case 6:
                this.monde = new Monde_6(this.aaaah);
                break;
            case 7:
                this.monde = new Monde_7(this.aaaah);
                break;
            case 8:
                this.monde = new Monde_8(this.aaaah);
                break;
            case 9:
                this.monde = new Monde_9(this.aaaah);
                break;
            case 10:
                this.monde = new Monde_10(this.aaaah);
                break;
            case 11:
                this.monde = new Monde_11(this.aaaah);
                break;
            case 12:
                this.monde = new Monde_12(this.aaaah);
                break;
            case 13:
                this.monde = new Monde_13(this.aaaah);
                break;
            case 14:
                this.monde = new Monde_14(this.aaaah);
                break;
            case 15:
                this.monde = new Monde_15(this.aaaah);
                break;
            case 16:
                this.monde = new Monde_16(this.aaaah);
                break;
            case 17:
                this.monde = new Monde_17(this.aaaah);
                break;
            case 18:
                this.monde = new Monde_18(this.aaaah);
                break;
            case 19:
                this.monde = new Monde_19(this.aaaah);
                break;
            case 20:
                this.monde = new Monde_20(this.aaaah);
                break;
            case 21:
                this.monde = new Monde_21(this.aaaah);
                break;
            case 22:
                this.monde = new Monde_22(this.aaaah);
                break;
            case 23:
                this.monde = new Monde_23(this.aaaah);
                break;
            case 24:
                this.monde = new Monde_24(this.aaaah);
                break;
            case 25:
                this.monde = new Monde_25(this.aaaah);
                break;
            case 26:
                this.monde = new Monde_26(this.aaaah);
                break;
            case 27:
                this.monde = new Monde_27(this.aaaah);
                break;
            case 28:
                this.monde = new Monde_28(this.aaaah);
                break;
            case 29:
                this.monde = new Monde_29(this.aaaah);
                break;
            case 30:
                this.monde = new Monde_30(this.aaaah);
                break;
            case 31:
                this.monde = new Monde_31(this.aaaah);
                break;
            case 32:
                this.monde = new Monde_32(this.aaaah);
                break;
            case 33:
                this.monde = new Monde_33(this.aaaah);
                break;
            case 34:
                this.monde = new Monde_34(this.aaaah);
                break;
            case 35:
                this.monde = new Monde_35(this.aaaah);
                break;
            case 36:
                this.monde = new Monde_36(this.aaaah);
                break;
            case 37:
                this.monde = new Monde_37(this.aaaah);
                break;
            case 38:
                this.monde = new Monde_38(this.aaaah);
                break;
            case 39:
                this.monde = new Monde_39(this.aaaah);
                break;
            case 40:
                this.monde = new Monde_40(this.aaaah);
                break;
            case 41:
                this.monde = new Monde_41(this.aaaah);
                break;
            case 42:
                this.monde = new Monde_42(this.aaaah);
                break;
            case 43:
                this.monde = new Monde_43(this.aaaah);
                break;
            case 44:
                this.monde = new Monde_44(this.aaaah);
                break;
            case 45:
                this.monde = new Monde_45(this.aaaah);
                break;
            case 46:
                this.monde = new Monde_46(this.aaaah);
                break;
            case 47:
                this.monde = new Monde_47(this.aaaah);
                break;
            case 48:
                this.monde = new Monde_48(this.aaaah);
                break;
            case 49:
                this.monde = new Monde_49(this.aaaah);
                break;
            case 50:
                this.monde = new Monde_50(this.aaaah);
                break;
            case 51:
                this.monde = new Monde_51(this.aaaah);
                break;
            case 52:
                this.monde = new Monde_52(this.aaaah);
                break;
            case 53:
                this.monde = new Monde_53(this.aaaah);
                break;
            case 54:
                this.monde = new Monde_54(this.aaaah);
                break;
            case 55:
                this.monde = new Monde_55(this.aaaah);
                break;
            case 56:
                this.monde = new Monde_56(this.aaaah);
                break;
            case 57:
                this.monde = new Monde_57(this.aaaah);
                break;
            case 58:
                this.monde = new Monde_58(this.aaaah);
                break;
            case 59:
                this.monde = new Monde_59(this.aaaah);
                break;
            case 60:
                this.monde = new Monde_60(this.aaaah);
                break;
            case 61:
                this.monde = new Monde_61(this.aaaah);
                break;
            case 62:
                this.monde = new Monde_62(this.aaaah);
                break;
            case 63:
                this.monde = new Monde_63(this.aaaah);
                break;
            case 64:
                this.monde = new Monde_64(this.aaaah);
                break;
        }

        this.tempsDebutPartie = Aaaah.TEMPS_TIC;
    }

    /**
     * Réinitialise les variables de parties. (monde et map).
     */
    reinitialiserPartie() {
        if(this.monde != null) {
            this.monde.supprimer();
            this.monde = null;
        }

        if(this.map != null) {
            this.map.vider();
            this.map = null;
        }
    }

    /**
     * Réinitialise toutes les données propres à une partie.
     * 
     * @param {Boolean} isMap Si vrai, alors on réinitialise pour laisser place à une map normale, 
     * sinon on laisse place à une map officielle.
     */
    reinitialiserChargement(isMap) {
        this.reinitialiserPartie();
        this.joueursContamines = [];
        this.infoMapText.visible = isMap;
        this.premiereContamination = true;
        this.getGuidage().clear();
        this.activerJoueurs();
    }

    /**
     * @returns Le joueur principal.
     */
    getJoueurPrincipal() {
        return this.joueur;
    }

    /**
     * Permet de récupérer une instance de joueur à partir de son pseudo.
     * 
     * @param {String} pseudo Pseudo du joueur à récupérer.
     * @returns Le joueur associé au pseudo fourni.
     */
    getJoueur(pseudo) {
        if(pseudo === this.joueur.pseudo) {
            return this.joueur;
        }
        else {
            return this.adversaires.get(pseudo); // undefined si pas trouvé
        }
    }

    /**
     * @returns Un tableau de tous les joueurs contaminés.
     */
    getJoueursContamines() {
        return this.joueursContamines;
    }

    /**
     * Change l'instance du joueur principal en lui associant un nouveau pseudo.
     * 
     * @param {String} pseudo Pseudo du joueur principal.
     */
    setJoueurPrincipal(pseudo) {
        this.joueur = new AaaahJoueurPrincipal(pseudo, this.aaaah);
    }

    /**
     * Ajoute un adversaire dans la liste des adversaires.
     * 
     * @param {String} pseudo Pseudo du nouvel adversaire.
     */
    ajouterAdversaire(pseudo) {
        if(!this.adversaires.has(pseudo)) {
            this.setNbJoueurTotal(this.getNbJoueurTotal()+1);

            let joueur = new AaaahJoueur(pseudo, this.aaaah);
            this.adversaires.set(pseudo, joueur);
            return joueur;
        }
        else {
            return undefined;
        }
    }

    /**
     * Supprime un adversaire de la liste des adversaires.
     * 
     * @param {String} pseudo Pseudo de l'adversaire à supprimer.
     */
    supprimerAdversaire(pseudo) {
        let joueur = this.adversaires.get(pseudo);

        if(joueur) {
            this.setNbJoueurTotal(this.getNbJoueurTotal()-1);

            this.adversaires.delete(pseudo);
            joueur.supprimer();
        }
    }

    /**
     * Permet d'activer/désactiver un joueur. Tout joueur ne jouant pas doit être désactivé pour ne pas
     * empiéter sur les performances et faire en sorte qu'il ne soit pas affiché.
     * 
     * @param {AaaahJoueurAbstrait} joueur Joueur à activer/désactiver.
     * @param {Boolean} activer Vrai si l'on souhaite activer le joueur, faux sinon.
     */
    setActivationJoueur(joueur, activer) {
        joueur.setActiver(activer);

        if(activer) {
            joueur.reset();
            this.joueursEnVie.set(joueur.pseudo, joueur);
        }
        else {
            this.joueursEnVie.delete(joueur.pseudo);
        }

        this.setInfosJoueurs(this.joueursEnVie.size);
    }

    /**
     * Permet d'activer tous les joueurs qui doivent l'être en début de partie.
     */
    activerJoueurs() {
        if(this.joueur) {
            this.setActivationJoueur(this.joueur, true);
        }

        this.adversaires.forEach(adversaire => {
            this.setActivationJoueur(adversaire, true);
        });

        // Le guide n'apparait pas sur la map, sauf s'il est seul
        let guide = this.getJoueur(this.guidage.getGuide());
        if(guide && this.nbJoueursTotal > 1) {
            this.setActivationJoueur(guide, false);
        }
    }

    /**
     * Permet de tuer un joueur.
     * 
     * @param {AaaahJoueurAbstrait} joueur Joueur devant être tué.
     */
    tuerJoueur(joueur) {
        // TODO : gérer l'affichage de la personne à l'origine de la mort
        this.setActivationJoueur(joueur, false);
    }

    /**
     * Permet de faire gagner un joueur.
     * 
     * @param {AaaahJoueurAbstrait} joueur Joueur à faire gagner.
     * @param {int} arrivee Temps d'arrivée relatif au début de la map en millisecondes.
     */
    gagnerJoueur(joueur, arrivee) {
        // TODO : gérer l'affichage du temps d'arrivée
        this.setActivationJoueur(joueur, false);
    }

    /**
     * Permet de contaminer ou de rendre jaune un joueur.
     * 
     * @param {AaaahJoueurAbstrait} joueur Joueur sur lequel appliquer une contamination.
     * @param {Boolean} contamine Si vrai alors le joueur est contaminé, sinon il n'est que jaune.
     */
    contaminer(joueur, contamine) {
        // Le joueur est contaminé
        if(contamine) {
            if(this.premiereContamination) {
                this.premiereContamination = false;
                // TODO : écrire le message comme quoi il y a un contaminé
            }
            this.joueursContamines.push(joueur);
            joueur.contaminer(true);
        }
        // Le joueur n'est pas encore contaminé
        else {
            joueur.contaminer(false);
        }
    }
}

export default Partie;