<template>
    <div>
       <app-header>
           <span slot="center">广告历史列表({{count}})</span>
       </app-header>
        <!--列表[[-->
        <div class="adList-info">
            <div v-for="item in adlists  |  limitBy 100 | orderBy 'top' -1 " track-by="$index">
                <slider-menu :opened="opened" :slide-show="slideShow" :index="$index" :menu-open="open">
                <div slot="submenu" class="slid-con">
                    <ul>
                        <li v-gesture:tap.stop.prevent="info_del(item.id)">删除</li>
                        <li v-gesture:tap.stop.prevent="info_intro(item.id)">详细</li>
                    </ul>
                </div>

                <div slot="substance" class="info-con">
                    <div>
                        <span class="img">
                            <img :src="item.img"/>
                            <span>{{item.ctime | fdatetime }}插入</span>
                        </span>
                        <div class="content">
                            <span class="tit">节目号：{{item.program.no }}</span>
                            <span class="num">设备号：{{item.device}}</span>
                            <p>{{item.program.content | adcontent }}</p>
                        </div>
                        <span class="ad-satus" :class="item.status | ad_status_class">{{item.status | ad_status_tag}}</span>
                    </div>
                </div>
                </slider-menu>
            </div>
        </div>

        <!--添加[[-->
        <div class="add-creative">
            <a v-link="{path: 'ad-vertising'}">添加</a>
        </div>
    </div>
    <!--添加]]-->
</template>

<script lang="babel">
    import Vue from 'vue';
    import vueGesture from 'vue-gesture';
    Vue.use(vueGesture);
    import vueStore from './vue-store';
    import {timestamp} from './util';
    Vue.use(vueStore, "bus");
    import adMessage from './message/advertisement';
    import socket from './socket';
    import weixin from './weixin';
    import sliderMenu from './components/slider-menu.vue';
    import appHeader from './components/app-header.vue';

    export default {
        route:{
            canReuse:true,
            data(trans){
                socket.ready = () => {
                    this.loadlists();
                }
            }
        },
        components:{
            sliderMenu,appHeader,
        },
        data(){
            return {
                filter_show:null,
                open_menu: null,
                adlists :[],
                opened: null,
            }
        },
        ready(){

        },

        methods: {
            open(index){
                this.opened = index ;
            },

            loadlists(){
                let adlists = null;//this.store.get('ad-list');
                if(adlists){
                    adlists = JSON.parse(adlists);
                    var cur = timestamp();
                    if((cur- 600) > adlists.uptime){
                        adMessage.get_list().then(data=>{
                            this.adlists=data;
                            this.store.set('ad-list', {uptime:timestamp(),data:data});
                        }).catch(code =>{

                        });
                    }else{
                        this.adlists = adlists.data;
                    }
                }else{
                    adMessage.get_list().then((data)=>{
                        console.log(data);
                        this.adlists=data;
                        this.store.set('ad-list', {uptime:timestamp(),data:data});
                    }).catch((code) =>{
                    });
                }

            },
            info_del(id){
                var len = this.adlists.length;
                for(var i=0; i<len;i++){
                    if(this.adlists[i].id == id){
                        adMessage.ad_delete(id).then((intro) =>{
                            this.$toast({text:intro, time:1000,func:()=>{
                                this.adlists.$remove(this.adlists[i]);
                            }})
                        }).catch((code) =>{
                            this.$toast({text:code, time: 3000});
                        });
                        return;
                    }
                }
            },
            info_swipeleft(nth){
                this.open_menu = nth;
            },
            info_intro(id){
            },
        },
        computed:{
            count(){
                return this.adlists.length;
            },
        }

    }
</script>

<style lang="scss">
    @import "./components/adList/layout.scss";
</style>
