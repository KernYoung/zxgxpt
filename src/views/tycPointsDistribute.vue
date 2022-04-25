<!-- 点数分配 -->
<template>
  <div class="tycPointsDistribute ">
    <div style="margin-bottom: 15px;">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/homePage' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>点数填报</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="searchbox">
      <el-input class="fl-left manageTableInput" v-model="search.versionNo" placeholder="请输入版本号" clearable
                style="width: 200px;margin-right: 10px;">
      </el-input>
      <el-button type="primary" icon="el-icon-search" @click="getPAFCPointsData">查询</el-button>
      <el-button type="success" icon="el-icon-plus" v-on:click="editRecipientInfo">设置收件人</el-button>
    </div>

    <div class="table-box">
      <el-table ref="multipleTable" :data="tableDataTotal"  tooltip-effect="dark" style="width: 100%" stripe
                v-loading='loading'>
        <el-table-column prop="versionNo" label="版本号">
        </el-table-column>
        <el-table-column prop="supplierName" label="服务商">
        </el-table-column>
        <el-table-column prop="interfaceTotalPoints" label="接口总点数">
        </el-table-column>
        <el-table-column prop="attentionTotalPoints" label="关注总家数">
        </el-table-column>
        <el-table-column prop="interfaceDistributeTotalPoints" show-overflow-tooltip label="接口已分配总数">
        </el-table-column>
        <el-table-column prop="attentionDistributeTotalPoints" show-overflow-tooltip label="关注已分配总数">
        </el-table-column>
        <el-table-column prop="interfaceUsedTotalPoints" show-overflow-tooltip label="接口已使用总数">
        </el-table-column>
        <el-table-column prop="attentionUsedTotalPoints" show-overflow-tooltip label="关注已使用总数">
        </el-table-column>
        <el-table-column prop="startDate" show-overflow-tooltip label="开始时间">
        </el-table-column>
        <el-table-column prop="endDate" show-overflow-tooltip label="结束时间">
        </el-table-column>
        <el-table-column align="center" width="80px" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="editVersion(scope.row)" plain v-if="true">
              编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
-
      <el-table ref="multipleTable" :data="pafcPointsTableData"  tooltip-effect="dark" style="width: 100%;" stripe
                v-loading='loading'>
        <el-table-column prop="supplierName" show-overflow-tooltip label="服务商">
        </el-table-column>
        <el-table-column prop="companyName" show-overflow-tooltip label="公司">
        </el-table-column>
        <el-table-column prop="userName" show-overflow-tooltip label="收件人">
        </el-table-column>
        <el-table-column prop="email" show-overflow-tooltip label="收件人邮箱">
        </el-table-column>
        <el-table-column prop="interfaceDistributePoints" show-overflow-tooltip label="接口分配点数">
        </el-table-column>
        <el-table-column prop="attentionDistributePoints" show-overflow-tooltip label="关注分配家数">
        </el-table-column>
        <el-table-column prop="interfaceUsedPoints" show-overflow-tooltip label="接口使用点数">
        </el-table-column>
        <el-table-column prop="attentionUsedPoints" show-overflow-tooltip label="关注使用家数">
        </el-table-column>
        <el-table-column align="center" width="150px" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="editPoints(scope.row)" plain v-if="true">
              编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
