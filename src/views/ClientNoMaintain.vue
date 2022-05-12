<!-- 信保代码维护 -->
<template>
  <div class="ClientNoMaintain ">
    <div style="margin-bottom: 15px;">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/homePage' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>信保代码维护</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="searchbox">
      <el-select v-model="search.companyName" collapse-tags placeholder="请选择企业名称" clearable style="width: 310px;margin-right:5px;">
        <el-option v-for="item in companyNameList" :key="item" :label="item" :value="item">
        </el-option>
      </el-select>
      <el-input class="fl-left manageTableInput" v-model="search.interfaceName" placeholder="请输入接口名称" clearable
        style="width: 200px;margin-right: 10px;">
      </el-input>
      <el-input class="fl-left manageTableInput" v-model="search.jsonFlag" placeholder="请输入接口代码" clearable
                style="width: 200px;margin-right: 10px;">
      </el-input>
      <el-button type="primary" icon="el-icon-search" @click="searchData">查询</el-button>
      <el-button type="success" icon="el-icon-plus" v-on:click="newInterfaceLimit">新增</el-button>

    </div>
    <div class="table-box">
      <el-table ref="multipleTable" :data="tableData"  tooltip-effect="dark" style="width: 100%;" stripe v-loading='loading'>
        <el-table-column min-width="25%" prop="companyName" show-overflow-tooltip label="公司HR编码">
        </el-table-column>
        <el-table-column min-width="20%" prop="interfaceName" label="公司HR名称">
        </el-table-column>
        <el-table-column min-width="10%" prop="jsonFlag" label="所属成员公司HR名称">
        </el-table-column>
        <el-table-column min-width="15%" prop="limitNumber" label="数据来源">
        </el-table-column>
        <el-table-column min-width="15%" prop="updateDate" label="信保通买方代码">
        </el-table-column>
        <el-table-column min-width="15%" align="center" width="250px" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="editInterfaceLimit(scope.row)">
              编辑</el-button>
<!--            <el-button size="mini" type="danger" @click="deleteInterfaceLimit(scope.row)">-->
<!--              删除</el-button>-->
          </template>
        </el-table-column>
      </el-table>

      <div style="text-align: center;margin-top: 10px;">
        <el-pagination background layout="prev, pager, next,total,jumper" :total="page.total"
          :current-page.sync="page.currentPage" :pageSize="page.pageSize" @current-change="handleCurrentChange">
        </el-pagination>
      </div>
    </div>

    <el-dialog :title="editType" :visible.sync="editDialog" width="500px" @close="closeEditDialog" :close-on-click-modal='false'>
      <el-form :model="interfaceLimitInfo" label-width="130px" :rules="rules" ref="interfaceLimitInfo">
        <el-form-item label="公司名称："prop="companyName" >
          <el-input v-model="interfaceLimitInfo.companyName" v-if="!isNew" disabled style="width:300px"></el-input>
          <el-input v-model="interfaceLimitInfo.companyName" v-if="isNew" style="width:300px"></el-input>
        </el-form-item>
        <el-form-item label="接口名称： "prop="interfaceName">
          <el-input v-show="!isNew" v-model="interfaceLimitInfo.interfaceName" disabled style="width:300px"></el-input>
          <el-input v-show="isNew" v-model="interfaceLimitInfo.interfaceName" style="width:300px"></el-input>
        </el-form-item>
        <el-form-item label="接口代码：" prop="jsonFlag">
          <el-input v-model="interfaceLimitInfo.jsonFlag" v-if="!isNew" disabled style="width:300px"></el-input>
          <el-input v-model="interfaceLimitInfo.jsonFlag" v-if="isNew" style="width:300px"></el-input>
        </el-form-item>
        <el-form-item label="每日限制次数：" prop="limitNumber">
          <el-input v-model="interfaceLimitInfo.limitNumber" style="width:300px"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeEditDialog()">取 消</el-button>
        <el-button type="primary" @click="saveInterfaceLimitInfo('interfaceLimitInfo')">保 存</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
export default {
  data () {
    var limitNumberValidate = (rule, value, callback) => {
      let modes = 0;
      if (value.length > 9) callback(new Error("输入的数字过大！"));
      // if (/\d/.test(value)) modes++; //数字
      if ((/[a-z]/.test(value)) || (/[A-Z]/.test(value)) )modes++; //字母
      // if (/[A-Z]/.test(value)) modes++; //大写
      if (/\W/.test(value)) modes++; //特殊字符

      if (value && modes > 0) {
        callback(new Error("必须输入数字！"));
      }else {
        callback();
      }
    };
    return {
      search: {
        companyName: '',
        dataSource: ''
      },
      page: {
        currentPage: 1,
        total: 0,
        pageSize: 10
      },
      tableData: [],
      loading: false,
      editDialog: false,
      interfaceLimitInfo: {
        id:'',
        companyName: '',
        jsonFlag:'',
        interfaceName:'',
        limitNumber:'',
        editType:'',
      },
      node:{id:this.$Cookies.get('companyCode'),isLevel:true},

      rules: {
        limitNumber: [
          { required: true, message: '请输入限制次数！', trigger: 'change' },
          {validator: limitNumberValidate, trigger: 'change' }
        ],
        companyName: [
          { required: true, message: '请输入公司名称！', trigger: 'change' },
        ],
        interfaceName: [
          { required: true, message: '请输入接口名称！', trigger: 'change' },
        ],
        jsonFlag: [
          { required: true, message: '请输入接口代码！', trigger: 'change' },
          {validator: limitNumberValidate, trigger: 'change' }
        ],
      },
    }
  },

  created () {
    this.getData(1);
    this.getCompanyNameList();
  },
  mounted () {
  },
  methods: {
    newInterfaceLimit() {
      this.isNew = true;
      this.editType = '新增';
      this.clearInterfaceLimitInfo();
      this.editDialog = true;
    },

    closeEditDialog() {
      this.editDialog = false;
    },

    saveInterfaceLimitInfo(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.interfaceLimitInfo.editType = this.editType;
          this.$ajax.manage.saveInterfaceLimit(this.interfaceLimitInfo).then(res => {
            if (res.data.code == 0) {
              this.$message.success(res.data.msg);
              this.getData(this.page.currentPage);
              this.editDialog = false;
            }
          })
        } else {
          return false;
        }
      });
    },

    editInterfaceLimit(row) {
      this.isNew = false;
      this.editType = '编辑';
      this.interfaceLimitInfo = Object.assign({},row);
      this.editDialog = true;
    },

    deleteInterfaceLimit(row) {

      this.$msgbox.confirm('确认删除？', '提示', {
        distinguishCancelAndClose: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.interfaceLimitInfo = Object.assign({},row);
        this.$ajax.manage.deleteInterfaceLimit(this.interfaceLimitInfo).then(res => {
          if (res.data.code == 0) {
            this.$message.success(res.data.msg);
            this.getData(this.page.currentPage);
            this.editDialog = false;
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

    clearInterfaceLimitInfo() {
      this.interfaceLimitInfo= {
        id:'',
        companyName: '',
        jsonFlag:'',
        interfaceName:'',
        limitNumber:'',
        editType:''
      };
    },

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
        companyName: this.search.companyName,
        dataSource: this.search.dataSource
      }
      this.loading = true;
      this.$ajax.manage.getClientNoMaintainList(param).then(res => {
        if (res.data.code == 0) {
          this.loading = false;
          this.tableData = res.data.interfaceUsedLimit
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
    },
  }
}
</script>
<style lang="less" scoped>
.ClientNoMaintain {
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