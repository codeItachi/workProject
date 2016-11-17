/**
 * Created by wcg on 16-7-28.
 */

import socketApi from '../socket';
import {syncAdd} from '../message/sync';

let socket = {
    install(Vue, option){
        Vue.mixin({
            init(){
                let option_socket = this.$options.socket || socketApi;
                this.$options.socket = option_socket;
                let sockets = this.$options.sockets || {};
                let syncs = sockets.syncs || {};
                syncAdd(syncs);
            }
        })
    }
};

export default socket;
