<template>
<div class="input-item boardType">
    <label>{{dropDownDate.title}}</label>
    <div>
        <a :class="{'prompt': currentList === false}" class="i-turn-b" v-gesture:tap.stop.prevent="selectBox()">{{selectText}}</a>
        <ul class="dropDown" :class="[{'hide': isHideBox},dropDownDate.position]"> <!--hide:隐藏  bot:下 top:上 -->
            <li v-for="item in dropDownDate.list" v-gesture:tap.stop.prevent="selectedList($index)" :class="{'active':dropDownDate.slectValue===($index)}">
                {{item}}
            </li>
        </ul>
    </div>
</div>
</template>

<script>
export default {
    data(){
        return{
            isHideBox:true,
            // currentList: false,
        }
    },
    props:{
        dropDownDate:{
            required:true,
            type:Object,
        },
    },

    methods:{
        selectBox(){
            this.isHideBox = !(this.isHideBox);
        },
        selectedList(type){
            this.dropDownDate.slectValue = type;
            this.selectBox();
        },
    },

    computed:{
        selectText(){
            if(null !== this.dropDownDate.slectValue){
                return this.dropDownDate.list[this.dropDownDate.slectValue];
            }
            return this.dropDownDate.placeholder;
        }
    }
}
</script>