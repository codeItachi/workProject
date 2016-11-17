<template>
<div class="input-group">
  <label v-show="title">{{title}}</label>
  <div class="input-fit text-size">
    <a class="i-sub" :class = "{'subActive' : subActive}"  v-gesture:tap.stop.prevent = "sub_click()"></a>
    <div class="inline-con" :class= "{'prevent' : direction}">
      <input class="input-text w-8" type="text" value="{{dataGroup[number]}}" name="" disabled="false">
    </div>
    <a class="i-add" :class="{'addActive' : addActive}"  v-gesture:tap.stop.prevent = "add_click()"></a>
    <label class="checkboxicon"><input type="checkbox" v-model="direction"><i></i>循环</label>
  </div>
</div>
</template>

<script>

export default {
  data:function(){
    return {
      dataGroup: [10,20,30,40,50],
      subActive: false,
      addActive: true,
    }
  },

  props: {
    title: {
      type: String,
      required: false
    },
    number:{
      required:true,
      type:Number,
      twoWay:true,
    },
    direction:{
      required:true,
      type:Boolean
    }
  },

  computed: {
    // 仅读取，值只须为函数
    subActive: function(){
      var length = this.dataGroup.length;
      return this.number > 0 && false === this.direction;
    },
    addActive: function(){
      var length = this.dataGroup.length;
      return this.number < (length-1) && false === this.direction;
    }
  },

  methods:{
    sub_click: function(){
      if(this.subActive){
        this.number = this.number-1;
      }
    },
    add_click: function(){
      if(this.addActive){
        this.number = this.number+1;
      }
    },
  }
}
</script>

<style lang="scss">

</style>