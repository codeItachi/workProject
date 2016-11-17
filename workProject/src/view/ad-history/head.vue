<template>
    <div class="head history">
        <slot name="left"></slot>
        <slot name="center"></slot>
        <slot name="right">
            <span class="right" v-gesture:tap.stop.prevent="conditions()">筛选</span>
        </slot>
    </div>
</template>

<style lang="scss">
.head.history
{
    position:fixed;
    width: 100%;
    height: 46px;
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
        width:44px;
        height:44px;
        line-height:44px;
        text-align:center;
        padding:0 15px;
        font-size:15px;
        background:url(../../../static/adlist-i.png) no-repeat 11px -327px;
        background-size:50px;


        &.again
        {
            color:#dae1e4;
        }
    }

    .right
    {
        position: absolute;
        height: 44px;
        right: 0;
        top: 0;
        min-width: 30px;
        padding-left: 35px;
        padding-right: 15px;
        display: block;
        text-align: center;
        font-size: 16px;
        color: #fff;
        line-height: 44px;
    }
}
</style>
<script lang="babel">
    import Vue from 'vue';
    import vueGesture from 'vue-gesture';
    Vue.use(vueGesture);

    export default {
        props:{
            conditions:{
                type:Function,
            }
        },
    }
</script>