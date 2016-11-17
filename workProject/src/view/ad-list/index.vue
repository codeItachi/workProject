<template>
    <div>
        <page-head :maxnum.sync="maxnum">
            <span slot="left" class="left" v-if="!allSelect" v-gesture:tap.stop.prevent="allCheck()">全选</span>
            <span slot="left" class="left again" v-else v-gesture:tap.stop.prevent="allUncheck()">取消</span>
            <span slot="center" class="center">广告列表({{led_count}})</span>
        </page-head>

        <content>
            <list :model="model">
                <ad-item v-for="ad in ads | orderBy 'ctime' -1"
                         :ad="ad"
                         :select.sync="ad.select"
                         :disab.sync="ad.disab"
                         :opened.sync="opened"
                         :info-edit="infoEdit"
                         :info-del="infoDel"
                         :info-preview="infoPreview"
                         :index="$index">
                </ad-item>
            </list>
        </content>

        <page-foot>
            <a slot="submit" v-gesture:tap.stop.prevent="submit" :class="{'active':active}">
                <span class="num">{{button_content}}</span>
                <span class="txt">投放</span>
            </a>
        </page-foot>

        <preview :show.sync="previewShow">
            <div v-if="previewContent.textContent" class="led-preview" :style="textStyleObject" >{{content}}</div>
            <div v-if="previewContent.timeContent" class="time" :style="timeStyleObject">{{time | fdatetime timeFormat}}</div>
            <div v-if="previewContent.imgContent" class="led-preview" :style="imageStyleObject"><img :src="imageStyleObject.imgPath"></div>
        </preview>
    </div>
</template>

<style lang="scss">
    @import "./layout.scss";
