<template>
    <ul class="tab-tit">
        <li v-for="item in tabsource.tabs" class="tabHeadText" :class="{'active': $index == tabsource.tabIndex}" 
            v-gesture:tap.stop.prevent="active_item($index)">
            <a>{{item.headName}}</a>
        </li>
    </ul>
    <div class="tab-con">
        <div class="tab-list text-edit" :class="{'show': tabShow == 'tab-text'}">
            <slot name="textItem"></slot>
        </div>

        <div class="tab-list time-edit" :class="{'show': tabShow == 'tab-time'}">
            <slot name="timeItem"></slot>
        </div>
    </div>
</template>
<script lang="babel">

    export default {
        methods:{
            //选项卡
            active_item(nth){
                this.tabsource.tabIndex = nth;
            }
        },
        //选项卡
        computed:{
            tabShow(){
                var ret =this.tabsource.tabs[this.tabsource.tabIndex].bodyIndex;
                return ret;
            }
        },
        props:{
            tabsource:{
                type:Object,
                required:true,
            }
        }
    }
</script>
<style lang="scss">

</style>