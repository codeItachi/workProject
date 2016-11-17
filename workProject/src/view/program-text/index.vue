<template>
    <div class="program-text">
        <app-header>
            <span slot="center" class="text">文字</span>
        </app-header>
        <led-view :current="current" :font="font" :fontsize="fontsize" :color="color" :bordercolor="bordercolor"></led-view>
        <program-id :value.sync="no"></program-id>
        <edit-content :current="current"></edit-content>
        <form-kv>
            <drop-down :drop-down-date="font" ></drop-down>
        </form-kv>
        <form-kv>
            <drop-down :drop-down-date="fontsize" ></drop-down>
        </form-kv>
        <form-kv>
            <drop-range :drop-down-date="remaintime" :select-value.sync="remaintime.selectValue">
            </drop-range>
        </form-kv>
        <form-kv>
            <drop-down :drop-down-date="animationway"></drop-down>
        </form-kv>
        <form-kv>
            <drop-range :drop-down-date="speed" :select-value.sync="speed.selectValue">
            </drop-range>
        </form-kv>
        <form-kv>
            <drop-down :drop-down-date="color"></drop-down>
        </form-kv>
        <form-kv class="bordercolor">
            <drop-down :drop-down-date="bordercolor" ></drop-down>
        </form-kv>
        <put-sub>
            <div slot="submit" v-gesture:tap.stop.prevent="save()">保存</div>
            <div slot="preview" @click="preview()">预览</div>
        </put-sub>
        <modal-preview :current="current"  :modalstyle="styleStatus" :animationway="animationway" :font="font" :fontsize="fontsize" :color="color" :speed="speed" :remaintime="remaintime" :bordercolor="bordercolor"></modal-preview>

    </div>
