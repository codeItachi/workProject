/**
 * Created by wuchuguang on 16-6-13.
 */
import cookie from './cookie';

/**
 * 兼容localStorage和cookie
 * @type {Object}
 */
var LocalStore = function (prefix) {
    this.prefix = prefix;

    // 设置数据
    this.set = function (key, value, time, domain) {
        if(value instanceof Object){
            value = "$JSON:"+JSON.stringify(value);
        }
        if(Array.isArray(value)){
            value = "$JSON:"+JSON.stringify(value);
        }
        key = this.prefix + '_' + key;

        if (!window.localStorage) {
            if (value.length <= 256) cookie.set(key, value, time, domain);
            return
        }
        try {
            window.localStorage.setItem(key, value)
        } catch (e) {
            window.console.warn('Your browser not support localStorage. ' + e);
            if (value.length <= 256) {
                cookie.set(key, value, time, domain);
            } else {
                window.alert('Your browser not support localStorage. Please check set browser private model.')
            }
        }
    };

    // 获取数据
    this.get = function (key, def) {
        key = this.prefix + '_' + key;
        let data = window.localStorage.getItem(key) || cookie.get(key);
        if(data == '' || data == null || data == undefined){
            return def;
        }else{
            let match = /^\$JSON:(.*)$/.exec(data);
            if(match){
                return JSON.parse(match[1]);
            }else{
                return data;
            }
        }
    };

    // 删除数据
    this.del = function (key, domain) {
        key = this.prefix + '_' + key;
        window.localStorage.removeItem(key);
        cookie.del(key, domain)
    };

    // 清除数据
    this.clear = function () {
        window.localStorage.clear();
        cookie.clear()
    };
};


export default function store (prefix){
    return new LocalStore(prefix)
};
