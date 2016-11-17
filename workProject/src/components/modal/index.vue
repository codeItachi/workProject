<template>
    <div class="balloon" v-if="show" v-gesture:tap.stop.prevent="cancel">
        <div>
            <div class="container" v-gesture:tap.stop.prevent="stopDefault">
                <div class="balloon-head">{{title}}</div>
                <div class="balloon-body">
                    <component v-if="isComponent" :is="content"></component>
                    <span v-else>{{content}}</span>
                </div>
                <div class="balloon-foot">
                    <button class="btn-default" v-gesture:tap.stop.prevent="cancel">{{cancelTitle}}</button>
                    <button class="btn-primary" v-gesture:tap.stop.prevent="submit">{{submitTitle}}</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
    .balloon
    {
        width:100%;
        height:100%;
        top:0;
        left:0;
        position:fixed;
        z-index:99999;
        background-color:rgba(0, 0, 0, 0.6);

        >div
        {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100%;
        }

        .container
        {
            width:286px;
            background-color:#fff;
            border-radius:4px;
            margin:0 auto;
            z-index:99;
            -webkit-animation:fadeIn 1s ease both;
        }

        .balloon-head
        {
            width:100%;
            height:45px;
            padding:0 24px;
            line-height:44px;
            font-size:16px;
            color:#666;
            border-bottom:1px solid #d9dfe4;
            border-radius:4px 4px 0 0;
            background-color:#f5f5f5;

            >span
            {
                display:block;
                float:left;
                height:44px;
                line-height:44px;
            }

            &:after
            {
                content:"";
                display:block;
                clear:both;
            }
        }
        .balloon-body
        {
            color:#ff6600;
            max-height:360px;
            text-align:center;
            line-height:30px;
            padding:15px 20px;
        }
        .balloon-foot
        {
            display: -webkit-box;
            padding: 0 10px 20px 10px;
            border-radius:0 0 2px 2px;

            button
            {
                display:block;
                border: 0;
                outline: 0;
                height: 34px;
                margin:0 10px;
                font-size:15px;
                line-height: 32px;
                text-align: center;
                border-radius: 3px;
                -webkit-box-flex: 1;

                &.btn-primary{
                    color:#fff;
                    background-color:#028dea;
                    border:1px solid #1386d4;
                }
                &.btn-danger {
                    color: #fff;
                    margin-right: 10px;
                    background-color: #FF4C4C;
                    border: 1px solid #dc1b1b;
                }
                &.btn-default {
                    color: #666;
                    margin-left: 10px;
                    background-color: #f2f2f2;
                    border: 1px solid #ddd;
                }
            }
        }
    }
</style>

<script lang="babel">
    import Vue from 'vue';
    import vueGesture from 'vue-gesture';
    Vue.use(vueGesture);
    export default{
        data(){
            return {};
        },
        props:{
            cancelTitle:{
                required:true,
                type:String
            },
            submitTitle:{
                required:true,
                type:String
            },
            title:{
                required:true,
                type:String
            },
            content:{
                required:true,
            },
            cancelCall:{
                type:Function
            },
            submitCall:{
                required:true,
                type:Function
            },
            show:{
                required:true,
                type:Boolean,
                twoWay:true,
            }
        },

        computed:{
            isComponent(){
                if(this.content instanceof Object){
                    return true;
                }else{
                    return false;
                }
            }
        },
        methods:{
            cancel(){
                if(this.cancelCall){
                    this.cancelCall(this.content);
                }
                this.show = false;
            },
            submit(){
                let ret = this.isComponent ? this.$children[0] : this.content;
                this.submitCall(ret);
                this.show = false;
            },
            stopDefault(event){
                event.stopPropagation();
            }
        }
    }
</script>