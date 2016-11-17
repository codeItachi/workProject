/**
 * Created by wcg on 16-7-20.
 */


import datef from 'datef';

let global_filter = {
    install(Vue, options){
        Vue.filter('isset_value_set', function(val, def){
            if(0 == val || null == val || undefined == val){
                return def || "未设定";
            }else{
                return val;
            }
        });
        Vue.filter('isset_value_empty', function(val, def){
            if('' == val || 0 == val || null == val || undefined == val){
                return def || "未填写内容...";
            }else{
                return val;
            }
        });

        //时间格式过滤器！https://github.com/hogart/datef
        Vue.filter('fdatetime', function(secs, format){
            format = format || 'YYYY.MM.dd: HH:mm:ss';
            return datef(format, secs * 1000);
        });

        //时间格式过滤器
        Vue.filter('fdatetime2', function(secs, format){
            if(secs == '--'){ 
                return '--'
            }else{
                format = format || 'YYYY.MM.dd: HH:mm:ss';
                return datef(format, secs * 1000);
            }
        });

        Vue.filter('first_img', function(imgs, def){
            if(imgs instanceof Array && imgs.length >= 1){
                return imgs[0];
            }else{
                return def;
            }
        });

        // const led_status_audit = 0;//等待审核
        // const led_status_leisure = 3; //空闲
        // const led_status_toufan= 2;//投放中
        // const led_status_soldout = 6;//下架
        Vue.filter('led_status_tag', function(status){
            status = parseInt(status);
            switch (status){
                case 0:return "等待审核";
                case 1:return "正常";
                case 2:return "投放中";
                case 3:return "空闲";
                default:return "未定义" + status;
            }
        });
        Vue.filter('led_status_class',function(status){
            status = parseInt(status);
            switch (status){
                case 1:return "s1";
                case 2:return "s2";
                case 3:return "s3";
                default:return "未定义" + status;
            }
        });

        //0编辑，1审核中，2审核失败，3审核成功，4投放失败正在重新投放，5正在投放，6投放结束
        Vue.filter('ad_status_tag', function(status){
            status = parseInt(status);
            switch (status){
                case 1:return "等待发送";
                case 2:return "正在发送";
                case 3:return "发送成功";
                case 4:return "发送失败";
                default:return "未定义" + status;
            }
        });

        Vue.filter('ad_status_class', function(status){
            status = parseInt(status);
            switch (status){
                case 1:return "s1";
                case 2:return "s2";
                case 3:return "s3";
                case 4:return "s4";
                case 5:return "s5";
                case 6:return "s6";
                default:return "未定义" + status;
            }
        });

        Vue.filter('adcontent', function(aditem){
            if(aditem && aditem.text && aditem.text.value){
                return aditem.text.value;
            }else{
                return '非文字广告';
            }
        });

        Vue.filter('adporgramno', function(aditem){
            if(aditem && aditem.no){
                return aditem.no;
            }else{
                return 'NONE';
            }
        });

        Vue.filter('led_state_tag', function(state){
            status = parseInt(status);
            switch (state){
                case 1: return '在线';
                case 0: return '离线';
            }
        });

        Vue.filter('date', function(sconds){
            var newDate = new Date();
            newDate.setTime(sconds * 1000);
            var month = newDate.getMonth() + 1;
            return newDate.getFullYear()+'/'+month+'/'+newDate.getUTCDate();

        });
    }
};

export default global_filter;