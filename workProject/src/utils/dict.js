/**
 * Created by wcg on 16-8-9.
 */


export default class Dict{
    constructor(){
        this.objects = {};
    }
    store(key, value){
        if(this.objects[key]){
            let arr = this.objects[key];
            if(-1 == arr.indexOf(value)){
                arr.push(value);
            }
            this.objects[key] = arr;
        }else{
            this.objects[key] = [value];
        }
    }
    find(key) {
        return this.objects[key];
    }
    map(key, map){
        let arr = this.find(key);
        if(arr){
            return arr.map(map);
        }
        return null;
    }
    del(key){
        delete this.objects[key];
    }

};