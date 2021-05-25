import Global from "../Global.js";
import * as Cnl from "../General/Canal.js";

var joueur = Global.$etat.joueur;
var chat = Global.$etat.instanceChat;
var txt = Global.$config.txt;
var lang = Global.$config.lang;
var reseau = Global.$config.reseau;

export default {HandleMessageServeur(message) {
  let msg = message.split("#");
  let code = msg[0];

  lang = Global.$config.lang;
  joueur = Global.$etat.joueur;
  chat = Global.$etat.instanceChat;
  txt = Global.$config.txt;
  reseau = Global.$config.reseau;

  if (!MessagesCanaux(code, msg));
  else if (!MessageAutorisations(code, msg));
  else if (!MessagesDivers(code, msg));
  else if (!MessageSanctions(code, msg));
  else if (!MessagesUniques(code, msg));
  else
      return false;

  return true;
}
}

function MessageSanctions(code, msg) {
   if (code === "CxPB") { // Demande ban vote populaire
       switch (msg.length) {
           case 1:
               chat.messageInfo("Ce joueur n'existe pas.");
               break;
           case 2:
               chat.messageModeration("Votre demande a été prise en compte.");
               break;
           case 3:
               chat.messageInfo(msg[1] + " a demandé le bannissement de " + msg[2] + ".");
               break;
           default:
               break;
       }
    } else if (code === "CxSkip") { // Notification /skip
        chat.messageInfo(msg[1] + " a fait /skip.");
    } if (code === "CxMUTE") { // Mute
        if (msg.length === 2) {
            chat.messageModeration(msg[1] + " n'a plus le droit de parler sur le chat principal.");
        } else if (msg.length >= 3) {
            if (msg[1] === "1") {
                chat.messageModeration(msg[2] + " sera ignoré par tout le monde pendant " + msg[3] + " heures.");
            } else {
                chat.messageModeration(msg[2] + " n'a plus le droit de parler pendant " + msg[3] + " " + (parseInt(msg[3]) > 1 ? "heures" : "heure") + "." + (msg[5] !== "" ? " Raison : " + msg[5] : ""));
            }
        }
    } else if (code === "CxMuet") { // Muet
        if (msg.length === 1) {
            chat.messageModeration("Vous n'avez plus le droit de parler pendant au moins une heure.");
        } else {
            chat.messageModeration("Vous n'avez plus le droit de parler sur le chat principal.");
        }
    }

    else
        return true;

    return false;
}

function MessagesDivers(code, msg) {
   if (code === "CxVFD") { // Information dernière co sur le forum
       /// FOFO_derniereCoForum = parseInt(msg[1]); @TODO
   } else if (code === "CxPing") {
       chat.messageInfo("Votre ping est de " + (Number(new Date()) - parseInt(msg[1])) + " millisecondes.");
    } else if (code === "CxPong") {
       if (msg[1] === "1") // Envoie de ping (ping demandé par autrui)
          reseau.Envoie("CxPong#1#" + msg[2]);
       else // Récupération demande ping sur <msg[2]>
          chat.messageInfo("Le ping de " + msg[2] + " est de " + (new Date() - parseInt(msg[1])) + " millisecondes.");
    } else if (code === "MPxNB") { // Nombre de messages reçus dans la messagerie
       if (msg[1])  // Si on a reçu un nombre
          Global.$etat.joueur.nbMessagesPrives = parseInt(msg[1]); // On le convertit en entier et on le set
    } else if (code === "CxSt") {
       Global.vue.$root.$emit("afficher-profil-joueur", msg.slice(1));
    } else if (code === "CxAA") {
		   if (msg.length === 2) {
			    if (msg[1] === "0")
				     chat.messageInfo("Ce joueur est désormais dans votre liste d'amis.");
			    else if (msg[1] === "1")
				     chat.messageInfo("Ce joueur est déjà dans votre liste d'amis.");
			    else if (msg[1] === "2")
				     chat.messageInfo("Votre liste d'amis est pleine.");
			    else if (msg[1] === "3")
				     chat.messageInfo("Impossible d'ajouter ce joueur.");
		   }
	}

   else
       return true;

   return false;
}

