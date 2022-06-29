<template>
  <div class="tab-container">
    <div class="title" style="display:flex;justify-content:space-between">
      <span></span>
      <el-link type="primary" @click="exportExcel" style="margin-right:10px"
        >导出</el-link
      >
    </div>
    <el-table
      :data="tableData"
      border
      style="width: 100%;"
      size="small"
      :header-cell-style="{ background: '#ECF1FE' }"
      :span-method="objectSpanMethod"
      ref="table"
    >
      <el-table-column prop="no" label="序号" width="50px" align="center"></el-table-column>
      <el-table-column prop="gzCompanyName" label="已关注企业" align="center">
      </el-table-column>
      <el-table-column prop="userName" label="关注人" align="center">
      </el-table-column>
      <el-table-column prop="companyName" label="关注人所在企业" align="center">
      </el-table-column>
      <el-table-column prop="gzTime" label="关注时间" align="center">
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import XLSX from "xlsx";
import FileSaver from "file-saver";
export default {
  props: {
    searchOptions: Object,
  },
  data() {
    return {
      tableData: [],
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

  methods: {
    getData() {
      let param = {
        startDate: this.searchOptions.handleTime[0],
        endDate: this.searchOptions.handleTime[1],
        companyName: this.searchOptions.company.join(","),
        flag: this.searchOptions.flag,
      };
      this.$ajax.visitLog.getMonitoring(param).then((res) => {
        if (res.data.code == "0") {
          this.tableData = res.data.data;
        }
      });
      // this.tableData = [
      //   {
      //     attentionEnterprise: "重庆康恒医药有限公司1",
      //     attentionPerson: "宋子涵",
      //     company: "浙江国贸云南控股有限公司",
      //     attentionTime: "2022-04-26 19:40:03",
      //   },
      //   {
      //     attentionEnterprise: "安徽祥晟新能源科技有限公司",
      //     attentionPerson: "胡邮卫",
      //     company: "大地期货有限公司",
      //     attentionTime: "2022-04-26 19:40:03",
      //   },
      //   {
      //     attentionEnterprise: "中金博达（杭州）实业有限公司",
      //     attentionPerson: "胡邮卫",
      //     company: "大地期货有限公司",
      //     attentionTime: "2022-04-26 19:40:03",
      //   },
      // ];
    },
    objectSpanMethod({ row, column, rowIndex, columnIndobjectSpanMethodex }) {
      const dataProvider = this.tableData;
      const cellValue = row[column.property];
      if (column.property !== "gzCompanyName" && column.property !== "no") return;
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
          `天眼查添加监控情况(${this.searchOptions.handleTime[0]}-${this.searchOptions.handleTime[1]}).xlsx`
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
  margin-bottom: 10px;
}
</style>
