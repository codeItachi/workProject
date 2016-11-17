<template>
    <div class="list">
        <slot name="list"></slot>
        <slot name="pageTool"></slot>
    </div>
</template>

<style lang="scss">
    .page-tool
    {
        position:fixed;
        right:0;
        bottom:58px;
        height:32px;
        width:100%;
        text-align:center;
        z-index:9999;

        >div
        {
            display:inline-block;
            border-radius:15px;
            overflow:hidden;
            font-size:0;
            background-color:#fff;
            border:1px solid #ddd;
        }

        button{
            font-size:14px;
            color:#999;
            outline:0;
            border:0;
            height:30px;
            line-height:28px;
            background-color:#fff;
            background-image:url(../../../static/arrow.png);
            background-repeat:no-repeat;

            &.btn-prev{
                padding-left:22px;
                padding-right:10px;
                border-radius:30px 0 0 30px;
                background-position:9px 7px;
                background-size:12px;
                border-right:1px solid #ddd;
            }
            &.btn-next{
                padding-right:22px;
                padding-left:10px;
                border-radius:0 30px 30px 0;
                background-position:44px -17px;
                background-size:12px;
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