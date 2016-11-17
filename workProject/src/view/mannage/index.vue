<template>
    <div class="mannage">
        <div class="head">
            <div class="logo">
                <span>您当前登录帐号</span>
                <span>{{current}}</span>
            </div>
        </div>
        <div class="menu m1">
            <ul>
                <li><a v-link="{path: '/led-add'}">添加LED屏</a></li>
                <li><a v-link="{path: '/new-led-list'}">我的LED屏</a></li>
                <li><a v-link="{path: '/new-ad-list'}">广告列表</a></li>
                <li><a v-link="{path: '/ad-history'}">历史记录</a></li>
            </ul>

        </div>
        <div class="menu m2">
            <ul>
                <li><a>分享</a></li>
                <li><a v-gesture:tap.stop.prevent="quitAccount(accounts.account)">退出当前登录</a></li>
            </ul>
        </div>
    </div>
</template>
<style lang="scss">
    @import './layout.scss';
</style>
<script>
    import Vue from 'vue';
    import vueGesture from 'vue-gesture';
    Vue.use(vueGesture);
    import accountMessage from '../../message/account';

    export default{
        data(){
            return {
                current:'',
                accounts:'',
            }
        },
        route:{
            data(trans){
                accountMessage.get_list().then(result=>{
                    this.current = (result.current).replace(/(\d{3})\d{4}(\d{4})/,'$1****$2');
                    this.accounts = result.lists;
            }).catch(code=>{
                    console.log(code);
            });
            }
        },
        components: {},
        methods: {
            quitAccount(account){
                this.$modalcb({
                    title:'温馨提示：',
                    content:'确认退出账号',
                    cancelTitle:"取消",
                    submitCall:()=>{
                    accountMessage.quit(account).then((ret)=>{
                        this.$toast({text:'退出成功'});
                        this.current = false;
                        socket.bind = false;
                    }).catch(code=>{
                                this.$toast({text:code});
                        })
                    }
                });

            }
        },
        computed: {}
    }
</script>