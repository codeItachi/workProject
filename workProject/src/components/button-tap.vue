<template>
    <button type="button" class="button-tap" :class="{'active': !is_tap }" v-gesture:tap.stop.prevent="click">
        <slot></slot>
    </button>
</template>
<style lang="scss">

</style>
<script lang="babel">

    export default{
        data(){
            return {
                is_tap:false
            }
        },
        props:{
            tap:{
                required:true,
                type:Function
            }
        },
        methods:{
            click(){
                if(this.is_tap){
                    this.$toast({text:'请不要重复按Me'});
                    return;
                }
                this.is_tap = true;
                let result = this.tap();
                if(result == true){
                    this.is_tap = false;
                }else if(result instanceof Promise){
                    result.then(()=>{
                        this.is_tap = false;
                    }).catch(()=>{
                        this.is_tap = false;
                    })
                }else{
                    this.$toast({text:'tap事件返回值不规范',time:3000});
                    this.is_tap = false;
                }

            }
        },
        components: {

        }
    }
</script>
