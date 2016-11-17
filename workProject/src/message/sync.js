/**
 * Created by wuchuguang on 16-7-1.
 */


import Dict from '../utils/dict';
window.subscribes = new Dict();

exports.syncAdd = function(cmd, obj){
    window.subscribes.store(cmd, obj);
};

exports.syncGet = function(cmd){
    return window.subscribes.find(cmd);
}
