<template>
    <div class="content">
        <slot></slot>
    </div>
</template>

<style lang="scss">
    .content
    {
        padding-top:46px;
        padding-bottom:98px;
        overflow-y:auto;
    }
</style>
<script lang="babel">
    import Vue from 'vue';

    export default {
        components:{

        },
        data(){
            return {
            };
        },
        ready(){

        },
        route:{
            data(trans){

            }
        },

        methods:{

        },

        computed:{

        },

    }
</script>