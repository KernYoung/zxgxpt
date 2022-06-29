<template>
  <div class="tab-container">
    <!-- 评级报告使用统计 -->
    <div class="title">中诚信使用情况</div>
    <el-table
      :data="zcxUserStatusData"
      border
      style="width: 100%;"
      size="small"
      :header-cell-style="{ background: '#ECF1FE' }"
    >
      <!-- <el-table-column prop="userId" label="申请人所在公司" align="center">
        <template slot-scope="scope">
          <el-link type="primary" @click="showDetail(scope.row)">{{ scope.row.company }}</el-link>
        </template>
      </el-table-column> -->
      <el-table-column type="index" label="序号"></el-table-column>
      <el-table-column prop="module" label="模块" align="center">
      </el-table-column>
      <el-table-column prop="numberOfHits" label="点数" align="center">
        <template slot-scope="scope">{{
          scope.row.numberOfHits || "/"
        }}</template>
      </el-table-column>
      <el-table-column prop="userNumber" label="使用次数" align="center">
        <template slot-scope="scope">
          <el-link
            type="primary"
            @click="showDetail(scope.row)"
            v-if="scope.row.module == '风险预警（关注不与时间联动）'"
            >{{ scope.row.userNumber }}</el-link
          >
          <span v-else>{{ scope.row.userNumber || "/" }}</span></template
        >
      </el-table-column>
      <el-table-column prop="shareNumber" label="共享次数" align="center">
        <template slot-scope="scope">{{
          scope.row.shareNumber || "/"
        }}</template>
      </el-table-column>
    </el-table>
    <div style="color:orange;font-weight:bold;font-size:14px">
      注：关注数和共享次数数暂统计截至目前的总数
    </div>
    <div
      class="title"
      style="margin-top:20px;display: flex;justify-content: space-between;"
    >
      <span>中诚信申请记录</span>
      <el-link type="primary" @click="exportExcel">导出</el-link>
    </div>
    <el-table
      :data="applyData"
      :span-method="objectSpanMethod"
      border
      style="width: 100%;"
      size="small"
      :header-cell-style="{ background: '#ECF1FE' }"
      ref="table"
    >
      <el-table-column prop="applyType" label="申请类型" align="center">
      </el-table-column>
      <el-table-column prop="applyCompanyName" label="申请企业" align="center">
      </el-table-column>
      <el-table-column prop="userName" label="申请人" align="center">
      </el-table-column>
      <el-table-column prop="companyName" label="申请人所在公司" align="center">
      </el-table-column>
      <el-table-column prop="applyTime" label="申请时间" align="center">
      </el-table-column>
    </el-table>
    <el-dialog
      title="中诚信添加监控情况"
      :visible.sync="dialog.visible"
      width="1100px"
    >
      <MonitorSituation
        :searchOptions="{ ...searchOptions, flag: '0' }"
      ></MonitorSituation>
    </el-dialog>
  </div>
</template>
<script>
import MonitorSituation from "../components/monitorSituation";
import XLSX from "xlsx";
import FileSaver from "file-saver";
export default {
  components: { MonitorSituation },
  props: {
    searchOptions: Object,
  },
  data() {
    return {
      zcxUserStatusData: [],
      applyData: [],
      dialog: {
        visible: false,
      },
    };
  },
  watch: {
    searchOptions: {
      handler(val) {
        this.getData();
      },
      deep: true,
      immediate: true,
    },
  },
  mounted() {},
  methods: {
    getData() {
      let param = {
        startDate: this.searchOptions.handleTime[0],
        endDate: this.searchOptions.handleTime[1],
        companyName: this.searchOptions.company.join(","),
      };
      this.$ajax.visitLog.getZcxReportUse(param).then((res) => {
        if (res.data.code == "0") {
          this.zcxUserStatusData = res.data.data;
        }
      });
      this.$ajax.visitLog.getZcxReportUseList(param).then((res) => {
        if (res.data.code == "0") {
          this.applyData = res.data.data;
        }
      });
      // this.applyData = [
      //   {
      //     type: "风险初筛",
      //     enterprise: "上海靖凯模塑科技有限公司",
      //     applyPerson: "75105714（廖建克）",
      //     company: "浙江国贸云商控股有限公司",
      //     applyTime: "2022-05-30 16:30:19",
      //   },
      //   {
      //     type: "风险初筛",
      //     enterprise: "杭州益友医疗科技有限公司",
      //     applyPerson: "80008083（黄心恺）",
      //     company: "浙江英特集团股份有限公司",
      //     applyTime: "2022-05-30 16:57:19",
      //   },
      //   {
      //     type: "风险初筛",
      //     enterprise: "上海靖凯模塑科技有限公司",
      //     applyPerson: "75105714（廖建克）",
      //     company: "浙江国贸云商控股有限公司",
      //     applyTime: "2022-05-30 16:30:19",
      //   },
      //   {
      //     type: "风险初筛",
      //     enterprise: "杭州益友医疗科技有限公司",
      //     applyPerson: "80008083（黄心恺）",
      //     company: "浙江英特集团股份有限公司",
      //     applyTime: "2022-05-30 16:57:19",
      //   },
      // ];
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      const dataProvider = this.applyData;
      const cellValue = row[column.property];
      if(column.property!=="applyType")return ;
      //if(column.property!=="申请人所在公司")return ;
      // if (column.property !== 'type') return
      if (cellValue) {
        // 上一条数据
        const prevRow = dataProvider[rowIndex - 1];
        // 下一条数据
        let nextRow = dataProvider[rowIndex + 1];
        // 当上一条数据等于下一条数据
        if (prevRow && prevRow[column.property] === cellValue) {
          return { rowspan: 0, colspan: 0 };
        } else {
          let rowspan = 1;
          while (nextRow && nextRow[column.property] === cellValue) {
            rowspan++;
            nextRow = dataProvider[rowspan + rowIndex];
          }
          if (rowspan > 1) {
            return { rowspan, colspan: 1 };
          }
        }
      }
    },
    showDetail(row) {
      this.dialog.visible = true;
    },
    exportExcel() {
      const tableComp = this.$refs.table.$el;
      var wb;
      var fix = tableComp.querySelector(".el-table__fixed");
      // 1.从el-table中生成Excel工作簿
      if (fix) {
        // 解决固定列时导出两份的bug
        wb = XLSX.utils.table_to_book(tableComp.removeChild(fix), {
          raw: true,
        });
        tableComp.appendChild(fix);
      } else {
        wb = XLSX.utils.table_to_book(tableComp, { raw: true });
      }
      // 2.输出二进制字符串
      let wbout = XLSX.write(wb, {
        bookType: "xlsx",
        bookSST: true,
        type: "array",
      });
      try {
        FileSaver.saveAs(
          new Blob([wbout], { type: "application/octet-stream" }),
          `中诚信申请记录(${this.searchOptions.handleTime[0]}-${this.searchOptions.handleTime[1]}).xlsx`
        );
      } catch (e) {
        if (typeof console !== "undefined") {
          console.log(e, wbout);
        }
      }
      return wbout;
    },
  },
};
</script>
<style scoped lang="less">
.title {
  line-height: 30px;
  font-size: 14px;
  font-weight: bold;
}
</style>
