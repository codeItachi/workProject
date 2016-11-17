
<template>
    <div class="main" :class="fixedPage">
        <app-header></app-header>
        <put-location></put-location>
        <put-edit :current="current"></put-edit>
        <put-sub>
            <submit-tip :component="current_component" slot="submit"
                        :work="submit_work"
                        :success="submit_success"
                        :fail="submit_fail"
                        :compile="submit_compile">提交</submit-tip>
            <span slot="preview" v-gesture:tap.stop.prevent="preview(current)">预览</span>
        </put-sub>
        <preview :effectstyle="effectShow" :current="current"></preview>
    </div>
</template>


<script lang="babel">
    import Vue from 'vue';
    import appHeader from './components/app-header' //我要投放 - 头部
    import putLocation from './components/advertising/put-location' //我要投放 - 地理位置
    import putEdit from './components/advertising/put-edit' //我要投放 - 编辑信息
    import putSub from './components/advertising/put-sub' //我要投放 - 底部
    import submitTip from './components/toast/submit-tip';
    import preview from './components/advertising/preview';
    import vueGesture from 'vue-gesture';
    Vue.use(vueGesture);
    import advertisement from './message/advertisement';

    export default {
        route:{
            data({to:{query}}){
                if(query.id > 0){
                    this.id = query.id;
                }
                if(query.pid > 0){
                    this.programid = query.pid;
                }
                if(query.sid > 0){
                    this.screenid = query.sid;
                }
                this.initVertising();
            }
        },


        ready(){
            //LED预览
            this.$on('effect-statu',function(state){
                this.effectShow.show = state;
            });
        },

        components: {
            appHeader,
            putLocation,
            putEdit,
            putSub,
            submitTip,
            preview,
        },

        data(){
            return {
                //LED预览
                effectShow:{
                    'show':false,
                },

                current:{
                    text:{
                        value:'texttext',
                        color:'255',
                        size: '16',
                        animation:{
                            speed:0,
                            loop:0,
                            counter: 0,
                            //way:0,
                            //下拉
                            way:{
                                //下拉数据
                                list:[
                                    '从右到左',
                                    '从左向右',
                                    '从上到下',
                                    '从下到上',
                                ],
                                placeholder: "请选择",
                                slectValue:null,
                                position:"bot", //bot从下弹出
                                title:"方向",
                            },
                            direction:false
                        }
                    },
                    time:{
                        format:      0,
                        formats:[
                            {title:"年月日/时分秒",style:"YYYY/MM/dd H:m:s"},
                            {title:"月日/时分秒",style:"MM/dd H:m:s"},
                            {title:"月日/时分",style:"MM/dd H:m"},
                            {title:"时分秒",style:"H:m:s"},
                        ],
                        time: 'now',
                    }
                },
                id: 0,
                programid:0,
                programs:[],
                screenid:0,
                screen:{},
                submit_work:{
                    tip:{
                        show:true,
                        time:3000,
                        text:'正在提交中...'
                    },
                    func(){
                        console.log('submit_work');
                        var callback = (data)=>{
                            this.$broadcast('reply', data);
                        };
                        advertisement.preview(this.current).then((data) =>{
                            this.programid = data.id;
                        }).catch((code)=>{
                            this.$toast({text:code,time:1000});
                        });

                        advertisement.toufang(this.screenid, this.programid, callback);


                    }
                },
                submit_success:{
                    tip:{
                        show:true,
                        text:"提交成功",
                        time:1000,
                    },
                    func(){
                        console.log(this.$route.router.go({path:'/ad-list'}));
                    }
                },
                submit_fail:{
                    tip:{
                        show:true,
                        text:"提交失败",
                        time:1500,
                    },
                    func(data){
                        console.log(data);
                        console.log('submit_fail');
                    }
                }
            }
        },
        methods:{
            initVertising(){
            },
            submit_compile(result){
                if('success' == result.result){
                    return true;
                }else{
                    return false;
                }
            },
        },
        computed:{
            current_component(){return this;}
        }
    }
</script>
<style lang="scss">
    @import "./components/advertising/layout.scss";
</style>
