<template>
    <div class="remove-bind">
        <page-head>
            <span slot="center" class="center">帐号列表</span>
            <a slot="right" class="led-right" v-link="'/bind'">新增</a>
        </page-head>
        <div class="msg-error" v-if="!is_current">
            <span>未绑定账号/未选定一个当前账号，无法正常使用相关功能</span>
        </div>
        <div class="list" v-for="account in accounts">
            <div>
                <span class="s1" :class="{'current':account.account == current}">{{account.name || account.account}}</span>
                <span class="s2">
                    <button class="unbind" v-gesture:tap.stop.prevent="unbind(account.account)">解绑</button>
                    <button v-if="account.account == current" class="quit" v-gesture:tap.stop.prevent="quitAccount(account.account)">退出帐号</button>
                    <button v-else class="switch" v-gesture:tap.stop.prevent="switchAccount(account.account)">切换帐号</button>
                </span>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
    .remove-bind{
        padding-top:46px;
        height:100%;
        background-color:#f5f5f5;

        .msg-error{
            padding:10px 10px 0 10px;
            font-size:15px;
            color:#ff6600;
        }

        .list{

            >div{
                height:auto;
                padding:10px;
                margin-top:10px;
                background-color:#fff;
                border-top:1px solid #ddd;
                border-bottom:1px solid #ddd;

                &:after{
                    content:"";
                    display:block;
                    clear:both;
                }
            }
        }

        .s1{
            display:block;
            width:auto;
            max-width:140px;
            float:left;
            height:24px;
            padding-left:28px;
            margin-top:5px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            background:url(../../../static/account2.png) no-repeat;
            background-size:24px;

            &.current
            {
                background:url(../../../static/account1.png) no-repeat;
                background-size:24px;
            }
        }
        .s2{
            display:block;
            float:right;
            font-size:0;

            button:first-child{
                margin-right:15px;
            }
        }

        button{
            width:auto;
            height:34px;
            padding:0 10px;
            font-size:15px;
            color:#666;
            outline:0;
            border-radius:3px;
            text-align:center;
            border:1px solid #ddd;
            background-color:#fafafa;
        }
        button.unbind{
            color:#fff;
            background-color:#fe8f00;
            border:1px solid #e2860e;
        }
        button.switch{
            color:#fff;
            background-color:#0dcbe6;
            border-color:#15bed6;
        }
        button.quit{
            color:#fff;
            background-color:#4dd965;
        }
    }
    .remove-bind .header .right{
        padding:0 10px;
    }
    .remove-bind .header .right:after,
    .remove-bind .header .right:before{
        display:none;
    }
</style>
<script lang="babel">
    import Vue from 'vue';
    import vueGesture from 'vue-gesture';
    Vue.use(vueGesture);

    import pageHead from '../led-list/head.vue';
    import accountMessage from 'message/account';
    import socket from '../../socket';
    import accountStore from 'store/account-store';

    export default {
        components:{
            pageHead,
        },
        data(){
            return {
                current:false,
                accounts:[
                ],
            };
        },
        ready(){

        },
        route:{
            data(trans){
                accountMessage.get_list().then(result=>{
                    this.current = result.current;
                    this.accounts = result.lists;
                }).catch(code=>{
                    console.log(code);
                });
            }
        },

        methods:{
            unbind(account){
                this.$modalcb({
                    title:'温馨提示：',
                    content:'解绑后该帐号暂时无法发布节目',
                    cancelTitle:"取消",
                    submitCall:()=>{
                        accountMessage.unbind(account).then((ret)=>{
                            this.$toast({text:'退出成功'});
                            this.current = this.current != account;
                            socket.bind = this.current != account;
                            let length = this.accounts.length;
                            for(let i = 0; i < length; i++){
                                if(this.accounts[i].account == account){
                                    this.accounts.$remove(this.accounts[i]);
                                    return;
                                }
                            }
                        }).catch(code=>{
                            this.$toast({text:code});
                        });
                    }});
            },
            switchAccount(account){
                this.$modalcb({
                    title:'温馨提示：',
                    content:'确认切换帐号并重新登录',
                    cancelTitle:"取消",
                    submitCall:()=>{
                        accountMessage.switchit(account).then((ret)=>{
                            this.$toast({text:'切换成功'});
                            this.current = account;
                            socket.login = true;
                            socket.bind = true;
                            accountStore.setrelogin(ret);
                        }).catch(code=>{
                            this.$toast({text:code});
                        })
                    }});
            },
            quitAccount(account){
                this.$modalcb({
                    title:'温馨提示：',
                    content:'确认退出当前帐号',
                    cancelTitle:"取消",
                    submitCall:()=>{
                        accountMessage.quit(account).then((ret)=>{
                            this.$toast({text:'退出成功'});
                            this.current = false;
                            socket.bind = false;
                            socket.login = false;
                        }).catch(code=>{
                            this.$toast({text:code});
                        })
                    }});
            }
        },

        computed:{
            is_current(){
                return this.current != '' && this.current !== false;
            }
        },

    }
</script>