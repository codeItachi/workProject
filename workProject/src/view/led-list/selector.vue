<template>
    <div class="slector">
        <slot></slot>
    </div>
</template>

<style lang="scss">
    .slector
    {
        width:100%;
        height:35px;
        color:#028dea;
        line-height:32px;
        font-size:15px;
        text-align:left;
        background-color:#f1f1f1;
        border-bottom:1px solid #ddd;

        >span
        {
            display:inline-block;
            padding:0 15px;
            line-height:34px;

            &.again
            {
                color:#999;
            }
        }
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