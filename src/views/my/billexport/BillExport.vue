<template>
  <div class="container">
    <!-- 头部内容 -->
    <header-back title="账单导出"></header-back>

    <!-- 内容部分 -->
    <div class="content-container">
      <el-form
        label-width="22%"
        :model="exportForm"
        :rules="exportRules"
        ref="exportForm"
      >
        <el-form-item label="账单类型" prop="exportType">
          <el-select
            v-model="exportForm.exportType"
            placeholder="请选择"
            @change="onTypeChange"
          >
            <el-option
              v-for="item in exportTypeData"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <!-- 导出年账单 -->
        <template v-if="exportForm.exportType == 'year'">
          <el-form-item label="选择年" prop="year">
            <el-date-picker
              v-model="exportForm.year"
              type="year"
              placeholder="请选择导出的年份"
              value-format="yyyy"
            >
            </el-date-picker>
          </el-form-item>
        </template>

        <!-- 导出月账单 -->
        <template v-if="exportForm.exportType == 'month'">
          <el-form-item label="选择月" prop="month">
            <el-date-picker
              v-model="exportForm.month"
              type="month"
              placeholder="请选择导出的月份"
              value-format="yyyyMM"
            >
            </el-date-picker>
          </el-form-item>
        </template>

        <!-- 导出时间段账单 -->
        <template v-if="exportForm.exportType == 'range'">
          <el-form-item label="开始时间" prop="startDate">
            <el-date-picker
              v-model="exportForm.startDate"
              type="date"
              placeholder="请选择开始时间"
              value-format="yyyyMMdd"
            >
            </el-date-picker>
          </el-form-item>

          <el-form-item label="结束时间" prop="endDate">
            <el-date-picker
              v-model="exportForm.endDate"
              type="date"
              placeholder="请选择结束时间"
              value-format="yyyyMMdd"
              :picker-options="endDateOptions"
            >
            </el-date-picker>
          </el-form-item>
        </template>

        <el-row type="flex" justify="center" style="margin-top: 2rem">
          <el-button class="export-button" type="danger" @click="exportSubmit"
            >确定导出</el-button
          >
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script>
import HeaderBack from "@/components/HeaderBack.vue";
import { clearObj, closeLoading, showLoading } from "../../../utils/Utils.js";
import { mapGetters } from "vuex";
import axios from "axios";
import { Toast } from "vant";

export default {
  name: "BillExport",
  components: {
    HeaderBack,
  },
  data() {
    return {
      exportTypeData: [
        {
          value: "year",
          label: "年账单",
        },
        {
          value: "month",
          label: "月账单",
        },
        {
          value: "range",
          label: "时间段",
        },
      ],
      exportForm: {
        exportType: "year",
        year: "",
        month: "",
        startDate: "",
        endDate: "",
      },
      endDateOptions: {
        disabledDate: (time) => {
          let nowData = new Date();
          nowData = new Date(nowData.setDate(nowData.getDate() - 1));
          return time > nowData;
        },
      },
      exportRules: {
        exportType: {
          required: true,
          message: "请选择账单类型",
          trigger: "blur",
        },
        year: {
          required: true,
          message: "请选择年份",
          trigger: "blur",
        },
        month: {
          required: true,
          message: "请选择年月",
          trigger: "blur",
        },
        startDate: {
          required: true,
          message: "请选择开始时间",
          trigger: "blur",
        },
        endDate: {
          required: true,
          message: "请选择结束时间",
          trigger: "blur",
        },
      },
    };
  },
  methods: {
    // 导出方法
    exportSubmit() {
      this.$refs["exportForm"].validate((valid) => {
        if (valid) {
          let user = this.getUser || null;
          let toast = null;
          if (user) {
            // 用户已经登录，导出账单信息
            // toast = showLoading();
            axios({
              method: "post",
              url: "record-account/bill/billExport",
              data: {
                userId: user.userId,
                ...this.exportForm,
              },
              responseType: "blob",
            })
              .then((response) => {
                // closeLoading(toast);
                if (!response) {
                  return;
                }
                // 创建一个临时的url指向blob对象
                let url = window.URL.createObjectURL(response.data);
                // 创建url之后可以模拟对此文件对象的一系列操作，例如：预览、下载
                let a = document.createElement("a");
                a.href = url;
                a.download =
                  this.$moment(this.selectDateObj).format("YYYYMMDDHHmmss") +
                  ".xlsx";
                a.click();
                // 释放这个临时的对象url
                window.URL.revokeObjectURL(url);
              })
              .catch((error) => {
                closeLoading(toast);
                Toast("导出文件失败，请重试");
              });
          }
        } else {
          return false;
        }
      });
    },

    // 导出账单类型改变
    onTypeChange(val) {
      this.$refs["exportForm"].resetFields();
      clearObj(this.exportForm);
      this.exportForm.exportType = val;
    },
  },
  computed: {
    ...mapGetters(["getUser"]),
  },
};
</script>

<style type="scoped">
.container {
  font-size: 0.45rem;
}
.content-container {
  padding: 0.3rem;
}
.export-button {
  width: 80%;
}
.el-select {
  width: 220px;
}
</style>
