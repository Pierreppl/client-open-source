import * as PIXI from "pixi.js";

var loader = new PIXI.Loader();
var loaded = false;

const Sprites = {
    AvancerDroite: 0,
    AvancerGauche: 1,
    StatiqueDroite: 2,
    StatiqueGauche: 3,
    Infirmerie: 4,
    PasserelleDepart: 5,
    Bloc: 6,
    TextBloc: 8,
    Cri: 9,
    Monde0_Nuage: 10,
    Monde1_M1: 11,
    Monde2: 12,
    Monde3: 13,
    Monde4: 14,
    Monde5: 15,
    Monde6: 16,
    Monde6_M1: 17,
    Monde6_M2: 18,
    Monde7: 19,
    Monde7_M1: 20,
    Monde8: 21,
    Monde8_M1: 22,
    Monde9: 23,
    Monde10: 24,
    Monde11: 25,
    Monde12: 26,
    Monde13: 27,
    Monde14: 28,
    Monde15: 29,
    Monde16: 30,
    Monde16_M1: 31,
    Monde17: 32,
    Monde17_M1: 33,
    Monde18: 34,
    Monde18_M1: 35,
    Monde18_M2: 36,
    Monde19: 37,
    Monde19_M1: 38,
    Monde20: 39,
    Monde21: 40,
    Monde21_M1: 41,
    Monde22: 42,
    Monde23: 43,
    Monde23_M1: 44,
    Monde23_E2: 45,
    Monde24_1: 46,
    Monde24_2: 47,
    Monde24_Invisible: 48,
    Monde25: 49,
    Monde26: 50,
    Monde27: 51,
    Monde28: 52,
    Monde28_M1: 53,
    Monde28_M2: 54,
    Monde29: 55,
    Monde30: 56,
    Monde31: 57,
    Monde32: 58,
    Monde34: 59,
    Monde35: 60,
    Monde36: 61,
    Monde37: 62,
    Monde38_M1: 63,
    Monde_39: 64,
    Monde_39_M1: 65,
    Monde_39_Effet: 66,
    Monde41: 67,
    Monde42: 68,
    Monde42_M1: 69,
    Monde43: 70,
    Monde44: 71,
    Monde45: 72,
    Monde46: 73,
    Monde47: 74,
    Monde48: 75,
    Monde49_M1: 76,
    Monde49_E1: 77,
    Monde49_Barre: 78,
    Monde50: 79,
    Monde51: 80,
    Monde52: 81,
    Monde53: 82,
    Monde54: 83,
    Monde55: 84,
    Monde56_background: 85,
    Monde56_foreground: 86,
    Monde57_M1: 87,
    Monde58: 88,
    Monde59: 89,
    Monde60: 90,
    Monde61_background: 91,
    Monde61_foreground: 92,
    Monde62: 93,
    Monde63: 94,
    Monde63_M1: 95,
    Monde63_Texte: 96,
    Monde64: 97
}

class AaaahSpritesManager {

