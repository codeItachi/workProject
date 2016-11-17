<template>
    <div class="search">
        <span>
            <slot></slot>
        </span>
    </div>
</template>

<style lang="scss">
    .search
    {
        width:100%;
        height:90px;
        padding:28px 30px ;
        span
        {
            display:block;
            width:100%;
            height:34px;
            color:#fff;
            line-height:20px;
            border:1px solid #fff;
            border-radius:17px;
            padding:6px 16px 6px 32px;
            background:url(../../../static/guide-i.png) no-repeat 15px -35px;
            background-size:60px;
        }
        input
        {
            width:100%;
            height:20px;
            
            border:0;
            outline:0;
            color:#fff;
            font-size:14px;
            background:rgba(0,0,0,0);

            &::-webkit-input-placeholder
            {
                color:#fff;
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