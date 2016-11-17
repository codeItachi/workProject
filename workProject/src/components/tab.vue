<template>
    <div class="tab">
        <ul class="tab-head">
            <li v-for="item in tabs" :class="{'active': active == $index }" v-gesture:tap.prevent="item_switch($index)">{{item.title}}<span v-if="item.tag!=null">({{item.tag}})</span></li>
        </ul>
        <ul class="tab-body">
            <div>
                <slot></slot>
            </div>
        </ul>
    </div>
</template>
<style lang="scss">
    .tab{
        width: 100%;
        .tab-head{
            width:100%;
            height:32px;
            border-top: 2px solid grey;
            li{
                display: inline-block;
                text-align: center;
                padding: 5px 10px;
                border-width: 0 1px 1px 0;
                border-style: solid;
                border-color: grey;
                &.active{
                    background-color: gray;
                }
            }
        }
        .tab-body{
            width:100%;
            height:400px;
            >div{
                 width:100%;
                 height:100%;
                 position: relative;
                 .tab-item{
                     width:100%;
                     height:100%;
                     position: absolute;
                     left:0;
                     top:0;
                 }
             }
        }
    }
</style>
<script>

    import Vue from 'vue';
    import VueGesture from 'vue-gesture';
    Vue.use(VueGesture);
    export default{
        name: 'tab',
        data(){
            return {
            }
        },
        props:{
            tabs:{
                type:Array,
                required:true,
            },
            active:{
                type:Number,
                default: 0
            }
        },
        components: {},
        methods: {
            item_switch(nth){
                this.active = nth;
                var bind = this.tabs[nth].bind;
                this.$broadcast('item_change', bind);
            }
        },
        computed: {}
    }
</script>