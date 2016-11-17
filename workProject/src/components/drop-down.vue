<template>
    <div class="input-item drop-list">
        <label class="{{dropDownDate.styleName}}">{{dropDownDate.title}}</label>
        <div class="drop_content">
            <a  class="i-turn-b" @click="selectBox()">{{selectText}}</a>
            <div class="slide-list" :class="{'show':styleStatus}" v-gesture:tap.stop.prevent="shutDownMeng">
                <div class="{{dropDownDate.styleName}}">
                    <div class="list"  v-gesture:tap.stop.prevent="stopEvent">
                        <ul>
                            <li v-for="item in dropDownDate.list" v-gesture:tap.stop.prevent="selected_submit($index)" :class="{'active':selected===($index)}">
                                <span  >{{item.key}}</span>
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

    export default {
        components:{
        },
        data(){
            return{
                isHideBox:true,
                styleStatus:false,
                selected:'',
            }
        },
        props:{
            dropDownDate:{
                required:true,
                type:Object,
            },
            name:{
                type:String
            },
        },
        ready(){
        },
        route:{


        },
        methods:{
            prevent(){
                this.showup = false;
            },
            selected_submit(index){
                this.dropDownDate.selectValue = index;
                this.styleStatus = false;
                this.selected = index;
            },
            selectBox(){
                this.selected = this.dropDownDate.selectValue;
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

   .drop-list
    {
        position: relative;
        padding-left: 88px;
        padding-right: 10px;
        font-size: 15px;
        padding-left: 108px;
        >label{
            width:auto;
            left:10px;
            top:5px;
            padding-left: 20px;
            background-image:url(../../static/edit-icon.png);
            background-size: 16px;
            background-repeat: no-repeat;
        }
        >.color_value{
            background-position: 0px -83px;
        }
        >.polar_data{
            background-position: 0px -175px;
        }
        >.polar_oe{
            background-position: 0px -219px;
        }
        >.scan_type{
            background-position: 0px -261px;
        }
    }

    .drop-list{
        >.scan_type + div{
            a{
                line-height: 22px;
                padding: 6px 25px 6px 0;
            }
        }
    }
    .drop_content{
        >a.i-turn-b{
            text-align: left;
        }

        .slide-list{
            position:fixed;
            width:100%;
            height:0px;
            bottom:0;
            left:0;
            z-index: 999;
            overflow:hidden;
            background-color:rgba(0,0,0,0.3);
            display: flex;
            justify-content: center;
            align-items: center;
            &.show
            {
                height:100%;
                padding: 0 10px;
            }
            >div
            {
                width:100%;
                height: auto;
                overflow:hidden;
                transition: height 0.3s ease-in;
                border-radius: 5px;
            }
            >div.scan_type{
                height: 195px;
                overflow-y: auto;
                .list{
                    li{
                        text-align: left;
                    }
                }
            }
        }
    }

    .slide-list{
        .list{
            ul
            {
                height:auto;
                position:static;
                box-shadow:none;
                border-width:0;
                padding: 0;
                &:after
                {
                    display:none;
                }
                li
                {
                    font-size: 16px;
                    text-align:center;
                    line-height: 44px;
                    &:nth-child(odd){
                        background-color: #fcfcfc;
                    }
                }

                li.active
                {
                    background-color:#3fadf7;
                }
            }
            li>span{
                display: inline-block;
                height: 38px;
                line-height: 38px;
            }
        }
    }

</style>