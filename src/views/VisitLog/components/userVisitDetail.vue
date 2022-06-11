<template>
  <div>
    <div class="top">
      <span>{{ options.userName }}</span>
      <span>{{ options.startDate }}-{{ options.endDate }}</span>
    </div>
    <el-table
      :data="tableData"
      style="margin-top:15px"
      size="small"
      border
      :header-cell-style="{ background: '#ECF1FE' }"
    >
      <el-table-column type="index" label="序号"> </el-table-column>
      <el-table-column prop="operationTime" label="操作时间"> </el-table-column>
      <el-table-column prop="visitResource" label="被访问资源">
      </el-table-column>
      <el-table-column prop="pageName" label="页面名称"> </el-table-column>
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
  watch: {
    options: {
      handler(val) {
        this.getDetail();
      },
      deep: true,
      immediate: true,
    },
  },
  mounted() {
    // this.getDetail();
  },
  methods: {
    getDetail() {
      this.$ajax.visitLog.getUserBehavior(this.options).then((res) => {
        if (res.data.code == "0") {
          this.tableData = res.data.data;
        }
      });
    },
  },
};
</script>
<style scoped lang="less">
.top {
  display: flex;
  justify-content: space-between;
}
</style>
