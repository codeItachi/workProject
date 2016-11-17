// 项目内型
exports.program_type = {
    text: 'text',
    image: 'image',
    time: 'time',
};
//正则
exports.regexp = {
    account: new RegExp(/^[a-zA-z0-9]\w{3,15}$/),
    //字母、数字、下划线组成,字母数字开头结尾,4-16位。
    phone:new RegExp(/^1[3|4|5|7|8]\d{9}$/),
    //表示以1开头,第二位可能是3/4/5/7/8等的任意一个,在加上后面的\d表示数字[0-9]的9位,总共加起来11位结束
    email: new RegExp(/^[a-zA-Z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/),
    // 不能“_”或“-” “.”开头或者结尾
    password: new RegExp(/^.{1,}$/),
    // 不能全是数字  不能全是字母 不能全是符号 长度不能少于8位
    programid: new RegExp(/^\d{2}$|^[1-9]$/),
    auth_time: 60,
    number: new RegExp(/^[0-9]{1,}$/),
};

//判断尺寸
exports.validfunc = {
    ledsize(size, title){
        if(size === null){
            return title + "不能为空";
        }
        if(size % 8  != 0){
            return title + "不是8的倍数";
        }

        return true;
    }
};
