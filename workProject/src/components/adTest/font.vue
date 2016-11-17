<template>
<div class="input-group">
  <label class="align">字　　号：</label>
  <div class="input-fit text-size">
    <a class="i-sub" :class = "{'subActive' : subActive}"  v-gesture:tap.stop.prevent = "sub_click()"></a>
    <div class="inline-con" :class= "{'prevent' : adaptive}">
      <input class="input-text w-8" type="text" value="{{dataGroup[size]}}" name="" disabled="false">
    </div>
    <a class="i-add" :class="{'addActive' : addActive}"  v-gesture:tap.stop.prevent = "add_click()"></a>
    <label class="checkboxicon"><input type="checkbox" v-model="adaptive"><i></i>自适应</label>
  </div>
</div>
</template>

<script>

export default {
  data:function(){
    return {
      dataGroup: [16,24,32,48,64],
      subActive: false,
      addActive: true,
    }
  },

  props: {
    title: {
      type: String,
      required: false
    },
    size:{
      required:true,
      type:Number,
      twoWay:true,
    },
    adaptive:{
      required:true,
      type:Boolean
    }
  },

  computed: {
    // 仅读取，值只须为函数
    subActive: function(){
      var length = this.dataGroup.length;
      return this.size > 0 && false === this.adaptive;
    },
    addActive: function(){
      var length = this.dataGroup.length;
      return this.size < (length-1) && false === this.adaptive;
    }
  },

  methods:{
    sub_click: function(){
      if(this.subActive){
        this.size = this.size-1;
      }
    },
    add_click: function(){
      if(this.addActive){
        this.size = this.size+1;
      }
    },
  }
}
</script>

<style lang="scss">
.text-form .input-group label.align
{
  text-align:right;
  font-size:15px;
  padding-right:5px;
}
</style>