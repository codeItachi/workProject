<template>
    <div class="home">
        <h1>页面链接</h1>
        <hr/>
        <a target="_blank" v-link="{path: '/ad-vertising', query: {sid:1,pid:1}}">我要投放 - ad-vertising</a>
        <br/>
        <a v-link="{path: '/ad-list'}">我的广告列表 - ad-list</a>
        <br/>
        <a target="_blank" v-link="{path: '/led-list'}">我的LED列表 - led-list</a>
        <br/>
        <a target="_blank" v-link="{path: '/led-edit/1'}">编辑LED - led-edit</a>
        <br/>
        <a target="_blank" v-link="{path: '/led-add'}">添加广告 - led-add</a>
        <br/>
        <a target="_blank" v-link="{path: '/led-detail'}">LED详情 - led-detail</a>
        <br/>
        <hr/>
        <a target="_blank" v-link="{path:'/login'}" href="">登录 - login</a>
        <br/>
        <a target="_blank" v-link="{path:'/register'}">注册 - register</a>
        <br/>
        <a target="_blank" v-link="{path:'/bind-account'}">绑定账号 - bind-account</a>
        <br/>
        <a target="_blank" v-link="{path: '/guide'}">引导页 - guide</a>
        <br/>
        <a target="_blank" v-link="{path:'/test'}">测试 - test</a>
        <br/>

        <!-- 重构 -->
        <a target="_blank" v-link="{path: '/ad-test'}">重构-投放 - ad-test</a>
        <br/>
        <a target="_blank" v-link="{path: '/new-ad-list'}">重构-节目列表 - new-ad-list</a>
        <br/>
        <a target="_blank" v-link="{path: '/new-led-list'}">重构-LED列表 - new-LED-list</a>
        <br/>
        <a target="_blank" v-link="{path: '/ad-history'}">节目历史记录 - ad-history</a>
        <br/>
        <a target="_blank" v-link="{path: '/index'}">demo</a>
        <br/>
        <button class="test" @click="preview">preview</button>
        <button class="test" @click="chooseImage">chooseImage</button>
        <button class="test" @click="upImage">upImage</button>
        <img :src="id" v-for="id in chooseImages" />
        <div>SS:{{ss}}</div>
        <div>userInfo:{{userInfo}}</div>
        <button @click="userInfoDo()">userInfo</button>
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
    import led from 'message/led';
    import vueStore from './vue-store';
    Vue.use(vueStore, "buss");

    export default {
        data(){
            return{
                chooseImages: [],
                ss:0
            }
        },
        cache:["userInfo"],
        sockets:{
            sync:{
                2000(data){
                    console.log(data);
                }
            }
        },
        ready(){
        },
        components:{
        },
        methods:{
            userInfoDo(){
                console.log("userInfo");
                this.userInfo = "userInfo" + Math.random();
                this.ss = "ssssss" + Math.random();
            },
            preview(){
                weixin.previewImage("http://app.popled.cn/static/ad.png", ["http://app.popled.cn/static/ad.png","http://app.popled.cn/static/ad.png"]);
            },
            chooseImage(){
                weixin.chooseImage((ids)=>{
                    this.chooseImages = ids;
                });
            },
            upImage(){
                weixin.uploadImage(this.chooseImages, (sids)=>{
                    alert(JSON.stringify(sids) + "上传完成...");
                });
            }
        },
        watch:{
            'ss' : function(val){
                console.log("watch-->" + val);
            }
        },
        ready(){

        }
    }
</script>