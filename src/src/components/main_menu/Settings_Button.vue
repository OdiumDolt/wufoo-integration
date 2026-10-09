<template>
    <div @click="on_click" class="settings-button dark-background-container basic-font orange-text">
        Settings
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';


export default defineComponent({
    methods:{
        on_click(){
            this.$emit("open_settings")
        }
    }
})
</script>

<!-- <style lang="sass" src="./../../static/css/basic.sass"></style> -->
<style lang="sass" src="./../../static/css/settings_button.sass"></style>