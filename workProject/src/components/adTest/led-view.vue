<template>
    <div class="led">
        <span :class="{'show':tabIndex == 0}" :style="styleTogether">{{current.text.value}}</span>
        <span :class="{'show':tabIndex == 1}">{{time | dtstyle format formats}}</span>
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
        components: {

        },

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

        },

        computed:{
            styleTogether(){
                var font = '';
                switch (this.current.text.animation.size) {
                    case 0 :
                        font =  "16px";
                        break;
                    case 1 :
                        font =  "24px";
                        break;
                    case 2 :
                        font =  "32px";
                        break;
                    case 3 :
                        font =  "48px";
                        break;
                    case 4 :
                        font =  "64px";
                        break;
                };
                var textSize = this.current.text.animation.adaptive ? "24px" : font;

                return {
                    color: this.current.text.color,
                    fontSize:textSize,
                };
            }
        },

        props:{
            current:{
                type:Object,
                required:true,
            },
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
            tabIndex:{
                type:Number,
                required:true,
            }
        },
    }
</script>