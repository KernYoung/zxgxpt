<template>
  <div class="tab-container">
    <div class="title">页面热度</div>
    <el-table
      :data="tableData"
      border
      style="width: 100%;"
      size="small"
      :header-cell-style="{ background: '#ECF1FE' }"
    >
      <el-table-column type="index" label="序号"></el-table-column>
      <el-table-column prop="gzCompanyName" label="已关注企业" align="center">
      </el-table-column>
      <el-table-column prop="userName" label="关注人" align="center">
      </el-table-column>
      <el-table-column prop="companyName" label="关注人所在企业" align="center">
      </el-table-column>
      <el-table-column prop="gzTime" label="关注时间" align="center">
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
        flag: "0",
      };
      this.$ajax.visitLog.getMonitoring(param).then((res) => {
        if (res.data.code == "0") {
          this.tableData = res.data.data;
        }
      });
      // this.tableData = [
      //   {
      //     attentionEnterprise: "重庆康恒医药有限公司1",
      //     attentionPerson: "宋子涵",
      //     company: "浙江国贸云南控股有限公司",
      //     attentionTime: "2022-04-26 19:40:03",
      //   },
      //   {
      //     attentionEnterprise: "安徽祥晟新能源科技有限公司",
      //     attentionPerson: "胡邮卫",
      //     company: "大地期货有限公司",
      //     attentionTime: "2022-04-26 19:40:03",
      //   },
      //   {
      //     attentionEnterprise: "中金博达（杭州）实业有限公司",
      //     attentionPerson: "胡邮卫",
      //     company: "大地期货有限公司",
      //     attentionTime: "2022-04-26 19:40:03",
      //   },
      // ];
    },
  },
};
</script>
<style scoped lang="less"></style>
