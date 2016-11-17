<template>
    <div class="input-group d2">
        <div class="input-fit text-animat">
            <slot></slot>
        </div>
    </div>
</template>

<script lang="babel">
    export default{
        props:{
        }
    }
</script>
<style scoped lang="scss">
    .input-group{
        > div.input-fit{
            padding: 0px;
        }
    } 
    
</style>
