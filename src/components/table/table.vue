<template>
  <div class="l_table">
    <el-table
      ref="multipleTable"
      :data="data"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
      border
    >
      <el-table-column align="center" type="selection"></el-table-column>
      <el-table-column align="center" prop="code" label="简称"></el-table-column>
      <el-table-column align="center" prop="account_name" label="1688账号"></el-table-column>
      <el-table-column align="center" label="会员身份">
        <template slot-scope="scope">{{ scope.row.membership | membership }}</template>
      </el-table-column>
      <el-table-column align="center" label="1688状态">
        <template slot-scope="scope">
          <span class="status">{{scope.row.enabled | enabled}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="系统状态">
        <template slot-scope="scope">
          <!-- <div class="toggle" id="switch" @click="handleSwichChange(scope.row)">
            <div class="toggle-text-off">OFF</div>
            <div class="glow-comp"></div>
            <div class="toggle-button"></div>
            <div class="toggle-text-on">ON</div>
          </div>-->
          <div class="switch">
            <input
              :id="`one_${scope.$index}`"
              class="input"
              type="checkbox"
              v-model="scope.row.is_invalid"
            >
            <label :for="`one_${scope.$index}`" class="slider"></label>
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="expiry_time" label="失效时间"></el-table-column>
      <el-table-column align="center" prop="order_prefix" label="订单后缀"></el-table-column>
      <el-table-column align="center" prop="create_time" label="创建时间"></el-table-column>
      <el-table-column align="center" prop="update_time" label="更新时间"></el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <span @click="check(scope.row)" class="handle">查看</span>|
          <span class="handle">编辑</span>
        </template>
      </el-table-column>
    </el-table>

    <modal :info="row" ref="modal"></modal>
  </div>
</template>

<script>
import Modal from "@/components/modal";

export default {
  data() {
    return {
      row: {}
    };
  },
  mounted() {},
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  filters: {
    membership(value) {
      const v = parseInt(value);
      switch (v) {
        case 1:
          return "企业单位";
          break;
        case 2:
          return "事业单位或社会团体";
        case 3:
          return "个体经营";
        case 4:
          return "个人";
        default:
          break;
      }
    },
    enabled(value) {
      return value ? "有效" : "无效";
    }
  },
  components: {
    Modal
  },
  methods: {
    handleSelectionChange() {
      console.log("change");
    },
    handleSwichChange(row) {
      this.$emit("update:is_invalid", row);
    },
    check(row) {
      this.row = row;
      this.$refs.modal.showModal();
    }
  }
};
</script>

<style lang="stylus">
.l_table {
  margin-top: 30px;
  padding: 0 30px;
}

.handle {
  cursor: pointer;
  color: #69f;

  &:hover {
    color: #1c90f3;
  }
}

.status {
  color: #339907;
}

/* ************************ */
.switch {
  display: block;
  margin-top: 20px;
}

.switch .slider {
  position: relative;
  display: inline-block;
  height: 12px;
  width: 32px;
  border-radius: 8px;
  cursor: pointer;
  background: #c5c5c5;
  transition: all 0.2s ease;
}

.switch .slider:after {
  background: #eeeeee;
  position: absolute;
  left: -8px;
  top: -8px;
  display: block;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.2);
  content: '';
  transition: all 0.2s ease;
}

.switch label {
  margin-right: 7px;
}

.switch .input {
  display: none;
}

.switch .input ~ .label {
  margin-left: 8px;
}

.switch .input:checked ~ .slider:after {
  left: 16px;
}

.switch .input:checked ~ .slider {
  background: #4cb3ff;
}

.switch .input:checked ~ .slider:after {
  background: #20a0ff;
}

.center {
  font-family: 'Source Sans Pro', sans-serif;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

h1 {
  font-weight: normal;
  margin-top: 0px;
}
</style>
