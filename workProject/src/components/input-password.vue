<template>
    <div class="input-password ">
        <input type="{{show}}" placeholder="{{placeholder}}"  class="password" v-model="pwd"/>
        <span class="eye" :class="eye" v-gesture:tap.stop.prevent="change_display"></span>
    </div>
</template>
<style lang="scss">

    .input-password{
        position: relative;
        input{
            width:100%;
            height:42px;
        }
        span{
            position: absolute;
            top: 0px;
            right:5px;
            display: block;
            width:32px;
            height:32px;
            background-image: url(../../static/eyes.png);
            background-repeat:no-repeat;
            background-position:-9px -5px;
            background-size:100px;
            /*background-color: green;*/
            &.active{
                background-position:-57px -5px;
            }
        }
    }
</style>
<script>

    import Vue from 'vue';
    import vueGesture from 'vue-gesture';
    Vue.use(vueGesture);

    export default{
        data(){
            return {
                display: false,
            }
        },
        props:{
            pwd:{
                required:true,
                twoWay:true,
            },
            placeholder:{
                required:true,
            }

        },
        components: {},
        methods: {
            change_display(){
                this.display = !(this.display);
            }
        },
        computed: {
            show(){
                if(this.display){
                    return 'text';
                }else{
                    return 'password';
                }
            },
            eye(){
                if(this.display){
                    return 'active';
                }else{
                    return '';
                }

            },
        }
    }
</script>