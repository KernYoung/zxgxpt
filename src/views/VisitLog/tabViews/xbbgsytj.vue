<template>
  <div class="tab-container">
    <!-- 信保报告使用统计 -->
    <div class="title ">在库报告使用情况</div>
    <el-table
      :data="useStatusData"
      border
      style="width: 100%;"
      size="small"
      :header-cell-style="{ background: '#ECF1FE' }"
    >
      <el-table-column prop="companyName" label="申请人所在公司" align="center">
        <template slot-scope="scope">
          <el-link type="primary" @click="showDetail(scope.row)">{{
            scope.row.companyName
          }}</el-link>
        </template>
      </el-table-column>
      <el-table-column prop="num" label="申请报告数量" align="center">
      </el-table-column>
      <el-table-column prop="usrNum" label="使用次数" align="center">
      </el-table-column>
    </el-table>
    <div class="title" style="margin-top:20px">信保报告使用记录</div>
    <el-table
      :data="reportUseLogData"
      border
      style="width: 100%;"
      size="small"
      :header-cell-style="{ background: '#ECF1FE' }"
    >
      <el-table-column prop="reportCode" label="报告编号" align="center">
      </el-table-column>
      <el-table-column prop="xbCode" label="信保代码" align="center">
      </el-table-column>
      <el-table-column prop="name" label="中/英文名称" align="center">
      </el-table-column>
      <el-table-column prop="userName" label="用户" align="center">
      </el-table-column>
      <el-table-column prop="companyName" label="用户所在企业" align="center">
      </el-table-column>
      <el-table-column prop="operateNote" label="操作记录" align="center">
      </el-table-column>
      <el-table-column prop="operateTime" label="操作时间" align="center">
      </el-table-column>
    </el-table>
    <el-dialog
      title="在库报告使用情况"
      :visible.sync="dialog.visible"
      width="1100px"
    >
      <ReportUserStatus></ReportUserStatus>
      <!-- <span slot="footer" class="dialog-footer">
        <el-button @click="dialog.visible = false">取 消</el-button>
        <el-button type="primary" @click="dialog.visible = false">确 定</el-button>
      </span> -->
    </el-dialog>
  </div>
</template>
<script>
import ReportUserStatus from "../components/reportUserStatus.vue";
export default {
  components: { ReportUserStatus },
  props: {
    searchOptions: Object,
  },
  data() {
    return {
      useStatusData: [],
      reportUseLogData: [],
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
      this.$ajax.visitLog.getXbReportUse(param).then((res) => {
        if (res.data.code == "0") {
          this.useStatusData = res.data.xbReportUse;
          this.reportUseLogData = res.data.xbReportUseList;
        }
      });
    },
    showDetail() {
      this.dialog.visible = true;
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
