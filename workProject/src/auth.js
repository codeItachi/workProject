/**
 * Created by wuchuguang on 16-6-16.
 */

import config from './config';
import socket from './socket';
const auth_url = 'http://app.popled.cn/!#/login';

exports.loginUrl = function (redictUrl){
    redictUrl = encodeURIComponent(redictUrl)
    const wxurl = "https://open.weixin.qq.com/connect/oauth2/authorize?appid="+config.appid+"&redirect_uri="+redictUrl+"&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect";
    window.location.href = wxurl;

};

exports.loginUrlStr = function (redictUrl){
    redictUrl = encodeURIComponent(redictUrl)
    const wxurl = "https://open.weixin.qq.com/connect/oauth2/authorize?appid="+config.appid+"&redirect_uri="+redictUrl+"&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect";
    return wxurl;
};
