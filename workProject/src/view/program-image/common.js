// 运动方式
const animationWays = [
    {key:"立即显示",value:"0x01"},
    {key:"上移",value:"0x04"},
    {key:"连续左移",value:"left"},
    {key:"左移",value:"0x02"},
    {key:"下移",value:"0x05"},
    {key:"右移",value:"0x03"},
    {key:"镭射",value:"0x0F"},
    {key:"飘雪",value:"0x09"},
    {key:"冒泡",value:"0x0A"}
];
exports.animationwayList = animationWays;
exports.animationWayFlagValue = (content)=>{
    let len = animationWays.length;
    for(let i = 0; i < len; i++){
        let animationWay = animationWays[i];
        if(animationWay.value == content)
            return i;
    }
    return ;
};
// 字体颜色
const colorLists =[
    {key:"红色",value:"255"},
    {key:"绿色",value:"65280"},
    {key:"黄色",value:"65535"},
    {key:"蓝色",value:"16711680"},
    {key:"紫色",value:"16711935"},
    {key:"青色",value:"16776960"},
    {key:"白色",value:"16777215"},
    ];
exports.colorList = colorLists;
exports.colorFlagValue = (content)=>{
    let Len = colorLists.length;
    for(let i = 0; i<Len; i++){
        let colorlist = colorLists[i];
        if(content == colorlist.value){
            return i;
        }
    }
};
// 字号
const fontsizeLists =[
    {key:"自适应",value:'0'},
    {key:"16",value:'16'},
    {key:"24",value:'24'},
    {key:"32",value:'32'},
    {key:"48",value:'48'},
    {key:"64",value:'64'},
    ];
exports.fontsizeList = fontsizeLists;
exports.fontsizeFlagValue = (content)=>{
    let Len = fontsizeLists.length;
    for(let i = 0; i<Len; i++){
        let fontsizelist = fontsizeLists[i];
        if(content == fontsizelist.value){
            return i;
        }
    }
};
// 字体
const fontLists =[
    {key:"黑体"},
    {key:"宋体"},
    {key:"楷体"},
    {key:"隶书"},
    {key:"微软雅黑"},
    {key:"幼圆"},
    ];
exports.fontList = fontLists;
exports.fontFlagValue = (content)=>{
    let Len = fontLists.length;
    for(let i = 0; i<Len; i++){
        let fontlist = fontLists[i];
        if(content == fontlist.key){
            return i;
        }
    }
};
// 停留时间
const remaintimeLists =[
    {key:"1"},
    {key:"2"},
    {key:"3"},
    {key:"4"},
    {key:"5"},
    ];
exports.remaintimeList = remaintimeLists;
exports.remaintimeFlagValue = (content)=>{
    let Len = remaintimeLists.length;
    for(let i = 0; i<Len; i++){
        let remaintimelist = remaintimeLists[i];
        if(content == remaintimelist.key){
            return i;
        }
    }
};

// 速度
const speedLists =[
    {key:"0"},
    {key:"1"},
    {key:"2"},
    {key:"3"},
    {key:"4"},
    {key:"5"},
    {key:"6"},
    {key:"7"},
    {key:"8"},
    {key:"9"},
    {key:"10"},
    {key:"11"},
    {key:"12"},
    {key:"13"},
    {key:"14"},

    ];
exports.speedList = speedLists;
exports.speedFlagValue = (content)=>{
    let Len = speedLists.length;
    for(let i = 0; i<Len; i++){
        let speedlist = speedLists[i];
        if(content == speedlist.key){
            return i;
        }
    }
};
//亮度
const brightLists =[
    {key:"1"},
    {key:"2"},
    {key:"3"},
    {key:"4"},
    {key:"5"},
    {key:"6"},
    {key:"7"},
    {key:"8"},
    {key:"9"},
    {key:"10"},
    {key:"11"},
    {key:"12"},
    {key:"13"},
    {key:"14"},
    {key:"15"}
];
exports.brightList = brightLists;
exports.brightFlagValue = (content)=>{
    let Len = speedLists.length;
    for(let i = 0; i<Len; i++){
        let brightlist = brightLists[i];
        if(content == brightlist.key){
            return i;
        }
    }
};
// 边框
const borderLists = [
    {key:"无"},
    // {key:"黄双线环绕",value:"0xf0"},
    // {key:"绿双线环绕",value:"0xE0"},
    // {key:"红双线环绕",value:"0xD0"},
];
exports.borderList = borderLists;
exports.borderFlagValue = (content)=>{
    let Len = borderLists.length;
    for(let i = 0; i<Len; i++){
        let borderlist = borderLists[i];
        if(content == borderlist.value){
            return i;
        }
    }
};
// 0x00	1/16扫描:直行走线,一路数据带16行.
// 0x80	0/8 扫描:不打折,一路数据带8行.
// 0x81	1/8 扫描:每8点向下打折一次,一路数据带16行.
// 0x82	2/8 扫描:每8点向上打折一次,一路数据带16行.
// 0x41	1/4扫描:四扫下行(1路16行)(04-P16-08).
// 0x42	2/4扫描:四扫下行(1路8行)(04-P08-08).
// 0x43	3/4扫描:每8点打折，行反列正8（1路16行).
// 0x44	4/4扫描:四扫下行(1路8行)(04-P16-08).
// 0x45	5/4扫描:四扫下行(1路8行)(04-P16-08)(无138译码).
// 0x46	6/4扫描
// 0x47	7/4扫描
// 0x48	8/4扫描:75接口全彩模组
// 0x10	1.0扫描:90接口静态模组
// 0x11	1.1扫描:73接口静态模组


