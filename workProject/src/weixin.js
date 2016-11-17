/**
 * Created by wuchuguang on 16-6-22.
 */

import sign from './sign';
import system from './message/system';
// import wx from 'we-jssdk'
export default {
    config: null,
    isInit : false,

    menuQQ:'menuItem:share:qq',
    menuWeibo:'menuItem:share:weiboApp',
    menuPengyouquan:'menuItem:share:timeline',
    menuPengyou:'menuItem:share:appMessage',

    exe(func){
        if(this.isInit){
            func();
        }else{
            this.wxinit(func);
        }
    },

    wxinit(func){
        system.weixinConfig().then((data)=>{
            this.config = {
                appid : data.appid,
                jsapi_ticket: data.ticket,
                url : window.location.href.split('#')[0]

            };
            console.log('config url :' + this.config.url);
            this.config.signResult = sign(this.config.jsapi_ticket, this.config.url);
            wx.ready(()=>{
                this.isInit = true;
                console.log('微信sdk成功!');
                console.log(...arguments);
                func && func(this.config);
            });
            wx.error((res)=>{
                console.log(res);
            });
            let settings = {
                appId: this.config.appid,
                timestamp: parseInt(this.config.signResult.timestamp),
                nonceStr: this.config.signResult.nonceStr,
                signature: this.config.signResult.signature,
                jsApiList: [
                    'openWXDeviceLib',
                    'configWXDeviceWiFi',
                    'checkJsApi',
                    'onMenuShareTimeline',
                    'onMenuShareAppMessage',
                    'onMenuShareQQ',
                    'onMenuShareWeibo',
                    'hideMenuItems',
                    'showMenuItems',
                    'hideAllNonBaseMenuItem',
                    'showAllNonBaseMenuItem',
                    'translateVoice',
                    'startRecord',
                    'stopRecord',
                    'onRecordEnd',
                    'playVoice',
                    'pauseVoice',
                    'stopVoice',
                    'uploadVoice',
                    'downloadVoice',
                    'chooseImage',
                    'previewImage',
                    'uploadImage',
                    'downloadImage',
                    'getNetworkType',
                    'openLocation',
                    'getLocation',
                    'hideOptionMenu',
                    'showOptionMenu',
                    'closeWindow',
                    'scanQRCode',
                    'chooseWXPay',
                    'openProductSpecificView',
                    'addCard',
                    'chooseCard',
                    'openCard'
                ]
            };
            wx.config(settings);

        }).catch((code) =>{
        });



    },
    scanQRCode(needResult, succ, finallydo){
        needResult = needResult ? 1 : 0;
        wx.scanQRCode({
            needResult: needResult, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
            scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
            success: function (res) {
                if(needResult){
                    succ(res.resultStr);
                }
            },
            complete(){
                finallydo && finallydo();
            },
            fail(res){
                console.log('scanQRCode:')
                console.log(res)
            }
        });
    },
    pay(func){
        wx.chooseWXPay({
            timestamp: timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
            nonceStr: '', // 支付签名随机串，不长于 32 位
            package: '', // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
            signType: '', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
            paySign: '', // 支付签名
            success: (res)=> {
                // 支付成功后的回调函数
                func(res);
            }
        })
    },
    previewImage(current,urls){
        wx.previewImage({
            current: current, // 当前显示图片的http链接
            urls: urls // 需要预览的图片http链接列表
        });
    },
    chooseImage(options){
        options = options || {};
        options.count = options.count || 1;
        let promse = new Promise((success, fail)=>{
            wx.chooseImage({
                count: options.count,
                success(res) {
                    var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                    success(localIds);
                }
            });
        });
        return promse;

    },
    uploadImage(Ids, func){
        console.log("uploadImage");
        var sids = [];
        var lenght = Ids.lenght;
        var upload = function(index){
            Ids[index] && wx.uploadImage({
                localId: Ids[index], // 需要上传的图片的本地ID，由chooseImage接口获得
                isShowProgressTips: 1, // 默认为1，显示进度提示
                success: function (res) {
                    var serverId = res.serverId; // 返回图片的服务器端ID
                    sids.push({id:Ids[index],sid:serverId});
                    if(sids.length < lenght){
                        func({event:'upone',data:{id:Ids[index],sid:serverId}});
                        upload(index+1);
                    }else{
                        func({event:'upend',data:sids});
                    }
                }
            });
        };
        upload(0);

    },
    downloadImage(){
        wx.downloadImage({
            serverId: '', // 需要下载的图片的服务器端ID，由uploadImage接口获得
            isShowProgressTips: 1, // 默认为1，显示进度提示
            success: function (res) {
                var localId = res.localId; // 返回图片下载后的本地ID
            }
        });
    },
    networkType(func){
        wx.getNetworkType({
            success (res) {
                func && func(res.networkType);// 返回网络类型2g，3g，4g，wifi
            }
        });
    },
    getLocation(func){
        wx.getLocation({
            type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
            success: function (res) {
                var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                var speed = res.speed; // 速度，以米/每秒计
                var accuracy = res.accuracy; // 位置精度
                func({lat:latitude,lng:longitude,speed:speed,accuracy:accuracy});
            },
            fail(res){
                console.log('getLocation fail');
                console.log(res);
            }
        });
    },
    sharepengyouqiang(c){
        wx.error((res)=>{
            console.log(res);
        });
        console.log('pengyouqiang');
        wx.onMenuShareTimeline({
            title: c.title, // 分享标题
            link: c.link, // 分享链接
            imgUrl: 'http://app.popled.cn/static/logo.png', // 分享图标
            success: function () {
                // 用户确认分享后执行的回调函数
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            },
            complete(res){
                console.log(res);
            }
        });
        console.log('pengyouqiang end');
    },
    sharepengyou(c){
        wx.error((res)=> {
            console.log(res);
        });
        console.log('pengyou');
        wx.onMenuShareAppMessage({
            title: c.title, // 分享标题
            desc: c.desc, // 分享描述
            link: c.link, // 分享链接
            imgUrl: 'http://app.popled.cn/static/logo.png', // 分享图标
            type: c.type | 'link', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function () {
                // 用户确认分享后执行的回调函数
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            },
            complete(res){
                console.log(res);
            }
        });
    },
    hideMenuItems(lists){
        wx.hideMenuItems({
            menuList: lists // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
        });
    },

    showMenuItems(lists){
        wx.showMenuItems({
            menuList: lists // 要显示的菜单项，所有menu项见附录3
        });
    },

};
