/**
 * Created by wuchuguang on 16-6-9.
 */

import config from './config';
import system from './message/system';
import socket from './socket';
import store from './store';
import {is_weixin, need_weixin} from './common';
let storeImpl = store('user');

import accountStore from './store/account-store';

import {timestamp, millisecond, request} from './util';
import {loginUrl} from './auth';
const auth_err_not_code = 0;
const auth_err_not_bind = 2;
const auth_err_not_bind2= 3;
const auth_err_not_login= 1;

module.exports = function(router){
    router.map({
        //主页
        //LED编辑
        '/led-edit/:id':{
            name: 'led-edit',
            component: function(resolve){
                return require(['./led-edit'], resolve);
            }
        },
        //登录
        '/login':{
            name: 'login',
            component: function(resolve){
                return require(['./view/login/index'], resolve);
            }
        },
        //登录
        '/browser_login':{
            name: 'browser_login',
            component: function(resolve){
                return require(['./view/browser_login/index'], resolve);
            }
        },
        //account
        '/account':{
            name: 'account',
            component: function(resolve){
                return require(['./view/account/index'], resolve);
            }
        },
        //绑定
        '/bind':{
            name: 'bind',
            component: function(resolve){
                return require(['./view/bind/index'], resolve);
            }
        },
        //解绑
        '/unbind':{
            name: 'unbind',
            component: function(resolve){
                return require(['./view/unbind/index'], resolve);
            }
        },
        //注册
        '/register':{
            name: 'register',
            component: function(resolve){
                return require(['./view/register/index'], resolve);
            }
        },
        // 闪屏
        '/splash-screen':{
            name: 'splash-screen',
            component: function(resolve){
                return require(['./view/splash-screen/index'], resolve);
            }
        },
        //
        '/mannage':{
            name: 'mannage',
            component: function(resolve){
                return require(['./view/mannage/index'], resolve);
            }
        },
        // 忘记密码
        '/forget-password':{
            name: 'forget-password',
            component: function(resolve){
                return require(['./view/forget-password/index'], resolve);
            }
        },
        //添加LED
        '/led-add':{
            name: 'led-add',
            component: function(resolve){
                return require(['./led-add'], resolve);
            },
        },
        //LED详情
        '/led-detail':{
            name: 'led-detail',
            component: function(resolve){
                return require(['./led-detail'], resolve);
            }
        },
        //Air-Kiss
        '/air-kiss':{
            name: 'air-kiss',
            component: function(resolve){
                return require(['./air-kiss'], resolve);
            }
        },
        //Air-Kiss
        '/map':{
            name: 'map',
            component: function(resolve){
                return require(['./map'], resolve);
            }
        },
        //测试
        '/test':{
            name: 'test',
            component: function(resolve){
                return require(['./test'], resolve);
            }
        },
        //绑定账号
        '/bind-account':{
            name: 'bind-account',
            component: function(resolve){
                return require(['./bind-account'], resolve);
            }
        },
        //重构节目列表
        '/new-ad-list':{
            name: 'new-ad-list',
            component: function(resolve){
                return require(['./view/ad-list/index'], resolve);
            }
        },
        //重构LED列表
        '/new-led-list':{
            name: 'new-led-list',
            component: function(resolve){
                return require(['./view/led-list/index'], resolve);
            }
        },
        //历史记录
        '/ad-history':{
            name: 'ad-history',
            component: function(resolve){
                return require(['./view/ad-history/index'], resolve);
            }
        },
        // 引导页
        '/guide':{
            name: 'guide',
            component: function(resolve){
                return require(['./view/guide/index'], resolve);
            }
        },
        // 投放
        '/toufang-intro/:id':{
            name: 'toufang-intro',
            component: function(resolve){
                return require(['./view/toufang-intro/index'], resolve);
            }
        },
        // 图片
        '/program-image':{
            name: 'program-image',
            component: function(resolve){
                return require(['./view/program-image/index'], resolve);
            }
        },
        // 时间
        '/program-time':{
            name: 'program-time',
            component: function(resolve){
                return require(['./view/program-time/index'], resolve);
            }
        },
        // 文字
        '/program-text':{
            name: 'program-text',
            component: function(resolve){
                return require(['./view/program-text/index'], resolve);
            }
        },
        //Demo
        '/demo':{
            name: 'demo',
            component: function(resolve){
                return require(['./demo/index'], resolve);
            }
        },
        // GM
        '/gm':{
            name: 'gm',
            component: function(resolve){
                return require(['./view/gm'], resolve);
            }
        },
        // new-device
        '/new-device':{
            name: 'new-device',
            component: function(resolve){
                return require(['./view/new-device/index'], resolve);
            }
        },
        // need-access
        '/need-weixin':{
            name: 'need-access',
            component: function(resolve){
                return require(['./view/need-weixin/index'], resolve);
            }
        },
        // need-weixin
        '/range':{
            name: 'range',
            component: function(resolve){
                return require(['./components/range/index'], resolve);
            }
        },
        '/share/toufang':{
            name: 'sharetoufang',
            component: function(resolve){
                return require(['./components/share/index.vue'], resolve);
            }
        },
    });

    router.alias({
        '/ad-vertising': '/ad-test'
    });

    //默认List主页
    router.redirect({
        '/':"/guide"
    });



    //注册路由切换前
    router.beforeEach(function (transition) {
        // storeImpl.del('access');
        console.log(millisecond() + ' :beforeEach:from ' + transition.from.name + '; to:' +transition.to.name);
        let urlname = transition.to.name;
        if(urlname == "test"){
            auth_access(transition).then((data)=>{
                data.expires_in = timestamp() + data.expires_in - 20;//20 delay
                storeImpl.set('access', data);
                accountStore.setrelogin(data.relogin);
                socket.login = true;
                socket.bind = true;
                setTimeout(()=>{transition.next()},0);
            }).catch((fail)=>{
                switch (fail){
                    case auth_err_not_code:
                        storeImpl.del('access');
                        // window.location.href = "http://app.popled.cn/#!/test";
                        loginUrl(window.location.href);
                        break;
                    case auth_err_not_bind:
                        switch (urlname){
                            case 'bind':
                                transition.next();
                                break;
                            case 'login':
                                transition.next();
                                break;
                            default:
                                transition.redirect('/login');
                                break;
                        }
                        break;
                    case auth_err_not_bind2:
                        switch (urlname){
                            case 'bind':
                                transition.next();
                                break;
                            case 'account':
                                transition.next();
                                break;
                            default:
                                transition.redirect('/account');
                                break;
                        }
                        break;
                    default:
                        storeImpl.del('access');
                        loginUrl(window.location.href);
                        break;
                };
                return;

            });
            return;
        }
        if(config.debug_model()){
            console.log('debug_model');
            transition.next();
            return ;
        }
        if(transition.from.name == transition.to.name){
            console.log('from to same');
            transition.next();
            return;
        }
        if(need_weixin(urlname) && !is_weixin){
            transition.redirect({path:'/need-weixin', query:{oldpath:urlname,query:JSON.stringify(transition.to.query),params:JSON.stringify(transition.to.params)}});
            return;
        }
        if(socket.login && socket.bind){
            transition.next();
            return;
        }
        if(!is_weixin && (!socket.bind || !socket.login)){
            console.log('not weixin browser');
            if(transition.to.name != 'browser_login'){
                transition.redirect('/browser_login');
            }else{
                transition.next();
            }
            return;
        }

        if(socket.login){
            transition.redirect('/login');
            return;
        }

        let is_need = is_need_auth(urlname);
        console.log('urlname: ' + urlname + '; is_need: ' + is_need);
        switch (is_need){
            case need_auth_status_false:
                transition.next();
                break;
            case need_auth_status_must:
                auth_access(transition).then((data)=>{
                    data.expires_in = timestamp() + data.expires_in - 20;//20 delay
                    storeImpl.set('access', data);
                    accountStore.setrelogin(data.relogin);
                    socket.login = true;
                    socket.bind = true;
                    setTimeout(()=>{transition.next()},0);
                }).catch((fail)=>{
                    switch (fail){
                        case auth_err_not_code:
                            storeImpl.del('access');
                            // window.location.href = "http://app.popled.cn/#!/test";
                            loginUrl(window.location.href);
                            break;
                        case auth_err_not_bind:
                            switch (urlname){
                                case 'bind':
                                    transition.next();
                                    break;
                                case 'login':
                                    transition.next();
                                    break;
                                default:
                                    transition.redirect('/login');
                                    break;
                            }
                            break;
                        case auth_err_not_bind2:
                            switch (urlname){
                                case 'bind':
                                    transition.next();
                                    break;
                                case 'account':
                                    transition.next();
                                    break;
                                default:
                                    transition.redirect('/account');
                                    break;
                            }
                            break;
                        default:
                            storeImpl.del('access');
                            loginUrl(window.location.href);
                            break;
                    };
                    return;

                });
                return;
            case need_auth_status_refresh:
                auth_access(transition).then((data)=>{
                    data.expires_in = timestamp() + data.expires_in - 20;//20 delay
                    storeImpl.set('access', data);
                    accountStore.setrelogin(data.relogin);
                    socket.login = true;
                    socket.bind = true;
                    transition.next();
                }).catch((fail)=>{
                    switch (fail){
                        case auth_err_not_code:
                            storeImpl.del('access');
                            loginUrl(window.location.href);
                            break;
                        case auth_err_not_bind:
                            switch (urlname){
                                case 'bind':
                                    transition.next();
                                    break;
                                case 'login':
                                    transition.next();
                                    break;
                                default:
                                    transition.redirect('/login');
                                    break;
                            }
                            break;
                        case auth_err_not_bind2:
                            switch (urlname){
                                case 'bind':
                                    transition.next();
                                    break;
                                case 'account':
                                    transition.next();
                                    break;
                                default:
                                    transition.redirect('/account');
                                    break;
                            }
                            break;
                        default:
                            storeImpl.del('access');
                            loginUrl(window.location.href);
                            break;
                    }

                });
                return;
            case need_auth_status_ok:
                auth_pass(transition).then((data)=>{
                    socket.login = true;
                    socket.bind = true;
                    transition.next();
                }).catch((fail)=>{
                    switch (fail){
                        case auth_err_not_code:
                            loginUrl(window.location.href);
                            break;
                        case auth_err_not_bind:
                            switch (urlname){
                                case 'bind':
                                    transition.next();
                                    break;
                                case 'login':
                                    transition.next();
                                    break;
                                default:
                                    transition.redirect('/login');
                                    break;
                            }
                            break;
                        case auth_err_not_bind2:
                            switch (urlname){
                                case 'bind':
                                    transition.next();
                                    break;
                                case 'account':
                                    transition.next();
                                    break;
                                default:
                                    transition.redirect('/account');
                                    break;
                            }
                            break;
                        default:
                            storeImpl.del('access');
                            loginUrl(window.location.href);
                            break;
                    }
                });
                return;
            default:
                console.error("error: auth_check_state: " + is_need);
                if(urlname == 'login'){
                    transition.next();
                }else{
                    transition.redirect({path:'/login'});
                }
                return;
        }

    });


    //注册路由切换后
    router.afterEach(function (transition) {
        //console.log('成功浏览到: ' + transition.to.path)
    });
    router.map({
        '*':{
            name: 'not-found',
            component: function(resolve){
                return require(['./not-found'], resolve);
            }
        },
    });
};

