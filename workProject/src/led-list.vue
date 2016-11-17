<template>
    <div>
        <app-header>
            <span slot="center" class="">我的LED屏幕({{led_count}})</span>
            <span slot="right" class="add right" v-gesture:tap.stop.prevent="led_add"></span>
        </app-header>

        <div class="putList-info">
            <div v-for="item in lists">
                <slider-menu :opened="opened" :slide-show="slideShow" :index="$index" :menu-open="open">
                    <div slot="submenu" class="slid-con">
                        <ul>
                            <li v-gesture:tap.stop.prevent="del(item.sid)">删除</li>
                            <li v-gesture:tap.stop.prevent="edit(item.sid)">编辑</li>
                            <li v-gesture:tap.stop.prevent="toufang(item.sid)">投放</li>
                        </ul>
                    </div>
                    <div slot="substance" class="info-con">
                        <div>
                            <span class="no">1</span>
                            <span class="img">
                                <img :src="item.img | first_img" v-link="{path:'/led-detail?id=' + id}">
                                <span class="date">{{item.datetime | date}}</span>
                            </span>

                            <div class="content">
                                <span class="tit" v-if="item.alias_name" v-link="{path:'/led-detail?id=' + id}">{{item.alias_name}}</span>
                                <span class="tit" v-else v-link="{name: 'led-detail'}">{{item.title}}</span>
                                <span class="num">所在设备：{{item.sn}}</span>
                                <p>{{item.ad}}</p>
                            </div>
                            <span class="ad-satus" :class="item.led_status | led_status_class">{{item.led_status | led_status_tag}}</span>
                            <span class="led_state" :class="{'on':item.led_state}">
                                {{item.online_status | led_state_tag}}
                            </span>
                        </div>
                    </div>
                </slider-menu>
            </div>
        </div>
    </div>
</template>

<script lang="babel">
    import Vue from 'vue';
    import vueGesture from 'vue-gesture';
    Vue.use(vueGesture);
    Vue.use(vueStore, 'bus');

    import vueStore from './vue-store';
    import socket from './socket';
    import {timestamp} from './util';
    import led from './message/led';
    import appHeader from './components/app-header.vue';
    import sliderMenu from './components/slider-menu.vue';


    export default {
        route:{
            data(trans){
                socket.ready = () =>{
                    this.loadLeds();
                }
            }
        },
        ready(){
        },
        data(){
            return {
                opened: null,
                lists: [],
            }
        },
        components:{
            appHeader,sliderMenu
        },

        methods: {
            open(index){
                this.opened = index ;
            },

            led_add(){
                this.$route.router.go({path:'/led-add'});
            },

            loadLeds(){
                var list = null;//is.store.get('led-list');
                if(list){
                    list = JSON.parse(list);
                }else{
                    list = {
                        uptime:0
                    }
                }
                var cur = timestamp();
                if((cur - 3000) < list.uptime){
                    this.lists = list.list;
                }else{
                    led.get_list().then((data) =>{
                        console.log(data);
                        this.lists = data;
                    })
                }
            },

            toufang(id){
                this.$route.router.go({path: '/ad-vertising?sid=' + id});
            },

            del(id){
                led.del_led(id).then(()=>{
                    this.$toast({
                        text:"删除成功",
                        time:1000
                    });
                    let item = null;
                    for(let i=0; i < this.lists.length; i++){
                        if(this.lists[i].sid == id){
                            item = this.lists[i];break;
                        }
                    }
                    item && this.lists.$remove(item);
                }).catch(()=>{
                    this.$toast({
                        text:"删除失败",
                        time:800
                    })
                });
            },

            edit(id){
                this.$route.router.go({path:'/led-detail?id=' + id});
            },
        },
        computed:{
            led_count(){
                return this.lists.length;
            }
        },
    }
</script>

<style lang="scss">
    @import "./components/ledList/layout.scss";
</style>