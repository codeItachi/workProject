<template>
    <div class="gm">
        <button v-gesture:tap.stop.prevent="clear_all">清除所有</button>
    </div>
</template>
<style lang="scss">
    .gm{
        padding:20px;
    }
</style>
<script lang="babel">

    import Vue from 'vue';
    import vuegetsture from 'vue-gesture';
    Vue.use(vuegetsture);
    import store from '../store';
    let storeImpl = store('');

    export default{
        data(){
            return {}
        },
        methods:{
            clear_all(){
                storeImpl.clear();
                this.$toast({text:'清除成功!'});
            }
        },
        components: {}
    }
</script>
