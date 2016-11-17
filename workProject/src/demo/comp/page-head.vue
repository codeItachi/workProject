<template>
    <div class="page-head">
        <slot name="back" vue-gesture:tap.stop.prevent="back"></slot>
        <slot name="text"></slot>
        <slot name="save" vue-gesture:tap.stop.prevent="save"></slot>
    </div>
</template>
<style>

</style>
<script>
import Vue from 'vue';
import vueGesture from 'vue-gesture';
Vue.use(vueGesture);

export default{
    data(){
        return{

        }
    },

    components:{

    },

    methods:{

    },

    computed:{
        back(){
            history.back();
        },
        save(){

        },
    }
}
</script>