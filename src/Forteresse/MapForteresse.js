const MF_W_BLOCS_MAP = 200;
const MF_H_BLOCS_MAP = 100;

class MapForteresse {
   constructor() {
     this.lsFrigos = [];
     this.blocs = [];
     this.imageSVG = new Image();
     this.sauvegardable = true;
   }

   /**
    * Charge la map contenue dans <blocs>
    *
    * @param
    *   {String} blocs : liste des blocs de la map envoyés depuis le réseau
    *
    * @returns {undefined}
    * @private
    */
   initBlocsMap(blocs) {
     let i = 0;
     let j = 0;

     blocs = [];

     for (i = 0; i < MF_H_BLOCS_MAP; ++i) {
	blocs[i] = [];

	for (j = 0; j < MF_W_BLOCS_MAP; ++j) {
            blocs[i][j] = 0;
	}
     }
   }

   resetBlocs() {
     let i = 0;
     let j = 0;

     for (i = 0; i < MF_H_BLOCS_MAP; ++i) {
	for (j = 0; j < MF_W_BLOCS_MAP; ++j) {
		this.blocs[i][j] = 0;
	}
     }
   }

   /**
    * Charge le monde officiel <idMonde> du jeu.
    *
    * @param
    *   {int} idMonde : id du monde
    * @param
    *   {String} data : couleurs + blocs de la map
    *
    * @returns {undefined}
    */
   loadMondeOfficiel(idMonde, data) {
     this.imageSVG = new Image(2000, 1000);

     if (idMonde < 0 || idMonde > 21)
         return;

     this.imageSVG.src =  "Forteresse/Maps/" + idMonde + ".svg";
     this.imageSVG.onload = function() {
         if (data !== "")
             this.initBlocsMap(data);
         //ctx.drawImage(this, 0, 0);
         ctx.drawImage(this, 200, 200, 800, 600, 0, 0, 800, 600);
         //ctx.drawImage(image, sx, sy, sLargeur, sHauteur, dx, dy, dLargeur, dHauteur);
     };
   }

   /**
    * Charge un monde personnalisé.
    *
    * @param
    *   {String} data : contenu du monde personnalisé + couleurs + blocs
    *
    * @returns {undefined}
    */
   loadMondePersonnalise(data) {
     // ...
   }

   refresh(joueur) {
       ctx.drawImage(this.imageSVG, joueur.x, joueur.y, 800, 600, 0, 0, 800, 600);
   }
}

export { MF_W_BLOCS_MAP, MF_H_BLOCS_MAP,

         MapForteresse };
