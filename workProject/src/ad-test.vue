
<template>
    <div>
        <app-header class="ad-vertsing">
            <span slot="back" class="back"></span>
            <span slot="center" class="text">广告投放</span>
            <span slot="right" class="right" v-gesture:tap.stop.prevent="save()">保存</span>
        </app-header>

        <location :search-results="searchResults">
            <map :led_select="led_select" :center.sync="map.center" :markers.sync="map.markers"></map>
        </location>

        <edit-info>
            <led-view slot="ledView" :current="current" :tab-index="tabsource.tabIndex" :time="current.time.time" :formats="current.time.formats" :format.sync="current.time.format"></led-view>
            <tab slot="tab" :tabsource="tabsource">
                <text-item slot="textItem" :current="current"></text-item>
                <time-item slot="timeItem" :current="current" :time="current.time.time" :formats="current.time.formats" :format.sync="current.time.format"></time-item>
            </tab>
        </edit-info>

        <put-sub>
            <div slot="submit" v-gesture:tap.stop.prevent="submit()">提交</div>
            <span slot="preview" v-gesture:tap.stop.prevent="preview(current)">预览</span>
        </put-sub>

        <modal-animat :animatstyle="animatStatu" :current="current"></modal-animat>
        <modal-color  :colorstyle="colorStatu" :current="current"></modal-color>
        <modal-preview :tab-index="tabsource.tabIndex" :time="current.time.time" :formats="current.time.formats" :format.sync="current.time.format" :effectstyle="effectShow" :current="current"></modal-preview>
    </div>
</template>


