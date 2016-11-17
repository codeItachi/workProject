<template>
    <div class="tab-item" v-show="isCurrent">
        <slot></slot>
    </div>
</template>
<style>
    .tab-item{
        display: block;
        width:100%;
        height:100%;
    }
</style>
<script>
    export default{
        ready(){
            this.$on('item_change',(name)=>{
                this.current = name;
            });
        },
        data(){
            return{
                current: ''
            }
        },
        components:{
        },
        methods:{
        },
        computed:{
            isCurrent:function(){
                return this.name == this.current;
            }
        },
        props:{
            name:{
                required: true,
            }
        }
    }
</script>