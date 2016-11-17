/**
 * Created by wuchuguang on 16-6-30.
 */

import promiseCmd from './promise_cmd';

const cmd_system_wx_config = 65001;
const cmd_system_wx_openid_access_token = 65002;
const cmd_system_get_authcode = 65003;
const cmd_system_submit_authcode = 65004;
const cmd_system_wx_openid_refresh_token = 65005;
const cmd_system_wx_openid_check = 65006;
const cmd_system_wx_openid_access_auth = 65007;

let system = {
    name: 'system',
    weixinConfig(){
        return promiseCmd(cmd_system_wx_config, {});
    },

    openid_access_token(code){
        return promiseCmd(cmd_system_wx_openid_access_token, {code:code});
    },

    openid_refresh_token(refresh){
        return promiseCmd(cmd_system_wx_openid_refresh_token, {refresh:refresh});
    },

    openid_access_auth(user){
        return promiseCmd(cmd_system_wx_openid_access_auth, {user:user});
    },

    openid_check(openid, token){
        return promiseCmd(cmd_system_wx_openid_check, {openid:openid,token:token});
    },

    get_auth_code(phone){
        return promiseCmd(cmd_system_get_authcode, {phone:phone});
    },

    submit_auth_code(phone, code){
        return promiseCmd(cmd_system_submit_authcode,{phone:phone, code:code});
    },


};
export default system;
