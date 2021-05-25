
import Global from "../Global.js";
import Forum from "../Forum/Forum.vue";

/**
 * Vérifie si <input> est une commande pré-traitée par
 * le client.
 *
 * @param {String} input : commande entrée
 *
 * @return {Boolean} :
 *   - true : la commande était une commande pré-traitée
 *   - false : la commande n'en était pas une
 */
function VerifEtFaitCmdPretraitee(input) {
  const params = input.toLowerCase().split(" ");
  const cmd = params[0];

  const joueur = Global.$etat.joueur;
  const reseau = Global.$config.reseau;
  const $root = Global.vue.$root;
  const chat = Global.$etat.instanceChat;

  // Obtenir son ping/le ping d'un joueur
  if (cmd === "ping") {
     if (params.length > 1 && params[1] !== "" && joueur.aCmdArbitrage("*"))
        reseau.Envoie("CxPong#0#" + params[1]);
     else
        reseau.Envoie("CxPing#" + Number(new Date()));
  }

  // Ouvrir le Forum
  else if (cmd === "forum") {
     $root.$emit("afficher-forum", true);
  }

  else if (cmd === "silence") {
     joueur.inverseSilenceChat();
  }

  else if (cmd === "r") {
     if (params.length === 1) {
        chat.messageInfo("/r Message : envoyer un message à la dernière personne qui vous a chuchoté.");
     } else {
        if (joueur.auteurDernierChuchoRecu === undefined)
           chat.messageInfo("Aucun joueur ne vous a déjà chuchoté.");
        else
           chat.simulerCmd("m " + joueur.auteurDernierChuchoRecu + " " + input.substring(2));
     }
  }

  else
     return false;

  return true;
}

export { VerifEtFaitCmdPretraitee };
