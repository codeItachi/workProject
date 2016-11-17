<template>
    <item>
        <slider-menu :opened="opened" :slide-show="slideShow" :index="index" :menu-open="open" :disab="disab">
            <ul slot="submenu" class="slid-con">
                <li class="li-1" v-gesture:tap.stop.prevent="infoPreview(ad.id)">预览</li>
                <li class="li-2"  v-gesture:tap.stop.prevent="infoEdit(ad.id)">编辑</li>
                <li class="li-3"  v-gesture:tap.stop.prevent="infoDel(ad.id)">删除</li>
            </ul>

            <div slot="substance" class="info-con" :class="{'ck':select}" v-gesture:tap.stop.prevent="selectList()">
                <div>
                    <div class="left">
                        <span class="checkbox" :class="{'select':select}"></span>
                        <div>
                            <span class="s1">{{index+1}}</span>
                            <span class="s2">
                                <img :src="image">
                            </span>
                        </div>
                    </div>
                    <div class="right">
                        <ul>
                            <li>
                                <span>广告：{{ad.no}}</span>
                                <span>{{ad.ctime | fdatetime 'YYYY-M-d HH:mm' }}</span>
                            </li>
                            <li>内容：{{content}}</li>
                        </ul>
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
            position: absolute;
            content: "";
            top: 2px;
            left: 5px;
            width: 5px;
            height: 9px;
            border-right: 2px solid #fff;
            border-bottom: 2px solid #fff;
            transform: rotate(45deg);
            -ms-transform: rotate(45deg);
            -webkit-transform: rotate(45deg);
            z-index: 99;
        }
    }
</style>
<script lang="babel">
    import Vue from 'vue';
    import vueGesture from 'vue-gesture';
    Vue.use(vueGesture);

    import Item from './item.vue';
    import sliderMenu from '../../components/slider-menu.vue';
    import {type2image} from './common.js';
    import {timestamp} from '../../util';
    import {content2value} from './common.js';

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
            select:{
                required:true,
                twoWay:true,
            },
            opened:{
                required:true,
            },
            ad:{
                required:true,
                type:Object,
            },
            index:{
                required:true,
                type:Number,
            },
            disab:{
                required:true,
                twoWay:true,
            },
            infoPreview:{
                type:Function,
            },
            infoDel:{
                type:Function,
            },
            infoEdit:{
                type:Function,
            }
        },

        methods:{
            open(index){
                this.opened = this.index;
            },
            selectList(){
                this.select = !(this.select);
            }
        },

        computed:{
            image(){
                return type2image(this.ad.type);
            },

            content(){
                return content2value(this.ad.content);
            },
        },

    }
</script>