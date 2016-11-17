
import config from './config';
import Vue from 'vue'

window.onload = function(){
    console.log('html onload...');
};


import accountStore from './store/account-store';

import logger from './plugin/logger';

Vue.use(logger, {log:true,warn:true,error:true});

import globalFilter from './plugin/global_filter';

Vue.use(globalFilter);

import psocket from './plugin/socket';
Vue.use(psocket);

import pub_sub from './plugin/pub_sub';
Vue.use(pub_sub);

import VueRouter from 'vue-router';
Vue.use(VueRouter);

import thisComponent from './plugin/this_component';
Vue.use(thisComponent);

import toast from './plugin/toast';
Vue.use(toast);

import modalcb from './plugin/modal-cb';
Vue.use(modalcb);

import tip from './plugin/tip';
Vue.use(tip);

import loadingtoast from './plugin/loadingtoast';
Vue.use(loadingtoast);

import App from './App';

import router from './router';


var vrouter = new VueRouter({saveScrollPosition:true, transitionOnLoad:true });

router(vrouter);


import accountMessage from './message/account';
import socket from './socket';

socket.init = ()=>{
    config.debug_model() && accountMessage.login({openid:'oC5k_wCvQw0DKl6Kjo0Bo1ylgml8',accountid:'18335830798'}).then(result=>{
        config.log_debug && console.log('result:' + result);
    });
    if(!vrouter.is_start){
        vrouter.is_start = true;
        vrouter.start(App, '#app');
    }
};

socket.reconnect = function(lastcount){
    console.log('reconnect --> ' + lastcount);
    let relogin = accountStore.getrelogin();
    if(relogin){
        accountMessage.relogin(relogin).then((relogin)=>{
            accountStore.setrelogin(relogin);
        }).catch(code=>{
            config.log_debug && console.log('fail............')
        })
    }else{
        config.log_debug && console.log('fail............')
    }
    return true;
};

socket.connect("ws://"+config.host+":8081");
socket.debug = config.socket;

config.log_debug && console.log('link:' + config.host);


