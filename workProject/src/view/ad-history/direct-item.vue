<template>
    <item>
        <slider-menu :opened="opened" :slide-show="slideShow" :index="index" :menu-open="open">
            <ul slot="submenu" class="slid-con">
                <li class="li-2" v-gesture:tap.stop.prevent="cmdAgin(direct.id)">再次发送</li>
                <li class="li-3" v-gesture:tap.stop.prevent="cmdDel(direct.id)" >删除</li> 
            </ul>

            <div slot="substance" class="info-con history ">
                <div>
                    <div class="left">
                        <div>
                            <span class="s1">{{cmdNumber*(cmdPage-1) + index+1}}</span>
                            <span class="s2">
                                <img src="/static/cmd.png">
                            </span>
                        </div>
                    </div>
                    <div class="right">
                        <ul>
                            <li>
                                <span>设备号：{{direct.device}}</span>
                                <span :class="style">{{status}}</span>
                            </li>
                            <li>指令：{{cmdText}}</li>
                        </ul>
                        <span>{{direct.etime | fdatetime 'YYYY-M-d HH:mm'}}</span>
                    </div>
                </div>
            </div>
        </slider-menu>
    </item>
</template>

<style lang="scss">
    
</style>
<script lang="babel">
    import Vue from 'vue';
    import Item from './item.vue';
    import sliderMenu from '../../components/slider-menu.vue';
    import vueGesture from 'vue-gesture';
    Vue.use(vueGesture);

    import {typeText,typeStyle,typeCmd} from './common.js';

    export default {
        components:{
            Item,
            sliderMenu
        },
        data(){
            return {
            };
        },
        ready(){

        },
        route:{
            data(trans){

            }
        },

        methods:{
            open(index){
                this.opened = this.index;
            },
        },

        props:{
            index:{
                required:true,
                type:Number,
            },
            direct:{
                required:true,
                type:Object,
            },
            cmdPage:{
                required:true,
                type:Number,
            },
            cmdNumber:{
                required:true,
                type:Number,
            },
            cmdAgin:{
                required:true,
                type:Function,
            },
            cmdDel:{
                required:true,
                type:Function,
            },
            opened:{
                required:true,
            }
        },

        computed:{
            status(){
                return typeText(this.direct.status);
            },
            style(){
                return typeStyle(this.direct.status);
            },
            cmdText(){
                return typeCmd(this.direct.operate);
            }
        },

    }
</script>