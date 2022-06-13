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
      <el-table-column
        prop="companyName"
        label="成员公司"
        align="center"
        min-width="250px"
      >
      </el-table-column>
      <el-table-column
        prop="subCompanyName"
        label="子公司"
        align="center"
        min-width="250px"
      >
      </el-table-column>
      <el-table-column prop="userNum" label="启用用户数" align="center">
      </el-table-column>
      <el-table-column prop="userName" label="访问用户" align="center">
      </el-table-column>
      <el-table-column prop="userCode" label="用户工号" align="center">
        <template slot-scope="scope">
          <el-link type="primary" @click="showDetail(scope.row)">{{
            scope.row.userCode
          }}</el-link>
          <!-- <el-button type="text" size="small">{{ scope.row.userId }}</el-button> -->
        </template>
      </el-table-column>
      <el-table-column prop="visitPageNum" label="访问次数" align="center">
      </el-table-column>
      <el-table-column prop="visitPageNum" label="访问页面次数" align="center">
      </el-table-column>
      <el-table-column prop="visitTotalNum" label="访问次数合计" align="center">
      </el-table-column>
      <el-table-column
        prop="visitPageTotalNum"
        label="访问页面次数合计"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="lastVisitTime"
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
      <components :is="activeComponent" :options="options"></components>
      <!-- <span slot="footer" class="dialog-footer">
        <el-button @click="dialog.visible = false">取 消</el-button>
        <el-button type="primary" @click="dialog.visible = false"
          >确 定</el-button
        >
      </span> -->
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
  props: {
    searchOptions: Object,
  },
  data() {
    return {
      tableData: [],
      xAxisData: [],
      visitNumData: [],
      visitPageNumData: [],
      visitUserNumData: [],
      dialog: {
        title: "",
        visible: false,
      },
      activeComponent: "",
      currentRow: {},
      options: {
        startDate: "",
        endDate: "",
        userCode: "",
        userName: "",
        companyName: "",
      },
    };
  },
  watch: {
    searchOptions: {
      handler(val) {
        console.log(val);
        this.getChartData();
        this.getTableData();
      },
      deep: true,
      immediate: true,
    },
  },
  mounted() {},
  methods: {
    getChartData() {
      let param = {
        startDate: this.searchOptions.handleTime[0],
        endDate: this.searchOptions.handleTime[1],
        companyName: this.searchOptions.company.join(","),
      };
      console.log(param);
      this.xAxisData = [];
      this.visitNumData = [];
      this.visitPageNumData = [];
      this.visitUserNumData = [];
      this.$ajax.visitLog.getUserVisitn(param).then((res) => {
        if (res.data.code == "0") {
          res.data.data.map((item) => {
            this.xAxisData.push(item.billDate);
            this.visitNumData.push(item.visitNum);
            this.visitPageNumData.push(item.visitPageNum);
            this.visitUserNumData.push(item.visitUserNum);
            this.initChart();
          });
        }
      });
    },
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
          data: this.xAxisData,
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
            data: this.visitNumData,
          },
          {
            name: "访问用户个数",
            type: "line",
            smooth: true,
            stack: "Total",
            data: this.visitUserNumData,
          },
          {
            name: "访问页面个数",
            type: "line",
            smooth: true,
            stack: "Total",
            data: this.visitPageNumData,
          },
        ],
      };

      option && myChart.setOption(option);
    },
    getTableData() {
      let param = {
        startDate: this.searchOptions.handleTime[0],
        endDate: this.searchOptions.handleTime[1],
        companyName: this.searchOptions.company.join(","),
      };
      this.$ajax.visitLog.getUserVisitList(param).then((res) => {
        if (res.data.code == "0") {
          this.tableData = res.data.data;
        }
      });
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
      console.log(this.searchOptions);
      this.options = {
        startDate: this.searchOptions.handleTime[0],
        endDate: this.searchOptions.handleTime[1],
        userCode: row.userCode,
        userName: row.userName,
        companyName: this.searchOptions.company.join(","),
      };
      this.currentRow = row;
      this.activeComponent = UserVisitDetail;
      this.dialog.title = "页面访问明细";
      this.dialog.visible = true;
    },
    showStatisticalReport() {
      this.options = {
        startDate: this.searchOptions.handleTime[0],
        endDate: this.searchOptions.handleTime[1],
        companyName: this.searchOptions.company.join(","),
      };
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
