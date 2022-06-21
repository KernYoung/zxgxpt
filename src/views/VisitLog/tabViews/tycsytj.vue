<template>
  <div>
    <!-- 天眼查使用统计 -->
    <div class="title">天眼查使用情况</div>
    <el-table
      :data="useStatusData"
      :span-method="objectSpanMethod"
      border
      style="width: 100%;"
      size="small"
      :header-cell-style="{ background: '#ECF1FE' }"
    >
      <el-table-column type="index" label="序号"></el-table-column>
      <el-table-column prop="module" label="模块" align="center">
      </el-table-column>
      <el-table-column prop="segmentModule" label="细分模块" align="center">
        <template slot-scope="scope">{{
          scope.row.segmentModule || "/"
        }}</template>
      </el-table-column>
      <el-table-column prop="num" label="总次数" align="center">
      </el-table-column>
      <el-table-column prop="userNum" label="使用次数" align="center">
        <template slot-scope="scope">
          <el-link
            type="primary"
            @click="showDetail(scope.row)"
            v-if="scope.row.module == '添加监控（不与时间联动）'"
            >{{ scope.row.userNum }}</el-link
          >
          <span v-else>{{ scope.row.useNum || "/" }}</span></template
        >
      </el-table-column>
      <el-table-column prop="surplusNum" label="剩余次数" align="center">
        <template slot-scope="scope">{{
          scope.row.surplusNum || "/"
        }}</template>
      </el-table-column>
    </el-table>
    <div class="title" style="margin-top:20px">客商初筛调用次数</div>
    <el-table
      :data="applyData"
      border
      style="width: 60%;"
      size="small"
      :header-cell-style="{ background: '#ECF1FE' }"
    >
      <el-table-column prop="COMPANYNAME" label="申请企业" align="center">
      </el-table-column>
      <el-table-column prop="NUM" label="申请次数" align="center">
        <template slot-scope="scope">
          <el-link type="primary" @click="showKscsDetail(scope.row)">{{
            scope.row.NUM
          }}</el-link></template
        >
      </el-table-column>
    </el-table>
    <el-dialog
      :title="dialog.title"
      :visible.sync="dialog.visible"
      width="1100px"
    >
      <!-- <MonitorSituation
        :searchOptions="{ ...searchOptions, flag: '1' }"
      ></MonitorSituation> -->
      <components
        :is="activeComponent"
        :searchOptions="{ ...searchOptions, flag: '1' }"
      ></components>
    </el-dialog>
  </div>
</template>
<script>
import MonitorSituation from "../components/monitorSituation";
import KscsSituation from "../components/kscsSituation";
export default {
  components: { MonitorSituation, KscsSituation },
  props: {
    searchOptions: Object,
  },
  data() {
    return {
      useStatusData: [],
      applyData: [],
      dialog: {
        visible: false,
        title: "",
      },
      activeComponent: "",
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
      };
      this.$ajax.visitLog.getTycUse(param).then((res) => {
        if (res.data.code == "0") {
          this.useStatusData = res.data.data;
        }
      });
      this.$ajax.visitLog.getCustomFilter(param).then((res) => {
        if (res.data.code == "0") {
          this.applyData = res.data.data;
        }
      });
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      const dataProvider = this.useStatusData;
      const cellValue = row[column.property];
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
      this.dialog.title = "天眼查添加监控情况";
      this.activeComponent = MonitorSituation;
      this.dialog.visible = true;
    },
    showKscsDetail(row) {
      this.dialog.title = "天眼查客商初筛使用情况";
      this.activeComponent = KscsSituation;
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