//扫描方式
const scanTypeLists = [
    {key:'1/16扫描:直线走线，一路带16行',value:"0x00"},
    {key:'0/8扫描:不打折，一路带8行',value:"0x80"},
    {key:'1/8扫描:8点向下打折，一路带16行',value:"0x81"},
    {key:'1/4扫描:四扫下行(1路16行)',value:"0x41"},
    {key:'2/4扫描:四扫下行(1路8行)',value:"0x42"},
    {key:'3/4扫描:8点打折，行反列正8(1路16行)',value:"0x43"},
    {key:'4/4扫描:四扫下行(1路8行)',value:"0x44"},
    {key:'5/4扫描:四扫下行(1路8行)(无138译码)',value:"0x45"},
    {key:'6/4扫描:',value:"0x46"},
    {key:'7/4扫描:',value:"0x47"},
    {key:'8/4扫描:75接口全彩模组',value:"0x48"},
    {key:'1.0扫描:90接口静态模组',value:"0x10"},
    {key:'1.1扫描:73接口静态模组',value:"0x11"},
]
exports.scanTypeList = scanTypeLists;
exports.scantypeFlagValue = (content)=>{
    let Len = scanTypeLists.length;
    for(let i = 0; i<Len; i++){
        let scanTypeList = scanTypeLists[i];
        if(content == scanTypeList.value){
            return i;
        }
    }
};
exports.scanType2Value = (type)=>{
    let Len = scanTypeLists.length;
    for(let i = 0; i<Len; i++){
        let scanTypeList = scanTypeLists[i];
        if(type == scanTypeList.value){
            return scanTypeList.key;
        }
    }
};
//极性
const dataPolarLists =[
    {key:"低",value:0},
    {key:"高",value:1}
]
exports.dataPolarList = dataPolarLists;
exports.dataPolarFlagValue = (content)=>{
    let Len = dataPolarLists.length;
    for(let i = 0; i<Len;i++){
        let dataPolarList = dataPolarLists[i];
        if(content == dataPolarList.value){
            return i;
        }
    }
}
exports.dataPolarValue = (index)=>{
    let Len = dataPolarLists.length;
    for(let i = 0; i<Len;i++){
        let dataPolarList = dataPolarLists[i];
        if(index == i){
            return dataPolarList.key;
        }
    }
}
//基色
const typeColorLists =[
    {key:"单基色",value:1},
    {key:"双基色",value:2},
    {key:"三基色",value:3}
]
exports.typeColorList = typeColorLists;
exports.typeColorFlagValue = (content)=>{
    let Len = typeColorLists.length;
    for(let i = 0; i<Len;i++){
        let typeColorList = typeColorLists[i];
        if(content == typeColorList.value){
            return i;
        }
    }
}
exports.typeColorValue = (index)=>{
    let Len = typeColorLists.length;
    for(let i = 0; i<Len;i++){
        let typeColorList = typeColorLists[i];
        if(index == typeColorList.value){
            return typeColorList.key;
        }
    }
}

const scanType00 = '0x00';
const scanType01 = '0x00';
const scanType02 = '0x00';
const scanType03 = '0x00';
const scanType04 = '0x00';
const scanType05 = '0x00';
const scanType06 = '0x00';
const scanType07 = '0x00';
const scanType08 = '0x00';
const scanType09 = '0x00';
const scanType10 = '0x00';
const scanType11 = '0x00';
const scanType12 = '0x00';
const scanType13 = '0x00';
exports.scanTypeValue = (content)=>{
    switch(content){
        case scanType00:
            return 'none';
        case scanType02:
            return 'none';
        case scanType03:
            return 'none';
        case scanType04:
            return 'none';
        case scanType05:
            return 'none';
        case scanType06:
            return 'none';
        case scanType07:
            return 'none';
        case scanType08:
            return 'none';
        case scanType09:
            return 'none';
        case scanType10:
            return 'none';
        case scanType11:
            return 'none';
        case scanType12:
            return 'none';
        case scanType13:
            return 'none';
    }

}

// 运动方式
const animation00 = '0x01';
const animation01 = '0x02';
const animation02 = '0x03';
const animation03 = '0x04';
const animation04 = '0x05';
const animationaa = 'left';
const animation05 = '0x06';
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
        case animation26:
            return 'NONE';
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

//字体大小
const fontsize0 = 0;
const fontsize1 = 1;
const fontsize2 = 2;
const fontsize3 = 3;
const fontsize4 = 4;
const fontsize5 = 5;
exports.textFontsizeValue = function(content){
    switch (content){
        case fontsize0:
            return '24px';
        case fontsize1:
            return '16px';
        case fontsize2:
            return '24px';
        case fontsize3:
            return '32px';
        case fontsize4:
            return '48px';
        case fontsize5:
            return '64px';
        default:
            return 'NONE';
    }
};

// 字体
// 字体
const font0 = 0;
const font1 = 1;
const font2 = 2;
exports.textFontValue = function(content){
    switch (content){
        case font0:
            return '黑体';
        case font1:
            return '宋体';
        case font2:
            return '微软雅黑';
        default:
            return 'NONE';
    }
};

