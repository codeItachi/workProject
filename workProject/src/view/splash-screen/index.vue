<template>
    <div class="lead">
            <a  v-gesture:tap.stop.prevent="enter">跳过</a>
            <div class="logo">
                <p>微信LED显示屏控制卡</p>
                <p>微信控制卡时代 研色于创造者同行</p>
            </div>
            <div class="submit">
                <button class="registerbtn"  v-gesture:tap.stop.prevent="register">注册</button>
                <button class="loginbtn" v-gesture:tap.stop.prevent="enter">登录</button>
            </div>
    </div>
</template>
<script lang="babel">
    import Vue from 'vue';
    import vueGesture from 'vue-gesture';
    Vue.use(vueGesture);
    
    
    export default {
        components:{
            
        },
        data(){
            return{

            }
        },
        methods:{
            enter(){
                console.log("login")
                this.$route.router.go({path: '/login'});
            },
            register(){
                console.log("register")
                this.$route.router.go({path: '/register'});
            }
        },
        computed:{

        }
    }
</script>
<style lang="scss">
    @import "./layout.scss";
</style>
