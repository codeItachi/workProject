<template>
    <div v-show="show" class="vux-toast" :transition="transition">
        <div class="weui_mask_transparent"></div>
        <div class="weui_toast" :style="{width: width}" :class="toastClass">
            <!-- <i class="weui_icon_toast" v-show="type !== 'text'"></i> -->
            <p class="weui_toast_content"><slot></slot></p>
        </div>
    </div>
</template>

<script lang="babel">
    import Vue from 'vue';
    Vue.transition('vux-fade',{
        afterLeave(){
            this.over_cb();
        }
    });
    export default {
        props: {
            show: {
                type: Boolean,
                default: false,
                twoWay:true,
            },
            time: {
                type: Number,
                default: 2000
            },
            type: {
                type: String,
                default: 'success'
            },
            transition: {
                type: String,
                default: 'vux-fade'
            },
            width: {
                type: String,
                default: '140px'
            },
            over_cb:{
                type:Function,
                default:function(){}
            }
        },
        computed: {
            toastClass () {
                return {
                    'weui_toast_forbidden': this.type === 'warn',
                    'weui_toast_cancel': this.type === 'cancel',
                    'weui_toast_success': this.type === 'success',
                    'weui_toast_text': this.type === 'text'
                }
            }
        },
        watch: {
            show (val) {
                if (val && this.time > 0) {
//                    console.log(this.time);
                    clearTimeout(this.timeout)
                    this.timeout = setTimeout(() => {
                        this.show = false
                    }, this.time)
                }
            },
            time(val){
              if (this.show && val > 0) {
//                    console.log(this.time);
                    clearTimeout(this.timeout)
                    this.timeout = setTimeout(() => {
                        this.show = false
                    }, val)
                }
            }
        },
        methods:{
        }
    }
</script>

<style lang="scss">
.weui_toast
{
  z-index: 200;
  transform: translateX(-50%);
  margin-left: 0;
}
.weui_toast {
  position: fixed;
  z-index: 3;
  min-width: 120px;
  top: 180px;
  left: 50%;
  margin-left: -3.8em;
  background: rgba(40,40,40,.75);
  text-align: center;
  border-radius: 5px;
  color: #fff;
}

.weui_icon_toast
{
  margin: 22px 0 0;
  display: block;
}
.weui_toast_content
{
  padding:10px;
  font-size:14px;
}

.weui_toast.weui_toast_text
{
  min-height: auto;
  font-size:16px;

  .weui_toast_content
  {
    line-height:24px;
  }
}
.weui_toast
{
  z-index: 200;
  transform: translateX(-50%);
  margin-left: 0;
}
.weui_toast_text{
  .weui_toast_content {
      margin: 0;
      padding: 10px;
      font-size:15px;
      border-radius: 15px;
  }
}
</style>