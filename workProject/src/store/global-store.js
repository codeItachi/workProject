/**
 * Created by wuchuguang on 16-9-27.
 */

import store from '../store';
let storeImpl = store('global');

const is_first_enter = 'is_first_enter';

module.exports = {
    isFirstEnter(){
        let ret = storeImpl.get(is_first_enter, true);
        return eval(ret);
    },
    setFirstEnter(){
        storeImpl.set(is_first_enter, false);
    },
}