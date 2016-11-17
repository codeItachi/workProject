<template>
  <submit-tip :work="work" :success="success", :fail="fail" >
    确定
  </submit-tip>
</template>

<style lang="scss">
  @import "./layout.scss";
</style>

<script>
import submitTip from './submit-tip';

export default {
  components: {
    submitTip,
  },

  data(){
    var self = this;
    return {
      work: {
        show: true,
        text: "正在提交",
        timeout: 3000,
        func() {
          // self.$socket.sendCmd(protocolNo,protocolData, function(cmd, data){
          //     self.$broadcast('reply', data);
          // });
          setTimeout(function() {
            self.$broadcast('reply', {
              result: "success",
              data: "none"
            });
          }, 3000);
        }
      },
      success: {
        show: true,
        time: 2000,
        text: "提交成功",
        func() {
          console.log("success");
          //history.back();
        }
      },

      fail: {
        show: true,
        text: "提交失败",
        func() {
          console.log("fail");
          //history.back();
        }
      },
    };
  },

  methods:{
    compile(result) {
      this.show = true;
      this.text = "----------";
      return true;
    },
  }
}
</script>