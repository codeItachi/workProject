<template>
    <div class="header">
        <slot name="left"></slot>
        <slot name="center"></slot>
        <slot name="right">
            <span class="right" v-gesture:tap.stop.prevent="showMeng"></span>
            <div class="meng" :class="{'show':styleState}" v-gesture:tap.stop.prevent="shutDownMeng">
                <ul class="menu" v-gesture:tap.stop.prevent="stopPrevent">
                    <li v-gesture:tap.stop.prevent="go_text" class="text">文字</li>
                    <li v-gesture:tap.stop.prevent="go_time" class="time">时间</li>
                    <li v-gesture:tap.stop.prevent="go_image" class="image">图片</li>
                </ul>
            </div>
        </slot>
    </div>
</template>

<style lang="scss">
.header
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
        height:44px;
        line-height:44px;
        text-align:center;
        padding:0 15px;
        font-size:15px;

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

        &:before
        {
            position: absolute;
            content: "";
            display: block;
            width: 17px;
            height: 1px;
            top: 21px;
            right: 14px;
            background-color: #fff;
        }
        &:after
        {
            position: absolute;
            content: "";
            display: block;
            width: 1px;
            height: 17px;
            right:22px;
            top: 14px;
            background-color: #fff;
        }
    }

    .meng
    {
        display:none;
        position:fixed;
        width:100%;
        height:100%;
        overflow:hidden;
        top:0;
        background-color:rgba(0,0,0,0.1);
        z-index:10000;

        &.show
        {
            display:block;

            .menu
            {
                animation:fadeIn 0.3s ease both;
            }
        }
    }

    .menu
    {
        position:absolute;
        top:50px;
        right:8px;
        height:auto;
        padding:2px 8px;
        z-index:999;
        background-color:rgba(0,0,0,1);
        border-radius: 5px;
        li
        {
            line-height:34px;
            font-size:18px;
            text-align:left;
            padding:5px 15px 5px 40px;
            // padding-left:40px;
            // padding-right:15px;
            background-image:url(../../../static/adlist-i.png);
            background-repeat:no-repeat;
            background-size:50px;
            border-bottom:1px dotted #e6e6e6;

            &.text{
                background-position:-20px -193px;
            }
            &.time{
               background-position:-20px -237px;
            }
            &.image{
                background-position:-20px -280px;
                border-bottom-width:0
            }
        }

        &:before
        {
            position:absolute;
            right:10px;
            top:-5px;
            content:"";
            display:block;
            width:10px;
            height:10px;
            /*border-right:1px solid #ccc;*/
            /*border-bottom:1px solid #ccc;*/
            transform:rotate(-135deg);
            background-color:rgba(0,0,0,1);
        }
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
        route:{
            data(trans){

            }
        },
        props:{
            maxnum:{
                required:true,
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
            go_text(){
                this.$router.go({name:'program-text',query:{maxnum:this.maxnum}});
            },
            go_time(){
                this.$router.go({name:'program-time',query:{maxnum:this.maxnum}});
            },
            go_image(){
                this.$router.go({name:'program-image',query:{maxnum:this.maxnum}});
            },
        },

        computed:{

        },

    }
</script>