/**
 * Created by wuchuguang on 16-7-5.
 */

let modal = {
    install(Vue, options){
        Vue.mixin({
            ready(){
                this.$modal = function(modal){
                    let modalTempl = modal.component || new Error("模态必须传入component");
                    this.$dispatch('modal', {component:this,template:modalTempl});
                }
            }
        })
    }
};

export default modal;

xxx(){
    this.$modal(
        {show:this.xxxx.status,component:require("./modal/template.vue")}
        );
}
