<template>
    <input class="entry-button-container basic-font orange-text search-field" placeholder="Search" v-model="search_term"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    data(){
        return {
            search_term: ""

        }
    },
    watch:{
        search_term(){
            this.$emit("search", this.search_term)
        }
    }
})

</script>


<style lang="sass" src="../../static/css/entry_button.sass"></style>
<style lang="sass" src="../../static/css/search_button.sass"></style>