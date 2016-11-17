// cmd:协议号(数值),msg：协议数据（字符串）,callback:回调函数，function(){}

import {syncGet} from './message/sync';

require('./session');

const reconnect_time = 3000;

WebSocket.prototype.cb = new Map();
WebSocket.prototype.sync_cbs = new Map();
WebSocket.prototype.index = 0;
WebSocket.prototype.nextID = function(){
    this.index++;
    return this.index;
};

WebSocket.prototype.sendCmd = function(cmd, msg, callback){
    let session = Session.getCookies();
    if(callback){
        var index = this.nextID();
        this.cb.set(index, callback);
        socket.debug && console.log('semd '+ cmd +' callback '+ typeof callback + ' msg ' + JSON.stringify(msg));
        this.send(JSON.stringify({cmd:cmd,session:session, msg:msg,callback:index}));
    }else{
        this.send(JSON.stringify({cmd:cmd,session:session,msg:msg}));
    }
    return true;
};

var socket = {
    _url : null,
    _ready:null,
    weboskcet: null,
    _websocket:null,
    clearFlag:null,
    connect_count: 0,
    connect(url){
        this.clearFlag = null;
        url = url || this._url;
        this._url = url;
        socket.debug && console.log("onConnect before :" + url);
        this._websocket = new WebSocket(url);
        socket.debug && console.log("onConnect after");
        this._websocket.onopen = ()=>{
            this.connect_count+=1;
            this.isOpen = this._websocket;
            this.init();
        };
        this._websocket.onmessage = (event)=>{
            var json = eval('('+event.data+')');
            socket.debug && console.log('recv:');
            socket.debug && console.log(json);
            Session.clear();
            if(json && json.session){
                if(json.session instanceof Array){
                    json.session.forEach(ses=>{
                        Session.set(ses.name, ses.value);
                    });
                }else{
                    for(let ses in json.session){
                        Session.set(ses, json.session[ses]);
                    }
                }

            }else{
                socket.debug && console.error("json.msg error:");
                socket.debug && console.error(json.msg)
            }
            if(json.callback){
                let callback = this._websocket.cb.get(json.callback);
                callback && callback(json.cmd,json.msg);
                this._websocket.cb.delete(json.callback);
            }else{
                socket.debug && console.log("sync recv:" + json.cmd);
                let callbacks = syncGet(json.cmd);
                if(callbacks){
                    callbacks instanceof Array && callbacks.forEach(({component, func})=>{
                        func.call(component, json.msg);
                    });
                }
            }
        };
        this._websocket.onerror = () =>{
            socket.debug && console.log("onError");
        };
        this._websocket.onclose = () =>{
            socket.debug && console.log("onClose");
            this.isOpen = null;
        };
    },
    sendCmd(cmd, msg, callback){
        socket.debug && console.log("is_open :" + this.isOpen);
        if(this.isOpen){
            this._websocket.sendCmd(cmd, msg, callback);
            return true;
        }else{
            socket.debug && console.log("sendCmd fail socket not open");
            setTimeout(()=>{callback(cmd, {result:'error',code:'timeout'})},0);
            return false;
        }
    },
    sendCmdPromise(cmd, msg){
        if(this.isOpen){
            this._websocket.sendCmdPromise(cmd, msg);
            return true;
        }else{
            socket.debug && console.log("sendCmd fail socket not open");
            return false;
        }
    }
};
Object.defineProperties(socket,{
    isOpen:{
        get(){
            return socket.weboskcet != null;
        },
        set(val){
            socket.weboskcet = val;
            if(val){
                if(socket.connect_count > 1){
                    socket.reconnect(socket.connect_count);
                }
                socket._ready && socket._ready();
            }else{
                socket.clearFlag && clearTimeout(socket.clearFlag);
                socket.clearFlag = setTimeout(()=>{socket.connect()}, reconnect_time);
            }
        }
    },
    ready:{
        get(){
            return socket._ready;
        },
        set(func){
            socket._ready = func;
            if(socket.isOpen){
                func();
            }
        }
    }
});
export default socket;

