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
      <el-table-column prop="userId" label="申请人所在公司" align="center">
        <template slot-scope="scope">
          <el-link type="primary" @click="showDetail(scope.row)">{{
            scope.row.company
          }}</el-link>
        </template>
      </el-table-column>
      <el-table-column prop="applyNum" label="申请报告数量" align="center">
      </el-table-column>
      <el-table-column prop="useNum" label="使用次数" align="center">
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
      <el-table-column prop="reportId" label="报告编号" align="center">
      </el-table-column>
      <el-table-column prop="creditCode" label="信保代码" align="center">
      </el-table-column>
      <el-table-column prop="name" label="中/英文名称" align="center">
      </el-table-column>
      <el-table-column prop="user" label="用户" align="center">
      </el-table-column>
      <el-table-column prop="enterprise" label="用户所在企业" align="center">
      </el-table-column>
      <el-table-column prop="handleLog" label="操作记录" align="center">
      </el-table-column>
      <el-table-column prop="handleTime" label="操作时间" align="center">
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
  data() {
    return {
      useStatusData: [],
      reportUseLogData: [],
      dialog: {
        visible: false,
      },
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.useStatusData = [
        { company: "浙江省化工进出口有限公司", applyNum: 3, useNum: 0 },
      ];
      this.reportUseLogData = [
        {
          reportId: "1385748",
          creditCode: "AUS/827841",
          name: "绍兴华峰医药连锁有限公司",
          user: "周璐那（20100024）",
          enterprise: "浙江英特集团股份有限公司",
          handleLog: "下载",
          handleTime: "2022-05-30 08:30:35",
        },
        {
          reportId: "1385748",
          creditCode: "AUS/827841",
          name: "绍兴华峰医药连锁有限公司",
          user: "周璐那（20100024）",
          enterprise: "浙江英特集团股份有限公司",
          handleLog: "下载",
          handleTime: "2022-05-30 08:30:35",
        },
        {
          reportId: "1385748",
          creditCode: "AUS/827841",
          name: "绍兴华峰医药连锁有限公司",
          user: "周璐那（20100024）",
          enterprise: "浙江英特集团股份有限公司",
          handleLog: "下载",
          handleTime: "2022-05-30 08:30:35",
        },
      ];
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
