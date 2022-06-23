<template>
  <div class="tab-container">
    <!-- 模糊查询记录 -->
    <div class="title ">模糊查询记录</div>
    <el-table
      :data="tableData"
      border
      style="width: 100%;"
      size="small"
      :header-cell-style="{ background: '#ECF1FE' }"
    >
      <el-table-column type="index" label="序号"></el-table-column>
      <el-table-column prop="userName" label="操作用户" align="center">
      </el-table-column>
      <el-table-column prop="keyWord" label="模糊查询关键词" align="center">
      </el-table-column>
      <el-table-column prop="operateTime" label="操作时间" align="center">
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
      this.$ajax.visitLog.getLikeQuery(param).then((res) => {
        if (res.data.code == "0") {
          this.tableData = res.data.data;
        }
      });
    },
    objectSpanMethod({ row, column, rowIndex, columnIndobjectSpanMethodex }) {
      const dataProvider = this.tableData;
      const cellValue = row[column.property];
      if (column.property == "keyWord") return;
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
