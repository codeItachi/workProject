/**
 * Created by wcg on 16-7-21.
 */


let logger = {
    install(Vue, option){
        Vue.prototype.m_log = function(msg){
            if(option.log) console.log(msg);
        };

        Vue.prototype.m_warn = function(msg){
            if(option.warn) console.warn(msg);
        };

        Vue.prototype.m_error = function(msg){
            if(option.error) console.error(msg);
        };
    }
};

export default logger;