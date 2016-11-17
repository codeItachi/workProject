<template>
    <div class="put-location" :class="{'up':styleStates}">
        <tit-menu :caption="caption"></tit-menu>
        <div class="location-map" :class="{'down':mapHeight}">
            <slot></slot>
            <div class="slide">
                <a v-gesture:tap.stop.prevent="mapdown"></a>
            </div>
        </div>

        <div class="search-results" :class="{'show':searchResults.show}">
            <span>
                <h3>{{searchResults.searchArea}}</h3>
                <a class="select-all blue" v-if="!allSelect" v-gesture:tap.stop.prevent="allCheck">全选</a>
                <a class="select-all " v-else v-gesture:tap.stop.prevent="allUncheck">全部取消</a>
            </span>
            <div>
                <span>搜索到附近led屏，是否投放。</span>
                <ul class="result-list">
                    <li v-for="list in searchResults.lists">
                        <label class="checkboxicon"><input name="select_{{$index}}" type="checkbox" v-model="list.select"><i></i> {{$index+1 + list.address}}</label>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script lang="babel">
    import Vue from 'vue';
    import titMenu from './tit-menu';
    import vueGesture from 'vue-gesture';
    Vue.use(vueGesture);

    export default {
        components: {
            titMenu,
        },

        data(){
            return {
                styleStates: false,
                caption:"地理位置",
                mapHeight:true,
                currentCheck:[],
            }
        },

        //接收子容器传入状态
        ready(){
            this.$on('statu',function(state){
                this.styleStates = state;
            });

            this.$on('show',function(show){
                this.mapHeight = show;
            });
        },

        methods:{
            allCheck(){
                let length = this.searchResults.lists.length;
                for(let i = 0; i < length; i++){
                    this.searchResults.lists[i].select = true;
                }
            },
            allUncheck(){
                let length = this.searchResults.lists.length;
                for(let i = 0; i < length; i++){
                    this.searchResults.lists[i].select = false;
                }
            },

            mapdown(){
                this.mapHeight= !(this.mapHeight);
            }
        },

        computed:{
            allSelect(){
                let length = this.searchResults.lists.length;
                for(let i=0; i < length; i++){
                    if(!this.searchResults.lists[i].select) return false;
                }
                return true;
            }
        },

        props:{
            searchResults:{
                required:true,
                type:Object,
            },
        }
    }
</script>