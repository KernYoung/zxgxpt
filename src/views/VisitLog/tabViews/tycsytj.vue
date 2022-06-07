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
      <el-table-column prop="area" label="模块" align="center">
      </el-table-column>
      <el-table-column prop="subArea" label="细分模块" align="center">
        <template slot-scope="scope">{{ scope.row.subArea || "/" }}</template>
      </el-table-column>
      <el-table-column prop="total" label="总次数" align="center">
      </el-table-column>
      <el-table-column prop="useNum" label="使用次数" align="center">
        <template slot-scope="scope">
          <el-link
            type="primary"
            @click="showDetail(scope.row)"
            v-if="scope.row.area == '添加监控（不与时间联动）'"
            >{{ scope.row.useNum }}</el-link
          >
          <span v-else>{{ scope.row.useNum || "/" }}</span></template
        >
      </el-table-column>
      <el-table-column prop="restNum" label="剩余次数" align="center">
        <template slot-scope="scope">{{ scope.row.restNum || "/" }}</template>
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
      <el-table-column prop="enterprise" label="申请企业" align="center">
      </el-table-column>
      <el-table-column prop="applyNum" label="申请次数" align="center">
      </el-table-column>
    </el-table>
    <el-dialog
      title="天眼查添加监控情况"
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
      useStatusData: [
        {
          area: "添加监控（不与时间联动）",
          subArea: null,
          total: "12000家",
          useNum: 4940,
          restNum: 6726,
        },
        {
          area: "API接口",
          subArea: "模糊查询",
          total: "100万次",
          useNum: 97,
          restNum: null,
        },
        {
          area: "API接口",
          subArea: "详情页-工商信息",
          total: "100万次",
          useNum: 0,
          restNum: null,
        },
        {
          area: "API接口",
          subArea: "客商初筛-工商信息",
          total: "100万次",
          useNum: 0,
          restNum: null,
        },
        {
          area: "API接口",
          subArea: "下发接口-工商信息",
          total: "100万次",
          useNum: 0,
          restNum: null,
        },
        {
          area: "专业版嵌入",
          subArea: null,
          total: "200并发",
          useNum: 84,
          restNum: "不限次数，按年计费",
        },
      ],
      applyData: [],
      dialog: {
        visible: false,
      },
    };
  },
  methods: {
    getData() {},
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