function MessagesUniques(code, msg) {
  if (code === "CxV") { // Indications sur la version du jeu
      if (msg.length === 5) { // @INCOMPLET
          Global.vue.$root.$emit("CnxNbJoueursCo", msg[1]);

      } else {
          console.log("Mauvaise version.");
          //PopUp(txt.ERR_VERSION_JEU[lang]);
      }
  }

  else
      return true;

  return false;
}

function MessagesCanaux(code, msg) {
  if (code === "CxSAct") { // Rejoindre/quitter un salon de discussion
      if (msg[1] === "1")
          joueur.rejoindreSalonDiscu();
      else
          joueur.quitterSalonDiscu();
  } else if (code === "CxFUSION") {
     joueur.rejoindreFusion();
  } else if (code === "CxF") { // Message refusé sur le chat
      if (msg.length === 1) {
          chat.messageInfo("Ce chat a été désactivé par un modérateur.");
      } else {
          chat.messageInfo("Vous ne pouvez pas parler sur le chat principal avant d'avoir cumulé 20 heures de jeu. Tapez /temps pour connaitre votre temps de jeu.");
      }
  } else if (code === "CxRef") { // Refus de chuchotement via /chut
       if (msg[1] === "0") {
           chat.messageInfo("Ce joueur n'accepte pas les chuchotements.");
       } else if (msg[1] === "1") {
           chat.messageInfo("Vous recevrez à nouveau les chuchotements des autres joueurs.");
       } else if (msg[1] === "2") {
           chat.messageInfo("Vous ne recevrez plus les chuchotements des autres joueurs.");
       }
   } else if (code === "CxIg") { // Ignorer/être ignoré
       console.log(msg.length);

       switch (msg.length) {
           case 1:
               chat.messageInfo("Ce joueur n'existe pas.");
               break;
           case 2:
               chat.messageModeration("Vous ne recevrez plus les messages de " + msg[1] + ".");
               break;
           case 3:
               chat.messageModeration("Vous êtes maintenant sur la liste noire de " + msg[1] + ".");
               break;
           case 4:
               chat.messageInfo(msg[1] + " n'est plus sur votre liste noire.");
               break;
           default:
               chat.messageModeration("Vous n'êtes plus sur la liste noire de " + msg[1] + ". Tapez /ignore " + msg[1] + " pour ne plus recevoir ce message.");
               break;
       }
   } else if (code === "CxIGN") { // Chuchotement non reçu (est dans ln)
      chat.messageInfo(msg[1] + " n'a pas reçu votre message car vous êtes sur sa liste noire.");
   }

  else
      return true;

  return false;
}

function MessageAutorisations(code, msg) {
  if (code === "CxMOD") {
      joueur.addFlag("modoj");
      chat.addCanalInvisible(new Cnl.Canal(txt.CANAL_VIP[lang], Cnl.N_CANAL_VIP));
      chat.addCanalInvisible(new Cnl.Canal(txt.CANAL_MP[lang], Cnl.N_CANAL_MP));
  } else if (code === "CxRESPMF") {
      joueur.addFlag("respof");
  } else if (code === "CxANIM") {
      joueur.addFlag("anim");
  } else if (code === "CxARBT" || code === "CxARBTAB") {
      joueur.addFlag("arbit");
  } else if (code === "CxARB+" || code === "CxARB") {
      joueur.addFlag("arbj");
      chat.addCanalInvisible(new Cnl.Canal(txt.CANAL_VIP[lang], Cnl.N_CANAL_VIP));
  } else if (code === "CxMODF") {
      joueur.addFlag("modof");
      chat.addCanalInvisible(new Cnl.Canal(txt.CANAL_VIP[lang], Cnl.N_CANAL_VIP));
      chat.addCanalInvisible(new Cnl.Canal(txt.CANAL_FOFO[lang], Cnl.N_CANAL_FORUM));
  }

  else
      return true;

  return false;
}
