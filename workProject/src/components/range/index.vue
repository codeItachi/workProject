<template>
    <div class="vux-range-input-box" style="">
        <span class="value">{{value}}</span>
        <input class="vux-range-input" v-model="value" >
    </div>
</template>

<script>
    const Powerange = require('./range/lib/powerange')

    export default {
        data(){
            return{
                step:null,
            }
        },
        props: {
            option:{
                required:true,
                type:Object,
            },
            value: {
                required:true,
                twoWay:true
            },

        },
        ready () {
            let options = this.option;
            if (this.step !== 0) {
                options.step = this.step
            }
            this.range = new Powerange(this.$el.querySelector('.vux-range-input'), options)
            const handleTop = (this.rangeHandleHeight - this.rangeBarHeight) / 2
            this.$el.querySelector('.range-handle').style.top = `-${handleTop}px`
            this.$el.querySelector('.range-bar').style.height = `${this.rangeBarHeight}px`
        },
        watch: {
            value(val){
                this.range.setStart(val)
            },
            'min + max': function () {
                let value = this.value
                if (value < this.min) {
                    value = this.min
                }
                if (value > this.max) {
                    value = this.max
                }
                this.range.reInit({min: this.min, max: this.max, value: value})
                this.value = value
                this.range.setStart(this.value)
            }
        }
    }
</script>

<style lang="scss">
    @import './layout.scss';

</style>

