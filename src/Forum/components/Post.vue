<style src="../css/post.css">
</style>

<template>
   <div>
      <div class="post-forum" v-if="modeVisu">
         <div class="barre-separation-post" v-if="type !== 'sujet'"></div>
         <div class="corps-post">
            <DescriptionPost :auteur="auteurVisu" :avatar="avatarVisu" :date="dateVisu">
            </DescriptionPost>
            <div class="contenu-post" v-html="contenuHtml"></div>
         </div>
      </div>

      <div class="post-forum">
         <div v-if="type !== 'sujet' && !modeVisu" class="barre-separation-post">
         </div>
         <div class="corps-post">
            <DescriptionPost :auteur="auteur" :avatar="avatar" :date="date"
               @ouvertureMenuAvatar="propagerEventMenu">
            </DescriptionPost>
            <EcritureForum v-if="modeEdition" ref="textarea" :contenuParent="contenu"
               @majContenu="actualiserContenu">
            </EcritureForum>
            <div v-else class="contenu-post" v-html="contenuHtml"></div>
         </div>
         <div v-if="modeEdition" class="barre-separation-post">
            <a class="Posts-lienOptions" @click="annuler"> Annuler </a>
            <a class="Posts-lienOptions positionne-droite" @click="previsualiser"> Visualiser </a>
            <a class="Posts-lienOptions positionne-droite" @click="envoyerPost"> Envoyer </a>
         </div>
      </div>
   </div>
</template>

<script>
import * as General from "../../utils/General.js";
import Global from "../../Global.js";
import DescriptionPost from "./DescriptionPost.vue";
import EcritureForum from "./EcritureForum.vue";

window.spoiler = function(elt) {
   elt.parentElement.lastChild.style.display = elt.parentElement.lastChild.style.display === 'block'?'none':'block';
};

