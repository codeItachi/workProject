<template>
    <div class="guide">
        <page-head>
            <span slot="center" class="center">所有功能</span>
        </page-head>
        <search>
            <input type="text" name="" placeholder="搜索">
        </search>
        <links>
        </links>
    </div>
</template>

<style lang="scss">
.guide
{
    width:100%;
    height:100%;
    padding-top:46px;
    background:url(../../../static/guide-bg.jpg);
    background-size:100%;
}
</style>
<script lang="babel">
    import Vue from 'vue';
    import vueGesture from 'vue-gesture';
    Vue.use(vueGesture);

    import pageHead from '../led-list/head.vue';
    import search from './search.vue';
    import links from './links.vue';

    export default {
        components:{
            pageHead,search,links
        },
        data(){
            return {
            };
        },
        ready(){

        },
        route:{
            data(trans){

            }
        },

        methods:{

        },

        computed:{

        },

    }
</script>