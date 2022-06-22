<template>
  <div>
    <el-form :inline="true" :model="form" class="demo-form-inline" size="small">
      <el-form-item label="">
        <el-date-picker
          v-model="form.tStart"
          type="date"
          placeholder="天眼查服务开始时间"
          value-format="yyyy-MM-dd"
          format="yyyy-MM-dd"
        >
        </el-date-picker>
      </el-form-item>

      <el-form-item label="">
        <el-date-picker
          v-model="form.zStart"
          type="date"
          placeholder="中诚信服务开始时间"
          value-format="yyyy-MM-dd"
          format="yyyy-MM-dd"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="">
        <el-date-picker
          v-model="form.bStart"
          type="date"
          placeholder="中信保服务开始时间"
          value-format="yyyy-MM-dd"
          format="yyyy-MM-dd"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="">
        <el-date-picker
          v-model="form.startDate"
          type="date"
          placeholder="统计开始时间"
          value-format="yyyy-MM-dd"
          format="yyyy-MM-dd"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="">
        <el-date-picker
          v-model="form.endDate"
          type="date"
          placeholder="统计截止时间"
          value-format="yyyy-MM-dd"
          format="yyyy-MM-dd"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search">查询</el-button>
        <el-button type="primary" @click="exportExcel">导出</el-button>
      </el-form-item>
    </el-form>
    <div v-loading="loading" id="main">
      <div style="font-weight:bold">
        截至
        <span style="color:#409eff">{{ detail.date }}</span>
        底，资信共享平台开通
        <span style="color:#409eff">{{ detail.totalCount }}</span> 个账户， 其中子管理员
        <span style="color:#409eff">{{ detail.companyCount }}</span> 位， 涉及各级成员单位
        <span style="color:#409eff">{{ detail.subAdminCount }}</span> 家， 平台5月活跃用户个数共计
        <span style="color:#409eff">{{ detail.active }}</span> 人， 访问次数共计
        <span style="color:#409eff">{{ detail.visitTotalNum }}</span> 次， 用户活跃度
        <span style="color:#409eff">{{ detail.activeRate }}</span> 次/人。
      </div>
      <div style="margin:10px 0">
        截至{{ new Date().getMonth() + 1 }}月份平台用户活跃情况如下（注：红色字体公司已对接API接口）
      </div>
      <el-table
        :data="activeDataEnd"
        :span-method="(param) => objectSpanMethod(param, 'activeDataEnd')"
        border
        style="width: 100%;"
        size="small"
        show-summary
        :summary-method="(param) => getSummaries(param, 'totalSumActive')"
        :header-cell-style="{ background: '#ECF1FE' }"
        id="table1"
      >
        <el-table-column prop="businessSegments" label="板块" align="center"> </el-table-column>
        <el-table-column prop="companyName" label="公司" align="center"> </el-table-column>
        <el-table-column prop="userNum" label="用户开通数" align="center"> </el-table-column>
        <el-table-column prop="activeUserNum" label="活跃用户数" align="center"> </el-table-column>
        <el-table-column prop="activeUserRatio" label="活跃用户占比" align="center">
          <template slot-scope="scope">
            {{ scope.row.activeUserRatio ? scope.row.activeUserRatio.toFixed(3) : scope.row.activeUserRatio }}
          </template>
        </el-table-column>
        <el-table-column prop="visitNum" label="访问次数" align="center"> </el-table-column>
        <el-table-column prop="acticeVisitRatio" label="用户活跃度 访问/活跃用户" align="center"> </el-table-column>
      </el-table>
      <div style="margin:10px 0">
        截至{{ new Date().getMonth() + 1 }}月份各数据使用情况如下（注：红色字体公司已对接API接口）
      </div>
      <el-table
        :data="useDataEnd"
        :span-method="(param) => objectSpanMethod(param, 'useDataEnd')"
        border
        style="width: 100%;"
        size="small"
        show-summary
        :header-cell-style="{ background: '#ECF1FE' }"
        id="table2"
      >
        <el-table-column prop="businessSegments" label="板块" align="center"> </el-table-column>
        <el-table-column prop="companyName" label="公司" align="center"> </el-table-column>
        <el-table-column label="平台应用" align="center">
          <el-table-column prop="tycUseNum" label="天眼查" align="center"> </el-table-column>
          <el-table-column prop="zcxUseNum" label="中诚信" align="center"> </el-table-column>
          <el-table-column prop="zxbUseNum" label="中信保" align="center"> </el-table-column>
        </el-table-column>
        <el-table-column label="客商初筛" align="center">
          <el-table-column prop="tycSxNum" label="天眼查" align="center"> </el-table-column>
        </el-table-column>
        <el-table-column label="API调用" align="center">
          <el-table-column prop="tycApiNum" label="天眼查" align="center"> </el-table-column>
          <el-table-column prop="zcxApiNum" label="中诚信" align="center"> </el-table-column>
        </el-table-column>
        <el-table-column label="关注" align="center">
          <el-table-column prop="tycGzNum" label="天眼查" align="center"> </el-table-column>
          <el-table-column prop="zcxGzNum" label="中诚信" align="center"> </el-table-column>
        </el-table-column>
        <el-table-column label="消息推送" align="center">
          <el-table-column prop="tycMessageNum" label="天眼查" align="center"> </el-table-column>
          <el-table-column prop="zcxMessageNum" label="中诚信" align="center"> </el-table-column>
        </el-table-column>
      </el-table>

      <div style="margin:10px 0">
        {{ new Date().getMonth() + 1 }}月份平台用户活跃情况如下（注：红色字体公司已对接API接口）
      </div>
      <el-table
        :data="activeData"
        :span-method="(param) => objectSpanMethod(param, 'activeData')"
        border
        style="width: 100%;"
        size="small"
        show-summary
        :summary-method="(param) => getSummaries(param, 'totalCurrentActive')"
        :header-cell-style="{ background: '#ECF1FE' }"
        id="table3"
      >
        <el-table-column prop="businessSegments" label="板块" align="center"> </el-table-column>
        <el-table-column prop="companyName" label="公司" align="center"> </el-table-column>
        <el-table-column prop="userNum" label="用户开通数" align="center"> </el-table-column>
        <el-table-column prop="activeUserNum" label="活跃用户数" align="center"> </el-table-column>
        <el-table-column prop="activeUserRatio" label="活跃用户占比" align="center">
          <template slot-scope="scope">
            {{ scope.row.activeUserRatio ? scope.row.activeUserRatio.toFixed(3) : scope.row.activeUserRatio }}
          </template>
        </el-table-column>
        <el-table-column prop="visitNum" label="访问次数" align="center"> </el-table-column>
        <el-table-column prop="activePie" label="用户活跃度 访问/活跃用户" align="center"> </el-table-column>
      </el-table>
      <div style="margin:10px 0">
        {{ new Date().getMonth() + 1 }}月份各数据使用情况如下（注：红色字体公司已对接API接口）
      </div>
      <el-table
        :data="useData"
        :span-method="(param) => objectSpanMethod(param, 'useData')"
        border
        style="width: 100%;"
        size="small"
        show-summary
        :header-cell-style="{ background: '#ECF1FE' }"
        id="table4"
      >
        <el-table-column prop="businessSegments" label="板块" align="center"> </el-table-column>
        <el-table-column prop="companyName" label="公司" align="center"> </el-table-column>
        <el-table-column label="平台应用" align="center">
          <el-table-column prop="tycUseNum" label="天眼查" align="center"> </el-table-column>
          <el-table-column prop="zcxUseNum" label="中诚信" align="center"> </el-table-column>
          <el-table-column prop="zxbUseNum" label="中信保" align="center"> </el-table-column>
        </el-table-column>
        <el-table-column label="客商初筛" align="center">
          <el-table-column prop="tycSxNum" label="天眼查" align="center"> </el-table-column>
        </el-table-column>
        <el-table-column label="API调用" align="center">
          <el-table-column prop="tycApiNum" label="天眼查" align="center"> </el-table-column>
          <el-table-column prop="zcxApiNum" label="中诚信" align="center"> </el-table-column>
        </el-table-column>
        <el-table-column label="关注" align="center">
          <el-table-column prop="tycGzNum" label="天眼查" align="center"> </el-table-column>
          <el-table-column prop="zcxGzNum" label="中诚信" align="center"> </el-table-column>
        </el-table-column>
        <el-table-column label="消息推送" align="center">
          <el-table-column prop="tycMessageNum" label="天眼查" align="center"> </el-table-column>
          <el-table-column prop="zcxMessageNum" label="中诚信" align="center"> </el-table-column>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