<!--      <div style="text-align: center;margin-top: 10px;">-->
<!--        <el-pagination background layout="prev, pager, next,total,jumper" :total="page.total"-->
<!--                       :current-page.sync="page.currentPage" :pageSize="page.pageSize" @current-change="handleCurrentChange">-->
<!--        </el-pagination>-->
<!--      </div>-->
    </div>

    <el-dialog title="设置收件人" :visible.sync="editRecipientInfoDialog" width="1000px" @close="closeRecipientInfoDialog" :close-on-click-modal='false'>
      <el-table ref="multipleTable" :data="recipientTableData"  tooltip-effect="dark" style="width: 100%;" stripe
                v-loading='loading'>
        <el-table-column prop="companyName" show-overflow-tooltip label="公司">
        </el-table-column>
        <el-table-column prop="userNameStr" show-overflow-tooltip label="收件人">
        </el-table-column>
        <el-table-column prop="emailStr" show-overflow-tooltip label="收件人邮箱">
        </el-table-column>
        <el-table-column align="center" width="150px" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="openEditRecipientInfoDialog(scope.row)" plain v-if="true">
              编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>

    <el-dialog title="编辑人员信息" :visible.sync="editPAFCUserInfoDialog" width="800px" @close="closePAFCUserInfoDialog" :close-on-click-modal='false'>
      <el-button type="success" icon="el-icon-plus" v-on:click="openAddPAFCUserDialog">新增</el-button>
      <el-table ref="multipleTable" :data="pafcUserTableData"  tooltip-effect="dark" style="width: 100%;" stripe
                v-loading='loading'>
        <el-table-column prop="userName" show-overflow-tooltip label="收件人">
        </el-table-column>
        <el-table-column prop="email" show-overflow-tooltip label="收件人邮箱">
        </el-table-column>
        <el-table-column align="center" width="300px" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="openUpdatePAFCUserInfo(scope.row)" plain v-if="true">
              编辑</el-button>
            <el-button size="mini" type="primary" @click="deletePAFCUserInfo(scope.row)" plain v-if="true">
              删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>

    <el-dialog title="新增收件人" :visible.sync="addPAFCUserDialog" width="450px" @close="closeAddPAFCUserDialog"  :close-on-click-modal='false'>
      <el-form :model="PAFCUserInfo" label-width="100px" ref="userInfo">
        <el-form-item label="姓名：" prop="mobile">
          <el-input v-model="PAFCUserInfo.userName" style="width:300px"></el-input>
        </el-form-item>
        <el-form-item label="邮箱：">
          <el-input v-model="PAFCUserInfo.email" style="width:300px"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeAddPAFCUserDialog()">取 消</el-button>
        <el-button type="primary" @click="addPAFCUserInfo('PAFCUserInfo')">保 存</el-button>
      </div>
    </el-dialog>

    <el-dialog title="编辑收件人" :visible.sync="updatePAFCUserDialog" width="450px" @close="closeUpdatePAFCUserDialog"  :close-on-click-modal='false'>
      <el-form :model="PAFCUserInfo" label-width="100px" ref="userInfo">
        <el-form-item label="姓名：" prop="mobile">
          <el-input v-model="PAFCUserInfo.userName" style="width:300px"></el-input>
        </el-form-item>
        <el-form-item label="邮箱：">
          <el-input v-model="PAFCUserInfo.email" style="width:300px"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeUpdatePAFCUserDialog()">取 消</el-button>
        <el-button type="primary" @click="updatePAFCUserInfo('PAFCUserInfo')">保 存</el-button>
      </div>
    </el-dialog>

    <el-dialog title="版本编辑" :visible.sync="editVersionDialog" width="530px" @close="closeVersionDialog" :close-on-click-modal='false'>
      <el-form :model="PAFCVersionInfo" label-width="180px" ref="PAFCVersionInfo">
        <el-form-item label="版本号：" prop="versionNo">
          <el-input v-model="PAFCVersionInfo.versionNo" disabled style="width:300px"></el-input>
        </el-form-item>
        <el-form-item label="服务商：" prop="supplier">
          <el-input v-model="PAFCVersionInfo.supplierName" disabled style="width:300px"></el-input>
        </el-form-item>
        <el-form-item label="接口总点数：" prop="interfaceTotalPoints">
          <el-input v-model="PAFCVersionInfo.interfaceTotalPoints" style="width:300px"></el-input>
        </el-form-item>
        <el-form-item label="关注总点数：" prop="attentionTotalPoints">
          <el-input v-model="PAFCVersionInfo.attentionTotalPoints" style="width:300px"></el-input>
        </el-form-item>
        <el-form-item label="开始时间：" prop="startDate">
          <el-date-picker
              v-model="PAFCVersionInfo.startDate"
              type="date"
              placeholder="请选择开始时间"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd">
          </el-date-picker>
<!--        <el-input v-model="PAFCVersionInfo.startTime" style="width:300px"></el-input>-->
        </el-form-item>
        <el-form-item label="结束时间：" prop="endDate">
          <el-date-picker
              v-model="PAFCVersionInfo.endDate"
              type="date"
              placeholder="请选择结束时间"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd">
          </el-date-picker>
<!--          <el-input v-model="PAFCVersionInfo.endTime" style="width:300px"></el-input>-->
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeVersionDialog()">取 消</el-button>
        <el-button type="primary" @click="savePAFCVersionInfo('PAFCVersionInfo')">保 存</el-button>
      </div>
    </el-dialog>


    <el-dialog title="点数填报" :visible.sync="editPAFCPointsDialog" width="530px" @close="closePointsDialog" :close-on-click-modal='false'>
      <el-form :model="PAFCPointsInfo" label-width="180px" ref="PAFCPointsInfo">
        <el-form-item label="服务商：" prop="supplier">
          <el-input v-model="PAFCPointsInfo.supplierName" disabled style="width:300px"></el-input>
        </el-form-item>
        <el-form-item label="公司：" prop="companyName">
          <el-input v-model="PAFCPointsInfo.companyName" disabled style="width:300px"></el-input>
        </el-form-item>
        <el-form-item label="收件人：" prop="recipientName">
          <el-input v-model="PAFCPointsInfo.userName" disabled style="width:300px"></el-input>
        </el-form-item>
        <el-form-item label="收件人邮箱：" prop="recipientEmail">
          <el-input v-model="PAFCPointsInfo.email" disabled style="width:300px"></el-input>
        </el-form-item>
        <el-form-item label="接口分配次数：" prop="interfaceDistributePoints">
          <el-input v-model="PAFCPointsInfo.interfaceDistributePoints"  style="width:300px"></el-input>
        </el-form-item>
        <el-form-item label="关注分配家数：" prop="attentionDistributePoints">
          <el-input v-model="PAFCPointsInfo.attentionDistributePoints"  style="width:300px"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closePointsDialog()">取 消</el-button>
        <el-button type="primary" @click="savePAFCPointsInfo('PAFCPointsInfo')">保 存</el-button>
      </div>
    </el-dialog>




  </div>

