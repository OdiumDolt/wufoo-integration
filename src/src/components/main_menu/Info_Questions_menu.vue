<template>
    <div class="dark-background-container info_questions_menu">
        <div class="need-question-list dark-background-container" :class="need_class + '-questions-container'">
            <div class="title-text">Yes</div>
            <div class="need-question-text" v-for="yes_ans of yes">
                {{yes_ans}}
            </div>
        </div>
        <div class="need-question-list dark-background-container" :class="need_class + '-questions-container'">
            <div class="title-text">Partially</div>
            <div class="need-question-text" v-for="part_ans of partially">
                {{part_ans}}
            </div>
        </div>
        <div class="need-question-list dark-background-container" :class="need_class + '-questions-container'">
            <div class="title-text">No</div>
            <div class="need-question-text" v-for="no_ans of no">
                {{no_ans}}
            </div>
        </div>
    </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue';
export default defineComponent({
    props:["need"],
    data(){
        return {
            yes: {},
            partially: {},
            no: {},
            need_class: "None"
        }
    },
    watch:{
        need:{
            handler(){
                this.yes = this.need[1]["Yes"]
                this.partially = this.need[1]["Partially"]
                this.no = this.need[1]["No"]
                this.need_class = this.need[1]["class"]
            },
            deep:true
        }
    }
})
</script>

<style lang="sass" src="../../static/css/info_questions_menu.sass"/>