/**
 * Created by wuchuguang on 16-6-30.
 */

import promisecmd from './promise_cmd';

const cmd_get_list = 41000;
const cmd_get_info = 41001;
const cmd_led_ad_list = 41004;
const cmd_get_groups = 41005;
const cmd_get_onlinestatus = 41006;
const cmd_page = 41007;
const cmd_get_edit = 41008;
const cmd_led_add = 41009;
const cmd_led_del = 41010;
const cmd_leds_position = 41011;
const cmd_led_info_position = 41031;
const cmd_led_info_position_set = 41032;
const cmd_led_setting_screen_open = 41019;
const cmd_led_setting_proof = 41020;
const cmd_led_setting_timer_boot = 41021;
const cmd_setting_get = 41022;
const cmd_led_info_save = 41023;
const cmd_led_clear_screen = 41033;
const cmd_led_device_add = 41099;
const cmd_led_bright = 41034;
let led = {
    get_groups(){
        return promisecmd(cmd_get_groups, {});
    },
    add_group(name){
        return promisecmd(cmd_add_group, {name:name});
    },
    del_group(id){
        return promisecmd(cmd_del_group, {id:id});
    },
    move_group(id){

    },
    get_list(pagenumber){
        return promisecmd(cmd_get_list, {pagenumber:pagenumber});
    },

    page(groupid, page,pagenumber){
        // let promise = new Promise((succ,fail)=>{
        //     succ([
        //         {id:'xxx0',name:'xxxxx0',gid:groupid},
        //         {id:'xxx1',name:'xxxxx1',gid:groupid},
        //         {id:'xxx2',name:'xxxxx2',gid:groupid},
        //         ]);
        // });
        // return promise;
        return promisecmd(cmd_page, {group:groupid, page:page, pagenumber:pagenumber});
    },

    get_info(id){
        return promisecmd(cmd_get_info, {id:id});
    },
    get_edit(id){
        return promisecmd(cmd_get_edit, {id:id});
    },
    save_edit(options){
        return promisecmd(cmd_led_info_save, options);
    },
    save_bright(options){
        return promisecmd(cmd_led_bright,options);
    },
    del_led(id){
        return promisecmd(cmd_led_del, {device:id});
    },
    get_onlinestatus(devices){
        return promisecmd(cmd_get_onlinestatus, {devices:devices});
    },

    add_led(DeviceNo){
        return promisecmd(cmd_led_add, {sn: DeviceNo});
    },

    setting_screen_open(device, newNum){
        return promisecmd(cmd_led_setting_screen_open, {device:device, value:newNum});
    },
    setting_auto_proof(device){
        return promisecmd(cmd_led_setting_proof, {device:device});
    },
    setting_timer_boot(type, newNum){
        return promisecmd(cmd_led_setting_timer_boot, {id:id,open:open, value:newNum});
    },
    setting_get(id){
        return promisecmd(cmd_setting_get, {id:id});
    },
    get_position(id){
        return promisecmd(cmd_led_info_position, {id:id});
    },
    set_position(data){
        return promisecmd(cmd_led_info_position_set, data);
    },
    get_ad_list(id){
        return promisecmd(cmd_led_ad_list, {sid:id});
    },
    clear_screen(device){
        console.log('clear_screen : ' + device);
        return promisecmd(cmd_led_clear_screen, {device: device});
    },
    add_device(device){
        return promisecmd(cmd_led_device_add, {device:device});
    },
    get_leds_position(){
        return promisecmd(cmd_leds_position, {});
    }
};
export default led;