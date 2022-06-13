<template>
  <div>
    <el-table
      :data="tableData"
      border
      style="width: 100%;"
      size="small"
      :header-cell-style="{ background: '#ECF1FE' }"
    >
      <el-table-column prop="reportCode" label="报告单号" align="center">
      </el-table-column>
      <el-table-column prop="xbCode" label="信保代码" align="center">
      </el-table-column>
      <el-table-column prop="name" label="中/英文名称" align="center">
      </el-table-column>
      <el-table-column prop="userName" label="申请人" align="center">
      </el-table-column>
      <el-table-column
        prop="applyCompanyName"
        label="申请人所在企业"
        align="center"
      >
      </el-table-column>
      <el-table-column prop="applyTime" label="申请时间" align="center">
      </el-table-column>
      <el-table-column prop="approveTime" label="审核时间" align="center">
      </el-table-column>
      <el-table-column
        prop="previewTimes"
        label="预览次数"
        align="center"
        width="75px"
      >
      </el-table-column>
      <el-table-column
        prop="downloadTimes"
        label="下载次数"
        align="center"
        width="75px"
      >
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: {
    options: Object,
  },
  data() {
    return {
      tableData: [],
    };
  },
  components: {},
  computed: {},
  created() {},
  mounted() {
    this.getData();
  },
  watch: {},
  methods: {
    getData() {
      let param = {
        startDate: this.options.handleTime[0],
        endDate: this.options.handleTime[1],
        companyName: this.options.company.join(","),
      };
      this.$ajax.visitLog.getXbReportUseByCompany(param).then((res) => {
        if (res.data.code == "0") {
          this.tableData = res.data.data;
        }
      });
    },
  },
};
</script>

<style scoped lang="scss"></style>
