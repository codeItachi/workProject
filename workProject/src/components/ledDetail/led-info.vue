<template>
    <div class="location-infor">
        <div>
            <span class="s1" v-gesture:tap.stop.prevent="change_address">{{info.address | isset_value_set}}</span>
        </div>
        <div>
            <span class="s2">添加屏幕时间：{{info.ctime | fdatetime}}</span>
        </div>
    </div>

    <slider class="ad-img-list" :items="imglist" :pagination="true" :auto-play="true" :speed="3000" :sync="false"></slider>

    <!--<div class="led-size">-->
        <!--<span>屏尺寸： {{info.screen_width | isset_value_set}}cm * {{info.screen_height | isset_value_set}}cm</span>-->
    <!--</div>-->

    <div class="summary">
        <span>详情简介</span>
        <div>
            <p>
                {{info.content | isset_value_empty}}
            </p>
        </div>
    </div>

    <div class="more-data" :class="{'show': moreDate}">
        <ul>
            <li>屏<span>体</span><span>宽</span>度：{{info.screen_width | isset_value_set}}&nbsp;点</li>
            <li>屏<span>体</span><span>高</span>度：{{info.screen_height | isset_value_set}}&nbsp;点</li>
            <li>数<span>据</span><span>极</span>性：{{info.polar_data  | filterpolar}}</li>
            <li>O <span>E</span> <span>极</span>性：{{info.polar_oe  | filterpolaroe}}</li>
            <li>基<span></span><span></span>色：{{info.color_value | filtercolor}}</li>
            <li>扫<span>描</span><span>方</span>式：{{info.scan_type || 0  | filterscantype}}</li>
        </ul>
    </div>
   <!--  <span class="more-parameter"  v-gesture:tap.stop.prevent="moreDateShow()">更多参数</span> -->
</template>

<script>
    import Vue from 'vue';
    import VueGesture from 'vue-gesture';
    Vue.use(VueGesture);

    import ledImgs from './led-imgs';
    import slider from '../slider.vue';
    import ledMessage from '../../message/led';
    import {typeColorValue,scanType2Value,dataPolarValue} from '../../view/program-image/common.js';
    Vue.filter("filtercolor",function(color_value){
        return typeColorValue(color_value);
    })
    Vue.filter("filterscantype",function(scan_type){
        return scanType2Value(scan_type);
    })
    Vue.filter("filterpolar",function(polar_data){
        return dataPolarValue(polar_data);
    })
    Vue.filter("filterpolaroe",function(polar_oe){
        return dataPolarValue(polar_oe);
    })
    export default {
        data:function(){
            return {
                moreDate: true,
                imglist:[],
            }
        },

        components:{
            ledImgs,slider
        },

        ready(){
        },

        methods:{
            change_address(){
                this.$router.go({name:'map',query:{id:this.info.id}});
            },
            moreDateShow(){
                this.moreDate = !(this.moreDate);
            },
        },
        props:{
            info:{
                required:true,
            }
        },
        watch:{
            'info.images'(images){
                if(images instanceof Array){
                    let pics = [];
                    for(let img in images){
                        pics.push({picUrl:images[img]});
                    }
                    this.imglist = pics;
                }
            }
        }
    }
</script>
<style lang="scss" scoped>
    .more-data{
        ul{
            li{
                padding-left: 25px;
                background-image:url(../../../static/edit-icon.png);
                background-size: 16px;
                background-repeat: no-repeat;
                &:nth-child(1){
                    background-position:5px -30px;
                }
                &:nth-child(2){
                    background-position:5px 16px;
                }
                &:nth-child(3){
                    background-position:5px -166px;
                }
                &:nth-child(4){
                    background-position:5px -211px;
                }
                &:nth-child(5){
                    background-position:5px -75px;
                }
                &:nth-child(6){
                    background-position:5px -255px;
                }


            }
        }
    }
</style>