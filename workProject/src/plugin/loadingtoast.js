/**
 * Created by wuchuguang on 16-7-5.
 */

let loading = {
    install(Vue, options){
        Vue.mixin({
            init(){
                let self = this;
                this.$loading = {
                    isopen:false,
                    tip:'正在加载...',
                    startup(tip){
                        this.tip = tip || this.tip;
                        if(!this.isopen){
                            self.$dispatch('loading.init', {component:this,tip:this.tip});
                            this.isopen = true;
                        }
                    },
                    show(tip){
                        this.startup(tip);
                    },
                    close(){
                        if(this.isopen){
                            self.$dispatch('loading.controll', {operate:false});
                            this.isopen = false;
                        }
                    },
                };
            }
        })
    }
};

export default loading;
