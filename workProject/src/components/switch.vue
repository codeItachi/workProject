<template>
  <div class="mint-switch">
    <input class="mint-switch-core" type="checkbox" v-model="value">
    <div class="mint-switch-label"><slot></slot></div>
  </div>
</template>

<script>
/**
* mt-switch
 * @module components/switch
 * @desc 切换按钮
 * @param {boolean} [value] - 绑定值，支持双向绑定
 * @param {slot} - 显示内容
 *
 * @example
 * <mt-switch :value.sync="value"></mt-switch>
 */
export default {
  name: 'mt-switch',
  data:function(){
    return {

    };
  },
  components:{

  },
  mothods:{

  },

  props: {
    value: Boolean
  }
};
</script>

<style lang="scss">
  .mint-switch{
    .mint-switch-label{
      margin-left: 10px;
      display: inline-block;
      &:empty {
         margin-left: 0;
       }
    }
    .mint-switch-core{
          appearance: none;
          position: relative;
          height: 32px;
          width: 52px ;
          border: 1px solid grey;
          outline: 0;
          border-radius: 16px;
          box-sizing: border-box;
          background: grey;

      &::after, &::before {
                   content: " ";
                   position: absolute;
                   transition:transform .3s;
                   border-radius: 15px;
                 }

      &::after {
        height: 30px;
        width: 30px;
         background-color: white;
         box-shadow: 0 1px 3px rgba(0, 0, 0, .4);
       }

      &::before {
         height:30px;
         width: 50px;
         background-color: #fdfdfd;
       }

      &:checked {
         border-color: #26a2ff;
         background-color: #26a2ff;

      &::before {
         transform: scale(0);
       }

      &::after {
         transform: translateX(20px);
       }
      }
    }
  }
</style>
