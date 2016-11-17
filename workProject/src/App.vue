<template>
    <div id="app" >
        <toast :time="toast.time" :show.sync="toast.show" :type="toast.type" :over_cb="toast.func">{{toast.text}}</toast>
        <modal-cb 
        :show.sync="modalcb.show"
        :title="modalcb.title" 
        :content="modalcb.content"
        :cancel-call="modalcb.cancel_call"
        :submit-call="modalcb.submit_call"
        :cancel-title="modalcb.cancel_title"
        :submit-title="modalcb.submit_title"
        >
        </modal-cb>
        <loading :show.sync="loading.show" :tip="loading.tip"></loading>
        <statu-tips :show.sync="tip.show" :time="tip.time" :func="tip.func" :info="tip.info"></statu-tips>
        <router-view transition="pages-fade" transition-mode="out-in"></router-view>
    </div>
</template>
<style lang="scss">
    @import './components/common/common.scss';
    @keyframes inpage {
        0% {
            left:-400px
        }

        to {
            left:-0px
        }
    }
    @keyframes outpage {
        0% {
            left:0px
        }
        to {
            left:-400px
        }
    }
    .pages-fade-transition{
        height: 100%;
        width: 100%;
        left:0;
        top:0;
        position: absolute;
        transition: left 0.5s ease-in;
    }
    .pages-fade-enter{
        //animation: inpage .5s;
        left:0px;
    }
    .pages-fade-leave{
        //animation: outpage .5s linear;
        left:-400px;
    }
</style>
<script lang="babel">
    import Vue from 'vue';
    import socket from './socket';
    import weixin from './weixin';
    import toast from './components/toast/toast.vue';
    import modalCb from './components/modal/index.vue';
    import statuTips from './components/statu-tips.vue';
    import modalTemplate from "./components/modal/template";
    import loading from "./components/loading";
    import globalMessage from './global_message';
    Vue.config.devtools = true;
    export default{
        init(){

        },
        components:{
            toast,statuTips,modalCb,loading
        },

        sockets:{
            syncs:globalMessage,
        },

        data(){
            return {
                toast:{
                    text:'',
                    time:1000,
                    func:()=>{},
                    show:false
                },
                tip:{
                    show:false,
                    time:1500,
                    info:'',
                    func:()=>{},
                },
                input:{
                    value:'',
                    label:'',
                    ok:(text)=>{},
                    cancel:() =>{},
                    component:this,
                    show:true,
                },
                modalcb:{
                    show:false,
                    title:'',
                    content:'',
                    cancel_title:'',
                    submit_title:'',
                    cancel_call:()=>{},
                    submit_call:()=>{},
                },
                loading:{
                    show:false,
                    tip:'loading...'
                }
            }
        },
        methods:{
        },
        ready(){
            this.$on('toast',function(toast){
                this.toast.text = toast.text;
                this.toast.time = toast.time;
                this.toast.type = toast.type;
                this.toast.func = toast.func;
                this.toast.show = true;
            });
            this.$on('tip',function(tip){
                this.tip.time = tip.time;
                this.tip.func = tip.func;
                this.tip.info = tip.info;
                this.tip.show = true;
            });
            this.$on('modalcb',function(modalcb){
                this.modalcb.show = true;
                this.modalcb.title = modalcb.title;
                this.modalcb.content = modalcb.content;
                this.modalcb.cancel_title = modalcb.cancel_title;
                this.modalcb.submit_title = modalcb.submit_title;
                this.modalcb.cancel_call = modalcb.cancel_call;
                this.modalcb.submit_call = modalcb.submit_call;
            });
            this.$on('loading.init',function(loading){
                this.loading.tip= loading.tip;
                this.loading.show = true;
            });
            this.$on('loading.controll',function({operate}){
                this.loading.show = operate;
            });
        },
        created(){
        },
    }
</script>