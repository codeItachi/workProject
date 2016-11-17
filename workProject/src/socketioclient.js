/**
 * Created by wcg on 16-9-14.
 */

import SocketIO from 'socket.io-client';

function Socket() {
    this.socket = SocketIO(...arguments);
    this.socket.on('message', (message)=>{
        let json = JSON.parse(message);
        let callback = this.callbacks.get(json.uuid);
        if(callback){
            callback.cb(json.data);
            callback.after();
        }
    });
}

Socket.prototype.uuid = function () {
    return "";
};

Socket.prototype.send = function(json){
    this.socket.send(JSON.stringify(json));
}

Socket.prototype.subscribe = function(sub, callback){
    let uuid = sub;
    this.send({type:'sub',uuid:uuid,data:sub});
    this.callback(uuid, callback, ()=>{});
};

Socket.prototype.unsubscribe = function (unsub, callback) {
    let uuid = 'un-'+unsub;
    this.send({type:'unsub',uuid:uuid,data:unsub});
    this.callback(uuid, callback, ()=>{
        this.callbacks.delete(uuid);
        this.callbacks.delete(unsub);
    });
};

Socket.prototype.close = function () {
    this.socket.close();
}

Socket.prototype.callback = function (uuid, callback, after) {
    this.callbacks = this.callbacks || new Map();
    this.callbacks.set(uuid, {cb:callback, after:after});
};


module.exports = Socket;
