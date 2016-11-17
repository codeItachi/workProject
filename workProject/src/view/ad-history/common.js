import {program_type} from '../../global_const';
exports.typeImg = function(type){
    switch (type){
        case program_type.text:
            return '/static/ad-text.png';
        case program_type.time:
            return '/static/ad-time.png';
        case program_type.image:
            return '/static/ad-img.png';
        default:
            console.log("type:" + type + "; not define image");
            return '';
    }
};
exports.content2value = function(content){
    switch (content.type){
        case program_type.text:
            return content.value;
        case program_type.time:
            return content.format;
        case program_type.image:
            return "IMAGE";
        default:
            return 'NONE';
    }
};

exports.typeCmd = function(type){
    switch(type){
        case 'clear_screen':
            return '清屏';
        case 'timing':
            return '校时';
        case 'open_screen':
            return '开屏';
        case 'close_screen':
            return '关屏';
        case 'led_light':
            return '设置亮度'
        case 'set_param':
            return '设置参数'
        case 'get_param':
            return '获取参数'
    }
};

const ad_status_wait = 1;
const ad_status_send = 2;
const ad_status_succ = 3;
const ad_status_fail = 4;

exports.typeText = function(type){
    switch(type){
        case ad_status_wait:
            return '等待发送';
        case ad_status_send:
            return '正在发送';
        case ad_status_succ:
            return '发送成功';
        case ad_status_fail:
            return '发送失败';
        default:
            return '';
    }
}
exports.typeStyle = function(type){
    switch(type){
        case ad_status_wait:
            return 'wait';
        case ad_status_send:
            return 'while';
        case ad_status_succ:
            return 'suc';
        case 4:
            return 'timeout';
        case ad_status_fail:
            return 'fail';
        default:
            return '';
    }
}