<template>
    <textarea class="dark-background-container notes-menu-container" v-model="notes[entry_name]" placeholder="Notes">
    </textarea>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    props:['entry_name'],
    
    data(){
        try{
            var notes: { [name : string] : string} = JSON.parse(localStorage.getItem("notes") || "")
            if (notes[this.entry_name] == undefined){
                notes[this.entry_name] = ""
            }
        }
        catch(TypeError){
            var notes: { [name : string] : string} = {}
            notes[this.entry_name] = ""
        }
        return{
            "notes":notes
        }
    },
    watch:{
        entry_name:{
            handler(){
                if (this.notes[this.entry_name] == undefined){
                    this.notes[this.entry_name] = ""
                }
            },
            deep:true
        },
        notes:{
            handler(){
                localStorage.setItem("notes", JSON.stringify(this.notes))
            },
            deep:true
        }
    },
})

</script>

<style lang="sass" src="../../static/css/info_notes_menu.sass"></style>