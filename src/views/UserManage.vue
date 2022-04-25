<!-- 用户管理 -->
<template>
  <div class="userManage ">
    <div style="margin-bottom: 15px;">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/homePage' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="searchbox">
      <el-input class="fl-left manageTableInput" v-model="search.userName" placeholder="请输入姓名" clearable
        style="width: 200px;margin-right: 10px;">
      </el-input>
      <el-input class="fl-left manageTableInput" v-model="search.userCode" placeholder="请输入工号" clearable
        style="width: 200px;margin-right: 10px;">
      </el-input>
      <el-select v-model="search.status" placeholder="请选择状态" clearable style="width: 200px;margin-right: 10px;">
        <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
	  <el-select v-model="search.isSubAdmin" placeholder="请选择角色" clearable style="width: 200px;margin-right: 10px;">
      <el-option v-for="item in roleAll" :key="item.value" :label="item.label" :value="item.value"></el-option>
<!--	    <el-option label="是" value="1" ></el-option>-->
<!--		<el-option label="否" value="0" ></el-option>-->
	  </el-select>
<!--      <el-button type="primary" icon="el-icon-search" @click="getRoleAll">查询</el-button>-->
      <el-button type="primary" icon="el-icon-search" @click="searchData">查询</el-button>
      <el-button type="success" icon="el-icon-plus" v-on:click="newUser">新增</el-button>
    </div>
    <div class="table-box">
      <el-tree :data="treeData" @node-click="handleNodeClick" style="width: 30%;float: left;top: 0px;z-index: 1;margin-left: -19px;"></el-tree>
      <el-table ref="multipleTable" :data="tableData"  tooltip-effect="dark" style="width: 71%;" stripe
        v-loading='loading'>
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column prop="username" label="工号">
        </el-table-column>
        <el-table-column prop="name" label="姓名">
			<template slot-scope="scope">
				{{scope.row.name}}
				<i class="el-icon-s-custom" style="color:#409EFF" v-if="scope.row.permissionRoles&&scope.row.permissionRoles.indexOf('sub_admin')!=-1"></i>
			</template>
        </el-table-column>
        <!--<el-table-column prop="permissionLevel" label="权限级别">-->
<!--        <el-table-column prop="permissionRoles" label="角色"></el-table-column>-->
        <el-table-column prop="email" show-overflow-tooltip label="邮箱">
        </el-table-column>
        <el-table-column prop="mobile" label="手机号">
        </el-table-column>
        <el-table-column prop="companyName" show-overflow-tooltip label="所属公司名称">
        </el-table-column>
<!--        <el-table-column prop="deptName" show-overflow-tooltip label="所属部门名称">-->
<!--        </el-table-column>-->
        <el-table-column prop="status" label="状态" width="100" sortable>
          <template slot-scope="scope">
            <el-tag type="primary" v-if="scope.row.status==1" disable-transitions>已启用</el-tag>
            <el-tag type="info" v-else-if="scope.row.status==0">已停用</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" width="250px" label="操作">
          <template slot-scope="scope">
            <!-- <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">点击启用</el-button>
                        <el-button size="mini" type="primary" @click="handleDelete(scope.$index, scope.row)">点击停用

                        </el-button> -->
            <el-button size="mini" type="primary" @click="editUser(scope.row)" plain v-if="scope.row.status==1">
              编辑</el-button>
            <el-button size="mini" type="primary" @click="editUser(scope.row)" disabled=“submissionFlag” plain v-if="scope.row.status==0">
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

    <el-dialog :title="editType" :visible.sync="editUserDialog" width="450px" @close="closeDialog" :rules="rules" :close-on-click-modal='false'>
      <el-form :model="userInfo" label-width="100px" :rules="rules" ref="userInfo">
        <el-form-item label="用户ID：" v-show="!isNew">
          <el-input v-model="userInfo.userId" disabled style="width:300px"></el-input>
        </el-form-item>
        <el-form-item label="工号：" prop="username">
          <el-input v-model="userInfo.username" :disabled="!isNew" style="width:300px"></el-input>
        </el-form-item>
        <el-form-item label="姓名：" prop="name">
          <el-input v-model="userInfo.name" style="width:300px"></el-input>
        </el-form-item>
        <el-form-item label="密码：" prop="password">
          <el-input v-model="userInfo.password" v-focus="clearpassword" style="width:300px" type="password">
          </el-input>
        </el-form-item>
        <el-form-item label="手机：" prop="mobile">
          <el-input v-model="userInfo.mobile" style="width:300px"></el-input>
        </el-form-item>
        <el-form-item label="邮箱：">
          <el-input v-model="userInfo.email" style="width:300px"></el-input>
        </el-form-item>
        <el-form-item label="公司代码：" prop="companyCode">
          <el-input v-model="userInfo.companyCode" disabled style="width:300px"></el-input>
        </el-form-item>
        <el-form-item label="公司：" prop="companyName">
          <el-autocomplete
                  v-model="userInfo.companyName"
                  placeholder="请输入公司名称"
                  :fetch-suggestions="querySearch"
                  :trigger-on-focus="true"
                  @select="selectChange"
                  style="width:300px"
                  :disabled="!isNew"
          >
          </el-autocomplete>
        </el-form-item>
        <el-form-item label="部门：">
          <el-input v-model="userInfo.deptName" style="width:300px"></el-input>
        </el-form-item>
		<el-form-item label="角色：">

