/**
 * Created by wuchuguang on 16-7-5.
 */


export default class asynClas{
    successDo = null;
    catchFunc = null;
    thenFunc = null;
    constructor(){
        let that = this;
        Object.defineProperties(this, {
            success:{
                set(val){
                    that.successDo = val;
                    if(that.catchFunc){
                        that.catchFunc.call(that, val);
                    }
                },
                get(){
                    return that.successDo;
                }
            }
        });
    }

    then(func){
        if(this.successDo){
            func(this.successDo);
        }
        this.thenFunc = func;
    }

    catch(func){

    }
}