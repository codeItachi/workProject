<template>
    <div class="program-image">
        <app-header>
            <span slot="center" class="text img">图片</span>
        </app-header>
        <led-view :localimgs.sync="localimgs"  :devicewidth="device_width" :deviceheight = "device_height" :bordercolor="bordercolor"></led-view>
        <program-id :value.sync="no"></program-id>
        <add-led :local_image.sync="localimgs" :server_image.sync="server_images"></add-led>
        <tab-text>
                <drop-range :drop-down-date="remaintime" slot="remaintime" :select-value.sync="remaintime.selectValue"></drop-range>
                <drop-down :drop-down-date="animationway" slot="animationway"></drop-down>
                <drop-down :drop-down-date="bordercolor" slot="border"></drop-down>
        </tab-text>

        <put-sub>
                <div slot="submit" v-gesture:tap.stop.prevent="save()">保存</div>
                <div slot="preview" @click="preview()">预览</div>
        </put-sub>

        <modal-preview :localimgs.sync="localimgs"  :modalstyle="styleStatus" :devicewidth="device_width" :deviceheight = "device_height" :animationway="animationway" :remaintime="remaintime" :bordercolor="bordercolor"></modal-preview>
    </div>
    
</template>
<script lang="babel">
    import Vue from 'vue';
    import vueGesture from 'vue-gesture';
    Vue.use(vueGesture);
    import appHeader from '../../components/app-header';
    import putSub from '../../components/adTest/put-sub';
    import formLeft from './form-left';
    import ledView from './led-view';
    import programId from './program-id';
    import addLed from './add-led';
    import tabText from './tab-text';
    import inputDiv from './input.vue';
    import programMessage from '../../message/program';
    import led from '../../message/led';
    import dropDown from '../../components/drop-list.vue';
    import dropRange from '../../components/drop-range.vue';
    import modalPreview from './modal-preview';
    import {program_type} from '../../global_const';
    import {regexp} from '../../global_const.js';
    import {remaintimeList} from './common.js';
    import {remaintimeFlagValue} from './common.js';
    import {animationwayList} from './common.js';
    import {animationWayFlagValue} from './common.js';
    import {borderList} from './common.js';
    import {borderFlagValue} from './common.js';

    const size_userdefine = 'autodefault';

    export default {
        components:{
            dropRange,appHeader,formLeft,putSub,ledView,programId,addLed,tabText,inputDiv,dropDown,modalPreview
        },
        ready(){
            this.$on('modal-statu',function(state){
                this.animatStatu.show = state;
            });
        },
        
        data(){
            return {
                flag:true,//开关状态
                id:0,
                no:'',
                localimgs:null,
                server_images:null,
                styleStatus:{
                    'show': false,
                },
                device_width:'',
                device_height:'',
                select: size_userdefine,
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
            data({to:{query}}){
                this.$loading.show();
                this.id = query.id || 0;
                if(this.id <= 0){
                    this.no = parseInt(query.maxnum) || 1;
                    this.$loading.close();
                }else{
                    this.id > 0 && programMessage.get_info(this.id).then(info=>{
                        this.server_images = info.content.server;
                        this.localimgs = info.content.value;
                        this.no = info.no;
                        this.animationway.selectValue = animationWayFlagValue(info.content.animationway);
                        this.remaintime.start = info.content.remaintime;
                    this.$loading.close();
                    }).catch((code)=>{
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
                if(!this.localimgs){
                    this.$toast({'text':'请添加图片'});
                    console.log('localimgs:');
                    console.log(this.localimgs);
                    return;
                }
                if(this.flag){
                    this.flag = false;
                    let server ="";
                    if(this.server_images instanceof Object){
                        server = this.server_images[0].sid;
                    }else{
                        server = this.server_images;
                    }
                    let value = {server:server, local:this.localimgs};
                    let content = {
                        type: program_type.image,
                        remaintime:this.remaintime.selectValue,
//                    bordercolor:this.bordercolor.list[this.bordercolor.selectValue].value,
                        animationway:this.animationway.list[this.animationway.selectValue].value,
                        value:value,
                    };
                    let program = {
                        id: this.id,
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
                if(this.animationway.selectValue == null) 
                   return this.$toast({'text':'请输入动画方式'});
                this.styleStatus.show = true;
            }
        },
        computed:{
            disable(){
                return this.select == size_userdefine;
            }
        },
    }
</script>
<style lang="scss">
    @import "./layout.scss";
    .active {
        color:#999;
        input{
            background: #e5e5e5;
        }
    }
    .text.img{
        font-size:18px;
        padding-left:24px;
        background-image:url(../../../static/adlist-i.png);
        background-repeat:no-repeat;
        background-size:50px;
        background-position:-30px -280px;
    }
</style>