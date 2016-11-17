<template>
    <div class="need-weixin-index">
        <div class="i-warang">
            该页面，必需在微信端打开！！！
        </div>
        <button class="i-info" v-gesture:tap.stop.prevent="weixinopen">微信打开</button>
    </div>
</template>
<style lang="scss">
    .need-weixin-index{

    }
</style>
<script lang="babel">

    import Vue from 'vue';
    import vueGesture from 'vue-gesture';
    Vue.use(vueGesture);
    export default{
        route:{
            data(transition){
                console.log(transition);
                let query = transition.to.query;
                this.path = query.oldpath;
                console.log(query.params);
                console.log(JSON.parse(query.params));
                this.params = JSON.parse(query.params);
                this.query = JSON.parse(query.query);
            }
        },
        data(){
            return {
                path:'',
                params:{},
                query:{}
            }
        },
        methods:{
            weixinopen(){
                let routego = {name:this.path,params:this.params, query:this.query};
                this.$router.go(routego);
            }
        },
        components: {}
    }
</script>
