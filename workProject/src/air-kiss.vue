<template>
    <div class="bind-account" >
        <div v-if="finish">
            <app-header>
                <span slot="left"></span>
                <span slot="center" class="">一键配对</span>
            </app-header>
            <div class="air-kiss">
                <div class="contrainer" >
                    <span>配对成功</span>
                    <div class="button" v-gesture:tap.stop.prevent="again">再次配对</div>
                    <div>{{data}}</div>
                </div>
            </div>
        </div>

    </div>

</template>
<style lang="scss">
    .bind-account
    {
        width:100%;
        height:100%;
        padding-top:46px;
        background-color:#f2f2f2;
    }
    .air-kiss{
        padding:160px 15px 20px 15px;
        background-repeat:no-repeat;
        background-image:url(../static/pair.png);
        background-size:70px;
        background-position:center 80px;
        .contrainer{
            width:100%;
            height:100%;
            margin: 0 auto;
            text-align: center;
            span{
                font-size: 16px;
                display: block;
                margin-bottom: 30px;
            }
            .button{
                margin: 10px auto;
                width:80%;
                height:32px;
                color: #fff;
                font-size:20px;
                background-color: #58bb10;
                border: 1px solid #4ca209;
                border-radius: 12px 12px 12px 12px;
                text-align: center;
            }
        }

    }
</style>
<script lang="babel">
    import weixin from './weixin';
    import Vue from 'vue';
    import vueGesture from 'vue-gesture';
    import appHeader from './components/app-header.vue';
    Vue.use(vueGesture);

    import socket from './socket';

    export default{
        route:{
            data(transform){
                socket.ready = ()=>{
                    weixin.exe(()=>{
                        WeixinJSBridge.invoke('configWXDeviceWiFi', {}, (res)=>{
                            this.finish = true;
                        });
                    });
                }
            }
        },
        data(){
            return{
                finish : false
            }
        },
        components:{
            appHeader
        },
        methods:{
            again(){
//                window.location.reload(true);
                window.location.href = window.location.href + "?r=r"

            }
        },
        computed:{
        }
    }
</script>