<template>
    <div class="modal text-color-modal" :class="colorstyle" v-gesture:tap.stop.prevent="shutTextColor">
        <div>
            <div class="modal-container"  v-gesture:tap.stop.prevent="stopMeng">
                <div class="modal-head">
                    <span>文字颜色</span>
                </div>

                <div class="modal-body">
                    <ul>
                        <li>
                            <a v-for="color in colorstyle.colors" :style="{ backgroundColor : color }" v-gesture:tap.stop.prevent="select_color(color)"></a>
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
            colorstyle:{
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
                this.colorstyle.show = state;
            });
        },

        methods:{
            //点击确认按钮事件
            checkColor:function(){
                this.colorstyle.show = false;
                //往父容器派发事件
                this.$dispatch('color-text1', false);
            },

            //点击遮罩事件
            shutTextColor:function(){
                this.colorstyle.show = false;
                //往父容器派发事件
                this.$dispatch('color-text1', false);
            },

            //点击遮罩组织模态冒泡事件
            stopMeng:function(event){
                event.stopPropagation();
            },
            select_color(color){
                this.colorstyle.show = false;
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
        width:286px;
    }

    .modal-head
    {
        color:#666;
        background-color:#fafafa;
        border-radius:4px 4px 0 0;
    }
    .modal-body
    {
        padding:10px;
        background-color:#f2f2f2;

        border-radius:0 0 4px 4px;
    }
    li
    {
        display:box;
        display:-webkit-box;
    >a
     {
        height:34px;
        display:block;
        box-flex:1;
        -webkit-box-flex:1;
        margin-left:5px;
        border-radius:2px;

        &:first-child
        {
            margin-left:0;
        }
     }
    }
    }
</style>
