<!-- token管理 -->
<template>
  <div class="TokenManage ">
    <div style="margin-bottom: 15px;">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/homePage' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>下发接口Token管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="searchbox">
      <el-select v-model="search.companyName" collapse-tags placeholder="请选择公司名称" clearable style="width: 310px;margin-right:5px;">
<!--        <el-option v-for="item in companyNameList" :key="item.companyName" :label="item.companyName" :value="item.companyName">-->
        <el-option v-for="item in companyNameList" :key="item" :label="item" :value="item">
        </el-option>
      </el-select>
      <el-input class="fl-left manageTableInput" v-model="search.uri" placeholder="请输入URI" clearable
        style="width: 200px;margin-right: 10px;">
      </el-input>
      <el-input class="fl-left manageTableInput" v-model="search.interfaceName" placeholder="请输入接口名称" clearable
                style="width: 200px;margin-right: 10px;">
      </el-input>
      <el-select v-model="search.status" placeholder="请选择状态" clearable style="width: 200px;margin-right: 10px;">
        <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <el-button type="primary" icon="el-icon-search" @click="searchData">查询</el-button>
      <el-button type="success" icon="el-icon-plus" v-on:click="newToken">新增</el-button>
      <el-button type="success" icon="el-icon-plus" v-on:click="openTokenRelationDialog">新增成员公司</el-button>
    </div>
    <div class="table-box">
      <el-table ref="multipleTable" :data="tableData"  tooltip-effect="dark" style="width: 100%;" stripe v-loading='loading'>
        <el-table-column prop="companyName" show-overflow-tooltip min-width="25%" label="公司名称">
        </el-table-column>
        <el-table-column prop="uri" show-overflow-tooltip min-width="20%" label="URI">
        </el-table-column>
        <el-table-column prop="interfaceName" show-overflow-tooltip min-width="16%" label="接口名称">
        </el-table-column>
        <el-table-column prop="tokenId" min-width="8%" label="tokenId">
        </el-table-column>
