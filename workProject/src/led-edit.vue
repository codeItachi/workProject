<template>
    <!--头部[[-->
    <div>
        <app-header>
            <span slot="center">编辑资料</span>
            <span slot="right" class="right" v-gesture:tap.stop.prevent="save_and_back">保存</span>
        </app-header>
        <!--头部]]-->

        <div class="ad-edit-con">
            <!--资料编辑[[-->
            <div class="adEdit-con">
                <div class="input-item">
                    <label>设备名称：</label>
                    <div>
                        <input type="text" name="title" v-model="title" placeholder="请输入标题">
                    </div>
                </div>
                <!--<div class="input-item sm">-->
                    <!--<label>地址：</label>-->
                    <!--<div>-->
                        <!--<span class="address" v-gesture:tap.stop.prevent="change_address">{{address | isset_value_set}}</span>-->
                        <!--&lt;!&ndash;<input type="text" name="title" v-model="address" placeholder="请输入地址">&ndash;&gt;-->
                    <!--</div>-->
                <!--</div>-->


                <!--<div class="input-item sm imgs">-->
                    <!--<label>图片：</label>-->
                    <!--<div>-->
                        <!--<span v-if="show_add" v-gesture:tap.stop.prevent="ledimg_add"><a class="add"></a></span>-->
                        <!--<span v-for="ledimg in ledimgs" v-gesture:tap.stop.prevent="ledimg_del(ledimg)"><img-->
                                <!--:src="ledimg"/></span>-->
                    <!--</div>-->
                <!--</div>-->

                <div class="info">
                    <textarea rows=3 v-model="content" placeholder="请输入LED屏幕简介"></textarea>
                </div>
                <div class="input-item unit-point">
                    <label class="screen-width">屏体宽度：</label>
                    <div>
                        <input type="number" name="" placeholder="请输入屏体宽度" v-model="screen_width">
                    </div>
                </div>

                <div class="input-item unit-point">
                    <label class="screen-height">屏体高度：</label>
                    <div>
                        <input type="number" name="" placeholder="请输入屏体高度" v-model="screen_height">
                    </div>
                </div>
            </div>
            <!--资料编辑]]-->

            <!--更多参数[[-->
            <div class="hide-parameter" :class="{'show': parameter_show}">
                <drop-down name="color-value" :drop-down-date="color_value"></drop-down>
                <drop-down name="polar-data" :drop-down-date="polar_data" ></drop-down>
                <drop-down name="polar-oe" :drop-down-date="polar_oe" ></drop-down>
                <drop-down name="scan-type" :drop-down-date="scan_type" ></drop-down>
            </div>
            <!--更多参数]]-->
        </div>
        <!--更多参数]]-->

        <!-- <a class="more-parameter" v-gesture:tap.stop.prevent="do_parameter_show()">更多参数</a> -->
    </div>
</template>

