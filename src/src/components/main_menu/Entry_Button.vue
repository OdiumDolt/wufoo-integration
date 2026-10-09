<template>
    <div class="entry-button-container" @click="update_entry">
        <div class="basic-font orange-text name-text">
            {{entry["Field88"]}}
        </div>
        <div class="basic-font date-text">
            {{date_created}}
        </div>
    </div>
</template>


<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    props:['entry'],
    data(){
        let days = ["Sunday", "Monday", "Tuesday", "Wenesday", "Thursday", "Friday", "Saturday"]
        let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        
        let date_obj = new Date(this.entry["DateCreated"])
        
        let date_created = days[new Date(date_obj).getDay()] + ", "
        date_created += months[date_obj.getMonth()] + " "
        date_created += date_obj.getDate() + " "
        date_created += date_obj.getFullYear()
        return {
            date_created: date_created,
        }
    },
    methods:{
        update_entry(){
            this.$emit("update_select", this.entry)
        }
    },
    watch:{
        entry(){
            let days = ["Sunday", "Monday", "Tuesday", "Wenesday", "Thursday", "Friday", "Saturday"]
            let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
            
            let date_obj = new Date(this.entry["DateCreated"])
            
            let date_created = days[new Date(date_obj).getDay()] + ", "
            date_created += months[date_obj.getMonth()] + " "
            date_created += date_obj.getDate() + " "
            date_created += date_obj.getFullYear()
            this.date_created = date_created
        }
    }
})

</script>

<style lang="sass" src="../../static/css/entry_button.sass"></style>
