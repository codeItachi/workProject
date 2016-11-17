<template>
    <div class="led-effect" :class="effectstyle" v-gesture:tap.stop.prevent="shutEffect">
        <div>
            <div class="animation-preview" :style="previewAnimation" >{{current.text.value}}</div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import vueGesture from 'vue-gesture';
Vue.use(vueGesture);

import datef from 'datef';

export default {
    data(){
        return {
            animation: null,
        }
    },

    props: {
        current: {
            required: true,
            type: Object,
        },
        effectstyle:{
            required: true,
            type: Object,
        }
    },

    watch: {
        animation(_new) {

        }
    },

    methods: {
        shutEffect(){
            this.effectstyle.show = false;
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
            }

            var Cycle = this.current.text.animation.direction ? "infinite" : 10*((this.current.text.animation.loop)+1);
            return {
                color: this.current.text.color,
                animationName: Name,
                animationDuration:(6 - this.current.text.animation.speed) + 's',
                animationIterationCount: Cycle,
                // animationIterationCount: 10*((this.current.text.animation.loop)+1),
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
        position:absolute;
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
            height:100%;
            transform: rotate(90deg);
            transform: rotate(90deg);
        }

       .animation-preview
        {
            width:100%;
            height:100%;
            font-size:40px;
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