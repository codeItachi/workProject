<template>
    <div class="register" >
        <div class="logo">{{count}}</div>
        <div class="register-form">
            <div class="form-input">
                <label>手机</label>
                <input name="mobile" type="number" v-model="rmobile">
            </div>
            <div class="form-input">
                <label>密码</label>
                <input name="pass" type="password" v-model="rpass">
            </div>
            <div class="form-input" v-show="ismobileOk">
                <input name="pass" type="number" v-model="rauth">
                <span @click="get_auth()">验证码</span>
            </div>
            <div>
                <button @click="register()">注册</button>
                <a v-link="login">登录</a>
            </div>
        </div>
    </div>
</template>
<style>

</style>
<script>
    import Vue from 'vue';
    import vueStore from './vue-store';
    Vue.use(vueStore, 'login');
    export default{
        data(){
            return {
                rmobile: 13530067769,
                rpass: 123456,
                rauth: ''
            }
        },
        components: {},
        methods: {
            register(){
            },
            get_auth(){
                this.localStore.set('ssss','ffffff');
                console.log(this.localStore.get('ssss'));
//                this.$socket.sendCmd(10020, {mobile:this.rmobile,what:'ssssssssssss'});
            }
        },
        computed: {
            ismobileOk(){
                var reg = new RegExp('^[0-9]{11}$');
                return reg.test(this.rmobile);
            },
        }
    }
</script>