<style>
    .info-boum {
    position: relative;
    bottom: -10px;
    left: 600px;
}
</style>

<template>
<div class="info-boum" v-if="partieBouboum">
    <div id="nb-bombes"> Bombes : 1 </div>
    <div id="nb-po"> Puissance : 1 </div>
    <div id="boum-bonus"> Bonus : Aucun </div>
</div>

</template>

<script>

import Global from "../Global.js";

export default {
    name: "InfoBouboum",

    data: function() {
        return {
            partieBouboum: true,
        }        
    },
}   

</script>