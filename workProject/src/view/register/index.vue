<template>
    <div class="register">
            <app-header :back-call="backCall">
                <span slot="center" class="center">注册</span>
            </app-header>
            <register>
                <input-password class="password" :pwd.sync="password" :placeholder="placeholder" slot="password"></input-password>
                <input slot="phonenumber" class="phonenumber" type="text" v-model="phonenumber" placeholder="请输入手机号" />
                <input slot="check" class="check" type="text" v-model="checkcode" placeholder="请输入验证码"/>
                <button slot="getcode" class="getcode" :class="{'disable': wait >0}" v-gesture:tap.stop.prevent="get_code">{{auth_code}}</button>
                <button slot="finish" v-gesture:tap.stop.prevent="finish">完成</button>
            </register>
            <!--<others-account></others-account>-->
            <div class="modaltip" :class="imgType " v-gesture:tap.stop.prevent="shutModal()">
                <div class="modal_account">
                    <span class="account_text"></span>
                    <span class="account_handle"></span>
                    <span class="arrow"></span>
                </div>
                <div class="modal_content">
                    <div class="contain_" v-gesture:tap.stop.prevent="stopDefault">

                    </div>
                </div>
            </div>
    </div>
</template>
<script lang="babel">
    import Vue from "vue";
    import vueGesture from 'vue-gesture';
    Vue.use(vueGesture);
    import appHeader from '../../components/app-header';
    import register from '../forget-password/register';
    import othersAccount from './others-account';
    import getCodeMessage from '../../message/system.js';
    import accountMessage from '../../message/account.js';
    import {regexp} from '../../global_const';
    import inputPassword from "../../components/input-password.vue";
    import globalStore from '../../store/global-store';
    export default {
        components:{
            appHeader,register,othersAccount,inputPassword,
        },
        data(){
            return {
                phonenumber:'',
                checkcode:'',
                password:'',
                affirm:'',
                wait:0,
                placeholder:"请输入密码(6-8数字)",
                imgType:{
                    'show':false,
                },
            }
        },
        ready(){
            this.imgType.show = true;
//            if(globalStore.isFirstEnter()){
//                globalStore.setFirstEnter();
//                localStorage.removeItem("global_is_first_enter");
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
            get_code(){

                if(this.wait > 0 ){
                    this.$toast({text:"验证码已发送"});
                    return;
                }
                if(!regexp.phone.test(this.phonenumber)){
                    this.$toast({text:'请输入正确的手机号'});
                    return true;
                }
               return getCodeMessage.get_auth_code(this.phonenumber).then(result=>{
                    this.wait = regexp.auth_time;
                    this.$toast({text:"发送成功"})
                }).catch(code=>{
                    this.$toast({text:code})
                })
            },
            finish(){
                if(! regexp.phone.test(this.phonenumber)){
                    this.$toast({text:'请输入正确手机号'});
                    return;
                }
                if(! regexp.password.test(this.password)){
                    this.$toast({text:'密码格式有误'});
                    return;
                }
                getCodeMessage.submit_auth_code(this.phonenumber, this.checkcode).then(result=>{
                    accountMessage.register({phone:this.phonenumber, password:this.password}).then(result=>{
                        this.$toast({text:result,time:1500,func:()=>{
                            this.$router.replace({path:'new-led-list'});
                        }})
                    }).catch(code=>{
                        this.$toast({text:code,time:1500,func:()=>{
                        }});
                    });
                }).catch(code=>{
                    this.$toast({text:code})
                });

            },
            backCall(){
                this.$router.go({name:'login'});
            }
        },
        watch:{
            wait(val){
                if(val >0 ){
                    setTimeout(()=>{
                        this.wait --;
                    },1000)
                }
            }
        },
        computed:{
            auth_code(){
                if( this.wait > 0){
                    return "重新发送(" + this.wait + ")";
                }else{
                    return "获取验证码"
                }
            },
        }
    }
</script>
<style lang="scss">
    @import "./layout.scss";
</style>