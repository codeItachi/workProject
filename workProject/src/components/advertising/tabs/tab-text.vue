<template>
    <form class="text-form">
        <div class="input-group d1">
            <label>节目内容：</label>
            <div class="input-fit">
                <input class="" type="text" placeholder="请输入您的内容" v-model="current.text.value" name="">
            </div>
        </div>

        <div class="input-group d2">
            <label>动画方式：</label>
            <div class="input-fit text-animat">
                <a class="i-turn-r"  v-gesture:tap.stop.prevent="animationEdit">
                    {{selectText}}
                </a>
            </div>
        </div>

        <div class="input-group d3">
            <label>文字颜色：</label>
            <div class="input-fit text-color">
                <a class="i-turn-r"  v-gesture:tap.stop.prevent="textColorEdit()">
                    <span class="color-1" :style="{backgroundColor: current.text.color}"></span>
                </a>
            </div>
        </div>
    </form>
</template>

<script>
    import Vue from 'vue'
    import vueGesture from 'vue-gesture';
    Vue.use(vueGesture);

    export default {
        data:function(){
            return {
            }
        },

        ready(){
        },

        props:{
            current: {
                required:true,
                type:Object,
            }
        },

        methods: {
            //动画编辑模态
            animationEdit(){
                //往父容器派发事件
                this.$dispatch('modal-statu', true);
            },

            //文字编辑模态
            textColorEdit(){
                //往父容器派发事件
                this.$dispatch('color-text1', true);
            },
        },
        computed: {
            selectText(){
                if(null !== this.current.text.animation.way.slectValue){
                    return this.current.text.animation.way.list[this.current.text.animation.way.slectValue]
                };
                return this.current.text.animation.way.placeholder;
            }
        }
    }
</script>