<template>
    <div class="login">
        <app-header>
            <span slot="center">绑定账号</span>
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
                fromurl: false
            }
        },
        route:{
            data({from}){
                this.fromurl = from.path || false;
            }
        },
        methods:{
            login(){
                if(! regexp.account.test(this.username)){
                    this.$toast({text:'请输入有效帐号'});
                    return;
                }
                if(! regexp.password.test(this.password)){
                    this.$toast({text:'密码不能为空'});
                    return;
                }
                accountMessage.bind_account({phone:this.username,password:this.password}).then(result=>{
                    accountStore.setrelogin(result);
                    this.$toast({text:'成功',time:1500,func:()=>{
                        if(!this.fromurl){
                            this.fromurl = '/new-led-list';
                        }
                        this.$router.replace(this.fromurl);
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