<template>
    <div class="content-led">
        <slot></slot>
    </div>
</template>

<style lang="scss">
    .content-led.map-show
    {
        padding-bottom:50px;
    }
    .content-led
    {
        padding-top:46px;
        padding-bottom:98px;
        width:100%;
        height:100%;
        overflow-y:auto;

        .map-content
        {
            display:none;
        }

        .list-content
        {
            display: block;
        }

        &.map-show
        {
            padding-top:46px;

            .map-content
            {
                display:block;
            }

            .list-content
            {
                display: none;
            }
        }
        .map-content
        {
            width:100%;
            height:100%;

            #map #map_search
            {
                top:30px;
            }
        }
        &.unslide
        {
            overflow-y:hidden;
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
                //unslide:false,
            };
        },
        ready(){
            // this.$on('statu',function(state){
            //     this.unslide = state;
            // });
        },
        route:{
            data(){

            }
        },

        methods:{

        },

        computed:{

        },

    }
</script>