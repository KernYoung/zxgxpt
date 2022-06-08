<template>
  <div class="container-wrapper">
    <div style="margin-bottom: 15px;">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/homePage' }"
          >首页</el-breadcrumb-item
        >
        <el-breadcrumb-item>信保代码维护</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div style="color:#409eff;font-weight:bold;">
        成员公司中信保买方代码填报
      </div>
      <el-table
        :data="tableData"
        style="margin-top:15px"
        size="small"
        max-height="calc(100% - 90px)"
        border
        :header-cell-style="{ background: '#ECF1FE' }"
      >
        <el-table-column prop="code" label="公司HR编码" width="100px">
        </el-table-column>
        <el-table-column prop="name" label="公司HR名称"> </el-table-column>
        <el-table-column prop="rule" label="用户前缀规则"> </el-table-column>
        <el-table-column prop="parentName" label="所属成员公司HR名称">
        </el-table-column>
        <el-table-column prop="sourceFrom" label="数据来源"> </el-table-column>
        <el-table-column prop="creditCode" label="信保通买方代码">
          <template slot-scope="scope">
            <el-link
              :type="scope.row.creditCode !== '' ? 'info' : 'primary'"
              @click="open(scope.row)"
              >{{
                scope.row.creditCode !== "" ? scope.row.creditCode : "点击填写"
              }}</el-link
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="page">
        <el-pagination
          @current-change="getTableData"
          :current-page.sync="page.currentPage"
          :page-size="page.pageSize"
          layout="total, prev, pager, next"
          :total="page.total"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [],
      page: {
        currentPage: 1,
        pageSize: 10,
        total: 0,
      },
    };
  },
  mounted() {
    this.getTableData();
  },
  methods: {
    getTableData() {
      this.tableData = [
        {
          id: "1",
          code: "010",
          name: "浙江省国际贸易集团有限公司",
          parentName: "浙江省国际贸易集团有限公司",
          sourceFrom: "HR系统",
          creditCode: "20000340",
        },
        {
          id: "2",
          code: "01201",
          name: "浙江东方金融控股集团股份有限公司",
          parentName: "浙江东方金融控股集团股份有限公司",
          sourceFrom: "HR系统",
          creditCode: "",
        },
      ];
    },
    open(row) {
      this.$prompt("", "请输入信保通买方代码", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputValue: row.creditCode !== "" ? row.creditCode : "",
      })
        .then(({ value }) => {})
        .catch(() => {});
    },
  },
};
</script>
<style scoped lang="less">
.container {
  padding: 15px;
  height: calc(100% - 50px);
  box-sizing: border-box;
  background: #fff;
}
</style>
