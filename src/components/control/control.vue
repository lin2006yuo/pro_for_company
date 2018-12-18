<template>
  <div class="control_bar">
    <span>状态：</span>
    <el-radio-group @change="handleChange" v-model="selected" size="mini">
      <el-radio-button name="1" label="全部"></el-radio-button>
      <el-radio-button name="2" label="启用"></el-radio-button>
      <el-radio-button name="0" label="停用"></el-radio-button>
    </el-radio-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selected: "全部"
    };
  },
  components: {},
  methods: {
    handleChange() {
      this.$emit("change", this.selected);
    }
  }
};
</script>

<style lang="stylus">
.control_bar {
  margin: 0;
  padding: 10px;
  box-shadow: 1px 0 8px 0 rgba(0, 0, 0, 0.2);
}
</style>
