<template>
    <div class="times-format">
        <ul class="" :class="{'show': styleShow}">
            <li class="clickStyle" v-for="item in formats" v-gesture:tap.stop.prevent="clickStyle($index)">{{item.title}}</li>
        </ul>
        <a class="current-time" :class="{'show': !styleShow}" v-gesture:tap.stop.prevent="selectFormat()">{{ time | dtstyle format formats }}</a>
    </div>
</template>

<script lang="babel">
    import Vue from 'vue';
    import datef from 'datef';

    Vue.filter('dtstyle', function(sconds, style, formats){
        var newDate = new Date();
        newDate.setTime(sconds * 1000);
        return datef(formats[style].style, newDate);
    })

    export default {
        ready(){
            var timestamp = Date.parse(new Date());
            this.time = timestamp / 1000;
            setInterval(()=>{this.time += 1;},1000);
        },

        data(){
            return {
                styleShow :true,    //时间格式初试状态
            }
        },

        methods:{
            clickStyle(nth){
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
            },
            current:{
                require:true,
                type:Object,
            }
        }
    }
</script>