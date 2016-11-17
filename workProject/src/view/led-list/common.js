
exports.type2image = function(type){
    switch (type){
        case 100:
            return '/static/ad-text.png';
        case 200:
            return '/static/ad-time.png';
        case 300:
            return '/static/ad-img.png';
        default:
            console.log("type:" + type + "; not define image");
            return '';
    }
}