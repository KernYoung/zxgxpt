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
      <el-table-column
        prop="attentionEnterprise"
        label="已关注企业"
        align="center"
      >
      </el-table-column>
      <el-table-column prop="attentionPerson" label="关注人" align="center">
      </el-table-column>
      <el-table-column prop="company" label="关注人所在企业" align="center">
      </el-table-column>
      <el-table-column prop="attentionTime" label="关注时间" align="center">
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
          attentionEnterprise: "重庆康恒医药有限公司",
          attentionPerson: "宋子涵",
          company: "浙江国贸云南控股有限公司",
          attentionTime: "2022-04-26 19:40:03",
        },
        {
          attentionEnterprise: "安徽祥晟新能源科技有限公司",
          attentionPerson: "胡邮卫",
          company: "大地期货有限公司",
          attentionTime: "2022-04-26 19:40:03",
        },
        {
          attentionEnterprise: "中金博达（杭州）实业有限公司",
          attentionPerson: "胡邮卫",
          company: "大地期货有限公司",
          attentionTime: "2022-04-26 19:40:03",
        },
      ];
    },
  },
};
</script>
<style scoped lang="less"></style>
