<!-- 黑名单审批 -->
 <template>
  <div class="blacklistApproval">
    <div style="margin-bottom: 15px;">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/homePage' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>黑名单审批</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <el-row class="searchBox">
      <el-select v-model="status" placeholder="请选择审核状态" clearable style="width: 200px;margin-right: 10px;" multiple @change="changeProfession">
        <el-option v-for="item in statusList" :key="item" :label="item" :value="item">
        </el-option>
      </el-select>
      <el-button style="margin-left:10px;" type="primary" icon="el-icon-search" @click="searchData(1)">查询</el-button>
      <el-button style="margin-left:10px;" type="success" @click="handleExport">导出</el-button>
    </el-row>

    <div class="table-box">
      <el-table
          :data="tableData"
          size="mini"
          >
        <el-table-column
            prop="entName"
            label="企业名称"
            >
        </el-table-column>
        <el-table-column
            prop="type"
            label="企业类型"
            >
        </el-table-column>
        <el-table-column
            prop="startDate"
            label="公示开始时间"
            >
        </el-table-column>
        <el-table-column
            prop="reason"
            label="风险原因">
        </el-table-column>
        <el-table-column
            prop="grade"
            label="风险等级"
        >
        </el-table-column>
        <el-table-column
            prop="publishBy"
            label="申请人">
        </el-table-column>
        <el-table-column
            prop="publishDept"
            label="申请单位">
        </el-table-column>
        <el-table-column
            prop="publishTime"
            label="申请时间">
        </el-table-column>
        <el-table-column
            prop="status"
            label="审核状态">
        </el-table-column>
        <el-table-column
            label="文件下载">
          <template slot-scope="scope">
            <span v-if="scope.row.reasonUrl">
                 <el-button type="primary" plain size="small" @click="downloadDocument(scope.row.reasonUrl)">文件下载</el-button>
            </span>
            <span v-else>
                  无上传文件
            </span>
          </template>
        </el-table-column>
        <el-table-column
            prop="approveBy"
            label="审核人">
        </el-table-column>
        <el-table-column
            prop="approveTime"
            label="审核时间">
        </el-table-column>
        <el-table-column
            prop="approveRemarks"
            label="审核批注">
        </el-table-column>
        <el-table-column
            label="点击审核">
          <template slot-scope="scope">
             <span v-if="scope.row.status == '未审核'">
                <el-button type="primary" size="small" plain @click="clickRenewalCancellation(scope.row)">审核</el-button>
            </span>
            <span v-else>
                  已审核/驳回
            </span>
          </template>
        </el-table-column>
        <el-table-column
            label="撤销申请">
          <template slot-scope="scope">
             <span v-if="scope.row.status == '已审核'">
                 <el-button type="primary" size="small" plain @click="clickeditRevokeDialog(scope.row)">撤销</el-button>
            </span>
            <span v-else>
                  撤销
            </span>

          </template>

        </el-table-column>
      </el-table>
    </div>

    <div style="text-align: center;margin-top: 10px;">
      <el-pagination background layout="prev, pager, next,total,jumper" :total="page.total"
                     :current-page.sync="page.currentPage" :pageSize="page.pageSize" @current-change="handleCurrentChange">
      </el-pagination>
    </div>

    <el-dialog :title="editRenewalCancellationType" :visible.sync="editRenewalCancellationDialog"  width="700px" @close="closeRenewalCancellationDialog"  :close-on-click-modal='false'>
      <el-form :model="blackInfo" :inline="true" label-width="130px" :rules="auditFormVerification"  ref="blackInfo">
        <el-form-item label="审核人:"  prop="approveBy">
          <el-input v-model="blackInfo.approveBy" disabled></el-input>
        </el-form-item>
        <el-form-item label="审核时间:" prop="approveTime">
          <el-input v-model="blackInfo.approveTime" disabled></el-input>
        </el-form-item>
        <el-form-item label="企业名称:" prop="entName" >
          <!--          <el-input v-model="blackInfo.entName" ></el-input>-->
          <el-autocomplete
              class="inline-input"
              v-model="blackInfo.entName"
              :fetch-suggestions="querySearch"
              placeholder="请输入企业名称"
              disabled
          ></el-autocomplete>
        </el-form-item>
        <el-form-item label="操作选择:" prop="operationSelectionApproval">
          <el-select v-model="blackInfo.operationSelectionApproval" placeholder="请选择" clearable style="width: 170px;margin-right: 10px;">
            <el-option v-for="item in operationSelectionApprovals" :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="审核批注:" prop="approveRemarks">
          <el-input
              type="textarea"
              :rows="6"
              placeholder="请输入内容"
              v-model="blackInfo.approveRemarks"
              style="width: 500px"
              resize="none">
          </el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="closeRenewalCancellationDialog()">取 消</el-button>
        <el-button type="primary" @click="saveBlackInfo('blackInfo')">保 存</el-button>
      </div>
    </el-dialog>

    <el-dialog :title="editRevokeType" :visible.sync="editRevokeDialog" width="700px" @close="closeEditRevokeDialog"  :close-on-click-modal='false'>
      <el-form :model="blackInfo" :inline="true" label-width="130px" :rules="revocationFormVerification" ref="blackInfo">
        <el-form-item label="撤销人:"  prop="cancelBy">
          <el-input v-model="blackInfo.cancelBy" disabled></el-input>
        </el-form-item>
        <el-form-item label="撤销时间:" prop="cancelTime">
          <el-input v-model="blackInfo.cancelTime" disabled></el-input>
        </el-form-item>
        <el-form-item label="撤销原因:" prop="cancelReason">
          <el-input
              type="textarea"
              :rows="6"
              placeholder="请输入内容"
              v-model="blackInfo.cancelReason"
              style="width: 500px"
              resize="none">
          </el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="closeEditRevokeDialog()">取 消</el-button>
        <el-button type="primary" @click="saveBlackInfo('blackInfo')">保 存</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { export_json_to_excel } from "../assets/Export2Excel";
