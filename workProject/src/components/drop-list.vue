<template>
    <div class="input-item drop-list">
        <label class="{{dropDownDate.styleName}}">{{dropDownDate.title}}</label>
        <div>
            <a :class="{'prompt': currentList === false}" class="i-turn-b" @click="selectBox()">{{selectText}}</a>
            <div v-else class="slide-list " :class="{'show':styleStatus}"  v-gesture:tap.stop.prevent="shutDownMeng">
                <div :class="{'show':styleStatus}">
                    <div class="head">
                        <a class="cancel" v-gesture:tap.stop.prevent="cancel"></a>
                    </div>
                    <div class="list" v-gesture:tap.stop.prevent="stopEvent">
                        <ul   class="{{dropDownDate.styleName}}">
                            <li class="li" v-for="item in dropDownDate.list" v-gesture:tap.stop.prevent="selectedList($index)" >
                                <span class="li_{{$index}}" v-gesture:tap.stop.prevent="selected_submit($index)">{{item.key}}</span>
                            </li>
                        </ul>
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
//    import dropList from './drop-list.vue';
    import range from  './range/index.vue'

    export default {
        components:{
            range
        },
        data(){
            return{
                isShow:false,
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
            name:{
                type:String
            }

        },
        ready(){
            this.selected = this.dropDownDate.selectValue;
        },

        methods:{
            cancel(){
                this.styleStatus = false;
            },
            selected_submit(index){
                this.dropDownDate.selectValue = index;
                this.styleStatus = false;
                this.selected = index;
                if(!this.dropDownDate.tipText){
                    this.$toast({text:'该效果不支持预览',time:2000})
                }
            },
            selectBox(){
                if(this.dropDownDate.title == "环绕边框"){
                    return false;
                }
                this.styleStatus = true;
                this.isHideBox = !(this.isHideBox);
            },
            selectedList(type){
                this.selected = type;
                this.selectBox();
            },
            shutDownMeng(){
                this.styleStatus = !(this.styleStatus);
            },
            stopEvent(event){
                event.stopPropagation();
            }
        },

        computed:{
            selectText(){
                this.dropDownDate.selectValue = this.dropDownDate.selectValue || 0;
                return this.dropDownDate.list[this.dropDownDate.selectValue].key;
            }
        }
    }
</script>
<style lang="scss" scoped>
    /*图标*/
    .input-item.drop-list{
        >label{
            width:auto;
            padding-left: 20px;
            background-image:url(../../static/edit-i.png);
            background-size: 50px;
            background-repeat: no-repeat;
        }
        >.font{
            background-position: 0px 9px;
        }
        >.fontsize{
            background-position: -2px -43px;
        }
        >.color{
            background-position: 0px -91px;
        }
        >.animationway{
            background-position: 0px -136px;
        }
        >.speed{
            background-position: 0px -229px;
        }
        >.bordercolor{
            background-position: 0px -278px;
        }
    }

.input-item.drop-list >div
{
    .slide-list
    {
        position:fixed;
        width:100%;
        height:0%;
        bottom:0;
        left:0;
        z-index: 89;
        overflow:hidden;
        /*transition: height 0.3s ease-in;*/
        background-color:rgba(0,0,0,0.1);

        >div:first-child
        {
            position: absolute;
            left:0;
            bottom:0;
            width:100%;
            height:0;
            overflow:hidden;
            transition: height 0.3s ease-in;
            /*background-color:#fff;*/
            &.show{
                height:auto;
            }
        }

        &.show
        {
            height:100%;
            z-index: 999;
            >div
            {
                height:auto;
            }

            .head{
                color: #fff;
                text-align: center;
                span{
                    position: absolute;
                    left:20px;
                    top:0;
                    color: #555;
                }
                >a
                {
                    width: 35px;
                    display:inline-block;
                    height:35px;
                    line-height:35px;
                    border-radius: 50%;
                    background-color: #fff;
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
            .list{
                height:auto;
                overflow-y:auto;
                background-color: #fff;
                li{
                    span{
                        display: block;
                        font-size: 16px;
                        padding: 0;
                    }
                }
            }
        }
    }
    .list{
        .color{
            li.li:last-child{
                width: 100%;
                padding: 10px 125px 15px;
                border: none;

            }
        }
        .fontsize,.font{
            li.li{

                &:nth-child(4),&:nth-child(5),&:nth-child(6){
                    border-bottom: none;
                }
            }
        }
    }
    .list{
        .fontsize{
            >li.li{
                span{
                    background-image: url(../../static/color-i.png);
                    background-repeat:no-repeat;
                    background-size: 37px;
                    color:#fff;
                    font-size: 18px;
                }
                .li_0{
                    background-position: center -427px;
                    font-size: 0;
                }
                .li_1{
                    background-position: center -50px;
                }
                .li_2{
                    background-position: center -103px;
                }
                .li_3{
                    background-position: center -166px;
                }
                .li_4{
                    background-position: center -227px;
                }
                .li_5{
                    background-position: center -288px;
                }

            }
        }
        .color{
            >li.li{
                line-height: 0;
                padding-bottom: 15px;
                span{
                    background-image: url(../../static/color-i.png);
                    background-repeat:no-repeat;
                    background-size: 37px;
                    padding-top: 70px;
                    font-size: 14px;
                }
                .li_0{
                    background-position: center 13px;
                }
                .li_1{
                    background-position: center -45px;
                }
                .li_2{
                    background-position: center -100px;
                }
                .li_3{
                    background-position: center -163px;
                }
                .li_4{
                    background-position: center -223px;
                }
                .li_5{
                    background-position: center -285px;
                }
                .li_6{
                    background-position: center -352px;
                }

            }
        }
        .font{
            >li.li{
                line-height: 0;
                padding-bottom: 15px;

                span{
                    background-image: url(../../static/font-i.png);
                    background-repeat:no-repeat;
                    background-size: 51px;
                    padding-top: 70px;
                    font-size: 0;
                }
                .li_0{
                    background-position: center 1px;
                }
                .li_1{
                    background-position: center -54px;
                }
                .li_2{
                    background-position: center -108px;
                }
                .li_3{
                    background-position: center -161px;
                }
                .li_4{
                    background-position: center -214px;
                }
                .li_5{
                    background-position: center -266px;
                }
            }
        }
        .animationway{
            >li.li{
                line-height: 0;
                padding-bottom: 15px;
                &:nth-child(7),&:nth-child(8),&:nth-child(9){
                    border-bottom:none ;
                }
                span{
                    background-image: url(../../static/animation-i.png);
                    background-repeat:no-repeat;
                    background-size: 35px;
                    padding-top: 70px;
                    font-size: 14px;
                }
                .li_0{
                    background-position: center -427px;
                }
                .li_1{

                    background-position: center -115px;
                }
                .li_2{
                    background-position: center -370px;
                }
                .li_3{
                    background-position: center -307px;
                }
                .li_4{
                    background-position: center -180px;
                }
                .li_5{
                    background-position: center -243px;
                }
                .li_6{
                    background-position: center -490px;
                }
                .li_7{
                    background-position: center 14px;
                }
                .li_8{
                    background-position: center -50px;
                }

            }
        }
    }
    .list
    {
        >ul
        {
            height:auto;
            padding:0;
            position:static;
            box-shadow:none;
            border-width:0;
            &:after
            {
                display:none;
            }
            >li.li
            {
                width: 33%;
                float: left;
                line-height:60px;
                text-align:center;
                background-color:#fff;
                padding: 10px 24px;
                height: auto;
                border-right:1px dashed #ddd;
                border-bottom:1px dashed #ddd;
                &:nth-child(3),&:nth-child(6),&:nth-child(9){
                    border-right:none;
                }
            }
        }
    }
}
</style>