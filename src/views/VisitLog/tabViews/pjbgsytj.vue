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
      <el-table-column prop="module" label="模块" align="center">
      </el-table-column>
      <el-table-column prop="numberOfHits" label="点数" align="center">
        <template slot-scope="scope">{{
          scope.row.numberOfHits || "/"
        }}</template>
      </el-table-column>
      <el-table-column prop="userNumber" label="使用次数" align="center">
        <template slot-scope="scope">
          <el-link
            type="primary"
            @click="showDetail(scope.row)"
            v-if="scope.row.module == '风险预警（关注不与时间联动）'"
            >{{ scope.row.userNumber }}</el-link
          >
          <span v-else>{{ scope.row.userNumber || "/" }}</span></template
        >
      </el-table-column>
      <el-table-column prop="shareNumber" label="共享次数" align="center">
        <template slot-scope="scope">{{
          scope.row.shareNumber || "/"
        }}</template>
      </el-table-column>
    </el-table>
    <div style="color:orange;font-weight:bold;font-size:14px">
      注：关注数和共享次数数暂统计截至目前的总数
    </div>
    <div
      class="title"
      style="margin-top:20px;display: flex;justify-content: space-between;"
    >
      <span>中诚信申请记录</span>
      <el-link type="primary" @click="exportExcel">导出</el-link>
    </div>
    <el-table
      :data="applyData"
      :span-method="objectSpanMethod"
      border
      style="width: 100%;"
      size="small"
      :header-cell-style="{ background: '#ECF1FE' }"
      ref="table"
    >
      <el-table-column prop="applyType" label="申请类型" align="center">
      </el-table-column>
      <el-table-column prop="applyCompanyName" label="申请企业" align="center">
      </el-table-column>
      <el-table-column prop="userName" label="申请人" align="center">
      </el-table-column>
      <el-table-column prop="companyName" label="申请人所在公司" align="center">
      </el-table-column>
      <el-table-column prop="applyTime" label="申请时间" align="center">
      </el-table-column>
    </el-table>
    <el-dialog
      title="中诚信添加监控情况"
      :visible.sync="dialog.visible"
      width="1100px"
    >
      <MonitorSituation
        :searchOptions="{ ...searchOptions, flag: '0' }"
      ></MonitorSituation>
    </el-dialog>
  </div>
