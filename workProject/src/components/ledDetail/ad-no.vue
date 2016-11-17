<template>
    <div class="no-result" v-if="is_not_ads">
        暂无广告
    </div>
    <div v-else v-for="item in ads | orderBy 'etime' -1 ">
        <div class="ad-set">
          <div>
              <div class="imgs">
                  <div>
                      <span class="s1">{{$index + 1}}</span>
                      <span class="s2">
                          <img :src="item.program | ftype2image">
                      </span>
                  </div>
              </div>
              <div class="con">
                  <div>
                      <span>广告：{{item.program | filterno}}</span>
                      <!-- <span class="ad-satus" :class="item.status | ad_status_class">{{item.status | ad_status_tag }}</span> -->
                  </div>
                  <span class="ad-word">{{item.program | ledcontent}}</span>
              </div>
          </div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import vueGesture from 'vue-gesture';
Vue.use(vueGesture);
import program from '../../message/program.js';
import adMessage from '../../message/advertisement';
import {type2image,program2value} from '../../view/ad-list/common.js';

Vue.filter('ftype2image', function(program){

    program = JSON.parse(program);
    return type2image(program.content.type);
});
Vue.filter('ledcontent',function(program){
    program = JSON.parse(program);
    return program2value(program);
})
Vue.filter('filterno',function(program){
    program = JSON.parse(program);
    return program.no;
})
export default {
  data(){
    return {
      opened: null,
      lists: [],
    }
  },
    ready(){
    },
  components:{
    //sliderMenu
  },
  methods:{
    open(index){
        this.opened = index ;
    },
    infoPut(sid,pid){
        adMessage.toufang({sids: [sid], pids:[pid]}).then(oid=>{
                    this.$toast({text:'提交成功',time:2000,func:()=>{
                        this.$router.replace({'name':'toufang-intro',params:{id:oid}});
                    }});
                });
    },
    ad_delete(id){
      console.log(id)
      var len = this.ads.length;
      for(var i=0; i<len;i++){
          if(this.ads[i].id == id){
              adMessage.ad_delete(id).then((intro) =>{
                  this.$toast({text:intro, time:1000,func:()=>{
                      this.ads.$remove(this.ads[i]);
                  }})
              }).catch((code) =>{
                  this.$toast({text:code, time: 3000});
              });
              return;
          }
      }
    }
  },
    computed:{
        is_not_ads(){
            return this.ads.length <= 0;
        }
    },
    props:{
      ads:{
          required:true,
          type:Array
      }
    }
}
</script>