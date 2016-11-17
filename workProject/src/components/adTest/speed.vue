<template>
<div class="input-group">
  <label v-show="title">{{title}}</label>
  <div class="input-fit text-size">
    <a class="i-sub" :class = "{'subActive' : subActive}"  v-gesture:tap.stop.prevent = "subClick()"></a>
    <div class="inline-con">
      <input class="input-text w-8" type="text" value="{{dataGroup[speed]}}" name="" disabled="false">
    </div>
    <a class="i-add" :class="{'addActive' : addActive}"  v-gesture:tap.stop.prevent = "addClick()"></a>
  </div>
</div>
</template>

<script>

export default {
  data:function(){
    return {
      dataGroup: [1,2,3,4],
      subActive: false,
      addActive: true,
    }
  },

  props: {
    title: {
      type: String,
      required: false
    },
    speed:{
      required:true,
      type:Number,
      twoWay:true,
    }
  },

  computed: {
    // 仅读取，值只须为函数
    subActive: function(){
      var length = this.dataGroup.length;
      return this.speed > 0;
    },
    addActive: function(){
      var length = this.dataGroup.length;
      return this.speed < (length-1);
    }
  },

  methods:{
    //文字大小
    subClick: function(){
      if(this.subActive){
        this.speed = this.speed-1;
      }
    },
    addClick: function(){
      if(this.addActive){
        this.speed = this.speed+1;
      }
    },
  },
}
</script>

<style lang="scss">

</style>