import Global from "../Global.js"

/*******************************************************
  *                        Avatars                    *
 *******************************************************/

function AttribuerAvatar(msgServeur) {
  const regex = /[.]/;

  if (!regex.test(msgServeur)) {
      return "http://i.imgur.com/" + msgServeur;
  }

  switch (msgServeur) {
      case "":
          return Global.AVATAR_PAR_DEFAUT;
      //TODO: traiter l'avatar modo
      case "_m":
          return "Forum/I/image_modo.gif";
      case "0":
          return Global.AVATAR_PAR_DEFAUT;
      default:
          return "http://img.atelier801.com/" + msgServeur;
  }
}

/*******************************************************
  *                      Médailles                   *
 *******************************************************/

const TYPE_MEDAILLE_RECOMPENSE = 0;
const TYPE_MEDAILLE_GRADE = 1;

function MedailleViaID(id, type=TYPE_MEDAILLE_RECOMPENSE) {
  if (type === "grade")
     return require("../I/Medailles/" + GradeViaID(id));

  return require("../I/Medailles/" + NomMedaille(id));
}

function GradeViaID(id) {
  return "g" + id + ".png";
}

function NomMedaille(id) {
  switch (id) {
     case "0":
        return "or1.png";
     case "1":
        return "argent1.png";
     case "2":
        return "bronze1.png";
     case "3":
        return "or2.png";
     case "4":
        return "argent2.png";
     case "5":
        return "bronze2.png";
     case "6":
        return "coeur.png";
     case "7":
        return "eclair.png";
     case "8":
        return "rubis.png";
     case "9" :
        return "rosette.png";
     case "10" :
        return GradeViaID(0);
     case "11" :
        return GradeViaID(1);
     case "12" :
        return GradeViaID(2);
     case "13" :
        return GradeViaID(3);
     case "14" :
        return GradeViaID(4);
     case "15" :
        return GradeViaID(5);
     case "16" :
        return GradeViaID(6);
     case "17" :
        return GradeViaID(7);
     case "18" :
        return GradeViaID(8);
     case "19" :
        return "zoom.png";
     case "20" :
        return "bombe.png";
     case "21" :
        return "laurierOr.png";
     case "22" :
        return "laurierArgent.png";
     case "23" :
        return "laurierBronze.png";
     case "24" :
        return "flocon.png";
     case "25" :
        return "serpentOr.gif";
     case "26" :
        return "serpentArgent.gif";
     case "27" :
        return "serpentBronze.gif";
     case "28":
        return "pikaQueue.png";
     case "30" :
        return "bonbonOr.png";
     case "31" :
        return "bonbonArgent.png";
     case "32" :
        return "bonbonBronze.png";
     case "100" :
        return "etoile.png";
     case "996" :
        return "bouclierRouge.png";
     case "997" :
        return "respoelo.png";
     case "998" :
        return "respomap.png";
     case "999" :
        return "animateur.png";
  }

  return new $RecompenseGold();
}

/*******************************************************
  *                        Divers                    *
 *******************************************************/

let pageVisibleAttrNom = null;

function PageVisible() {
   if (pageVisibleAttrNom === null) {
      if (typeof document.hidden !== "undefined") { // Opera 12.10 and Firefox 18 and later support
         pageVisibleAttrNom = "hidden";
      } else if (typeof document.msHidden !== "undefined") {
         pageVisibleAttrNom = "msHidden";
      } else if (typeof document.webkitHidden !== "undefined") {
         pageVisibleAttrNom = "webkitHidden";
      } else {
         pageVisibleAttrNom = undefined; // Valeur de l'attribut de document inconnue
      }
   }

   return (pageVisibleAttrNom === undefined || document.pageVisibleAttrNom);
}

export { TYPE_MEDAILLE_RECOMPENSE, TYPE_MEDAILLE_GRADE,

         AttribuerAvatar, MedailleViaID, PageVisible };
