<template>
    <div class="content-input-container">
        <div class="welcome-message basic-font orange-text dark-background-container">Welcome, {{name}}.</div>
        <div class="content-input dark-background-container">
            <div>
                <div class="basic-font orange-text settings-discriptor-text">Subdomain</div>
                <input class="content-input-field basic-font dark-background-container" v-model="subdomain"/>
            </div>
            <div>
                <div class="basic-font orange-text settings-discriptor-text">Form ID</div>
                <input class="content-input-field basic-font dark-background-container" v-model="form_id"/>
            </div>
            <div>
                <div class="basic-font orange-text settings-discriptor-text">API Key</div>
                <input class="content-input-field basic-font dark-background-container" v-model="api_key"/>
            </div>
            <div class="buttons-container">
                <div class="small-button" @click="close_settings">
                    Close
                </div>
                <div class="small-button" @click="save_settings">
                    Download
                </div>
                <div class="small-button">
                    <input id="actual-btn" type="file" @change="upload_settings" hidden/>
                    <label for="actual-btn">Upload</label>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { download } from "../../ts/download_file"

export default defineComponent({
    data(){
        return {
            name: localStorage.getItem("name"),
            subdomain: (localStorage.getItem("subdomain") != null) ? localStorage.getItem("subdomain") : "",
            form_id: (localStorage.getItem("form_id") != null) ? localStorage.getItem("form_id") : "",
            api_key: (localStorage.getItem("api_key") != null) ? localStorage.getItem("api_key") : "",
            file_upload : ""
        }
    },
    watch:{
        subdomain() {
            this.update_form_settings()
        },
        form_id() {
            this.update_form_settings()
        },
        api_key() {
            this.update_form_settings()
        }
    },
    methods:{
        update_form_settings() {
            this.$emit("update_forum_settings", {subdomain:this.subdomain, form_id:this.form_id, api_key:this.api_key, type:"fields.json"})
        },
        close_settings(){
            this.$emit("close_settings")
        },
        save_settings(){
            let file = {
                "notes":JSON.parse(localStorage.getItem("notes") || ""),
                "api_key": localStorage.getItem("api_key") || "",
                "field_data": JSON.parse(localStorage.getItem("field_data") || ""),
                "name": localStorage.getItem("name") || "",
                "subdomain": localStorage.getItem("subdomain") || "",
                "form_id": localStorage.getItem("form_id") || "",            
            }
            download("wufoo-form.save", JSON.stringify(file))
        },
        upload_settings(e: any){
            let file = e.target.files[0]
            let reader = new FileReader()
            reader.onload = this.handleFileLoad
            reader.readAsText(file)
        },
        handleFileLoad(event: any) {
            let file = JSON.parse(event.target.result)

            localStorage.setItem("notes", JSON.stringify(file["notes"]))
            localStorage.setItem("api_key", file["api_key"])
            localStorage.setItem("field_data", JSON.stringify(file["field_data"]))
            localStorage.setItem("name", file["name"])
            localStorage.setItem("form_id", file["form_id"])
            localStorage.setItem("subdomain", file["subdomain"])
        }

    }
})


</script>

<style lang="sass" src="../../static/css/user_settings.sass"></style>
