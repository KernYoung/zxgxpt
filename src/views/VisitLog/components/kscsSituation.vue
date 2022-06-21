<template>
  <div class="tab-container">
    <el-table
      :data="tableData"
      border
      style="width: 100%;"
      size="small"
      :header-cell-style="{ background: '#ECF1FE' }"
      :span-method="objectSpanMethod"
    >
      <el-table-column type="index" label="序号"></el-table-column>
      <el-table-column
        prop="applyCompanyName"
        label="已申请企业"
        align="center"
      >
      </el-table-column>
      <el-table-column prop="applyUserName" label="最初申请人" align="center">
      </el-table-column>
      <el-table-column prop="companyName" label="申请人所在企业" align="center">
      </el-table-column>
      <el-table-column prop="applyTime" label="最初申请时间" align="center">
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
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
      };
      this.$ajax.visitLog.getTycFilterCustomerList(param).then((res) => {
        if (res.data.code == "0") {
          this.tableData = res.data.data;
        }
      });
    },
    objectSpanMethod({ row, column, rowIndex, columnIndobjectSpanMethodex }) {
      const dataProvider = this.tableData;
      const cellValue = row[column.property];
      if (column.property !== "applyCompanyName") return;
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
  },
};
</script>
<style scoped lang="less"></style>