    /**
     * Charge de façon unique toutes les textures de Aaaah.
     * @param {function} setup Fonction à exécuter une fois les sprites chargés. 
     */
    static load(setup) {

        // On exécute juste la fonction passée en paramètre si les sprites sont déjà chargés.
        if(loaded) {
            setup();
        }
        else {
            loader.add("Mouvement", "images/aaaah/Mouvement/Mouvement.json")
                  .add("Partie", "images/aaaah/Partie/Partie.json")
                  .add("Cri", "images/aaaah/Cri/Cri.json")
                  .add("Monde_0", "images/aaaah/Monde/Monde_0/Monde_0.json")
                  .add("Monde_1", "images/aaaah/Monde/Monde_1/Monde_1.json")
                  .add("Monde_2", "images/aaaah/Monde/Monde_2/Monde_2.json")
                  .add("Monde_3", "images/aaaah/Monde/Monde_3/Monde_3.json")
                  .add("Monde_4", "images/aaaah/Monde/Monde_4/Monde_4.json")
                  .add("Monde_5", "images/aaaah/Monde/Monde_5/Monde_5.json")
                  .add("Monde_6", "images/aaaah/Monde/Monde_6/Monde_6.json")
                  .add("Monde_7", "images/aaaah/Monde/Monde_7/Monde_7.json")
                  .add("Monde_8", "images/aaaah/Monde/Monde_8/Monde_8.json")
                  .add("Monde_9", "images/aaaah/Monde/Monde_9/Monde_9.json")
                  .add("Monde_10", "images/aaaah/Monde/Monde_10/Monde_10.json")
                  .add("Monde_11", "images/aaaah/Monde/Monde_11/Monde_11.json")
                  .add("Monde_12", "images/aaaah/Monde/Monde_12/Monde_12.json")
                  .add("Monde_13", "images/aaaah/Monde/Monde_13/Monde_13.json")
                  .add("Monde_14", "images/aaaah/Monde/Monde_14/Monde_14.json")
                  .add("Monde_15", "images/aaaah/Monde/Monde_15/Monde_15.json")
                  .add("Monde_16", "images/aaaah/Monde/Monde_16/Monde_16.json")
                  .add("Monde_17", "images/aaaah/Monde/Monde_17/Monde_17.json")
                  .add("Monde_18", "images/aaaah/Monde/Monde_18/Monde_18.json")
                  .add("Monde_19", "images/aaaah/Monde/Monde_19/Monde_19.json")
                  .add("Monde_20", "images/aaaah/Monde/Monde_20/Monde_20.json")
                  .add("Monde_21", "images/aaaah/Monde/Monde_21/Monde_21.json")
                  .add("Monde_22", "images/aaaah/Monde/Monde_22/Monde_22.json")
                  .add("Monde_23", "images/aaaah/Monde/Monde_23/Monde_23.json")
                  .add("Monde_24", "images/aaaah/Monde/Monde_24/Monde_24.json")
                  .add("Monde_25", "images/aaaah/Monde/Monde_25/Monde_25.json")
                  .add("Monde_26", "images/aaaah/Monde/Monde_26/Monde_26.json")
                  .add("Monde_27", "images/aaaah/Monde/Monde_27/Monde_27.json")
                  .add("Monde_28", "images/aaaah/Monde/Monde_28/Monde_28.json")
                  .add("Monde_29", "images/aaaah/Monde/Monde_29/Monde_29.json")
                  .add("Monde_30", "images/aaaah/Monde/Monde_30/Monde_30.json")
                  .add("Monde_31", "images/aaaah/Monde/Monde_31/Monde_31.json")
                  .add("Monde_32", "images/aaaah/Monde/Monde_32/Monde_32.json")
                  .add("Monde_34", "images/aaaah/Monde/Monde_34/Monde_34.json")
                  .add("Monde_35", "images/aaaah/Monde/Monde_35/Monde_35.json")
                  .add("Monde_36", "images/aaaah/Monde/Monde_36/Monde_36.json")
                  .add("Monde_37", "images/aaaah/Monde/Monde_37/Monde_37.json")
                  .add("Monde_38", "images/aaaah/Monde/Monde_38/Monde_38.json")
                  .add("Monde_39", "images/aaaah/Monde/Monde_39/Monde_39.json")
                  .add("Monde_41", "images/aaaah/Monde/Monde_41/Monde_41.json")
                  .add("Monde_42", "images/aaaah/Monde/Monde_42/Monde_42.json")
                  .add("Monde_43", "images/aaaah/Monde/Monde_43/Monde_43.json")
                  .add("Monde_44", "images/aaaah/Monde/Monde_44/Monde_44.json")
                  .add("Monde_45", "images/aaaah/Monde/Monde_45/Monde_45.json")
                  .add("Monde_46", "images/aaaah/Monde/Monde_46/Monde_46.json")
                  .add("Monde_47", "images/aaaah/Monde/Monde_47/Monde_47.json")
                  .add("Monde_48", "images/aaaah/Monde/Monde_48/Monde_48.json")
                  .add("Monde_49", "images/aaaah/Monde/Monde_49/Monde_49.json")
                  .add("Monde_50", "images/aaaah/Monde/Monde_50/Monde_50.json")
                  .add("Monde_51", "images/aaaah/Monde/Monde_51/Monde_51.json")
                  .add("Monde_52", "images/aaaah/Monde/Monde_52/Monde_52.json")
                  .add("Monde_53", "images/aaaah/Monde/Monde_53/Monde_53.json")
                  .add("Monde_54", "images/aaaah/Monde/Monde_54/Monde_54.json")
                  .add("Monde_55", "images/aaaah/Monde/Monde_55/Monde_55.json")
                  .add("Monde_56", "images/aaaah/Monde/Monde_56/Monde_56.json")
                  .add("Monde_57", "images/aaaah/Monde/Monde_57/Monde_57.json")
                  .add("Monde_58", "images/aaaah/Monde/Monde_58/Monde_58.json")
                  .add("Monde_59", "images/aaaah/Monde/Monde_59/Monde_59.json")
                  .add("Monde_60", "images/aaaah/Monde/Monde_60/Monde_60.json")
                  .add("Monde_61", "images/aaaah/Monde/Monde_61/Monde_61.json")
                  .add("Monde_62", "images/aaaah/Monde/Monde_62/Monde_62.json")
                  .add("Monde_63", "images/aaaah/Monde/Monde_63/Monde_63.json")
                  .add("Monde_64", "images/aaaah/Monde/Monde_64/Monde_64.json");

            loader.onComplete.add(() => {
                loaded = true;
                setup();
            });
            loader.load();
        }
    }

