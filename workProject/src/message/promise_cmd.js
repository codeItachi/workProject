/**
 * Created by wcg on 16-7-11.
 */

import socket from '../socket';

export default (cmd, data) =>{
    let promise = new Promise((success, fail) =>{
        socket.sendCmd(cmd, data, (rcmd,rdata) =>{
            if('success' == rdata.result){
                success(rdata.data);
            }else{
                fail(rdata.code);
            }
        })
    });
    return promise;
};
