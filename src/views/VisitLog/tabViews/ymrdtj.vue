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
      <el-table-column prop="checkNum" label="查看次数" align="center">
      </el-table-column>
      <el-table-column prop="visitNum" label="访问用户个数" align="center">
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
          pageName: "详情页",
          pagePath: "/essInfo",
          checkNum: 153,
          visitNum: 52,
        },
        {
          pageName: "搜索",
          pagePath: "/searchResult",
          checkNum: 123,
          visitNum: 15,
        },
        {
          pageName: "登录页",
          pagePath: "/",
          checkNum: 119,
          visitNum: 56,
        },
        {
          pageName: "首页",
          pagePath: "/homePage",
          checkNum: 118,
          visitNum: 65,
        },
      ];
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
