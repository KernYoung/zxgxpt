<template>
  <div class="header-box">
    <span class="title">
      <img src="../../public/img/logo.png" alt="" @click="goHome" />
    </span>
    <!-- <span class="info" v-if="$Cookies.get(this.$getCookieKey())"> -->
    <span>
      <!-- <el-input placeholder="请输入搜索内容" v-model="searchVal" class="input-with-select" style="width: 300px;margin-left: 100px;">
				<el-button slot="append" icon="el-icon-search" @click="searchData"></el-button>
			</el-input> -->
      <el-autocomplete
        @keyup.enter.native="searchData()"
        @select="searchData"
        class="inline-input"
        v-model="searchVal"
        :fetch-suggestions="querySearch"
        placeholder="请输入搜索内容"
        style="width: 250px;margin-left: 55px;"
      >
        <el-button slot="append" icon="el-icon-search" @click="searchData"></el-button>
        <el-button slot="append" icon="iconfont el-icon-mhcxdiqiu" @click="searchBlarSearch"></el-button>
      </el-autocomplete>
    </span>
    <span class="info" v-if="showUserData">
      <el-dropdown style="margin-right:20px" @command="TycHandleCommand">
        <el-button type="primary" round> 高级应用<i class="el-icon-arrow-down el-icon--right"></i> </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="1">幕后关系</el-dropdown-item>
          <el-dropdown-item command="2">关联关系</el-dropdown-item>
          <el-dropdown-item command="3">报告下载</el-dropdown-item>
          <el-dropdown-item command="4">天眼地图</el-dropdown-item>
          <el-dropdown-item command="5">资本市场公告</el-dropdown-item>
          <el-dropdown-item command="6">资本市场法规</el-dropdown-item>
          <el-dropdown-item command="7">资本成分穿透</el-dropdown-item>
          <el-dropdown-item command="8">企业画像</el-dropdown-item>
          <el-dropdown-item command="9">数据导出</el-dropdown-item>
          <el-dropdown-item command="10">高级搜索</el-dropdown-item>
          <!--              <el-dropdown-item command="11">监控管理</el-dropdown-item>-->
        </el-dropdown-menu>
      </el-dropdown>
      <el-dropdown style="margin-right:20px" @command="handleCommand">
        <el-button type="primary" round> 常用应用<i class="el-icon-arrow-down el-icon--right"></i> </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="1" v-if="blacklistApply">黑名单申报</el-dropdown-item>
          <el-dropdown-item command="2" v-if="blacklistAudit">黑名单审批</el-dropdown-item>
          <el-dropdown-item command="3" v-if="merchant">客商初筛</el-dropdown-item>
          <el-dropdown-item command="4" v-if="zxbReportApply">信保报告申请</el-dropdown-item>
          <el-dropdown-item command="7" v-if="zxbReportlist">信保报告列表</el-dropdown-item>
          <el-dropdown-item command="10" v-if="zxbreportAudit">信保报告审核</el-dropdown-item>
          <!--          <el-dropdown-item command="13" v-if="true">信保信息</el-dropdown-item>-->
          <!-- jina-->
          <el-dropdown-item command="12" v-if="zxbReportlist">我的信保报告</el-dropdown-item>
          <el-dropdown-item command="14" v-if="$Cookies.get('username') == 'admin'">信保代码维护</el-dropdown-item>
          <el-dropdown-item command="5" v-if="userManage || sub_manage">用户管理</el-dropdown-item>
          <el-dropdown-item command="11" v-if="$Cookies.get('username') == 'admin'">角色管理</el-dropdown-item>
          <el-dropdown-item command="6" v-if="newsAll">消息中心</el-dropdown-item>
          <el-dropdown-item
            command="8"
            v-if="$Cookies.get('username') == 'admin' || $Cookies.get('permissionRoles') == '访问日志权限'"
            >访问日志</el-dropdown-item
          >
          <el-dropdown-item command="9" v-if="this.$Cookies.get('username') == 'admin'">组织架构维护</el-dropdown-item>
          <el-dropdown-item command="15" v-if="$Cookies.get('username') == 'admin'">点数填报</el-dropdown-item>
          <el-dropdown-item command="16" v-if="$Cookies.get('username') == 'admin'">下发Token管理</el-dropdown-item>
          <el-dropdown-item command="17" v-if="$Cookies.get('username') == 'admin'">下发接口次数限制</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-button
        type="success"
        round
        v-if="showLargeBtn && $route.path == '/essInfo'"
        @click="larger"
        class="el-icon-full-screen"
      >
        全屏</el-button
      >
      <el-divider direction="vertical"></el-divider>
      <span style="margin-right: 20px;" @click="showUserInfo">
        <i class="el-icon-user-solid"></i>
        {{ $Cookies.get('username') }}</span
      >
      <el-divider direction="vertical"></el-divider>
      <span style="cursor: pointer;" @click="logOut">安全退出</span>
    </span>
    <el-button type="primary" v-else @click="openLoginDialog" style="float:right;margin-top: 12px;">登录</el-button>
    <!-- <span class="info" v-else @click="openLoginDialog">登录</span> -->
    <el-dialog title="登录" :visible.sync="dialogVisible" width="450px">
      <el-form :model="form" label-width="100px">
        <el-form-item label="用户名">
          <el-input v-model="form.username" style="width:250px"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" style="width:250px" type="password"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="login">登 录</el-button>
      </div>
    </el-dialog>

    <el-dialog title="账号设置" :visible.sync="userSettingDialog" width="450px" :rules="rules">
      <el-form :model="userSettingForm" :rules="rules" ref="userSettingForm">
        <el-form-item label="用户名：" label-width="100px">
          <el-input v-model="userSettingForm.username" disabled style="width:250px"></el-input>
        </el-form-item>
        <el-form-item label="姓名：" label-width="100px">
          <el-input v-model="userSettingForm.name" style="width:250px"></el-input>
        </el-form-item>
        <!-- <el-form-item label="密码：" label-width="100px" prop="password">
          <el-input v-model="userSettingForm.password" style="width:250px" type="password"> </el-input>
        </el-form-item> -->
        <el-form-item label="手机：" label-width="100px" prop="mobile">
          <el-input v-model="userSettingForm.mobile" style="width:250px"></el-input>
        </el-form-item>
        <el-form-item label="邮箱：" label-width="100px">
          <el-input v-model="userSettingForm.email" style="width:250px"></el-input>
        </el-form-item>
        <el-form-item label-width="100px">
          <el-button type="primary" plain size="small" @click="updatePwdVisible = true">修改密码</el-button>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="userSettingDialog = false">取 消</el-button>
        <el-button type="primary" @click="saveUserInfo('userSettingForm')">保 存</el-button>
      </div>
      <el-dialog width="410px" title="修改密码" :visible.sync="updatePwdVisible" append-to-body>
        <el-form :model="pwdForm" :rules="rules2" ref="pwdForm">
          <el-form-item label="原密码：" label-width="100px" prop="originPwd">
            <el-input v-model="pwdForm.originPwd" size="small" type="password" clearable style="width:220px">
              <i slot="suffix" class="el-icon-check" style="color: green;" v-if="originPwdValidateSuccess"></i>
            </el-input>
          </el-form-item>
          <el-form-item label="新密码：" label-width="100px" prop="newPwd">
            <el-input v-model="pwdForm.newPwd" size="small" type="password" clearable style="width:220px"></el-input>
          </el-form-item>
          <el-form-item label="密码强度：" label-width="100px">
            <div class="intensity">
              <span class="line" :class="[level.includes('low') ? 'low' : '']"></span>
              <span class="line" :class="[level.includes('middle') ? 'middle' : '']"></span>
              <span class="line" :class="[level.includes('high') ? 'high' : '']"></span>
              <div class="warningtext">
                由数字，小写字母，大写字母和字符中的任意二种组成，且长度不小于8位。
              </div>
            </div>
          </el-form-item>
          <el-form-item label="确认密码：" label-width="100px" prop="confirmNewPwd">
            <el-input
              v-model="pwdForm.confirmNewPwd"
              size="small"
              style="width:220px"
              clearable
              type="password"
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="resetPwdForm('pwdForm')">取 消</el-button>
          <el-button type="primary" @click="savePwd('pwdForm')">提 交</el-button>
        </div></el-dialog
      >
    </el-dialog>
    <!--		<el-dialog title="账号设置" :visible.sync="userSettingDialog" width="450px" :rules="rules">-->
    <!--			<el-form :model="userSettingForm" :rules="rules" ref="userSettingForm">-->
    <!--				<el-form-item label="用户名：" label-width="100px">-->
    <!--					<el-input v-model="userSettingForm.username" disabled style="width:250px"></el-input>-->
    <!--				</el-form-item>-->
    <!--				<el-form-item label="姓名：" label-width="100px">-->
    <!--					<el-input v-model="userSettingForm.name" style="width:250px"></el-input>-->
    <!--				</el-form-item>-->
    <!--				<el-form-item label="密码：" label-width="100px">-->
    <!--					<el-input v-model="userSettingForm.password" style="width:250px" type="password">-->
    <!--					</el-input>-->
    <!--				</el-form-item>-->
    <!--				<el-form-item label="手机：" label-width="100px">-->
    <!--					<el-input v-model="userSettingForm.mobile" style="width:250px"></el-input>-->
    <!--				</el-form-item>-->
    <!--				<el-form-item label="邮箱：" label-width="100px">-->
    <!--					<el-input v-model="userSettingForm.email" style="width:250px"></el-input>-->
    <!--				</el-form-item>-->
    <!--			</el-form>-->
    <!--			<div slot="footer" class="dialog-footer">-->
    <!--				<el-button @click="userSettingDialog = false">取 消</el-button>-->
    <!--				<el-button type="primary" @click="saveUserInfo('userSettingForm')">保 存</el-button>-->
    <!--			</div>-->
    <!--		</el-dialog>-->

    <ZxbReportApply :dialogXBVisible.sync="dialogXBVisible"></ZxbReportApply>
  </div>
