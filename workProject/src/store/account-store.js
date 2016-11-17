/**
 * Created by wcg on 16-9-8.
 */

import store from '../store';

const storeImpl = store('account');

module.exports = {
    setrelogin(relogin){
        storeImpl.set('relogin', relogin);
    },
    getrelogin(){
        return storeImpl.get('relogin',false);
    }
};