/**
 * Created by wuchuguang on 16-7-5.
 */

let toast = {
    install(Vue, options){
        Vue.mixin({
            init(){
                this.$toast = function(toast){
                    let text = toast.text || "未定义toast内容";
                    let time = toast.time || 1500;
                    let type = toast.type || 'text';
                    let func = toast.func || function(){};
                    this.$dispatch('toast', {component:this,text:text,time:time,type:type,func:func});
                }
            }
        })
    }
};

export default toast;
