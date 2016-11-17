/**
 * Created by wuchuguang on 16-6-24.
 */
import weixin from './weixin';

export default {
    sockets:{
        onopen(){
            weixin.wxinit();
        },
    },
    ready(){
        console.log('cmd ready');
    }
}