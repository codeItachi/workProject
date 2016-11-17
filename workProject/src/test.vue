<template>
    <div class="home">
        <button id="onMenuShareTimeline" @click="sharepengyouqiang">sharepengyouqiang</button>
        <button id="onMenuShareAppMessage" @click="sharepengyou">sharepengyou</button>
        <div class="share-component" data-mobile-sites="weibo,qq,qzone,tencent"></div>

        <div class="social-share"></div>
        <a href="weixin://contacts/profile/gh_0ad2b33ee0dc">点击关注微市场</a>
    </div>
</template>
<style lang="scss">
    @import "./components/common/common.scss";

    .home
    {
        button.test{
            padding: 10px 20px;
        }

        padding:15px;
        h1
        {
            text-align:center;
            font-size:24px;
            line-height:40px;
        }
        >a
        {
            color:#999;
            font-size:16px;
            line-height:26px;
            padding-left:20px;
        }

        hr
        {
            border:1px dashed #ddd;
        }
    }
</style>
<script lang="babel">
    import Vue from 'vue';
    import weixin from './weixin';
    import led from './message/led';
    import vueStore from './vue-store';
    Vue.use(vueStore, "buss");
    import system from './message/system';
    import vueGesture from 'vue-gesture';
    Vue.use(vueGesture);

    import {request} from './util';
    import {loginUrlStr} from './auth';
    export default {
        name:'test',
        data(){
            return{
                chooseImages: [],
                ss:0,
                map:new Map(),
                phone:'13530067769',
                responseText:"",
                id:null,
                shareButton:false
            }
        },
        route:{
            data({to:{query}}){
                this.id = query.id;
            }
        },
        ready(){


        },
        props:{
            pId:{
            },
        },
        components:{
        },
        methods:{
            sharepengyouqiang(){
                weixin.exe(()=>{
                    weixin.sharepengyouqiang({title:'test',link:'http://app.popled.cn'});
                })
            },
            sharepengyou(){
                weixin.exe(()=>{
                    weixin.sharepengyou({title:'test',link:'http://app.popled.cn',desc:'testDesc',imgUrl:'http://app.popled.cn/static/program/95.jpeg'});
                    weixin.showOptionMenu();

                })
            },
        },
        watch:{
            'ss' : function(val){
                console.log("watch-->" + val);
            },
            map:{
                deep:true,
                handler(val){
                    console.log(val);
                }
            }
        },
    }
</script>