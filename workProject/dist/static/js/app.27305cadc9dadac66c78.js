webpackJsonp([33,31],{0:function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}var i=n(144),s=o(i),u=n(3),c=o(u),a=n(77),r=o(a),l=n(309),d=o(l),f=n(307),p=o(f),h=n(312),m=o(h),g=n(311),_=o(g),b=n(775),v=o(b),w=n(313),y=o(w),x=n(315),k=o(x),M=n(310),j=o(M),S=n(314),C=o(S),T=n(308),O=o(T),I=n(689),P=o(I),q=n(316),$=o(q),D=n(49),A=o(D),R=n(18),E=o(R);window.onload=function(){console.log("html onload...")},c["default"].use(d["default"],{log:!0,warn:!0,error:!0}),c["default"].use(p["default"]),c["default"].use(m["default"]),c["default"].use(_["default"]),c["default"].use(v["default"]),c["default"].use(y["default"]),c["default"].use(k["default"]),c["default"].use(j["default"]),c["default"].use(C["default"]),c["default"].use(O["default"]);var U=new v["default"]({saveScrollPosition:!0,transitionOnLoad:!0});(0,$["default"])(U),E["default"].init=function(){s["default"].debug_model()&&A["default"].login({openid:"oC5k_wCvQw0DKl6Kjo0Bo1ylgml8",accountid:"18335830798"}).then(function(e){s["default"].log_debug&&console.log("result:"+e)}),U.is_start||(U.is_start=!0,U.start(P["default"],"#app"))},E["default"].reconnect=function(e){console.log("reconnect --> "+e);var t=r["default"].getrelogin();return t?A["default"].relogin(t).then(function(e){r["default"].setrelogin(e)})["catch"](function(e){s["default"].log_debug&&console.log("fail............")}):s["default"].log_debug&&console.log("fail............"),!0},E["default"].connect("ws://"+s["default"].host+":8081"),E["default"].debug=s["default"].socket,s["default"].log_debug&&console.log("link:"+s["default"].host)},11:function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var i=n(68),s=o(i),u=n(18),c=o(u);t["default"]=function(e,t){var n=new s["default"](function(n,o){c["default"].sendCmd(e,t,function(e,t){"success"==t.result?n(t.data):o(t.code)})});return n}},18:function(module,exports,__webpack_require__){"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(exports,"__esModule",{value:!0});var _defineProperties=__webpack_require__(343),_defineProperties2=_interopRequireDefault(_defineProperties),_stringify=__webpack_require__(67),_stringify2=_interopRequireDefault(_stringify),_typeof2=__webpack_require__(130),_typeof3=_interopRequireDefault(_typeof2),_map=__webpack_require__(129),_map2=_interopRequireDefault(_map),_sync=__webpack_require__(145);__webpack_require__(317);var reconnect_time=3e3;WebSocket.prototype.cb=new _map2["default"],WebSocket.prototype.sync_cbs=new _map2["default"],WebSocket.prototype.index=0,WebSocket.prototype.nextID=function(){return this.index++,this.index},WebSocket.prototype.sendCmd=function(e,t,n){var o=Session.getCookies();if(n){var i=this.nextID();this.cb.set(i,n),socket.debug&&console.log("semd "+e+" callback "+("undefined"==typeof n?"undefined":(0,_typeof3["default"])(n))+" msg "+(0,_stringify2["default"])(t)),this.send((0,_stringify2["default"])({cmd:e,session:o,msg:t,callback:i}))}else this.send((0,_stringify2["default"])({cmd:e,session:o,msg:t}));return!0};var socket={_url:null,_ready:null,weboskcet:null,_websocket:null,clearFlag:null,connect_count:0,connect:function connect(url){var _this=this;this.clearFlag=null,url=url||this._url,this._url=url,socket.debug&&console.log("onConnect before :"+url),this._websocket=new WebSocket(url),socket.debug&&console.log("onConnect after"),this._websocket.onopen=function(){_this.connect_count+=1,_this.isOpen=_this._websocket,_this.init()},this._websocket.onmessage=function(event){var json=eval("("+event.data+")");if(socket.debug&&console.log("recv:"),socket.debug&&console.log(json),Session.clear(),json&&json.session)if(json.session instanceof Array)json.session.forEach(function(e){Session.set(e.name,e.value)});else for(var ses in json.session)Session.set(ses,json.session[ses]);else socket.debug&&console.error("json.msg error:"),socket.debug&&console.error(json.msg);if(json.callback){var callback=_this._websocket.cb.get(json.callback);callback&&callback(json.cmd,json.msg),_this._websocket.cb["delete"](json.callback)}else{socket.debug&&console.log("sync recv:"+json.cmd);var callbacks=(0,_sync.syncGet)(json.cmd);callbacks&&callbacks instanceof Array&&callbacks.forEach(function(e){var t=e.component,n=e.func;n.call(t,json.msg)})}},this._websocket.onerror=function(){socket.debug&&console.log("onError")},this._websocket.onclose=function(){socket.debug&&console.log("onClose"),_this.isOpen=null}},sendCmd:function(e,t,n){return socket.debug&&console.log("is_open :"+this.isOpen),this.isOpen?(this._websocket.sendCmd(e,t,n),!0):(socket.debug&&console.log("sendCmd fail socket not open"),setTimeout(function(){n(e,{result:"error",code:"timeout"})},0),!1)},sendCmdPromise:function(e,t){return this.isOpen?(this._websocket.sendCmdPromise(e,t),!0):(socket.debug&&console.log("sendCmd fail socket not open"),!1)}};(0,_defineProperties2["default"])(socket,{isOpen:{get:function(){return null!=socket.weboskcet},set:function(e){socket.weboskcet=e,e?(socket.connect_count>1&&socket.reconnect(socket.connect_count),socket._ready&&socket._ready()):(socket.clearFlag&&clearTimeout(socket.clearFlag),socket.clearFlag=setTimeout(function(){socket.connect()},reconnect_time))}},ready:{get:function(){return socket._ready},set:function(e){socket._ready=e,socket.isOpen&&e()}}}),exports["default"]=socket},49:function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var i=n(11),s=o(i),u=1e4,c=10004,a=10005,r=10006,l=10007,d=10010,f=10011,p=10012,h=10013,m=10014,g={name:"account",socket:null,register:function(e){return(0,s["default"])(d,e)},findpass:function(e){return(0,s["default"])(f,e)},bind_account:function(e){return(0,s["default"])(c,e)},unbind:function(e){return(0,s["default"])(a,{account:e})},switchit:function(e){return(0,s["default"])(r,{account:e})},quit:function(e){return(0,s["default"])(l,{account:e})},login:function(e){return(0,s["default"])(u,e)},get_list:function(){return(0,s["default"])(p,{})},browser_login:function(e){return(0,s["default"])(h,e)},relogin:function(e){return(0,s["default"])(m,e)}};t["default"]=g},62:function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var i=n(68),s=o(i),u=n(318),c=o(u),a=n(86),r=o(a);t["default"]={config:null,isInit:!1,menuQQ:"menuItem:share:qq",menuWeibo:"menuItem:share:weiboApp",menuPengyouquan:"menuItem:share:timeline",menuPengyou:"menuItem:share:appMessage",exe:function(e){this.isInit?e():this.wxinit(e)},wxinit:function(e){var t=this,n=arguments;r["default"].weixinConfig().then(function(o){t.config={appid:o.appid,jsapi_ticket:o.ticket,url:window.location.href.split("#")[0]},console.log("config url :"+t.config.url),t.config.signResult=(0,c["default"])(t.config.jsapi_ticket,t.config.url),wx.ready(function(){var o;t.isInit=!0,console.log("微信sdk成功!"),(o=console).log.apply(o,n),e&&e(t.config)}),wx.error(function(e){console.log(e)});var i={appId:t.config.appid,timestamp:parseInt(t.config.signResult.timestamp),nonceStr:t.config.signResult.nonceStr,signature:t.config.signResult.signature,jsApiList:["openWXDeviceLib","configWXDeviceWiFi","checkJsApi","onMenuShareTimeline","onMenuShareAppMessage","onMenuShareQQ","onMenuShareWeibo","hideMenuItems","showMenuItems","hideAllNonBaseMenuItem","showAllNonBaseMenuItem","translateVoice","startRecord","stopRecord","onRecordEnd","playVoice","pauseVoice","stopVoice","uploadVoice","downloadVoice","chooseImage","previewImage","uploadImage","downloadImage","getNetworkType","openLocation","getLocation","hideOptionMenu","showOptionMenu","closeWindow","scanQRCode","chooseWXPay","openProductSpecificView","addCard","chooseCard","openCard"]};wx.config(i)})["catch"](function(e){})},scanQRCode:function(e,t,n){e=e?1:0,wx.scanQRCode({needResult:e,scanType:["qrCode","barCode"],success:function(n){e&&t(n.resultStr)},complete:function(){n&&n()},fail:function(e){console.log("scanQRCode:"),console.log(e)}})},pay:function(e){wx.chooseWXPay({timestamp:timestamp,nonceStr:"","package":"",signType:"",paySign:"",success:function(t){e(t)}})},previewImage:function(e,t){wx.previewImage({current:e,urls:t})},chooseImage:function(e){e=e||{},e.count=e.count||1;var t=new s["default"](function(t,n){wx.chooseImage({count:e.count,success:function(e){var n=e.localIds;t(n)}})});return t},uploadImage:function(e,t){console.log("uploadImage");var n=[],o=e.lenght,i=function s(i){e[i]&&wx.uploadImage({localId:e[i],isShowProgressTips:1,success:function(u){var c=u.serverId;n.push({id:e[i],sid:c}),n.length<o?(t({event:"upone",data:{id:e[i],sid:c}}),s(i+1)):t({event:"upend",data:n})}})};i(0)},downloadImage:function(){wx.downloadImage({serverId:"",isShowProgressTips:1,success:function(e){e.localId}})},networkType:function(e){wx.getNetworkType({success:function(t){e&&e(t.networkType)}})},getLocation:function(e){wx.getLocation({type:"wgs84",success:function(t){var n=t.latitude,o=t.longitude,i=t.speed,s=t.accuracy;e({lat:n,lng:o,speed:i,accuracy:s})},fail:function(e){console.log("getLocation fail"),console.log(e)}})},sharepengyouqiang:function(e){wx.error(function(e){console.log(e)}),console.log("pengyouqiang"),wx.onMenuShareTimeline({title:e.title,link:e.link,imgUrl:"http://app.popled.cn/static/logo.png",success:function(){},cancel:function(){},complete:function(e){console.log(e)}}),console.log("pengyouqiang end")},sharepengyou:function(e){wx.error(function(e){console.log(e)}),console.log("pengyou"),wx.onMenuShareAppMessage({title:e.title,desc:e.desc,link:e.link,imgUrl:"http://app.popled.cn/static/logo.png",type:"link"|e.type,dataUrl:"",success:function(){},cancel:function(){},complete:function(e){console.log(e)}})},hideMenuItems:function(e){wx.hideMenuItems({menuList:e})},showMenuItems:function(e){wx.showMenuItems({menuList:e})}}},65:function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}function i(e){return new r(e)}Object.defineProperty(t,"__esModule",{value:!0});var s=n(67),u=o(s);t["default"]=i;var c=n(304),a=o(c),r=function(e){this.prefix=e,this.set=function(e,t,n,o){if(t instanceof Object&&(t="$JSON:"+(0,u["default"])(t)),Array.isArray(t)&&(t="$JSON:"+(0,u["default"])(t)),e=this.prefix+"_"+e,!window.localStorage)return void(t.length<=256&&a["default"].set(e,t,n,o));try{window.localStorage.setItem(e,t)}catch(i){window.console.warn("Your browser not support localStorage. "+i),t.length<=256?a["default"].set(e,t,n,o):window.alert("Your browser not support localStorage. Please check set browser private model.")}},this.get=function(e,t){e=this.prefix+"_"+e;var n=window.localStorage.getItem(e)||a["default"].get(e);if(""==n||null==n||void 0==n)return t;var o=/^\$JSON:(.*)$/.exec(n);return o?JSON.parse(o[1]):n},this.del=function(e,t){e=this.prefix+"_"+e,window.localStorage.removeItem(e),a["default"].del(e,t)},this.clear=function(){window.localStorage.clear(),a["default"].clear()}}},66:function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}var i=n(130),s=o(i),u=n(68),c=o(u);t.timestamp=function(){return parseInt((new Date).getTime()/1e3)},t.millisecond=function(){return(new Date).getTime()},t.tounicode=function(e){return escape(e).replace(/%/g,"\\").toLowerCase()},t.request=function(e,t,n){return n=n||"GET",new c["default"](function(o,i){var u=new XMLHttpRequest;"withCredentials"in u||(u=new XDomainRequest),u.open(n,e,!0),"POST"!=n&&"post"!=n||u.setRequestHeader("Content-Type","application/x-www-form-urlencoded");var c=[];for(var a in t)c.push(a+"="+t[a]);console.log((0,s["default"])(c.join("&"))),u.send(c.join("&")),u.onload=function(){"200"==u.status?o(u.responseText,u.status):i(u.responseText,u.status)}})}},77:function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}var i=n(65),s=o(i),u=(0,s["default"])("account");e.exports={setrelogin:function(e){u.set("relogin",e)},getrelogin:function(){return u.get("relogin",!1)}}},86:function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var i=n(11),s=o(i),u=65001,c=65002,a=65003,r=65004,l=65005,d=65006,f=65007,p={name:"system",weixinConfig:function(){return(0,s["default"])(u,{})},openid_access_token:function(e){return(0,s["default"])(c,{code:e})},openid_refresh_token:function(e){return(0,s["default"])(l,{refresh:e})},openid_access_auth:function(e){return(0,s["default"])(f,{user:e})},openid_check:function(e,t){return(0,s["default"])(d,{openid:e,token:t})},get_auth_code:function(e){return(0,s["default"])(a,{phone:e})},submit_auth_code:function(e,t){return(0,s["default"])(r,{phone:e,code:t})}};t["default"]=p},123:function(e,t,n){var o,i;n(483),o=n(244),i=n(616),e.exports=o||{},e.exports.__esModule&&(e.exports=e.exports["default"]),i&&(("function"==typeof e.exports?e.exports.options||(e.exports.options={}):e.exports).template=i)},144:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t["default"]={appid:"wx576cadaf9ae2d4f6",baseurl:"http://app.popled.cn/",debug_model:function(){return!1},host:"www.popled.cn",socket:!1,log_debug:!1}},145:function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}var i=n(319),s=o(i);window.subscribes=new s["default"],t.syncAdd=function(e,t){window.subscribes.store(e,t)},t.syncGet=function(e){return window.subscribes.find(e)}},209:function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}var i=n(144),s=o(i),u=n(18);o(u);t.loginUrl=function(e){e=encodeURIComponent(e);var t="https://open.weixin.qq.com/connect/oauth2/authorize?appid="+s["default"].appid+"&redirect_uri="+e+"&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect";window.location.href=t},t.loginUrlStr=function(e){e=encodeURIComponent(e);var t="https://open.weixin.qq.com/connect/oauth2/authorize?appid="+s["default"].appid+"&redirect_uri="+e+"&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect";return t}},210:function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}function i(){var e=navigator.userAgent.toLowerCase();return"micromessenger"==e.match(/MicroMessenger/i)}var s=n(303),u=o(s),c=function(e,t){var n=this,o=[];this.forEach(function(n){t(e,n)&&o.push(n)}),o.forEach(function(e){n.$remove(e)})},a=function(e,t){for(var n=this.length,o=0;o<n;o++)if(t(e,this[o]))return!0;return!1};e.exports={is_weixin:i(),array_remove:c,array_exist:a,need_weixin:function(e){return u["default"].indexOf(e)>-1}}},235:function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var i=n(3),s=o(i),u=n(18),c=(o(u),n(62)),a=(o(c),n(123)),r=o(a),l=n(701),d=o(l),f=n(704),p=o(f),h=n(702),m=(o(h),n(699)),g=o(m),_=n(305),b=o(_);s["default"].config.devtools=!0,t["default"]={init:function(){},components:{toast:r["default"],statuTips:p["default"],modalCb:d["default"],loading:g["default"]},sockets:{syncs:b["default"]},data:function(){return{toast:{text:"",time:1e3,func:function(){},show:!1},tip:{show:!1,time:1500,info:"",func:function(){}},input:{value:"",label:"",ok:function(e){},cancel:function(){},component:this,show:!0},modalcb:{show:!1,title:"",content:"",cancel_title:"",submit_title:"",cancel_call:function(){},submit_call:function(){}},loading:{show:!1,tip:"loading..."}}},methods:{},ready:function(){this.$on("toast",function(e){this.toast.text=e.text,this.toast.time=e.time,this.toast.type=e.type,this.toast.func=e.func,this.toast.show=!0}),this.$on("tip",function(e){this.tip.time=e.time,this.tip.func=e.func,this.tip.info=e.info,this.tip.show=!0}),this.$on("modalcb",function(e){this.modalcb.show=!0,this.modalcb.title=e.title,this.modalcb.content=e.content,this.modalcb.cancel_title=e.cancel_title,this.modalcb.submit_title=e.submit_title,this.modalcb.cancel_call=e.cancel_call,this.modalcb.submit_call=e.submit_call}),this.$on("loading.init",function(e){this.loading.tip=e.tip,this.loading.show=!0}),this.$on("loading.controll",function(e){var t=e.operate;this.loading.show=t})},created:function(){}}},241:function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var i=n(3),s=o(i),u=n(4),c=o(u);s["default"].use(c["default"]),t["default"]={data:function(){return{}},props:{cancelTitle:{required:!0,type:String},submitTitle:{required:!0,type:String},title:{required:!0,type:String},content:{required:!0},cancelCall:{type:Function},submitCall:{required:!0,type:Function},show:{required:!0,type:Boolean,twoWay:!0}},computed:{isComponent:function(){return this.content instanceof Object}},methods:{cancel:function(){this.cancelCall&&this.cancelCall(this.content),this.show=!1},submit:function(){var e=this.isComponent?this.$children[0]:this.content;this.submitCall(e),this.show=!1},stopDefault:function(e){e.stopPropagation()}}}},242:function(e,t){"use strict"},243:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t["default"]={props:{show:{type:Boolean,"default":!1,twoWay:!0},time:{type:Number,"default":1500},func:{type:Function,"default":function(){}},info:{type:String,required:!0},component:{type:Object}},computed:{},ready:function(){this.refresh(this.show,this.time)},watch:{show:function(e){this.refresh(e,this.time)},time:function(e){this.refresh(this.show,e)}},methods:{initData:function(){this.doShow(this.show)},refresh:function(e,t){var n=this;e&&t>0&&(clearTimeout(this.timeout),this.timeout=setTimeout(function(){n.show=!1,n.func&&n.func()},this.time))}}}},244:function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var i=n(3),s=o(i);s["default"].transition("vux-fade",{afterLeave:function(){this.over_cb()}}),t["default"]={props:{show:{type:Boolean,"default":!1,twoWay:!0},time:{type:Number,"default":2e3},type:{type:String,"default":"success"},transition:{type:String,"default":"vux-fade"},width:{type:String,"default":"140px"},over_cb:{type:Function,"default":function(){}}},computed:{toastClass:function(){return{weui_toast_forbidden:"warn"===this.type,weui_toast_cancel:"cancel"===this.type,weui_toast_success:"success"===this.type,weui_toast_text:"text"===this.type}}},watch:{show:function(e){var t=this;e&&this.time>0&&(clearTimeout(this.timeout),this.timeout=setTimeout(function(){t.show=!1},this.time))},time:function(e){var t=this;this.show&&e>0&&(clearTimeout(this.timeout),this.timeout=setTimeout(function(){t.show=!1},e))}},methods:{}}},303:function(e,t){"use strict";var n=["account"];e.exports=n},304:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t["default"]={set:function(e,t,n,o){var i=new Date,s=n?i.getTime()+n:i.getTime()+2592e6;i.setTime(s),o===!0&&(o=document.domain.replace(/[a-zA-Z]+/,""));var u=o?";domain="+o+";path=/":"";document.cookie=e+"="+escape(t)+";expires="+i.toGMTString()+u},get:function(e){var t=new RegExp("(^| )"+e+"=([^;]*)(;|$)"),n=document.cookie.match(t);return n?unescape(n[2]):""},del:function(e,t){var n=new Date;n.setTime(n.getTime()-1);var o=this.get(e);t===!0&&(t=document.domain.replace(/[a-zA-Z]+/,""));var i=t?";domain="+t+";path=/":"";o&&(document.cookie=e+"=1;expires="+n.toGMTString()+i)},clear:function(){var e=document.cookie.match(/[^ =;]+(?==)/g);if(e&&e.length)for(var t=e.length;t--;)document.cookie=e[t]+"=0;expires=Thu, 01 Jan 1970 00:00:00 GMT;"}}},305:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n={11001:function(e){console.log(e)}};t["default"]=n},307:function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var i=n(45),s=o(i),u={install:function(e,t){e.filter("isset_value_set",function(e,t){return 0==e||null==e||void 0==e?t||"未设定":e}),e.filter("isset_value_empty",function(e,t){return""==e||0==e||null==e||void 0==e?t||"未填写内容...":e}),e.filter("fdatetime",function(e,t){return t=t||"YYYY.MM.dd: HH:mm:ss",(0,s["default"])(t,1e3*e)}),e.filter("fdatetime2",function(e,t){return"--"==e?"--":(t=t||"YYYY.MM.dd: HH:mm:ss",(0,s["default"])(t,1e3*e))}),e.filter("first_img",function(e,t){return e instanceof Array&&e.length>=1?e[0]:t}),e.filter("led_status_tag",function(e){switch(e=parseInt(e)){case 0:return"等待审核";case 1:return"正常";case 2:return"投放中";case 3:return"空闲";default:return"未定义"+e}}),e.filter("led_status_class",function(e){switch(e=parseInt(e)){case 1:return"s1";case 2:return"s2";case 3:return"s3";default:return"未定义"+e}}),e.filter("ad_status_tag",function(e){switch(e=parseInt(e)){case 1:return"等待发送";case 2:return"正在发送";case 3:return"发送成功";case 4:return"发送失败";default:return"未定义"+e}}),e.filter("ad_status_class",function(e){switch(e=parseInt(e)){case 1:return"s1";case 2:return"s2";case 3:return"s3";case 4:return"s4";case 5:return"s5";case 6:return"s6";default:return"未定义"+e}}),e.filter("adcontent",function(e){return e&&e.text&&e.text.value?e.text.value:"非文字广告"}),e.filter("adporgramno",function(e){return e&&e.no?e.no:"NONE"}),e.filter("led_state_tag",function(e){switch(status=parseInt(status),e){case 1:return"在线";case 0:return"离线"}}),e.filter("date",function(e){var t=new Date;t.setTime(1e3*e);var n=t.getMonth()+1;return t.getFullYear()+"/"+n+"/"+t.getUTCDate()})}};t["default"]=u},308:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n={install:function(e,t){e.mixin({init:function(){var e=this;this.$loading={isopen:!1,tip:"正在加载...",startup:function(t){this.tip=t||this.tip,this.isopen||(e.$dispatch("loading.init",{component:this,tip:this.tip}),this.isopen=!0)},show:function(e){this.startup(e)},close:function(){this.isopen&&(e.$dispatch("loading.controll",{operate:!1}),this.isopen=!1)}}}})}};t["default"]=n},309:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n={install:function(e,t){e.prototype.m_log=function(e){t.log&&console.log(e)},e.prototype.m_warn=function(e){t.warn&&console.warn(e)},e.prototype.m_error=function(e){t.error&&console.error(e)}}};t["default"]=n},310:function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var i=n(68),s=o(i),u={install:function(e,t){e.mixin({init:function(){this.$modalcb=function(e){var t=this,n=new s["default"](function(n,o){var i=e.title||"空头",s=e.content||"空content",u=e.cancelTitle||"取消",c=e.submitTitle||"确定",a=e.cancalCall||function(e){o(e)},r=e.submitCall||function(e){n(e)},l={component:t,title:i,content:s,cancel_title:u,submit_title:c,cancal_call:a,submit_call:r};t.$dispatch("modalcb",l)});return n}}})}};t["default"]=u},311:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(145),i={install:function(e,t){e.mixin({init:function(){if(this.$options.subscribes){var e=this.$options.subscribes;if(e instanceof Array)return void console.error("subscribes datatype not support Array");if(e instanceof Object)for(var t in e)(0,o.syncAdd)(t,{component:this,func:e[t]});console.log("subscribes~~~~~")}}})}};t["default"]=i},312:function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var i=n(18),s=o(i),u=n(145),c={install:function(e,t){e.mixin({init:function(){var e=this.$options.socket||s["default"];this.$options.socket=e;var t=this.$options.sockets||{},n=t.syncs||{};(0,u.syncAdd)(n)}})}};t["default"]=c},313:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n={install:function(e,t){e.mixin({init:function(){this.$options.computed=this.$options.computed||{},this.$options.computed.this_component={get:function(){return this}}}})}};t["default"]=n},314:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n={install:function(e,t){e.mixin({ready:function(){this.$tip=function(e){var t=e.info||"未定义tip内容",n=e.time||1500,o=e.func||function(){};this.$dispatch("tip",{info:t,time:n,func:o})}}})}};t["default"]=n},315:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n={install:function(e,t){e.mixin({init:function(){this.$toast=function(e){var t=e.text||"未定义toast内容",n=e.time||1500,o=e.type||"text",i=e.func||function(){};this.$dispatch("toast",{component:this,text:t,time:n,type:o,func:i})}}})}};t["default"]=n},316:function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}function i(e){var t=T.indexOf(e)>-1;if(console.log("isNeed:"+t),!t)return O;var n=M.get("access");return n&&n.expires_in>(0,x.timestamp)()?q:I}function s(e){var t=new a["default"](function(e,t){var n=M.get("access");h["default"].openid_access_auth(n).then(function(t){e(t)})["catch"](function(e){t(e)})});return t}function u(e){var t=new a["default"](function(t,n){var o=e.to.query||{};o.code?g["default"].ready=function(){var e=o.code;h["default"].openid_access_token(e).then(function(e){t(e)})["catch"](function(e){n(e)})}:n(j)});return t}var c=n(68),a=o(c),r=n(67),l=o(r),d=n(144),f=o(d),p=n(86),h=o(p),m=n(18),g=o(m),_=n(65),b=o(_),v=n(210),w=n(77),y=o(w),x=n(66),k=n(209),M=(0,b["default"])("user"),j=0,S=2,C=3;e.exports=function(e){e.map({"/led-edit/:id":{name:"led-edit",component:function(e){return n.e(11,function(t){var n=[t(714)];e.apply(null,n)}.bind(this))}},"/login":{name:"login",component:function(e){return n.e(16,function(t){var n=[t(753)];e.apply(null,n)}.bind(this))}},"/browser_login":{name:"browser_login",component:function(e){return n.e(17,function(t){var n=[t(738)];e.apply(null,n)}.bind(this))}},"/account":{name:"account",component:function(e){return n.e(19,function(t){var n=[t(718)];e.apply(null,n)}.bind(this))}},"/bind":{name:"bind",component:function(e){return n.e(18,function(t){var n=[t(737)];e.apply(null,n)}.bind(this))}},"/unbind":{name:"unbind",component:function(e){return n.e(28,function(t){var n=[t(774)];e.apply(null,n)}.bind(this))}},"/register":{name:"register",component:function(e){return n.e(10,function(t){var n=[t(770)];e.apply(null,n)}.bind(this))}},"/splash-screen":{name:"splash-screen",component:function(e){return n.e(24,function(t){var n=[t(772)];e.apply(null,n)}.bind(this))}},"/mannage":{name:"mannage",component:function(e){return n.e(23,function(t){var n=[t(754)];e.apply(null,n)}.bind(this))}},"/forget-password":{name:"forget-password",component:function(e){return n.e(12,function(t){var n=[t(739)];e.apply(null,n)}.bind(this))}},"/led-add":{name:"led-add",component:function(e){return n.e(14,function(t){var n=[t(712)];e.apply(null,n)}.bind(this))}},"/led-detail":{name:"led-detail",component:function(e){return n.e(4,function(t){var n=[t(713)];e.apply(null,n)}.bind(this))}},"/air-kiss":{name:"air-kiss",component:function(e){return n.e(22,function(t){var n=[t(690)];e.apply(null,n)}.bind(this))}},"/map":{name:"map",component:function(e){return n.e(9,function(t){var n=[t(715)];e.apply(null,n)}.bind(this))}},"/test":{name:"test",component:function(e){return n.e(25,function(t){var n=[t(717)];e.apply(null,n)}.bind(this))}},"/bind-account":{name:"bind-account",component:function(e){return n.e(21,function(t){var n=[t(691)];e.apply(null,n)}.bind(this))}},"/new-ad-list":{name:"new-ad-list",component:function(e){return n.e(7,function(t){var n=[t(733)];e.apply(null,n)}.bind(this))}},"/new-led-list":{name:"new-led-list",component:function(e){return n.e(3,function(t){var n=[t(746)];e.apply(null,n)}.bind(this))}},"/ad-history":{name:"ad-history",component:function(e){return n.e(5,function(t){var n=[t(725)];e.apply(null,n)}.bind(this))}},"/guide":{name:"guide",component:function(e){return n.e(15,function(t){var n=[t(741)];e.apply(null,n)}.bind(this))}},"/toufang-intro/:id":{name:"toufang-intro",component:function(e){return n.e(8,function(t){var n=[t(773)];e.apply(null,n)}.bind(this))}},"/program-image":{name:"program-image",component:function(e){return n.e(0,function(t){var n=[t(758)];e.apply(null,n)}.bind(this))}},"/program-time":{name:"program-time",component:function(e){return n.e(2,function(t){var n=[t(767)];e.apply(null,n)}.bind(this))}},"/program-text":{name:"program-text",component:function(e){return n.e(1,function(t){var n=[t(764)];e.apply(null,n)}.bind(this))}},"/demo":{name:"demo",component:function(e){return n.e(6,function(t){var n=[t(711)];e.apply(null,n)}.bind(this))}},"/gm":{name:"gm",component:function(e){return n.e(30,function(t){var n=[t(740)];e.apply(null,n)}.bind(this))}},"/new-device":{name:"new-device",component:function(e){return n.e(26,function(t){var n=[t(756)];e.apply(null,n)}.bind(this))}},"/need-weixin":{name:"need-access",component:function(e){return n.e(29,function(t){var n=[t(755)];e.apply(null,n)}.bind(this))}},"/range":{name:"range",component:function(e){return n.e(13,function(t){var n=[t(19)];e.apply(null,n)}.bind(this))}},"/share/toufang":{name:"sharetoufang",component:function(e){return n.e(20,function(t){var n=[t(204)];e.apply(null,n)}.bind(this))}}}),e.alias({"/ad-vertising":"/ad-test"}),e.redirect({"/":"/guide"}),e.beforeEach(function(e){console.log((0,x.millisecond)()+" :beforeEach:from "+e.from.name+"; to:"+e.to.name);var t=e.to.name;if("test"==t)return void u(e).then(function(t){t.expires_in=(0,x.timestamp)()+t.expires_in-20,M.set("access",t),y["default"].setrelogin(t.relogin),g["default"].login=!0,g["default"].bind=!0,setTimeout(function(){e.next()},0)})["catch"](function(n){switch(n){case j:M.del("access"),(0,k.loginUrl)(window.location.href);break;case S:switch(t){case"bind":e.next();break;case"login":e.next();break;default:e.redirect("/login")}break;case C:switch(t){case"bind":e.next();break;case"account":e.next();break;default:e.redirect("/account")}break;default:M.del("access"),(0,k.loginUrl)(window.location.href)}});if(f["default"].debug_model())return console.log("debug_model"),void e.next();if(e.from.name==e.to.name)return console.log("from to same"),void e.next();if((0,v.need_weixin)(t)&&!v.is_weixin)return void e.redirect({path:"/need-weixin",query:{oldpath:t,query:(0,l["default"])(e.to.query),params:(0,l["default"])(e.to.params)}});if(g["default"].login&&g["default"].bind)return void e.next();if(!(v.is_weixin||g["default"].bind&&g["default"].login))return console.log("not weixin browser"),void("browser_login"!=e.to.name?e.redirect("/browser_login"):e.next());if(g["default"].login)return void e.redirect("/login");var n=i(t);switch(console.log("urlname: "+t+"; is_need: "+n),n){case O:e.next();break;case I:return void u(e).then(function(t){t.expires_in=(0,x.timestamp)()+t.expires_in-20,M.set("access",t),y["default"].setrelogin(t.relogin),g["default"].login=!0,g["default"].bind=!0,setTimeout(function(){e.next()},0)})["catch"](function(n){switch(n){case j:M.del("access"),(0,k.loginUrl)(window.location.href);break;case S:switch(t){case"bind":e.next();break;case"login":e.next();break;default:e.redirect("/login")}break;case C:switch(t){case"bind":e.next();break;case"account":e.next();break;default:e.redirect("/account")}break;default:M.del("access"),(0,k.loginUrl)(window.location.href)}});case P:return void u(e).then(function(t){t.expires_in=(0,x.timestamp)()+t.expires_in-20,M.set("access",t),y["default"].setrelogin(t.relogin),g["default"].login=!0,g["default"].bind=!0,e.next()})["catch"](function(n){switch(n){case j:M.del("access"),(0,k.loginUrl)(window.location.href);break;case S:switch(t){case"bind":e.next();break;case"login":e.next();break;default:e.redirect("/login")}break;case C:switch(t){case"bind":e.next();break;case"account":e.next();break;default:e.redirect("/account")}break;default:M.del("access"),(0,k.loginUrl)(window.location.href)}});case q:return void s(e).then(function(t){g["default"].login=!0,g["default"].bind=!0,e.next()})["catch"](function(n){switch(n){case j:(0,k.loginUrl)(window.location.href);break;case S:switch(t){case"bind":e.next();break;case"login":e.next();break;default:e.redirect("/login")}break;case C:switch(t){case"bind":e.next();break;case"account":e.next();break;default:e.redirect("/account")}break;default:M.del("access"),(0,k.loginUrl)(window.location.href);
}});default:return console.error("error: auth_check_state: "+n),void("login"==t?e.next():e.redirect({path:"/login"}))}}),e.afterEach(function(e){}),e.map({"*":{name:"not-found",component:function(e){return n.e(27,function(t){var n=[t(716)];e.apply(null,n)}.bind(this))}}})};var T=["program-text","program-image","program-time","ad-history","led-add","account","login","bind","unbind","new-led-list","new-ad-list","led-detail","led-edit"],O=0,I=1,P=2,q=3},317:function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}var i=n(67),s=o(i),u=n(130),c=o(u);!function(){var e={};window.Session={domain:null,expires:null,path:"/",clear:function(){e={};var t=this.getCookies();for(var n in t)t.hasOwnProperty(n)&&this.remove(n)},createCookie:function(e,t,n,o,i){null==t&&(t=""),"object"===("undefined"==typeof t?"undefined":(0,c["default"])(t))&&(t=t instanceof Date?"DATE:"+t.getTime():"JSON:"+encodeURIComponent((0,s["default"])(t)));var u=e+"="+t;"number"==typeof n?u+="; expires="+new Date(n).toUTCString():n instanceof Date&&(u+="; expires="+n.toUTCString()),"string"==typeof o&&(u+="; path="+o),"string"==typeof i&&(u+="; domain="+i),document.cookie=u},deleteCookie:function(e,t,n){this.createCookie(e,"",0,t,n)},exists:function(t){return void 0!==e[t]},get:function(t,n){var o=e[t];return null!==o&&void 0!==o?o:n},getCookie:function(e){var t=this.getCookies();return t&&t[e]},getCookies:function(){for(var e=document.cookie.split("; "),t={},n=0;n<e.length;n+=1){var o=e[n].split("=");"string"==typeof o[0]&&o[0].length>0&&(t[o[0]]=o[1])}return t},load:function(){var t=Session.getCookies();for(var n in t)if(t.hasOwnProperty(n)){var o=t[n];0===o.indexOf("JSON:")?o=JSON.parse(decodeURIComponent(o.substr(5))):0===o.indexOf("DATE:")&&(o=new Date(parseInt(o.substr(5)))),e[n]=o}return e},remove:function(t){delete e[t],this.deleteCookie(t,this.path,this.domain)},set:function(t,n){e[t]=n,this.createCookie(t,n,this.expires,this.path,this.domain)}},Session.load()}()},318:function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}var i=n(345),s=o(i),u=n(556),c=o(u),a=function(){return Math.random().toString(36).substr(2,15)},r=function(){return parseInt((new Date).getTime()/1e3)+""},l=function(e){var t=(0,s["default"])(e);t=t.sort();var n={};t.forEach(function(t){n[t.toLowerCase()]=e[t]});var o="";for(var i in n)o+="&"+i+"="+n[i];return o=o.substr(1)},d=function(e,t){var n={jsapi_ticket:e,nonceStr:a(),timestamp:r(),url:t},o=l(n),i=new c["default"](o,"TEXT");return n.signature=i.getHash("SHA-1","HEX"),n};e.exports=d},319:function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var i=n(348),s=o(i),u=n(349),c=o(u),a=function(){function e(){(0,s["default"])(this,e),this.objects={}}return(0,c["default"])(e,[{key:"store",value:function(e,t){if(this.objects[e]){var n=this.objects[e];-1==n.indexOf(t)&&n.push(t),this.objects[e]=n}else this.objects[e]=[t]}},{key:"find",value:function(e){return this.objects[e]}},{key:"map",value:function(e,t){var n=this.find(e);return n?n.map(t):null}},{key:"del",value:function(e){delete this.objects[e]}}]),e}();t["default"]=a},327:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t["default"]={data:function(){return{}},props:{show:{required:!0,type:Boolean},tip:{required:!0,type:String}},computed:{}}},470:function(e,t,n){function o(e){return n(i(e))}function i(e){return s[e]||function(){throw new Error("Cannot find module '"+e+"'.")}()}var s={"./be":224,"./be.js":224,"./cs":225,"./cs.js":225,"./kk":226,"./kk.js":226,"./pl":227,"./pl.js":227,"./ru":228,"./ru.js":228,"./tr":229,"./tr.js":229,"./tt":230,"./tt.js":230,"./uk":231,"./uk.js":231};o.keys=function(){return Object.keys(s)},o.resolve=i,e.exports=o,o.id=470},471:function(e,t){},478:function(e,t){},479:function(e,t){},481:function(e,t){},483:function(e,t){},544:function(e,t){},545:function(e,t){},601:function(e,t){e.exports=" <div id=app> <toast :time=toast.time :show.sync=toast.show :type=toast.type :over_cb=toast.func>{{toast.text}}</toast> <modal-cb :show.sync=modalcb.show :title=modalcb.title :content=modalcb.content :cancel-call=modalcb.cancel_call :submit-call=modalcb.submit_call :cancel-title=modalcb.cancel_title :submit-title=modalcb.submit_title> </modal-cb> <loading :show.sync=loading.show :tip=loading.tip></loading> <statu-tips :show.sync=tip.show :time=tip.time :func=tip.func :info=tip.info></statu-tips> <router-view transition=pages-fade transition-mode=out-in></router-view> </div> "},609:function(e,t){e.exports=' <div class="loading shade" v-show=show> <div class=weui_toast_loading> <div class=weui_loading> <div class=weui_loading_leaf v-for="i in 12" :class="[\'weui_loading_leaf_\' + i]"></div> </div> <p class=weui_toast_loading_content>{{tip}}</p> </div> </div> '},611:function(e,t){e.exports=" <div class=balloon v-if=show v-gesture:tap.stop.prevent=cancel> <div> <div class=container v-gesture:tap.stop.prevent=stopDefault> <div class=balloon-head>{{title}}</div> <div class=balloon-body> <component v-if=isComponent :is=content></component> <span v-else>{{content}}</span> </div> <div class=balloon-foot> <button class=btn-default v-gesture:tap.stop.prevent=cancel>{{cancelTitle}}</button> <button class=btn-primary v-gesture:tap.stop.prevent=submit>{{submitTitle}}</button> </div> </div> </div> </div> "},612:function(e,t){e.exports=" <div></div> "},614:function(e,t){e.exports=" <div class=statu-tips :class=\"{'down':show}\"><i></i>{{info}}</div> "},616:function(e,t){e.exports=' <div v-show=show class=vux-toast :transition=transition> <div class=weui_mask_transparent></div> <div class=weui_toast :style="{width: width}" :class=toastClass> <p class=weui_toast_content><slot></slot></p> </div> </div> '},689:function(e,t,n){var o,i;n(471),o=n(235),i=n(601),e.exports=o||{},e.exports.__esModule&&(e.exports=e.exports["default"]),i&&(("function"==typeof e.exports?e.exports.options||(e.exports.options={}):e.exports).template=i)},699:function(e,t,n){var o,i;n(545),n(544),o=n(327),i=n(609),e.exports=o||{},e.exports.__esModule&&(e.exports=e.exports["default"]),i&&(("function"==typeof e.exports?e.exports.options||(e.exports.options={}):e.exports).template=i)},701:function(e,t,n){var o,i;n(478),o=n(241),i=n(611),e.exports=o||{},e.exports.__esModule&&(e.exports=e.exports["default"]),i&&(("function"==typeof e.exports?e.exports.options||(e.exports.options={}):e.exports).template=i)},702:function(e,t,n){var o,i;n(479),o=n(242),i=n(612),e.exports=o||{},e.exports.__esModule&&(e.exports=e.exports["default"]),i&&(("function"==typeof e.exports?e.exports.options||(e.exports.options={}):e.exports).template=i)},704:function(e,t,n){var o,i;n(481),o=n(243),i=n(614),e.exports=o||{},e.exports.__esModule&&(e.exports=e.exports["default"]),i&&(("function"==typeof e.exports?e.exports.options||(e.exports.options={}):e.exports).template=i)}});
//# sourceMappingURL=app.27305cadc9dadac66c78.js.map