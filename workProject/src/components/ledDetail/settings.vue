<template>
    <div class="item">
        <label>屏幕开启</label>
        <div>
            <label class="swtichbtn"><input type="checkbox" v-model="setting.led_status"/><i></i></label>
        </div>
    </div>
    <!--
    <div class="d2 item">
        <label>定时开关机</label>
        <div>
            <label class="swtichbtn"><input type="checkbox" v-model="timer_boot.status"/><i></i></label>
        </div>
    </div>
    <div class="time" :class="{'show': timer_boot.status}">
        <div class="input-item">
            <label>开机时间</label>
            <div>
                <span>{{timer_boot.open}}</span>
            </div>
        </div>
        <div class="input-item">
            <label>关机时间</label>
            <div>
                <span>{{timer_boot.close}}</span>
            </div>
        </div>
    </div>
    -->

    <div class="item timing">
        <label>校时</label>
        <div v-gesture:tap.stop.prevent="timing">
            <label class="swtichbtn"><a class="i-turn" ></a></label>
            <!-- <label class="swtichbtn"><input type="checkbox" v-model="led_timing" /><i></i></label> -->

        </div>
    </div>

    <div class="item clear">
        <label>清除全部广告</label>
        <div v-gesture:tap.stop.prevent="clear_program">
            <label class="swtichbtn"><a class="i-turn" ></a></label>

        </div>
    </div>
    <div class="item bright">
        <label>屏体亮度</label>
        <div v-gesture:tap.stop.prevent="bright">
            <label class="swtichbtn"><a class="i-turn" ></a></label>
        </div>


    </div>
</template>

<script lang="babel">
    import Vue from 'vue';
    import switcher from '../switch.vue';
    import modal from '../modal.vue';
    import submitTip from '../toast/submit-tip.vue';
    import ledMessage from '../../message/led';
    export default {
        components:{
            submitTip,modal
        },

        created(){
        },
        ready(){
            this.screen_bright.start = this.setting.screen_bright || 14;
            this.$watch('setting.led_status',function(value){
                ledMessage.setting_screen_open(this.setting.device,  value ? 1 : 0).then(() =>{
                }).catch(()=>{
                    this.$toast({text:'设置失败',time:3000});
                });
            });

        },
        route:{

        },
        data:function(){
            return {
                led_timing:false,
                timer_boot:{
                    status:1,
                    open:'xxx-xx-xx',
                    close:'xxx-gg--xx'
                },
                screen_bright:{
                    //下拉数据
                    placeholder: 0,
                    step:null,
                    start:14,
                    min:1,
                    max:15,
                    selectValue: 14,
                    position: "top", //bot从下弹出
                    title: "屏体亮度",
                    styleName:'screen_bright',
                },
            }
        },

        methods:{
            clear_program(){
                this.$modalcb({
                    title:'清除全部广告',
                    content:'屏内有广告正在播放，确定要全部清除吗？',
                    cancelTitle:"取消",
                    submitCall:()=>{
                        ledMessage.clear_screen(this.setting.device).then(s=>{
                            this.$toast({text:'提交指令成功'});
                        }).catch(code=>{
                            this.$toast({text:code});
                        });
                    }});
            },
            bright(){
                let self = this;
                this.$modalcb({
                    title:'屏体亮度',
                    content: Vue.extend({
                        template:'<range :option="option" :value.sync="value"></range>',
                        data(){
                            return {
                                option:self.screen_bright,
                                value:self.screen_bright.selectValue
                            }
                        },
                        components:{
                            range: require('../range/index.vue')
                        }
                    }),
                    cancelTitle:"取消",
                    submitCall:(range)=>{
                        this.screen_bright.start = range.value
                        ledMessage.save_bright({
                            device:this.setting.device,
                            value:range.value,
                        }).then(s=>{
                            this.$toast({text:'提交指令成功'})
                        }).catch(code=>{
                            this.$toast({text:code});
                        });
                    }});
            },
            //校时
            timing(){
                ledMessage.setting_auto_proof(this.setting.device).then(()=>{
                    this.$toast({text:'已提交'});
                }).catch(()=>{
                    this.$toast({text:'提交失败'});
                });
            },
        },
        computed:{
            screen_open:{
                set(val){
                    console.log("screen_open:" + val);
                }
            }
        },

        props:{
            setting:{
                required:true,
                type:Object
            }
        }
    }
</script>
<style lang="scss">

</style>