<template>
    <div class="links">
        <div>
            <div>
                <a class="s1" v-link="{path: '/led-add'}">添加显示屏</a>
            </div>
            <div>
                <a class="s2" v-link="{path: '/new-led-list'}">我的显示屏</a>
            </div>
            <div>
                <a class="s3" v-link="{path: '/new-ad-list'}">我的节目</a>
            </div>
        </div>
        <div>
            <!-- <div>
                <a class="s4">广告列表</a>
            </div>
            <div>
                <a class="s5">投放列表</a>
            </div> -->
            <div>
                <a class="s6"  v-link="{path: '/ad-history'}">历史记录</a>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
    .links
    {
        height:auto;
        padding:40px 25px;
        margin:0 10px;
        border-radius:30px;
        background-color:rgba(255,255,255,0.26);

        >div
        {
            display:-webkit-box;
            padding-top:30px;

            &:first-child 
            {
                padding-top:0px;
            }

            >div
            {
                display:block;
                -webkit-box-flex:1;
                text-align:center;
            }
        }

        a
        {
            display:inline-block;
            text-align:center;
            width:80px;
            height:82px;
            color:#fff;
            padding-top:58px;
            line-height:24px;
            font-size:14px;
            display:inline-block;
            background:url(../../../static/guide-i.png);
            background-repeat:no-repeat;

            &.s1
            {
                background-size:60px;
                background-position:14px -87px;
            }
            &.s2
            {
                background-size:60px;
                background-position:14px -176px;
            }
            &.s3
            {
                background-size:60px;
                background-position:14px -267px;
            }
            &.s4
            {
                background-size:60px;
                background-position:14px -358px;
            }
            &.s5
            {
                background-size:60px;
                background-position:14px -449px;
            }
            &.s6
            {
                background-size:60px;
                background-position:14px -540px;
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