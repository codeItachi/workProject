<template>
    <button :class="{'active': this.index == this.sign}" v-gesture:tap.stop.prevent="activeItem(this.index)">
        {{list.btnText}}
    </button>
</template>
<script lang="babel">
    import Vue from 'vue';
    import vueGesture from 'vue-gesture';
    Vue.use(vueGesture);

    export default {
        methods:{
            activeItem(nth){
                if(this.sign == nth){
                    this.sign = -1;
                    this.list.select = false;
                }else{
                    this.sign = nth;
                    this.list.select = true;
                }
            },
        },
        props:{
            list:{
                type:Object,
                required:true,
            },
            sign:
            {
                type:Number,
                required:true,
            },
            index:{
                required:true,
                type:Number,
            },
        }
    }
</script>
<style lang="scss">

</style>