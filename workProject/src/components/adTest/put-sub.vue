<template>
    <div class="put-sub">
        <button class="preview">
            <slot name="preview"></slot>
        </button>
        <button class="submit">
            <slot name="submit"></slot>
        </button>
    </div>
</template>

<script>
    export default {
        methods:{
        }
    }
</script>

