<template>
    <form class="text-form" >
        <form-kv>
            <slot name="fontsize"></slot>
        </form-kv>
        <form-kv>
            <slot name="color"></slot>
        </form-kv>
       
        <form-kv>
            <slot name="border"></slot>
        </form-kv>
         
    </form>
</template>
<script lang="babel">
    import formKv from "../program-image/form-kv";
    export default {
        components:{
            formKv,
        },
        ready(){
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
<style lang="scss" >
    .text-form {
        margin-bottom: 52px;
    }
    .text-form{
        display: block;
    }
    .active.auto-adapt{
        .radiobutton{
            margin: 10px auto 62px;

        }
        .text-form{
            display: none;
            margin-top:-52px; 
        }
    }
</style>