<script lang="babel">
    import Vue from 'vue';
    import mapMessage from './message/map.js'
    import vueGesture from 'vue-gesture';
    Vue.use(vueGesture);

    import advertisement from './message/advertisement';
    import led from './message/led';

    import appHeader from './components/app-header';
    import location from './components/adTest/location';
    import map from './components/map/Map.vue';
    import editInfo from './components/adTest/edit-info';
    import ledView from './components/adTest/led-view';
    import textItem from './components/adTest/text-item';
    import timeItem from './components/adTest/time-item';
    import tab from './components/adTest/tab';
    import putSub from './components/adTest/put-sub'
    import submitTip from './components/toast/submit-tip';
    import modalAnimat from './components/adTest/modal-animat';
    import modalColor from './components/adTest/modal-color';
    import modalPreview from './components/adTest/modal-preview';
    import socket from './socket';


    export default {
        components: {
            appHeader,location,map,editInfo,ledView,textItem,timeItem,tab,putSub,
            submitTip,putSub,submitTip,modalAnimat,modalColor,modalPreview
        },

        watch:{
            current:{
                deep: true,
                handler(change){
                    this.isSave = false;
                }
            }
        },

        ready(){
            this.$on('modal-statu',function(state){
                this.animatStatu.show = state;
            });

            this.$on('color-text1',function(state){
                this.colorStatu.show = state;
            });

            this.$on('effect-statu',function(state){
                this.effectShow.show = state;
            });
        },

        route:{
            data({to:{query}}){
                this.screenid = query.sid || 0;
                this.programid = query.pid || 0;
                this.id = query.id || 0;
                this.initData();
            }
        },

        data(){
            return{
                isSave:true,
                map:{
                    center:{lng:113.950886, lat:22.543495},
                    markers: new Map(),
                },
                //文字动画编辑模态
                animatStatu:{
                    'modal': true,
                    'show': false,
                },
                //文字颜色编辑模态
                colorStatu:{
                    'modal': true,
                    'show': false,
                    colors: [
                        '#db1b1c',//红
                        '#ff7800',//橙
                        '#ffe400',//黄
                        '#31d200',//绿
                        '#00d8ff',//青
                        '#1c58f0',//蓝
                        '#800bed',//紫
                    ],
                    select:'',
                },

                effectShow:{
                    'show':false,
                },

                searchResults:{
                    searchArea:"深大科技园",
                    show:false,
                    lists:[
                        {select:false,address:''},
                        {select:false,address:''},
                        {select:false,address:''}
                    ]
                },

                tabsource:{
                    //选项卡
                    tabs :[
                        {headName: "文字", tabHead: 'tabHeadText', tabList: 'text-edit', bodyIndex: 'tab-text'},
                        {headName: "时间", tabHead: 'tabHeadTime', tabList: 'time-edit', bodyIndex: 'tab-time'}
                    ],
                    tabIndex :0,
                },

                current:{
                    text:{
                        value:'',
                        color:'255',
                        size: '16',
                        animation:{
                            speed:0,
                            loop:0,
                            counter: 0,

                            way:{
                                //下拉数据
                                list:[
                                    '从右到左',
                                    '从左向右',
                                    '从上到下',
                                    '从下到上',
                                ],
                                placeholder: "请选择",
                                slectValue:1,
                                position:"bot", //bot从下弹出
                                title:"方向",
                            },
                            direction:false,
                            adaptive:false, //字体自适应
                            size:0,

                            family:{
                                list:[
                                    '宋体',
                                    '微软雅黑',
                                ],
                                placeholder: "请选择",
                                slectValue:1,
                                position:"top",
                                title:"字　　体：",
                            }
                        }
                    },
                    time:{
                        format:      0,
                        formats:[
                            {title:"年月日/时分秒",style:"YYYY/MM/dd H:m:s"},
                            {title:"月日/时分秒",style:"MM/dd H:m:s"},
                            {title:"月日/时分",style:"MM/dd H:m"},
                            {title:"时分秒",style:"H:m:s"},
                        ],
                        time: 'now',
                    },
                },

                //提交
                id: 0,
                programid:0,
                programs:[],
                screenid:0,
                screen:{},
            }
        },

        methods:{
            led_select(marker){
                let position = marker.position;
                let result = [];
                this.map.markers.forEach((ledMarker)=>{
                    mapMessage.distance(ledMarker.position, position).then((distance)=>{
                        this.searchResults.lists = [];
                        this.searchResults.searchArea = "";
                        if(distance < 5){
                            let resutObj = {
                                select:false,
                                address:ledMarker.address,
                                id:ledMarker.id
                            }
                            result.push(resutObj);
                        }
                        this.searchResults.searchArea = marker.address;
                        this.searchResults.lists = result;
                        this.searchResults.show = true;
                        this.$broadcast('show', !(this.searchResults.show));
                    }).catch((code)=>{});
                });
            },
            save(){
                let promise = new Promise((success, fail)=>{
                    if(this.isSave && this.programid > 0){
                        success(this.programid);return
                    }
                    let data = {
                        text:{
                            value:this.current.text.value,
                            color:this.current.text.color,
                            size:this.current.text.size,
                            font:this.current.text.animation.family.list[this.current.text.animation.family.slectValue],
                            animation:{
                                speed:this.current.text.animation.speed,
                                loop:this.current.text.animation.loop,
                                counter:this.current.text.animation.counter,
                                way:this.current.text.animation.way.slectValue,
                            }
                        }
                    };
                    if('' == data.text.value){
                        fail('请输入节目内容');return;
                    }

                    advertisement.save(this.programid, data).then((data)=>{
                        this.programid = data.id;
                        this.$toast({text:"保存成功",time:2000});
                        success(this.programid);
                        this.isSave = true;
                    }).catch((code)=>{
                        this.$toast({text:code,time:2000});
                        fail(code);
                    })
                });
                return promise;

            },
            submit(){
                advertisement.toufang();return;
                this.save().then((programid)=>{
                    advertisement.toufang({id:this.id, sid:this.screenid, pid:programid}).then((data)=>{
                        this.$toast({text:"提交成功",time:1999});
                    }).catch((code)=>{
                        this.$toast({text:code,time:3000});
                    })
                }).catch((code)=>{
                    this.$toast({text:code,time:3000});
                });

            },
            initData(){
                socket.ready = () =>{
                    if(this.id > 0){
                        advertisement.get_issue(this.id).then((data)=>{
                            console.log(data);
                            this.current.text.value = data.content.text.value;
                            this.screenid = data.sid;
                            led.get_info(this.screenid).then((item)=>{
                                this.map.center = {lng:item.mapx, lat:item.mapy};
                            }).catch((code)=>{
                                this.$toast({text:code, time:2000,func:()=>{
                                    history.back();
                                }})
                            });
                        }).catch((code)=>{
                            console.log(code);
                            this.$toast({text:code, time:12000,func:()=>{
                                history.back();
                            }})
                        });
                        return true;
                    }
                    if(this.screenid > 0){
                        led.get_info(this.screenid).then((item)=>{
                            this.map.center = {lng:item.mapx, lat:item.mapy};
                        }).catch((code)=>{
                            this.$toast({text:code, time:2000,func:()=>{
                                history.back();
                            }})
                        });
                    }
                }

            }
        }
    }
</script>
<style lang="scss">
    @import "./components/adTest/layout.scss";
</style>
