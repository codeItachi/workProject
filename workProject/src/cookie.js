/**
 * Created by wuchuguang on 16-6-24.
 */
export default {
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