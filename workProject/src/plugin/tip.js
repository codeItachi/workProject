/**
 * Created by wuchuguang on 16-7-5.
 */

let tip = {
    install(Vue, options){
        Vue.mixin({
            ready(){
                this.$tip = function(tip){
                    let info = tip.info || "未定义tip内容";
                    let time = tip.time || 1500;
                    let func = tip.func || function(){};
                    this.$dispatch('tip', {info:info,time:time,func:func});
                }
            }
        })
    }
};

export default tip;
