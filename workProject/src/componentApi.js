/**
 * Created by wuchuguang on 16-6-29.
 */

export default {
    scanQRCode(object){
        object = object || {};
        object.success = object.success || new ERROR("not success function");
        object.fail = object.fail || function(res){console.log(res);};
    },

    previewImage(curImg, imgs, ffunc){

    },

    chooseImage(sfunc, ffunc){

    },

    uploadImage(imgs, sfunc, ffunc){

    },

    downloadImage(imgs, sfunc, ffunc){

    },

    networkEnv(sfunc, ffunc){

    },

    getLocation(sfunc, ffunc){

    }


}
