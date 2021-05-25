<style>
.info-post {
   width: 20%;
   text-align: center;
   margin-left: 10px;
   margin-right: 20px;
}

.avatar-post {
   width: 120px;
   height: 80px;
   border: 5px solid black;
}

.auteur-post {
   color: #019787;
   font-size: 15px;
   text-align: center;
   margin-bottom: 5px;
}

.date-post {
   margin-top: 5px;
   font-size: 12px;
}

</style>

<template>
   <div class="info-post">
      <div class="auteur-post"> {{ auteur }} </div>
      <img class="avatar-post" ref="avatar" width="120px" heigt="80px" :src="avatar" :alt="'Avatar de ' + auteur"
         @error="corrigeAvatarLienRompu"
         @click="propagerEventMenu($event)">
      <div class="date-post texteGris"> {{ date }} </div>
   </div>
</template>

<script>
import Global from "../../Global.js";
export default {
   name: "DescriptionPost",

   props: {
      auteur: String,
      avatar: String,
      date: {
         type: String,
         default: ""
      }
   },

   methods: {
      corrigeAvatarLienRompu(event) {
        if (this.$refs.avatar.src !== Global.AVATAR_PAR_DEFAUT) {
           this.$refs.avatar.src = Global.AVATAR_PAR_DEFAUT;
           event.preventDefault();
         }
      },

      propagerEventMenu(event) {
         this.$emit("ouvertureMenuAvatar", event);
      }
   }
}
</script>
