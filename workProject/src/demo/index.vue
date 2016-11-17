<template>
    <div>
        <page-head>
            <span class="text" slot="text">公共组件</span>
        </page-head>

        <div class="page-body">
            <h3>分页</h3>
            <div class="con">
                <button class="btn-prev" :class="{'disab' : this.pages.prevStyle}" v-gesture:tap.stop.prevent="prev()">上一页</button>
                <button class="btn-next" :class="{'disab' : this.pages.nextStyle}" v-gesture:tap.stop.prevent="next()">下一页</button>
                <ul>
                    <li v-for="list in pages.lists | limitBy pages.pageNo pages.pageIndex">
                        {{list.no}}
                    </li>
                </ul>
            </div>

            <h3>模态</h3>
            <div class="con">
                <div class="swt">
                    <span class="s1">模态</span>
                    <label class="swtichbtn"><input type="checkbox" v-model="styleStatu.show"/><i></i></label>
                </div>
                <div class="mod">
                    <a class="btn-modal" v-gesture:tap.stop.prevent="modalshow()">模态一</a>
                </div>
                <div class="mod">
                    <a class="btn-modal" v-gesture:tap.stop.prevent="modal()">模态二</a>
                </div>
            </div>

            <h3>下拉：{{this.dropDownDate.list[this.dropDownDate.slectValue]}}</h3>
            <div class="con">
                <drop-down :drop-down-date="dropDownDate"></drop-down>
            </div>

            <h3>滑动</h3>
            <div class="sld">
                <sld></sld>
            </div>

            <h3>轮播</h3>
            <div class="con player">
                <slider class="ad-img-list" :items="imglist" :pagination="false" :auto-play="false" :speed="3000"
                        :sync="true"></slider>
            </div>

            <h3>模态输入框</h3>
            <div class="con modal-input">
                <input-div :value.sync="device_sn" :this-component="this_component"></input-div>
            </div>

            <h3>删除图标</h3>
            <div class="con icon">
                <span class="sm"> <i class="i-delete sm"></i>小 </span>&nbsp;&nbsp;
                <span class="mid"> <i class="i-delete"></i> 中</span>&nbsp;&nbsp;
                <span class="lg"> <i class="i-delete lg"></i>大 </span>
                <br>
                <span class="sm"> <i class="i-delete sm gray"></i>小 </span>&nbsp;&nbsp;
                <span class="mid"> <i class="i-delete gray"></i> 中</span>&nbsp;&nbsp;
                <span class="lg"> <i class="i-delete lg gray"></i>大 </span>
            </div>

            <h3>警告图标</h3>
            <div class="con icon">
                <span class="sm"> <i class="i-warning sm"></i>小 </span>&nbsp;&nbsp;
                <span class="mid"> <i class="i-warning"></i> 中</span>&nbsp;&nbsp;
                <span class="lg"> <i class="i-warning lg"></i>大 </span>
                <br>
                <span class="sm"> <i class="i-warning sm gray"></i>小 </span>&nbsp;&nbsp;
                <span class="mid"> <i class="i-warning gray"></i> 中</span>&nbsp;&nbsp;
                <span class="lg"> <i class="i-warning lg gray"></i>大 </span>
            </div>

            <h3>加载图标</h3>
            <div class="con">
                <div class="mod">
                    <a class="btn-modal" v-gesture:tap.stop.prevent="loading()">模态三</a>
                </div>
            </div>
            <h3>滑动</h3>
            <div class="con">
                <div class="mod">
                    <a class="btn-modal" v-gesture:tap.stop.prevent="slide()">模态四</a>
                </div>
            </div>
        </div>

        <!--模态-->
        <modal :modalstyle="styleStatu">
            <div class="modal-head" slot="head">清除全部节目</div>
            <div class="modal-body" slot="body">屏内有广告正在播放，确定要全部清除吗？</div>
            <button slot="confirm" class="btn-danger" type="button">确认</button>
            <span slot="cancer">暂不清除</span>
        <modal>
    </div>

