<template>
    <div class="put-sub">
        <button class="preview" @click="effectView">
            <slot name="preview"><span>预览</span></slot>
        </button>
        <button class="submit">
            <slot name="submit"></slot>
        </button>
    </div>
</template>

<script>
    export default {
        methods:{
            effectView: function(){
                this.$dispatch('effect-statu', true);
            },
        }
    }
</script>

