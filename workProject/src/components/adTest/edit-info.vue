<template>
    <div class="put-edit" :class="{'up':styleStates}">
        <tit-menu :caption="caption"></tit-menu>
        <div class="put-edit-con">
            <slot name="ledView"></slot>

            <div class=edit-tab>
                <slot name="tab"></slot>
            </div>
        </div>
    </div>
</template>

<script lang="babel">
    import titMenu from './tit-menu';

    export default {
        components: {
            titMenu,
        },

        //接收子容器传入状态
        ready(){
            this.$on('statu',function(state){
                this.styleStates = state;
            });
        },

        data(){
            return {
                styleStates: false,
                caption:"信息编辑",

                //收起展开默认状态
                styleStates:false,
            }
        },
    }
</script>