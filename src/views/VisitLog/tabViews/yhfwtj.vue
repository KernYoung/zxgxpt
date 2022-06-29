<template>
  <div class="tab-container">
    <!-- 用户访问统计 -->
    <div id="chart"></div>
    <div style="text-align:right; margin: 20px 0 10px 0">
      <el-link type="primary" @click="exportExcel" style="margin-right:10px"
        >导出</el-link
      >
      <el-link type="primary" @click="showStatisticalReport">统计月报</el-link>
    </div>
    <el-table
      :data="tableData"
      :span-method="objectSpanMethod"
      border
      style="width: 100%;"
      size="small"
      :header-cell-style="{ background: '#ECF1FE' }"
      ref="table"
    >
      <el-table-column prop="no" label="序号" width="50px" align="center">
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
      <el-table-column
        prop="userCode"
        label="用户工号"
        align="center"
        width="140px"
      >
        <template slot-scope="scope">
          <el-link type="primary" @click="showDetail(scope.row)">{{
            scope.row.userCode
          }}</el-link>
          <!-- <el-button type="text" size="small">{{ scope.row.userId }}</el-button> -->
        </template>
      </el-table-column>
      <el-table-column prop="visitNum" label="访问次数" align="center">
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
import XLSX from "xlsx";
import FileSaver from "file-saver";
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



      this.$ajax.visitLog.getUserVisitn(param).then((res) => {
        if (res.data.code == "0") {

          this.xAxisData = [];
          this.visitNumData = [];
          this.visitPageNumData = [];
          this.visitUserNumData = [];
          res.data.data.map((item) => {

            this.xAxisData.push(item.billDate);
            this.visitNumData.push(item.visitNum);
            this.visitPageNumData.push(item.visitPageNum);
            this.visitUserNumData.push(item.visitUserNum);
          });
          this.initChart();
          console.log(this.xAxisData);
          console.log(this.visitNumData);
          console.log(this.visitPageNumData);
          console.log(this.visitUserNumData);
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
        toolbox: {
          show: true,
          feature: {
            saveAsImage: {
              show: true,
              excludeComponents: ["toolbox"],
              pixelRatio: 2,
            },
          },
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
            data: this.visitNumData,
          },
          {
            name: "访问用户个数",
            type: "line",
            smooth: true,
            data: this.visitUserNumData,
          },
          {
            name: "访问页面个数",
            type: "line",
            smooth: true,
            data: this.visitPageNumData,
          },
        ],
      };

      option && myChart.setOption(option);
    },
    getListDataForRowAndColumn(data){

      let self = this;
      self.rowAndColumn = [];
      self.rowRoomColumn = [];
      self.rowRoomColumn1 = [];
      self.rowRoomColumn2 = [];
      self.rowRoomColumn3 = [];

      for (var i = 0; i < data.length; i++) {
        if (i === 0) {
          // 如果是第一条记录（即索引是0的时候），向数组中加入１
          self.rowAndColumn.push(1);
          self.pos = 0;
          self.rowRoomColumn.push(1);
          self.posT = 0;
          self.rowRoomColumn1.push(1);
          self.posT1 = 0;
          self.rowRoomColumn2.push(1);
          self.posT2 = 0;
          self.rowRoomColumn3.push(1);
          self.posT3 = 0;
        } else {


          //data[i].typeDesc就是你从接口读取的字段信息，下同
          if (data[i].companyName === data[i - 1].companyName) {
            // 如果typeDesc相等就累加，并且push 0
            self.rowAndColumn[self.pos] += 1
            self.rowAndColumn.push(0)
            if (data[i].subCompanyName === data[i - 1].subCompanyName || data[i].userNum === data[i - 1].userNum || data[i].visitTotalNum === data[i - 1].visitTotalNum || data[i].visitPageTotalNum === data[i - 1].visitPageTotalNum) {
              // 如果areaDesc相等就累加，并且push 0



              if (data[i].subCompanyName === data[i - 1].subCompanyName) {
                self.rowRoomColumn[self.posT] += 1
                self.rowRoomColumn.push(0)
              } else {
                self.rowRoomColumn.push(1)
                self.posT = i
              }

              if (data[i].userNum === data[i - 1].userNum) {
                self.rowRoomColumn1[self.posT1] += 1
                self.rowRoomColumn1.push(0)
              } else {
                self.rowRoomColumn1.push(1)
                self.posT1 = i
              }

              if (data[i].visitTotalNum === data[i - 1].visitTotalNum) {
                self.rowRoomColumn2[self.posT2] += 1
                self.rowRoomColumn2.push(0)
              } else {
                self.rowRoomColumn2.push(1)
                self.posT2 = i
              }

              if (data[i].visitPageTotalNum === data[i - 1].visitPageTotalNum) {
                self.rowRoomColumn3[self.posT3] += 1
                self.rowRoomColumn3.push(0)
              } else {
                self.rowRoomColumn3.push(1)
                self.posT3 = i
              }

            } else {
              // 不相等push 1

              self.rowRoomColumn.push(1)
              self.posT = i
              self.rowRoomColumn1.push(1);
              self.posT1 = i;
              self.rowRoomColumn2.push(1);
              self.posT2 = i;
              self.rowRoomColumn3.push(1);
              self.posT3 = i;
            }
          }else{
            self.rowAndColumn.push(1)
            self.pos = i;
            self.rowRoomColumn.push(1)
            self.posT = i
            self.rowRoomColumn1.push(1);
            self.posT1 = i;
            self.rowRoomColumn2.push(1);
            self.posT2 = i;
            self.rowRoomColumn3.push(1);
            self.posT3 = i;
          }
        }
      }
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
          this.getListDataForRowAndColumn(this.tableData);
        }
      });
    },
    /*objectSpanMethod({ row, column, rowIndex, columnIndobjectSpanMethodex }) {
      const dataProvider = this.tableData;
      const cellValue = row[column.property];
      if (
        column.property == "visitUser" ||
        column.property == "visitId" ||
        column.property == "visitTimes" ||
        column.property == "visitPageTimes" ||
        column.property == "visitPageNum" ||
        column.property == "visitNum"
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
    },*/
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      let self = this

      if (columnIndex === 1||columnIndex === 0) {
        if (self.rowAndColumn[rowIndex]) {
          let rowNum = self.rowAndColumn[rowIndex];
          return {
            rowspan: rowNum,
            colspan: rowNum > 0 ? 1 : 0
          }
        }
        return {
          rowspan: 0,
          colspan: 0
        }
      }
      if (columnIndex === 2) {
        if (self.rowRoomColumn[rowIndex]) {
          let roomNum = self.rowRoomColumn[rowIndex];
          return {
            rowspan: roomNum,
            colspan: roomNum > 0 ? 1 : 0
          }
        }
        return {
          rowspan: 0,
          colspan: 0
        }
      }
      if (columnIndex === 3) {
        if (self.rowRoomColumn1[rowIndex]) {
          let roomNum = self.rowRoomColumn1[rowIndex];
          return {
            rowspan: roomNum,
            colspan: roomNum > 0 ? 1 : 0
          }
        }
        return {
          rowspan: 0,
          colspan: 0
        }
      }
      if (columnIndex === 8) {
        if (self.rowRoomColumn2[rowIndex]) {
          let roomNum = self.rowRoomColumn2[rowIndex];
          return {
            rowspan: roomNum,
            colspan: roomNum > 0 ? 1 : 0
          }
        }
        return {
          rowspan: 0,
          colspan: 0
        }
      }
      if (columnIndex === 9) {
        if (self.rowRoomColumn3[rowIndex]) {
          let roomNum = self.rowRoomColumn3[rowIndex];
          return {
            rowspan: roomNum,
            colspan: roomNum > 0 ? 1 : 0
          }
        }
        return {
          rowspan: 0,
          colspan: 0
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
    exportExcel() {
      const tableComp = this.$refs.table.$el;
      var wb;
      var fix = tableComp.querySelector(".el-table__fixed");
      // 1.从el-table中生成Excel工作簿
      if (fix) {
        // 解决固定列时导出两份的bug
        wb = XLSX.utils.table_to_book(tableComp.removeChild(fix), {
          raw: true,
        });
        tableComp.appendChild(fix);
      } else {
        wb = XLSX.utils.table_to_book(tableComp, { raw: true });
      }
      // 2.输出二进制字符串
      let wbout = XLSX.write(wb, {
        bookType: "xlsx",
        bookSST: true,
        type: "array",
      });
      try {
        FileSaver.saveAs(
          new Blob([wbout], { type: "application/octet-stream" }),
          `用户访问统计(${this.searchOptions.handleTime[0]}-${this.searchOptions.handleTime[1]}).xlsx`
        );
      } catch (e) {
        if (typeof console !== "undefined") {
          console.log(e, wbout);
        }
      }
      return wbout;
    },
  },
};
</script>
<style scoped lang="less">
#chart {
  height: 350px;
}
</style>
