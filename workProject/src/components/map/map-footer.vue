<template>
    <div class="map-footer" slot="footer">
        <slot></slot>
    </div>
</template>
<style lang="scss">
    .map-footer{
        position: absolute;
        width:100%;
        padding:10px 20px;
        text-align: center;
        background-color: rgba(230,230,230,1);
        border-top: 1px solid #ccc;
        left:0;
        bottom:0;

        input{
            width:100%;
            height:34px;
            outline:0;
            color:#666;
            font-size:15px;
            border-color:#fff;;
            border-radius: 4px;
            border:1px solid #ccc;
            line-height:24px;
            padding:4px 10px;
        }
    }

    #map #map_search
    {
        top:150px;
    }
</style>
<script lang="babel">

    export default{
        data(){
            return {

            }
        },
        components: {

        }
    }
</script>
