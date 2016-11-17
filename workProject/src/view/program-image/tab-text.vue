<template>
    <form class="text-form">
        <form-kv>
            <slot name='remaintime'></slot>
        </form-kv>
         <form-kv>
            <slot name='animationway'></slot>
        </form-kv>
        <form-kv>
            <slot name='border'></slot>
        </form-kv> 
    </form>
</template>
<script lang="babel">
    import formKv from "./form-kv";
    export default {
        components:{
            formKv,
        },
        data(){
            return {
            }
        },
        methods:{
            
        },
        computed:{
        },
        props:{
        }
    }
</script>
<style lang="scss" scoped>
    .text-form {
        margin-bottom: 52px;
    }
</style>