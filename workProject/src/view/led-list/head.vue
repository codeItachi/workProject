<template>
    <div class="header">
        <slot name="left"></slot>
        <slot name="center"></slot>
        <slot name="right"></slot>
        <slot name="selector"></slot>
    </div>
</template>

<style lang="scss">
.header
{
    position:fixed;
    width: 100%;
    height: auto;
    top:0;
    line-height: 44px;
    text-align: center;
    background-color:#12b7f5;
    z-index:99;
    opacity:1;
    color:#fff;
    z-index: 9999;

    .center
    {
        max-width:150px;
        font-size:18px;
        line-height:46px;
        height:46px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .left
    {
        position:absolute;
        display:block;
        left:0;
        top:0;
        width:60px;
        height:46px;
        line-height:46px;
        text-align:center;
        padding:0 15px;
        font-size:15px;

        &.list
        {
            background:url(../../../static/adlist-i.png) no-repeat 14px -146px;
            background-size:50px;
        }

        &.map
        {
            background:url(../../../static/adlist-i.png) no-repeat 14px -327px;
            background-size:50px;
        }

    }

    .led-right
    {
        position: absolute;
        height: 46px;
        right: 0;
        top: 0;
        min-width: 30px;
        padding-left: 35px;
        padding-right: 15px;
        display: block;
        text-align: center;
        font-size: 16px;
        color: #fff;
        line-height: 46px;

        // &:before
        // {
        //     position: absolute;
        //     content: "";
        //     display: block;
        //     width: 17px;
        //     height: 1px;
        //     top: 21px;
        //     right: 14px;
        //     background-color: #fff;
        // }
        // &:after
        // {
        //     position: absolute;
        //     content: "";
        //     display: block;
        //     width: 1px;
        //     height: 17px;
        //     right:22px;
        //     top: 14px;
        //     background-color: #fff;
        // }
    }
}
</style>
<script lang="babel">
    import Vue from 'vue';
    import vueGesture from 'vue-gesture';
    Vue.use(vueGesture);

    export default {
        components:{

        },
        data(){
            return {
                styleState:false,
            };
        },
        ready(){

        },
        route:{
            data(trans){

            }
        },

        methods:{
            showMeng(){
                this.styleState = true;
            },
            shutDownMeng(){
                this.styleState = false;
            },
            stopPrevent(e){
                 e.preventDefault();
            },
        },

        computed:{

        },

    }
</script>