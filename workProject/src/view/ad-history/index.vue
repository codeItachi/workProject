<template>
    <div>
        <page-head :conditions="conditions">
            <span slot="left" class="left" v-gesture:tap.stop.prevent="changeModel()"></span>
            <span v-show="modelProgram" slot="center" class="center">广告历史记录({{count}})</span>
            <span v-show="!modelProgram" slot="center" class="center">指令历史记录({{cmdCount}})</span>
            <span slot="right" v-if="!modelProgram"></span>
        </page-head>

        <content  v-if="modelProgram">
            <list>
                <ad-item slot="list" v-for="recored in records | orderBy 'etime' -1"
                         :recored="recored"
                         :opened.sync="opened"
                         :item-put-agin="itemPutAgin"
                         :item-del="itemDel"
                         :page-number="pageNumber"
                         :page="page"
                         :index="$index">
                </ad-item>
                <!-- <div v-show="pageStyle" slot="pageTool" class="page-tool">
                    <div>
                        <button class="btn-prev" :class="{'disab' : this.prevStyle}" v-gesture:tap.stop.prevent="prevPage()">上页</button>
                        <button class="btn-next" :class="{'disab' : this.nextStyle}" v-gesture:tap.stop.prevent="nextPage()">下页</button>
                    </div>
                </div> -->
            </list>
            <panel :paner-display="panerDisplay" :close-paner="closePaner" v-gesture:swipeRight.stop.prevent="close_panel($event)">
                <label-panel label="时间范围：">
                    <btn-group v-for="list in timeSourcs.times" :list="list" :sign.sync="timeSourcs.sign" :index="$index">
                    </btn-group>
                </label-panel>
                <label-panel label="广告状态：">
                    <btn-group v-for="list in statuSourcs.status" :list="list" :sign.sync="statuSourcs.sign" :index="$index">
                    </btn-group>
                </label-panel>
                <label-panel label="广告类型：">
                    <btn-group v-for="list in typeSourcs.types" :list="list" :sign.sync="typeSourcs.sign" :index="$index">
                    </btn-group>
                </label-panel>
            </panel>
        </content>
        <content v-else="!modelProgram">
            <list>
                <direct-item slot="list" v-for="direct in directs | orderBy 'etime' -1"
                             :direct="direct"
                             :index="$index"
                             :opened.sync="cmdOpened"
                             :cmd-agin="cmdAgin"
                             :cmd-del="cmdDel"
                             :cmd-page="cmdPage"
                             :cmd-number="cmdNumber">
                </direct-item>
<!--                 <div v-show="cmdPageStyle" slot="pageTool" class="page-tool">
                    <div>
                        <button class="btn-prev" :class="{'disab' : this.prevStyle}" v-gesture:tap.stop.prevent="cmdPrevPage()">上页</button>
                        <button class="btn-next" :class="{'disab' : this.nextStyle}" v-gesture:tap.stop.prevent="cmdNextPage()">下页</button>
                    </div>
                </div> -->
            </list>
        </content>

        <page-foot>
            <span slot="left" class="btn-left" :class="{'disab' : prevButton}" v-gesture:tap.stop.prevent="prevPage()">上一页</span>
            <a slot="submit" v-gesture:tap.stop.prevent="submit">添加</a>
            <span slot="right" class="btn-right" :class="{'disab' : nextButton}" v-gesture:tap.stop.prevent="nextPage()">下一页</span>
        </page-foot>

    </div>
</template>

<style lang="scss">
    @import "./layout.scss";
