<template>
  <div id="l_table">
    <el-table
      ref="multipleTable"
      :data="data"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
      border
      :cell-style="{paddingTop: 0, paddingBottom: 0}"
      :header-cell-style="{paddingTop: 0, paddingBottom: 0}"
      :row-key="getRowKey"
    >
      <el-table-column align="center" type="selection"></el-table-column>
      <el-table-column sortable :sort-method="sortFunc" align="center" prop="code" label="简称"></el-table-column>
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
      <el-table-column sortable align="center" prop="expiry_time" label="失效时间"></el-table-column>
      <el-table-column align="center" prop="order_prefix" label="订单后缀"></el-table-column>
      <el-table-column align="center" prop="create_time" label="创建时间"></el-table-column>
      <el-table-column align="center" prop="update_time" label="更新时间"></el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <span @click="check(scope.row, scope.$index, 'check')" class="handle">查看</span>|
          <span @click="check(scope.row, scope.$index, 'edit')" class="handle">编辑</span>
        </template>
      </el-table-column>
    </el-table>

    <modal ref="modal" @comfirm="edit"></modal>
  </div>
</template>

<script>
import Modal from "@/components/modal";

export default {
  data() {
    return {};
  },
  render(h) {
    return h("div", {});
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
    check(row, index, control) {
      this.$refs.modal.showModal(control, index, row);
    },
    edit(row, index) {
      this.$emit("edit", row, index);
    },
    sortFunc(a, b) {},
    getRowKey(row) {
      return row.id;
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
  margin-top: 8px;
}

.switch .slider {
  position: relative;
  display: inline-block;
  height: 9px;
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
  top: -7px;
  display: block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.2);
  content: '';
  transition: all 0.2s ease;
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



