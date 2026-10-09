<template>
        <div class="dark-background-container info-display">
            <div v-for="need in needs" class="need-display" :class="need[1]['class'] + '-container'" @click="update_need(need)">
                <div class="need-number-text" :class="need[1]['class']">
                    {{ need[1]["total"] }}
                </div>
                <div class="need-text" :class="need[1]['class']">
                    {{ need[0] }}
                </div>
            </div>
        </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { calculate_needs } from '@/ts/calculate_needs';


export default defineComponent({
    props:["entry"],

    data(){
        return {
            needs: {}
        }
    },
    watch:{
        entry:{
            handler(){
                let unsorted_needs = calculate_needs(localStorage.getItem("field_data"), this.entry)
                let sorted_needs = []
                for (var need in unsorted_needs) {
                    sorted_needs.push([need, unsorted_needs[need]]);
                }
                sorted_needs = sorted_needs.sort(function(a, b) {
                    return a[1]["total"] - b[1]["total"];
                }).reverse();

                this.needs = sorted_needs
            },
            deep: true
        },
        needs() {
            this.$emit("get_need_info", this.needs[0])
        }
    },
    methods:{
        update_need(need: any){
            this.$emit("get_need_info", need)
        }
    },
})

</script>


<style lang="sass" src="../../static/css/info_screen.sass"></style>