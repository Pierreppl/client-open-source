<template>
    <div v-show="visible" class="tooltip" ref="tooltip">
        {{contenu}}
    </div>
</template>

<style>
    .tooltip {
        position: absolute;
        top: 0;
        left: 0;
        background: #070616;
        color: white;
        z-index: 9999;
        max-width: 80px;
        padding: 5px;
        border-radius: 5px;
    }
</style>

<script>
export default {
    name: 'Tooltip',
    data() {
        return {
            contenu: "",
            visible: false,
        }
    },
    methods: {
        displayTooltip(content, event) {
            this.$refs.tooltip.style.top = event.y-95+'px';
            this.$refs.tooltip.style.left = event.target.offsetLeft+'px';
            this.contenu = content;
            this.visible = true;
        },
        reset() {
            this.contenu = '';
            this.visible = false;
        }
    },
    mounted() {
        this.$emit('register', this);
    }
}
</script>