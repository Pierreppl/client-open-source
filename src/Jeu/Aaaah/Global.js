const Directions = {
    AvancerDroite: 0,
    AvancerGauche: 1,
    StatiqueDroite: 2,
    StatiqueGauche: 3
}

const MouvementMap = {
    Boucler: 0,
    AllerRetour: 1,
    Stop: 2
}

const PD = {
    x: 8,
    y: 9
}

const PG = {
    x: -10,
    y: 9
}

const PB = {
    x: -1,
    y: 19
}

const IPS = 24;

const MAX_VITESSE_X = 99999; // à modifier
const MAX_VITESSE_Y = 99999; // à modifier

const MODE_RUN = 0;
const MODE_DEFILANTES = 1;
const MODE_RALLY = 2;
const MODE_FS = 3;
const MODE_MS = 4;

const GRAVITE_X = 0.2;
const GRAVITE_Y = 0.4;

const PUISSANCE_CRI_X = 4;
const PUISSANCE_CRI_Y = -2;
const BOOST = 1;
const TEMPS_ENTRE_CRI = 10000;
const TEMPS_TRAIT_GUIDE = 10000;
const TEMPS_ENTRE_SAUTS = 500;

const DEPLACEMENT_X = 2;            // Dans des conditions normales, le joueur se déplace de 2px par tic
const DEPLACEMENT_CONTA_X = 2.4;    // En cas de contamination, le joueur va plus vite

const DUREE_PARTIE = 120000;

const ZONES_GUIDABLE = [[-1000, 1000, -1000, 1000]];   // x, x2, y, y2

const DECALAGE_MAP = 1;

const ConstantesFlexibles = {
    GRAVITE_X: 0,
    GRAVITE_Y: 1,
    PUISSANCE_CRI_X: 2,
    PUISSANCE_CRI_Y: 3,
    TEMPS_ENTRE_CRI: 4,
    TEMPS_TRAIT_GUIDE: 5,
    TEMPS_ENTRE_SAUTS: 6,
    DEPLACEMENT_X: 7,
    DEPLACEMENT_CONTA_X: 8,
    DUREE_PARTIE: 9,
    BOOST: 10,
    ZONES_GUIDABLE: 11
}

export default Directions;

export {
    IPS,
    MAX_VITESSE_X, MAX_VITESSE_Y,
    MODE_RUN, MODE_DEFILANTES, MODE_RALLY, MODE_FS, MODE_MS,
    GRAVITE_X, GRAVITE_Y,
    DEPLACEMENT_X,
    DEPLACEMENT_CONTA_X,
    PUISSANCE_CRI_X, PUISSANCE_CRI_Y, BOOST, TEMPS_ENTRE_CRI, TEMPS_TRAIT_GUIDE,
    MouvementMap,
    DUREE_PARTIE,
    TEMPS_ENTRE_SAUTS,
    ConstantesFlexibles,
    PD, PG, PB,
    ZONES_GUIDABLE,
    DECALAGE_MAP
};