</template>

<script>
export default {
  data () {
    return {
      search: {
        versionNo:''
      },
      page: {
        currentPage: 1,
        total: 0,
        pageSize: 10
      },
      newCompany: [],
      loading: false,
      tableDataTotal:[],
      pafcPointsTableData:[],
      recipientTableData:[],
      pafcUserTableData:[],
      editRecipientInfoDialog: false,//收件人编辑
      editPAFCUserInfoDialog: false,//人员编辑
      editVersionDialog: false,//周期编辑对话框
      editPAFCPointsDialog: false,//点数填报对话框
      addPAFCUserDialog: false,//新增人员
      updatePAFCUserDialog: false,//编辑人员
      PAFCUserInfo: {
        id:'',
        userName: '',
        userId: '',
        companyCode: '',
        companyName: '',
        email:''
      },
      PAFCVersionInfo: {
        versionNo: '',
        supplierName: '',
        interfaceTotalPoints: '',
        attentionTotalPoints: '',
        interfaceUsedTotalPoints: '',
        attentionUsedTotalPoints: '',
        startDate: '',
        endDate: '',
      },
      PAFCPointsInfo: {
        id:'',
        supplierName: '',
        companyName: '',
        companyCode: '',
        userName: '',
        email: '',
        interfaceDistributePoints: '',
        attentionDistributePoints:'',
        attentionUsedPoints: '',
        interfaceUsedPoints: '',
      },
    }
  },


  created () {
    this.getNewCompany();
    this.getPAFCVersionData();
    this.getPAFCPointsData(1);
  },
  mounted () {
  },
  methods: {
    clearPAFCUserInfo() {
      this.PAFCUserInfo = {
        id:'',
        userName: '',
        userId: '',
        companyCode: '',
        companyName: '',
        email:''
      };
    },
    openAddPAFCUserDialog() {
      // this.clearPAFCUserInfo();
      this.addPAFCUserDialog = true;
    },
    openUpdatePAFCUserInfo(row) {
      this.PAFCUserInfo = Object.assign({},row);
      // this.getPAFCUserInfo();
      this.updatePAFCUserDialog = true;
    },
    addPAFCUserInfo() {
      this.$ajax.manage.addPAFCUser(this.PAFCUserInfo).then(res => {
        if (res.data.code == 0) {
          this.$message.success(res.data.msg);
          this.getRecipientInfo();
          this.getPAFCUserInfo();
          this.addPAFCUserDialog = false;
        }
      })
    },
    updatePAFCUserInfo() {
      this.$ajax.manage.updatePAFCUser(this.PAFCUserInfo).then(res => {
        if (res.data.code == 0) {
          this.$message.success(res.data.msg);
          this.getRecipientInfo();
          this.getPAFCUserInfo();
          this.getPAFCPointsData(1);
          this.updatePAFCUserDialog = false;
        }
      })
    },

    deletePAFCUserInfo(row) {
      this.PAFCUserInfo = Object.assign({},row);
      this.$ajax.manage.deletePAFCUser(this.PAFCUserInfo).then(res => {
        if (res.data.code == 0) {
          this.$message.success(res.data.msg);
          this.getRecipientInfo();
          this.getPAFCUserInfo();
        }
      })
    },

    openEditRecipientInfoDialog(row) {
      this.PAFCUserInfo = Object.assign({},row);
      this.getPAFCUserInfo();
      this.editPAFCUserInfoDialog = true;
    },


    // updateCompanyLV2() {
    //   this.$ajax.manage.getPAFCPointsList(param).then(res => {
    //     if (res.data.code == 0) {
    //       this.loading = false;
    //       this.tableData = res.data.pafcPointsList
    //       this.page.total = res.data.totalRecords
    //     }
    //   })
    // },

    getPAFCPointsData(page) {
      let param = {
        pageIndex: page ? page : 1,
        versionNo: this.search.versionNo
      }
      this.loading = true;
      this.$ajax.manage.getPAFCPointsList(param).then(res => {
        if (res.data.code == 0) {
          this.loading = false;
          this.pafcPointsTableData = res.data.pafcPointsList
          this.page.total = res.data.totalRecords
        }
      })
    },
    getPAFCVersionData() {
      this.loading = true;
      this.$ajax.manage.getPAFCVersionList().then(res => {
        if (res.data.code == 0) {
          this.loading = false;
          this.tableDataTotal = res.data.pafcVersionList
          // console.log("---------pafcVersionList--------")
          // console.log(res.data.pafcVersionList)
        }
      })
    },
    getRecipientInfo() {
      this.loading = true;
      this.$ajax.manage.getRecipientInfoList().then(res => {
        if (res.data.code == 0) {
          this.loading = false;
          this.recipientTableData = res.data.pafcCompanyList;
        }
      })
    },

    getPAFCUserInfo() {
      let param = {
        userCompanyCode: this.PAFCUserInfo.companyCode
      }
      this.loading = true;
      this.$ajax.manage.getPAFCUserInfoList(param).then(res => {
        if (res.data.code == 0) {
          this.loading = false;
          this.pafcUserTableData = res.data.pafcUserList
        }
      })
    },

    searchData() {
      this.page.currentPage = 1;
      this.getData(1)
      this.getData(1)
    },
    editRecipientInfo() {
      //同步二级公司到填报公司表
      this.PAFCCompanySync();
      this.getRecipientInfo();
      this.editRecipientInfoDialog = true;
    },

    PAFCCompanySync() {
      this.$ajax.manage.syncODSCompany2PAFCCompany();
      this.getRecipientInfo();
    },

    editVersion(row) {
      this.PAFCVersionInfo = Object.assign({},row);
      this.editVersionDialog = true;
    },
    editPoints(row) {
      this.PAFCPointsInfo = Object.assign({},row);
      this.editPAFCPointsDialog = true;
    },

    closeRecipientInfoDialog() {
      this.editRecipientInfoDialog = false;
    },
    closePAFCUserInfoDialog() {
      this.editPAFCUserInfoDialog = false;
    },

    closeVersionDialog() {
      this.editVersionDialog = false;
    },
    closePointsDialog() {
      this.editPAFCPointsDialog = false;
    },
    closeAddPAFCUserDialog() {
      this.addPAFCUserDialog = false;
    },
    closeUpdatePAFCUserDialog() {
      this.updatePAFCUserDialog = false;
    },
    savePAFCUserInfo(formName) {
      this.$refs[formName].validate((valid) => {
        if(valid){
          this.$ajax.manage.savePAFCUser(this.PAFCUserInfo).then(res => {
            this.closeRecipientInfoDialog();
            // this.closeRenewalCancellationDialog();
            this.$message.success(res.data.msg);
            this.getPAFCPointsData(1);// 更新数据
            // this.clearPAFCUserInfo();
          })
        }else{
          // this.clearPAFCUserInfo();
          return false;
        }
      })
    },
    savePAFCVersionInfo(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$ajax.manage.savePAFCVersion(this.PAFCVersionInfo).then(res => {
            this.getPAFCVersionData(this.page.currentPage,this.node)
            if (res.data.code == 0) {
              this.$message.success(res.data.msg);
              this.editVersionDialog = false;
            }
          })
          this.getPAFCVersionData(1)
        } else {
          return false;
        }
      });
    },
    savePAFCPointsInfo(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$ajax.manage.savePAFCPoints(this.PAFCPointsInfo).then(res => {
            this.getPAFCPointsData(this.page.currentPage,this.node)
            if (res.data.code == 0) {
              this.$message.success(res.data.msg);
              this.getPAFCVersionData();
              this.editPAFCPointsDialog = false;
            }
          })
          this.getPAFCPointsData(1)
        } else {
          return false;
        }
      });
    },

    selectChange(selectValue) {
      this.PAFCUserInfo.companyCode = selectValue.id;
      this.$forceUpdate();
    },
    querySearch(queryString, cb) {
      let results = queryString ? this.newCompany.filter(this.createFilter(queryString)) : this.newCompany;
      let companys = [];
      for(let item of results){
        companys.push({
          value:item.name,
          id:item.code
        });
      }
      let companys2 = companys.sort(this.compare("value"));
      cb(companys2);
    },
    createFilter(queryString){
      return (company)=>{
        return (company.name.indexOf(queryString)>=0);
      }
    },
    compare(p){ //这是比较函数
      return function(m,n){
        let a = m[p];
        let b = n[p];
        return a - b; //升序
      }
    },
    getNewCompany() {
      let param = {
        operator: this.$Cookies.get('userCode')
      }
      this.$ajax.manage.getUserCompany(param).then(res => {
        if (res.data.code == 0) {
          this.newCompany = res.data.userCompanyList;
        }
      })
    },
  }
}
</script>
<style lang="less" scoped>
.tycPointsDistribute {
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