</style>
<script lang="babel">
    import Vue from 'vue';
    import vueGesture from 'vue-gesture';
    Vue.use(vueGesture);

    import datef from 'datef';

    import adMessage from '../../message/advertisement.js';
    import programMessage from '../../message/program';
    import pageHead from './head.vue';
    import content from './content.vue';
    import list from './list.vue';
    import adItem from './ad-item.vue';
    import pageFoot from './foot.vue';
    import preview from './preview.vue';
    import modal from '../../components/modal.vue';
    import socket from '../../socket.js';
    import {program_type} from '../../global_const.js';
    import program from '../../message/program.js';
    import {animationName} from './common.js';
    import {textColorValue} from './common.js';
    import {textFontValue} from './common.js';
    import {textAnimationValue} from './common.js';

    const model_select = 'select';
    const separator = '+';

    export default {
        components:{
            pageHead,
            content,
            list,
            adItem,
            pageFoot,
            preview,
            modal
        },

        route:{
            data({to:{query}}){
                this.sselects = this.slit_separator(query.sids,true);
                this.xselects = this.slit_separator(query.xids,true);
                this.gselects = this.slit_separator(query.gids);
                this.pselects = this.slit_separator(query.pids);
                socket.ready = ()=>{
                    this.$loading.show();
                    programMessage.get_list().then(list=>{
                        list = list.map((item)=>{
                            item.type = item.content.type;
                            item.select = false;
                            item.disab = false;
                            return item;
                        });
                        this.ads = list;
                        this.$loading.close();
                    }).catch((code)=>{
                        if(code == '未登录账号'){
                            this.$router.go({path:'/login'});
                        }
                        this.$toast({text:code,time:1500});
                    })
                }
            }
        },

        data(){
            return {
                timeFormat:'',
                time: 'now',
                num:[],
                previewContent:{
                    textContent:false,
                    timeContent:false,
                    imgContent:false,
                },

                id:null,//删除当前广告ID

                opened: null,//slider-menu
                model: model_select,
                ads:[
                ],
                sselects:[],
                pselects:[],
                xselects:[],
                gselects:[],
                active:false,//底部按钮状态

                previewShow:false,
                content:"",

                //字体广告
                textStyleObject:{
                    animationName:'',
                    fontSize:'',
                    color:'',
                    animationDuration:'',
                    animationIterationCount:'',
                },

                //时间广告
                timeStyleObject:{
                    fontSize:'',
                    color:'',
                },

                //图片广告
                imageStyleObject:{
                    imgPath:'',
                    animationName:'',
                    animationDuration:'',
                },
            }
        },
        ready(){
            var timestamp = Date.parse(new Date());
            this.time = timestamp / 1000;
            setInterval(()=>{this.time += 1;},1000);
        },

        methods:{
            slit_separator(strs, isobj){
                if(strs){
                    let arrs = strs.split(separator);
                    if(isobj){
                        return arrs.map((obj)=>{
                            return JSON.parse(obj);
                        });
                    }else{
                        return arrs;
                    }
                }else{
                    return []
                }
            },

            concat_separator(ids, func){
                if(func){
                    return ids.map(func).join(separator);
                }else{
                    return ids.join(separator);
                }
            },

            allCheck(){
                let length = this.ads.length;
                for(let i = 0; i < length; i++){
                    this.ads[i].select = true;
                    this.ads[i].disab = true;
                }
            },
            allUncheck(){
                let length = this.ads.length;
                for(let i = 0; i < length; i++){
                    this.ads[i].select = false;
                    this.ads[i].disab = false;
                }
            },

            infoEdit(id){
                var len = this.ads.length;
                for(var i=0; i<len;i++){
                    if(this.ads[i].id == id && this.ads[i].type == 'text'){
                        program.get_info(id).then((intro) =>{
                            this.$route.router.go({path: '/program-text', query: {id: id}});
                        }).catch((code) =>{
                            this.$toast({text:code, time: 3000});
                        });
                        return;
                    }else if(this.ads[i].id == id && this.ads[i].type == 'image'){
                        program.get_info(id).then((intro) =>{
                            this.$route.router.go({path: '/program-image', query: {id: id}});
                        }).catch((code) =>{
                            this.$toast({text:code, time: 3000});
                        });
                        return;
                    }else if(this.ads[i].id == id && this.ads[i].type == 'time'){
                        program.get_info(id).then((intro) =>{
                            this.$route.router.go({path: '/program-time', query: {id: id}});
                        }).catch((code) =>{
                            this.$toast({text:code, time: 3000});
                        });
                        return;
                    }
                }
            },

            //删除当前记录
            infoDel(id){
                this.id = id;

                //模态
                this.$modalcb({
                    title: '温馨提示：',
                    content: '是否确认删除该记录？',
                    cancelTitle: "取消",
                    submitCall: ()=> {
                        var len = this.ads.length;
                        for(var i=0; i<len;i++){
                            if(this.ads[i].id == this.id){
                                program.delete_program(this.id).then((intro) =>{
                                    this.$toast({text:intro, time:1000,func:()=>{
                                        this.ads.$remove(this.ads[i]);
                                    }})
                                }).catch((code) =>{
                                    this.$toast({text:code, time: 3000});
                                });
                                return;
                            }
                        }
                    }
                });
            },

            submit(){
                if(this.pselects.length <= 0){
                    return;
                }
                if(this.active){
                    this.active = false;
                    this.$loading.startup("正在发送");

                    if(this.sselects.length <= 0 && this.gselects.length <= 0){
                        let func = function(obj){
                            obj = {gid:obj.gid,sid:obj.sid};
                            return JSON.stringify(obj);
                        };
                        let sids = this.concat_separator(this.sselects,func);
                        let pids = this.concat_separator(this.pselects);
                        let gids = this.concat_separator(this.gselects);
                        let xids = this.concat_separator(this.xselects,func);
                        this.$router.go({name:'new-led-list',query:{sids:sids,pids:pids,xids:xids,gids:gids}});
                        this.$loading.close();
                        return;
                    }
                    adMessage.toufang({sids: this.sselects, pids:this.pselects,xids:this.xselects,gids:this.gselects}).then(oid=>{
                        this.active = true;
                        this.$loading.close();
                        this.$router.replace({'name':'toufang-intro',params:{id:oid}});
                    })

                }else{
                    return;
                }
            },

            infoPreview(id){
                var l = this.ads.length;
                for(var i=0;i<l;i++){
                    //文字广告
                    if(this.ads[i].id == id && this.ads[i].type == 'text'){
                        this.content = this.ads[i].content.value;
                        //动画方式
                        this.textStyleObject.animationName = textAnimationValue(this.ads[i].content.animationway);
                        //字体颜色
                        this.textStyleObject.color = textColorValue(this.ads[i].content.color);
                        //字体大小
                        (this.ads[i].content.fontSize == 0)? this.ads[i].content.fontSize = 24 : this.textStyleObject.fontSize = this.ads[i].content.fontSize + 'px';
                        //动画速度
                        this.textStyleObject.animationDuration =  (15 - this.ads[i].content.speed) + 's';
                        this.previewContent.timeContent = false;
                        this.previewContent.imgContent = false;
                        this.previewContent.textContent = true;
                    }
                    //时间广告预览
                    if(this.ads[i].id == id && this.ads[i].type == 'time')
                    {
                        //时间格式
                        this.timeFormat = this.ads[i].content.format;
                        //字体颜色
                        this.timeStyleObject.color = textColorValue(this.ads[i].content.color);
                        //字体大小
                        (this.ads[i].content.fontSize == 0)? this.ads[i].content.fontSize = 24 :  this.timeStyleObject.fontSize = this.ads[i].content.fontSize + 'px';
                        this.previewContent.textContent = false;
                        this.previewContent.imgContent = false;
                        this.previewContent.timeContent = true;
                    }
                    //图片广告预览
                    if(this.ads[i].id == id && this.ads[i].type == 'image')
                    {
                        this.imageStyleObject.animationName = textAnimationValue(this.ads[i].content.animationway);
                        this.imageStyleObject.animationDuration = '5s';
                        this.imageStyleObject.imgPath = this.ads[i].content.value;
                        this.previewContent.textContent = false;
                        this.previewContent.timeContent = false;
                        this.previewContent.imgContent = true;
                    }
                }
                this.previewShow = true;
            },
        },

        computed:{
            button_content(){
                let len = this.ads.length;
                this.pselects = [];
                for(let i = 0; i < len; i++){
                    let item = this.ads[i];
                    if(item.select){
                        this.pselects.push(item.id);
                        //选中不允许滑动
                        this.ads[i].disab = true;
                    }else{
                        this.ads[i].disab = false;
                    }
                }
                let ret = '';
                if(this.pselects.length > 0 ){
                    ret = this.pselects.length;
                    this.active = true;
                }else{
                    this.active = false;
                }
                return ret;
            },
            allSelect(){
                let length = this.ads.length;
                for(let i=0; i < length; i++){
                    if(!this.ads[i].select) return false;
                }
                return true;
            },
            led_count(){
                return this.ads.length;
            },
            maxnum(){
                if(this.ads.length == 0 ) return 1;
                let nth = 1;
                for(let i = 0; i < this.ads.length; i ++){
                    if(nth === 1){
                        nth = this.ads[i];
                    }else{
                        if(nth.ctime <= this.ads[i].ctime){
                            nth  = this.ads[i];
                        }
                    }
                }
                if(nth.no >= 95){
                    return 1;
                }else{
                    return nth.no+1
                }
            }
        },
    }
</script>