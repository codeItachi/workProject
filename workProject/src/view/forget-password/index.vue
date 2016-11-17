<template>
    <div class="forget-password">
            <app-header>
                <span slot="center" class="center">忘记密码</span>
            </app-header>
            <register>
                <input slot="phonenumber" class="phonenumber" type="text" v-model="phonenumber" placeholder="请输入手机号">
                <input slot="check" class="check" type="text" v-model="checkcode" placeholder="请输入验证码">
                <button-tap slot="getcode" class="getcode" :class="{'disable' : wait > 0 }" :tap="getcode">{{auth_code}}</button-tap>
                <input-password class="password" :pwd.sync="password" :placeholder="placeholder" slot="password"></input-password>
                <button slot="finish" v-gesture:tap.stop.prevent="finish">完成</button>
            </register>
    </div>
</template>
<script lang="babel">
    import Vue from "vue";
    import vueGesture from 'vue-gesture';
    Vue.use(vueGesture);
    import appHeader from '../../components/app-header';
    import register from './register';
    import getCodeMessage from '../../message/system.js';
    import accountMessage from "../../message/account.js";
    import {regexp} from '../../global_const';
    import buttonTap from '../../components/button-tap.vue';
    import inputPassword from "../../components/input-password.vue";

    export default {
        components:{
            appHeader,register,buttonTap,inputPassword
        },
        data(){
            return {
                phonenumber:'',
                checkcode:'',
                wait:0,
                password:'',
                placeholder:"请输入新密码(6-8数字)",
            }
        },
        ready(){

        },
        methods:{
            getcode(){
                if(this.wait > 0){
                    this.$toast({text:'验证码已发送'});
                    return true;
                }
                if(!regexp.phone.test(this.phonenumber)){
                    this.$toast({text:'请输入正确的手机号'});
                    return true;
                }
                return getCodeMessage.get_auth_code(this.phonenumber).then(result=>{
                    this.$toast({text:"发送成功"});
                    this.wait = regexp.auth_time;
                }).catch(code=>{
                    this.$toast({text:code})
                })
            },
            finish(){
                if(!regexp.phone.test(this.phonenumber)){
                    this.$toast({text:'请输入正确的手机号'});
                    return true;
                }
                if(!regexp.password.test(this.password)){
                    this.$toast({text:'密码格式有误'});
                    return true;
                }
                if('' == this.checkcode ){
                    this.$toast({text: "验证码不正确"});
                    return true;
                }
                getCodeMessage.submit_auth_code(this.phonenumber, this.checkcode).then(result=>{
                    return accountMessage.findpass({phone:this.phonenumber,password:this.password}).then((result)=>{
                        this.$toast({text:result,time:1500,func:()=>{
                            this.$route.router.replace({path:'login'})
                        }})
                    }).catch((code)=>{
                        this.$toast({text:code,time:1500})
                    })
                }).catch(code=>{
                    this.$toast({text:code})
                });

            },

        },
        watch:{
            wait(val){
                if(val > 0){
                    setTimeout(()=>{
                        this.wait--;
                    },1000);
                }
            }
        },
        computed:{
            auth_code(){
                if(this.wait > 0){
                    return "重新发送(" + this.wait + ")";
                }else{
                    return "获取验证码";
                }
            },
        }
    }
</script>
<style lang="scss">
    @import "./layout.scss";

</style>