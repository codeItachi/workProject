<template>
    <div class="module-tit" v-gesture:tap.stop.prevent="showContent">
        <h2>{{caption}}</h2>
        <a class="">{{styleStates | textState "展开" "收起" }}</a>
    </div>
</template>

<script lang="babel">
import Vue from 'vue';
import vueGesture from 'vue-gesture';
Vue.use(vueGesture);

Vue.filter("textState", function (styleStates, trueVal, falseVal) {
        if (styleStates)return trueVal;
        return falseVal;
    })

    export default {
        data(){
            return {
                styleStates: false
            }
        },

        methods: {
            showContent(){
                this.styleStates = !(this.styleStates);
                this.$dispatch('statu', this.styleStates);
            },
        },

        computed:{
            fullName(){
                return this.firstName + this.lastName;
            }
        },
        props:{
            caption:{
                required:true,
                type:String,
            }
        }
    }
</script>
<style lang="scss">

</style>