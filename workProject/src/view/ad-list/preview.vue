<template>
    <div class="effect" :class="{'show':show}" v-gesture:tap.stop.prevent="shutEffect">
        <div>
            <slot></slot>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import vueGesture from 'vue-gesture';
Vue.use(vueGesture);

export default {
    data(){
        return {
            //styleShow :true,    //时间格式初试状态
        }
    },

    methods: {
        shutEffect(){
            this.show = false;
        },
    },

    props: {
        show:{
            type:Boolean,
            required: true,
        }
    },

    computed: {
        
    }
}
</script>

<style lang="scss">
    .effect
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
        div.time
        {
            font-size:28px;
            display: flex;
            color:red;
            align-items: center;
            padding-left:0;
            justify-content: center;
        }

        >div
        {
            height:100%;
            transform: rotate(90deg);
            transform: rotate(90deg);

            &.show
            {
                display:block;
            }

            >div
            {
                height:100%;
            }
        }

       .led-preview
        {
            font-size:20px;
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
            animation-iteration-count:infinite;     //无线循环

            >img{
                height:50%;
            }
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