/**
 * Created by wuchuguang on 16-6-30.
 */

import promiseCmd from './promise_cmd';

const cmd_account_login = 10000;
const cmd_account_bind_account = 10004;
const cmd_account_unbind_account = 10005;
const cmd_account_switch = 10006;
const cmd_account_quit = 10007;

const cmd_account_register = 10010;
const cmd_account_findpass = 10011;
const cmd_account_list = 10012;
const cmd_account_browser_login = 10013;
const cmd_account_relogin = 10014;

let account ={
    name:"account",
    socket:null,
    register(info){
        return promiseCmd(cmd_account_register, info);
    },
    findpass(info){
        return promiseCmd(cmd_account_findpass, info);
    },
    bind_account(info){
        return promiseCmd(cmd_account_bind_account, info);
    },
    unbind(account){
        return promiseCmd(cmd_account_unbind_account, {account:account});
    },
    switchit(account){
        return promiseCmd(cmd_account_switch, {account:account});
    },
    quit(account){
        return promiseCmd(cmd_account_quit, {account:account});
    },
    login(login){
        return promiseCmd(cmd_account_login, login);
    },
    get_list(){
        return promiseCmd(cmd_account_list, {});
    },
    browser_login(info){
        return promiseCmd(cmd_account_browser_login, info);
    },
    relogin(relogin){
        return promiseCmd(cmd_account_relogin, relogin);
    }
};

export default account;