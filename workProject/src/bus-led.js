/**
 * Created by wuchuguang on 16-6-16.
 */

export default {
    lists: ['ss','gg'],
    getLists(){
        console.log('getLists');
        return this.lists;
    },
    setLists(lists){
        this.lists = lists;
    }
}