/**
 * Created by wuchuguang on 16-6-30.
 */

import promiseCmd from './promise_cmd';

const cmd_cmd_history = 12001;
const cmd_cmd_agin = 12002;
const cmd_cmd_del= 12003;
const cmd_cmd_refresh_status = 12004;

let cmd ={
    name:"cmd",
    socket:null,

    get_history(cmdPage, cmdNumber){
        return promiseCmd(cmd_cmd_history, {page:cmdPage,options:{pagenumber:cmdNumber}});
    },

    agin(cmdid){
        return promiseCmd(cmd_cmd_agin, {id:cmdid});
    },

    del(cmdid){
        return promiseCmd(cmd_cmd_del, {id:cmdid});
    },
    refresh_status(ids){
        return promiseCmd(cmd_cmd_refresh_status, {ids:ids});
    }
};

export default cmd;