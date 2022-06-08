<template>
  <div class="tab-container">
    <!-- 用户访问统计 -->
    <div id="chart"></div>
    <div style="text-align:right; margin: 20px 0 10px 0">
      <el-link type="primary" @click="showStatisticalReport">统计月报</el-link>
    </div>
    <el-table
      :data="tableData"
      :span-method="objectSpanMethod"
      border
      style="width: 100%;"
      size="small"
      :header-cell-style="{ background: '#ECF1FE' }"
    >
      <el-table-column type="index" label="序号" align="center">
      </el-table-column>
      <el-table-column prop="partCompany" label="成员公司" align="center">
      </el-table-column>
      <el-table-column prop="childCompany" label="子公司" align="center">
      </el-table-column>
      <el-table-column prop="openUser" label="启用用户数" align="center">
      </el-table-column>
      <el-table-column prop="visitUser" label="访问用户" align="center">
      </el-table-column>
      <el-table-column prop="userId" label="用户工号" align="center">
        <template slot-scope="scope">
          <el-link type="primary" @click="showDetail(scope.row)">{{
            scope.row.userId
          }}</el-link>
          <!-- <el-button type="text" size="small">{{ scope.row.userId }}</el-button> -->
        </template>
      </el-table-column>
      <el-table-column prop="visitTimes" label="访问次数" align="center">
      </el-table-column>
      <el-table-column
        prop="visitPageTimes"
        label="访问页面次数"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="visitTotalTimes"
        label="访问次数合计"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="visitPageTotalTimes"
        label="访问页面次数合计"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="visitTime"
        label="最新访问时间"
        width="150px"
        align="center"
      >
      </el-table-column>
    </el-table>
    <el-dialog
      :title="dialog.title"
      :visible.sync="dialog.visible"
      width="1100px"
    >
      <components :is="activeComponent" :current="currentRow"></components>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog.visible = false">取 消</el-button>
        <el-button type="primary" @click="dialog.visible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
import echarts from "echarts";
import UserVisitDetail from "../components/userVisitDetail";
import TheStatisticalMonthly from "../components/theStatisticalMonthly";
export default {
  components: {
    UserVisitDetail,
    TheStatisticalMonthly,
  },
  data() {
    return {
      tableData: [],
      dialog: {
        title: "",
        visible: false,
      },
      activeComponent: "",
      currentRow: {},
    };
  },
  mounted() {
    this.initChart();
    this.getTableData();
  },
  methods: {
    initChart() {
      var chartDom = document.getElementById("chart");
      var myChart = echarts.init(chartDom);
      var option = {
        title: {
          text: "系统访问次数",
          textStyle: {
            fontSize: 15,
            fontWeight: "normal",
          },
        },
        color: [
          "#5470c6",
          "#91cc75",
          "#fac858",
          "#ee6666",
          "#73c0de",
          "#3ba272",
          "#fc8452",
          "#9a60b4",
          "#ea7ccc",
        ],
        tooltip: {
          trigger: "axis",
        },
        legend: {
          icon: "circle",
          data: ["访问次数", "访问用户个数", "访问页面个数"],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },

        xAxis: {
          type: "category",
          boundaryGap: false,
          data: [
            "05-01",
            "05-02",
            "05-03",
            "05-04",
            "05-05",
            "05-06",
            "05-07",
            "05-08",
            "05-09",
            "05-10",
          ],
        },
        yAxis: {
          type: "value",
          axisLine: {
            show: false,
          },
        },
        series: [
          {
            name: "访问次数",
            type: "line",
            smooth: true,
            stack: "Total",
            data: [120, 132, 101, 134, 90, 230, 210, 600, 400, 200, 190],
          },
          {
            name: "访问用户个数",
            type: "line",
            smooth: true,
            stack: "Total",
            data: [220, 182, 191, 234, 290, 330, 310, 220, 182, 191],
          },
          {
            name: "访问页面个数",
            type: "line",
            smooth: true,
            stack: "Total",
            data: [150, 232, 201, 154, 190, 330, 410, 232, 201, 154],
          },
        ],
      };

      option && myChart.setOption(option);
    },
    getTableData() {
      this.tableData = [
        {
          partCompany: "大地期货有限公司",
          childCompany: "浙江济海贸易发展有限公司",
          openUser: 157,
          visitUser: "陈汉唐",
          userId: "80039866",
          visitTimes: 13,
          visitPageTimes: 3,
          visitTotalTimes: 51,
          visitPageTotalTimes: 26,
          visitTime: "2022-05-30 12:35:30",
        },
        {
          partCompany: "大地期货有限公司",
          childCompany: "浙江济海贸易发展有限公司",
          openUser: 157,
          visitUser: "张慷凯",
          userId: "80029255",
          visitTimes: 3,
          visitPageTimes: 3,
          visitTotalTimes: 51,
          visitPageTotalTimes: 26,
          visitTime: "2022-05-30 16:39:30",
        },
        {
          partCompany: "大地期货有限公司",
          childCompany: "浙江济海贸易发展有限公司",
          openUser: 157,
          visitUser: "徐秀芝",
          userId: "80033346",
          visitTimes: 3,
          visitPageTimes: 3,
          visitTotalTimes: 51,
          visitPageTotalTimes: 26,
          visitTime: "2022-05-30 16:07:05",
        },
        {
          partCompany: "大地期货有限公司",
          childCompany: "大地期货有限公司",
          openUser: 157,
          visitUser: "李腾",
          userId: "68001560",
          visitTimes: 9,
          visitPageTimes: 3,
          visitTotalTimes: 51,
          visitPageTotalTimes: 26,
          visitTime: "2022-05-30 14:40:09",
        },
        {
          partCompany: "大地期货有限公司",
          childCompany: "大地期货有限公司",
          openUser: 157,
          visitUser: "高清秋",
          userId: "68000038",
          visitTimes: 3,
          visitPageTimes: 3,
          visitTotalTimes: 51,
          visitPageTotalTimes: 26,
          visitTime: "2022-05-30 11:40:09",
        },
        {
          partCompany: "大地期货有限公司",
          childCompany: "大地期货有限公司",
          openUser: 157,
          visitUser: "张玉",
          userId: "68008784",
          visitTimes: 3,
          visitPageTimes: 3,
          visitTotalTimes: 51,
          visitPageTotalTimes: 26,
          visitTime: "2022-05-30 15:32:09",
        },
        {
          partCompany: "大地期货有限公司",
          childCompany: "大地期货有限公司",
          openUser: 157,
          visitUser: "管方西",
          userId: "68006545",
          visitTimes: 2,
          visitPageTimes: 2,
          visitTotalTimes: 51,
          visitPageTotalTimes: 26,
          visitTime: "2022-05-30 13:32:09",
        },
      ];
    },
    objectSpanMethod({ row, column, rowIndex, columnIndobjectSpanMethodex }) {
      const dataProvider = this.tableData;
      const cellValue = row[column.property];
      if (
        column.property == "visitUser" ||
        column.property == "visitId" ||
        column.property == "visitTimes" ||
        column.property == "visitPageTimes"
      )
        return;
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
      this.currentRow = row;
      this.activeComponent = UserVisitDetail;
      this.dialog.title = "页面访问明细";
      this.dialog.visible = true;
    },
    showStatisticalReport() {
      this.activeComponent = TheStatisticalMonthly;
      this.dialog.title = "统计月报";
      this.dialog.visible = true;
    },
  },
};
</script>
<style scoped lang="less">
#chart {
  height: 350px;
}
</style>
