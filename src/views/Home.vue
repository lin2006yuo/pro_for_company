<template>
  <div class="home">
    <control/>
    <l-table :data="data" v-on:update:is_invalid="handleIvalidChange"/>
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
      data: []
    };
  },
  components: {
    Control,
    LTable
  },
  mounted() {
    this.data = this.handleData(data.data);
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
    }
  }
};
</script>
