/**
 * Created by wuchuguang on 16-6-23.
 */

exports.timestamp = function(){
    return parseInt(new Date().getTime() / 1000);
};

exports.millisecond = function(){
    return new Date().getTime();
};

exports.tounicode = function(str)
{
    return escape(str).replace(/%/g,"\\").toLowerCase();
};


exports.request = function(url, json, method){
    method = method || 'GET';
    return new Promise((succ,fail)=>{
        var xhr = new XMLHttpRequest();
        if ("withCredentials" in xhr) {
        } else {
            xhr = new XDomainRequest();
        }
        xhr.open(method, url, true);
        if(method == 'POST' || method == 'post'){
            xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        }
        let data = [];
        for (var key in json){
            data.push(key+"="+json[key]);
        }
        console.log(typeof  data.join('&'));
        xhr.send(data.join('&'));
        xhr.onload = function(){
            if('200' == xhr.status){
                succ(xhr.responseText, xhr.status)
            }else{
                fail(xhr.responseText, xhr.status);
            }
        }
    });
}