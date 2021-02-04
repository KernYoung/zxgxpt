<!-- 客商初筛结果查看 -->
<template>
  <div class="resultsView">
    <div style="margin-bottom: 15px;">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/homePage' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>结果查看</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <el-row>
      <el-select v-model="search.userName" placeholder="请选择填报人" clearable style="width: 200px;margin-right: 10px;" @change="changeProfession">
        <el-option v-for="item in users" :key="item" :label="item" :value="item">
        </el-option>
      </el-select>
      <el-select v-model="search.serialNumber" placeholder="请选择流水号" clearable style="width: 200px;margin-right: 10px;">
        <el-option v-for="item in serialNumbers" :key="item" :label="item" :value="item">
        </el-option>
      </el-select>
      <el-button type="primary" icon="el-icon-search" @click="searchData">查询</el-button>
      <el-button type="primary" @click="handleExport">导出[Excel]</el-button>
    </el-row>

    <div class="table-box">
      <el-table
          :data="tableData"
          style="width: 100%">
        <el-table-column
            prop="customName1"
            label="客商全称-填报"
            width="120">
        </el-table-column>
        <el-table-column
            prop="customSocialCode"
            label="社会信用代码-填报"
            width="150">
        </el-table-column>
        <el-table-column
            prop="name"
            label="客商名称">
        </el-table-column>
        <el-table-column
            prop="creditCode"
            label="统一社会信用代码" width="150px">
        </el-table-column>
        <el-table-column
            prop="companyorgtype"
            label="公司类型">
        </el-table-column>
        <el-table-column
            prop="industry"
            label="行业">
        </el-table-column>
        <el-table-column
            prop="reglocation"
            label="注册地址">
        </el-table-column>
        <el-table-column
            prop="businessScope"
            label="经营范围">
        </el-table-column>
        <el-table-column
            prop="phoneNumber"
            label="联系电话">
        </el-table-column>
        <el-table-column
            prop="regcapital"
            label="注册资本">
        </el-table-column>
        <el-table-column
            prop="legalpersonname"
            label="企业法人">
        </el-table-column>
        <el-table-column
            prop="estiblishtime"
            label="成立时间">
        </el-table-column>
        <el-table-column
            prop="fromtime"
            label="登记开始日">
        </el-table-column>
        <el-table-column
            prop="totime"
            label="登记到期日">
        </el-table-column>
      </el-table>
    </div>

    <div style="text-align: center;margin-top: 10px;">
      <el-pagination background layout="prev, pager, next,total,jumper" :total="page.total"
                     :current-page.sync="page.currentPage" :pageSize="page.pageSize" @current-change="handleCurrentChange">
      </el-pagination>
    </div>

  </div>
</template>

<script>

import { export_json_to_excel } from "../assets/Export2Excel";
export default {
  data() {
    return {
      users: [],
      serialNumbers: [],
      backData: [],
      tableData:[],
      excelData:[],
      search: {
        userName: '',
        serialNumber: ''
      },
      page: {
        currentPage: 1,
        total: 0,
        pageSize: 10
      },
    }
  },
  mounted() {
    this.getSearchInfo();
  },
  methods: {
    getSearchInfo() {
      let param = {
        userName: this.$Cookies.get('userCode')
      }
      this.$ajax.manage.getSearchFillInInfo(param).then(res => {
        if (res.data.code === '0') {
          console.log(res.data)
          this.users = res.data.allUpdataBy[0];
          this.backData = res.data.allSerialid;
        }
      })
    },
    changeProfession(val) {
      for (let i in this.users) {
        if (this.users[i] === val) {
          this.serialNumbers = this.backData[i];
          console.log(this.serialNumbers);
        }
      }
    }
    ,
    searchData(){
      this.getData();
    },
    getData(page) {
      let param = {
        pageIndex: page ? page : 1,
        pageSize: this.page.pageSize,
        updataBy:this.search.userName,
        serialid:this.search.serialNumber
      }

      this.$ajax.manage.getMerchantsViewResults(param).then(res => {
        console.log(param)
        console.log(res.data)
        if(res.data.code === 0) {
          this.tableData = res.data.merchantsViewResults;
          this.excelData = res.data.excel;
          this.page.total = res.data.totalRecords;
          this.tableData.splice(1, 0);
          this.$message.success(res.data.msg);
        }
      })

    },
    handleCurrentChange(val) {
      //页码切换
      this.getData(val);
    },
    handleExport() {
      var tHeader = ["客商全称-填报", "社会信用代码-填报", "客商名称", "统一社会信用代码", "公司类型", "行业","注册地址","经营范围","联系电话",
      "注册资本","企业法人","成立时间","登记开始日","登记到期日"];
      var filterVal = ["customName1", "customSocialCode", "name", "creditCode", "companyorgtype", "industry","reglocation","businessScope","phoneNumber",
      "regcapital","legalpersonname","estiblishtime","fromtime","totime"];
      var filename = "客商初筛检索结果";
      var data = this.formatJson(filterVal, this.excelData);
      export_json_to_excel(
         tHeader,
          data,
          filename,
      );
    },
    /**
     *  格式数据
     *  @filterVal  格式头
     *  @tableData  用来格式的表格数据
     */
    formatJson(filterVal, tableData) {
      return tableData.map(v => {
        return filterVal.map(j => {
          return v[j];
        });
      });
    },
  }
}

</script>

<style lang="less" scoped>
.resultsView {
  width: 95%;
  height: 100%;
  margin: auto;
  background-color: #f8f8f8;
  box-sizing: border-box;
  padding: 20px;
  overflow-block: auto;

  .table-box {
    margin: 20px auto;
  }

}

</style>