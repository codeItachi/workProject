<template>
    <div class="label-panel">
        <span>{{label}}</span>
        <div v-gesture:swipeRight.stop.prevent="empty($event)">
            <slot>
            
            </slot>
        </div>
    </div>
</template>

<style lang="scss">
.label-panel
{
    margin-bottom:10px;
    >span
    {
        display:block;
        height:34px;
        line-height:34px;
        font-size:15px;
        color:#999;
    }
    button
    {
        width:82px;
        height:34px;
        line-height:32px;
        float:left;
        text-align:center;
        border:1px solid #e1e1e1;
        font-size:14px;
        margin:8px 6px;
        outline:0;
        color:#666;
        padding:0;
        border-radius:3px;
        background: -webkit-linear-gradient(#fafafa, #f1f1f1);

        &.active
        {
            color:#0089ff;
            background:none;
            background-color:#fff;
            border-color:#0089ff;
        }
    }
    >div
    {
        padding:0px 8px;
        &:after
        {
            content:"";
            display:block;
            clear:both;
        }
    }
}
</style>
<script lang="babel">
    import Vue from 'vue';
    import vueGesture from 'vue-gesture';
    Vue.use(vueGesture);

    export default {
        components:{

        },
        data(){
            return {
            };
        },
        ready(){

        },
        route:{
            data(trans){

            }
        },

        methods:{
            empty(event){
                event.stopPropagation();
            }
        },

        computed:{

        },
        props:{
            label: {
              type: String,
              required: false
            },
        }
    }
</script>