<template>
    <div class="panel" transition="panel" stagger="100">
        <slot></slot>
    </div>
</template>
<style>
    .panel-transition{
        width:100%;
        height:100%;
        transition: all 5s ease;
    }
    .panel-enter{
        height:100%;
    }
    .panel-leave{
        height:0;
    }
</style>
<script>
    
    export default{
        data(){
            return{
            }
        },
        components:{
        },
        methods:{
        },
        computed:{
        }
    }
</script>