</style>
<script lang="babel">
    document.addEventListener("touchstart", function(){}, true);
    import Vue from 'vue';
    import vueGesture from 'vue-gesture';
    vueGesture.config.maxSingleTapPageDistanceSquared = 900;
    Vue.use(vueGesture);

    import pageHead from './head.vue';
    import content from './content.vue';
    import list from './list.vue';
    import panel from './panel.vue';
    import labelPanel from './label-panel.vue';
    import adItem from './ad-item.vue';
    import directItem from './direct-item.vue';
    import btnGroup from './btn-group.vue';
    import pageFoot from './foot.vue';
    import socket from '../../socket.js';
    import adMessage from '../../message/advertisement';
    import cmdMessage from '../../message/cmd.js';

    import {program_type} from '../../global_const.js';
    import {timestamp} from '../../util.js';

    const model_select = 'select';

    const separator = '-';
    const ad_status_wait = 1;
    const ad_status_send = 2;
    const ad_status_succ = 3;
    const ad_status_fail = 4;
    export default {
        components:{
            pageHead,
            content,
            list,
            panel,
            adItem,
            directItem,
            btnGroup,
            pageFoot,
            labelPanel,
        },

        destroyed(){
            clearTimeout(this.timer);
        },

        route:{
            data(){
                socket.ready = () =>{
                    this.loadAdData();
                    this.loadCmdData();
                };
            }
        },

        data(){
            return {
                //节目历史分页
                page:1,
                pageNumber:8,
                pages:0,
                count:0,
                pageStyle:true,
                opened: null,//slider-menu
                prevStyle:false,
                nextStyle:false,

                //指令历史分页
                cmdPage:1,
                cmdPages:0,
                cmdCount:0,
                cmdNumber:8,
                cmdPageStyle:true,
                cmdOpened:null,

                modelProgram:true,
                records:[],
                directs:[
                ],
                content:"",
                panerDisplay:false,

                //条件
                timelimit:0,
                statuLimit:null,
                typeLimit:'',
                timeSourcs:{
                    times:[
                        {btnText:"一天内",select:false,value:86400},
                        {btnText:"三天内",select:false,value:86400 * 3},
                        {btnText:"一周内",select:false,value:86400 * 7},
                        {btnText:"两周内",select:false,value:86400 * 14},
                        {btnText:"一月内",select:false,value:86400 * 30},
                    ],
                    sign:1,
                },
                statuSourcs:{
                    status:[
                        {btnText:"发送成功",select:false, value:ad_status_succ},
                        {btnText:"正在发送",select:false, value:ad_status_send},
                        {btnText:"等待发送",select:false, value:ad_status_wait},
                        {btnText:"发送失败",select:false, value:ad_status_fail},
                    ],
                    sign:-1,
                },
                typeSourcs:{
                    types:[
                        {btnText:"文字广告",select:false, value:program_type.text},
                        {btnText:"时间广告",select:false, value:program_type.time},
                        {btnText:"图片广告",select:false, value:program_type.image},
                    ],
                    sign:-1,
                },
                id:null,//删除当前节目ID
                //status:null,
            }
        },
        ready(){

        },

        methods:{
            //分页
             prevPage(){
                if(this.modelProgram){
                    if(this.page == 1){
                        return;
                    }
                    this.page = this.page - 1;
                    this.loadAdData();
                }else{
                    if(this.cmdPage == 1){
                        return;
                    }
                    this.cmdPage = this.cmdPage - 1;
                    this.loadCmdData();
                }
            },

            nextPage(){
                if(this.modelProgram){
                    if(this.page >= this.pages){
                        return;
                    }
                    this.page = this.page + 1;
                    this.loadAdData();
                }else{
                    if(this.cmdPage >= this.cmdPages){
                        return;
                    }
                    this.cmdPage = this.cmdPage + 1;
                    this.loadCmdData();
                }
            },

            loadAdData(){
                let options = {pagenumber:this.pageNumber};
                if(this.timeSourcs.sign >=0){
                    options.timelimit = this.timeSourcs.times[this.timeSourcs.sign].value;
                }

                if(this.statuSourcs.sign >= 0){
                    options.statulimit = this.statuSourcs.status[this.statuSourcs.sign].value;
                }

                if(this.typeSourcs.sign >= 0){
                    options.typelimit = this.typeSourcs.types[this.typeSourcs.sign].value;
                }

                adMessage.get_history(this.page, options).then(result=>{
                    this.pages = result.pages;
                    this.count = result.count;
                    this.records = result.details;
                    if(this.pages <= 1){
                        this.pageStyle = false;
                    }else{
                        this.pageStyle = true;
                    }
                }).catch(code=>{
                    if(code == '未登录账号'){
                        this.$router.go({path:'/login'});
                    }
                });
            },

            loadCmdData(){
                cmdMessage.get_history(this.cmdPage,this.cmdNumber).then(result=>{
                    this.cmdPages = result.pages;
                    this.cmdCount = result.count;
                    this.directs = result.directs;
                    if(this.cmdPages <= 1){
                        this.cmdPageStyle = false;
                    }else{
                        this.cmdPageStyle = true;
                    }
                }).catch(code=>{
                    if(code == '未登录账号'){
                        this.$router.go({path:'/login'});
                    }
                });
            },

            //节目指令切换
            changeModel(){
                this.modelProgram = !(this.modelProgram);
                if(this.modelProgram){
                    this.loadAdData();
                }else{
                     this.loadCmdData();
                }
            },
            //关闭筛选条件
            close_panel(event){
                this.panerDisplay = false;
                this.page = 1;
                this.loadAdData();
            },
            closePaner(){
                this.panerDisplay = false;
                this.page = 1;
                this.loadAdData();
            },
            //打开筛选条件
            conditions(){
                this.panerDisplay = true;
            },
            itemPutAgin(id){
                adMessage.agintoufang(id).then(oid=>{
                    this.$toast({text:'提交成功',time:2000,func:()=>{
                        this.$router.replace({'name':'toufang-intro',params:{id:oid}});
                    }});
                }).catch(code=>
                    this.$toast({text:code})
                );
            },

            itemDel(id,status){
                if(1 == status){
                    this.$toast({text:'该状态不能删除',time:2000});
                }else{
                    this.id = id;
                    this.$modalcb({
                        title: '温馨提示：',
                        content: '是否确认删除该记录？',
                        cancelTitle: "取消",
                        submitCall: ()=> {
                            var len = this.records.length;
                            for(var i=0; i<len;i++){
                                if(this.records[i].id == this.id){
                                    adMessage.ad_delete(this.id).then((intro) =>{
                                        //this.styleStatu.show = false;
                                        this.$toast({text:intro, time:1000,func:()=>{
                                            this.records.$remove(this.records[i]);
                                        }})
                                    }).catch((code) =>{
                                        this.$toast({text:code, time: 3000});
                                    });
                                    break;
                                }
                            }
                        }
                    });
                }
            },

            //再次发送指令
            cmdAgin(id){
                cmdMessage.agin(id).then(result=>{
                    this.$toast({text:'提交成功'});
                    this.directs.push(result);
                    this.cmdOpened = null;
                }).catch(code=>{
                    this.$toast({text:code});
                });
            },
            //删除指令
            cmdDel(id){
                cmdMessage.del(id).then(result=>{
                    this.$toast({text:'删除成功',func:()=>{
                        this.loadCmdData();
                    }});
                }).catch(code=>{

                });
            },

            submit(){
                this.$route.router.go({path: '/new-ad-list'});
            },
        },

        computed:{
            prevButton(){
                if(this.modelProgram){
                    if(this.pages <= 1){
                        return this.prevStyle = true;
                    }else{
                        if(this.page == 1){
                            return  this.prevStyle = true;
                        }
                    }
                }else{
                    if(this.cmdPages <= 1){
                        return this.prevStyle = true;
                    }else{
                        if(this.cmdPage == 1){
                            return  this.prevStyle = true;
                        }
                    }
                }
            },
            nextButton(){
                if(this.modelProgram){
                   if(this.pages <= 1) {
                      return this.nextStyle = true;
                   }else{
                       if(this.page == this.pages){
                           return   this.nextStyle = true;
                       }
                   }
                }else{
                   if(this.cmdPages <= 1){
                       return this.nextStyle = true;
                   }else{
                       if(this.cmdPage == this.cmdPages){
                           return  this.nextStyle = true;
                       }
                   }
                }
            }
        },
    }
</script>