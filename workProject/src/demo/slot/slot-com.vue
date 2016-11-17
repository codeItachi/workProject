<template>
    <div class="slot-com">
        <slot></slot>
        <slot name="slot1">slot1111dddd11</slot>
        <slot></slot>

        {{prop1}}
        {{prop2}}

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
        },
        props:{
            prop1:{

            },
            prop2:{

            }
        }
    }
</script>