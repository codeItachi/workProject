/**
 * Created by wuchuguang on 16-6-16.
 */

export default {
    preview(content){
        this.$socket.sendCmd(11003, {content:content},(cmd,data)=>{
            console.log(data.data);
            this.programid = data.data.id;
        });
    }

}