<!--        <el-table-column prop="updateDate" show-overflow-tooltip min-width="15%" label="更新时间">-->
<!--        </el-table-column>-->
        <el-table-column prop="remark" show-overflow-tooltip min-width="17%" label="备注">
        </el-table-column>
        <el-table-column prop="status" label="状态" min-width="9%" sortable>
          <template slot-scope="scope">
            <el-tag type="primary" v-if="scope.row.status==1" >已启用</el-tag>
            <el-tag type="info" v-else-if="scope.row.status==0" >已停用</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" min-width="18%" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="editToken(scope.row)" plain v-if="scope.row.status==1">
              编辑</el-button>
            <el-button size="mini" type="primary" @click="editToken(scope.row)" disabled=“submissionFlag” plain v-if="scope.row.status==0">
              编辑</el-button>
            <el-button size="mini" type="danger" @click="updateStatus(scope.row,'0')" plain v-if="scope.row.status==1">
              点击停用</el-button>
            <el-button size="mini" type="primary" @click="updateStatus(scope.row,'1')" plain v-if="scope.row.status==0">
              点击启用</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div style="text-align: center;margin-top: 10px;">
        <el-pagination background layout="prev, pager, next,total,jumper" :total="page.total"
          :current-page.sync="page.currentPage" :pageSize="page.pageSize" @current-change="handleCurrentChange">
        </el-pagination>
      </div>
    </div>

    <el-dialog title="成员公司Token管理" :visible.sync="tokenRelationDialog" width="800px" @close="closeTokenRelationDialog" :close-on-click-modal='false'>
      <el-button type="success" icon="el-icon-plus" v-on:click="newTokenRelation">新增</el-button>
      <el-table ref="multipleTable" :data="tokenRelationTableData"  tooltip-effect="dark" style="width: 100%;" stripe v-loading='loading'>
        <el-table-column min-width="55%" prop="companyName" show-overflow-tooltip label="公司名称">
        </el-table-column>
        <el-table-column min-width="15%" prop="tokenIdPrefix" show-overflow-tooltip label="TokenId">
        </el-table-column>
        <el-table-column min-width="20%" prop="companyNameShort" show-overflow-tooltip label="公司简称">
        </el-table-column>
        <el-table-column min-width="10%" align="center" width="150px" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="editTokenRelation(scope.row)" plain v-if="true">
              编辑</el-button>
            <el-button size="mini" type="danger" @click="deleteTokenRelation(scope.row)" plain v-if="true">
              删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>

    <el-dialog :title="tokenRelationEditType" :visible.sync="editTokenRelationDialog" width="450px" @close="closeEditTokenRelationDialog"  :close-on-click-modal='false'>
      <el-form :model="tokenRelationInfo" label-width="100px" :rules="rulesTokenIdPrefix" ref="tokenRelationInfo">
        <el-form-item label="公司全称：" prop="companyName">
          <el-input v-show="!isNewRelation" v-model="tokenRelationInfo.companyName" disabled style="width:300px"></el-input>
          <el-input v-show="isNewRelation" v-model="tokenRelationInfo.companyName"  style="width:300px"></el-input>
        </el-form-item>
        <el-form-item label="公司简称：" prop="companyNameShort">
          <el-input v-model="tokenRelationInfo.companyNameShort" style="width:300px"></el-input>
        </el-form-item>
        <el-form-item label="tokenId：" prop="tokenIdPrefix">
          <el-input  v-show="!isNewRelation" v-model="tokenRelationInfo.tokenIdPrefix" disabled style="width:300px"></el-input>
          <el-input  v-show="isNewRelation" v-model="tokenRelationInfo.tokenIdPrefix" style="width:300px"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeEditTokenRelationDialog()">取 消</el-button>
        <el-button type="primary" @click="saveTokenRelationInfo('tokenRelationInfo')">保 存</el-button>
      </div>
    </el-dialog>

    <el-dialog :title="tokenEditType" :visible.sync="editTokenDialog" width="450px" @close="closeEditTokenDialog"  :close-on-click-modal='false'>
      <el-form :model="tokenInfo" label-width="100px" :rules="rulesToken" ref="tokenInfo">
        <el-form-item label="公司名称：" prop="companyName">
          <el-select v-show="isNew" v-model="tokenInfo.companyName" collapse-tags placeholder="请选择公司名称" clearable style="width: 310px;margin-right:5px;">
            <el-option v-for="item in companyNameList" :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
          <el-input v-show="!isNew" v-model="tokenInfo.companyName" disabled style="width:300px"></el-input>
        </el-form-item>
        <el-form-item label="tokenId：" prop="tokenId">
          <el-input v-model="tokenInfo.tokenId" style="width:300px"></el-input>
        </el-form-item>
        <el-form-item label="接口名称：" prop="interfaceName">
          <el-input v-model="tokenInfo.interfaceName" style="width:300px"></el-input>
        </el-form-item>
        <el-form-item label="URI：" prop="uri">
          <el-input v-model="tokenInfo.uri" style="width:300px"></el-input>
        </el-form-item>
        <el-form-item label="备注：">
          <el-input v-model="tokenInfo.remark" style="width:300px"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeEditTokenDialog()">取 消</el-button>
        <el-button type="primary" @click="saveTokenInfo('tokenInfo')">保 存</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
