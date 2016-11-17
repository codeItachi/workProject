<template>

    <div class="share">
        <div class="handle"></div>
        <p class='title'>用微信发广告So easy！</p>
        <p class="time"><span>{{time | fdatetime 'YYYY-M-d HH:mm' }}</span>&nbsp;&nbsp;<span >LED传媒联盟</span></p>
        <p class="ad">微信也可以管理LED屏，我用微信打广告</p>
        <div class="use">
            <div class="use_title">
                <span></span>
            </div>
            <div class="use_screen">
                {{adItem}}
            </div>
        </div>
        <div class="code">
            <div class="code_title">
               <p>加入我们，一起用微信玩转LED广告</p>
                <img :src="erweima"></img>
                <p>长按扫描加入LED传媒联盟</p>
            </div>
        </div>
        <div class="horn">

        </div>
        <div class="tip">
            没错！我就是我 微信LED不一样的烟火！
        </div>
    </div>
</template>
<style lang="scss" >
 @import './layout.scss';
</style>
<script>
    import Vue from 'vue';
    import vueGesture from 'vue-gesture';
    import adMsg from '../../message/advertisement';
    export default{
        data(){
            return {
                id:null,
                erweima:"../../../static/result/27.jpg",
                shareAds:[
                ],
                sharecode:''
            }
        },
        props:{
            qId:{},
            showStyle:{}
        },
        route:{
            data({to:{query}}){
                this.id = query.q_id;
            }
        },
        ready(){
            let le = document.querySelector('.share').parentNode;
            let con = le.parentNode;
            con.className += " share_content";
            le.setAttribute('class','balloon-body close') ;
            this.id = this.id || this.qId;
            adMsg.share_result(this.id, this.sharecode).then(result=>{
                    this.shareAds = result;
            }).catch(code=>{
                console.log(code);
            });
        },
        components: {},
        methods: {
        },
        computed: {
            adItem(){
                var len = this.shareAds.length;
                for(var i=0; i<len;i++){
                    if(this.shareAds[0].content.type == 'text'){
                        return this.shareAds[0].content.value;
                    }else if(this.shareAds[0].content.type == 'image' || this.shareAds[0].content.type == 'time'){
                        return "用微信发广告So easy！";
                    }
                }
            }
        }
    }
</script>