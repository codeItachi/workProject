<template>
    <div class="add-led">
        <span v-if="!ledimg" ><a class="i-add" v-gesture:tap.stop.prevent="ledimg_add"></a></span>
        <span v-else>
            <a class="close"  v-gesture:tap.stop.prevent="ledimg_del(ledimg)">&times;</a>
            <img :src="local_image" />
        </span>
    </div>
</template>
<script>
    import Vue from 'vue';
    import vueGesture from 'vue-gesture';
    Vue.use(vueGesture);
    import weixin from '../../weixin';

    export default {
        ready(){
            console.log('ready');
        },
        data(){
            return{
            }
        },
        props:{
            local_image:{
                required:true,
                twoWay:true,
            },
            server_image:{
                required:true,
                twoWay:true,
            }
        },
        watch:{
        },
        methods:{
             // 添加图片
            ledimg_add(){
                weixin.exe(()=>{
                    weixin.chooseImage().then((imgs) =>{
                        imgs.forEach((img)=>{
                            this.local_image = img;
                        });
                        weixin.uploadImage(imgs,(ret)=>{
                             if('upone' == ret.event){
                                 this.$toast({text:'上传成功一张'});
                             }
                             if('upend' == ret.event){
                                 this.$toast({text:'全部上传成功',time:1500});
                                 this.server_image = ret.data;
                             }
                             this.$toast({text:'图片上传成功',time:1500});
                        })
                    }).catch((code)=>{
                        console.error(code);
                    });
                });
            },
            // 删除图片
            ledimg_del(img){
                this.server_image = null;
                this.local_image = null;
            },
        },
        computed:{
            ledimg(){
                return this.local_image;
            }
        }
    }
 
</script>
<style lang="scss">
    .add-led{
        span{

            img{
                display: inline-block;
                margin: 5px;
                width: 58px;
                height: 58px;
                background:rgba(0,0,0,0.6)
            }
            .close{
                position: absolute;
                left:65px;
                display: inline-block;
                width: 18px;
                height: 18px;
                line-height: 18px;
                text-align: center;
                background: #f00;
                color:#fff;
                border-radius: 50%;
            }
        }
    }
</style>