/**
 * [description]
 * @return {[type]} [description]
 */
;(function () {
    function install (Vue, prefix) {
        /**
         * 缓存cookie默认存储一个月
         * @type {Object}
         */
        Vue.mixin({
            init:function() {
                if (this.$options.hasOwnProperty("cache")) {
                    var len = this.$options.cache.length;
                    this.data = [];
                    for(var i=0; i < len; i++){
                        var cacheName = this.$options.cache[i];
                        this.$options.computed = this.$options.computed || {};
                        this.$options.computed[cacheName] = {
                            get(){
                                this.data[cacheName] = this.store.get(cacheName);
                                return this.data[cacheName];
                            },
                            set(val){
                                console.log("cache:"+cacheName+"; newval:" + val);
                                this.store.set(cacheName, val);
                                this.data[cacheName] = val;
                            }

                        };


                    }
                    console.log(this.$options.computed);
                }
            }
        });
        var cookie = {
            set: function (key, val, time, domain) {
                var exp = new Date();
                var t = !time ? (exp.getTime() + 2592000000) : (exp.getTime() + time);
                exp.setTime(t);

                if (domain === true) {
                    /* no-useless-escape */
                    // .xx.com
                    domain = document.domain.replace(/[a-zA-Z]+/, '');
                }
                var extr = domain ? ';domain=' + domain + ';path=/' : '';
                document.cookie = key + '=' + escape(val) + ';expires=' + exp.toGMTString() + extr
            },
            get: function (key) {
                var reg = new RegExp('(^| )' + key + '=([^;]*)(;|$)');
                var arr = document.cookie.match(reg);
                return arr ? unescape(arr[2]) : '';
            },
            del: function (key, domain) {
                var exp = new Date();
                exp.setTime(exp.getTime() - 1);
                var cval = this.get(key);

                if (domain === true) {
                    domain = document.domain.replace(/[a-zA-Z]+/, '');
                }
                var extr = domain ? ';domain=' + domain + ';path=/' : '';
                if (cval) document.cookie = key + '=1;expires=' + exp.toGMTString() + extr;
            },
            clear: function () {
                var keys = document.cookie.match(/[^ =;]+(?==)/g);
                if (!keys || !keys.length) return;
                for (var i = keys.length; i--;) {
                    document.cookie = keys[i] + '=0;expires=Thu, 01 Jan 1970 00:00:00 GMT;';
                }
            }
        };

        /**
         * 兼容localStorage和cookie
         * @type {Object}
         */
        var LocalStore = function (prefix) {
            this.prefix = prefix;

            // 设置数据
            this.set = function (key, value, time, domain) {
                if(value instanceof Object){
                    value = JSON.stringify(value);
                }
                if(Array.isArray(value)){
                    value = JSON.stringify(value);
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
            this.get = function (key) {
                key = this.prefix + '_' + key;
                return window.localStorage.getItem(key) || cookie.get(key);
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
        var localStore = new LocalStore(prefix);

        Vue.prototype.store = localStore;
        window.$store = localStore;
        localStore = null;
    }

    if (typeof exports === 'object') {
        module.exports = install;
    } else if (typeof window.define === 'function' && window.define.amd) {
        window.define([], function () { return install });
    } else if (window.Vue) {
        window.Vue.use(install);
    }
})();