</template>

<script>
import ZxbReportApply from './zxbReportApply'
import { encrypt, decrypt } from '@/utils/encrypt.js'
export default {
  inject: ['reload'],
  components: {
    ZxbReportApply,
  },
  data() {
    var validateMobile = (rule, value, callback) => {
      let TEL_REGEXP = /^[1][3,4,5,7,8,9][0-9]{9}$/
      if (value === '' || typeof value == 'undefined') {
        callback()
      } else if (value && !TEL_REGEXP.test(value)) {
        callback(new Error('请输入正确的手机号!'))
      } else {
        callback()
      }
    }
    var validatePassword = (rule, value, callback) => {
      let modes = 0
      if (value.length < 8) callback(new Error('密码长度不小于8位,需由数字、字母、字符中的两种组成。'))
      if (/\d/.test(value)) modes++ //数字
      if (/[a-z]/.test(value) || /[A-Z]/.test(value)) modes++ //字母
      // if (/[A-Z]/.test(value)) modes++; //大写
      if (/\W/.test(value)) modes++ //特殊字符

      if (value && modes < 2) {
        callback(new Error('密码长度不小于8位,需由数字、字母、字符中的两种组成。'))
      } else {
        callback()
      }
    }
    var validatePass = (rule, value, callback) => {
      /*if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (value.length < 8) {
          this.level=[];
          callback(new Error('密码长度不小于8位,需由数字、字母、字符中的两种组成。'))

        }

        // 校验是数字
        const regex1 = /^\d+$/
        // 校验字母
        const regex2 = /^[A-Za-z]+$/
        // 校验符号
        const regex3 = /^[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘'，。、]+$/
        if (regex1.test(value)) {
          this.level=[];
          this.level.push('low')
          callback(new Error('密码长度不小于8位,需由数字、字母、字符中的两种组成。'))
        } else if (regex2.test(value)) {
          this.level=[];
          this.level.push('low')
          callback(new Error('密码长度不小于8位,需由数字、字母、字符中的两种组成。'))
        } else if (regex3.test(value)) {
          this.level=[];
          this.level.push('low')
          callback(new Error('密码长度不小于8位,需由数字、字母、字符中的两种组成。'))
        } else if (/^[A-Za-z\d]+$/.test(value)) {
          this.level=[];
          this.level.push('low')
          this.level.push('middle')
          callback(new Error('密码长度不小于8位,需由数字、字母、字符中的两种组成。'))
        } else if (
          /^[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘'，。、\d]+$/.test(value)
        ) {
          this.level=[];
          this.level.push('low')
          this.level.push('middle')
          callback(new Error('密码长度不小于8位,需由数字、字母、字符中的两种组成。'))
        } else if (
          /^[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘'，。、A-Za-z]+$/.test(
            value
          )
        ) {
          this.level=[];
          this.level.push('low')
          this.level.push('middle')
          callback(new Error('密码长度不小于8位,需由数字、字母、字符中的两种组成。'))
        } else if (
          /^[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘'，。、A-Za-z\d]+$/.test(
            value
          )
        ) {
          this.level=[];
          this.level.push('low')
          this.level.push('middle')
          this.level.push('high')
        }
        if (this.pwdForm.confirmNewPwd !== '') {
          this.$refs.pwdForm.validateField('confirmNewPwd')
        }
        callback()*/
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        //6-20位包含字符、数字和特殊字符
        var ls = 0
        if (value !== '') {
          if (value.match(/([a-z])+/)) {
            ls++
          }
          if (value.match(/([0-9])+/)) {
            ls++
          }
          if (value.match(/([A-Z])+/)) {
            ls++
          }
          if (value.match(/([\W])+/) && !value.match(/(![\u4E00-\u9FA5])+/)) {
            ls++
          }
          if (value.length < 8 || value.length > 20) {
            callback(new Error('要求8-20位字符'))
            ls = 0
          }
          if (value.match(/([\u4E00-\u9FA5])+/)) {
            callback(new Error('不能包含中文字符'))
            ls = 0
          }
          if (value == this.pwdForm.originPwd) {
            callback(new Error('新密码不能与旧密码相同'))
            ls = 0
          }
          switch (ls) {
            case 0:
              this.level = []
              callback(new Error('需由数字、字母、字符中的两种组成。'))
              break
            case 1:
              this.level = ['low']
              callback(new Error('需由数字、字母、字符中的两种组成。'))
              break
            case 2:
              this.level = ['low', 'middle']
              break
            case 3:
            case 4:
              this.level = ['low', 'middle', 'high']
              break
            default:
              this.level = []
              break
          }
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.pwdForm.newPwd) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    var validateOriginPass = (rule, value, callback) => {
      if (value === '') {
        this.originPwdValidateSuccess = false
        callback(new Error('请输入密码'))
      } else {
        value = this.$md5(this.$Cookies.get('userCode') + value)
        this.$ajax.manage
          .verifyPassword({ userId: this.$Cookies.get('userId'), password: encrypt(value, '+jFQRKK1iietbcX=') })
          .then((res) => {
            if (res.data.code == '0' && res.data.flag) {
              this.originPwdValidateSuccess = true
              callback()
            } else {
              this.originPwdValidateSuccess = false
              callback(new Error('原密码输入错误'))
            }
          })
      }
    }
    return {
      originPwdValidateSuccess: false,
      level: [],
      rules2: {
        originPwd: [{ required: true, validator: validateOriginPass, trigger: 'blur' }],
        newPwd: [{ required: true, validator: validatePass, trigger: 'change' }],
        confirmNewPwd: [{ required: true, validator: validatePass2, trigger: 'change' }],
      },
      pwdForm: {
        originPwd: '',
        newPwd: '',
        confirmNewPwd: '',
      },
      updatePwdVisible: false,
      dialogVisible: false,
      form: {
        username: '',
        password: '',
      },
      loginUserName: '',
      userSettingDialog: false,
      userSettingForm: {
        // username: this.$Cookies.get('username'),
        username: this.$Cookies.get('userCode'),
        name: '',
        password: '',
        email: '',
        mobile: '',
      },
      showUserData: sessionStorage.getItem('username'),
      blacklistAudit: false,
      userManage: false,
      sub_manage: false,
      merchant: false,
      zxbreportAudit: false,
      blacklistApply: false,
      newsAll: false,
      zxbReportApply: false,
      zxbReportlist: false,
      dialogXBVisible: false,
      searchVal: '',
      latestSearchList: [],
      showLargeBtn: false,
      rules: {
        mobile: [{ validator: validateMobile, trigger: 'blur' }],
        password: [
          { required: true, message: '请输入密码', trigger: 'change' },
          //新增密码复杂度校验(Kern on 20210615)
          { validator: validatePassword, trigger: 'blur' },
        ],
      },
    }
  },
  created() {
    this.showLargeBtn = false
    if (this.$route.query.index == '1') {
      this.showLargeBtn = true
    }
    this.$Bus.$on('showDialog', () => {
      this.dialogVisible = true
    })
    this.$Bus.$on('showLargeBtn', (data) => {
      if (data == '1') {
        this.showLargeBtn = true
      } else {
        this.showLargeBtn = false
      }
    })
  },
  mounted() {
    if (this.$route.query.username) {
      this.skipLogin()
    }
    if (this.$route.query.searchVal) {
      this.searchVal = this.$route.query.searchVal
    }
    this.verifyPermissions()
    this.getLatestSearchList()
  },
  methods: {
    resetPwdForm(formName) {
      this.level = []
      this.$refs[formName].resetFields()
      this.updatePwdVisible = false
    },
    savePwd(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let param = {
            userId: this.$Cookies.get('userId'),
            password: encrypt(this.$md5(this.$Cookies.get('userCode') + this.pwdForm.originPwd), '+jFQRKK2iietbcX='),
            newpassword: encrypt(
              this.$md5(this.$Cookies.get('userCode') + this.pwdForm.confirmNewPwd),
              '+jFQRKK9iietbcX='
            ),
          }
          this.$ajax.manage.modifyPassword(param).then((res) => {
            if (res.data.code == '0') {
              this.$msgbox.alert('密码修改成功')

              this.$refs[formName].resetFields()
              this.level = []
              this.updatePwdVisible = false
            } else {
              this.$msgbox.alert(res.data.msg)

              this.$refs[formName].resetFields()
              this.level = []
              this.updatePwdVisible = false
            }
          })
        } else {
          return false
        }
      })
    },
    larger() {
      this.$Bus.$emit('largerWindow')
    },
    getNationCode() {
      this.$ajax.manage.getNationCode({}).then((res) => {
        // console.log(res);
        if (res.status == 200) {
          this.nationTypeOptions = res.data.nationCode
        }
      })
    },
    getLatestSearchList() {
      let param = {
        userId: this.$Cookies.get('userId'),
      }
      this.$ajax.manage.latestWords(param).then((res) => {
        // console.log(res)
        if (res.status == 200) {
          this.latestSearchList = res.data.latestWords.map((row) => {
            row.value = row.keyWord
            return row
          })
          // console.log('主档裤查询')
          // console.log(res.data.latestWords)
        }
      })
    },
    querySearch(queryString, cb) {
      // console.log(queryString)
      var latestSearchList = this.latestSearchList
      var results = queryString ? latestSearchList.filter(this.createFilter(queryString)) : latestSearchList
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter(queryString) {
      return (restaurant) => {
        return restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
      }
    },
    searchData() {
      if (this.searchVal == '') {
        this.$message.warning('请输入搜索内容')
        return
      } else {
        this.$router.push({
          path: '/searchResult',
          query: {
            searchVal: this.searchVal,
            isBlar: false,
          },
        })

        this.getLatestSearchList()
      }
    },
    verifyPermissions() {
      //权限
      let param = {
        userId: this.$Cookies.get('userId'),
        permissionPoint:
          'user.manage,user.sub_manage,blacklist.audit,blacklist.apply,zxbreport.audit,merchant.screening,news.all,zxbreport.apply,zxbreport.list',
      }
      this.$ajax.manage.verifyPermissions(param).then((res) => {
        // console.log(res)
        if (res.data.code == 0) {
          this.blacklistAudit = res.data.verifyPermissionResult['blacklist.audit']
          this.blacklistApply = res.data.verifyPermissionResult['blacklist.apply']
          this.userManage = res.data.verifyPermissionResult['user.manage']
          this.sub_manage = res.data.verifyPermissionResult['user.sub_manage']
          this.zxbreportAudit = res.data.verifyPermissionResult['zxbreport.audit']
          this.merchant = res.data.verifyPermissionResult['merchant.screening']
          this.newsAll = res.data.verifyPermissionResult['news.all']
          this.zxbReportApply = res.data.verifyPermissionResult['zxbreport.apply']
          this.zxbReportlist = res.data.verifyPermissionResult['zxbreport.list']
          if (this.userManage || this.sub_manage) {
            this.$Cookies.set('userManage', 'true')
          }
        }
      })
    },
    TycHandleCommand(command) {
      //TODO 组装天眼查URL
      let username = 'zjb_' + this.$Cookies.get('userCode')
      let sign = this.$md5(username + '44bce5ef-873e-4689-b515-a1ef9775aa82')
      this.tycUrl = `https://pro.tianyancha.com/cloud-std-security/aut/login.json?username=${username}&authId=lf2b4yqy4lsfgp1x&sign=${sign}&redirectUrl=`

      if (command == 1) {
        //幕后关系
        this.goToTycPage('幕后关系', '/found')
      } else if (command == 2) {
        //关联关系
        this.goToTycPage('关联关系', '/shortpath')
      } else if (command == 3) {
        //报告下载
        this.goToTycPage('报告下载', '/tools/download-report')
      } else if (command == 4) {
        //天眼地图
        this.goToTycPage('天眼地图', '/map')
      } else if (command == 5) {
        //资本市场公告
        this.goToTycPage('资本市场公告', '/announcement')
      } else if (command == 6) {
        //资本市场法规
        this.goToTycPage('资本市场法规', '/regulations')
      } else if (command == 7) {
        //资本成分穿透
        this.goToTycPage('资本成分穿透', '/tools/capital')
      } else if (command == 8) {
        //企业画像
        this.goToTycPage('企业画像', '/tools/portrait')
      } else if (command == 9) {
        //数据导出
        this.goToTycPage('数据导出', '/tools/export-company-list')
      } else if (command == 10) {
        //高级搜索
        this.goToTycPage('高级搜索', '/searchx')
      } else if (command == 11) {
        //监控管理
        this.goToTycPage('监控管理', '/std/monitor/event')
      }
    },
    handleCommand(command) {
      if (command == 1) {
        //黑名单申报
        // this.goHmdsb()
        this.$router.push({ path: '/BlackListDeclaration' })
      } else if (command == 2) {
        //黑名单审批
        // this.goHmdsp()
        this.$router.push({ path: '/BlacklistApproval' })
      } else if (command == 3) {
        //客商初筛
        // this.goKstb()
        this.$router.push({ path: '/InitialScreeningOfMerchants' })
      } else if (command == 4) {
        //信保报告申请
        this.applyReport()
      } else if (command == 5) {
        //用户管理
        if (this.$Cookies.get('username') != 'admin' && this.$Cookies.get('userManage') != 'true') {
          this.$message.warning('您暂没有查看该功能的权限，请联系管理员')
        } else {
          //55109783
          this.$router.push({
            path: '/userManage',
          })
        }
      } else if (command == 6) {
        this.$router.push({
          path: '/messageCenter',
          query: {
            activeName: 'first',
          },
        })
      } else if (command == 7) {
        this.$router.push({ path: '/zxbReportList' })
      } else if (command == 8) {
        this.$router.push({ path: '/visitLog' })
        // this.goLog()
      } else if (command == 9) {
        // this.goOrgEdit()
        this.$router.push({ path: '/orgManage' })
      } else if (command == 10) {
        this.$router.push({ path: '/ZxbApplyList' })
      } else if (command == 11) {
        this.$router.push({ path: '/RoleManage' })
      } else if (command == 12) {
        this.$router.push({ path: '/zxbApplyProgressList' })
      } else if (command == 13) {
        this.$router.push({ path: '/zxbMessageList' })
      } else if (command == 14) {
        this.$router.push({ path: '/creditCodeMaintain' })
        // this.goCreditCodeMaintenance()
      } else if (command == 15) {
        this.$router.push({ path: '/tycPointsDistribute' })
      } else if (command == 16) {
        this.$router.push({ path: '/TokenManage' })
      } else if (command == 17) {
        this.$router.push({ path: '/InterfaceUsedLimit' })
      }
    },
    goHmdsb() {
      this.$router.push({
        path: '/iframePage',
        query: {
          title: encodeURIComponent('黑名单申报'),
          url: encodeURIComponent(
            `${
              process.env.VUE_APP_FR_URL
            }/webroot/decision/view/form?viewlet=/Homepage/BlackList.cpt&op=write&userCode=${sessionStorage.getItem(
              'userCode'
            )}`
          ),
        },
      })
      this.reload()
    },
    goHmdsp() {
      this.$router.push({
        path: '/iframePage',
        query: {
          title: encodeURIComponent('黑名单审批'),
          url: encodeURIComponent(
            `${
              process.env.VUE_APP_FR_URL
            }/webroot/decision/view/form?viewlet=/Homepage/BlackList_check.cpt&op=write&userCode=${sessionStorage.getItem(
              'userCode'
            )}`
          ),
        },
      })
      this.reload()
    },
    goKstb() {
      this.$router.push({
        path: '/iframePage',
        query: {
          title: encodeURIComponent('客商填报'),
          url: encodeURIComponent(
            `${
              process.env.VUE_APP_FR_URL
            }/webroot/decision/view/form?viewlet=/Homepage/Merchants_Input.cpt&op=write&userCode=${sessionStorage.getItem(
              'userCode'
            )}`
          ),
        },
      })
      this.reload()
    },
    goLog() {
      this.$router.push({
        path: '/iframePage',
        query: {
          title: encodeURIComponent('访问日志'),
          url: encodeURIComponent(
            `${
              process.env.VUE_APP_FR_URL
            }/webroot/decision/view/form?viewlet=/Homepage/LOG.frm&userCode=${sessionStorage.getItem('userCode')}`
          ),
        },
      })
      debugger
      this.reload()
    },
    goCreditCodeMaintenance() {
      this.$router.push({
        path: '/iframePage',
        query: {
          title: encodeURIComponent('信保代码维护'),
          url: encodeURIComponent(
            `${
              process.env.VUE_APP_FR_URL
            }/webroot/decision/view/form?viewlet=/Homepage/INPUT_HR_ZXB_CLINETNO.cpt&op=write&userCode=${sessionStorage.getItem(
              'userCode'
            )}`
          ),
        },
      })
    },
    goOrgEdit() {
      this.$router.push({
        path: '/iframePage',
        query: {
          title: encodeURIComponent('组织架构维护'),
          url: encodeURIComponent(
            `${
              process.env.VUE_APP_FR_URL
            }/webroot/decision/view/form?viewlet=/Homepage/组织架构树填报.frm&userCode=${sessionStorage.getItem(
              'userCode'
            )}`
          ),
        },
      })
      this.reload()
    },
    openLoginDialog() {
      //打开登录弹框
      this.dialogVisible = true
    },
    login() {
      //登录
      if (this.form.username === '') {
        this.$message.warning('请输入用户名')
        return
      } else if (this.form.password === '') {
        this.$message.warning('请输入密码')
        return
      }
      let param = {
        username: this.form.username,
        password: this.form.password,
      }
      this.$ajax.manage.login(param).then((res) => {
        // console.log(res);
        if (res.data.code === '0') {
          this.$Cookies.set(this.$getCookieKey(), res.data.token, {
            expires: 30,
          })
          this.$Cookies.set('username', res.data.name, {
            expires: 30,
          })
          this.$Cookies.set('userCode', res.data.username, {
            expires: 30,
          })
          this.$Cookies.set('userId', res.data.userId, {
            expires: 30,
          })
          sessionStorage.setItem('username', res.data.name)
          sessionStorage.setItem('userCode', res.data.username)
          sessionStorage.setItem('userId', res.data.userId)
          this.dialogVisible = false
          this.loginUserName = res.data.name
          //this.reload()
          this.$router.push({
            path: '/homePage',
          })
          this.reload()
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    goToTycPage(title, uri) {
      this.$router.push({
        path: '/iframePage',
        query: {
          title: encodeURIComponent(title),
          url: encodeURIComponent(this.tycUrl + uri),
        },
      })
      this.reload()
    },
    logOut() {
      //退出
      this.$Cookies.remove(this.$getCookieKey())
      this.$Cookies.remove('username')
      this.$Cookies.remove('userCode')
      this.$Cookies.remove('userId')
      this.$Cookies.remove('companyCode')
      sessionStorage.removeItem('username')
      sessionStorage.removeItem('userCode')
      sessionStorage.removeItem('userId')
      this.$router.push({
        path: '/',
      })
      this.reload()
      // this.$router.go(0);
    },
    skipLogin() {
      let param = {
        username: this.$route.query.username,
        loginType: 'skip',
      }
      this.$ajax.manage.login(param).then((res) => {
        // console.log(res);
        if (res.data.code === '0') {
          this.$Cookies.set(this.$getCookieKey(), res.data.token, {
            expires: 30,
          })
          this.$Cookies.set('username', res.data.name, {
            expires: 30,
          })
          this.$Cookies.set('userCode', res.data.username, {
            expires: 30,
          })
          this.$Cookies.set('userId', res.data.userId, {
            expires: 30,
          })
          this.$Cookies.set('companyCode', res.data.companyCode, {
            expires: 30,
          })
          this.$Cookies.set('companyName', res.data.companyName, {
            expires: 30,
          })
          sessionStorage.setItem('username', res.data.name)
          sessionStorage.setItem('userCode', res.data.username)
          sessionStorage.setItem('userId', res.data.userId)
          this.loginUserName = res.data.name
          this.$router.push({
            path: '/homePage',
          })
          this.reload()
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    showUserInfo() {
      //维护用户基本信息弹框
      this.userSettingDialog = true
      this.getUserInfo()
    },
    getUserInfo() {
      //获取用户信息
      let param = {
        userId: this.$Cookies.get('userId'),
      }
      this.$ajax.manage.getUserInfo(param).then((res) => {
        // console.log(res);
        if (res.status == 200) {
          this.userSettingForm.name = res.data.user.name
          this.userSettingForm.password = res.data.user.password
          this.userSettingForm.email = res.data.user.email
          this.userSettingForm.mobile = res.data.user.mobile
        }
      })
    },
    saveUserInfo(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let param = {
            userId: this.$Cookies.get('userId'),
            username: this.$Cookies.get('userCode'),
            name: this.userSettingForm.name,
            password: this.userSettingForm.password,
            email: this.userSettingForm.email,
            mobile: this.userSettingForm.mobile,
          }
          this.$ajax.manage.updateUser(param).then((res) => {
            // console.log(res);
            if (res.data.code == 0) {
              this.$message.success(res.data.msg)
              this.userSettingDialog = false
            }
          })
        } else {
          return false
        }
      })
    },
    // saveUserInfo() {
    //   let param = {
    //     userId: this.$Cookies.get("userId"),
    //     username: this.$Cookies.get("userCode"),
    //     name: this.userSettingForm.name,
    //     password: this.userSettingForm.password,
    //     email: this.userSettingForm.email,
    //     mobile: this.userSettingForm.mobile
    //   }
    //   this.$ajax.manage.updateUser(param).then(res => {
    //     console.log(res);
    //     if (res.data.code == 0) {
    //       this.$message.success(res.data.msg);
    //       this.userSettingDialog = false
    //     }
    //   })
    // },
    clearUserForm() {
      this.userSettingForm = {
        // username: this.$Cookies.get('username'),
        username: this.$Cookies.get('userCode'),
        name: '',
        password: '',
        email: '',
        mobile: '',
      }
    },
    goHome() {
      //
      // console.log(this.$route);
      this.$router.push({
        path: '/homePage',
      })
      // if (this.$route.path == '/') {
      //     this.reload();
      // } else {
      //     this.$router.push({ path: '/' });
      // }
    },
    applyReport() {
      //打开报告申请弹框
      this.dialogXBVisible = true
    },
    searchBlarSearch() {
      if (this.searchVal == '') {
        this.$message('请输入搜索内容')
        return
      } else {
        this.$router.push({
          path: '/searchResult',
          query: {
            searchVal: this.searchVal,
            isBlar: true,
          },
        })
      }
    },
  },
}
</script>
<style>
.el-dropdown-link {
  cursor: pointer;
  color: #333333;
}

.el-icon-arrow-down {
  font-size: 12px;
}
</style>
<style lang="less" scoped>
.header-box {
  // background: url(../../public/img/header.png) no-repeat;
  // background-size: cover;
  .el-dropdown/deep/ {
    height: 40px;
    //float: right;
  }

  .el-dialog__header/deep/ {
    line-height: 20px;
  }

  line-height: 60px;
  white-space: nowrap;
  overflow: hidden;
  //margin-bottom: 10px;
  // background: #1b7fbd;
  background-color: #fff;
  padding: 0 60px;
  position: relative;

  img {
    height: 40px;
    cursor: pointer;
  }

  .title {
    font-size: 16px;
    font-weight: bold;
    color: rgba(71, 140, 209, 1);
    margin-left: 16px;
    //color: #fff;
    color: #333333;

    img {
      vertical-align: middle;
    }
  }

  .info {
    float: right;
    margin-right: 38px;
    font-size: 16px;
    color: #333333;
    cursor: pointer;
    color: #333333;

    span {
      &:hover {
        color: #409eff;
      }
    }

    .infoImg {
      display: inline-block;
      width: 20px;
      height: 20px;
      vertical-align: middle;
      margin-right: 6px;
    }
  }
}
.intensity {
  .psdText {
    font-size: 14px;
    margin-right: 10px;
  }
  .line {
    display: inline-block;
    width: 48px;
    height: 4px;
    background: #d8d8d8;
    border-radius: 3px;
    margin-right: 8px;
    &.low {
      background: #f4664a;
    }
    &.middle {
      background: #ffb700;
    }
    &.high {
      background: #2cbb79;
    }
  }
  .level {
    margin: 0 16px 0 8px;
  }
  .warningtext {
    color: #5a5a5a;
    font-size: 12px;
    margin-top: 5px;
  }
}
</style>
