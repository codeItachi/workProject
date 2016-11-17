<template>
    <div id="map">
        <div id="maper"></div>
        <slot></slot>
        <slot name="footer"></slot>
    </div>
</template>
<style lang="scss">
    @import "./layout.scss";
</style>
<script lang="babel">
    import Vue from 'vue';
    import mapImpl from './newmap';
    import map from '../../message/map';

    const default_options = {
        dragend:true,
        marker_click:true,
    };

    export default{
        components:{
        },
        data(){
            return{
                search_active:false,
                show:false,
                map: mapImpl,
                keyword: '',
                results: [],
                error:"",
            }
        },
        methods: {
            ref_markers(leds){
                leds instanceof Array && this.map.addMarkers(leds);
            },
        },
        ready(){
            this.options = this.options || default_options;
            this.map.init('maper');
            this.map.marker_click  = this.marker_click;
            this.map.map_click  = this.map_click;
            this.map.movePoint(this.center, this.zoom);
            this.ref_markers(this.leds);
        },
        destroyed(){
            this.map.destory();
        },
        watch:{
            keyword(keyword){
                if('' == keyword){
                    this.show = false;
                    this.search_active = false;
                    this.error = ''
                }else{
                    this.search_active = true;
                    this.show = true;
                    map.keyword(keyword).then((results) =>{
                        this.error = '';
                        this.results = results;
                    }).catch((code) =>{
                        this.error = code;
                    });
                }

            },
            marker_click(func){
                this.map.marker_click  = func;
            },
            map_click(func){
                this.map.map_click  = func;
            },
            center(center){
                this.map.movePoint(center, this.zoom);
            },
            leds(leds){
                this.ref_markers(leds);
            }
        },
        props:[
            {name:'options',type:Object},
            {name:'center',required:true},
            {name:'marker_click'},
            {name:'map_click'},
            {name:'leds'},
            {name:'zoom',type:Number,default:19}
        ]
    }
</script>