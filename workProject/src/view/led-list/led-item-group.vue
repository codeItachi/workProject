<template>
    <div class="led-item-group">
        <div class="group-top">
            <span class="check-group" v-gesture:tap.prevent="clickselect()">
                <span :class="status"></span>
            </span>
            <span class="group-name" :class="{'active':groupStyle}" v-gesture:tap.prevent="itemSwitch()">
                <span class="group-switch"></span>{{group.name}}({{group.count}})
            </span>
        </div>

        <div class="group-slider" v-if="groupStyle">
            <slot></slot>
        </div>
    </div>
</template>

<style lang="scss">
.led-item-group
{
    .check-group
    {
        padding:10px 15px;
        display:inline-block;
        vertical-align:top;
        position:absolute;
        top:4px;
        left:0;

        >span
        {
            display:block;
            width:20px;
            height:20px;
            border-radius:2px;
            position:relative;
            // background-color: #e8e8e8;

            &:after
            {
                position: absolute;
                content: "";
                top: 2px;
                left: 5px;
                width: 5px;
                height: 9px;
                border-right: 2px solid #fff;
                border-bottom: 2px solid #fff;
                transform: rotate(45deg);
                -ms-transform: rotate(45deg);
                -webkit-transform: rotate(45deg);
                z-index: 99;
            }

            &.s1
            {
                border: 1px solid #bebebe;

                &:after
                {
                    border-right: 2px solid #ddd;
                    border-bottom: 2px solid #ddd;
                }
            }
            &.s2
            {
                background-color:#fff;
                border:1px solid #3CA9E2;

                &:after
                {
                    border-right: 2px solid #3CA9E2;
                    border-bottom: 2px solid #3CA9E2;
                }
            }
            &.s3
            {
                border-color:#3CA9E2;
                background-color:#42beff;
                border:1px solid #3CA9E2;
            }
        }
    }
    .checkboxicon
    {
        margin-top:10px;
    }
    .group-top
    {
        height:49px;
        padding:4px 10px 4px 0;
        line-height:20px;
        font-size:0;
        position: relative;
        padding-left:50px;
        border-bottom:1px solid #ddd;

        .group-switch
        {
            display:inline-block;
            vertical-align:top;
            margin-top:12px;
            margin-left:6px;
            border:8px solid #fff;
            border-left-color:#aaa;
        }

        .group-name
        {
            display:block;
            vertical-align:top;
            height:40px;
            font-size:16px;
            line-height:40px;

            &.active
            {
                color:#028dea;
                .group-switch
                {
                    margin-top:12px;
                    margin-right:4px;
                    margin-left:2px;
                    border-left-color:#fff;
                    border-top-color:#028dea;
                }
            }
        }
    }
}
</style>
<script lang="babel">
    import Vue from 'vue';

    export default {
        components:{

        },

        data(){
            return {
                // select:false
            };
        },
        ready(){
            this.$watch('group.select',(val)=>{
                this.gselectClick && this.gselectClick(this.group.id, val);
            });
            this.$watch('opened',(val)=>{
                if(this.group.id !== val){
                    this.groupStyle = false;
                }else{
                    this.groupStyle = true;
                }
            });
            this.opened = this.$parent.$children[0].group.id;
        },

        methods:{
            itemSwitch(){
                if(this.opened == this.group.id){
                    this.opened = null;
                }else{
                    this.opened = this.group.id;
                }
            },
            clickselect(){
                switch(this.group.select){
                    case 1:
                    case 2:
                        this.group.select = 3;
                        break;
                    case 3:
                        this.group.select = 1;
                        break;
                    default:
                }
            },
        },

        props:{
            opened:{
            },
            group:{
                required:true,
                type:Object,
            },
            groupStyle:{
                required:true,
                type:Boolean,
            },
            prevPage:{
                required:true,
                type:Function,
            },
            nextPage:{
                required:true,
                type:Function,
            },
            gselectClick:{
                required:true,
                type:Function,
            }
        },

        computed:{
            status(){
                switch(this.group.select){
                    case 1:return 's1';
                    case 2:return 's2';
                    case 3:return 's3';
                }
            }
        },

    }
</script>