export default {
  data () {
    const validateTokenIdPrefixForm = (rule, value, callback) => {
      let modes = 0;
      if (value.length != 3) callback(new Error("请输入三位数字！"));
      if ((/[a-z]/.test(value)) || (/[A-Z]/.test(value))) modes++; //字母
      if (/\W/.test(value)) modes++; //特殊字符

      if (value && modes > 0) {
        callback(new Error("必须输入数字！"));
      } else {
        callback();
      }
    };

    const tokenValidateForm = (rule, value, callback) => {
      let modes = 0;
      if (value.length <= 3) callback(new Error("请输入长度大于三的数字！"));
      if ((/[a-z]/.test(value)) || (/[A-Z]/.test(value))) modes++; //字母
      if (/\W/.test(value)) modes++; //特殊字符

      if (value && modes > 0) {
        callback(new Error("必须输入数字！"));
      } else {
        callback();
      }
    };

    const tokenValidateData = (rule, value, callback) => {
      if (value === "" || typeof value == 'undefined') {
        callback();
      } else if (value) {
        let param = {
          tokenId: value,
          companyName: this.tokenInfo.companyName,
          uri: this.tokenInfo.uri,
          openId: this.tokenInfo.openId
        }
        this.$ajax.manage.tokenValidate(param).then(res => {
          if (res.status == 200) {
            if (res.data.code == 1) {
              callback(new Error("已有相同token！"));
            }else if(res.data.code == 2){
              callback(new Error("token前三码和当前公司不匹配！"));
            } else {
              callback();
            }
          } else {
            callback();
          }
        });
      } else {
        callback();
      }
    };

    const tokenPrefixValidateData = (rule, value, callback) => {
      if (value === "" || typeof value == 'undefined') {
        callback();
      } else if (value) {
        let param = {
          tokenIdPrefix: value,
          id: this.tokenRelationInfo.id
        }
        this.$ajax.manage.tokenPrefixValidate(param).then(res => {
          if (res.status == 200) {
            if (res.data.code == 1) {
              callback(new Error("已有相同token！"));
            }
            else {
              callback();
            }
          } else {
            callback();
          }
        });
      } else {
        callback();
      }
    };


    return {
      search: {
        companyName: '',
        uri: '',
        interfaceName: '',
        status: '',
      },
      statusOptions: [
        {
          label: '已启用',
          value: '1'
        },
        {
          label: '已停用',
          value: '0'
        }
      ],
      page: {
        currentPage: 1,
        total: 0,
        pageSize: 10
      },
      companyNameList:[],//二级公司
      tableData: [],
      tokenRelationTableData: [],
      loading: false,
      editUserDialog: false,//用户编辑对话框
      editTokenDialog: false,
      tokenRelationDialog: false,//成员公司token维护对话框
      addTokenRelationDialog: false,//新增成员公司token维护对话框
      editTokenRelationDialog: false,//编辑成员公司token维护对话框
      isNew: false, //是否新增
      isNewRelation: false, //是否新增
      editType: '',
      tokenEditType:'',
      tokenRelationEditType:'',
      tokenRelationInfo: {
        tokenIdPrefix:'',
        companyName: '',
        companyNameShort: '',
        id:'',
        type:''
      },

      tokenInfo: {
        openId: '',
        companyName:'',
        uri: '',
        interfaceName: '',
        tokenId: '',
        remark:'',
        status: '',
        type:''
      },
      newCompany: [],
      newCompanyFlag: 0,
      node:{id:this.$Cookies.get('companyCode'),isLevel:true},
      rulesToken: {
        companyName: [
          {required: true, message: '请输入公司名称！', trigger: 'change' },
        ],
        tokenId: [
          {required: true, message: '请输入token！', trigger: 'change' },
          {validator: tokenValidateForm, trigger: 'change' },
          {validator: tokenValidateData, trigger: 'change' },
        ],
        interfaceName: [
          {required: true, message: '请输入接口名称！', trigger: 'change' },
        ],
        uri: [
          {required: true, message: '请输入uri！', trigger: 'change' },
        ],
      },
      rulesTokenIdPrefix: {
        tokenIdPrefix: [
          { required: true, message: '请输入token！', trigger: 'change' },
          {validator: validateTokenIdPrefixForm, trigger: 'change' },
          {validator: tokenPrefixValidateData, trigger: 'change' },
        ],
        companyName: [
          {required: true, message: '请输入公司名称！', trigger: 'change' },
        ],
        companyNameShort: [
          {required: true, message: '请输入公司简称！', trigger: 'change' },
        ],
      },
	  permissionList:[],
      permissionAll:[
      ],
      roleAll:[
      ],
      treeData:[]
    }
  },


  created () {
    this.getData(1);
    this.getCompanyNameList();
  },
  mounted () {
    this.getData(1);
  },
  methods: {
    clearTokenRelationInfo() {
      this.tokenRelationInfo= {
        tokenIdPrefix:'',
        companyName: '',
        companyNameShort: '',
        id:''
      };
    },

    clearTokenInfo() {
      this.tokenInfo= {
        openId: '',
        companyName: '',
        uri: '',
        interfaceName: '',
        tokenId:'',
        remark:'',
        status: '',
        type:''
      };
    },

    newToken() {
      this.tokenEditType = '新增';
      this.isNew = true;
      this.clearTokenInfo();
      this.editTokenDialog = true;
    },

    editToken(row) {
      this.clearTokenInfo();
      this.isNew = false;
      this.tokenEditType = '编辑';
      this.tokenInfo = Object.assign({},row);
      this.editTokenDialog = true;
    },

    closeEditTokenDialog() {
      this.editTokenDialog = false;
    },

    openTokenRelationDialog() {
      this.getTokenRelation();
      this.tokenRelationDialog = true;
    },

    getTokenRelation() {
      this.$ajax.manage.getTokenRelation().then(res => {
        if(res.data.code == '0'){
          this.tokenRelationTableData = res.data.openAPIRelationList;
        }
      })
    },

    closeTokenRelationDialog() {
      this.tokenRelationDialog = false;
    },

    newTokenRelation() {
      this.isNewRelation = true;
      this.tokenRelationEditType = '新增';
      this.clearTokenRelationInfo();
      this.editTokenRelationDialog = true;
    },

    editTokenRelation(row) {
      this.isNewRelation = false;
      this.clearTokenRelationInfo();
      this.tokenRelationEditType = '编辑';
      this.tokenRelationInfo = Object.assign({},row);
      this.editTokenRelationDialog = true;
    },

    deleteTokenRelation(row) {


      this.$msgbox.confirm('即将删除所有此token开头的限制，确认删除？', '提示', {
        distinguishCancelAndClose: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.tokenRelationInfo = Object.assign({},row);
        this.$ajax.manage.deleteTokenRelation(this.tokenRelationInfo).then(res => {
          if (res.data.code == 0) {
            this.$message.success(res.data.msg);
            this.getData(this.currentPage);
            this.getTokenRelation();
            this.getCompanyNameList();
          }
        })
      }).catch(action => {
        if(action === 'cancel'){
          // this.$router.push({
          //   path: '/report/riskScreen',
          //   query: param
          // })
        }
      });

    },

    closeEditTokenRelationDialog() {
      this.editTokenRelationDialog = false;
    },

    saveTokenRelationInfo(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.tokenRelationInfo.type = this.tokenRelationEditType;
          this.$ajax.manage.saveTokenRelation(this.tokenRelationInfo).then(res => {
            if (res.data.code == 0) {
              this.$message.success(res.data.msg);
              this.getCompanyNameList();
              this.openTokenRelationDialog();
              this.editTokenRelationDialog = false;
            }
          })
        } else {
          return false;
        }
      });
    },

    saveTokenInfo(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.tokenInfo.type = this.tokenEditType;
          this.$ajax.manage.saveToken(this.tokenInfo).then(res => {
            if (res.data.code == 0) {
              this.$message.success(res.data.msg);
              this.getData(this.page.currentPage);
              this.editTokenDialog = false;
            }
          })
        } else {
          return false;
        }
      });
    },

    // getCompanyNameList(){
    //   this.$ajax.manage.getTokenRelation().then(res => {
    //     if(res.data.code == '0'){
    //       this.companyNameList = res.data.openAPIRelationList;
    //     }
    //   })
    // },
    getCompanyNameList(){
      this.$ajax.manage.getTokenRelation().then(res => {
        if(res.data.code == '0'){
          const openAPIRelationList = res.data.openAPIRelationList;
          const companyNameList =  Array.from(new Array());

          for(let i = 0; i < openAPIRelationList.length; i++){
            companyNameList.push(openAPIRelationList[i].companyName);
          }
          this.companyNameList = Array.from(new Set(companyNameList))
        }
      })
    },

    getData(page) {
      let param = {
        pageIndex: page ? page : 1,
        pageSize: this.page.pageSize,
        status: this.search.status,
        uri: this.search.uri,
        interfaceName: this.search.interfaceName,
        companyName: this.search.companyName
      }
      this.loading = true;
      this.$ajax.manage.getTokenList(param).then(res => {
        if (res.data.code == 0) {
          this.loading = false;
          this.tableData = res.data.openAPIList
          this.page.total = res.data.totalRecords
        }
      })
    },
    searchData() {
      this.page.currentPage = 1;
      this.getData(1)
    },
    handleCurrentChange(val) {
      //页码切换
      this.getData(val)
      this.getData(val)
    },
    updateStatus(row, status) {
      //点击启用或停用
      let param = {
        openId: row.openId,
        tokenId: row.tokenId,
        status: status
      }
      this.$ajax.manage.updateOpenAPIStatus(param).then(res => {
        if (res.status == 200) {
          this.getData(this.page.currentPage)
          if(status == 1){
            this.$message.success("已启用")
          }else{
            this.$message.success("已停用")
          }
        }
      })
    },

  }
}
</script>
<style lang="less" scoped>
.TokenManage {
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