import XLSX from 'xlsx'
import FileSaver from 'file-saver'
export default {
  props: {
    options: Object,
  },
  data() {
    return {
      form: {
        tStart: '2021-09-19',
        zStart: '2020-07-10',
        bStart: '2021-01-01',
        startDate: moment()
          .startOf('month')
          .format('YYYY-MM-DD'),
        endDate: moment()
          .endOf('month')
          .format('YYYY-MM-DD'),
      },
      month: moment().month(),
      detail: {
        totalCount: '',
        subAdminCount: '',
        companyCount: '',
        active: '',
        visitTotalNum: '',
        activeRate: '',
        date: '',
      },
      activeDataEnd: [],
      useDataEnd: [],
      activeData: [],
      useData: [],
      loading: false,
      totalSumActive: {},
      totalCurrentActive: {},
    }
  },
  methods: {
    search() {
      if (this.form.tStart == '') {
        this.$message.warning('请选择天眼查服务开始时间')
        return
      } else if (this.form.zStart == '') {
        this.$message.warning('请选择中诚信服务开始时间')
        return
      } else if (this.form.bStart == '') {
        this.$message.warning('请选择中信保服务开始时间')
        return
      } else if (this.form.startDate == '') {
        this.$message.warning('请选择统计开始时间')
        return
      } else if (this.form.endDate == '') {
        this.$message.warning('请选择统计截至时间')
        return
      }
      let param = {
        tStart: this.form.tStart,
        zStart: this.form.zStart,
        bStart: this.form.bStart,
        startDate: this.form.startDate,
        endDate: this.form.endDate,
        companyName: this.options.companyName,
      }
      console.log(param)
      this.loading = true
      this.$ajax.visitLog.getLogMonth(param).then((res) => {
        this.loading = false
        if (res.data.code == '0') {
          this.activeDataEnd = res.data.sumActive
          this.useDataEnd = res.data.sumUse
          this.activeData = res.data.currentMonthActive
          this.useData = res.data.currentMonthUse
          this.detail = {
            totalCount: res.data.totalSumActive.userNum,
            subAdminCount: '',
            companyCount: '',
            active: res.data.totalCurrentActive.activeUserNum,
            visitTotalNum: res.data.totalCurrentActive.visitNum,
            activeRate: res.data.totalCurrentActive.activeUserRatio,
            date: moment(this.form.endDate).format('YYYY年MM月'),
          }
          this.totalSumActive = res.data.totalSumActive
          this.totalCurrentActive = res.data.totalCurrentActive
        }
      })
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }, tableName) {
      const dataProvider = this[tableName]
      const cellValue = row[column.property]
      if (column.property !== 'area') return
      if (cellValue) {
        // 上一条数据
        const prevRow = dataProvider[rowIndex - 1]
        // 下一条数据
        let nextRow = dataProvider[rowIndex + 1]
        // 当上一条数据等于下一条数据
        if (prevRow && prevRow[column.property] === cellValue) {
          return { rowspan: 0, colspan: 0 }
        } else {
          let rowspan = 1
          while (nextRow && nextRow[column.property] === cellValue) {
            rowspan++
            nextRow = dataProvider[rowspan + rowIndex]
          }
          if (rowspan > 1) {
            return { rowspan, colspan: 1 }
          }
        }
      }
    },
    getSummaries({ columns, data }, name) {
      console.log(name)
      let sums = []
      sums[0] = '合计'
      sums[2] = this[name].userNum
      sums[3] = this[name].activeUserNum
      sums[4] = this[name].activeUserRatio
      sums[5] = this[name].visitNum
      console.log(sums)
      return sums
    },
    // 导出
    exportExcel() {
      var xlsxParam = {
        raw: true,
      } //转换成excel时，使用原始的格式，这样导出的时候数字过长不会变成科学计数法
      let workbook = XLSX.utils.book_new()
      let ws1 = XLSX.utils.table_to_sheet(document.querySelector('#table1'), xlsxParam)
      // 这里可以添加多个sheet页
      XLSX.utils.book_append_sheet(workbook, ws1, ` 截至${new Date().getMonth() + 1}月份平台用户活跃情况`)
      let ws2 = XLSX.utils.table_to_sheet(document.querySelector('#table2'), xlsxParam)
      XLSX.utils.book_append_sheet(workbook, ws2, ` 截至${new Date().getMonth() + 1}月份各数据使用情况`)
      let ws3 = XLSX.utils.table_to_sheet(document.querySelector('#table3'), xlsxParam)
      XLSX.utils.book_append_sheet(workbook, ws3, ` ${new Date().getMonth() + 1}月份平台用户活跃情况`)
      let ws4 = XLSX.utils.table_to_sheet(document.querySelector('#table4'), xlsxParam)
      XLSX.utils.book_append_sheet(workbook, ws4, ` ${new Date().getMonth() + 1}月份各数据使用情况`)
      let wbout = XLSX.write(workbook, {
        bookType: 'xlsx',
        bookSST: true,
        type: 'array',
      })
      try {
        FileSaver.saveAs(
          new Blob([wbout], {
            type: 'application/octet-stream;charset=utf-8"',
          }),
          '统计月报.xlsx'
        )
      } catch (e) {
        if (typeof console !== 'undefined') console.log(e, wbOut)
      }
      return wbout
    },
  },
}
</script>
<style scoped lang="less">
::v-deep .el-table--border th,
.el-table__fixed-right-patch {
  border-color: #e3e3e3;
}
</style>
