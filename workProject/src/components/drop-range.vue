<template>
    <div class="input-item drop-list">
        <label class="{{dropDownDate.styleName}}">{{dropDownDate.title}}</label>
        <div>
            <a :class="{'prompt': currentList === false}" class="i-turn-b" @click="selectBox()">{{dropDownDate.selectValue}}</a>

            <div  class="slide-list" :class="{'show':styleStatus}" v-gesture:tap.stop.prevent="shutDownMeng">
                <div :class="{'show':styleStatus}" class="special">
                    <div class="head" >
                        <span>{{dropDownDate.title}}</span>
                        <a class="cancel" v-gesture:tap.stop.prevent="cancel"></a>
                    </div>
                    <div class="list" v-gesture:tap.stop.prevent="stopEvent">
                        <range :option="dropDownDate"  :value.sync="dropDownDate.selectValue"></range>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import vueGesture from 'vue-gesture';
    Vue.use(vueGesture);
    import range from  './range/index.vue';


    export default {
        components:{
            range,
        },
        ready(){
        },
        watch:{
        },
        data(){
            return{
                isHideBox:true,
                styleStatus:false,
                selected:null,
            }
        },
        props:{
            dropDownDate:{
                required:true,
                type:Object,
            },
            selectValue:{
                required:true,
            },
            name:{
                type:String
            }

        },
        methods:{
            cancel(){
                this.styleStatus = false;
                if(!this.dropDownDate.tipText){
                    this.$toast({text:'该效果不支持预览',time:2000})
                }
            },
            selectBox(){
                this.styleStatus = true;
                this.isHideBox = !(this.isHideBox);
            },
            shutDownMeng(){
                this.styleStatus = !(this.styleStatus);
            },
            stopEvent(event){
                event.stopPropagation();
            }
        },
    }
</script>
<style lang="scss" scoped>
    .slide-list{
        .special{
            .list{
                padding: 10px 60px;
                padding-top: 0px;
            }
        }
    }
    .input-item.drop-list{
        >label{
            padding-left: 20px;
            background-image:url(../../static/edit-i.png);
            background-size: 50px;
            background-repeat: no-repeat;
        }
        >.remaintime{
            background-position: 0px -183px;
        }
        >.speed{
            background-position: 0px -229px;
        }
    }
    .input-item.drop-list
    {
        .slide-list
        {
            position:fixed;
            width:100%;
            height:0%;
            bottom:0;
            left:0;
            z-index: 1;
            overflow:hidden;
            /*transition: height 0.3s ease-in;*/
            background-color:rgba(0,0,0,0.1);

            >div
            {
                position: absolute;
                left:0;
                bottom:0;
                width:100%;
                height:0;
                overflow:hidden;
                transition: height 0.3s ease-in;
                background-color:#fff;
            }

            &.show
            {
                height: 100%;
                z-index:9999;
                >div
                {
                    height:195px;
                }

                .head{
                    height: 40px;
                    color: #fff;
                    text-align: center;
                    span{
                        position: absolute;
                        left:33px;
                        top:0;
                        color: #555;
                    }
                    >a
                    {
                        width: 100%;
                        display:block;
                        height:38px;
                        line-height:38px;
                        margin: 0 auto;
                        background-image: url(../../static/animation-i.png);
                        background-repeat:no-repeat;
                        background-size: 35px;
                        background-position:center  -555px;
                        animation-name: shanshuo;
                        animation-duration: 2s;
                        animation-iteration-count: infinite;
                        animation-timing-function:ease;
                    }

                }
                @keyframes shanshuo {
                    0%{
                        transform: translateY(0px);
                    }
                    50%{
                        transform: translateY(10px);
                    }
                    100%{
                        transform: translateY(0px);
                    }
                }
            }
        }
        .list{
            li{
                span{
                    padding: 5px 30px;
                }
            }
        }
        .list
        {
            height:155px;
            overflow-y:auto;

            ul
            {
                height:auto;
                padding:1px 0 0 0;
                position:static;
                box-shadow:none;
                border-width:0;

                &:after
                {
                    display:none;
                }
                li
                {
                    line-height:30px;
                    height:31px;
                    text-align:center;
                    border-bottom:1px solid #ddd;
                    background-color:#fbfbfb;
                }

                li.active
                {
                    color:#ff6600;
                    height:32px;
                    color:#028dea;
                    margin-top:-1px;
                    border-top:1px solid #16a2ff;
                    border-bottom:1px solid #16a2ff;
                }
            }
        }
    }
</style>