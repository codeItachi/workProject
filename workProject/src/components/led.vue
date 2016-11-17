<template>
    <div class="led">
        <div class="info open">
            <img :src="imgsrc" />
            <div><slot></slot></div>
        </div>
        <div class="menu">
            <ul>
                <li>删除</li>
                <li>编辑</li>
                <li>投放</li>
            </ul>
        </div>
    </div>
</template>
<style lang="scss">
    .led{
        position: relative;
        width:100%;
        height:50px;
        .menu,.info{
            position: absolute;
            right:0;
            top:0;
            height:100%;
            width:100%;
        }
        .menu{
            background-color:green;
            ul{
                width:100%;
                height:100%;
                >li{
                     display: inline-block;
                     float: right;
                     width:40px;
                     height:100%;
                     line-height:48px;
                 }
            }
        }
        .info{
            background-color:red;
            &.open{
                transform: translateX(-240px);
            }
            img{
                width:80px;
                height:48px;
            }
        }
    }
</style>
<script>
    
    export default{
        data(){
            return{
            }
        },
        components:{
        },
        methods:{
        },
        computed:{
        },
        props:{
            imgsrc:{
                required:true,
            }
        }
    }
</script>