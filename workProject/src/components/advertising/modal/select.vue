<template>
  <div class="selected">
    <label class="lab-tit lef" v-show="title" :class="{'weui_cell_primary':readonly}">{{title}}</label>
    <div class="sel-con" v-if="!readonly">
      <select class="select" v-model="value">
        <option value="" v-if="placeholder" :selected="placeholder && !value">{{placeholder}}</option>
        <option :value="one.key" v-for="one in processOptions">{{one.value}}</option>
      </select>
    </div>
    <div class="weui_cell_ft" v-else>
      {{value}}
    </div>
  </div>
</template>

<script>

export default {
  computed: {
    processOptions: function () {
      if (this.options.length && this.options[0].key) {
        return this.options
      } else {
        return this.options.map(function (item) {
          return {
            key: item,
            value: item
          }
        })
      }
    }
  },
  watch: {
    value: function (newValue) {
      this.$dispatch('on-change', newValue);
    }
  },
  props: {
    title: {
      type: String,
      required: false
    },
    options: {
      type: Array,
      required: true
    },
    placeholder: {
      type: String
    },
    readonly: {
      type: Boolean,
      default: false
    },
    value: {
      type: String,
      twoWay: true
    }
  }
}
</script>
<style lang="scss">
.selected
{
  position: relative;
  padding-left:80px;

  .lab-tit
  {
    position:absolute;
    display:block;
    width:70px;
    height:30px;
    left:0;
    top:0;
    color:#666;
    font-size:15px;
    line-height:30px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .sel-con
  {
    position:relative;

    &:after
    {
      position: absolute;
      content: " ";
      display: block;
      width: 8px;
      height: 8px;
      top: 8px;
      right: 10px;
      transform: rotate(225deg);
      -webkit-transform: rotate(225deg);
      border-top: 1px solid #666;
      border-left: 1px solid #666;
    }
  }
  .select
  {
    width:100%;
    outline:0;
    height:30px;
    color:#666;
    font-size:14px;
    line-height:20px;
    padding:4px 25px 4px 8px;
    border:1px solid #ddd;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    appearance:none;
    -webkit-appearance:none;

    option
    {
      padding:4px 10px 4px 10px;
      font-size:14px;
    }
    option:nth-child(even) { background-color:#f5f5f5; }
  }
}
</style>