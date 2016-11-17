<template>
    <div class="modal text-color-modal" :class="textcolorstyle" v-gesture:tap.stop.prevent="shutTextColor">
        <div>
            <div class="modal-container"  v-gesture:tap.stop.prevent="stopMeng">
                <div class="modal-head">
                    <span>文字颜色选择</span>
                </div>

                <div class="modal-body">
                    <ul>
                        <li>
                            <a v-for="color in textcolorstyle.colors" :style="{ backgroundColor : color }" v-gesture:tap.stop.prevent="select_color(color)"></a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import Vue from 'vue';
    import vueGesture from 'vue-gesture';
    Vue.use(vueGesture);

    export default{
        components:{

        },

        props:{
            textcolorstyle:{
                required:true,
                type:Object
            },
            current:{
                required:true,
                type:Object,
            }
        },

        //接收父容传入状态参数
        ready:function(){
            this.$on('color-text1',function(state){
                this.textcolorstyle.show = state;
            });
        },

        methods:{
            //点击确认按钮事件
            checkColor:function(){
                this.textcolorstyle.show = false;
                //往父容器派发事件
                this.$dispatch('color-text1', false);
            },

            //点击遮罩事件
            shutTextColor:function(){
                this.textcolorstyle.show = false;
                //往父容器派发事件
                this.$dispatch('color-text1', false);
            },

            //点击遮罩组织模态冒泡事件
            stopMeng:function(event){
                event.stopPropagation();
            },
            select_color(color){
                this.textcolorstyle.show = false;
                this.current.text.color = color;
            }
        },
        computed:{
            colorStyle(){
                return this.current.text.color ;
            }
        }
    }
</script>

<style lang="scss">
    .modal.text-color-modal
    {
    .modal-container
    {
        width:266px;
    }

    .modal-head
    {
        color:#ddd;
        background-color:#000;
        border-bottom-color:#000;
    }
    .modal-body
    {
        border-top:2px solid #000;
        border-left:2px solid #000;
    }
    li
    {
        display:box;
        display:-webkit-box;

    >a
     {
         height:44px;
         display:block;
         box-flex:1;
         -webkit-box-flex:1;
         border-bottom:2px solid #000;
         border-right:2px solid #000;
     }
    }
    }
</style>
