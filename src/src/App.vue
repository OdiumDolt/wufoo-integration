<template>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <First_Time_Login v-if="first_login" @show_main_menu="show_main_menu"/>
    <Settings_Container v-if="show_settings" @close_settings="close_settings"/>
    <Main_Menu v-if="show_menu" @open_settings="open_settings"/>
</template>

<script lang="ts">


import { defineComponent } from "vue";
import First_Time_Login from "./components/first_time_login/First_Time_Login.vue";
import Main_Menu from "./components/main_menu/Main_Menu.vue"
import Settings_Container from "./components/settings_panel/Settings_Container.vue";

var user_name = localStorage.getItem("name")
var API_KEY = localStorage.getItem("API_KEY")
var forum_id = localStorage.getItem("forum_id")
var email = localStorage.getItem("email")
var first_login = true
if (user_name != null){
    var first_login = false
}
let show_menu = (first_login != true)

export default defineComponent({
    components: {
        First_Time_Login,
        Main_Menu,
        Settings_Container
    },
    data() {
        return{
            user_name: user_name,
            first_login: first_login,
            show_settings: false,
            show_menu: show_menu
        }
    },
    methods: {
        show_main_menu(){
            this.first_login = false
            this.show_menu = true
        },
        open_settings(){
            this.show_menu = false
            this.show_settings = true
        },
        close_settings(){
            this.show_settings = false
            this.show_menu = true
        }
    }
})
</script>

<style src="./static/css/main.sass" lang="sass">
</style>
<style lang="sass" src="./static/css/basic.sass"></style>