<template>
    <div class="led-effect" :class="effectstyle" v-gesture:tap.stop.prevent="shutEffect">
        <div :class="{'show':tabIndex == 0}">
            <div class="animation-preview" :style="previewAnimation" >{{current.text.value}}</div>
        </div>
        <div :class="{'show':tabIndex == 1}">{{time | dtstyle format formats}}</div>
    </div>
</template>

<script>
import Vue from 'vue';
import vueGesture from 'vue-gesture';
Vue.use(vueGesture);

import datef from 'datef';

export default {
    ready(){
        var timestamp = Date.parse(new Date());
        this.time = timestamp / 1000;
        setInterval(()=>{this.time += 1;},1000);
    },

    data(){
        return {
            styleShow :true,    //时间格式初试状态
        }
    },

    methods: {
        shutEffect(){
            this.effectstyle.show = false;
        },
    },

    props: {
        current: {
            required: true,
            type: Object,
        },
        effectstyle:{
            required: true,
            type: Object,
        },
        tabIndex:{
            type:Number,
            required:true,
        },
        time:{
            required:true
        },
        format:{
            required:true,
            type:Number,
            twoWay:true,
        },
        formats:{
            required:true,
            type:Array,
        },
    },

    computed: {
        previewAnimation() {
            var Name = '';
            switch (this.current.text.animation.way.slectValue) {
                case 0:
                    Name = 'positionLeft';
                    break;
                case 1:
                    Name = 'positionRight';
                    break;
                case 2:
                    Name = 'positionBottom';
                    break;
                case 3:
                    Name = 'positionTop';
            };

            var font = '';
            switch (this.current.text.animation.size) {
                case 0 :
                    font =  "16px";
                    break;
                case 1 :
                    font =  "24px";
                    break;
                case 2 :
                    font =  "32px";
                    break;
                case 3 :
                    font =  "48px";
                    break;
                case 4 :
                    font =  "64px";
                    break;
            };

            var Cycle = this.current.text.animation.direction ? "infinite" : 10*((this.current.text.animation.loop)+1);
            var textSize = this.current.text.animation.adaptive ? "24px" : font;

            return {
                color: this.current.text.color,
                fontSize:textSize,
                animationName: Name,
                animationDuration:(6 - this.current.text.animation.speed) + 's',
                animationIterationCount: Cycle,
            };
        },
        styleTime(){
            return datef(this.current.time.formats[this.current.time.format].style);
        }
    }
}
</script>

<style lang="scss">
    @import "../common/common.scss";
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