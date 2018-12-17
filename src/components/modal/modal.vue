<template>
  <div>
    <el-dialog title="hello" :visible.sync="isShow">
      <div slot="title">查看账号：{{info.account_name}}的信息</div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShow: false
    };
  },
  props: ["info"],
  watch: {
    info() {
      console.log(this.info);
    }
  },
  components: {},
  methods: {
    showModal(row) {
      this.isShow = true;
    }
  }
};
</script>

<style>
</style>
