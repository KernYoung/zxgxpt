<template>
  <div class="tab-container">
    <!-- 页面热度统计 -->
    <div class="title ">页面热度</div>
    <el-table
      :data="tableData"
      border
      style="width: 100%;"
      size="small"
      :header-cell-style="{ background: '#ECF1FE' }"
      :span-method="objectSpanMethod"
    >
      <el-table-column
        prop="no"
        label="序号"
        width="100px"
        align="center"
      ></el-table-column>
      <el-table-column prop="pageName" label="页面名称" align="center">
      </el-table-column>
      <el-table-column prop="pagePath" label="页面路径" align="center">
      </el-table-column>
      <el-table-column prop="num" label="查看次数" align="center">
      </el-table-column>
      <el-table-column prop="visitUserNum" label="访问用户个数" align="center">
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
  mounted() {},
  methods: {
    getData() {
      let param = {
        startDate: this.searchOptions.handleTime[0],
        endDate: this.searchOptions.handleTime[1],
        companyName: this.searchOptions.company.join(","),
      };
      this.$ajax.visitLog.getPageActive(param).then((res) => {
        if (res.data.code == "0") {
          this.tableData = res.data.data.map((item) => {
            item.pageName = item.pageName ? item.pageName : " ";
            return item;
          });
        }
      });
    },
    objectSpanMethod({ row, column, rowIndex, columnIndobjectSpanMethodex }) {
      const dataProvider = this.tableData;
      const cellValue = row[column.property];
      if (column.property == "num" || column.property == "visitUserNum"||column.property=='pagePath') return;
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
<style scoped lang="less">
.title {
  line-height: 30px;
  font-size: 14px;
  font-weight: bold;
}
</style>
