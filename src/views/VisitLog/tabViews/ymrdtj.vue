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
    >
      <el-table-column type="index" label="序号"></el-table-column>
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
          this.tableData = res.data.data;
        }
      });
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
