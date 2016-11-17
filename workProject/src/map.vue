<template>
    <div class="map">
        <app-header>
            <span slot="center">地图</span>
            <span class="right" slot="right" v-gesture:tap.stop.prevent="save_position">保存</span>
        </app-header>
        <map :center="center" :map_click="map_click" :leds="leds">
            <map-footer v-show="select_position" slot="footer">
                <!-- <span v-gesture:tap.stop.prevent="edit">edit</span> -->
                <div class="input-address"><input type="text" v-model="address" placeholder="未能检索到附近的位置信息，请手动输入" /></div>
                <ul class="nearbys">
                    <li class="nearby" v-for="nearby in nearbys" v-gesture:tap.stop.prevent="select($index)" :class="{'active': $index == addressIndex}">
                        <div class="title">{{nearby.title}}</div>
                        <!-- <div class="address">{{nearby.address}}</div> -->
                    </li>
                </ul>
            </map-footer>
        </map>
    </div>
</template>

<style lang="scss">
    .map-footer{
        .input-address{
            input{
                border:0;
                border-radius:0;
                padding-left:32px;
                background:url(../static/map-edit.png) no-repeat 7px 7px;
                background-size:20px;
            }
        }
    }
    .nearbys{
        margin:0;
        max-height:141px;
        overflow-y:auto;

        li.nearby:first-child{
            border-top: 2px solid #12b7f5;
        }
        .nearby
        {
            position:relative;
            margin:0;
            padding:5px 10px 5px 32px;
            border-bottom: 1px solid #ddd;

            div
            {
                text-align: left;
            }

            .title
            {
                color:#666;
                font-size:15px;
                line-height:24px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            .address
            {
                color:#999;
                font-size:14px;
                line-height:20px;
                padding:2px 0;
            }

            &:last-child
            {
                border:0;
            }

            &.active
            {
                // .address
                // {
                //     color:#028dea;
                // }
                // .title{
                //     color:#028dea;
                // }
            }

            &:before
            {
                position:absolute;
                top:10px;
                left:8px;
                width:14px;
                height:14px;
                content:"";
                display:block;
                border-radius:50%;
                border:1px solid #ddd;
                z-index:99;
                background-color:#fff;
            }

            &:after
            {
                z-index:999;
                background-color:#ddd;
                position:absolute;
                top:13px;
                left:11px;
                width:10px;
                height:10px;
                display:block;
                content:"";
                border-radius:50%;
            }
            &.active:before
            {
                border-color:#12b7f5;
            }
            &.active:after
            {
                background-color:#12b7f5;
            }
        }
    }
    .map{
        .map-footer{
            padding:0;
            background-color:#fff;
        }
    }

</style>
<script lang="babel">
    import Vue from 'vue';
    import vueGesture from 'vue-gesture';
    Vue.use(vueGesture);
    import appHeader from './components/app-header.vue';
    import map from './components/map/Map.vue';
    import mapFooter from './components/map/map-footer.vue';
    import mapMessage from './message/map';
    import ledMessage from './message/led';
    import inputDiv from './components/input.vue';
    export default{
        data(){
            return {
                center:{
                    lng:113.951371,
                    lat:22.546424
                },
                ledid:0,
                leds: [],
                led_position:null,
                address:'',
                addressIndex:null,
                geoc : new BMap.Geocoder(),
                nearbys:[]
            }
        },
        route:{
            data({to:{query}}){
                this.ledid = query.id;
            }
        },

        ready(){
            ledMessage.get_position(this.ledid).then((position)=>{
                this.led_position = position.position;
                if(this.led_position.lat != 0 && this.led_position.lng != 0){
                    this.center = this.led_position;
                    this.address = position.address;
                }
            }).catch((code)=>{
                this.$toast({text:code,time:3000});
            });
        },

        components: {
            appHeader,
            mapFooter,
            map,
            inputDiv,
        },
        methods:{
            map_click(position){
                this.led_position = position;
                this.geoc.getLocation(position, (rs)=>{
                    this.nearbys = rs.surroundingPois;
                    this.addressIndex = 0;
                    if(this.nearbys.length>0){
                        this.address = this.nearbys[0].title +'-'+ this.nearbys[0].address;
                    }else{
                        this.address = "";
                    }
                });
            },
            edit(){

            },
            save_position(){
                if(this.address != ''){
                    if(this.nearbys.length > 0){
                        var curaddress = this.nearbys[this.addressIndex].title + this.nearbys[this.addressIndex].address;
                    }else{
                        var curaddress = this.address;
                    }
                    ledMessage.set_position({id:this.ledid, position:this.led_position, address:curaddress}).then((result)=>{
                        this.$toast({text:'保存成功',func:()=>{history.back()}});
                    }).catch((code)=>{
                        this.$toast({text:'保存成功'});
                    });
                }else{
                    this.$toast({text:'请输入屏地址'});
                }

            },
            select(index){
                this.addressIndex = index;
                this.address = this.nearbys[index].title +'-'+ this.nearbys[index].address;
            }
        },
        computed:{
            select_position(){
                return this.led_position;
            }
        },
        watch:{
            led_position(position){
                this.leds = [{id:0, images:"static/led-icon/red.png",mapx:position.lng,mapy:position.lat}];
            }
        }
    }
</script>