</template>
<script lang="babel">
    import Vue from 'vue';
    import vueGesture from 'vue-gesture';
    Vue.use(vueGesture);
    import appHeader from '../../components/app-header';
    import putSub from '../../components/adTest/put-sub';
    import ledView from './led-view';
    import programId from '../program-image/program-id';
    import autoAdapt from '../program-time/auto-adapt.vue';
    import dropDown from '../../components/drop-list.vue';
    import dropRange from '../../components/drop-range.vue';
    import tabText from '../program-time/tab-text';
    import formKv from "../program-image/form-kv";
    import editContent from './edit-content';
    import programMessage from '../../message/program.js'
    import {program_type} from '../../global_const';
    import modalPreview from './modal-preview'
    import {regexp} from "../../global_const.js";
    import {colorList} from '../program-image/common.js';
    import {colorFlagValue} from '../program-image/common.js';
    import {fontsizeList} from '../program-image/common.js';
    import {fontsizeFlagValue} from '../program-image/common.js';
    import {fontList} from '../program-image/common.js';
    import {fontFlagValue} from '../program-image/common.js';
    import {animationwayList} from '../program-image/common.js';
    import {animationWayFlagValue} from '../program-image/common.js';
    import {speedList} from '../program-image/common.js';
    import {speedFlagValue} from '../program-image/common.js';
    import {remaintimeList} from '../program-image/common.js';
    import {remaintimeFlagValue} from '../program-image/common.js';
    import {borderList} from '../program-image/common.js';
    import {borderFlagValue} from '../program-image/common.js';
    import range from '../../components/range/index'
    export default {
        components:{
            dropRange,appHeader,putSub,ledView,programId,autoAdapt,dropDown,tabText,editContent,modalPreview,formKv,range
        },
        data(){
            return {
                flag:true,//开关状态
                id:0,
                current:{
                    value:'',
                },
                styleStatus:{
                    'show': false,
                },
                no:'',
                font:{
                    //下拉数据
                    tipText:true,
                    list:fontList,
                    placeholder: "黑体",
                    selectValue:0,
                    position:"top", //bot从下弹出
                    title:"字体",
                    styleName:'font',
                },
                fontsize:{
                    //下拉数据
                    tipText:true,
                    list:fontsizeList,
                    placeholder: "",
                    selectValue:1,
                    position:"top", //bot从下弹出
                    title:"字号",
                    styleName:'fontsize',
                },
                color:{
                    //下拉数据
                    tipText:true,
                    list:colorList,
                    placeholder: "",
                    selectValue:0,
                    position:"top", //bot从下弹出
                    title:"颜色",
                    styleName:"color",
                },
                remaintime:{
                    //下拉数据
                    tipText:false,
//                    list:remaintimeList,
                    placeholder: 0,
                    step:null,
                    start:3,
                    min:1,
                    max:60,
                    selectValue:3,
                    position:"top", //bot从下弹出
                    title:"停留时间",
                    styleName:"remaintime",
                },
                animationway:{
                    tipText:true,
                    list:animationwayList,
                    selectValue:0,
                    placeholder: '',
                    position:"top", //bot从下弹出
                    title:"动画方式",
                    styleName:"animationway",
                },
                speed:{
                    tipText:true,
//                    list:speedList,
//                    placeholder: '',
                    step:null,
                    start:10,
                    min:1,
                    max:14,
                    selectValue:10,
                    position:"top", //bot从下弹出
                    title:"移动速度",
                    styleName:"speed",
                },
                bordercolor:{
                    tipText:false,
                    list:borderList,
                    placeholder: "无",
                    selectValue:0,
                    position:"top", //bot从下弹出
                    title:"环绕边框",
                    styleName:"bordercolor",
                },
            }
        },

        route:{
            data({from, to:{query}}){
                this.$loading.show();
                this.id = query.id || 0;
                if(this.id <= 0){
                    this.no = parseInt(query.maxnum) || 1;
                    this.$loading.close();
                }else{
                    this.id > 0 && programMessage.get_info(this.id).then(info=>{
                    this.current.value = info.content.value;
                    this.no = info.no;
                    this.animationway.selectValue = animationWayFlagValue(info.content.animationway);
                    this.color.selectValue = colorFlagValue(info.content.color);
                    this.fontsize.selectValue = fontsizeFlagValue(info.content.fontSize);
                    this.font.selectValue = fontFlagValue(info.content.font);
//                    this.remaintime.selectValue = remaintimeFlagValue (info.content.remaintime);
                    this.remaintime.start = info.content.remaintime;
                    this.speed.start = info.content.speed;
                    // this.bordercolor.selectValue = borderFlagValue (info.content.bordercolor);
                        this.$loading.close();
                    }).catch(code=>{
                        this.$toast({text:code});
                    })
                }


            }
        },
        methods:{
            save(){
                if(! regexp.programid.test(this.no) || (parseInt(this.no) <= 0 || parseInt(this.no) > 95)){
                    this.$toast({'text':'请输入正确的节目号'});
                    return;
                }
                if(this.current.value.length <= 0){
                    return this.$toast({'text':'请输入投放文本'});
                }
                if(this.flag){
                    this.flag = false;
                    let content = {
                        type: program_type.text,
                        text: this.current.value,
                        fontSize:this.fontsize.list[this.fontsize.selectValue].value,
                        font:this.font.list[this.font.selectValue].key,
                        color:this.color.list[this.color.selectValue].value,
                        remaintime:this.remaintime.selectValue,
                        speed:this.speed.selectValue,
//                    bordercolor:this.bordercolor.list[this.bordercolor.selectValue].key,
                        animationway:this.animationway.list[this.animationway.selectValue].value,
                        value: this.current.value,
                    };
                    let program = {
                        id: this.id,
                        no: this.no,
                        content: content
                    };
                    programMessage.add_and_save(program).then(result=>{
                        this.$toast({text:"保存成功",time:1500,func:()=>{
                            this.flag = true;
                            history.back();
                    }});
                    }).catch(code=>{
                        this.$toast({text:code});
                    });
                }

            },
            preview(){
                if(this.current.value == '')
                    return this.$toast({'text':'请输入投放文本'});
                this.styleStatus.show = true;
            }
        },
        computed:{
        }
    }
</script>
<style lang="scss">
    @import "../program-image/layout.scss";
    .form-left {
        margin-top: 24px;
        .content {
            >label.date{
                display: inline-block;
                margin-right: 22px;
                padding-left: 22px;
            }
        }
    }
    .program-text{
        .input-group.bordercolor{
            margin-bottom: 52px;
            background-color: #f1f1f1;
        }
    }
    .text{
        padding-left:24px;
        background-image:url(../../../static/adlist-i.png);
        background-repeat:no-repeat;
        background-size:50px;
        font-size:18px;
        background-position:-30px -193px;
    }
</style>