</template>
<script>
import MonitorSituation from "../components/monitorSituation";
import XLSX from "xlsx";
import FileSaver from "file-saver";
export default {
  components: { MonitorSituation },
  props: {
    searchOptions: Object,
  },
  data() {
    return {
      zcxUserStatusData: [],
      applyData: [],
      dialog: {
        visible: false,
      },
      firstClsfIndexArr: [], // 存放firstClsf列每一行记录的合并数  控制firstClsf的合并
      firstClsfIndexRecode: 0, // firstClsfIndexArr的索引
      secondClsfIndexArr: [], // 存放secondClsf列每一行记录的合并数  控制secondClsf列的合并
      secondClsfIndexRecode: 0, // secondClsfIndexArr的索引
      bizNameIndexArr: [], // 存放bizName列每一行记录的合并数   控制第三列的合并  以此类推  每多控制一列，多创建两个变量
      bizNameIndexRecode: 0,

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
  mounted() {},
  methods: {
    getData() {
      let param = {
        startDate: this.searchOptions.handleTime[0],
        endDate: this.searchOptions.handleTime[1],
        companyName: this.searchOptions.company.join(","),
      };
      this.$ajax.visitLog.getZcxReportUse(param).then((res) => {
        if (res.data.code == "0") {
          this.zcxUserStatusData = res.data.data;
        }
      });
      this.$ajax.visitLog.getZcxReportUseList(param).then((res) => {
        if (res.data.code == "0") {
          this.applyData = res.data.data;
          this.getListDataForRowAndColumn(this.applyData);
          console.log(this.applyData);
        }
      });
      // this.applyData = [
      //   {
      //     type: "风险初筛",
      //     enterprise: "上海靖凯模塑科技有限公司",
      //     applyPerson: "75105714（廖建克）",
      //     company: "浙江国贸云商控股有限公司",
      //     applyTime: "2022-05-30 16:30:19",
      //   },
      //   {
      //     type: "风险初筛",
      //     enterprise: "杭州益友医疗科技有限公司",
      //     applyPerson: "80008083（黄心恺）",
      //     company: "浙江英特集团股份有限公司",
      //     applyTime: "2022-05-30 16:57:19",
      //   },
      //   {
      //     type: "风险初筛",
      //     enterprise: "上海靖凯模塑科技有限公司",
      //     applyPerson: "75105714（廖建克）",
      //     company: "浙江国贸云商控股有限公司",
      //     applyTime: "2022-05-30 16:30:19",
      //   },
      //   {
      //     type: "风险初筛",
      //     enterprise: "杭州益友医疗科技有限公司",
      //     applyPerson: "80008083（黄心恺）",
      //     company: "浙江英特集团股份有限公司",
      //     applyTime: "2022-05-30 16:57:19",
      //   },
      // ];
    },
    getListDataForRowAndColumn(data){
      let self = this;
      self.rowAndColumn = [];
      self.rowRoomColumn = [];
      self.rowRoom2Column = [];
      self.rowRoom3Column = [];
      for (var i = 0; i < data.length; i++) {
        if (i === 0) {
          // 如果是第一条记录（即索引是0的时候），向数组中加入１
          self.rowAndColumn.push(1);
          self.pos = 0;
          self.rowRoomColumn.push(1);
          self.posT = 0;
          self.rowRoom2Column.push(1)
          self.posT2 = 0;
          self.rowRoom3Column.push(1)
          self.posT3 = 0;
        } else {
          //data[i].typeDesc就是你从接口读取的字段信息，下同
          if (data[i].applyType === data[i - 1].applyType) {
            // 如果typeDesc相等就累加，并且push 0
            self.rowAndColumn[self.pos] += 1
            self.rowAndColumn.push(0)
            if (data[i].applyCompanyName === data[i - 1].applyCompanyName) {
              // 如果areaDesc相等就累加，并且push 0
              self.rowRoomColumn[self.posT] += 1
              self.rowRoomColumn.push(0)

              if (data[i].userName === data[i - 1].userName) {
                self.rowRoom2Column[self.posT2] += 1
                self.rowRoom2Column.push(0)
                if (data[i].companyName === data[i - 1].companyName) {
                  self.rowRoom3Column[self.posT3] += 1
                  self.rowRoom3Column.push(0)
                } else {
                  self.rowRoom3Column.push(1)
                  self.posT3 = i
             `` }


              }else {
                self.rowRoom2Column.push(1)
                self.posT2 = i
                self.rowRoom3Column.push(1)
                self.posT3 = i;
              }

            } else {
              self.rowRoomColumn.push(1)
              self.posT = i
              self.rowRoom2Column.push(1)
              self.posT2 = i;
              self.rowRoom3Column.push(1)
              self.posT3 = i;
            }
          } else {
            // 不相等push 1
            self.rowAndColumn.push(1)
            self.pos = i;
            self.rowRoomColumn.push(1)
            self.posT = i
            self.rowRoom2Column.push(1)
            self.posT2 = i;
            self.rowRoom3Column.push(1)
            self.posT3 = i;
          }
        }
      }
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      let self = this
      if (columnIndex === 0) {
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
      if (columnIndex === 1) {
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
      if (columnIndex === 2) {
        if (self.rowRoom2Column[rowIndex]) {
          let roomNum = self.rowRoom2Column[rowIndex];
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
        if (self.rowRoom3Column[rowIndex]) {
          let roomNum = self.rowRoom3Column[rowIndex];
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
          `中诚信申请记录(${this.searchOptions.handleTime[0]}-${this.searchOptions.handleTime[1]}).xlsx`
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
.title {
  line-height: 30px;
  font-size: 14px;
  font-weight: bold;
}
</style>
