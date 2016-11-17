<template>
    <div class="modal" :style="{'display': diplay}">
        <slot></slot>
    </div>
</template>
<style>
    
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
            diplay(){
                if(this.show) return 'block';
                return 'none';
            }
        },
        props:{
            show:{
                required:true,
                type:Boolean
            },
        }
    }
</script>