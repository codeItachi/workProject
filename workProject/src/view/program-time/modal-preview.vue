<template>
    <div class="led-effect" :class="modalstyle" v-gesture:tap.stop.prevent="shutModal()">
        <div class="show">
            <div class="animation-preview" :style="previewAnimation">
                {{time | fdatetime format }}
            </div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import vueGesture from 'vue-gesture';
Vue.use(vueGesture)
import {textColorValue} from '../program-image/common.js';
import {textFontsizeValue} from '../program-image/common.js';

export default {
    data(){
        return {
            styleShow :true,
        }
    },
    ready(){
            
        },
    methods: {
        shutModal(){
                this.modalstyle.show = false;
        },
    },

    props: {
        current:{
            required:true,
            type:Object,
        },
        modalstyle:{
            required:true,
        },
        color:{
            required:true,
            type:Object,
        },
        fontsize:{
            required:true,
            type:Object,
        },
        time:{
                required:true,
            },
        format:{
            required:true,
            // type:String,
            twoWay:true,
        },
        formats:{
            required:true,
            type:Array,
        },
       
        bordercolor:{
            required:true,
            type:Object,
        },
        
    },

    computed: {
       previewAnimation(){

                let textSize = textFontsizeValue(this.fontsize.selectValue);
                let textColor = textColorValue(this.color.list[this.color.selectValue].value);
                if(this.current.selectauto == true){
                    return {
                        fontSize: "24px",
                        color:"#db1b1c" ,
                    }
                }else{
                    return {
                        fontSize: textSize,
                        color: textColor,
                    }
                }
            

       }
    }
}
</script>

<style lang="scss">
    @import "../../components/common/common.scss";
    .led-effect
    {
        position:fixed;
        display:none;
        width:100%;
        height:100%;
        text-align:center;
        overflow:hidden;
        top:0;
        left:0;
        z-index:9999;
        background:url(../../../static/led-3.jpg);

        &.show
        {
            display:block;
            animation:fadeIn 1s ease both;
        }

        >div
        {
            display:none;
            height:100%;
            transform: rotate(90deg);
            transform: rotate(90deg);

            &.show
            {
                display:block;
            }

            &:first-child +div
            {
                font-size:28px;
                display: flex;
                color:red;
                align-items: center;
                justify-content: center;
            }
        }

       .animation-preview
        {
            width:100%;
            height:100%;
            display: flex;
            align-items: center;
            justify-content: center;
            backface-visibility:visible;
            transform-origin:center center;
            animation-delay:0s;                     //延迟时间
            animation-timing-function:linear;       //动画频率
            animation-fill-mode:backwards;          //填充模式
        }
    }


// 淡入
@keyframes fadeIn {
    0% {opacity: 0;}/*初始状态 透明度为0*/
    40% {opacity: 0;}/*过渡状态 透明度为0*/
    100% {opacity: 1;}/*结束状态 透明度为1*/
}
// 移入

// 弹入
@keyframes popUp {
    0% {transform:translateY(-100%);opacity: 0; } 
    5% {transform:translateY(-100%);opacity: 0; } 
    15% {transform:translateY(0); padding-bottom: 5px;} 
    30% { transform:translateY(-50%);}
    40% {transform:translateY(0); padding-bottom: 6px;} 
    50% {transform:translateY(-30%);}
    70% {transform:translateY(0%);padding-bottom: 7px;}  
    80% {transform:translateY(-15%);}  
    90% {transform:translateY(0%);padding-bottom: 8px;}  
    95% {transform:translateY(-7%);}  
    97% {transform:translateY(0%);}  
    99% {transform:translateY(-3%);}  
    100% {transform:translateY(0);opacity: 1;}  
}
// 翻转进入
@keyframes turnIn{
    0%{transform:rotate(0deg)translate(0,0);}
    25%{transform:rotate(90deg)}
    50%{transform:rotate(180deg)translate(-300px,0);}
    75%{transform:rotate(270deg);}
    100%{transform:rotate(360deg)translate(0,0);}
}
//方向 - 从右到左
@keyframes positionLeft
{
    0%
    {
        transform:translateX(400px);
    }
    100%
    {
        transform:translateX(-400px);
    }
}
//方向 - 从左到右
@keyframes positionRight
{
    0%
    {
        transform:translateX(-400px);
    }
    100%
    {
        transform:translateX(400px);
    }
}
//方向 - 从上到下
@keyframes positionBottom
{
    0%
    {
        transform:translateY(-400px);
    }
    100%
    {
        transform:translateY(400px);
    }
}
//方向 - 从下到上
@keyframes positionTop
{
    0%
    {
        transform:translateY(400px);
    }
    100%
    {
        transform:translateY(-400px);
    }
}
</style>