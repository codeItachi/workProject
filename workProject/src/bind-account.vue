<template>
    <div class="bind-account">
        <app-header>
            <span slot="center" class="">绑定账号</span>
        </app-header>
        <div class="bind-input">
            <input class="username" type="text" name="" v-model="username" placeholder="请输入账号">
            <input class="passworde" type="password" name="" v-model="password" placeholder="请输入密码">
            <button v-gesture:tap.stop.prevent="submit">确认绑定</button>
        </div>

        <div class="bind-primpt">
            <h3>温馨提示：</h3>
            <span>绑定账号后，微信可直接发布广告</span>
        </div>
    </div>
</template>

<script lang="babel">
    import Vue from 'vue';
    import vueGesture from 'vue-gesture';
    Vue.use(vueGesture);
    import appHeader from './components/app-header.vue';
    import accountMsg from './message/account';

    export default {
        route:{

        },
        ready(){

        },
        data(){
            return {
                username:'',
                password:''
            }
        },
        components:{
            appHeader,
        },

        methods: {
            submit(){
                console.log('submit');
                accountMsg.bind_account({username:this.username, password:this.password}).then((tip)=>{
                    this.$toast({text:tip,time:2000,func:()=>{
                        history.back();
                    }});
                }).catch((code)=>{
                    this.$toast({text:code, time:3000});
                })
            }
        },

    }

</script>

<style lang="scss">
    @import "./components/account/bind.scss";
</style>