export default {
   name: "Post",

   components: {
      "DescriptionPost": DescriptionPost,
      "EcritureForum": EcritureForum
   },

   data: function() {
      return {
         id: 0,
         avatar: Global.AVATAR_PAR_DEFAUT,
         auteur: "???",
         date: "undefined",
         contenuHtml: "",
         contenu: "",
         modeEdition: false,
         modeVisu: false,
         auteurVisu: Global.$etat.joueur.nom,
         avatarVisu: Global.$etat.joueur.avatar,
         dateVisu: "Visualisation"
      }
   },


   props: {
      postArray: Array,
      type: String,
   },

   methods: {
      corrigeAvatarLienRompu(event) {
         if (this.$refs.avatar.src !== Global.AVATAR_PAR_DEFAUT) {
            this.$refs.avatar.src = Global.AVATAR_PAR_DEFAUT;
            event.preventDefault();
         }
      },

      /**
      * Remplace les balises "bbcode" par des balises html
      * TODO: gestion des couleurs (notamment avec les balises fermantes manquantes)
      * à améliorer.
      * @param {String} text : texte initial
      * @returns {String} : texte traité
      */
      remplacerBalisesParHtml(text) {
         return text.replace(/\r/g, "<br>")
         //citations :
         .replace(/<c>/gi, "<div class='forum-texte-cite'>")
         .replace(/<\/c>/gi, "</div>")
         .replace(/<j>/gi, "<span class='forum-citation-de'>")
         .replace(/<\/j>/gi, "</span>")
         .replace(/<V>/gi, "<span class='post-vert'>")
         .replace(/<R>/gi, "<span class='post-rouge'>")
         .replace(/<T>/gi, "<span class='post-bleu'>")
         .replace(/<O>/gi, "<span class='post-orange'>")
         .replace(/<D>/gi, "<span class='post-vert-clair'>")
         .replace(/<Y>/gi, "<span class='post-jaune'>")
         .replace(/<M>/gi, "<span class='post-mauve'>")
         .replace(/<VE>/gi, "<span class='post-vert'>")
         .replace(/<OR>/gi, "<span class='post-orange'>")
         .replace(/<JA>/gi, "<span class='post-jaune'>")
         .replace(/<BL>/gi, "<span class='post-bleu'>")
         .replace(/<VC>/gi, "<span class='post-vert-clair'>")
         .replace(/<MA>/gi, "<span class='post-mauve'>")
         .replace(/<RO>/gi, "<span class='post-rose'>")
         .replace(/<GR>/gi, "<span class='post-gris-citation'>")
         .replace(/<BG>/gi, "<span class='post-bleu-citation'>")
         .replace(/<RO>/gi, "<span class='post-rose'>")
         .replace(/<CC_([0-9]+[a-f]){6}/gi, "<span color=")
         .replace(/<\/[CJVRTODYM]>|<NVE>|<NOR>|<NJA>|<NMA>|<NVC>|<NBL>|<NRO>|<NBG>|<NGR>/gi, "</span>")
         .replace(/<SJ>/gi, "<u>")
         .replace(/<NSJ>/gi, "</u>")
         .replace(/<TI>/gi, "<span class='post-titre'>")
         .replace(/<NTI>/gi, "</span>")
         .replace(/<STI>/gi, "<span class='post-sous-titre'>")
         .replace(/<NSTI>/gi, "</span>")
         .replace(/<PT>/gi, "<span class='post-texte-petit'>")
         .replace(/<NPT>/gi, "</span>")
         .replace(/< *p/g, "<div")
         .replace(/< *\/p>/g, "</div>")
         .replace(/<cc_([0-9a-f]{6})>/gi, (t, code, decalage, chaine) => {
            return "<span style='color:#" + code + "'>";
         })
         .replace(/<n>/gi, "</span>")
         //balise font:
         //TODO: j'ai mis deux fois la meme opération, parce que une balise font imbriquée dans
         //une autre n'était pas remplacé... à améliorer.
         .replace(/< *font *size *= *["'](.*)['"] *>/gi, (t, size, decalage, chaine) => {
            return "<span style=\"font-size:" + size + "px\">";
         })
         .replace(/< *font *size *= *["'](.*)['"] *>/gi, (t, size, decalage, chaine) => {
            return "<span style=\"font-size:" + size + "px\">";
         })
         .replace(/< *\/font *>/gi, "</span>")
         // Balises manuelles
         .replace(/&ht;/gi, "#")
         .replace(/<SP>/gi, "<div class='spoiler forum-citation-de'><span class='spoiler-title' onclick='event.stopPropagation(); window.spoiler(this);'>Spoiler</span><div class='spoiler-content' style='display:none;'>")
         .replace(/<NSP>/gi, "</div></div>");
      },

      remplacerBalisesParBbcode(text) {

         return text.replace(/<J>Citation de (.*) :<\/J>/,
                     function(correspondance, p1, decalage, chaine) {
                        return "[c=" + p1 + "]";
                     })

                     .replace(/<VE>/gi, "[vert]").replace(/<NVE>/gi, "[/vert]")
                     .replace(/<OR>/gi, "[orange]").replace(/<NOR>/gi, "[/orange]")
                     //.replace(/<JA>/gi, "[jaune]").replace(/<NJA>/gi, "[/jaune]")
                     .replace(/<VC>/gi, "[vc]").replace(/<NVC>/gi, "[/vc]")
                     .replace(/<MA>/gi, "[m]").replace(/<NMA>/gi, "[/m]")

                     .replace(/<SJ>/gi, "[u]").replace(/<NSJ>/gi, "[/u]")

                     .replace(/<p align='center'>/gi, "[milieu]").replace(/<\/p >/gi, "[/milieu]")
                     .replace(/<p align='left'>/gi, "[gauche]").replace(/<\/p  >/gi, "[gauche]")
                     .replace(/<p align='right'>/gi, "[droite]").replace(/<\/p   >/gi, "[droite]")

                     .replace(/<C>/gi, "")
                     .replace(/<\/C>/gi, "[/c]")

                     .replace(/<TI>/gi, "[titre]")
                     .replace(/<NTI>/gi, "[/titre]")
                     .replace(/<STI>/gi, "[stitre]")
                     .replace(/<NSTI>/gi, "[/stitre]")
                     .replace(/<PT>/gi, "[petit]")
                     .replace(/<NPT>/gi, "[/petit]")

                     // .replace(/<(.*)>[^<N]*<N>/gi, function(correspondance, p1, decalage, chaine) {
                        // return correspondance.replace(/<N>/, p1);
                     // })
                     //TODO: Remplacement des <N>

                     .replace(/<V>/gi, "[v]")
                     .replace(/<R>/gi, "[r]")
                     .replace(/<BL>/gi, "[b]")
                     .replace(/<O>/gi, "[o]")
                     .replace(/<JA>/gi, "[j]")
                     .replace(/<M>/gi, "[m]")
                     .replace(/<RO>/gi, "[ro]")
                     .replace(/<BG>/gi, "[bg]")
                     .replace(/<GR>/gi, "[gr]")
                     .replace(/<SP>/gi, "[spoiler]")
                     .replace(/<NSP>/gi, "[/spoiler]");
      },

      formaterMessageEnvoi(msg) {

        // Remplacer les citations
        let iBaliseC = 0;

        while ((iBaliseC = msg.indexOf("[c=", iBaliseC)) !== -1) {
           let finCitation = msg.indexOf("[/c]", iBaliseC + "[c=".length);
           let finCOuvrant = msg.indexOf("]", iBaliseC + "[c=".length);

           if (finCOuvrant !== -1 && (finCitation === -1 || finCitation > finCOuvrant)) {
              let textRemplacement = "<BR><J>Citation de " + msg.substring(iBaliseC + "[c=".length, finCOuvrant) + " :</J>"
                                   + "<C>" + msg.substring(finCOuvrant + 1, finCitation) + "</C>";

              msg = msg.substring(0, iBaliseC)
                   + textRemplacement
                   + msg.substring(finCitation + "[/c]".length);

              iBaliseC += textRemplacement.length;
           } else {
              return "";
           }
        }
        //

        return msg.replace(/\[titre\]/gi, "<TI>")
                    .replace(/\[\/titre\]/gi, "<NTI>")
                    .replace(/\[stitre\]/gi, "<STI>")
                    .replace(/\[\/stitre\]/gi, "<NSTI>")
                    .replace(/\[petit\]/gi, "<PT>")
                    .replace(/\[\/petit\]/gi, "<NPT>")

                    .replace(/\[v\]/gi, "<V>")
                    .replace(/\[\/v\]/gi, "<N>")
                    .replace(/\[r\]/gi, "<R>")
                    .replace(/\[\/r\]/gi, "<N>")
                    .replace(/\[b\]/gi, "<BL>")
                    .replace(/\[\/b\]/gi, "<N>")
                    .replace(/\[o\]/gi, "<O>")
                    .replace(/\[\/o\]/gi, "<N>")
                    .replace(/\[vc\]/gi, "<VC>")
                    .replace(/\[\/vc\]/gi, "<N>")
                    .replace(/\[j\]/gi, "<JA>")
                    .replace(/\[\/j\]/gi, "<N>")
                    .replace(/\[m\]/gi, "<M>")
                    .replace(/\[\/m\]/gi, "<N>")
                    .replace(/\[ro\]/gi, "<RO>")
                    .replace(/\[\/ro\]/gi, "<N>")
                    .replace(/\[bg\]/gi, "<BG>")
                    .replace(/\[\/bg\]/gi, "<N>")
                    .replace(/\[gr\]/gi, "<GR>")
                    .replace(/\[\/gr\]/gi, "<N>")
                    .replace(/\[c\]/gi, "<C>")
                    .replace(/\[\/c\]/gi, "</C>")

                    .replace(/\[vert\]/gi, "<VE>").replace(/\[\/vert\]/gi, "<NVE>")
                    .replace(/\[orange\]/gi, "<OR>").replace(/\[\/orange\]/gi, "<NOR>")
                    .replace(/\[jaune\]/gi, "<JA>").replace(/\[\/jaune\]/gi, "<NJA>")

                    .replace(/\[u\]/gi, "<SJ>").replace(/\[\/u\]/gi, "<NSJ>")

                    .replace(/\[milieu\]/gi, "<p align=\'center\'>").replace(/\[\/milieu\]/gi, "</p>")
                    .replace(/\[gauche\]/gi, "<p align=\'left\'>").replace(/\[\/gauche\]/gi, "</p>")
                    .replace(/\[droite\]/gi, "<p align=\'right\'>").replace(/\[\/droite\]/gi, "</p>")

                    .replace(/[\x00-\x09]/gi, "")
                    .replace(/[\x0B-\x0C]/gi, "")
                    .replace(/[\x0E-\x1F]/gi, "")
                    .replace(/\[spoiler\]/gi, "<SP>")
                    .replace(/\[\/spoiler\]/gi, "<NSP>");
      },

      parseContenu(array) {
         this.avatar = General.AttribuerAvatar(array[3]);
         this.date = new Date(parseInt(array[1]) * 1000).toLocaleDateString();
         this.id = array[0];
         this.auteur = array[2];
         this.contenu = this.remplacerBalisesParBbcode(array[4]);
         this.contenuHtml = this.remplacerBalisesParHtml(array[4]);
      },

      propagerEventMenu(event) {
         this.$emit("ouvertureMenuAvatar", event, this.id, this.auteur, this.contenu);
      },

      previsualiser() {
         if (this.contenu === "")
            return;
         this.modeVisu = true;
         this.contenuHtml = this.remplacerBalisesParHtml(this.formaterMessageEnvoi(this.contenu));
      },

      envoyerPost() {
         const msg = this.formaterMessageEnvoi(this.contenu);
         if (this.type === "normal") {
            Global.$config.reseau.Envoie("FoE#" + this.id + "#" + msg);
            this.modeEdition = false;
            this.modeVisu = false;
         } else if (this.type === "reponse") {
            Global.$config.reseau.Envoie("FoR#" + msg + "#0");
            this.modeEdition = false;
            this.modeVisu = false;
         } else if (this.type === "sujet") {
            this.$emit("finSujet", msg);
         }

         this.$emit("finReponse");
      },

      actualiserContenu(contenu) {
         this.contenu = contenu;
      },

      annuler() {
         this.modeEdition = false;
         this.modeVisu = false;
         if (this.type === "reponse")
            this.$emit("finReponse");
         else
            this.$emit("annulerSujet");
      }
   },

   /* Attribue les bonnes valeurs aux propriétés en fonction du message donné par
   * le parent (ListePosts) */
   created() {
      this.parseContenu(this.postArray);
      if (this.type === "reponse" || this.type === "sujet")
         this.modeEdition = true;
   },

   watch: {
      postArray: function(newVal, oldVal) { // watch it
         this.parseContenu(newVal);
      }
   }
}
</script>
