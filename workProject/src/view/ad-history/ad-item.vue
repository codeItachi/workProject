<template>
    <item>
        <slider-menu :opened="opened" :slide-show="slideShow" :index="index" :menu-open="open" :disab="disab">
            <ul slot="submenu" class="slid-con">
                <li class="li-2" v-gesture:tap.stop.prevent="itemPutAgin(recored.id)">
                    <span>再次投放</span>
                </li>
                <li class="li-3" v-gesture:tap.stop.prevent="itemDel(recored.id,recored.status)" :class="{'disab':recored.status ==1}">删除</li>
            </ul>

            <div slot="substance" class="info-con history">
                <div>
                    <div class="left">
                        <div>
                            <span class="s1">{{pageNumber*(page-1) + index+1}}</span>
                            <span class="s2">
                                <img :src="image"> <!--:src="image"-->
                            </span>
                        </div>
                    </div>
                    <div class="right">
                        <ul>
                            <li>
                                <span>广告：{{no}}</span>
                                <span :class="style">{{status}}</span>
                            </li>
                            <li>设备号：{{recored.device}}</li>
                        </ul>
                        <span>{{recored.etime | fdatetime 'YYYY-M-d HH:mm'}}</span> <!-- | fdatetime 'YYYY-M-d'  -->
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
    import vueGesture from 'vue-gesture';
    Vue.use(vueGesture);

    import Item from './item.vue';
    import sliderMenu from '../../components/slider-menu.vue';
    import {typeImg} from './common.js';
    import {typeText} from './common.js';
    import {typeStyle} from './common.js';
    import {content2value} from './common.js';
    import {timestamp} from '../../util';

    export default {
        data(){
            return {
                
            };
        },
        components:{
            Item,
            sliderMenu,
        },
        props:{
            opened:{
                required:true,
            },
            recored:{
                required:true,
                type:Object,
            },
            index:{
                required:true,
                type:Number,
            },
            itemPutAgin:{
                type:Function,
            },
            itemDel:{
                type:Function,
            },
            pageNumber:{
                required:true,
                type:Number,
            },
            page:{
                required:true,
                type:Number,
            }
        },

        methods:{
            open(index){
                this.opened = this.index;
            },
        },

        computed:{
            image(){
                return typeImg(this.recored.program.content.type);
            },
            status(){
                return typeText(this.recored.status);
            },
            style(){
                return typeStyle(this.recored.status);
            },
            content(){
                return content2value(this.recored.program.content);
            },
            no(){
                return this.recored.program.no;
            }
        },

    }
</script>