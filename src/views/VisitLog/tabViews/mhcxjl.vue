<template>
  <div class="tab-container">
    <!-- 模糊查询记录 -->
    <div class="title ">模糊查询记录</div>
    <el-table
      :data="tableData"
      :span-method="objectSpanMethod"
      border
      style="width: 100%;"
      size="small"
      :header-cell-style="{ background: '#ECF1FE' }"
    >
      <el-table-column type="index" label="序号"></el-table-column>
      <el-table-column prop="user" label="操作用户" align="center">
      </el-table-column>
      <el-table-column prop="keyword" label="模糊查询关键词" align="center">
      </el-table-column>
      <el-table-column prop="time" label="操作时间" align="center">
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [],
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.tableData = [
        {
          user: "王泽能",
          keyword: "厦门建发",
          time: "2022-05-30 16:39:25",
        },
        {
          user: "王泽能",
          keyword: "厦门建发",
          time: "2022-05-30 16:39:24",
        },
        {
          user: "王泽能",
          keyword: "厦门建发",
          time: "2022-05-30 16:39:22",
        },
        {
          user: "王泽能",
          keyword: "厦门建发",
          time: "2022-05-30 16:39:15",
        },
        {
          user: "卢亮",
          keyword: "顶点",
          time: "2022-05-30 16:35:13",
        },
        {
          user: "卢亮",
          keyword: "北京华欣远达",
          time: "2022-05-30 16:33:55",
        },
      ];
    },
    objectSpanMethod({ row, column, rowIndex, columnIndobjectSpanMethodex }) {
      const dataProvider = this.tableData;
      const cellValue = row[column.property];

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
