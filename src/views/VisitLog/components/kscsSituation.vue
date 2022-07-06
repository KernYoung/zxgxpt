<template>
  <div class="tab-container">
    <el-table
      :data="tableData"
      border
      style="width: 100%;"
      size="small"
      :header-cell-style="{ background: '#ECF1FE' }"
      :span-method="objectSpanMethod"
    >
      <el-table-column type="index" label="序号"></el-table-column>
      <el-table-column prop="applyCompanyName" label="已申请企业" align="center"> </el-table-column>
      <el-table-column prop="applyUserName" label="最初申请人" align="center"> </el-table-column>
      <el-table-column prop="companyName" label="申请人所在企业" align="center"> </el-table-column>
      <el-table-column prop="applyTime" label="最初申请时间" align="center"> </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  props: {
    searchOptions: Object,
  },
  data() {
    return {
      tableData: [],
    }
  },
  watch: {
    searchOptions: {
      handler(val) {
        this.getData()
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    getData() {
      console.log(this.searchOptions)
      let param = {
        startDate: this.searchOptions.handleTime[0],
        endDate: this.searchOptions.handleTime[1],
        companyName: this.searchOptions.COMPANYNAME,
        source: this.searchOptions.SOURCE,
      }
      this.$ajax.visitLog.getTycFilterCustomerList(param).then((res) => {
        if (res.data.code == '0') {
          this.tableData = res.data.data;
          this.getListDataForRowAndColumn(this.tableData);
        }

      })
    },
    getListDataForRowAndColumn(data){

      let self = this;
      self.rowAndColumn = [];
      self.rowRoomColumn = [];
      self.rowRoom2Column = [];

      for (var i = 0; i < data.length; i++) {
        if (i === 0) {
          // 如果是第一条记录（即索引是0的时候），向数组中加入１
          self.rowAndColumn.push(1);
          self.pos = 0;
          self.rowRoomColumn.push(1);
          self.posT = 0;
          self.rowRoom2Column.push(1)
          self.posT2 = 0;

        } else {
          //data[i].typeDesc就是你从接口读取的字段信息，下同
          if (data[i].applyCompanyName === data[i - 1].applyCompanyName) {
            // 如果typeDesc相等就累加，并且push 0
            self.rowAndColumn[self.pos] += 1
            self.rowAndColumn.push(0)
            if (data[i].applyUserName === data[i - 1].applyUserName) {
              // 如果areaDesc相等就累加，并且push 0
              self.rowRoomColumn[self.posT] += 1
              self.rowRoomColumn.push(0)

              if (data[i].companyName === data[i - 1].companyName) {
                self.rowRoom2Column[self.posT2] += 1
                self.rowRoom2Column.push(0)



              }else {
                self.rowRoom2Column.push(1)
                self.posT2 = i

              }

            } else {
              self.rowRoomColumn.push(1)
              self.posT = i
              self.rowRoom2Column.push(1)
              self.posT2 = i;

            }
          } else {
            // 不相等push 1
            self.rowAndColumn.push(1)
            self.pos = i;
            self.rowRoomColumn.push(1)
            self.posT = i
            self.rowRoom2Column.push(1)
            self.posT2 = i;

          }
        }
      }
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      let self = this

      if (columnIndex === 1) {
        if (self.rowAndColumn[rowIndex]) {
          let roomNum = self.rowAndColumn[rowIndex];
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
    },
  },
}
</script>
<style scoped lang="less"></style>
