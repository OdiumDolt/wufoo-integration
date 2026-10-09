<template>
    <div class="settings-container clear-background-container">
        <Settings_Form_Input @update_forum_settings="pull_forum_info" @close_settings="close_settings"/>
        <Settings_Question_Input :form_fields="form_fields"/>
    </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue';
import Settings_Question_Input from './Settings_Question_Input.vue';
import { get_forum_data } from '@/ts/get_forum';
import Settings_Form_Input from './Settings_Form_Input.vue';

export default defineComponent({
    components:{
    Settings_Question_Input,
    Settings_Form_Input
    },
    data(){
        return {
            update_timer: Date.now(),
            form_data: {
                subdomain: (localStorage.getItem("subdomain") != null) ? localStorage.getItem("subdomain") : "",
                form_id: (localStorage.getItem("form_id") != null) ? localStorage.getItem("form_id") : "",
                api_key: (localStorage.getItem("api_key") != null) ? localStorage.getItem("api_key") : "",
                type: "fields.json"
            },
            form_fields: {},
            old_form_data: {},
            show_settings: true
        }
    },
    methods:{
        pull_forum_info(args: any){
            localStorage.setItem("subdomain", args.subdomain)
            localStorage.setItem("form_id", args.form_id)
            localStorage.setItem("api_key", args.api_key)
            this.form_data = args
        },
        close_settings(){
            this.$emit("close_settings")
        }
    },
    mounted: async function () {
        window.setInterval(async () => {
            if (this.form_data != this.old_form_data){
                let new_data = await get_forum_data(this.form_data)
                if (new_data != undefined){
                    this.form_fields = JSON.parse(new_data)["Fields"]
                }
            }
            this.old_form_data = this.form_data
        }, 1000)
    }
})

</script>
