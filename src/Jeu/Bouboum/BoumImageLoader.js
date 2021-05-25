import * as PIXI from 'pixi.js';

var imFolder = "../../public/images/bouboum/";
import getImgBase64 from '../Images.js';


class BoumImageLoader {
    constructor() {
        this.loader = new PIXI.Loader();
    }

    loadImages() {          
        let img = new Image();
        img.src = imFolder + "chatOr_bas.png"
        this.loader.add("chatOr_bas.png", getImgBase64("chatOr_bas.png"))
                    .add("chatOr_haut.png", getImgBase64("chatOr_haut.png"))
                    .add("chatOr_droite.png", getImgBase64("chatOr_droite.png"))
                    .add("chatOr_gauche.png", getImgBase64("chatOr_gauche.png"))
                    .add("bonus_crane.png", getImgBase64("bonus_crane.png"))
                    .add("bonus_bombe.png", getImgBase64("bonus_bombe.png"))
                    .add("bonus_puissance.png", getImgBase64("bonus_puissance.png"))
                    .add("bloc_bleu.png", getImgBase64("bloc_bleu.png"))
                    .add("bloc_noir.png", getImgBase64("bloc_noir.png"))
                    .add("bloc_orange.png", getImgBase64("bloc_orange.png"))
                    .add("Bombe.png", getImgBase64("Bombe.png"))
                    .add("BombeAlea.png", getImgBase64("BombeAlea.png"))
                    .add("BombeSuper.png", getImgBase64("BombeSuper.png"))
                    .add("BombeUltra.png", getImgBase64("BombeUltra.png"))
                    .add("BombeFantome.png", getImgBase64("BombeFantome.png"))
                    .add("explo_centre.png", getImgBase64("explo_centre.png"))
                    .add("explo_horizontale.png", getImgBase64("explo_horizontale.png"))
                    .add("explo_verticale.png", getImgBase64("explo_verticale.png"))
                    .add("explo_droite.png", getImgBase64("explo_droite.png"))
                    .add("explo_gauche.png", getImgBase64("explo_gauche.png"))
                    .add("explo_haut.png", getImgBase64("explo_haut.png"))
                    .add("explo_bas.png", getImgBase64("explo_bas.png"))
                    .add("mort1_blanc.png", getImgBase64("mort1_blanc.png"))
                    .add("mort1_orange.png", getImgBase64("mort1_orange.png"))
                    .add("mort2.png", getImgBase64("mort2.png"))
                    .add("mort3.png", getImgBase64("mort3.png"))
                    .add("chatfilleOr_bas.png", getImgBase64("chatfilleOr_bas.png"))
                    .add("chatfilleOr_haut.png", getImgBase64("chatfilleOr_haut.png"))
                    .add("chatfilleOr_gauche.png", getImgBase64("chatfilleOr_gauche.png"))
                    .add("chatfilleOr_droite.png", getImgBase64("chatfilleOr_droite.png"))

                  .load(this.setup);
        return this.loader;
        
    }

    setup() {}
}


export { BoumImageLoader };