export default {
  data(){
    return{
      headers:'',
      status:[],
      statusCopy:[],
      fileList:[],
      newFileName:'',
      operationSelectionApprovals:['审核','驳回'],
      typeOfEnterprises:['重点合作企业','一般合作企业','非合作企业'],
      riskLevels:['高','中','低'],
      compayNameAndCreditCodes:[{"companyName":'',"creditCode":''}],
      editType:'',
      editRenewalCancellationType:'审核表',
      editRevokeType:"撤销公示", // 撤销标题
      editRevokeDialog:false,
      editRenewalCancellationDialog:false, //审核表 弹出框
      isNew:false,
      formData:null,
      tableData:[],
      excelData:[],
      statusList:['未审核','已审核','被驳回'],
      blackInfo:{
        pid:'',//pid
        publishDept:'',   // 申请单位
        publishTime:'', // 申请时间
        entName:'',     // 企业名称
        creditCode:'',      // 社会统一信用代码
        type:'',// 企业类型
        grade:'',       // 风险等级
        status:'未申请', // 企业状态
        reason:'',     // 风险原因
        reasonUrl:'',   // 风险文件上传
        approveBy:'',   // 审核人
        approveTime:'', // 审核时间
        operationSelection:'', // 操作选择
        reasonsForRenewal:'',  // 取消原因
        approveRemarks:'',   // 审批批注
        operationSelectionApproval:"", // 操作选择 审核
        cancelBy:"",
        cancelTime:"",
        cancelReason:""
      },
      page: {
        currentPage: 1,
        total: 0,
        pageSize: 10
      },
      auditFormVerification:{
        operationSelectionApproval:[
          { required: true, message: '请选择操作选择！', trigger: 'change' }
        ]
      },
      revocationFormVerification :{
      cancelReason:[
          { required: true, message: '请填写撤销原因', trigger: 'change' }
          ]
    }
    }
  },
  created() {
    this.searchData(1);
    this.getCompayNameAndCreditCode();
    let token = this.$Cookies.get(this.$getCookieKey());
    this.headers = {
      token:token,
    }
  },
  methods:{
    getDate(){
      let date = new Date();
      let year = date.getFullYear();
      let mon = (date.getMonth() + 1);
      let day = date.getDate();
      let hours = date.getHours();
      let minutes = date.getMinutes();
      let seconds = date.getSeconds();
      return year +'-'+ this.appendZero(mon) +'-'+ this.appendZero(day) +' '+ this.appendZero(hours) + ':' + this.appendZero(minutes) + ':' + this.appendZero(seconds);
    },
    appendZero(obj){
      return  obj < 10  ? "0" + obj : obj
    },
    closeDialog() {
      this.editBlackDialog = false
	   /* this.$refs['blackInfo'].clearValidate(); */
    },
    closeRenewalCancellationDialog(){
      this.editRenewalCancellationDialog = false
    },
    closeEditRevokeDialog(){
      this.editRevokeDialog = false;
    },
    clickRenewalCancellation(row){
      this.clearBlackInfo();
      this.editRenewalCancellationDialog = true;
      this.isNew = false;
      this.blackInfo = Object.assign({},row);
      this.blackInfo.approveBy = this.$Cookies.get('userCode');
      this.blackInfo.approveTime = this.getDate();
      this.blackInfo.isNew = this.isNew;
      console.log(this.blackInfo)
    },
    clickeditRevokeDialog(row){
      this.clearBlackInfo();
      this.editRevokeDialog = true;
      this.isNew = false;
      this.blackInfo = Object.assign({},row);
      this.blackInfo.cancelBy = this.$Cookies.get('userCode');
      this.blackInfo.cancelTime = this.getDate();
      this.blackInfo.isNew = this.isNew;
      console.log(this.blackInfo)
    },
    clearBlackInfo() {
      this.blackInfo = {
        pid:'',//pid
        publishDept:'',   // 申请单位
        publishTime:'', // 申请时间
        entName:'',     // 企业名称
        creditCode:'',      // 社会统一信用代码
        type:'',// 企业类型
        grade:'',       // 风险等级
        status:'未申请', // 企业状态
        reason:'',     // 风险原因
        reasonUrl:'',   // 风险文件上传
        approveBy:'',   // 审核人
        approveTime:'', // 审核时间
        operationSelection:'', // 操作选择
        reasonsForRenewal:'',  // 取消原因
        approveRemarks:'',   // 审批批注
        operationSelectionApproval:"", // 操作选择 审核
        cancelBy:"",
        cancelTime:"",
        cancelReason:""
      }
    },
    handleCurrentChange(val) {
      //页码切换
      this.searchData(val);
    },
    changeProfession (val) {
      this.statusCopy = []
      for (let i = 0; i < val.length; i++) {
        switch(val[i]){
          case "未审核":
            this.statusCopy.push(1)
            break
          case "已审核":
            this.statusCopy.push(2)
            break
          case "被驳回":
            this.statusCopy.push(3)
            break
          case "已撤销":
            this.statusCopy.push(4)
            break
        }
      }
      console.log(this.statusCopy)
    },
    downloadDocument(fileName){
      let param = {
        fileName:fileName
      }
      this.$ajax.manage.downloadDocument(param).then(res => {
        console.log(param.fileName.split("/"));
        const content = res.data
        const blob = new Blob([content])
        console.log(res.data)
        const fileName = param.fileName.split("/")[param.fileName.split("/").length - 1];
        if ('download' in document.createElement('a')) { // 非IE下载
          const elink = document.createElement('a')
          elink.download = fileName
          elink.style.display = 'none'
          elink.href = URL.createObjectURL(blob)
          console.log(elink.href);
          document.body.appendChild(elink)
          elink.click()
          URL.revokeObjectURL(elink.href) // 释放URL 对象
          document.body.removeChild(elink)
        } else { // IE10+下载
          navigator.msSaveBlob(blob, fileName)
        }
      })
    },
    handleExport() {
      var tHeader = ["企业名称","企业类型","公示开始时间","风险原因","风险等级","申请人","申请单位","申请时间","审核状态",
        "文件下载","审核人","审核时间","审核批注"];
      var filterVal = ["entName","type","startDate","reason","grade","publishBy","publishDept","publishTime","status",
        "reasonUrl","approveBy","approveTime","approveRemarks"];
      var filename = "黑名单审批列表";
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
    searchData(page){
	  this.page.currentPage = page
      let param = {
        pageIndex: page ? page : 1,
        pageSize: this.page.pageSize,
        status:this.statusCopy,
        publishBy:this.$Cookies.get('userCode')
      }

      this.$ajax.manage.getBlacklistApprovalList(param).then(res => {
        console.log(param)
        console.log(res.data)
        if(res.data.code === 0) {
          this.tableData = res.data.blackListResultList;
          this.excelData = res.data.excel;
          for (let i = 0; i < this.tableData.length; i++) {
            switch(this.tableData[i].status){
              case "1":
                this.tableData[i].status = '未审核';
                break
              case "2":
                this.tableData[i].status = '已审核';
                break
              case "3":
                this.tableData[i].status = '被驳回';
                break
              case "4":
                this.tableData[i].status = '已撤销';
                break
              case "5":
                this.tableData[i].status = '已过期';
                break
              case "6":
                this.tableData[i].status = '取消过期';
                break
            }
          }
          this.page.total = res.data.totalRecords;
          this.tableData.splice(1, 0);
          this.$message.success(res.data.msg);
        }
      })
    },
    getCompayNameAndCreditCode(){
      let param = {}
      this.$ajax.manage.getCompayNameAndCreditCode(param).then(res => {
        this.compayNameAndCreditCodes = res.data.compayNameAndCreditCodes
      })
    },
    querySearch(queryString, cb) {
      var results = queryString ? this.compayNameAndCreditCodes.filter(this.createFilter(queryString)) : this.compayNameAndCreditCodes;
      let newCompayNameAndCreditCodes = [];
      for(let item of results){
        newCompayNameAndCreditCodes.push({
          value:item.companyName,
          id:item.creditCode
        });
      }
      // 调用 callback 返回建议列表的数据
      cb(newCompayNameAndCreditCodes);
    },
    createFilter(queryString) {
      return (CompayNameCode) => {
        return (CompayNameCode.companyName.indexOf(queryString) >= 0);
      };
    },
    handleSelect(item) {
      console.log(item);
      this.blackInfo.creditCode = item.id;
      console.log(this.blackInfo);
    },
    saveBlackInfo(formName){
		
        this.$refs[formName].validate((valid) => {
          if(valid){
            this.blackInfo.publishBy = this.$Cookies.get('userCode');
            this.$ajax.manage.saveOrEdit(this.blackInfo).then(res => {
              this.closeDialog();
              this.closeRenewalCancellationDialog();
              this.closeEditRevokeDialog();
              this.$message.success(res.data.msg);
              this.searchData(1);
              console.log(res.data)
            })
          }else{
            return false;
          }

      })
    },

  }
}
</script>

<style lang="less" scoped>
.blacklistApproval {
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