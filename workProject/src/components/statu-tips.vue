<template>
    <div class="statu-tips" :class="{'down':show}"><i></i>{{info}}</div>
</template>

<script lang="babel">
    export default {
        props: {
            show: {
                type: Boolean,
                default: false,
                twoWay:true,
            },
            time: {
                type: Number,
                default: 1500,
            },
            func:{
                type:Function,
                default:function(){}
            },
            info:{
                type:String,
                required:true,
            },
            component:{
                type:Object
            }
        },
        computed: {

        },

        ready(){
            this.refresh(this.show, this.time);
        },

        watch: {
            show (val) {
                this.refresh(val, this.time);
            },
            time(val){
                this.refresh(this.show, val);
            }
        },

        methods:{
            initData(){
                this.doShow(this.show);
            },
            refresh(show, time){
                if (show && time > 0) {
                    clearTimeout(this.timeout)
                    this.timeout = setTimeout(() => {
                        this.show = false;
                        this.func && this.func();
                    }, this.time)
                }
            }
        }
    }
</script>

<style lang="scss">
.statu-tips
{
    position:fixed;
    width:100%;
    top:46px;
    height:0px;
    line-height:30px;
    background-color:#f5f5f5;
    font-size:15px;
    color:#999;
    padding:0 10px;
    z-index:999;
    white-space: nomal;
    overflow:hidden;
    text-overflow:ellipsis;
    transition: height 0.3s ease-in;

    &.down
    {
        height:31px;
    }

    i 
    {
        display:inline-block;
        vertical-align:top;
        height:20px;
        width:20px;
        border-radius:50%;
        border:1px solid #ff6600;
        position: relative;
        margin-right:5px;
        box-sizing:border-box;
        margin-top:5px;

        &:before
        {
            position:absolute;
            display:block;
            content:"";
            height:8px;
            width:2px;
            left:8px;
            top:3px;
            background-color:#ff6600;
        }

        &:after
        {
            position:absolute;
            display:block;
            content:"";
            width:2px;
            height:2px;
            background-color:#ff6600;
            top:13px;
            left:8px;
        }
    }
}
</style>