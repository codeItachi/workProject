<template>
  <div class="modal" :class="animatstyle" @click="shut_modal">
    <div>
      <div class="modal-container" @click="stop_pro">
        <div class="modal-head">
          <span>动画方式</span>
        </div>

        <div class="modal-body animation">
          <form class="">
            <drop-down :drop-down-date="current.text.animation.way"></drop-down>
            <speed :speed.sync="current.text.animation.speed" title="速度"></speed>
            <counter :number.sync="current.text.animation.loop" :direction.sync="current.text.animation.direction" title="次数"></counter>
          </form>
        </div>

        <div class="modal-foot">
          <a class=""  v-gesture:tap.stop.prevent="modal_ok">确认</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import counter from './counter';
import speed from './speed';
import dropDown from '../drop-down';


export default{
  components:{
    counter,
    speed,
    dropDown,
  },

  //下拉数据
  data(){
    return{

    }
  },

  props:{
    current:{
      required:true,
      type: Object
    },
    animatstyle:{
      required:true,
      type:Object
    },

  },

  methods:{
    //点击确认按钮事件
    modal_ok:function(){
      this.animatstyle.show = false;
    },

    //点击遮罩事件
    shut_modal:function(){
      this.animatstyle.show = false;
    },

    //点击遮罩组织模态冒泡事件
    stop_pro:function(event){
      event.stopPropagation();
    }
  }
}
</script>
