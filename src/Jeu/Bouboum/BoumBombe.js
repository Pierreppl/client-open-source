import * as BoumCase from "./BoumCase.js";
import * as PIXI from 'pixi.js';
import { DELTA_T } from "./Bouboum.js";
import { MapElement } from "./BoumMap.js";

const BOMBE_NORMALE = 0;
const BOMBE_SUPER = 1;
const BOMBE_MC = 2;
const BOMBE_ULTRA = 3;
const BOMBE_FANTOME = 4;
const BOMBE_FLOCON = 5;
const BOMBE_CUPITONNE = 6;

class BoumBombe extends MapElement {
    constructor(colonne, ligne, type, poseur, loader, stage) {
        super(colonne, ligne, loader, stage);
        //1: ligne, 2: colonne, 3: poseur, 4: type
        this.type = type;
        this.x = BoumCase.CASE_TAILLE * colonne;
        if (type == BOMBE_SUPER || type == BOMBE_ULTRA) {
            this.y = BoumCase.CASE_TAILLE * ligne - 3;
        } else {
            this.y = BoumCase.CASE_TAILLE * ligne - 2;
        }
        this.poseur = poseur;
        switch (this.type) {
            case BOMBE_SUPER:
                this.sprite = new PIXI.Sprite(loader.resources["BombeSuper.png"].texture);
                break;
            case BOMBE_ULTRA:
                this.sprite = new PIXI.Sprite(loader.resources["BombeUltra.png"].texture);
                break;
            case BOMBE_MC:
                this.sprite = new PIXI.Sprite(loader.resources["BombeAlea.png"].texture);
                break;
            case BOMBE_FANTOME:
                this.sprite = new PIXI.Sprite(loader.resources["BombeFantome.png"].texture);
                break;
            default:
                this.sprite = new PIXI.Sprite(loader.resources["Bombe.png"].texture);
                break;
        }
        this.sprite.x = this.x;
        this.sprite.y = this.y;

        // this.initFillStyle();
        // this.sprite = new PIXI.Graphics();
        // this.sprite.beginFill(this.fillStyle);
        this.size = this.sprite.width;
        // this.sprite.drawCircle(this.x, this.y, this.size * 0.5);
        // this.sprite.endFill();
        this.stage.addChild(this.sprite);
        this.pulse = Math.PI * 2.0 * 3.65/3.0 // La bombe explose au milieu de la monté de sa derniere pulsation (ce qui fait une moyenn de 3.75 pulsations en 3 secondes)
    }

    initFillStyle() {
        switch (this.type) {
            case BOMBE_NORMALE:
                this.fillStyle = 0x000000;
                break;
            case BOMBE_SUPER:
                this.fillStyle = 0xff0000;
                break;
            case BOMBE_MC:
                this.fillStyle = 0xff0ff;
                break;
            case BOMBE_ULTRA:
                this.fillStyle = 0x0000ff;
                break;
            case BOMBE_FANTOME:
                this.fillStyle = 0xabcdef;
                break;
            case BOMBE_FLOCON:
                this.fillStyle = 0xdead68;
                break;
            case BOMBE_CUPITONNE:
                this.poseur.fillStyle = 0xaaaaaa;
                break;
         }
    }

    tic(deltaFactor) {
        super.tic(deltaFactor)
        let scale = 0.75 + Math.cos(this.time*this.pulse)*0.125 
        this.sprite.scale.set(scale, scale);
        // Formule pour recentrer le sprite
        this.sprite.x = this.x + this.size * (1.0 - scale) * 0.5
        this.sprite.y = this.y + this.size * (1.0 - scale) * 0.5
    }

    isBombe() {
        return true;
    }
}

export {
   BOMBE_NORMALE, BOMBE_SUPER, BOMBE_MC, BOMBE_ULTRA, BOMBE_FANTOME, BOMBE_FLOCON, BOMBE_CUPITONNE, BoumBombe
};
