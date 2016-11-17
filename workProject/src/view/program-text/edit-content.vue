<template>
    <div class="info">
        <textarea rows=3  placeholder="请输入广告详细内容" v-model="current.value" ></textarea>
    </div>
</template>
<style lang="scss">
    .info{
        padding:3px 0px;
        border-radius: 4px;
        background-color: #fff;
        border:1px solid #ddd;
        width: 96%;
        margin: 8px auto;
        textarea{
            width: 100%;
            line-height: 26px;
            outline: 0;
            color: #666;
            border: 0;
            padding: 2px 10px;
            resize: none;
            font-size: 15px;
        }
    }
</style>
<script lang="babel">

    export default {
        props:{
            current:{
                required:true,
                type:Object,
            }
        },
    }
</script>