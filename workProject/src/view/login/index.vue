<template>
    <div class="login">
        <app-header>
            <span slot="center">登录</span>
            <span slot="right" class="right" v-link="{name:'register', replace: true}">注册</span>
        </app-header>
        <div class="bind-input">
            <input class="username" type="text" name="" v-model="username" placeholder="请输入手机号或帐号">
            <input-password class="password" :pwd.sync="password" :placeholder="placeholder"></input-password>
            <button v-gesture:tap.stop.prevent="login">登录</button>
            <a class="forget" v-link="{name:'forget-password'}">忘记密码？</a>
        </div>
        <!--<others-account></others-account>-->
        <div class="modaltip" :class="imgType " v-gesture:tap.stop.prevent="shutModal()">
            <div class="modal_header">
                <span class="header_start"></span>
                <span class="header_right"></span>
                <span class="header_handle"></span>
            </div>
            <div class="modal_content">
                <div class="contain" v-gesture:tap.stop.prevent="stopDefault">

                </div>
            </div>
        </div>
    </div>
</template>
<script lang="babel">
    import Vue from "vue";
    import vueGesture from 'vue-gesture';
    Vue.use(vueGesture);
    import {regexp} from '../../global_const.js';
    import accountMessage from "../../message/account.js";
    import inputPassword from '../../components/input-password.vue';
    import appHeader from "../../components/app-header";
    import globalStore from '../../store/global-store';
    import accountStore from '../../store/account-store';
//    import othersAccount from "../register/others-account.vue";


    export default {
        components:{
            appHeader,inputPassword,
//            othersAccount,
        },
        props:{
        },
        data(){
            return{
                placeholder:"请输入密码",
                username: '',
                password: '',
                imgType:{
                    'show':false,
                }
            }
        },
        ready(){
            this.imgType.show = true;
//            if(globalStore.isFirstEnter()){
//
//            }else{
//                this.imgType.show = false;
//            }
        },
        methods:{
            shutModal(){
                this.imgType.show = false;
            },
            stopDefault(event){
                event.stopPropagation();
            },
            login(){
                if(! regexp.account.test(this.username)){
                    this.$toast({text:'请输入正确的手机号'});
                    return;
                }
                if(! regexp.password.test(this.password)){
                    this.$toast({text:'密码不能为空'});
                    return;
                }
                accountMessage.bind_account({phone:this.username,password:this.password}).then(result=>{
                    accountStore.setrelogin(result),
                    this.$toast({text:'登录成功',time:1500,func:()=>{
                        this.$route.router.replace({path:'/new-led-list'});
                    }})
                }).catch(code=>{
                    this.$toast({text:code,time:1500})
                })
            }
        },
        computed:{

        }
    }
</script>
<style lang="scss" >
    @import './layout.scss';
</style>