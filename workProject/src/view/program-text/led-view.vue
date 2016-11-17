<template>
    <div class="editor">
        <label for="">编辑器</label>
        <div class="led">
            <span :style="styleTogether">{{current.value}}</span>
        </div>
    </div>
</template>
<script lang="babel">
import {textColorValue} from '../program-image/common.js';
import {textFontsizeValue} from '../program-image/common.js';
import {textFontValue} from '../program-image/common.js';

    export default {
        props:{
            current:{
                required:true,
                type:Object,
            },
            color:{
                required:true,
                type:Object,
            },
            bordercolor:{
                required:true,
                type:Object,
            },
            font:{
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
               
            
                let textSize = textFontsizeValue(this.fontsize.selectValue)
                let textColor = textColorValue(this.color.list[this.color.selectValue].value)
                
                let textFont = textFontValue(this.font.selectValue);

                return {
                    fontFamily: textFont,
                    fontSize: textSize,
                    color: textColor,
                }
            }
        }
    }
</script>
<style scoped>
    
</style>