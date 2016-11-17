<template>
    <div class="program-time">
        <app-header>
            <span slot="center" class="time">时间</span>
        </app-header>
        <led-view :current="current" :selectauto.sync="current.selectauto" :time="current.time.time"  :format.sync="current.time.format"  :fontsize="fontsize" :color="color" :bordercolor="bordercolor"></led-view>
        <program-id :value.sync="no"></program-id>
        <form-left title="尺寸" class="screensize">
            <label slot="title">模板选择</label>
            <label class="radioicon"  v-for="item in current.time.formats" ><input type="radio" :value="item.style"  name="adstatus" v-model="current.time.format"><i></i>{{item.title}}</label>
            
        </form-left>
        <!-- <form-left title="尺寸">
            <label for="" slot="title">自定义模块</label>
            <label class="radioicon date"  v-for="item in dates" ><input type="checkbox" name="adstatus"  v-model="item.status"><i></i>{{item.tag}}</label>

        </form-left> -->
        <!--<auto-adapt :selectauto.sync="current.selectauto">-->
            <!---->
        <!--</auto-adapt>-->
        <tab-text slot="tab" >
            <drop-down :drop-down-date="fontsize" slot="fontsize"></drop-down>
            <drop-down :drop-down-date="color" slot="color"></drop-down>
            <drop-down :drop-down-date="bordercolor" slot="border"></drop-down>
        </tab-text>
        <put-sub>
            <div slot="submit" v-gesture:tap.stop.prevent="save()">保存</div>
            <div slot="preview" @click="preview()">预览</div>
        </put-sub>
        <modal-preview :current="current" :modalstyle="styleStatus"  :time="current.time.time" :formats="current.time.formats" :format.sync="current.time.format"  :fontsize="fontsize" :color="color"  :bordercolor="bordercolor"></modal-preview>

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
    import formLeft from '../program-image/form-left';
    import autoAdapt from './auto-adapt.vue';
    import dropDown from '../../components/drop-list.vue';
    import tabText from './tab-text';
    import programMessage from '../../message/program.js';
    import modalPreview from './modal-preview'
    import {program_type} from '../../global_const';
    import {regexp} from "../../global_const.js";
    import {colorList} from '../program-image/common.js';
    import {colorFlagValue} from '../program-image/common.js';
    import {fontsizeList} from '../program-image/common.js';
    import {fontsizeFlagValue} from '../program-image/common.js';
    import {fontList} from '../program-image/common.js';
    import {fontFlagValue} from '../program-image/common.js';
    import {borderList} from '../program-image/common.js';
    import {borderFlagValue} from '../program-image/common.js';

    export default {
        components:{
            appHeader,putSub,ledView,programId,formLeft,autoAdapt,dropDown,tabText,modalPreview
        },
        watch:{
        },
        data(){
            return {
                flag:true,//开关状态
                id:0,
                current:{
                    time:{
                        format:0,
                        formats:[
                            {title:"年月日/时分秒",style:"YYYY.MM.dd H:m:s"},
                            {title:"年月日",style:"YYYY.MM.dd",},
                            {title:"时分秒",style:"H:m:s"},
                        ],
                        time: 'now',
                    },
                    selectauto:false,
                },
                model_select:true,
                styleStatus:{
                    'show': false,
                },
                no:'',
                dates:[{tag:'年',status:false},{tag:'月',status:false},{tag:'日',status:false},{tag:'星期',status:false},{tag:'时',status:false},{tag:'分',status:false},{tag:'秒',status:false}],
               
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
                bordercolor:{
                    tipText:false,
                    list:borderList,
                    placeholder: "",
                    selectValue:0,
                    position:"top", //bot从下弹出
                    title:"环绕边框",
                    styleName:"bordercolor",
                },
            }
        },
        route:{
            data({to:{query}}){
                this.$loading.show();
                this.id = query.id || 0;
                if(this.id <= 0){
                    this.no = parseInt(query.maxnum) || 1;
                    this.current.time.format = "YYYY.MM.dd H:m:s";
                    this.$loading.close();
                }else{
                    this.id && programMessage.get_info(this.id).then(info=>{
                        this.no = info.no;
                        this.color.selectValue = colorFlagValue(info.content.color);
                        this.fontsize.selectValue = fontsizeFlagValue(info.content.fontSize);
                        this.current.time.format = info.content.format;
                        // this.bordercolor.selectValue = borderFlagValue(info.content.bordercolor);
                        this.current.selectauto = info.content.selectauto;
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
                if(this.flag){
                    this.flag = false;

                    let content = {
                        type:program_type.time,
                        format: this.current.time.format,
                        fontSize:this.fontsize.list[this.fontsize.selectValue].value,
                        color:this.color.list[this.color.selectValue].value,
                        bordercolor:this.bordercolor.list[this.bordercolor.selectValue].key,
                        selectauto:this.current.selectauto,
                    };
                    let program = {
                        id:this.id,
                        no: this.no,
                        content:content,
                    };
                    programMessage.add_and_save(program).then((result)=>{
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
               if(this.current.time.format == ''){
                    this.$toast({'text':'无模板'});
                    return
                }
                this.styleStatus.show = true;
            },
        },
        computed:{
        }
    }
</script>
<style lang="scss" >
    @import "../program-image/layout.scss";
    .form-left.screensize {
        margin-top: 24px;
        .content {
            >label.date{
                display: inline-block;
                margin-right: 22px;
                padding-left: 22px;
            }
        }
    }
    .time{
        display: inline-block;
        vertical-align: top;
        font-size:18px;
        padding-left:24px;
        background-image:url(../../../static/adlist-i.png);
        background-repeat:no-repeat;
        background-size:50px;
        background-position:-30px -237px;
    }
    
    
</style>