<template>
  <div class="modal led-size" :class="modalstyle" @click="shutModal()">
    <div>
      <div class="modal-container" @click="stopDefault">
        <div class="modal-head">
          <span>LED尺寸</span>
        </div>

        <div class="modal-body led-size">
          <div class="input-item unit-cm">
              <label>LED宽度：</label>
              <div>
                  <input type="text" name="" placeholder="请输入LED宽度">
              </div>
          </div>
          <div class="input-item unit-cm">
              <label>LED高度：</label>
              <div>
                  <input type="text" name="" placeholder="请输入LED高度">
              </div>
          </div>
        </div>

        <div class="modal-foot">
          <a class="" @click="confirmData">确认</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>


export default{
  components:{

  },

  //下拉数据
  data(){
    return{

    }
  },

  props:['modalstyle'],

  methods:{
    //点击确认按钮事件
    confirmData(){
      this.modalstyle.show = false;
    },

    //点击遮罩事件
    shutModal(){
      this.modalstyle.show = false;
    },

    //点击遮罩组织模态冒泡事件
    stopDefault(event){
      event.stopPropagation();
    }
  }
}
</script>

<style lang="scss">
.modal.led-size
{
  .input-item
  {
    height:40px;
    margin-bottom:10px;
    background-color:#fff;
    padding-top:3px;
    padding-bottom:3px;
    border-radius:3px;

    &:nth-child(2)
    {
      margin-bottom:0;
    }
  }
  
  .modal-body
  {
    padding:10px 10px 0 10px;
  }
  .modal-foot
  {

  }
}
</style>
