
import {program_type} from '../../global_const';

exports.type2image = function(type){
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
}

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
exports.program2value = function(program){
    switch (program.content.type){
        case program_type.text:
            return program.content.value;
        case program_type.time:
            return program.content.format;
        case program_type.image:
            return "IMAGE";
        default:
            return 'NONE';
    }
};

//字体颜色 红绿黄蓝紫青白
const color0 = "255";
const color1 = "65280";
const color2 = "65535";
const color3 = "16711680";
const color4 = "16711935";
const color5 = "16776960";
const color6 = "16777215";
exports.textColorValue = function(content){
    switch (content){
        case color0:
            return '#db1b1c';
        case color1:
            return '#31d200';
        case color2:
            return '#ffe400';
        case color3:
            return '#1c58f0';
        case color4:
            return '#800bed';
        case color5:
            return '#00d8ff';
        case color6:
            return '#ffffff';
        default:
            return 'NONE';
    }
};

//动画方式
const animation00 = '0x01';
const animation01 = '0x02';
const animation02 = '0x03';
const animation03 = '0x04';
const animation04 = '0x05';
const animation05 = '0x06';
const animationaa = 'left';
const animation06 = '0x07';
const animation07 = '0x08';
const animation08 = '0x09';
const animation09 = '0x0A';
const animation10 = '0x0B';
const animation11 = '0x0C';
const animation12 = '0x0D';
const animation13 = '0x0E';
const animation14 = '0x0F';
const animation15 = '0x10';
const animation16 = '0x11';
const animation17 = '0x12';
const animation18 = '0x13';
const animation19 = '0x14';
const animation20 = '0x15';
const animation21 = '0x16';
const animation22 = '0x17';
const animation23 = '0x18';
const animation24 = '0x19';
const animation25 = '0x01A';

exports.textAnimationValue = function(content){
    switch (content){
        case animation00:
            return 'NONE';
        case animation01:
            return 'positionLeft';
        case animation02:
            return 'positionRight';
        case animation03:
            return 'positionTop';
        case animation04:
            return 'positionBottom';
        case animationaa:
            return 'positionLeft';
        case animation05:
            return 'NONE';
        case animation06:
            return 'NONE';
        case animation07:
            return 'NONE';
        case animation08:
            return 'NONE';
        case animation09:
            return 'NONE';
        case animation10:
            return 'NONE';
        case animation11:
            return 'NONE';
        case animation12:
            return 'NONE';
        case animation13:
            return 'NONE';
        case animation14:
            return 'NONE';
        case animation15:
            return 'NONE';
        case animation16:
            return 'NONE';
        case animation17:
            return 'NONE';
        case animation18:
            return 'NONE';
        case animation19:
            return 'NONE';
        case animation20:
            return 'NONE';
        case animation21:
            return 'NONE';
        case animation22:
            return 'NONE';
        case animation23:
            return 'NONE';
        case animation24:
            return 'NONE';
        case animation25:
            return 'NONE';
        default:
            return 'NONE';
    }
};
