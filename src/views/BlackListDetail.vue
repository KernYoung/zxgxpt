<!-- 黑名单详情页 -->
 <template>
  <div class="BlackListDetail">
    <div style="margin-bottom: 15px;">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/homePage' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>黑名单详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <el-row class="searchBox">
      <el-input class="fl-left manageTableInput" v-model="search.companyName" placeholder="请输入公司名称" clearable
                style="width: 200px;margin-right: 10px;">
      </el-input>
      <el-select v-model="search.dataSource" placeholder="请选择数据源" clearable style="width: 200px;margin-right: 10px;">
        <el-option v-for="item in dataSourceOptions" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>

      <el-date-picker
          v-model="search.startDate"
          type="date"
          placeholder="请选择开始时间"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd">
      </el-date-picker>
-
      <el-date-picker
          v-model="search.endDate"
          type="date"
          placeholder="请选择结束时间"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd">
      </el-date-picker>

      <el-button style="margin-left:10px;" type="primary" icon="el-icon-search" @click="searchData(1)">查询</el-button>
      <el-button style="margin-left:10px;" type="success" @click="handleExport">导出</el-button>
    </el-row>

    <div>
      <el-table :data="tableData">
        <el-table-column
            min-width="10%"
            prop="companyName"
            label="公司名称">
        </el-table-column>
        <el-table-column
            min-width="6%"
            prop="orgNo" show-overflow-tooltip
            label="组织机构代码">
        </el-table-column>
        <el-table-column
            min-width="6%"
            prop="juridicalPersonName" show-overflow-tooltip
            label="法人名称">
        </el-table-column>
        <el-table-column
            min-width="6%"
            prop="enterpriseStatus"
            label="企业状态">
        </el-table-column>
        <el-table-column
            min-width="6%"
            prop="industryCategory"
            label="行业分类">
        </el-table-column>
        <el-table-column
            min-width="6%"
            prop="subjectCategory"
            label="科目大类">
        </el-table-column>
        <el-table-column
            min-width="6%"
            prop="businessCategory"
            label="业务大类">
        </el-table-column>
        <el-table-column
            min-width="5%"
            prop="status"
            label="状态">
        </el-table-column>
        <el-table-column
            min-width="15%"
            prop="riskReason"
            label="风险原因">
        </el-table-column>
        <el-table-column
            min-width="8%"
            prop="beRiskyAssetsDate"
            label="计入风险资产时间">
        </el-table-column>
        <el-table-column
            min-width="13%"
            prop="existingDifficulties" show-overflow-tooltip
            label="存在的困难">
        </el-table-column>
        <el-table-column
            min-width="7%"
            prop="amountOfMark"
            label="账面标的金额(万元)">
        </el-table-column>
        <el-table-column
            min-width="6%"
            prop="dataSource"
            label="计入来源">
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
  data(){
    return{
        tableData:[],
        blackListWithoutPagination:[],
        page: {
          currentPage: 1,
          total: 0,
          pageSize: 10
        },
      search: {
        companyName: '',
        dataSource: '',
        startDate: '',
        endDate: '',
      },
      dataSourceOptions: [
        {
          label: '风险资产',
          value: '1'
        },
        {
          label: '门户申报',
          value: '2'
        }
      ],
    }
  },
  created() {
    this.searchData(1);
    // this.getBlackListAll();
    // this.getCompayNameAndCreditCode();
    // let token = this.$Cookies.get(this.$getCookieKey());
    // this.headers = {
    //   token:token,
    // }
  },
  methods:{
    handleCurrentChange(val) {
      //页码切换
      this.searchData(val);
    },
    searchData(page){
      if(this.search.startDate > this.search.endDate){
        this.$message.warning('结束时间不能早于开始时间！');
        return;
      }

      this.page.currentPage = page
      let param = {
        "userCode": sessionStorage.getItem('userCode'),
        pageIndex: page ? page : 1,
        pageSize: this.page.pageSize,
        companyName: this.search.companyName,
        dataSource: this.search.dataSource,
        startDate: this.search.startDate,
        endDate: this.search.endDate,
        // status:this.statusCopy,
        // publishBy:this.$Cookies.get('userCode')
      }

      let paramWithoutPagination = {
        "userCode": sessionStorage.getItem('userCode'),
        companyName: this.search.companyName,
        dataSource: this.search.dataSource,
        startDate: this.search.startDate,
        endDate: this.search.endDate,
      }

      this.$ajax.manage.getBlackListDetailList(param).then(res => {
        if(res.data.code === 0) {
          this.tableData = res.data.blackListDetailResultList;
          for (let i = 0; i < this.tableData.length; i++) {
            switch(this.tableData[i].dataSource){
              case "1":
                this.tableData[i].dataSource = '风险资产';
                break
              case "2":
                this.tableData[i].dataSource = '门户申报';
                break
            }
          }
          this.page.total = res.data.totalRecords;
          this.tableData.splice(1, 0);
          this.$message.success(res.data.msg);
        }
      })

      //这里是根据查询结果导出excel的数据源
      this.$ajax.manage.getBlackListDetailList(paramWithoutPagination).then(res => {
        if(res.data.code === 0) {
          this.blackListWithoutPagination = res.data.blackListDetailResultList
          for (let i = 0; i < this.blackListWithoutPagination.length; i++) {
            switch(this.blackListWithoutPagination[i].dataSource){
              case "1":
                this.blackListWithoutPagination[i].dataSource = '风险资产';
                break
              case "2":
                this.blackListWithoutPagination[i].dataSource = '门户申报';
                break
            }
          }
          this.$message.success(res.data.msg);
        }
      })
    },

    handleExport() {
      var tHeader = ["公司名称","组织机构代码","法人名称","企业状态","行业分类","科目大类","业务大类","状态","风险原因",
        "计入风险资产时间","存在的困难","账面标的金额(万元)","计入来源"];
      var filterVal = ["companyName","orgNo","juridicalPersonName","enterpriseStatus","industryCategory","subjectCategory",
        "businessCategory","status","riskReason", "beRiskyAssetsDate","existingDifficulties","amountOfMark","dataSource"];
      var filename = "黑名单详情列表";
      var data = this.formatJson(filterVal, this.blackListWithoutPagination);
      export_json_to_excel(
          tHeader,
          data,
          filename,
      );
    },
    /**
     *  格式数据
     *  @filterVal  格式头
     *  @blackListDataAll  用来格式的表格数据
     */
    formatJson(filterVal, blackListDataAll) {
      return blackListDataAll.map(v => {
        return filterVal.map(j => {
          return v[j];
        });
      });
    },
    // getBlackListAll(){
    //   let param = {
    //     "userCode": sessionStorage.getItem('userCode'),
    //   }
    //   this.$ajax.manage.getBlackListAll(param).then(res => {
    //     if (res.data.code == 0) {
    //       this.blackListDataAll = res.data.blackListAll
    //     }
    //   })
    // },
    // querySearch(queryString, cb) {
    //   var results = queryString ? this.compayNameAndCreditCodes.filter(this.createFilter(queryString)) : this.compayNameAndCreditCodes;
    //   let newCompayNameAndCreditCodes = [];
    //   for(let item of results){
    //     newCompayNameAndCreditCodes.push({
    //       value:item.companyName,
    //       id:item.creditCode
    //     });
    //   }
    //   // 调用 callback 返回建议列表的数据
    //   cb(newCompayNameAndCreditCodes);
    // },
    // createFilter(queryString) {
    //   return (CompayNameCode) => {
    //     return (CompayNameCode.companyName.indexOf(queryString) >= 0);
    //   };
    // },
    // getDate(){
    //   let date = new Date();
    //   let year = date.getFullYear();
    //   let mon = (date.getMonth() + 1);
    //   let day = date.getDate();
    //   let hours = date.getHours();
    //   let minutes = date.getMinutes();
    //   let seconds = date.getSeconds();
    //   return year +'-'+ this.appendZero(mon) +'-'+ this.appendZero(day) +' '+ this.appendZero(hours) + ':' + this.appendZero(minutes) + ':' + this.appendZero(seconds);
    // },
    // appendZero(obj){
    //   return  obj < 10  ? "0" + obj : obj
    // },
    // closeDialog() {
    //   this.editBlackDialog = false
	  //  /* this.$refs['blackInfo'].clearValidate(); */
    // },
    // closeRenewalCancellationDialog(){
    //   this.editRenewalCancellationDialog = false
    // },
    // closeEditRevokeDialog(){
    //   this.editRevokeDialog = false;
    // },
    // clickRenewalCancellation(row){
    //   this.clearBlackInfo();
    //   this.editRenewalCancellationDialog = true;
    //   this.isNew = false;
    //   this.blackInfo = Object.assign({},row);
    //   this.blackInfo.approveBy = this.$Cookies.get('userCode');
    //   this.blackInfo.approveTime = this.getDate();
    //   this.blackInfo.isNew = this.isNew;
    //   console.log(this.blackInfo)
    // },
    // clickeditRevokeDialog(row){
    //   this.clearBlackInfo();
    //   this.editRevokeDialog = true;
    //   this.isNew = false;
    //   this.blackInfo = Object.assign({},row);
    //   this.blackInfo.cancelBy = this.$Cookies.get('userCode');
    //   this.blackInfo.cancelTime = this.getDate();
    //   this.blackInfo.isNew = this.isNew;
    //   console.log(this.blackInfo)
    // },
    // clearBlackInfo() {
    //   this.blackInfo = {
    //     pid: '',//pid
    //     publishDept: '',   // 申请单位
    //     publishTime: '', // 申请时间
    //     entName: '',     // 企业名称
    //     creditCode: '',      // 社会统一信用代码
    //     type: '',// 企业类型
    //     grade: '',       // 风险等级
    //     status: '未申请', // 企业状态
    //     reason: '',     // 风险原因
    //     reasonUrl: '',   // 风险文件上传
    //     approveBy: '',   // 审核人
    //     approveTime: '', // 审核时间
    //     operationSelection: '', // 操作选择
    //     reasonsForRenewal: '',  // 取消原因
    //     approveRemarks: '',   // 审批批注
    //     operationSelectionApproval: "", // 操作选择 审核
    //     cancelBy: "",
    //     cancelTime: "",
    //     cancelReason: ""
    //   }
    // }

    // changeProfession (val) {
    //   this.statusCopy = []
    //   for (let i = 0; i < val.length; i++) {
    //     switch(val[i]){
    //       case "未审核":
    //         this.statusCopy.push(1)
    //         break
    //       case "已审核":
    //         this.statusCopy.push(2)
    //         break
    //       case "被驳回":
    //         this.statusCopy.push(3)
    //         break
    //       case "已撤销":
    //         this.statusCopy.push(4)
    //         break
    //     }
    //   }
    //   console.log(this.statusCopy)
    // },
//     downloadDocument(fileName){
// debugger;
//       let param = {
//         fileName:fileName
//       }
//       this.$ajax.manage.downloadDocument(param).then(res => {
//         console.log(param.fileName.split("/"));
//         const content = res.data
//         const blob = new Blob([content])
//         console.log(res.data)
//         const fileName = param.fileName.split("/")[param.fileName.split("/").length - 1];
//         debugger;
//         if ('download' in document.createElement('a')) { // 非IE下载
//           const elink = document.createElement('a')
//           elink.download = fileName
//           elink.style.display = 'none'
//           elink.href = URL.createObjectURL(blob)
//           console.log(elink.href);
//           document.body.appendChild(elink)
//           elink.click()
//           URL.revokeObjectURL(elink.href) // 释放URL 对象
//           document.body.removeChild(elink)
//         } else { // IE10+下载
//           navigator.msSaveBlob(blob, fileName)
//         }
//       })
//     },


    // getCompayNameAndCreditCode(){
    //   let param = {}
    //   this.$ajax.manage.getCompayNameAndCreditCode(param).then(res => {
    //     this.compayNameAndCreditCodes = res.data.compayNameAndCreditCodes
    //   })
    // },

    // handleSelect(item) {
    //   console.log(item);
    //   this.blackInfo.creditCode = item.id;
    //   console.log(this.blackInfo);
    // },
    // saveBlackInfo(formName){
    //
    //     this.$refs[formName].validate((valid) => {
    //       if(valid){
    //         this.blackInfo.publishBy = this.$Cookies.get('userCode');
    //         this.$ajax.manage.saveOrEdit(this.blackInfo).then(res => {
    //           this.closeDialog();
    //           this.closeRenewalCancellationDialog();
    //           this.closeEditRevokeDialog();
    //           this.$message.success(res.data.msg);
    //           this.searchData(1);
    //           console.log(res.data)
    //         })
    //       }else{
    //         return false;
    //       }
    //
    //   })
    // },

  }
}
</script>

<style lang="less" scoped>
.BlackListDetail {
  width: 95%;
  height: 100%;
  margin: auto;
  background-color: #f8f8f8;
  box-sizing: border-box;
  padding: 20px;
  overflow-block: auto;

  .searchBox{
    margin: 20px 0;
  }

  .low-row {
    color: #2327FF;
  }
  .medium-row {
    color: #88BC68;
  }
  .high-row {
    color: #FCA4CE;
  }

}

</style>