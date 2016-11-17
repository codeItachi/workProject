<template>
    <div class="auto-adapt" :class="{'active':selectauto }">
        <div class="radiobutton" >
            <label class="radioicon" ><input type="checkbox" name="adstatus"  v-model="selectauto" ><i></i>自适应显示屏</label>
        </div>
        <slot name="tab"></slot>
    </div>
</template>
<script lang="babel">
    import tabText from './tab-text';

    export default{
        coponents:{
            tabText,
        },
        props:{
            selectauto:{
                required:true,
                type:Boolean,
                twoWay:true,
            }
        },
        ready(){

        },
        data(){
            return{
                
            }
        },
        methods:{
            
        },
        watch:{
        },
    }
</script>
<style lang="scss" scoped>
    .auto-adapt {
        width: 100%;
        .radiobutton {
            width: 85%;
            height: 40px;
            background: #72c6f7;
            line-height: 40px;
            text-align: center;
            color: #fff;
            border-radius: 40px;
            margin: 10px auto 10px;
            .radioicon{
                top:10px;
            }
        }
    }

</style>