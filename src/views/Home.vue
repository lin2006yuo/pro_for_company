<template>
  <div class="home">
    <control @change="handleChange"/>
    <l-table @edit="edit" :data="data" v-on:update:is_invalid="handleIvalidChange"/>
  </div>
</template>

<script>
import Control from "@/components/control";
import LTable from "@/components/table";
import data from "@/mock/data";

export default {
  name: "home",
  data() {
    return {
      data: [],
      origin_data: []
    };
  },
  components: {
    Control,
    LTable
  },
  mounted() {
    this.data = this.handleData(data.data);
    this.origin_data = [...this.data];
  },
  methods: {
    handleData(data) {
      return data.map(v => {
        v.is_invalid = this.formatValid(v.is_invalid);
        v.expiry_time = this.formatTime(v.expiry_time);
        v.create_time = this.formatTime(v.create_time);
        v.update_time = this.formatTime(v.update_time);
        return v;
      });
    },
    formatTime(timestamp) {
      return new Date(timestamp * 1000)
        .toLocaleDateString()
        .replace(/\//g, "-");
    },
    formatValid(valid) {
      return parseInt(valid) ? true : false;
    },
    handleIvalidChange(row) {
      const index = this.data.indexOf(row);
      this.data[index].is_invalid = !this.data[index].is_invalid;
    },
    //编辑table
    edit(row, index) {
      this.data.splice(index, 1, row);
      const o_index = this.findIndex(this.origin_data, row);
      this.origin_data.splice(o_index, 1, row);
    },
    findIndex(arr, el) {
      // console.log(el);
      return arr.findIndex(v => {
        return v.id === el.id;
      });
    },
    //改变 【全部】【启用】【停用】状态
    handleChange(type) {
      if (type === "全部") {
        this.data = this.origin_data;
      } else if (type === "启用") {
        console.log(type);
        this.data = this.origin_data.filter(v => {
          return v.is_invalid === true;
        });
      } else if (type === "停用") {
        console.log(type);
        this.data = this.origin_data.filter(v => {
          return v.is_invalid === false;
        });
      }
    }
  }
};
</script>