<!--			 <el-select v-model="userInfo.permissionRoles" multiple placeholder="请选择" style="width:300px">-->
<!--			    <el-option-->
<!--			      v-for="item in permissionAll"-->
<!--			      :key="item.roleId"-->
<!--			      :label="item.roleName"-->
<!--			      :value="item.roleName"-->
<!--                  :disabled="item.disabled"-->
<!--                  :hidden="item.disabled">-->
<!--			    </el-option>-->
<!--			  </el-select>-->

      <el-select v-model="userInfo.permissionRoles"  placeholder="请选择" @blur="onChange" clearable style="width:300px">
        <el-option
            v-for="item in permissionAll"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled"
            :hidden="item.disabled">
        </el-option>
      </el-select>

		</el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialog()">取 消</el-button>
        <el-button type="primary" @click="saveUserInfo('userInfo')">保 存</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
export default {
  data () {
    var validateMobile = (rule, value, callback) => {
      let TEL_REGEXP = /^[1][3,4,5,7,8,9][0-9]{9}$/;
      if (value === ""||typeof value=='undefined') {
        callback();
      } else if (value && !TEL_REGEXP.test(value)) {
        callback(new Error("请输入正确的手机号!"));
      } else {
        callback();
      }
    };
    var validatePassword = (rule, value, callback) => {

      // if (value.length < 8) callback(new Error("密码长度不能低于8位!"));
      // if (!(/\d/.test(value))) callback(new Error("密码必须包含一位数字!"));
      // if (!(/[a-z]/.test(value))) callback(new Error("密码必须包含一位小写英文字母!"));
      // if (!(/[A-Z]/.test(value))) callback(new Error("密码必须包含一位大写英文字母!"));
      // if (!(/\W/.test(value))) callback(new Error("密码必须包含一位特殊字符!"));
      //
      //
      // callback();

      let modes = 0;
      if (value.length < 8) callback(new Error("密码长度不小于8位,需由数字、字母、字符中的两种组成。"));
      if (/\d/.test(value)) modes++; //数字
      if ((/[a-z]/.test(value)) || (/[A-Z]/.test(value)) )modes++; //字母
      // if (/[A-Z]/.test(value)) modes++; //大写
      if (/\W/.test(value)) modes++; //特殊字符

      if (value && modes < 2) {
        callback(new Error("密码长度不小于8位,需由数字、字母、字符中的两种组成。"));
      }else {
        callback();
      }
    };
    var userExists = (rule, value, callback) => {
      if (value === ""||typeof value=='undefined'||!this.isNew) {
        callback();
      } else if (value) {
        let param = {
          username: value
        }
        this.$ajax.manage.userExists(param).then(res => {
          if (res.status == 200) {
            if(res.data.userExists){
              callback(new Error("工号已存在"));
            }else{
              callback();
            }
          }else{
            callback();
          }
        });
      } else {
        callback();
      }
    };
    var userCompanys = (rule, value, callback) => { //校验公司名称
      let isFlag = true;
          for(let i = 0;i < this.newCompany.length;i++){
            if(value == this.newCompany[i].name){
              isFlag = false;
                callback();
            }
          }
      if(isFlag){
        callback(new Error("请输入正确的公司名称"));
      }


    };
    var userIsZhrs = (rule, value, callback) => { //中韩人寿必须以zhrs开头
      let param = {
        code: this.userInfo.companyCode
      }
      this.$ajax.manage.getCompanyIDVerification(param).then(res => {
        console.log(res.data)
        if (res.data.code == 0) {
          if(value&&this.userInfo.companyName&&this.userInfo.companyName == res.data.CompanyIDVerification.name){
            if(value.indexOf(res.data.CompanyIDVerification.rule)==0){
              callback();
            }else{
              // callback(new Error("中航人寿人员必须以zhrs开头"));
              callback(new Error(res.data.CompanyIDVerification.name + '人员必须以' + res.data.CompanyIDVerification.rule + '开头'))
            }
          }else{
            callback();
          }
        }else{
          callback();
        }
      })
    };
    return {
      search: {
        userName: '',
        userCode: '',
        status: '',
		isSubAdmin:''
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
      tableData: [],
      loading: false,
      editUserDialog: false,//用户编辑对话框
      isNew: false, //是否是新增用户
      editType: '',
      userInfo: {
        userId: '',
        username: '',
        name: '',
        password: '',
        mobile: '',
        email: '',
        companyCode: '',
        companyName: '',
        deptName: '',
        roleName:'',
		permission:[],
        permissionRoles: '',
        operator: this.$Cookies.get('userCode')
      },
      userInfoTemp: {
        userId: '',
        username: '',
        name: '',
        password: '',
        mobile: '',
        email: '',
        companyCode: '',
        companyName: '',
        deptName: '',
        permission:[],
        permissionRoles: '',
        roleName:'',
        operator: this.$Cookies.get('userCode')
      },
      newCompany: [],
      newCompanyFlag: 0,
      node:{id:this.$Cookies.get('companyCode'),isLevel:true},
      rules: {
        mobile: [
          {  validator: validateMobile, trigger: 'blur' },
        ],
        companyName: [
          { required: true, message: '请选择公司名称', trigger: 'change' },
          { validator: userCompanys, message: '请输入正确的公司名称', trigger: 'change' }
        ],
        username: [
          { required: true, message: '请输入工号', trigger: 'change' },
          { validator: userExists, message: '工号已存在', trigger: 'change' },
          { validator: userIsZhrs, message: '', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入用户名', trigger: 'change' }
        ],

        password: [
          { required: true, message: '请输入密码', trigger: 'change' },
          //新增密码复杂度校验(Kern on 20210615)
          { validator: validatePassword, trigger: 'blur' }
        ],
        companyCode: [
          { required: true, message: '请选择公司名称', trigger: 'change' }
        ],

      },
	  permissionList:[],
      permissionAll:[
        // {permissionPointName:"黑名单审批权限",permissionRole:"reviewer",disabled:true},
        // {permissionPointName:"黑名单申请权限",permissionRole:"applicant",disabled:true},
        // {permissionPointName:"信保报告审批权限",permissionRole:"zxb_report_reviewer",disabled:true},
        // {permissionPointName:"子管理员用户权限",permissionRole:"sub_admin",disabled:true}
      ],
      roleAll:[
        // {label: '审核专员测试', value: '1'}
      ],
      treeData:[]
    }
  },


  created () {
    this.getData(1);
    this.getNewCompany();
    this.getRoleAll();
    this.getAllCompanyLevel();
    this.getRolePermission();
  },
  mounted () {
    this.getEnablePermission();
    this.getData(1);
  },
  methods: {
    getData(page) {
      let param = {
        pageIndex: page ? page : 1,
        pageSize: this.page.pageSize,
        username: this.search.userCode,
        name: this.search.userName,
        status: this.search.status,
        operator: this.$Cookies.get('userCode'),
	    	isSubAdmin:this.search.isSubAdmin,
        companyCode:this.node.id,
        isLevel:this.node.isLevel
      }
      this.loading = true;
      this.$ajax.manage.getUserList(param).then(res => {
        if (res.data.code == 0) {
          this.loading = false;
          this.tableData = res.data.userList
          console.log(res.data.userList)
          this.page.total = res.data.totalRecords
        }
      })
    },
    getRolePermission(){
      let param = {
        userId: this.$Cookies.get('userId')
      }
      this.$ajax.manage.getRole().then(res => {
        console.log(res.data);
        let dataArray = [];
        for(let j = 0;j < res.data.allRole.length;j++) {
          let roleTemp = {
            label: res.data.allRole[j],
            value: res.data.allRole[j]
          }
          dataArray.push(roleTemp);
        }
        this.permissionAll = dataArray;
      })
    },
    getRoleAll(){
      this.$ajax.manage.getRole().then(res => {
        console.log(res.data);
        let dataArray = [];
        for(let j = 0;j < res.data.allRole.length;j++) {
            let roleTemp = {
              label: res.data.allRole[j],
              value: res.data.allRole[j]
            }
          dataArray.push(roleTemp);
        }
        this.roleAll = dataArray;
      })
    },

    searchData() {
      this.page.currentPage = 1;
      this.getData(1)
      this.getData(1)
    },
    handleCurrentChange(val) {
      //页码切换
      this.getData(val)
      this.getData(val)
    },
    updateStatus(row, status) {
      // console.log(status)
      //点击启用或停用
      let param = {
        userId: row.userId,
        status: status,
        operator: this.$Cookies.get('userCode')
      }
      this.$ajax.manage.updateUser(param).then(res => {
        if (res.status == 200) {
          this.getData(this.page.currentPage)
          this.editUserDialog = false
          let param2 = {}
          this.$ajax.manage.updateUserStatus(param2).then(res2 => {
            if (res2.status == 200) {
              this.$message.success("已同步用户启用状态到数据中心")
            }
          })
        }
      })
    },
    newUser() {
      this.clearUserInfo();
      this.getRolePermission();
      // this.getRoleAll();
      this.isNew = true;
      this.editType = '新增用户';
      this.userInfo = {newCompanyFlag: 1,status: 1};
      this.editUserDialog = true;
      this.getData(1)
    },
    handleNodeClick(node){
      console.log(node)
      this.node = node;
      this.getData(1)
      this.getData(1)
    },
    editUser(row) {

      this.clearUserInfo();
      this.isNew = false;
      this.editType = '编辑用户';
      row.newCompanyFlag = 0;
      this.getRolePermission();
      // this.getRoleAll();
      this.userInfo = Object.assign({},row);
      console.log(this.userInfo)
      if(this.userInfo.roleName){
        // this.userInfo.permissionRoles = this.userInfo.roleName.split(',');
        this.userInfo.permissionRoles = this.userInfo.roleName;
        console.log( this.userInfo.permissionRoles)

      }else{
        this.userInfo.permissionRoles = null;
      }

      this.editUserDialog = true;


    },
    onChange(){
      this.$forceUpdate()//强制更新
    },
    // editUser(row) {
    //   debugger;
    //   this.clearUserInfo();
    //   this.isNew = false;
    //   this.editType = '编辑用户';
    //   row.newCompanyFlag = 0;
    //   this.getRolePermission();
    //   //this.userInfo = row;
    //   this.userInfo = Object.assign({},row);
    //   console.log(this.userInfo)
    //    // if (this.userInfo.permissionRoles && !(this.userInfo.permissionRoles instanceof Array)) {
    //  // this.userInfo.roleName != "zxb_report_apply,zxb_report_list,merchant,news_all,applicant"
    //     if(this.userInfo.roleName){
    //       this.userInfo.permissionRoles = this.userInfo.roleName.split(',');
    //       console.log( this.userInfo.permissionRoles)
    //     }else{
    //       this.userInfo.permissionRoles = null;
    //     }
    //    // }
    //
    //   this.editUserDialog = true;
    // },
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
    // getNewRole() {
    //   this.$ajax.manage.getUserRole.then(res => {
    //       this.newRole = res.data.allRole;
    //   })
    // },
    getEnablePermission() {
      let param = {
        operator: this.$Cookies.get('userCode')
      }
      this.$ajax.manage.getEnablePermission(param).then(res => {
        if (res.data.permissionList) {
          this.permissionList = res.data.permissionList;
          for(let p of this.permissionList){
            this.permissionAll.find(item=>item.permissionRole===p.permissionRole).disabled=false;
          }
        }
      })
    },
    selectChange(selectValue) {
      // console.log(selectValue);
      this.userInfo.companyCode = selectValue.id;

      this.$forceUpdate();
    },

    saveUserInfo(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.userInfo.permissionRoles && (this.userInfo.permissionRoles instanceof Array)) {
            this.userInfo.permissionRoles = this.userInfo.permissionRoles.join(',');
          }
          //增加当前操作人
          this.userInfo.operator = this.$Cookies.get('userCode');
          this.$ajax.manage.updateUser(this.userInfo).then(res => {
            this.getData(this.page.currentPage,this.node)
            if (res.data.code == 0) {
              this.$message.success(res.data.msg);
              this.editUserDialog = false;
              // this.clearUserInfo();
              // this.$refs.userInfo.resetFields();
            }
          })
          this.getData(1)
        } else {
          return false;
        }
      });
    },
    clearUserInfo() {
      this.userInfo = {
        userId: '',
        username: '',
        name: '',
        password: '',
        mobile: '',
        email: '',
        companyCode: '',
        companyName: '',
        deptName: ''
      };
    },
    closeDialog() {
      this.clearUserInfo();
      this.$nextTick(() => {
        this.$refs.userInfo.data = this.userInfoTemp;
      });
      this.editUserDialog = false;
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
    clearpassword(){
      this.userInfo.password = '';
    },
    getAllCompanyLevel(){
      let param = {
        userId: this.$Cookies.get("userId")
      }
      this.$ajax.manage.getAllCompanyLevel(param).then(res => {
        console.log("---------TreeData--------")
        console.log(res.data)
        this.getTreeData(res.data.treeData);
        this.node = {id:res.data.treeData[0].code,isLevel:true}
        console.log(this.node)
        console.log(this.treeData)
        console.log("---------TreeData--------")
      })
    },
    getTreeData(treeData){
        let dataArray = [];
        let treeTemp = {
          id: treeData[0].code,
          label: treeData[0].name,
          parentId: treeData[0].scode,
          isLevel: true
        }
        dataArray.push(treeTemp);
        this.getLevelData(treeData,dataArray)
        this.treeData = dataArray;
    },
    getLevelData(treeData,dataArray){
      for(let i = 0; i < dataArray.length; i++){
        let dataLevel = dataArray[i];
        let childrenArray = [];
        for(let j = 0;j < treeData.length;j++) {
          let parentId = treeData[j].scode;
          if (parentId == dataLevel.id) {//判断是否为儿子节点
            let treeTemp = {
              id: treeData[j].code,
              label: treeData[j].name,
              parentId: treeData[j].scode,
              isLevel: true
            }
            childrenArray.push(treeTemp);
          }
        }
        dataLevel.children = childrenArray;
        if (childrenArray.length > 0) {//有儿子节点则递归
          this.getLevelData(treeData, childrenArray)
        }else{
          dataLevel.isLevel = false;
        }
        if(dataLevel.isLevel){
          let treeTemp = {
            id: dataLevel.id,
            label: "查看本部人员信息",
            isLevel: false
          }
          dataLevel.children.unshift(treeTemp)
        }
      }


    }
  }
}
</script>
<style lang="less" scoped>
.userManage {
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