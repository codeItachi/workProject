<template>
    <span class="submit-tip">
      <div v-gesture:tap.stop.prevent="doSubmit()"><slot></slot></div>
      <toast :show.sync="show" :time="time" :type="type" :over_cb="over_cb">{{text}}</toast>
    </span>
</template>

<script lang="babel">
import Vue from 'vue';
import vueGesture from 'vue-gesture';
import Toast from './toast';
Vue.use(vueGesture);


export default {
    components: {
        Toast
    },

    ready() {
        var self = this;
        this.$on('reply', (Object) =>{
            self.reply = true;
            self.selfComiple({
                result: Object
            });
        });
    },

    data() {
        return {
            run: false,
            reply: false,
            type: 'text',
            show: false,
            time: 2000,
            text: '',
            over_cb: () => {}
        };
    },

    methods: {
        doSubmit() {
            if(this.run) return;
            this.run = true;
            if(this.work.tip){
                this.show = this.work.tip.show || false;
                this.text = this.work.tip.text || "work";
                this.time = this.work.tip.time || 0;
            }
            this.work.func.call(this.component || this.$parent);
            if (this.time && this.time > 0) {
                setTimeout(() =>{
                    this.reply || this.selfComiple({result: 'timeout'});
                }, this.time);
            }
        },

        selfComiple(result) {
            if (result.result != 'timeout') {
                if (this.compile) {
                    if (this.compile.call(this.component || this.$parent,result.result)) {
                        this.selfSuccess(result.result);
                    } else {
                        this.selfFail(result.result);
                    }
                } else {
                    this.selfSuccess(result.result);
                }

            } else {
                this.selfFail(result.result);
            }
        },

        selfSuccess(result) {
            if(this.success.tip){
                this.show = this.success.tip.show || false;
                this.text = this.success.tip.text || "success";
                this.time = this.success.tip.time || 0;
                this.over_cb = ()=> {this.success.func && this.success.func.call(this.component || this.$parent, result)};
            } else {
                this.success.func && this.success.func.call(this.component || this.$parent, result);
            }
            this.run = false;

        },

        selfFail(result) {
            console.log(this);
//            console.log("selfFail");
            if(this.fail.tip){
                this.show = this.fail.tip.show || false;
                this.text = this.fail.tip.text || "fail";
                this.time = this.fail.tip.time || 0;
                this.over_cb = ()=> {this.fail.func && this.fail.func.call(this.component || this.$parent, result)};
            }else{
                this.fail.func && this.fail.func.call(this.component || this.$parent, result);
            }
            this.run = false;
        }
    },

    props: {
        component:{
        },
        work: {
            required: true,
            type: Object
        },

        compile: {
            required: false,
            type: Function
        },

        success: {
            required: true,
            type: Object
        },

        fail: {
            required: true,
            type: Object
        }
    }
}
</script>