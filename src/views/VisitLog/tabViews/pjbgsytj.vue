<template>
  <div class="tab-container">
    <!-- 评级报告使用统计 -->
    <div class="title">中诚信使用情况</div>
    <el-table
      :data="zcxUserStatusData"
      border
      style="width: 100%;"
      size="small"
      :header-cell-style="{ background: '#ECF1FE' }"
    >
      <!-- <el-table-column prop="userId" label="申请人所在公司" align="center">
        <template slot-scope="scope">
          <el-link type="primary" @click="showDetail(scope.row)">{{ scope.row.company }}</el-link>
        </template>
      </el-table-column> -->
      <el-table-column type="index" label="序号"></el-table-column>
      <el-table-column prop="area" label="模块" align="center">
      </el-table-column>
      <el-table-column prop="num" label="点数" align="center">
        <template slot-scope="scope">{{ scope.row.num || "/" }}</template>
      </el-table-column>
      <el-table-column prop="useNum" label="使用次数" align="center">
        <template slot-scope="scope">
          <el-link
            type="primary"
            @click="showDetail(scope.row)"
            v-if="scope.row.area == '风险预警（关注不与时间联动）'"
            >{{ scope.row.useNum }}</el-link
          >
          <span v-else>{{ scope.row.useNum || "/" }}</span></template
        >
      </el-table-column>
      <el-table-column prop="shareNum" label="共享次数" align="center">
        <template slot-scope="scope">{{ scope.row.shareNum || "/" }}</template>
      </el-table-column>
    </el-table>
    <div style="color:orange;font-weight:bold;font-size:14px">
      注：关注数和共享次数数暂统计截至目前的总数
    </div>
    <div class="title" style="margin-top:20px">中诚信申请记录</div>
    <el-table
      :data="applyData"
      :span-method="objectSpanMethod"
      border
      style="width: 100%;"
      size="small"
      :header-cell-style="{ background: '#ECF1FE' }"
    >
      <el-table-column prop="type" label="申请类型" align="center">
      </el-table-column>
      <el-table-column prop="enterprise" label="申请企业" align="center">
      </el-table-column>
      <el-table-column prop="applyPerson" label="申请人" align="center">
      </el-table-column>
      <el-table-column prop="company" label="申请人所在公司" align="center">
      </el-table-column>
      <el-table-column prop="applyTime" label="申请时间" align="center">
      </el-table-column>
    </el-table>
    <el-dialog
      title="中诚信添加监控情况"
      :visible.sync="dialog.visible"
      width="1100px"
    >
      <MonitorSituation></MonitorSituation>
    </el-dialog>
  </div>
</template>
<script>
import MonitorSituation from "../components/monitorSituation";
export default {
  components: { MonitorSituation },
  data() {
    return {
      zcxUserStatusData: [
        { area: "风险初筛", num: "10点/次", useNum: 13, shareNum: null },
        { area: "财务排雷", num: "2点/次", useNum: null, shareNum: null },
        { area: "产业企业评价", num: "2点/次", useNum: null, shareNum: null },
        { area: "区域信用评价", num: "2点/次", useNum: null, shareNum: null },
        { area: "城投企业评价", num: "2点/次", useNum: null, shareNum: null },
        {
          area: "风险预警（关注不与时间联动）",
          num: "100点/企业/年",
          useNum: 248,
          shareNum: null,
        },
        { area: "总计", num: "24930", useNum: 13, shareNum: 13 },
      ],
      applyData: [],
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
      this.applyData = [
        {
          type: "风险初筛",
          enterprise: "上海靖凯模塑科技有限公司",
          applyPerson: "75105714（廖建克）",
          company: "浙江国贸云商控股有限公司",
          applyTime: "2022-05-30 16:30:19",
        },
        {
          type: "风险初筛",
          enterprise: "杭州益友医疗科技有限公司",
          applyPerson: "80008083（黄心恺）",
          company: "浙江英特集团股份有限公司",
          applyTime: "2022-05-30 16:57:19",
        },
        {
          type: "风险初筛",
          enterprise: "上海靖凯模塑科技有限公司",
          applyPerson: "75105714（廖建克）",
          company: "浙江国贸云商控股有限公司",
          applyTime: "2022-05-30 16:30:19",
        },
        {
          type: "风险初筛",
          enterprise: "杭州益友医疗科技有限公司",
          applyPerson: "80008083（黄心恺）",
          company: "浙江英特集团股份有限公司",
          applyTime: "2022-05-30 16:57:19",
        },
      ];
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      const dataProvider = this.applyData;
      const cellValue = row[column.property];
      if (column.property !== "type") return;
      if (cellValue) {
        // 上一条数据
        const prevRow = dataProvider[rowIndex - 1];
        // 下一条数据
        let nextRow = dataProvider[rowIndex + 1];
        // 当上一条数据等于下一条数据
        if (prevRow && prevRow[column.property] === cellValue) {
          return { rowspan: 0, colspan: 0 };
        } else {
          let rowspan = 1;
          while (nextRow && nextRow[column.property] === cellValue) {
            rowspan++;
            nextRow = dataProvider[rowspan + rowIndex];
          }
          if (rowspan > 1) {
            return { rowspan, colspan: 1 };
          }
        }
      }
    },
    showDetail(row) {
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
