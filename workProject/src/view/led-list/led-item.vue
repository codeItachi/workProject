<template>
    <item>
        <slider-menu :opened="opened" :slide-show="slideShow" :index="index" :menu-open="open" :disab="disabled">
            <ul slot="submenu" class="slid-con">
                <li class="li-1" v-gesture:tap.stop.prevent="infoPut(led.id)">投放</li>
                <li class="li-2" v-gesture:tap.stop.prevent="infoEdit(led.id)">编辑</li>
                <li class="li-3" v-gesture:tap.stop.prevent="infoDel(led.id, led.gid, led.device)">删除</li>
            </ul>

            <div slot="substance" class="info-con led-list" :class="{'ck':led.select}" v-gesture:tap.stop.prevent="selectList()">
                <div>
                    <div class="left">
                        <span class="checkbox" :class="{'select':led.select}"></span>
                        <div>
                            <span class="s1">{{num}}</span>
                            <span class="s2">
                                <img src="../../../static/led-bg.png">
                            </span>
                        </div>
                    </div>
                    <div class="right">
                        <ul>
                            <li>
                                <span>ID：{{led.device}}</span>
                                <span v-if="led.online_status == 1" class="statu online">在线</span>
                                <span v-else="led.online_status == 0" class="statu Offline">离线</span>
                            </li>
                            <li>
                                <span class="name">名称：{{led.title}}</span>
                            </li>
                        </ul>
                        <span v-if="led.online_status == 1" class="led date">上线时间：{{timeStatu | fdatetime2 'YYYY.M.d HH:mm'}}</span>
                        <span v-else="led.online_status == 0" class="led date">离线时间：{{timeStatu | fdatetime2 'YYYY.M.d HH:mm'}}</span>
                    </div>
                </div>
            </div>
        </slider-menu>
    </item>
</template>
<style lang="scss">
    .checkbox
    {
        position:relative;
        display: inline-block;
        outline:0;
        height: 20px;
        font-size: 14px;
        margin-top: 13px;
        margin-right: 8px;
        padding-left: 18px;
        line-height: 20px;
        vertical-align: top;
        border-radius:3px;
        border: 1px solid #bebebe;

        &:after
        {
            position: absolute;
            content: "";
            top: 2px;
            left: 5px;
            width: 5px;
            height: 9px;
            border-right: 2px solid #ddd;
            border-bottom: 2px solid #ddd;
            transform: rotate(45deg);
            -ms-transform: rotate(45deg);
            -webkit-transform: rotate(45deg);
            z-index: 99;
        }

        &.select
        {
            border-color:#3CA9E2;
            background-color:#42beff;
        }

        &.select:after
        {
            border-right: 2px solid #fff;
            border-bottom: 2px solid #fff;
        }
    }
</style>
<script lang="babel">
    import Vue from 'vue';
    import vueGesture from 'vue-gesture';
    Vue.use(vueGesture);

    import Item from './item.vue';
    import SliderMenu from '../../components/slider-menu.vue';
    import {type2image} from './common.js';
    import {timestamp} from '../../util';
    export default{
        data(){
            return {}
        },

        props:{
            led:{
                required:true,
                type:Object,
            },
            index:{
                required:true,
                type:Number,
            },
            opened:{
                required:true,
            },
            disab:{
                twoWay:true,
            },
            infoPut:{
                type:Function,
            },
            infoDel:{
                type:Function,
            },
            infoEdit:{
                type:Function,
            },
            currentPage:{
                required:true,
                type:Number,
            },
            pagenumber:{
                required:true,
                type:Number,
            },
            selectLed:{
                required:true,
                type:Function
            },
            group:{
                required:true,
                type:Object,
            }
        },

        methods:{
            open(index){
                this.opened = this.index;
            },
            selectList(){
                this.led.select = !(this.led.select);
            }
        },
        components: {
            Item,SliderMenu
        },

        watch:{
            'led.select':function(new_){
                this.selectLed(this.led.gid, this.led.id, new_);
            }
        },

        computed:{
            disabled(){
                return this.led.select;
            },

            num(){
                let num = (this.group.page - 1) * this.pagenumber + (this.index + 1);
                return num;
            },

            timeStatu(){
                if(this.led.last_status_time == 'none'){
                    return '--';
                }else{
                    return this.led.last_status_time;
                }
            }
        }
    }
</script>
