<template>
    <div class="content">
        <slot></slot>
    </div>
</template>

<style lang="scss">
    .content
    {
        padding-top:46px;
        padding-bottom:49px;
        overflow-y:auto;

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
                 //menuStyle:false,
            };
        },
        ready(){
            // this.$on('statu',function(state){
            //     this.menuStyle = state;
            // });
        },
        route:{
            data(trans){

            }
        },

        methods:{

        },

        computed:{

        },

    }
</script>