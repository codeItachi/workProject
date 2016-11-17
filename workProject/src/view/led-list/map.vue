<template>
    <div class="map-content">
        <map :center="center" :leds.sync="leds">
        </map>
    </div>
</template>

<style lang="scss">

</style>
<script lang="babel">
    import Vue from 'vue';

    import map from '../../components/map/Map.vue';
    import ledMessage from 'message/led';
    import weixin from '../../weixin';

    export default {
        components:{
            map
        },
        props:{
            xselects:{
                required:true,
                type:Array,
            },
            gselects:{
                required:true,
                type:Array,
            },
            sselects:{
                required:true,
                type:Array,
            },
        },
        data(){
            return {
                leds:[],
                position:{lng:113.950339,lat:22.54387}
            };
        },
        created(){
            weixin.exe(()=>{
                weixin.getLocation((position)=>{
                        let convertor = new BMap.Convertor();
                        let pointArr = [];
                        pointArr.push(new BMap.Point(position.lng,position.lat));
                        convertor.translate(pointArr, 1, 5, (data)=>{
                            if(data.status === 0) {
                                this.position = data.points[0];
                                setTimeout(()=>this.$toast({text:'已定位到当前位置'}), 3000);
                            }
                        });
                });
            });
            ledMessage.get_leds_position().then((leds)=>{
                this.leds = leds.map((led)=>{
                        if(this.isSelect(led)){
                            led.images = "static/led-icon/red.png";
                        }else{
                            led.images = "static/led-icon/green.png";
                        }
                        return led;
                    });
            }).catch(code=>{

            });
        },
        ready(){

        },
        methods:{
            isSelect(led){
                let slen = this.sselects.length;
                for(let a = 0; a < slen; a++){
                    if(this.sselects[a].sid == led.id){
                        return true;
                    }
                }
                let xlen = this.xselects.length;
                for(let a = 0; a < xlen; a++){
                    if(this.xselects[a].sid == led.id){
                        return false;
                    }
                }
                let glen = this.gselects.length;
                for(let a = 0; a < glen; a++){
                    if(this.gselects[a] == led.gid){
                        return true;
                    }
                }
                return false;
            }
        },

        computed:{
            center(){
                //center:{lng:113.950339,lat:22.54387},
                if(this.position){
                    return this.position;
                }else{
                    return {lng:113.950339,lat:22.54387};
                }
            }
        }
    }
</script>