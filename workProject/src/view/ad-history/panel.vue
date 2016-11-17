<template>
    <div class="panel" :class="{'show':panerDisplay}">
        <slot></slot>
        <div class="close-up">
            <button v-gesture:tap.stop.prevent="closePaner()">收起筛选条件</button>
        </div>
        <div class="prompt">提示：页面空白处往右滑动收起筛选条件</div>
    </div>
</template>

<style lang="scss">
.panel
{
    padding:10px;
    position:fixed;
    width:100%;
    height:100%;
    top:0;
    left:100%;
    z-index:99999;
    background-color:#fafafa;
    transition: left 0.3s ease-in;

    &.show
    {
        left:0;
    }
    .prompt
    {
        position:absolute;
        bottom:0;
        left:0;
        width:100%;
        height:60px;
        font-size:15px;
        color:#ff6600;
        text-align:center;
        line-height:60px;
    }
    .close-up{
        padding:10px 14px;

        button{
            width:100%;
            height:40px;
            color:#fff;
            outline:0;
            font-size:16px;
            border-radius:4px;
            background-color:#028dea;
            border:1px solid #028dea;
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
        props:{
            panerDisplay:{
                type:Boolean,
                required:true,
            },
            closePaner:{
                type:Function,
            }
        }
    }
</script>