<template>
    <div class="input-group">
        <label>节目ID：</label>
        <label class="holder">允许输入1-95</label>
        <div class="input-fit">
            <input class="" type="text" placeholder="" v-model="value">
        </div>
    </div>
</template>

<script lang="babel">
    export default {
        props:{
            value:{
                required:true,
                twoWay:true,
            },
        },
    }
</script>
<style lang="scss">
    .input-group{
        .holder{
            position:absolute;
            right:0;
            color: #ccc;
            text-align: center;
            width: auto;
            font-size: 12px;
        }
    }
</style>