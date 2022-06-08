<template>
  <div>
    <el-table :data="tableData" border style="width: 100%;" size="small" :header-cell-style="{ background: '#ECF1FE' }">
      <el-table-column prop="reportId" label="报告单号" align="center"> </el-table-column>
      <el-table-column prop="creditCode" label="信保代码" align="center"> </el-table-column>
      <el-table-column prop="name" label="中/英文名称" align="center"> </el-table-column>
      <el-table-column prop="user" label="申请人" align="center"> </el-table-column>
      <el-table-column prop="enterprise" label="申请人所在企业" align="center"> </el-table-column>
      <el-table-column prop="applyTime" label="申请时间" align="center"> </el-table-column>
      <el-table-column prop="auditTime" label="审核时间" align="center"> </el-table-column>
      <el-table-column prop="previewTimes" label="预览次数" align="center" width="75px"> </el-table-column>
      <el-table-column prop="downloadTimes" label="下载次数" align="center" width="75px"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
    }
  },
  components: {},
  computed: {},
  created() {},
  mounted() {
    this.getData()
  },
  watch: {},
  methods: {
    getData() {
      this.tableData = [
        {
          reportId: '1385748',
          creditCode: 'AUS/827841',
          name: '绍兴华峰医药连锁有限公司',
          user: '周璐那（20100024）',
          enterprise: '浙江英特集团股份有限公司',
          applyTime: '2022-05-30',
          auditTime: '2022-05-30 ',
          previewTimes: 0,
          downloadTimes: 0,
        },
        {
          reportId: '1385748',
          creditCode: 'AUS/827841',
          name: '绍兴华峰医药连锁有限公司',
          user: '周璐那（20100024）',
          enterprise: '浙江英特集团股份有限公司',
          applyTime: '2022-05-30',
          auditTime: '2022-05-30 ',
          previewTimes: 0,
          downloadTimes: 0,
        },
        {
          reportId: '1385748',
          creditCode: 'AUS/827841',
          name: '绍兴华峰医药连锁有限公司',
          user: '周璐那（20100024）',
          enterprise: '浙江英特集团股份有限公司',
          applyTime: '2022-05-30',
          auditTime: '2022-05-30 ',
          previewTimes: 0,
          downloadTimes: 0,
        },
      ]
    },
  },
}
</script>

<style scoped lang="scss"></style>