</template>
<script lang="babel">
    import Vue from 'vue';
    import vueGesture from 'vue-gesture';
    Vue.use(vueGesture);

    import pageHead from './comp/page-head';
    import modal from './comp/modal';
    import dropDown from './comp/drop-down';
    import slider from './comp/slider';
    import sld from './comp/sld';
    import inputDiv from '../components/input.vue';
    import range from '../components/range/index.vue';

    export default{
        components: {
            pageHead, modal, dropDown,range,
            sld,
            slider,
            inputDiv,
        },

        data(){
            return {
                options:{
                    max:60,
                    min:0,
                    start:5,
                    value:0,
                },


                //具顶输入框
                device_sn: '',
                network: '',
                toast_show: false,
                toast_content: '',

                //模态
                styleStatu: {
                    'remove-ad': true, //模态class
                    'show': false,
                },

                //下拉
                dropDownDate: {
                    //下拉数据
                    list: ['从右到左', '从左向右', '从上到下', '从下到上',],
                    placeholder: "请选择",
                    slectValue: null,
                    position: "top", //bot从下弹出
                    title: "下拉标题：",
                },

                imglist: [
                    {picUrl: "../../static/ad-img.png"},
                    {picUrl: "../../static/ad-time.png"},
                ],
                pages:{
                    lists:[
                        {no:1},
                        {no:2},
                        {no:3},
                        {no:4},
                        {no:5},
                        {no:6},
                        {no:7},
                        {no:8},
                    ],
                    pageNo:5, //一页显示数目
                    pageIndex:0,//下标
                    prevStyle:true,
                    nextStyle:false,
                }
            }
        },

        ready(){
            this.$loading.startup("提示文字");
            setTimeout(()=>{
                this.$loading.close();
            },3000);
            setTimeout(()=>{
                this.$loading.startup();
            },6000);
            //分页
            if(this.pages.lists.length <= this.pages.pageNo){
                this.pages.nextStyle = true;
            }
        },

        watch:{
            'styleStatu.show':function(){
                console.log(...arguments);
            }
        },

        methods: {

            //分页 - 上一页
            prev(){
                let len = this.pages.lists.length;
                let pageNo = this.pages.pageNo;
                let maxIndex = parseInt(len / pageNo) * pageNo;

                if(this.pages.pageIndex <= pageNo){
                    this.pages.prevStyle = true;
                }

                if(len <= pageNo){
                    this.pages.nextStyle = true;
                }else{
                    this.pages.nextStyle = false;
                }

                if(this.pages.pageIndex == maxIndex){
                    if(len < pageNo){
                        return
                    }else{
                        this.pages.pageIndex = maxIndex - pageNo;
                    }
                }

                else{
                    if(this.pages.pageIndex == 0){
                        return;
                    }if(this.pages.pageIndex == pageNo){
                        this.pages.prevStyle = true;
                        this.pages.pageIndex = this.pages.pageIndex - pageNo;
                    }
                    else{
                        this.pages.prevStyle = false;
                        this.pages.pageIndex = this.pages.pageIndex - pageNo;
                    }
                }
            },
            //分页 - 下一页
            next(){
                let len = this.pages.lists.length;
                let pageNo = this.pages.pageNo;
                let maxIndex = parseInt(len / pageNo) * pageNo;
                if(len <= pageNo){
                    this.pages.prevStyle = true;
                }else{
                    this.pages.prevStyle = false;
                }

                if(this.pages.pageIndex < maxIndex){
                    if(maxIndex == len){
                        if(this.pages.pageIndex < maxIndex - pageNo){
                            if(this.pages.pageIndex == maxIndex - pageNo*2){
                                this.pages.nextStyle = true;
                            }
                            this.pages.pageIndex = this.pages.pageIndex + pageNo;
                        }else{
                            return;
                        }
                    }else{
                        if(this.pages.pageIndex == maxIndex - pageNo){
                            this.pages.nextStyle = true;
                        }
                        this.pages.pageIndex = this.pages.pageIndex + pageNo;
                        this.pages.prevStyle = false;
                    }
                }
            },

            //模态
            modalshow(){
                this.styleStatu.show = true;
            },
            //模态
            modal(){
                this.$modalcb({
                    title: '温馨提示：',
                    content: Vue.extend({
                    template:'<input type="range" style=" font-size: 14px; font-weight: bold;" min="-360" max="360" value="7" />',
                    }),
                    cancelTitle: "取消",
                    submitCall: ()=> {
                        console.log("ok");
                    }
                });
            },

            prevent(){
                this.showup = false;
            },
            loading(){
                this.$loading.show("loadingaaaa");
                setTimeout(()=>{
                    this.$loading.close();
                },3000);
            },
            slide(){
                    let self = this;
                    this.$modalcb({
                        title:'屏体亮度',
                        content: Vue.extend({
                            template:'<range :option="option" :value.sync="value"></range>',
                            data(){
                                return {
                                    option:self.options,
                                    value:self.options.value
                                }
                            },
                            components:{
                                range: require('../components/range/index.vue')
                            }
                        }),
                        cancelTitle:"暂不清除",
                        submitCall:(range)=> {
                            this.options.value = range.value
                            this.options.start = range.value
                            console.log(this.options.value);
                        }
                    });
            }
        },

        computed: {
            //下拉值
            selectText(){
                if (null !== this.dropDownDate.slectValue) {
                    return this.dropDownDate.list[this.dropDownDate.slectValue]
                }
                ;
                return this.dropDownDate.placeholder;
            },

            pageStyle(){
                if(this.pages.lists.length <= this.pages.pageNo){
                    this.pages.nextStyle = true;
                }else{

                }
            }
        }
    }
</script>
<style lang="scss">
    @import './comp/layout.scss';
    .sld {
        height: 60px;
    }

    .modal-input {
        input {
            display: inline-block;
            width: 100%;
            height: 34px;
            border: 1px solid #ddd;
            padding: 6px 8px;
            line-height: 20px;
            font-size: 14px;
            color: #999;
            outline: 0;
        }
    }
</style>