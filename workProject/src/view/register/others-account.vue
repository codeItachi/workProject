<template>
    <div class="other-account">
        <div class="title">
            <span>其他账号快速登录</span>
        </div>
        <div class="content">
            <div class="float qq"></div>
            <div class="float weixin"></div>
            <div class="float xinlang"></div>
        </div>
    </div>
</template>
<script lang="babel">
    
</script>
<style lang="scss">
    .title{
        span{
            display: inline-block;
            color:#999;
        }
    }
    .title {
        position:relative;
        span{
            &:before{
                content: '';
                display: block;
                width: 18%;
                height: 1px;
                position: absolute;
                top:50%;
                left:2px;
                background:#999;
            }
            &:after{
                content: '';
                display: block;
                width: 18%;
                height: 1px;
                position: absolute;
                top:50%;
                right:2px;
                background:#999;
            }
        }
    }
    .content {
        margin-top:15px; 
        .float{
            float: left;
            width: 40px;
            height: 40px;
        }
    }
    .content {
        .qq{
            margin-left:5px;
            background-image:url(../../../static/others.png);
            background-repeat: no-repeat;
            background-size:220px;
            background-position:-5px 0;

        }
        .weixin{
            margin: 0 20%;
            background-image:url(../../../static/others.png);
            background-repeat: no-repeat;
            background-size:220px;
            background-position:-90px 0;
        }
        .xinlang{
            margin-left:5px;
            background-image:url(../../../static/others.png);
            background-repeat: no-repeat;
            background-size:220px;
            background-position:-175px 0;
        }
    }
</style>