
/**
 * Created by wuchuguang on 16-6-30.
 */

import promisecmd from './promise_cmd';

const cmd_get_history = 11001;
const cmd_ad_toufang = 11002;
const cmd_ad_agintoufang = 11003;
const cmd_ad_info = 11004;
const cmd_ad_delete = 11005;
const cmd_ad_toufang_result = 11006;
const cmd_ad_share_result = 11010;


let ad = {
    name: 'ad',
    syncs:{
        //cmd_ad_toufang_result
        11050:(msg)=>{
            console.log(msg);
        }
    },
    get_history(page, options){
        return promisecmd(cmd_get_history, {page:page,options:options});
    },

    toufang(args){
        return promisecmd(cmd_ad_toufang, args);
    },

    ad_delete(id){
        return promisecmd(cmd_ad_delete, {id:id});
    },

    agintoufang(id){
        return promisecmd(cmd_ad_agintoufang, {id:id});
    },
    get_result(toufang_id){
        return promisecmd(cmd_ad_toufang_result, {id:toufang_id});
    },

    share_result(toufang_id, sharecode){
        return promisecmd(cmd_ad_share_result, {id:toufang_id, sharecode:sharecode});
    }

};

export default ad;