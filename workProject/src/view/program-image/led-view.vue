<template>
    <div class="editor">
        <label for="">编辑器</label>
        <div class="led">
            <span :style="styleTogether" v-if="localimgs"> <img :src="localimgs"/></span>
        </div>
    </div>
</template>
<script lang="babel">
    import Vue from 'vue';
    import datef from 'datef';

    
    export default {
        props:{
            localimgs:{
                required:true,
            },
            devicewidth:{
                required:true,
            },
            deviceheight:{
                required:true,
            },
            bordercolor:{
                required:true,
            }
        },
        methods:{

        },
        computed:{
            styleTogether(){
                let imgwidth = this.devicewidth  ?  this.devicewidth* 4/3 +"px": "100%";
                let imgheight = this.deviceheight  ? this.deviceheight* 4/3 +"px": "100%" ;
            
                return {
                    width:imgwidth,
                    height:imgheight,

                }
            }
        }
    }
</script>
<style lang="scss">
    .editor{
        .led{
            img{
                width: 100%;
                height: 100%;
            }
        }

    }
//方向 - 从右到左
@keyframes positionLeft
{
    0%
    {
        transform:translateX(400px);
    }
    100%
    {
        transform:translateX(-400px);
    }
}
//方向 - 从左到右
@keyframes positionRight
{
    0%
    {
        transform:translateX(-400px);
    }
    100%
    {
        transform:translateX(400px);
    }
}
//方向 - 从上到下
@keyframes positionBottom
{
    0%
    {
        transform:translateY(-400px);
    }
    100%
    {
        transform:translateY(400px);
    }
}
//方向 - 从下到上
@keyframes positionTop
{
    0%
    {
        transform:translateY(400px);
    }
    100%
    {
        transform:translateY(-400px);
    }
}
</style>