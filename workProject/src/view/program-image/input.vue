<template>
    <div class="input" :class="{'show' : show}">
        <div class="input-body">
            <input :type="type" :disabled="disable" v-model="value" @focus="input_focus" @blur="input_blur"/>
        </div>
    </div>
</template>
<style lang="scss">
    .input{
        display: inline-block;
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
                if(this.disable)return;
                this.focus && this.focus(this.thisComponent || this);
                this.show = true;
                return false;
            },
            input_blur(){
                if(this.disable)return;
                this.blur && this.blur.call(this.thisComponent || this, this.value);
                this.show = false;
            }
        },

        props:{
            disable:{
                required:false,
                type:Boolean,
            },
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
            focus:{
                required:false,
                type:Function,
            },
            blur:{
                required:false,
                type:Function,
            },
            thisComponent:{
                required:false,
                type:Object,
            },
        }
    }
</script>
