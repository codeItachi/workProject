<template>
    <div class="app-header">
        <slot name="left">
            <span class="back" v-gesture:tap.stop.prevent="goback"></span>
        </slot>
        <slot name="center"></slot>
        <slot name="right"></slot>

    </div>
</template>
<style lang="scss">
    @import "./common/app-header.scss";
</style>
<script lang="babel">
    import Vue from 'vue';
    import vueGesture from 'vue-gesture';
    Vue.use(vueGesture);
    export default {
        methods:{
            goback(){
                if(this.backCall){
                    this.backCall();
                }else{
                    history.back();
                }
            },
        },
        ready(){

        },
        props:{
            backCall:{
                type:Function
            }
        }
    }
</script>
