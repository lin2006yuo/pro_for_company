<template>
  <div class="l_table">
    <el-dialog title="hello" :visible.sync="isShow">
      <div slot="title">查看账号：{{form.account_name}}&nbsp;的信息</div>

      <el-form ref="form" label-width="120px" :model="form" :rules="rules">
        <el-form-item size="small" label="1688用户名：" prop="code">
          <el-input :disabled="control === 'add' ? false : true" v-model="form.code"></el-input>
        </el-form-item>
        <el-form-item size="small" label="简称：" prop="account_name">
          <el-input :disabled="control === 'check' ? true : false" v-model="form.account_name"></el-input>
        </el-form-item>
        <el-form-item size="small" label="会员身份：" prop="membership">
          <el-select
            v-model="form.membership"
            placeholder="请选择"
            :disabled="control === 'check' ? true : false"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item size="small" label="订单后缀：" prop="order_prefix">
          <el-input :disabled="control === 'check' ? true : false" v-model="form.order_prefix"></el-input>
        </el-form-item>
        <el-form-item size="small" label="是否启用：">
          <el-switch
            :disabled="control === 'check' ? true : false"
            v-model="form.is_invalid"
            active-color="#20a0ff"
            inactive-color="#999"
          ></el-switch>
        </el-form-item>
      </el-form>
      <span v-if="control === 'check' ? false : true" slot="footer" class="dialog-footer">
        <el-button size="small" type="primary" @click="handleComfirm">确 定</el-button>
        <el-button size="small" @click="isShow = false">取 消</el-button>
      </span>
      <span v-else slot="footer" class="dialog-footer">
        <el-button size="small" type="primary" @click="isShow = false">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShow: false,
      control: "check",
      index: "",
      data: {},
      form: {
        code: "",
        account_name: "",
        membership: "",
        order_prefix: "",
        is_invalid: false
      },
      options: [
        { value: 1, label: "企业身份" },
        { value: 2, label: "事业单位或社会团体" },
        { value: 3, label: "个体经营" },
        { value: 4, label: "个人" }
      ],
      rules: {
        code: [
          { required: true, message: "请输入1688用户名", trigger: "blur" }
        ],
        account_name: [
          { required: true, message: "请输入简称", trigger: "blur" }
        ],
        membership: [
          { required: true, message: "请选择会员身份", trigger: "blur" }
        ],
        order_prefix: [{ required: true, message: "订单后缀", trigger: "blur" }]
      }
    };
  },
  computed: {},
  watch: {
    // data(newValue) {
    //   console.log(newValue);
    //   this.form = { ...newValue };
    //   const $form = this.$refs.form;
    //   if ($form) {
    //     $form.resetFields();
    //   }
    // }
  },
  components: {},
  methods: {
    showModal(control, index, data) {
      this.form = { ...data };
      this.control = control;
      this.index = index;
      this.isShow = true;
    },
    handleComfirm() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$emit("comfirm", this.form, this.index);
          this.isShow = false;
        } else {
          return;
        }
      });
    }
  }
};
</script>

<style>
</style>
