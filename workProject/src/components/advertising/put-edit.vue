<template>
    <div class="put-edit" :class="{'up':styleStates}">
        <div class="module-tit" v-gesture:tap.stop.prevent="showContent">
            <h2>编辑信息</h2>
            <a class="" >{{styleStates | textState "展开" "收起" }}</a>
        </div>

        <div class="put-edit-con">
            <div class="led">
                <span :style="{color: current.text.color}">{{current.text.value}}</span>
                <!-- <span>{{current.time.time}}</span> -->
            </div>

            <div class=edit-tab>
                <ul class="tab-tit">
                    <li v-for="item in tabs"
                        class="tabHeadText"
                        :class="{'active': $index == tabIndex}"
                        v-gesture:tap.stop.prevent="active_item($index)">
                        <a>{{item.headName}}</a>
                    </li>
                </ul>
                <div class="tab-con">
                    <!--文字编辑[[-->
                    <div class="tab-list text-edit" :class="{'show': tabShow == 'tab-text'}">
                        <tab-text :current="current" :text-color="textColorShow.select"></tab-text>
                    </div>
                    <!--文字编辑]]-->

                    <!--时间编辑[[-->
                    <div class="tab-list time-edit" :class="{'show': tabShow == 'tab-time'}">
                        <tab-time :time="current.time.time" :formats="current.time.formats" :format.sync="current.time.format"></tab-time>
                    </div>
                    <!--时间编辑]]-->
                </div>
            </div>
        </div>
    </div>
    <text-animat :animatstyle="animationShow" :current="current"></text-animat>
    <text-color  :textcolorstyle="textColorShow" :current="current"></text-color>
</template>

<script>
    import Vue from 'vue'
    import vueGesture from 'vue-gesture';
    Vue.use(vueGesture);
    import tabTime from './tabs/tab-time' //文字颜色选项卡
    import tabText from './tabs/tab-text' //文字颜色选项卡

    import textAnimat from './modal/text-animat' //文字动画编辑模态
    import textColor from './modal/text-color' //文字颜色编辑模态

    Vue.filter("textState",function(styleStates,trueValue,falseValue){
        if(styleStates)return trueValue;
        return falseValue;
    })

    export default {
        components:{
            tabTime,
            tabText,

            textAnimat,
            textColor,
        },

        data(){
            return {
                //收起展开默认状态
                styleStates:false,

                //选项卡
                tabs :[
                    {headName: "文字", tabHead: 'tabHeadText', tabList: 'text-edit', bodyIndex: 'tab-text'},
                    {headName: "时间", tabHead: 'tabHeadTime', tabList: 'time-edit', bodyIndex: 'tab-time'}
                ],
                tabIndex :0,


                //文字动画编辑模态
                animationShow:{
                    'modal': true,
                    'show': false,
                },
                //文字颜色编辑模态
                textColorShow:{
                    'modal': true,
                    'show': false,
                    colors: ['#fff000','#4eff00','#ff0000'],
                    select:'',
                },
            }
        },

        //选项卡
        computed:{
            tabShow(){
                var ret =this.tabs[this.tabIndex].bodyIndex;
                return ret;
            }
        },

        //接收子容器传入状态
        ready(){
            this.$on('modal-statu',function(state){
                this.animationShow.show = state;
            });

            this.$on('color-text1',function(state){
                this.textColorShow.show = state;
            });

            console.log(typeof this.current.text.animation.way);

        },

        methods:{
            //选项卡
            active_item(nth){
                this.tabIndex = nth;
            },

            showContent(){
                this.styleStates = !(this.styleStates);
            }
        },
        props:{
            current:{
                required:true,
                type:Object,
            }
        }
    }
</script>
