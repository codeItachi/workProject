<template>
    <div class="put-location" :class="{'up':styleStates}">
        <div class="module-tit" v-gesture:tap.stop.prevent="showContent">
            <h2>地理位置</h2>
            <a class="">{{styleStates | textState "展开" "收起" }}</a>
        </div>
        <div class="location-map">

            <map lng="113.951219" lat="22.544026">
            </map>

            <div class="slide">
                <a></a>
            </div>
        </div>
        <div class="search-results  hide">
      <span>
        <h3>1.深大科技园</h3>
        <a class="select-all">全选</a>
      </span>
            <div>
                <span>搜索到附近led屏，是否投放。</span>
                <ul class="result-list">
                    <li>
                        <label class="checkboxicon"><input
                                type="checkbox"><i></i>1.深大科技园前门一块,深大科技园中门一块,深大科技园后门一块</label>
                    </li>
                    <li>
                        <label class="checkboxicon"><input type="checkbox"><i></i>2.深大科技园中门一块</label>
                    </li>
                    <li>
                        <label class="checkboxicon"><input type="checkbox"><i></i>3.深大科技园后门一块</label>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import vueGesture from 'vue-gesture';
    Vue.use(vueGesture);
    import map from '../map/Map.vue';
    Vue.filter("textState", function (styleStates, trueVal, falseVal) {
        if (styleStates)return trueVal;
        return falseVal;
    })

    export default {
        data(){
            return {
                styleStates: false
            }
        },

        methods: {
            showContent(){
                this.styleStates = !(this.styleStates);
            },
        },
        components: {
            map,
        }
    }
</script>
