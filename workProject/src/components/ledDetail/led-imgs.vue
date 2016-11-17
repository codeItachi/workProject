<template>
  <div class="ad-img-list">
    <ul>
      <li v-for="item in imglist"><img :src="item.path"/></li>
    </ul>
    <!--
    <span class="prev-img"></span>
    <span class="next-img"></span>
    -->
  </div>
</template>

<script>
export default {
    props:{
        imglist:{
            required:true,
            type:Array,
        }
    },

    methods:{

    }
}
</script>