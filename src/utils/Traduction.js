import TradCharteForum from "./GrdTrad/TradCharteForum.js";

const txt = {

LANGUE_FR: 0,
LANGUE_EN: 1,

SP_DBL_PONCT: [" ", ""],

/********************************************************
  **                    Annonces                     **
 ********************************************************/

NON_CO: ["Ce joueur n'est pas connecté.", "This player is not connected."],

CO_AMI: [" s'est connecté(e) au jeu.", " logged in."],
DECO_AMI: [" s'est déconnecté(e) du jeu.", " logged out."],

/********************************************************
  **                 Canal / Messages                 **
 ********************************************************/
CANAL_TOUS: ["Tous", "All"],
CANAL_VIP: ["VIP", "VIP"],
CANAL_MP: ["MP", "MP"],
CANAL_TEAM: ["Team", "Team"],
CANAL_CT: ["CT", "CT"],
CANAL_SALON: ["Salon", "Room"],
CANAL_ALLIES: ["Alliés", "Allies"],
CANAL_ELO: ["ELO", "ELO"],
CANAL_CHUCHOTER: ["Chuchoter", "Whisper"],
CANAL_FUSION: ["Fusion", "Fusion"],
CANAL_FOFO: ["F", "F"],
CANAL_GENERAL: ["Général", "General"],

ENTETE_MSG_MODERATION: ["[Modération]", "[Moderation]"],
ENTETE_MSG_MODERATION_HALLOWEEN: ["[Modémoniques]", "[Modemoniac]"],
ENTETE_MSG_SERVEUR: ["[Message Serveur]", "[Server Message]"],

VOUS_CHUCHOTE: [" vous chuchote : ", " whispers to you: "],
VOUS_CHUCHOTEZ: ["Vous chuchotez à ", "You whisper to "],
VOUS_SUSURRE: [" vous susurre : ", " sweetly whispers to you:"],
VOUS_SUSURREZ: ["Vous susurrez à ", "You sweetly whispher to "],

/********************************************************
  **                   Erreur Réseau                  **
 ********************************************************/

SUPPORT_WS: ["Votre navigateur doit pouvoir supporter WebSocket.", "Your browser must support WebSocket."],
ECHEC_CO: ["Échec de la connexion : ", "The connection failed:"],
TENTATIVE_RECO: ["Impossible de se connecter au jeu. Tentative de reconnexion [",
                 "The connection failed. Attempting to reconnect ["],
RECO_IMPO: ["Impossible de se connecter au jeu. Vérifiez l\'état de votre connexion et réessayez plus tard.",
            "The connection failed. Please check your connection status and try again later."],
CO_INUT: ["Connexion inutilisable pour le moment.", "The connection is unusable at the moment."],
CO_INTERROMPUE: ["La connexion avec le serveur a été interrompue :'(", "The connection to the server was interrupted :'("],

ERR_VERSION_JEU: ["Impossible de se connecter, votre version semble incompatible avec celle du serveur. Essayez de rafraîchir la page.",
                  "Cannot connect to the server because of a version mismatch. Try refreshing the page."],
ERR_J_DEJA_CO: ["Ce joueur est déjà connecté. Si vous êtes le propriétaire du compte, merci de contacter la modération (moderation.minijeux@gmail.com)"
               , "This player is already connected. If you are the owner of this account, please contact the moderation (moderation.minijeux@gmail.com)"],
ERR_LOG_INCORRECT: ["Nom ou mot de passe incorrect.", "Incorrect name or password."],
ATTENTE_CO: ["Veuillez patienter...", "Please wait..."],

/*******************************************************
  **                   Menu options                  **
 * *****************************************************/

INFO_OPTIONS: ["Options", "Options"],
INFO_CLASSEMENT: ["Classements", "Rankings"],
INFO_TEAMLIST: ["Liste des teams", "Teams list"],
INFO_AMIS: ["Liste d'amis", "Friends list"],
INFO_MAIL: ["Messagerie", "Direct messages"],
INFO_PROFIL: ["Mon profil", "My profile"],
INFO_TEAM: ["Ma team", "My team"],
INFO_MATES: ["Coéquipiers en ligne", "Online teammates"],

/*******************************************************
  **               Options Générales                 **
 * *****************************************************/

OPT_SIGSONORE: ["Activer le signal sonore de début de partie", "Turn on game start signal"],
OPT_SONCHUCHO: ["Activer le son à la réception d'un chuchotement", "Turn on sound when receiving a whisper"],
OPT_CODECO: ["Afficher les connexions et déconnexions au salon", "Display room connections and disconnections"],
OPT_CODECOAMIS: ["Afficher les connexions et déconnexions des amis", "Display friend connections and disconnections"],
OPT_MSGJOUEUR: ["Afficher les messages sur le jeu au-dessus des personnages", "Display messages above players while playing"],
OPT_CP: ["Cacher le chat principal par défaut", "Hide the main chat by default"],
OPT_STAT: ["Désactiver l'évolution des statistiques", "Disable statistics evolution"],
OPT_MP: ["Désactiver la réception de messages privés", "Block direct messages"],
OPT_RECOMPELO: ["Afficher les récompenses Elo", "Display Elo rewards"],
OPT_CORR_ORTHO_CHAT: ["Désactiver le correcteur orthographique", "Disable the spell checker"],

/*******************************************************
  **                Options Forto                    **
 * *****************************************************/

OPTF_TRI: ["Trier les joueurs de Forteresse en fonction des frags", "Sort Forteresse players by frags"],
OPTF_SPRITES: ["Utiliser les anciens sprites sur Forteresse", "Use old Forteresse sprites"],
OPTF_TIR: ["Activer le tir continu", "Enable continuous shots"],
OPTF_JACK: ["Afficher le Jack", "Display the Jack"],

/*******************************************************
  **               Options Aaaah                     **
 * *****************************************************/

OPTA_VOTE: ["Ne pas afficher la fenêtre de vote sur Aaaah", "Hide the vote window on Aaaah"],
OPTA_SON: ["Activer le son du guide", "Turn on guide sound on game start"],

/*******************************************************
  **                    Fenêtre                      **
 * *****************************************************/

FEN_CLOSE: ["Fermer cette fenêtre", "Close this window"],

FEN_LSAMIS: ["Liste d'amis", "Friends List"],
FEN_CLASSMNT: ["Classements", "Rankings"],
FEN_COEQENLIGNE: ["Coéquipiers en ligne", "Online teammates"],
FEN_FICHTEAM: ["Fiche team", "Team Page"],
FEN_MESSAGERIE: ["Messagerie", "Direct messages"],
FEN_MODIFPROFIL: ["Modifier votre profil", "Edit your profile"],
FEN_OPTIONS: ["Options", "Options"],
FEN_PROFIL: ["Profil de ", "Profile of "],
FEN_TEAMLISTE: ["Liste des teams", "Teams list"],

/*******************************************************
 **                       Forum                       **
 * *****************************************************/

FORUM_CHARTE: TradCharteForum.trad,

FORUM_GENERAL: ["Forum Général", "General Forum"],
FORUM_BUGS: ["Forum Bug", "Bug Forum"],
FORUM_ARTISTES: ["Forum des Artistes", "Artists' Forum"],
FORUM_AAAAH: ["Forum Aaaah", "Aaaah Forum"],
FORUM_BOUBOUM: ["Forum Bouboum", "Bouboum Forum"],
FORUM_FORTO: ["Forum Forteresse", "Forteresse Forum"],
FORUM_TEAM: ["Forum Team", "Team Forum"],
// Forums confidentiels : pas traduits

FORUM_DESCR_GENERAL: ["Pour parler de tout et de rien.", "To talk about this and that."],
FORUM_DESCR_ARTISTES: ["Forum dédié aux créations : textes, avatars et images diverses."
                     , "For your creations: texts, avatars and various images."],

FORUM_DESCR_BUGS: ["Si vous rencontrez des bugs, c'est par ici que ça se passe."
                , "If you encounter bugs, you're at the right place."],
FORUM_DESCR_AAAAH: ["Espace de discussion sur Aaaah!.", "Discussion space for Aaaah!."],
FORUM_DESCR_BOUBOUM: ["Espace de discussion sur Bouboum.", "Discussion space for Bouboum."],
FORUM_DESCR_FORTO: ["Espace de discussion sur Forteresse.", "Discussion space for Forteresse."],
FORUM_DESCR_TEAM: ["Votre topic team et ceux des teams en fusion avec la vôtre.",
                   "Your team topic and those of the teams fused with yours."],

FORUM_VALIDER_PAGE: ["Valider", "Validate"],
FORUM_RETOUR_PARTIES: ["Retour à la liste des parties", "Back to main lobby"],
FORUM_RETOUR_FORUMS: ["Retour à la liste des forums", "Back to forums list"],
FORUM_RETOUR_SUJETS: ["Retour à la liste des sujets", "Back to topics list"],
FORUM_PAGE_SUIVANTE: ["Page suivante", "Next page"],
FORUM_PAGE_PRECEDENTE: ["Page précédente", "Previous page"],
FORUM_RECHERCHER_SUJET: ["Rechercher un sujet", "Search a topic"],
FORUM_CREER_SUJET: ["Créer un nouveau sujet", "Create a new topic"],
FORUM_REPONDRE_SUJET: ["Répondre", "Answer"],
FORUM_TAPEZ_VOTRE_MSG: ["Tapez votre message ici.", "Write here."],
FORUM_MODIFIFIER_SUJET: ["Modifier", "Edit"]
};

export default {txt};
