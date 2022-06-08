<template>
  <div>
    <div class="top">
      <span>{{ current.visitUser }}</span>
      <span>2022-05-30~2022-05-30</span>
    </div>
    <el-table
      :data="tableData"
      style="margin-top:15px"
      size="small"
      border
      :header-cell-style="{ background: '#ECF1FE' }"
    >
      <el-table-column type="index" label="序号"> </el-table-column>
      <el-table-column prop="handleTime" label="操作时间"> </el-table-column>
      <el-table-column prop="sourceName" label="被访问资源"> </el-table-column>
      <el-table-column prop="pageName" label="页面名称"> </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  props: {
    current: Object,
  },
  data() {
    return {
      tableData: [],
    };
  },
  watch: {
    current: {
      handler(val) {
        console.log(val);
        this.getDetail();
      },
    },
    deep: true,
    immediate: true,
  },
  mounted() {
    this.getDetail();
  },
  methods: {
    getDetail() {
      this.tableData = [
        {
          handleTime: "2022-05-30 12:35:30",
          sourceName: "/essInfo",
          pageName: "详情页",
        },
        {
          handleTime: "2022-05-30 12:35:21",
          sourceName: "/homePage",
          pageName: "首页",
        },
        {
          handleTime: "2022-05-30 12:35:15",
          sourceName: "/",
          pageName: "登录页",
        },
        {
          handleTime: "2022-05-30 12:35:30",
          sourceName: "/essInfo",
          pageName: "详情页",
        },
        {
          handleTime: "2022-05-30 12:35:30",
          sourceName: "/",
          pageName: "登录页",
        },
        {
          handleTime: "2022-05-30 12:35:30",
          sourceName: "/essInfo",
          pageName: "详情页",
        },
        {
          handleTime: "2022-05-30 12:35:21",
          sourceName: "/homePage",
          pageName: "首页",
        },
        {
          handleTime: "2022-05-30 12:35:15",
          sourceName: "/",
          pageName: "登录页",
        },
        {
          handleTime: "2022-05-30 12:35:30",
          sourceName: "/essInfo",
          pageName: "详情页",
        },
        {
          handleTime: "2022-05-30 12:35:30",
          sourceName: "/",
          pageName: "登录页",
        },
        {
          handleTime: "2022-05-30 12:35:30",
          sourceName: "/essInfo",
          pageName: "详情页",
        },
        {
          handleTime: "2022-05-30 12:35:21",
          sourceName: "/homePage",
          pageName: "首页",
        },
        {
          handleTime: "2022-05-30 12:35:15",
          sourceName: "/",
          pageName: "登录页",
        },
        {
          handleTime: "2022-05-30 12:35:30",
          sourceName: "/essInfo",
          pageName: "详情页",
        },
        {
          handleTime: "2022-05-30 12:35:30",
          sourceName: "/",
          pageName: "登录页",
        },
      ];
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
