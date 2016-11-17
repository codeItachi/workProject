/**
 * Created by wuchuguang on 16-7-5.
 */

let this_component = {
    install(Vue, options){
        Vue.mixin({
            init(){
                this.$options.computed = this.$options.computed || {};
                this.$options.computed['this_component'] = {
                    get(){
                        return this;
                    }
                }
            }
        })
    }
};

export default this_component;