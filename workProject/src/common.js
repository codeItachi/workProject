import weixinpath from './config/weixin_path';

function is_weixin(){
    var ua = navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i)=="micromessenger") {
        return true;
    } else {
        return false;
    }
}

let array_remove = function(val, func){
    let remove = [];
    this.forEach((ele)=>{
        if(func(val, ele)){
            remove.push(ele);
        }
    });
    remove.forEach(ele=>{
        this.$remove(ele);
    });
};

let array_exist = function (val, func) {
    let len = this.length;
    for(let i = 0; i < len; i++){
        if(func(val,this[i])){
            return true;
        }
    }
    return false;
};


module.exports = {
    is_weixin: is_weixin(),
    array_remove:array_remove,
    array_exist:array_exist,
    need_weixin(url){
        return weixinpath.indexOf(url) > -1;
    }
};