/**
 * Created by wcg on 16-8-9.
 */

import {syncAdd} from '../message/sync';

let pub_sub = {
    install(Vue, options){
        Vue.mixin({
            init(){
                if(this.$options.subscribes){
                    let subscribes = this.$options.subscribes;
                    if(subscribes instanceof Array){
                        console.error("subscribes datatype not support Array");
                        return;
                    }
                    if(subscribes instanceof Object){
                        for(let sub in subscribes){
                            syncAdd(sub,  {component:this, func:subscribes[sub]});
                        }
                    }
                    console.log('subscribes~~~~~');
                }
            }
        })
    }
};

export default pub_sub;