<script lang="babel">
    import Vue from 'vue';
    import VueGesture from 'vue-gesture';
    import ledSize from './components/ledEdit/led-size';
    import busAdEdit from './bus-ad-edit';
    import toast from './components/toast/toast.vue';
    import appHeader from './components/app-header.vue';
    import submitTip from './components/toast/submit-tip.vue';
    import dropDown from './components/drop-down.vue';
    import socket from './socket';
    import led from './message/led';
    import weixin from './weixin';
    import {regexp, validfunc} from './global_const';
    import {scanTypeList,scantypeFlagValue} from './view/program-image/common.js';
    import {dataPolarList,dataPolarFlagValue} from './view/program-image/common.js';
    import {typeColorList,typeColorFlagValue} from './view/program-image/common.js';
    Vue.use(VueGesture);

    export default {
        components: {
            ledSize, toast, appHeader, dropDown, submitTip
        },

        route: {
            data(tran){
                this.id = tran.to.params.id;
            }
        },

        ready(){
            socket.ready = ()=> {
                this.$loading.show();
                led.get_edit(this.id).then((data) => {
                    this.title = data.title;
                    this.address = data.address;
                    this.content = data.content;
                    this.screen_width = data.screen_width;
                    this.screen_height = data.screen_height;
                    this.color_value.selectValue = typeColorFlagValue(data.color_value);
                    this.scan_type.selectValue = scantypeFlagValue(data.scan_type );
                    this.polar_data.selectValue = dataPolarFlagValue(data.polar_data);
                    this.polar_oe.selectValue = dataPolarFlagValue(data.polar_oe );
                    this.ledimgs = data.images;
                    this.$loading.close();
            }).catch((code) => {
                    if(code == '未登录账号'){
                        this.$router.go({path:'/login'});
                    }
                    this.$toast({text: code});
                });
            }
        },
        data(){
            return {
                ref: this,
                id: 0,
                //下拉 扫描方式
                scan_type: {
                    list:scanTypeList,
                    placeholder: "",
                    selectValue: 0,
                    position: "top", //bot从下弹出
                    title: "扫描方式：",
                    styleName:'scan_type',
                },
                ledimgs: [],
                ledimgs_server: [],
                parameter_show: true,
                title: '',
                address: '',
                content: '',
                led_width: '',
                led_height: '',
                screen_width: '',
                screen_height: '',
                color_value: {
                    list:typeColorList,
                    placeholder: "",
                    selectValue: 0,
                    position: "top", //bot从下弹出
                    title: "基 色：",
                    styleName:'color_value',
                },
                polar_data:{
                    list:dataPolarList,
                    placeholder: "",
                    selectValue: 0,
                    position: "top", //bot从下弹出
                    title: "数据极性：",
                    styleName:'polar_data',
                },
                polar_oe:{
                    list:dataPolarList,
                    placeholder: "",
                    selectValue: 0,
                    position: "top", //bot从下弹出
                    title: "O E极性：",
                    styleName:'polar_oe',
                }
            }
        },

        methods: {
            //更多参数
            do_parameter_show(){
                this.parameter_show = !(this.parameter_show);
            },
            save_data(){
                led.save_edit({
                    id: this.id,
                    title: this.title,
                    address: this.address,
                    content: this.content,
                    screen_height: this.screen_height,
                    screen_width: this.screen_width,
                    color_value: this.color_value.list[this.color_value.selectValue].value,
                    image: this.ledimgs,
                    scan_type:this.scan_type.list[this.scan_type.selectValue].value,
                    polar_data:this.polar_data.list[this.polar_data.selectValue].value,
                    polar_oe:this.polar_oe.list[this.polar_oe.selectValue].value,
                }).catch((code)=> {
                    this.$toast({text: code, time: 2000});
                });
            },
            save_and_back(){
                if(! regexp.number.test(this.screen_width)){
                    this.$toast({text:'请输入正确屏宽度'});
                    return;
                }else{
                    let err = true;
                    if ((err = validfunc.ledsize(this.screen_width,"屏宽度")) !== true) {
                        this.$toast({text: err});
                        return;
                    }
                }
                if(! regexp.number.test(this.screen_height)){
                    this.$toast({text:'请输入正确屏高度'});
                    return;
                }else{
                    let err = true;
                    if ((err = validfunc.ledsize(this.screen_height,"屏高度")) !== true) {
                        this.$toast({text: err});
                        return;
                    }
                }
               this.save_data();
               this.$toast({text: '保存成功', time: 1500, func: ()=> {
                        history.back();
                    }
               });
            },
            // 添加图片
            ledimg_add(){
                weixin.exe(()=> {
                    weixin.chooseImage().then((imgs)=> {
                        imgs.forEach((img)=> {
                            this.ledimgs.push(img);
                        });
                        weixin.uploadImage(imgs, (ret)=> {
                            if ('upone' == ret.event) {
                                this.$toast({text: '上传成功一张'});
                            }
                            if ('upend' == ret.event) {
                                this.$toast({text: '全部上传成功', time: 1500});
                                this.ledimgs_server = ret.data;
                            }
                        });
                    });
                });
            },
            // 删除图片
            ledimg_del(img){
                this.ledimgs.$remove(img);
            },
        },
        computed: {
            show_add(){
                return this.ledimgs.length <= 0;
            },
            current_component(){
                return this;
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "./components/ledEdit/layout.scss";
    .input-item.unit-point{
        padding-left: 108px;
        >label{
            width: auto;
            left:10px;
            padding-left: 20px;
            background-image:url(../static/edit-icon.png);
            background-size: 16px;
            background-repeat: no-repeat;
        }
        .screen-width{
            background-position: 0px -37px;

        }
        .screen-height{
            background-position: 0px 9px;

        }
    }
</style>