<template>
    <div class="check-code">
        <slot name="phonenumber"></slot>
        <slot name="check"></slot>
        <slot name="getcode"></slot>
        <slot name="password"></slot>
        <slot name="finish"></slot>
    </div>
</template>
<script lang="babel">

    export default {
        data(){
            return{

            }
        }
    }
</script>