    /**
     * Récupère une nouvelle instance d'un sprite.
     * @param {Sprites} sprite Sprite que l'on choisi de récupérer.
     * @returns Le sprite voulu.
     */
    static getSprite(sprite) {

        if(!loaded) {
            return null;
        }

        switch(sprite) {
            case Sprites.AvancerDroite:
                return getAnimatedSpriteAvancer(true);

            case Sprites.AvancerGauche:
                return getAnimatedSpriteAvancer(false);

            case Sprites.StatiqueDroite:
                return new PIXI.Sprite(loader.resources.Mouvement.spritesheet.textures['_StatiqueDroite.png']);

            case Sprites.StatiqueGauche:
                return new PIXI.Sprite(loader.resources.Mouvement.spritesheet.textures['_StatiqueGauche.png']);

            case Sprites.Infirmerie:
                return new PIXI.Sprite(loader.resources.Partie.spritesheet.textures['Infirmerie.png']);

            case Sprites.PasserelleDepart:
                return new PIXI.Sprite(loader.resources.Partie.spritesheet.textures['PasserelleDepart.png']);

            case Sprites.Bloc:
                return new PIXI.Sprite(loader.resources.Partie.spritesheet.textures['BlocDroit.png']);

            case Sprites.TextBloc:
                return new PIXI.Sprite(loader.resources.Partie.spritesheet.textures['TextBloc.png']);

            case Sprites.Cri:
                return getAnimatedSpriteCri();

            case Sprites.Monde0_Nuage:
                return getAnimatedSpriteNuage();

            case Sprites.Monde1_M1:
                return new PIXI.Sprite(loader.resources.Monde_1.spritesheet.textures['Monde1_M1.png']);

            case Sprites.Monde2:
                return new PIXI.Sprite(loader.resources.Monde_2.spritesheet.textures['Monde2.png']);

            case Sprites.Monde3:
                return new PIXI.Sprite(loader.resources.Monde_3.spritesheet.textures['Monde3.png']);

            case Sprites.Monde4:
                return new PIXI.Sprite(loader.resources.Monde_4.spritesheet.textures['Monde4.png']);

            case Sprites.Monde5:
                return new PIXI.Sprite(loader.resources.Monde_5.spritesheet.textures['Monde5.png']);

            case Sprites.Monde6:
                return new PIXI.Sprite(loader.resources.Monde_6.spritesheet.textures['Monde6.png']);

            case Sprites.Monde6_M1:
                return new PIXI.Sprite(loader.resources.Monde_6.spritesheet.textures['Monde6_M1.png']);

            case Sprites.Monde6_M2:
                return new PIXI.Sprite(loader.resources.Monde_6.spritesheet.textures['Monde6_M2.png']);

            case Sprites.Monde7:
                return new PIXI.Sprite(loader.resources.Monde_7.spritesheet.textures['Monde7.png']);

            case Sprites.Monde7_M1:
                return new PIXI.Sprite(loader.resources.Monde_7.spritesheet.textures['Monde7_M1.png']);

            case Sprites.Monde8:
                return new PIXI.Sprite(loader.resources.Monde_8.spritesheet.textures['Monde8.png']);

            case Sprites.Monde8_M1:
                return new PIXI.Sprite(loader.resources.Monde_8.spritesheet.textures['Monde8_M1.png']);

            case Sprites.Monde9:
                return new PIXI.Sprite(loader.resources.Monde_9.spritesheet.textures['Monde9.png']);

            case Sprites.Monde10:
                return new PIXI.Sprite(loader.resources.Monde_10.spritesheet.textures['Monde10.png']);

            case Sprites.Monde11:
                return new PIXI.Sprite(loader.resources.Monde_11.spritesheet.textures['Monde11.png']);

            case Sprites.Monde12:
                return new PIXI.Sprite(loader.resources.Monde_12.spritesheet.textures['Monde12.png']);

            case Sprites.Monde13:
                return new PIXI.Sprite(loader.resources.Monde_13.spritesheet.textures['Monde13.png']);

            case Sprites.Monde14:
                return new PIXI.Sprite(loader.resources.Monde_14.spritesheet.textures['Monde14.png']);

            case Sprites.Monde15:
                return new PIXI.Sprite(loader.resources.Monde_15.spritesheet.textures['Monde15.png']);

            case Sprites.Monde16:
                return new PIXI.Sprite(loader.resources.Monde_16.spritesheet.textures['Monde16.png']);

            case Sprites.Monde16_M1:
                return new PIXI.Sprite(loader.resources.Monde_16.spritesheet.textures['Monde16_M1.png']);

            case Sprites.Monde17:
                return new PIXI.Sprite(loader.resources.Monde_17.spritesheet.textures['Monde17.png']);

            case Sprites.Monde17_M1:
                return new PIXI.Sprite(loader.resources.Monde_17.spritesheet.textures['Monde17_M1.png']);

            case Sprites.Monde18:
                return new PIXI.Sprite(loader.resources.Monde_18.spritesheet.textures['Monde18.png']);

            case Sprites.Monde18_M1:
                return new PIXI.Sprite(loader.resources.Monde_18.spritesheet.textures['Monde18_M1.png']);
            
            case Sprites.Monde18_M2:
                return new PIXI.Sprite(loader.resources.Monde_18.spritesheet.textures['Monde18_M2.png']);

            case Sprites.Monde19:
                return new PIXI.Sprite(loader.resources.Monde_19.spritesheet.textures['Monde19.png']);

            case Sprites.Monde19_M1:
                return new PIXI.Sprite(loader.resources.Monde_19.spritesheet.textures['Monde19_M1.png']);

            case Sprites.Monde20:
                return new PIXI.Sprite(loader.resources.Monde_20.spritesheet.textures['Monde20.png']);

            case Sprites.Monde21:
                return new PIXI.Sprite(loader.resources.Monde_21.spritesheet.textures['Monde21.png']);

            case Sprites.Monde21_M1:
                return new PIXI.Sprite(loader.resources.Monde_21.spritesheet.textures['Monde21_M1.png']);

            case Sprites.Monde22:
                return new PIXI.Sprite(loader.resources.Monde_22.spritesheet.textures['Monde22.png']);

            case Sprites.Monde23:
                return new PIXI.Sprite(loader.resources.Monde_23.spritesheet.textures['Monde23.png']);
                
            case Sprites.Monde23_M1:
                return new PIXI.Sprite(loader.resources.Monde_23.spritesheet.textures['Monde23_M1.png']);

            case Sprites.Monde23_E2:
                return new PIXI.Sprite(loader.resources.Monde_23.spritesheet.textures['Monde23_E2.png']);

            case Sprites.Monde24_1:
                return new PIXI.Sprite(loader.resources.Monde_24.spritesheet.textures['Monde24_1.png']);

            case Sprites.Monde24_2:
                return new PIXI.Sprite(loader.resources.Monde_24.spritesheet.textures['Monde24_2.png']);

            case Sprites.Monde24_Invisible:
                return new PIXI.Sprite(loader.resources.Monde_24.spritesheet.textures['Monde24_Invisible.png']);

            case Sprites.Monde25:
                return new PIXI.Sprite(loader.resources.Monde_25.spritesheet.textures['Monde25.png']);

            case Sprites.Monde26:
                return new PIXI.Sprite(loader.resources.Monde_26.spritesheet.textures['Monde26.png']);

            case Sprites.Monde27:
                return new PIXI.Sprite(loader.resources.Monde_27.spritesheet.textures['Monde27.png']);

            case Sprites.Monde28:
                return new PIXI.Sprite(loader.resources.Monde_28.spritesheet.textures['Monde28.png']);

            case Sprites.Monde28_M1:
                return new PIXI.Sprite(loader.resources.Monde_28.spritesheet.textures['Monde28_M1.png']);

            case Sprites.Monde28_M2:
                return new PIXI.Sprite(loader.resources.Monde_28.spritesheet.textures['Monde28_M2.png']);

            case Sprites.Monde29:
                return new PIXI.Sprite(loader.resources.Monde_29.spritesheet.textures['Monde29.png']);

            case Sprites.Monde30:
                return new PIXI.Sprite(loader.resources.Monde_30.spritesheet.textures['Monde30.png']);

            case Sprites.Monde31:
                return new PIXI.Sprite(loader.resources.Monde_31.spritesheet.textures['Monde31.png']);

            case Sprites.Monde32:
                return new PIXI.Sprite(loader.resources.Monde_32.spritesheet.textures['Monde32.png']);

            case Sprites.Monde34:
                return new PIXI.Sprite(loader.resources.Monde_34.spritesheet.textures['Monde34.png']);

            case Sprites.Monde35:
                return new PIXI.Sprite(loader.resources.Monde_35.spritesheet.textures['Monde35.png']);

            case Sprites.Monde36:
                return new PIXI.Sprite(loader.resources.Monde_36.spritesheet.textures['Monde36.png']);

            case Sprites.Monde37:
                return new PIXI.Sprite(loader.resources.Monde_37.spritesheet.textures['Monde37.png']);

            case Sprites.Monde38_M1:
                return new PIXI.Sprite(loader.resources.Monde_38.spritesheet.textures['Monde38.png']);

            case Sprites.Monde39:
                return new PIXI.Sprite(loader.resources.Monde_39.spritesheet.textures['Monde39.png']);

            case Sprites.Monde_39_M1:
                return new PIXI.Sprite(loader.resources.Monde_39.spritesheet.textures['Monde39_M1.png']);

            case Sprites.Monde_39_Effet:
                return new PIXI.Sprite(loader.resources.Monde_39.spritesheet.textures['Monde39_Effet1.png']);

            case Sprites.Monde41:
                return new PIXI.Sprite(loader.resources.Monde_41.spritesheet.textures['Monde41.png']);

            case Sprites.Monde42:
                return new PIXI.Sprite(loader.resources.Monde_42.spritesheet.textures['Monde42.png']);

            case Sprites.Monde42_M1:
                return new PIXI.Sprite(loader.resources.Monde_42.spritesheet.textures['Monde42_M1.png']);

            case Sprites.Monde43:
                return new PIXI.Sprite(loader.resources.Monde_43.spritesheet.textures['Monde43.png']);

            case Sprites.Monde44:
                return new PIXI.Sprite(loader.resources.Monde_44.spritesheet.textures['Monde44.png']);

            case Sprites.Monde45:
                return new PIXI.Sprite(loader.resources.Monde_45.spritesheet.textures['Monde45.png']);

            case Sprites.Monde46:
                return new PIXI.Sprite(loader.resources.Monde_46.spritesheet.textures['Monde46.png']);

            case Sprites.Monde47:
                return new PIXI.Sprite(loader.resources.Monde_47.spritesheet.textures['Monde47.png']);

            case Sprites.Monde48:
                return new PIXI.Sprite(loader.resources.Monde_48.spritesheet.textures['Monde48.png']);

            case Sprites.Monde49_M1:
                return new PIXI.Sprite(loader.resources.Monde_49.spritesheet.textures['Monde49_M1.png']);

            case Sprites.Monde49_E1:
                return getAnimatedSpriteMonde49();

            case Sprites.Monde49_Barre:
                return new PIXI.Sprite(loader.resources.Monde_49.spritesheet.textures['Monde49_Barre.png']);

            case Sprites.Monde50:
                return new PIXI.Sprite(loader.resources.Monde_50.spritesheet.textures['Monde50.png']);

            case Sprites.Monde51:
                return new PIXI.Sprite(loader.resources.Monde_51.spritesheet.textures['Monde51.png']);

            case Sprites.Monde52:
                return new PIXI.Sprite(loader.resources.Monde_52.spritesheet.textures['Monde52.png']);

            case Sprites.Monde53:
                return new PIXI.Sprite(loader.resources.Monde_53.spritesheet.textures['Monde53.png']);

            case Sprites.Monde54:
                return new PIXI.Sprite(loader.resources.Monde_54.spritesheet.textures['Monde54.png']);

            case Sprites.Monde55:
                return new PIXI.Sprite(loader.resources.Monde_55.spritesheet.textures['Monde55.png']);

            case Sprites.Monde56_background:
                return new PIXI.Sprite(loader.resources.Monde_56.spritesheet.textures['Monde56_background.png']);

            case Sprites.Monde56_foreground:
                return new PIXI.Sprite(loader.resources.Monde_56.spritesheet.textures['Monde56_foreground.png']);

            case Sprites.Monde57_M1:
                return new PIXI.Sprite(loader.resources.Monde_57.spritesheet.textures['Monde57_M1.png']);

            case Sprites.Monde58:
                return new PIXI.Sprite(loader.resources.Monde_58.spritesheet.textures['Monde58.png']);

            case Sprites.Monde59:
                return new PIXI.Sprite(loader.resources.Monde_59.spritesheet.textures['Monde59.png']);

            case Sprites.Monde60:
                return new PIXI.Sprite(loader.resources.Monde_60.spritesheet.textures['Monde60.png']);

            case Sprites.Monde61_background:
                return new PIXI.Sprite(loader.resources.Monde_61.spritesheet.textures['Monde61_background.png']);

            case Sprites.Monde61_foreground:
                return new PIXI.Sprite(loader.resources.Monde_61.spritesheet.textures['Monde61_foreground.png']);

            case Sprites.Monde62:
                return new PIXI.Sprite(loader.resources.Monde_62.spritesheet.textures['Monde62.png']);

            case Sprites.Monde63:
                return new PIXI.Sprite(loader.resources.Monde_63.spritesheet.textures['Monde63.png']);

            case Sprites.Monde63_M1:
                return new PIXI.Sprite(loader.resources.Monde_63.spritesheet.textures['Monde63_M1.png']);

            case Sprites.Monde63_Texte:
                return new PIXI.Sprite(loader.resources.Monde_63.spritesheet.textures['Monde63_Texte.png']);

            case Sprites.Monde64:
                return new PIXI.Sprite(loader.resources.Monde_64.spritesheet.textures['Monde64.png']);

            default:
                return null;
        }
    }
}

function getAnimatedSpriteAvancer(droite) {
    var sprite = new PIXI.AnimatedSprite(loader.resources.Mouvement.spritesheet.animations[droite ? '_Droite' : '_Gauche']);
    sprite.animationSpeed = 0.5;
    return sprite;
}

function getAnimatedSpriteCri() {
    var sprite = new PIXI.AnimatedSprite(loader.resources.Cri.spritesheet.animations['Aaaah !']);
    sprite.animationSpeed = 2;
    
    sprite.onComplete = () => {
        sprite.visible = false;
    };

    return sprite;
}

function getAnimatedSpriteNuage() {
    var nuage = new PIXI.AnimatedSprite(loader.resources.Monde_0.spritesheet.animations['Monde0_Nuage']);
    nuage.animationSpeed = 1.6;
    nuage.scale.set(0.598, 0.576);
    return nuage;
}

function getAnimatedSpriteMonde49() {
    let animation = new PIXI.AnimatedSprite(loader.resources.Monde_49.spritesheet.animations['Monde49_E']);
    animation.animationSpeed = 0.020;
    animation.play();
    return animation;
}

export { 
    Sprites,
    AaaahSpritesManager
};
