<template>
    <div class="slotTest">
        <slot-com prop1="prop111" prop2="">
            <div>dddddddddddddd</div>
            <div slot="slot1">ffffffffffffff</div>
        </slot-com>
    </div>
</template>
<style>
    
</style>
<script>
    import slotCom from './slot-com';
    export default{
        data(){
            return{
            }
        },
        components:{
            slotCom,
        },
        methods:{
        },
        computed:{
        }
    }
</script>