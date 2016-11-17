/**
 * Created by wuchuguang on 16-7-5.
 */

let modal = {
    install(Vue, options){
        Vue.mixin({
            init(){
                this.$modalcb = function(modal){
                    let promise = new Promise((succ,fail)=>{
                        let title = modal.title || "空头";
                        let content = modal.content || '空content';
                        let cancel_title = modal.cancelTitle || '取消';
                        let submit_title = modal.submitTitle || "确定";
                        let cancal_call = modal.cancalCall || function(content){
                                fail(content);
                            };
                        let submit_call = modal.submitCall || function(content){
                                succ(content);
                            };
                        let final = {
                            component:this,
                            title:title,
                            content:content,
                            cancel_title:cancel_title,
                            submit_title:submit_title,
                            cancal_call:cancal_call,
                            submit_call:submit_call,
                        };
                        this.$dispatch('modalcb', final);
                    });
                    return promise;
                }
            }
        })
    }
};

export default modal;
