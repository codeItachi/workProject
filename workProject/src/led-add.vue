<template>
    <div class="add">
        <app-header :back-call="goledlist">
            <div slot="center">添加屏</div>
        </app-header>

        <div class="led-add">
            <div class="stpe-2">
                <span class="tit">方法一：点击下图方框扫描二维码</span>

                <div class="scan" v-gesture:tap.stop.prevent="scan">
                    <div>

                    </div>
                    <span class="handle"></span>
                </div>
            </div>
            <div class="stpe-1">
                <span class="tit">方法二：填写“序列号”</span>
                <div>
                    <input type="text" name="" v-model="device_sn" placeholder="请输入序列号">
                    <button class="define" v-gesture:tap.stop.prevent="submit">确 定</button>
                </div>
            </div>
        </div>

        <div class="modal" v-if="imgType.show" v-gesture:tap.stop.prevent="shutModal()">
            <div>
                <div class="container" v-gesture:tap.stop.prevent="stopDefault">
                    <img @load="loding" v-if="imgType.type1" src="../static/add-led/bind-img1.png">
                    <img @load="loding" v-if="imgType.type2" src="../static/add-led/bind-img2.png">
                    <img @load="loding" v-if="imgType.type3" src="../static/add-led/bind-img3.png">
                    <img @load="loding" v-if="imgType.type4" src="../static/add-led/bind-img4.png">
                    <img @load="loding" v-if="imgType.type5" src="../static/add-led/bind-img5.png">
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="babel">

    import Vue from 'vue';
    import toast from './components/toast/toast.vue';
    import appHeader from './components/app-header.vue';
    import inputDiv from './components/input.vue';
    import vueGesture from 'vue-gesture';
    Vue.use(vueGesture);
    import weixin from './weixin'
    import {timestamp} from './util';
    import store from './store';
    import ledMessage from './message/led';

    export default {
        components:{
            toast,appHeader,inputDiv,
        },

        data(){
            return {
                device_sn: '',
                network: '',
                toast_show:false,
                toast_content:'',
                active:true,
                modalstyle:false,

                imgType:{
                    'show':false,
                    'type1':false,
                    'type2':false,
                    'type3':false,
                    'type4':false,
                    'type5':false,
                }
            }
        },

        route:{
            
        },

        ready(){
            weixin.wxinit(()=>{});
            console.log('led-add ready');
        },

        methods: {
            shutModal(){
                this.imgType.show = false;
            },
            stopDefault(event){
              event.stopPropagation();
            },

            goledlist(){
                this.$router.go('/new-led-list');
            },
            scan(){
                if(this.active){
                    this.active = false;
                    weixin.exe(()=>{
                        weixin.scanQRCode(true,
                                res=>{
                                    this.device_sn = res;
                                    this.submit();}
                        );
                    });
                    setTimeout(()=>{this.active = true},1500);
                }
            },
            submit(){
                return ledMessage.add_led(this.device_sn).then((data) =>{
                    this.imgType.show = true;
                    this.imgType.type1 = true;
                    this.imgType.type2 = false;
                    this.imgType.type3 = false;
                    this.imgType.type4 = false;
                    this.imgType.type5 = false;
                }).catch((code)=>{
                    this.imgType.show = true;
                    switch (code){
                        case 'device has binded other':
                            //LED屏已被别人绑定
                            this.imgType.type1 = false;
                            this.imgType.type2 = true;
                            this.imgType.type3 = false;
                            this.imgType.type4 = false;
                            this.imgType.type5 = false;
                            break;
                        case 'device has binded yourself':
                            //LED屏已绑定
                            this.imgType.type1 = false;
                            this.imgType.type2 = false;
                            this.imgType.type3 = true;
                            this.imgType.type4 = false;
                            this.imgType.type5 = false;
                            break;
                        // case 'invalid device':
                        //     //无效二维码
                        //     this.imgType.type1 = false;
                        //     this.imgType.type2 = false;
                        //     this.imgType.type3 = false;
                        //     this.imgType.type4 = false;
                        //     this.imgType.type5 = true;
                        //     break;
                        // case 'invalid key':
                        //     //无效序列号
                        //     this.imgType.type1 = false;
                        //     this.imgType.type2 = false;
                        //     this.imgType.type3 = false;
                        //     this.imgType.type4 = false;
                        //     this.imgType.type5 = true;
                        //     break;
                        default:
                            this.imgType.type1 = false;
                            this.imgType.type2 = false;
                            this.imgType.type3 = false;
                            this.imgType.type4 = false;
                            this.imgType.type5 = true;
                            break;
                    }
                });
            },
            ok(value){
            },
            cancel(){
            },
            loding  (){
                setTimeout(()=>{this.imgType.show = false},3000);
            }
        },
    }
</script>

<style lang="scss">
    @import "./components/ledAdd/layout.scss";
</style>