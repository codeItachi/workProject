<template>
    <div>
        <app-header class="mullti" :back-call="backCall">
            <span slot="center" class="center">
                <div>
                    <span class="s1" >{{led_title}}</span>
                    <span class="s2" :class="{'show' : infos.title}">{{led_sn}}</span>
                </div>

            </span>
            <span slot="right" class="right" v-show="tabShow == 'led-info'"><a class="save show" v-link="{name: 'led-edit',params:{id:ledid}}">编辑</a></span>
        </app-header>

        <div class="led-detail">
            <ul class="tab-tit">
                <li v-for="item in tabs" :class="{'active': $index == tabIndex}"  v-gesture:tap.stop.prevent="active_item($index)">{{item.headName}}</li>
            </ul>

            <div class="tab-content">
                <!--[[广告数目-->
                <div class="ad-no" :class="{'show': tabShow == 'ad-no'}">
                    <ad-no :ads="ads"></ad-no>
                </div>
                <!--]]广告数目-->

                <!--[[高级设置-->
                <div class="settings" :class="{'show': tabShow == 'settings'}">
                    <settings :setting="setting"></settings>
                </div>
                <!--]]高级设置-->

                <!--[[LED屏幕信息-->
                <div class="led-info" :class="{'show': tabShow == 'led-info'}">
                    <led-info :info="infos"></led-info>
                </div>
                <!--]]LED屏幕信息-->
            </div>
        </div>
    </div>
</template>

<script lang="babel">
    import Vue from 'vue'
    import vueGesture from 'vue-gesture';
    Vue.use(vueGesture);
    import adNo from './components/ledDetail/ad-no';
    import Settings from './components/ledDetail/settings';
    import ledInfo from './components/ledDetail/led-info';
    import appHeader from './components/app-header.vue';
    import ledMessage from './message/led';
    import adMessage from './message/advertisement';
    import socket from './socket.js';
    import programMessage from './message/program';

    Vue.filter("textState",function(styleStates,trueValue,falseValue){
        if(styleStates)return trueValue;
        return falseValue;
    })

    export default {
        components:{
            adNo,
            Settings,
            ledInfo,
            appHeader
        },

        route:{
            canReuse:true,
            data({from:{name},to:{query}}){
                this.$loading.show();
                let promise = new Promise((succ,fail)=>{
                    socket.ready = ()=> {
                        this.ledid = query.id || 0;
                        this.tabIndex = name == 'led-edit' ?  2 : 0 || name == 'map' ?  2 : 0;
                        this.ledid && ledMessage.get_ad_list(this.ledid).then((data)=> {
                            this.ads = data;
                            this.$loading.close()
                        }).catch((code)=> {
                            this.$toast({text: code, time: 3000});
                        });

                        ledMessage.setting_get(this.ledid).then((setting)=>{
                            this.setting = setting;
                        }).catch(()=>{
                            this.$toast({time:3000,text:"失败"});
                        });

                        ledMessage.get_info(this.ledid).then((data)=>{
                            this.infos = data;
                            succ();
                        }).catch(()=>{});

                    }
                });
                return promise;

            },
            waitForData:true //等待数据route.data
        },

        data(){
            return {
                ledid: 0,
                infos: {},
                ads:[
                ],
                //收起展开默认状态
                styleStates:false,

                //选项卡
                tabs :[
                    {headName: "当前广告", tabList: 'ad-no', bodyIndex: 'ad-no'},
                    {headName: "高级设置", tabList: 'settings', bodyIndex: 'settings'},
                    {headName: "LED屏信息", tabList: 'led-info', bodyIndex: 'led-info'},
                ],
                tabIndex :0,
                setting:{led_open:0,auto_timming:0,open_timer:{open:1,begin:0,end:0}}
            }
        },

        methods: {
            //选项卡
            active_item(nth){
                this.tabIndex = nth;
                if(nth == 0){
                    this.loadData();
                }
            },
            backCall(){
                this.$router.go({path:'/new-led-list'});
            },
            loadData(){
                this.ledid && ledMessage.get_ad_list(this.ledid).then((data)=> {
                    this.ads = data;
                }).catch((code)=> {
                    this.$toast({text: code, time: 3000});
                });
            }

        },

        computed:{
            tabShow(){
                var ret =this.tabs[this.tabIndex].bodyIndex;
                return ret;
            },
            led_title(){
                if(this.infos){
                    return this.infos.title;
                }else{
                    return "未设定名称";
                }
            },
            led_sn(){
                if(this.infos){
                    return this.infos.device;
                }else{
                    return '';
                }
            }
        }
    }
</script>

<style lang="scss">
    @import "./components/ledDetail/layout.scss";
    .mullti{
        .center{
            display: flex;
            width: 100%;
            height:100%;
            align-items: center;
            justify-content: center;
            span.show{
                font-size: 12px;
            }
        }
    }
</style>