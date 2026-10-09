<template>
    <Get_User_Name @saved="save_name"/>
    <Settings_Container v-if="show_settings" @close_settings="close_settings"/>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Get_User_Name from './Get_User_Name.vue'
import Settings_Container from '../settings_panel/Settings_Container.vue'

export default defineComponent({
    components: {
        Get_User_Name,
        Settings_Container
    },
    data (){
        return {
            show_settings:false
        }
    },
    methods: {
        save_name(){
            this.show_settings = true
        },
        close_settings(){
            this.$emit("show_main_menu")
            this.show_settings = false
        }
    }

})
</script>
