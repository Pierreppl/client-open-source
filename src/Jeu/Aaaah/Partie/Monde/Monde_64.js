import MondeAbstrait from "./MondeAbstrait.js";
import * as SM from "../../AaaahSpritesManager.js";
import * as AG from "../../Global.js";

export default class Monde_64 extends MondeAbstrait {
    constructor(jeu) {
        super(jeu);

        this.monde = SM.AaaahSpritesManager.getSprite(SM.Sprites.Monde64);
        this.monde.x = 1;
        this.monde.y = -1;
        this.ajouterTexture(this.monde);

        let zones = [[115, 258, -1000, 174],
                     [309, 452, 242, 371],
                     [475, 576, 298, 1000],
                     [565, 695, 122, 209]];
                     
        this.setConstanteFlexible(AG.ConstantesFlexibles.ZONES_GUIDABLE, zones);
    }

    interactionsSpeciales(joueur) {
        if(this.aaaah.getPartie().detecterCouleur(joueur.getX()+AG.PB.x, joueur.getY()+AG.PB.y+2, 15, 81, 247) ||
           this.aaaah.getPartie().detecterCouleur(joueur.getX()+AG.PG.x-2, joueur.getY()+AG.PG.y, 15, 81, 247)) {
            let newCoord = this.calculerCoordonnees(joueur.getX(), joueur.getY());

            if(newCoord) {
                joueur.setX(newCoord[0]);
                joueur.setY(newCoord[1]);
            }
        }
    }

    calculerCoordonnees(x, y) {
        let coord = [[[160, 181, 333, 337], [x, 183]],
                    [[36, 57, 195, 199],    [x, 10]],
                    [[96, 117, 22, 26],     [x, 68]],
                    [[275, 296, 16, 20],    [x, 62]],
                    [[275, 296, 272, 276],  [x, 318]],
                    [[206, 227, 316, 320],  [x, 362]],
                    [[410, 431, 222, 226],  [x-74, 162]],
                    [[474, 495, 198, 202],  [x, 112]],
                    [[429, 433, 82, 103],   [x-20, y]],
                    [[336, 357, 124, 128],  [x, 27]],
                    [[590, 611, 215, 219],  [x, 261]],
                    [[456, 477, 278, 282],  [x, 324]],
                    [[580, 601, 360, 364],  [x+41, 313]],
                    [[664, 685, 351, 355],  [x, 158]],
                    [[664, 685, 102, 106],  [x-70, 17]]];

        let taille = coord.length;
        let trouve = false;
        let i = 0;

        while(!trouve && i < taille) {
            if(x >= coord[i][0][0] && x <= coord[i][0][1] && y >= coord[i][0][2] && y <= coord[i][0][3])
                trouve = true;
            else
                i++;
        }

        if(i < taille)
            return coord[i][1];
        else
            return null;
    }
}