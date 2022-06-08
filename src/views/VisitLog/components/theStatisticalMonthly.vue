<template>
  <div>
    <el-form :inline="true" :model="form" class="demo-form-inline" size="small">
      <el-form-item label="">
        <el-date-picker v-model="form.tycDate" type="date" placeholder="天眼查服务开始时间"> </el-date-picker>
      </el-form-item>

      <el-form-item label="">
        <el-date-picker v-model="form.zcxDate" type="date" placeholder="中诚信服务开始时间"> </el-date-picker>
      </el-form-item>
      <el-form-item label="">
        <el-date-picker v-model="form.zxbDate" type="date" placeholder="中信保服务开始时间"> </el-date-picker>
      </el-form-item>
      <el-form-item label="">
        <el-date-picker v-model="form.startDate" type="date" placeholder="统计开始时间"> </el-date-picker>
      </el-form-item>
      <el-form-item label="">
        <el-date-picker v-model="form.endDate" type="date" placeholder="统计截止时间"> </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search">查询</el-button>
      </el-form-item>
    </el-form>
    <div style="font-weight:bold">
      截至2022年5月底，资信共享平台开通
      <span style="color:#409eff">{{ detail.totalCount }}</span> 个账户， 其中子管理员
      <span style="color:#409eff">{{ detail.companyCount }}</span> 位， 涉及各级成员单位
      <span style="color:#409eff">{{ detail.subAdminCount }}</span> 家， 平台5月活跃用户个数共计
      <span style="color:#409eff">{{ detail.active }}</span> 人， 访问次数共计
      <span style="color:#409eff">{{ detail.visitTotalNum }}</span> 次， 用户活跃度
      <span style="color:#409eff">{{ detail.activeRate }}</span> 次/人。
    </div>
    <div style="margin:10px 0">
      截至5月份平台用户活跃情况如下（注：红色字体公司已对接API接口）
    </div>
    <el-table
      :data="activeDataEnd"
      :span-method="(param) => objectSpanMethod(param, 'activeDataEnd')"
      border
      style="width: 100%;"
      size="small"
      show-summary
      :header-cell-style="{ background: '#ECF1FE' }"
    >
      <el-table-column prop="area" label="板块" align="center"> </el-table-column>
      <el-table-column prop="company" label="公司" align="center"> </el-table-column>
      <el-table-column prop="openNum" label="用户开通数" align="center"> </el-table-column>
      <el-table-column prop="activeNum" label="活跃用户数" align="center"> </el-table-column>
      <el-table-column prop="activeRate" label="活跃用户占比" align="center"> </el-table-column>
      <el-table-column prop="visitNum" label="访问次数" align="center"> </el-table-column>
      <el-table-column prop="activePie" label="用户活跃度 访问/活跃用户" align="center"> </el-table-column>
    </el-table>
    <div style="margin:10px 0">
      截至5月份各数据使用情况如下（注：红色字体公司已对接API接口）
    </div>
    <el-table
      :data="useDataEnd"
      :span-method="(param) => objectSpanMethod(param, 'useDataEnd')"
      border
      style="width: 100%;"
      size="small"
      show-summary
      :header-cell-style="{ background: '#ECF1FE' }"
    >
      <el-table-column prop="area" label="板块" align="center"> </el-table-column>
      <el-table-column prop="company" label="公司" align="center"> </el-table-column>
      <el-table-column label="平台应用" align="center">
        <el-table-column prop="ptyytyc" label="天眼查" align="center"> </el-table-column>
        <el-table-column prop="ptyyzcx" label="中诚信" align="center"> </el-table-column>
        <el-table-column prop="ptyyzxb" label="中信保" align="center"> </el-table-column>
      </el-table-column>
      <el-table-column label="客商初筛" align="center">
        <el-table-column prop="kscstyc" label="天眼查" align="center"> </el-table-column>
      </el-table-column>
      <el-table-column label="API调用" align="center">
        <el-table-column prop="APItyc" label="天眼查" align="center"> </el-table-column>
        <el-table-column prop="APIzcx" label="中诚信" align="center"> </el-table-column>
      </el-table-column>
      <el-table-column label="关注" align="center">
        <el-table-column prop="attentiontyc" label="天眼查" align="center"> </el-table-column>
        <el-table-column prop="attentionzcx" label="中诚信" align="center"> </el-table-column>
      </el-table-column>
      <el-table-column label="消息推送" align="center">
        <el-table-column prop="infotyc" label="天眼查" align="center"> </el-table-column>
        <el-table-column prop="infozcx" label="中诚信" align="center"> </el-table-column>
      </el-table-column>
    </el-table>

    <div style="margin:10px 0">
      5月份平台用户活跃情况如下（注：红色字体公司已对接API接口）
    </div>
    <el-table
      :data="activeData"
      :span-method="(param) => objectSpanMethod(param, 'activeData')"
      border
      style="width: 100%;"
      size="small"
      show-summary
      :header-cell-style="{ background: '#ECF1FE' }"
    >
      <el-table-column prop="area" label="板块" align="center"> </el-table-column>
      <el-table-column prop="company" label="公司" align="center"> </el-table-column>
      <el-table-column prop="openNum" label="用户开通数" align="center"> </el-table-column>
      <el-table-column prop="activeNum" label="活跃用户数" align="center"> </el-table-column>
      <el-table-column prop="activeRate" label="活跃用户占比" align="center"> </el-table-column>
      <el-table-column prop="visitNum" label="访问次数" align="center"> </el-table-column>
      <el-table-column prop="activePie" label="用户活跃度 访问/活跃用户" align="center"> </el-table-column>
    </el-table>
    <div style="margin:10px 0">
      5月份各数据使用情况如下（注：红色字体公司已对接API接口）
    </div>
    <el-table
      :data="useData"
      :span-method="(param) => objectSpanMethod(param, 'useData')"
      border
      style="width: 100%;"
      size="small"
      show-summary
      :header-cell-style="{ background: '#ECF1FE' }"
    >
      <el-table-column prop="area" label="板块" align="center"> </el-table-column>
      <el-table-column prop="company" label="公司" align="center"> </el-table-column>
      <el-table-column label="平台应用" align="center">
        <el-table-column prop="ptyytyc" label="天眼查" align="center"> </el-table-column>
        <el-table-column prop="ptyyzcx" label="中诚信" align="center"> </el-table-column>
        <el-table-column prop="ptyyzxb" label="中信保" align="center"> </el-table-column>
      </el-table-column>
      <el-table-column label="客商初筛" align="center">
        <el-table-column prop="kscstyc" label="天眼查" align="center"> </el-table-column>
      </el-table-column>
      <el-table-column label="API调用" align="center">
        <el-table-column prop="APItyc" label="天眼查" align="center"> </el-table-column>
        <el-table-column prop="APIzcx" label="中诚信" align="center"> </el-table-column>
      </el-table-column>
      <el-table-column label="关注" align="center">
        <el-table-column prop="attentiontyc" label="天眼查" align="center"> </el-table-column>
        <el-table-column prop="attentionzcx" label="中诚信" align="center"> </el-table-column>
      </el-table-column>
      <el-table-column label="消息推送" align="center">
        <el-table-column prop="infotyc" label="天眼查" align="center"> </el-table-column>
        <el-table-column prop="infozcx" label="中诚信" align="center"> </el-table-column>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        tycDate: '',
        zcxDate: '',
        zxbDate: '',
        startDate: '',
        endDate: '',
      },
      detail: {
        totalCount: 6869,
        subAdminCount: 39,
        companyCount: 155,
        active: 377,
        visitTotalNum: 11028,
        activeRate: 29,
      },
      activeDataEnd: [],
      useDataEnd: [],
      activeData: [],
      useData: [],
    }
  },
  methods: {
    search() {
      this.activeDataEnd = [
        {
          area: '金融',
          company: '浙江东方',
          openNum: 315,
          activeNum: 100,
          activeRate: '31.75%',
          visitNum: 13690,
          activePie: 137,
        },
        {
          area: '金融',
          company: '浙江商贸',
          openNum: 649,
          activeNum: 320,
          activeRate: '49.31%',
          visitNum: 22073,
          activePie: 69,
        },
        {
          area: '金融',
          company: '浙金信托',
          openNum: 259,
          activeNum: 27,
          activeRate: '10.42%',
          visitNum: 998,
          activePie: 37,
        },
        {
          area: '商贸',
          company: '浙江粮油',
          openNum: 1280,
          activeNum: 37,
          activeRate: '2.89%',
          visitNum: 2421,
          activePie: 65,
        },
        {
          area: '商贸',
          company: '浙江土畜',
          openNum: 1406,
          activeNum: 60,
          activeRate: '4.27%',
          visitNum: 8284,
          activePie: 138,
        },
      ]
      this.activeData = this.activeDataEnd
      this.useDataEnd = [
        {
          area: '金融',
          company: '浙江东方',
          ptyytyc: 4435,
          ptyyzcx: 936,
          ptyyzxb: 7,
          kscstyc: null,
          APItyc: 416351,
          APIzcx: null,
          attentiontyc: 23,
          attenttionzcx: 2500,
          infotyc: 211222,
          infozcx: 1973,
        },
        {
          area: '金融',
          company: '浙商资产',
          ptyytyc: 2900,
          ptyyzcx: 2026,
          ptyyzxb: null,
          kscstyc: null,
          APItyc: 17761,
          APIzcx: null,
          attentiontyc: 162,
          attenttionzcx: 14600,
          infotyc: 32798,
          infozcx: 1028,
        },
        {
          area: '商贸',
          company: '浙江粮油',
          ptyytyc: 154,
          ptyyzcx: 200,
          ptyyzxb: 57,
          kscstyc: null,
          APItyc: 4675,
          APIzcx: 10,
          attentiontyc: 4,
          attenttionzcx: 100,
          infotyc: 1759,
          infozcx: 12,
        },
        {
          area: '商贸',
          company: '浙江土畜',
          ptyytyc: 845,
          ptyyzcx: 630,
          ptyyzxb: 140,
          kscstyc: null,
          APItyc: 55181,
          APIzcx: null,
          attentiontyc: 14,
          attenttionzcx: null,
          infotyc: 523,
          infozcx: null,
        },
      ]
      this.useData = this.useDataEnd
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
  },
}
</script>
<style scoped lang="less">
::v-deep .el-table--border th,
.el-table__fixed-right-patch {
  border-color: #e3e3e3;
}
</style>
