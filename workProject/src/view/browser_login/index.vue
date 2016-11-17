<template>
    <div class="login">
        <app-header>
            <span slot="center">登录</span>
            <span slot="right" class="right" v-link="{name:'register'}">注册</span>
        </app-header>
        <div class="bind-input">
            <input class="username" type="text" name="" v-model="username" placeholder="请输入手机号或帐号">
            <input-password class="password" :pwd.sync="password" :placeholder="placeholder"></input-password>
            <button v-gesture:tap.stop.prevent="login">登录</button>
            <a class="forget" v-link="{name:'forget-password'}">忘记密码？</a>
        </div>
        <!--<others-account></others-account>-->
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
    import socket from '../../socket';

    import accountStore from '../../store/account-store';


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
                fromname:''
            }
        },
        route:{
            data(transition){
                this.fromname = transition.from.name || "new-ad-list";
            }
        },
        methods:{
            login(){
                console.log("login")
                if(! regexp.phone.test(this.username)){
                    this.$toast({text:'请输入正确的手机号'});
                    return;
                }
                if(! regexp.password.test(this.password)){
                    this.$toast({text:'密码不能为空'});
                    return;
                }
                accountMessage.browser_login({phone:this.username,password:this.password}).then(relogin=>{
                    accountStore.setrelogin(relogin);
                    this.$toast({text:"登录成功",time:1500,func:()=>{
                        socket.login = true;
                        socket.bind = true;
                        this.$route.router.replace({name:this.fromname});
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