const need_auth_urlname = [
    'program-text',
    'program-image',
    'program-time',
    'ad-history',
    'led-add',
    'account',
    'login',
    'bind',
    'unbind',
    'new-led-list',
    'new-ad-list',
    'led-detail',
    'led-edit'
];
const need_auth_status_false = 0;
const need_auth_status_must = 1;
const need_auth_status_refresh = 2;
const need_auth_status_ok = 3;
function is_need_auth(urlname) {
    let isNeed = need_auth_urlname.indexOf(urlname) > -1;
    console.log('isNeed:' + isNeed);
    if(!isNeed) return need_auth_status_false;
    let user = storeImpl.get("access");
    if(!user) return need_auth_status_must;
    if(user.expires_in > timestamp()){
        return need_auth_status_ok;
    }else{
        return need_auth_status_must;
    }
}
function auth_pass(transition) {
    let promise = new Promise((success, fail)=>{
        let user = storeImpl.get("access");
        system.openid_access_auth(user).then((result)=>{
            success(result);
        }).catch(code=>{
            fail(code);
        });
    });
    return promise;
}
function auth_access(transition) {
    let promise = new Promise((success, fail) =>{
        let query = transition.to.query || {};
        if(query.code){
            socket.ready = () => {
                let code = query.code;
                system.openid_access_token(code).then((result)=>{
                    success(result);
                }).catch((code)=>{
                    fail(code);
                });
            }

        }else{
            fail(auth_err_not_code);
        }
    });

    return promise;
}

function auth_refresh(transftion) {
    let promise = new Promise((succ, fail)=>{
        socket.ready = () => {
            let user = storeImpl.get("access");
            if(!user) return need_auth_status_must;
            let refresh = user.refresh_token;
            system.openid_refresh_token(refresh).then((result)=>{
                if(result.access_token && result.expires_in){
                    success(result);
                }else{
                    fail(result);
                }
            }).catch((code)=>{
                fail(code);
            });
        }
    });
    return promise;
}