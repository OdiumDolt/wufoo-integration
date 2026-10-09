<template>
    <div class="signup-container clear-background-container" v-if="active">
        <p class="greeting-text">Good {{ time_of_day }}</p>
        <input placeholder="What is your first name?" class="name-input" v-model="name" @keyup.enter="submit">
    </div>
</template>

<script lang="ts">

import { defineComponent } from "vue";
const date = new Date();
const hours = date.getHours()
var active: any = (localStorage.getItem("name") == null)
var time = ((hours >= 4 && hours < 12) ? "morning" : (hours >= 12 && hours < 18) ? "afternoon" : "evening")

export default defineComponent({
    data (){
        return {
            time_of_day: time,
            name: "",
            active: active
        }
    },
    methods: {
        submit: function (){

            localStorage.setItem("name", this.name)
            
            this.$emit("saved")
            this.active = false
        }
    }

})
</script>

<style src="../../static/css/signup.sass" lang="sass"></style>
