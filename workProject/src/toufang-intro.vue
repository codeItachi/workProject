<template>
<div>
    <app-header>
        <span slot="center">我的表单</span>
    </app-header>
    <div class="toufang-result">
        <div>
            <div class="title">设备</div>
            <div class="content">
                您一共使用了<span>{{led_count}}</span>台设备
            </div>
        </div>
        <div>
            <div class="title">节目</div>
            <div class="content">
                您一共发送了<span>{{program_count}}</span>条节目
            </div>
        </div>
        <div>
            <div class="title">发送成功</div>
            <div class="content">
                您一共发送成功<span>{{success}}</span>条节目
            </div>
        </div>
        <div>
            <div class="title">发送失败</div>
            <div class="content">
                您一共发送失败<span>{{fail}}</span>条节目
            </div>
        </div>
       
    </div>
    <div class="add-creative">
        <a v-link="{name: 'ad-list'}">返回</a>
    </div>
</div>
</template>
<script>
    import Vue from 'vue';
    import vueGesture from 'vue-gesture';
    import appHeader from './components/app-header.vue';
    import socket from './socket';
    import toufangMessage from './message/toufang.js';

    export default {
        components:{
            appHeader,
        },
        ready(){
            console.log('ready');
            socket.ready= () =>{
                console.log(this.toufang_id);
                toufangMessage.get_result(this.toufang_id).then((result)=>{
                    console.log(result);
                    this.led_count = result.led_count;
                    this.program_count = result.program_count;
                    this.success = result.success;
                    this.fail = result.fail;
                }).catch((code)=>{
                    this.$toast({text:code});
                });
            }
        },

        route:{
            data({to:{params}}){
                console.log(params.id);
                this.toufang_id = params.id;
            }
        },
        data(){
            return {
                toufang_id:0,
                led_count:0,
                program_count:0,
                success:0,
                fail:0
            };
        }
    }
</script>
<style lang="scss" scoped >
    .add-creative {
        position: fixed;
        bottom: 0;
        width: 100%;
        height: 50px;
        z-index: 99;
        line-height: 44px;
        text-align: center;
        background-color: #12b7f5;
        a {
            color: #fff;
        }
    }
    .toufang-result>div:first-child{
        margin-top:56px 
    }
    .toufang-result>div:last-child{
        margin-bottom:52px 
    }
    .toufang-result>div{
        span{
            padding:2px 10px;
        }
        &:nth-child(3){
            span{
            color: #0f0;
            }
        }
        &:nth-child(4){
            span{
            color: #f00;
            }
        }
    }
    .toufang-result {
        margin-top: 46px;
        >div{
            width: 292px;
            margin: 0 auto;
            border:1px solid #ccc;
            background-color:#fafafa;
            border-radius: 5px;
            color: #666;
            margin-top: 10px;
            padding: 20px 0 25px 0;
            .title{
                margin-left:10px;
                font-size: 18px;
            }
            .content{
                margin-left:35px;
                margin-top: 15px;
                font-size: 16px;  
            } 
        } 
    }
    
</style>