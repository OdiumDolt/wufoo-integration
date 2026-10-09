<template>
    <div class="clear-background-container main-window">
        <div class="sidebar-container">
            <div class="dark-background-container basic-font welcome-message">
                Welcome, {{ name }}.
            </div>
            <div class="dark-background-container entry-select-container">
                <Search_Button @search="update_search"/>
                <div v-for="entry in entries">
                    <Entry_Button :entry="entry" @update_select="update_select"/>
                </div>
            </div>
            <Settings_Button @open_settings="open_settings"/>
        </div>
        <div class="info-display-container">
            <Info_Menu :entry="selected_entry" @get_need_info="get_need_info"/>
            <Info_Questions_menu :need="selected_need"/>
        </div>
        <Info_Notes_Menu :entry_name="entry_name"/>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { get_forum_data } from '@/ts/get_forum';
import Entry_Button from './Entry_Button.vue';
import Search_Button from './Search_Button.vue'
import Settings_Button from './Settings_Button.vue'; 
import { array_move } from '@/ts/move_array'
import Info_Menu from './Info_Menu.vue';
import Info_Questions_menu from './Info_Questions_menu.vue';
import Info_Notes_Menu from './Info_Notes_Menu.vue'
import { throwStatement } from '@babel/types';

export default defineComponent({
    components:{
        Search_Button,
        Entry_Button,
        Settings_Button,
        Info_Menu,
        Info_Questions_menu,
        Info_Notes_Menu
    },
    data(){
        return {
            entries: new Array,
            send_data : {
                subdomain: localStorage.getItem("subdomain"),
                api_key: localStorage.getItem("api_key"),
                form_id: localStorage.getItem("form_id"),
                type: "entries.json"
            },
            name: localStorage.getItem("name"),
            selected_entry:"",
            selected_need:{},
            entry_name:""
        }
    },
    methods:{
        update_search(search_term: string){
            for(let entry of this.entries){
                if (entry["Field88"].toLowerCase().startsWith(search_term.toLowerCase())){
                    this.entries = array_move(this.entries, this.entries.indexOf(entry), 0)
                }
            }
            
        },
        update_select(entry: any){
            this.selected_entry = entry
            this.entry_name = entry["Field88"] + entry["Field89"] + this.selected_entry["DateCreated"]
        },
        open_settings(){
            this.$emit("open_settings")
        },
        get_need_info(need: any){
            this.selected_need = need
        }
    },
    mounted: function (){
        get_forum_data(this.send_data).then(response => {
            this.entries = JSON.parse(response)["Entries"].reverse()
            this.selected_entry = this.entries[0]
            this.entry_name = this.selected_entry["Field88"] + this.selected_entry["Field89"] + this.selected_entry["DateCreated"]
        })
    }
    
})

</script>

<style lang="sass" src="../../static/css/main_menu.sass"></style>
<style lang="sass" src="../../static/css/info_screen.sass"></style>