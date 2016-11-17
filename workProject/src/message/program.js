/**
 * Created by wcg on 16-8-4.
 */


import promiseCmd from './promise_cmd';

const cmd_program_get_list = 51000;
const cmd_program_delete     = 51002;
const cmd_program_save     = 51003;
const cmd_program_info     = 51005;

let program = {
    get_list(){
        return promiseCmd(cmd_program_get_list, {});
    },

    add_and_save(data){
        return promiseCmd(cmd_program_save, data);
    },
    delete_program(id){
        return promiseCmd(cmd_program_delete, {id:id});
    },
    get_info(id){
        return promiseCmd(cmd_program_info, {id:id});
    },

};

export  default program