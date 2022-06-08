<template>
  <div class="container-wrapper">
    <div style="margin-bottom: 15px;">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/homePage' }"
          >首页</el-breadcrumb-item
        >
        <el-breadcrumb-item>访问日志</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="search-box">
        <el-date-picker
          v-model="search.handleTime"
          type="daterange"
          range-separator="至"
          start-placeholder="操作开始日期"
          end-placeholder="操作结束日期"
          value-format="yyyy-MM-dd"
          format="yyyy-MM-dd"
          style="margin-right:10px"
        >
        </el-date-picker>
        <el-select
          v-model="search.company"
          placeholder="公司名称"
          style="margin-right:10px"
        >
          <el-options
            v-for="(item, index) in companyOptions"
            :key="index"
            :value="item"
            value="item"
          ></el-options>
        </el-select>
        <el-button type="primary" size="medium">查询</el-button>
      </div>
      <el-tabs
        v-model="activeName"
        @tab-click="handleClick"
        style="margin-top:10px;height:calc(100% - 70px);"
      >
        <el-tab-pane
          v-for="item in tabOptions"
          :key="item.code"
          :label="item.title"
          :name="item.code"
        >
          <component :is="item.code"></component>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import yhfwtj from "./tabViews/yhfwtj";
import xbbgsytj from "./tabViews/xbbgsytj";
import pjbgsytj from "./tabViews/pjbgsytj";
import tycsytj from "./tabViews/tycsytj";
import ymrdtj from "./tabViews/ymrdtj";
import mhcxjl from "./tabViews/mhcxjl";
export default {
  components: {
    yhfwtj,
    xbbgsytj,
    pjbgsytj,
    tycsytj,
    ymrdtj,
    mhcxjl,
  },
  data() {
    return {
      search: {
        handleTime: "",
        company: "",
      },
      companyOptions: [],
      activeName: "yhfwtj",
      tabOptions: [
        {
          title: "用户访问统计",
          code: "yhfwtj",
        },
        {
          title: "信保报告使用统计",
          code: "xbbgsytj",
        },
        {
          title: "评级报告使用统计",
          code: "pjbgsytj",
        },
        {
          title: "天眼查使用统计",
          code: "tycsytj",
        },
        {
          title: "页面热度统计",
          code: "ymrdtj",
        },
        {
          title: "模糊查询记录",
          code: "mhcxjl",
        },
      ],
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
  },
};
</script>
<style scoped lang="less">
// ::v-deep .el-tabs__content {
//   height: calc(100% - 55px);
//   overflow: auto;
//   overflow-x: hidden;
// }
.container-wrapper {
  height: auto;
  margin-bottom: 20px;
}
.container {
  padding: 15px;
  min-height: calc(100% - 50px);
  //   height: calc(100% - 50px);
  //   box-sizing: border-box;
  background: #fff;
}
</style>
