<template>
    <div class="input" :class="{'show' : show}">
        <div class="input-body">
            <input :type="type" v-model="value" @focus="input_focus" @blur="inputok"/>
        </div>
    </div>
</template>
<style lang="scss">
    .input{
        &.show{
            z-index: 100000;
            position: fixed;
            padding:46px 25px;
            top:0;
            left:0;
            width:100%;
            height:100%;
            overflow-y: hidden;
            background-color:rgba(0,0,0,0.6);

            input
            {

            }
        }
    }
</style>
<script lang="babel">

    export default{
        data(){
            return{
                show:false
            }
        },
        components:{

        },

        methods:{
            input_focus(){
                this.cancel && this.ok(this.thisComponent);
                this.show = true;
            },
            inputok(){
                this.ok && this.ok.call(this.thisComponent, this.value);
                this.show = false;
            }
        },

        props:{
            value:{
                required:true,
                type:String,
                twoWay:true,
            },
            type:{
                required:false,
                type:String,
                default: 'text',
            },
            ok:{
                required:false,
                type:Function,
            },
            cancel:{
                required:false,
                type:Function,
            },
            thisComponent:{
                required:true,
                type:Object,
            },
        }
    }
</script>
