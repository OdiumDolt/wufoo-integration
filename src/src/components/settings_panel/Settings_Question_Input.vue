<template>
    <div class="question-input-container dark-background-container">
       <div class="question-assingment-container" v-for="field in field_data">
            <div class="basic-font orange-text">
                {{ field["Title"] }}
            </div>
            <select v-model="field['Need']" class="settings-selector">
                <option>None</option>
                <option>Love/Connection</option>
                <option>Variety</option>
                <option>Certainty</option>
                <option>Significance</option>
                <option>Growth</option>
                <option>Contribution</option>
            </select>
       </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    props:['form_fields'],
    data(){
        var field_data = (localStorage.getItem("field_data") == null) ? {} : JSON.parse(localStorage.getItem("field_data") || "{}")
        return {
            field_data: field_data,
        }
    },
    watch:{
        field_data:{
            handler() {
                localStorage.setItem("field_data", JSON.stringify(this.field_data))
            },
            deep: true
        },
        form_fields(){
            if (Object.keys(this.form_fields).length > 0 && Object.keys(this.field_data).length == 0){
                let temp_field_data: any = {}
                for (let field of this.form_fields){
                    if (field["ID"] != "EntryId" && field["ID"] != "DateCreated" && field["ID"] != "CreatedBy" && field["ID"] != "LastUpdated" && field["ID"] != "UpdatedBy"){
                        temp_field_data[field["ID"]] = {}
                        temp_field_data[field["ID"]]["Choices"] = field["Choices"]
                        temp_field_data[field["ID"]]["Title"] = field["Title"]
                        temp_field_data[field["ID"]]["Need"] = "Certainty"
                        temp_field_data[field["ID"]]["ID"] = field["ID"]
                    }
                }
                this.field_data = temp_field_data
            }
        }
    }
})

</script>

<style lang="sass" src="../../static/css/settings_question_input.sass"></style>
