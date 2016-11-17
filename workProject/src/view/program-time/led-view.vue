<template>
    <div class="editor">
        <label for="">编辑器</label>
        <div class="led">
            <span :style="styleTogether">{{time | fdatetime format }}</span>
        </div>
    </div>
</template>
<script lang="babel">
    import Vue from 'vue';
    import {textColorValue} from '../program-image/common.js';
    import {textFontsizeValue} from '../program-image/common.js';

    export default {
        ready(){
            
        },
        props:{
            current:{
                required:true,
                type:Object,
            },
            selectauto:{
                required:true,
                twoWay:true,
            },
            time:{
                required:true,
            },
            format:{
                required:true,
                // type:String,
                twoWay:true,
            },
            color:{
                required:true,
                type:Object,
            },
            bordercolor:{
                required:true,
                type:Object,
            },
            fontsize:{
                required:true,
                type:Object,
            },
        },
        methods:{

        },
        computed:{
            styleTogether(){
                let textSize = textFontsizeValue(this.fontsize.selectValue);
                let textColor = textColorValue(this.color.list[this.color.selectValue].value);
                if(this.current.selectauto == true){
                    console.log(this.current.selectauto)
                    return {
                        fontSize: "24px",
                        color:"#db1b1c" ,

                    }
                }else{
                    return {
                        fontSize: textSize,
                        color: textColor,
                    }
                }
                
            }
        }
    }
</script>
<style>

</style>