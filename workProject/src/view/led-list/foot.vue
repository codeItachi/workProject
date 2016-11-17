<template>
    <div class="foot-led">
        <slot name="left"></slot>
        <span class="submit">
            <span>
                <slot name="submit"></slot>
            </span>
        </span>
        <slot name="right"></slot>
    </div>
</template>

<style lang="scss">
    .foot-led
    {
        position:fixed;
        bottom:0;
        width:100%;
        height:50px;
        z-index:999;
        text-align:center;
        background-color:#fff;
        border-top:1px solid #cacaca;

        .submit
        {
            display:inline-block;
            position:relative;
            width:50px;
            height:50px;
            font-size:16px;
            text-align:center;
            line-height:50px;
            outline:0;
            border:0;
            color:#fff;

            >span
            {
                position:absolute;
                display:block;
                content:"";
                top:-27px;
                left:-13px;
                width:74px;
                height:74px;
                padding:3px;
                border-radius:50%;
                background-color:#fff;
                z-index:1;
                background:url(../../../static/history.png);
                background-size:74px;
            }

            a
            {
                display:block;
                width:68px;
                height:68px;
                border-radius:50%;
                line-height:34px;
                padding-top:32px;
                color:#fff;
                background-color:#ccc;
                background-image: url(../../../static/adlist-i.png);
                background-position:22px -460px;
                background-repeat:no-repeat;
                background-size: 50px;

                .num
                {
                    font-size:16px;
                    display:none;
                    line-height:22px;
                }
                .txt
                {
                    font-size:16px;
                    display:block;
                    line-height:24px;
                }

                &.active
                {
                    color:#fff;
                    padding-top:10px;
                    background-color: #1ac7cd;
                    background-image:none;

                    .num
                    {
                        display:block;
                    }
                }
            }
        }

        .btn-left
        {
            position:relative;
            display:block;
            height:50px;
            float:left;
            border:0;
            color:#06c577;
            line-height:50px;
            padding-left:30px;
            padding-right:20px;
            background-color:#fff;

            &:active
            {
                background-color:#f1f1f1;
            }

            &:before
            {
                position:absolute;
                content: " ";
                display: block;
                width: 10px;
                height: 10px;
                top:20px;
                left:15px;
                transform: rotate(-45deg);
                -webkit-transform: rotate(-45deg);
                border-top: 1px solid #00c274;
                border-left: 1px solid #00c274;
            }
        }
        .btn-right
        {
            position:relative;
            display:block;
            height:50px;
            float:right;
            border:0;
            color:#06c577;
            line-height:50px;
            padding-left:20px;
            padding-right:30px;
            background-color:#fff;

            &:active
            {
                background-color:#f1f1f1;
            }

            &:before
            {
                position:absolute;
                content: " ";
                display: block;
                width: 10px;
                height: 10px;
                top:20px;
                right:15px;
                transform: rotate(135deg);
                -webkit-transform: rotate(135deg);
                border-top: 1px solid #00c274;
                border-left: 1px solid #00c274;
            }
        }

        .btn-left.disab,
        .btn-right.disab,
        {
            color:#ccc;

            &:before
            {
                border-top: 1px solid #ccc;
                border-left: 1px solid #ccc;
            }

            &:active
            {
                background-color:#fff;
            }
        }
    }
</style>
<script lang="babel">
    import Vue from 'vue';

    export default {
        components:{

        },
        data(){
            return {
            };
        },
        ready(){

        },
        route:{
            data(trans){

            }
        },

        methods:{

        },

        computed:{

        },

    }
</script>