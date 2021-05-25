import Global from "../Global.js";

const REG_PSEUDO_REF = /\[\[@[a-zA-Z]{1,12}\]\]|\[\[@\*[a-zA-Z]{1,12}[_][0-9]*\]\]/;

const REF_PSEUDO_DEB = "[[@";
const REF_PSEUDO_FIN = "]]";

const szRPD = REF_PSEUDO_DEB.length;
const szRPF = REF_PSEUDO_FIN.length;

function ParseMessageLien(msg, classe, callback) {
   let div = document.createElement("div");
   let i, finRef;
   let substr = msg.replace(/\&ht;/gi, "#"), pseudo;

   div.className = classe;

   console.log(msg);

   while (true) {
      i = substr.search(REG_PSEUDO_REF);
      if (i === -1) {
         div.insertAdjacentHTML("beforeend", substr);
         return div;
      }

      // Ajouter le texte avant la première occurence d'un pseudo
      div.insertAdjacentHTML("beforeend", substr.substr(0, i));

      // Extraire le pseudo référencé
      finRef = substr.indexOf("]]", i + szRPD); // szRPD = REF_PSEUDO_DEB.length()
      pseudo = substr.substr(i + szRPD, finRef - (i + szRPD));

      div.appendChild(ConstruireRef(pseudo)); // Ajout lien fofo

      substr = substr.substr(finRef + szRPF); // szRPF = REF_PSEUDO_FIN.length()
   }

   return div;
}

function ConstruireRef(pour) {
   let span = document.createElement("span");

   span.innerHTML = pour;

   span.onclick = function () { Global.$etat.instanceChat.simulerCmd("profil " + pour); }
   span.style = "text-decoration: underline; cursor: pointer;";

   return span;
}

function ParseMessageChat(msg) {
   return msg.replace(/#/g, "&ht;")
             .replace(/\@\{[a-zA-Z]{1,12}\}|\@\{\*[a-zA-Z]{1,12}[_][0-9]*\}/g  /* @{Pseudo} (invités compris) */
                     , function (str) { return REF_PSEUDO_DEB + str.substr(2, str.length - 3) + REF_PSEUDO_FIN; });
}

export { REG_PSEUDO_REF, REF_PSEUDO_DEB, REF_PSEUDO_FIN,

         ParseMessageLien, ParseMessageChat };
