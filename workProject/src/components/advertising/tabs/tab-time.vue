<template>
    <div class="times-format">
        <ul class="" :class="{'show': styleShow}">
            <li class="clickStyle" v-for="item in formats"  @click="clickStyle($index)">{{item.title}}</li>
        </ul>
        <a class="current-time" :class="{'show': !styleShow}" @click="selectFormat()">{{ time | dtstyle format formats }}</a>
    </div>
</template>

<script>
    import Vue from 'vue';
    import datef from 'datef';

    Vue.filter('dtstyle', function(sconds, style, formats){
        var newDate = new Date();
        newDate.setTime(sconds * 1000);
        return datef(formats[style].style, newDate);
    })

    export default {
        ready: function(){
            var timestamp = Date.parse(new Date());
            this.time = timestamp / 1000;
            setInterval(()=>{this.time += 1;},1000);
        },

        data: function(){
            return {
                styleShow :true,    //时间格式初试状态
            }
        },

        methods:{
            clickStyle:function(nth){
                this.format = nth;
                this.styleShow = false;
            },
            selectFormat(){
                this.styleShow = true;
            }
        },

        props:{
            time:{
                required:true
            },
            format:{
                required:true,
                type:Number,
                twoWay:true,
            },
            formats:{
                required:true,
                type:Array,
            }
        }
    }
</script>