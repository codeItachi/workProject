<template>
    <div class="form-left">
        <slot name="title"></slot>
        <div class="content">
            <slot></slot>
            
        </div>
    </div>
</template>

<style lang="scss">
    
</style>

<script lang="babel">

    export default {
        props:{
            title:{
                required:true,
                type:String,
            }
        }
    }
</script>