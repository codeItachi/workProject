<template>
    <div class="index">
        <input type="text" v-model="device"/>
        <button v-gesture:tap.stop.prevent="add_device" >添加设备</button>
    </div>
</template>
<style lang="scss">

</style>
<script lang="babel">

    import Vue from 'vue';
    import vueGesture from 'vue-gesture';
    Vue.use(vueGesture);
    import ledMessage from '../../message/led';
    export default{
        data(){
            return {
                device:''
            }
        },
        methods:{
            add_device(){
                ledMessage.add_device(this.device).then((text)=>{
                    this.$toast({text:text});
                }).catch(code=>{
                    this.$toast({text:code});
                })
            }
        },
        components: {}
    }
</script>
