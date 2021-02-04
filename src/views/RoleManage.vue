<!-- 角色管理 -->
<template>
  <div class="roleManage">
    <div style="margin-bottom: 15px;">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/homePage' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>角色管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="table-box" style="width: 80%">
      <el-button type="success" icon="el-icon-plus" v-on:click="newRole">新增</el-button>
      <el-table ref="multipleTable" :data="tableData"  tooltip-effect="dark" style="width: 100%;" stripe
                v-loading='loading'>
        <el-table-column prop="roleId" label="角色编号">
        </el-table-column>
        <el-table-column prop="roleName" label="角色名称">
          <template slot-scope="scope">
            {{scope.row.roleName}}
          </template>
        </el-table-column>
        <el-table-column prop="permission" show-overflow-tooltip label="权限">
        </el-table-column>
        <el-table-column align="center" width="250px" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="editRole(scope.row)" plain>
              编辑
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <div style="text-align: center;margin-top: 10px;">
        <el-pagination background layout="prev, pager, next,total,jumper" :total="page.total"
                       :current-page.sync="page.currentPage" :pageSize="page.pageSize" @current-change="handleCurrentChange">
        </el-pagination>
      </div>

      <el-dialog :title="editType" :visible.sync="editUserDialog" width="500px" @close="closeDialog" :rules="rules"  :close-on-click-modal='false'>
        <el-form :model="RoleInfo" label-width="100px" :rules="rules" ref="RoleInfo">
          <el-form-item label="角色名称：" prop="roleName">
            <el-input v-model="RoleInfo.roleName" style="width:300px"></el-input>
          </el-form-item>
          <el-form-item label="权限：" prop="permission">
            <template>
              <el-checkbox-group v-model="RoleInfo.permission">
                <el-checkbox label="客商初筛权限"></el-checkbox>
                <el-checkbox label="黑名单审批权限"></el-checkbox>
                <el-checkbox label="黑名单申请权限"></el-checkbox>
                <el-checkbox label="用户子管理权限" ></el-checkbox>
                <el-checkbox label="信保报告审批权限" ></el-checkbox>
                <el-checkbox label="信保报告申请权限" ></el-checkbox>
                <el-checkbox label="信保报告列表权限" ></el-checkbox>
                <el-checkbox label="消息中心权限" ></el-checkbox>
              </el-checkbox-group>
            </template>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="closeDialog()">取 消</el-button>
          <el-button type="primary" @click="saveRoleInfo('RoleInfo')">保 存</el-button>
        </div>
      </el-dialog>
<!--      <div style="text-align: center;margin-top: 10px;">-->
<!--        <el-pagination background layout="prev, pager, next,total,jumper" :total="page.total"-->
<!--                       :current-page.sync="page.currentPage" :pageSize="page.pageSize" @current-change="handleCurrentChange">-->
<!--        </el-pagination>-->
<!--      </div>-->
    </div>
  </div>

</template>

<script>
export default {
  data () {
    var roleNameExists = (rule, value, callback) => {
      if (value === "" || typeof value == 'undefined') {
        callback();
      } else if (value) {
        let param = {
          roleId:this.RoleInfo.roleId,
          isNew:this.isNew,
          roleName: value
        }
        this.$ajax.manage.roleNameExists(param).then(res => {
          if (res.status == 200) {
            if (res.data.roleNameExists) {
              callback(new Error("角色名称已存在"));
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
   return {
     tableData:[],
     editType: '',
     editUserDialog: false,//用户编辑对话框
     isNew: false, //是否是新增角色
     loading: false,
     RoleInfo:{
       roleId:"",
       roleName:'',
       permission: [],
     },
     RoleInfoTemp:{
       roleId:"",
       roleName:'',
       permission: [],
     },
     page: {
       currentPage: 1,
       total: 0,
       pageSize: 10
     },
     rules: {
       roleName:[
         { required: true, message: '请输入角色名称', trigger: 'change' },
         { validator: roleNameExists, message: '', trigger: 'change' },
         { validator: roleNameExists, message: '', trigger: 'blur' }
       ],
       permission:[
        { required: true, message: '请选择角色权限', trigger: 'change' },
    ],
     }
   }
  },

  mounted() {
    this.getAllRole(1);
  },
  methods: {
    getAllRole(page) {
      let param = {
        operator: this.$Cookies.get('userCode'),
        pageIndex: page ? page : 1,
        pageSize: this.page.pageSize,
        isFlage:'true'
      }
      this.loading = true;
      this.$ajax.manage.getAllRole(param).then(res => {
        this.tableData = res.data.allRole.content;
        this.page.total = res.data.totalRecords;
        this.loading = false;
      })
    },
    newRole(){
      this.clearRoleInfo()
      this.editType = "新增角色",
      this.isNew = true, //是否是新增用户
      this.editUserDialog = true;
      this.getAllRole(1)
    },
    editRole(row){
      this.clearRoleInfo();
      this.isNew = false, //是否是新增用户
      this.editType = "编辑角色";
      this.editUserDialog = true;
      this.getAllRole(1);
      this.RoleInfo = Object.assign({},row);
      this.RoleInfo.permission = this.RoleInfo.permission.split(/, /);
    },
    clearRoleInfo(){
      this.RoleInfo = {
        roleId:"",
        roleName:'',
        permission:[]
      };
    },
    closeDialog() {
      this.clearRoleInfo();
      this.$nextTick(() => {
        this.$refs.RoleInfo.data = this.RoleInfoTemp;
      });
      this.editUserDialog = false;
    },
    saveRoleInfo(formName){
      this.$refs[formName].validate((valid) => {
        if(valid){
          let param = {
            isNew:this.isNew,
            roleId: this.RoleInfo.roleId,
            roleName : this.RoleInfo.roleName,
            permission:this.RoleInfo.permission
          }
          this.$ajax.manage.saveOrEditRole(param).then(res => {
            if(res.data.code == 0){
              this.$message.success("角色更新成功")
            }
            this.getAllRole(1);
          })
          this.editUserDialog = false;
        }else{
          return  false;
        }
      })
    },
    handleCurrentChange(val) {
      //页码切换
      this.getAllRole(val)
      this.getAllRole(val)
    },

  }
}
</script>
<style lang="less" scoped>
.roleManage{
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