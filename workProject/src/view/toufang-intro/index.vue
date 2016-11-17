<template>
    <div class="result">
        <app-header>
            <span slot="left"></span>
            <span slot="center"></span>
        </app-header>
        <div class="toufang-result">
            <div class="result_content">
                <span class="title_medal"></span>
                <span class="title_icon"></span>
                <div>
                    <div class="content_screen">
                        <span></span>
                        <span>{{led_count}}</span>
                        <span></span>
                        <span></span>
                    </div>
                    <div class="content_ad">
                        <span></span>
                        <span></span>
                        <span>{{program_count}}</span>
                        <span></span>
                    </div>
                    <div class="content_success">
                        <span></span>
                        <span>{{success}}</span>
                        <span></span>
                        <span></span>
                    </div>
                    <div class="content_fail">
                        <span></span>
                        <span></span>
                        <span>{{led_count * program_count - success}}</span>
                        <span></span>
                    </div>
                </div>

            </div>
            <div class="bless">
                <div v-gesture:tap.stop.prevent="share">
                    <img src="../../../static/result/25.png">
                </div>

            </div>
            <div class="tip"></div>
        </div>
        <div class="add-creative">
            <ul>
                <li><a v-link="{name: 'new-ad-list'}">广告列表</a></li>
                <li><a v-link="{name: 'ad-history'}">历史记录</a></li>
                <li><a v-link="{name: 'new-led-list'}">我的LED屏</a></li>
            </ul>
        </div>
    </div>
</template>
<script>
    import Vue from 'vue';
    import vueGesture from 'vue-gesture';
    import appHeader from '../../components/app-header.vue';
    import socket from '../../socket';
    import adMessage from '../../message/advertisement.js';

    import weixin from '../../weixin';

    export default {
        components:{
            appHeader,
        },
        ready(){
            weixin.exe(()=>{
                weixin.hideMenuItems([weixin.menuPengyou,weixin.menuPengyouquan,weixin.menuWeibo,weixin.menuQQ]);
            });
            this.$loading.show();
            socket.ready= () =>{
                this.refresh_result();
             };
        },

        methods:{
            refresh_result(){
                clearTimeout(this.timer);
                adMessage.get_result(this.toufang_id).then((result)=>{
                    this.led_count = result.led_count;
                    this.program_count = result.program_count;
                    this.success = result.success;
                    this.fail = result.fail;
                    if(this.led_count * this.program_count > (this.success + this.fail)){
                        this.timer = setTimeout(()=>this.refresh_result(), 1500);
                    }
                    this.$loading.close();
                }).catch((code)=>{
                    this.$toast({text:code});
                });
            },
            share(){
                this.showStyle = true;
                let self = this;
                weixin.exe(()=>{
                    weixin.showMenuItems([weixin.menuPengyou,weixin.menuPengyouquan]);
                    weixin.sharepengyouqiang({
                        title:'乐在分享',
                        link: `http://app.popled.cn/#!/share/toufang?q_id=${self.toufang_id}&share_code=${self.share_code}`
                    });
                    weixin.sharepengyou({
                        title:'乐在分享',
                        desc:'加入我们，一起用微信玩转LED广告',
                        link: `http://app.popled.cn/#!/share/toufang?q_id=${self.toufang_id}&share_code=${self.share_code}`
                    });
                });
                this.$modalcb({
                    title:'LED传媒联盟',
                    content: Vue.extend({
                        template:'<share :q-id="q_id" :show-style="showStyle"></share>',
                        data(){
                            return {
                                q_id:self.toufang_id,
                            }
                        },
                        components:{
                            share: require('../../components/share/index.vue')
                        }
                    }),
//                    cancelTitle:"取消",
//                    submitCall:()=> {
//                        this.showStyle = false;
//                    }
                });
            }
        },

        destroyed(){
            clearTimeout(this.timer);
        },

        route:{
            data({to:{params}}){
                this.toufang_id = params.id;
            }
        },
        data(){
            return {
                toufang_id:0,
                led_count:0,
                program_count:0,
                success:0,
                fail:0,
                showStyle:false,
                share_code:'xxxx'
            };
        }
    }
</script>
<style lang="scss" scoped >
    @import './layout.scss';
</style>