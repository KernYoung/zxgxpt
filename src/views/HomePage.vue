<!-- 首页 -->
<template>
  <div class="main-wrapper">
    <div class="search-content">
      <div class="header-box">
        <img src="../../public/img/logo2.png" alt="" >
        <span style="font-size:16px">
          <el-button type="primary" round @click="downloadFile" style="margin: 0 10px">用户手册下载</el-button>
           <el-dropdown style="margin-right:20px" @command="TycHandleCommand">
            <el-button type="primary" round>
              高级应用<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
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
            </el-dropdown-menu>
          </el-dropdown>
          <el-dropdown style="margin-right:20px" @command="handleCommand">
            <el-button type="primary" round>
              常用应用<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="1" v-if="blacklistApply">黑名单申报</el-dropdown-item>
              <el-dropdown-item command="2" v-if="blacklistAudit">黑名单审批</el-dropdown-item>
              <el-dropdown-item command="3" v-if="merchant">客商初筛</el-dropdown-item>
              <el-dropdown-item command="4" v-if="zxbReportApply">信保报告申请</el-dropdown-item>
              <el-dropdown-item command="7" v-if="zxbReportlist">信保报告列表</el-dropdown-item>
              <el-dropdown-item command="10" v-if="zxbreportAudit">信保报告审核</el-dropdown-item>
              <el-dropdown-item command="5" v-if="userManage||sub_manage">用户管理</el-dropdown-item>
              <el-dropdown-item command="11" v-if="$Cookies.get('username')=='admin'">角色管理</el-dropdown-item>
              <el-dropdown-item command="6" v-if="newsAll">消息中心</el-dropdown-item>
              <el-dropdown-item command="8" v-if="$Cookies.get('username')=='admin'">访问日志</el-dropdown-item>
              <el-dropdown-item command="9" v-if="$Cookies.get('username')=='admin'">组织架构维护</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span style="margin-right: 15px;cursor:pointer" @click="showUserInfo">
            <el-avatar icon="el-icon-user-solid" size="small"></el-avatar>
            {{$Cookies.get('username')}}
          </span>
          <span style="cursor: pointer;" @click="logOut">安全退出</span>
        </span>
      </div>
      <div class="title">
        <div style="margin-bottom:10px"><img src="../../public/img/title.png" alt=""></div>
        <div><img src="../../public/img/subtitle.png" alt=""></div>
      </div>
      <div class="content" style="position: relative">
		  <el-input placeholder="请输入内容" v-model="searchVal" class="search-input" style="width: 800px;height:60px;"
		    clearable="" @keyup.enter.native="seachContent">
		  </el-input>
		  <el-button @click="seachContent" style="background-color: rgb(73, 136, 191);margin-left: 10px;">站内搜索
		  </el-button>
		  <el-button @click="blarSearch" >全网搜索</el-button>
        <!-- <el-input @keyup.enter="seachContent" placeholder="请输入内容" v-model="searchVal" class="search-input" style="width: 800px;height: 60px;"
                   clearable="" @keyup.enter.native="seachContent">
         </el-input>
         <el-button @click="seachContent" style="position: absolute;position: absolute;right: 444px;background-color: rgb(73, 136, 191); top: 1px;">站内搜索</el-button>
         <el-button @click="blarSearch" style="position: absolute;right: 318px;top: 1px;">全网搜索</el-button> -->
      </div>
      <div class="latest-search">
        最近搜索：
        <span v-for="item in latestSearchList" :key="item.id" @click="searchCompany(item)">{{item.keyWord}}</span>
      </div>
    </div>
    <div v-if="showBox==1">
      <div class="main-content">
        <div class="content-item leftBox">
          <div class="title">
            <span>关注清单</span>
          </div>
          <div class="tab-content-wrapper">
            <div v-for="(item,index) in careList" :key="index" class="care-list">
              <img src="../../public/img/focus.png" alt="" @click="cancleFocus(item)">
              <span @click="moreNews(item,'0')">{{item.companyName}}</span>
              <img src="../../public/img/images/index_icon01.png" alt="" v-if="item.zhongchengxin===1" class="care">
              <img src="../../public/img/images/index_icon02.png" alt="" v-if="item.tianyancha===1" class="care">
            </div>
          </div>
        </div>
        <div class="content-item rightBox">
          <div class="title">
            <span>黑名单</span>
          </div>
          <div class="tab-content-wrapper">
            <div v-for="(item,index) in blackListData" :key="index" class="care-list">
              <img src="../../public/img/focusB.png" alt="">
              <span @click="moreNews(item,'0')">{{item.entName}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showBox==2">
      <div class="main-content">
        <div class="content-item " style="width:80%">
          <div class="title">
            <span>检索结果</span>
            <span class="text">
              根据关键字，共搜索到 {{searchList.length>0?searchList.length:0}} 条数据结果，结果来自
              {{sourceType}}
<!--              <a class="postLink" @click="blarSearch">模糊接口查询</a>-->
            </span>
          </div>
          <div class="main">
            <ul class="proList_li " v-if="searchList.length>0">
              <li class="clear" v-for="(item,index) in searchList" :key=" index">
                <div class="fl-left proList_content">
                  <span v-if="item.isBlack" style="color:white;background-color: #c1c1c1;padding: 3px;float: right">黑名单</span>
                  <p class="proList_txt" @click="moreNews(item,'0')"
                    v-html="brightenKeyword(item.companyName,searchVal)">
                  </p>
                  <p>社会统一信用代码：{{item.creditCode}}</p>
                  <p>法人代表：{{item.operName}}</p>
                  <p>成立时间：{{item.buildDate}}</p>
                </div>
                <dl class="fl-right proList_btn">
                  <el-button plain type="primary" size="medium" @click="moreNews(item,'0')">企业基本信息
                  </el-button>
                  <el-button plain type="primary" size="medium" @click="moreNews(item,'1')">工商舆情
                  </el-button>
                </dl>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <el-dialog title="账号设置" :visible.sync="userSettingDialog" width="450px">
      <el-form :model="userSettingForm">
        <el-form-item label="用户名：" label-width="100px">
          <el-input v-model="userSettingForm.username" disabled style="width:250px"></el-input>
        </el-form-item>
        <el-form-item label="姓名：" label-width="100px">
          <el-input v-model="userSettingForm.name" style="width:250px"></el-input>
        </el-form-item>
        <el-form-item label="密码：" label-width="100px">
          <el-input v-model="userSettingForm.password" style="width:250px" type="password">
          </el-input>
        </el-form-item>
        <el-form-item label="手机：" label-width="100px">
          <el-input v-model="userSettingForm.mobile" style="width:250px"></el-input>
        </el-form-item>
        <el-form-item label="邮箱：" label-width="100px">
          <el-input v-model="userSettingForm.email" style="width:250px"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="userSettingDialog = false">取 消</el-button>
        <el-button type="primary" @click="saveUserInfo">保 存</el-button>
      </div>
    </el-dialog>
    <ZxbReportApply :dialogXBVisible.sync="dialogXBVisible"></ZxbReportApply>
  </div>
</template>

<script>
import ZxbReportApply from "../components/zxbReportApply";
export default {
  components:{
    ZxbReportApply,
  },
  data () {
    return {
      searchVal: '',
      latestSearchList: [],
      activeUserTab: '1',
      searchList: [],
      sourceType: '',
      showBox: 1,
      careList: [],
      blackListData: [],
      userSettingDialog: false,
      userSettingForm: {
        // username: this.$Cookies.get('username'),
        username: this.$Cookies.get('userCode'),
        name: '',
        password: '',
        email: '',
        mobile: ''
      },
	  blacklistAudit:false,
	  userManage: false,
      merchant:false,
      sub_manage: false,
      newsAll:false,
      zxbreportAudit:false,
      zxbReportApply:false,
      zxbReportlist:false,
	  blacklistApply: false,
      dialogXBVisible: false,
    }
  },
  created(){
	  if(this.$route.query.searchVal){
		  this.searchVal=this.$route.query.searchVal;
		  this.seachContent()
	  }
    if(this.$route.query.tokenIsOut){
      this.message("您的帐号在另一地点登录，您已被迫下线");
    }
  },
  mounted () {
    if (this.$Cookies.get(this.$getCookieKey())) {
      this.getLatestSearchList();
      this.getCareList();//关注清单
      this.getBlackList();//黑名单
	  this.verifyPermissions();
    }
  },
  methods: {
	verifyPermissions(){
		//权限
		let param = {
			userId: this.$Cookies.get("userId"),
			permissionPoint:"user.manage,user.sub_manage,blacklist.audit,blacklist.apply,zxbreport.audit,merchant.screening,news.all,zxbreport.apply,zxbreport.list"
		}
		this.$ajax.manage.verifyPermissions(param).then(res=>{
			console.log(res)
			if(res.data.code==0){
				// for(let i in res.data.verifyPermissionResult){
				// 	this.blacklistAudit = res.data.verifyPermissionResult
				// }
				this.blacklistAudit = res.data.verifyPermissionResult['blacklist.audit'];
				this.blacklistApply = res.data.verifyPermissionResult['blacklist.apply']
				this.userManage = res.data.verifyPermissionResult['user.manage']
				this.sub_manage = res.data.verifyPermissionResult['user.sub_manage']
        this.zxbreportAudit = res.data.verifyPermissionResult['zxbreport.audit'];
				this.merchant = res.data.verifyPermissionResult['merchant.screening'];
        this.newsAll = res.data.verifyPermissionResult['news.all'];
        this.zxbReportApply = res.data.verifyPermissionResult['zxbreport.apply'];
        this.zxbReportlist  = res.data.verifyPermissionResult['zxbreport.list'];
        if(this.userManage||this.sub_manage){
          this.$Cookies.set('userManage','true');
        }
        console.log(res.data)
			}
		})
	},
    goHmdsb () {
      this.$router.push({
        path: '/iframePage',
        query: {
          title: encodeURIComponent('黑名单申报'),
          url: encodeURIComponent(`${process.env.VUE_APP_FR_URL}/webroot/decision/view/form?viewlet=/Homepage/BlackList.cpt&op=write&userCode=${sessionStorage.getItem('userCode')}`)
        }
      })
    },
    goHmdsp () {
      this.$router.push({
        path: '/iframePage',
        query: {
          title: encodeURIComponent('黑名单审批'),
          url: encodeURIComponent(`${process.env.VUE_APP_FR_URL}/webroot/decision/view/form?viewlet=/Homepage/BlackList_check.cpt&op=write&userCode=${sessionStorage.getItem('userCode')}`)
        }
      })
    },
    goKstb () {
      console.log(process.env);
      this.$router.push({
        path: '/iframePage',
        query: {
          title: encodeURIComponent('客商填报'),
          url: encodeURIComponent(`${process.env.VUE_APP_FR_URL}/webroot/decision/view/form?viewlet=/Homepage/Merchants_Input.cpt&op=write&userCode=${sessionStorage.getItem('userCode')}`)
        }
      })
    },
    goLog (){
      this.$router.push({
        path: '/iframePage',
        query: {
          title: encodeURIComponent('访问日志'),
          url: encodeURIComponent(`${process.env.VUE_APP_FR_URL}/webroot/decision/view/form?viewlet=/Homepage/LOG.frm&userCode=${sessionStorage.getItem('userCode')}`)
        }
      })
    },
    goOrgEdit (){
      this.$router.push({
        path: '/iframePage',
        query: {
          title: encodeURIComponent('组织架构维护'),
          url: encodeURIComponent(`${process.env.VUE_APP_FR_URL}/webroot/decision/view/form?viewlet=/Homepage/组织架构树填报.frm&userCode=${sessionStorage.getItem('userCode')}`)
        }
      })
    },
    getUserInfo () {
      //获取用户信息
      let param = {
        userId: this.$Cookies.get("userId")
      };
      this.$ajax.manage.getUserInfo(param).then(res => {
        console.log(res);
        if (res.status == 200) {
          this.userSettingForm.name = res.data.user.name;
          this.userSettingForm.password = res.data.user.password;
          this.userSettingForm.email = res.data.user.email;
          this.userSettingForm.mobile = res.data.user.mobile;
        }
      })
    },
    goToTycPage(title,uri){
      this.$router.push({
        path: '/iframePage',
        query: {
          title: encodeURIComponent(title),
          url: encodeURIComponent(this.tycUrl+uri)
        }
      })
    },
    logOut () {
      //退出
      this.$Cookies.remove(this.$getCookieKey());
      this.$Cookies.remove('username');
      this.$Cookies.remove('userCode');
      this.$Cookies.remove('userId');
      this.$Cookies.remove('companyCode');
      sessionStorage.removeItem('username');
      sessionStorage.removeItem('userCode');
      sessionStorage.removeItem('userId');
      this.$router.push({ path: '/' });
      // this.$router.go(0);
    },
    saveUserInfo () {
      let param = {
        userId: this.$Cookies.get("userId"),
        username: this.$Cookies.get("userCode"),
        name: this.userSettingForm.name,
        password: this.userSettingForm.password,
        email: this.userSettingForm.email,
        mobile: this.userSettingForm.mobile
      }
      this.$ajax.manage.updateUser(param).then(res => {
        console.log(res);
        if (res.data.code == 0) {
          this.$message.success(res.data.msg);
          this.userSettingDialog = false
        }
      })
    },
    clearUserForm () {
      this.userSettingForm = {
        // username: this.$Cookies.get('username'),
        username: this.$Cookies.get('userCode'),
        name: '',
        password: '',
        email: '',
        mobile: ''
      }
    },
    showUserInfo () {
      //维护用户基本信息弹框
      this.userSettingDialog = true;
      this.getUserInfo()
    },
    TycHandleCommand(command){
        //TODO 组装天眼查URL
        let username = "zjb_"+this.$Cookies.get('userCode');
        let sign = this.$md5(username+"44bce5ef-873e-4689-b515-a1ef9775aa82");
        this.tycUrl = `https://pro.tianyancha.com/cloud-std-security/aut/login.json?username=${username}&authId=lf2b4yqy4lsfgp1x&sign=${sign}&redirectUrl=`

        if(command == 1){
          //幕后关系
            this.goToTycPage("幕后关系","/found");
        }else if(command == 2){
          //关联关系
          this.goToTycPage("关联关系","/shortpath");
        }else if(command == 3){
          //报告下载
          this.goToTycPage("报告下载","/tools/download-report");
        }else if(command == 4){
          //天眼地图
          this.goToTycPage("天眼地图","/map");
        }else if(command == 5){
          //资本市场公告
          this.goToTycPage("资本市场公告","/announcement");
        }else if(command == 6){
          //资本市场法规
          this.goToTycPage("资本市场法规","/regulations");
        }else if(command == 7){
          //资本成分穿透
          this.goToTycPage("资本成分穿透","/tools/capital");
        }else if(command == 8){
          //企业画像
          this.goToTycPage("企业画像","/tools/portrait");
        }else if(command == 9){
          //数据导出
          this.goToTycPage("数据导出","/tools/export-company-list");
        }

    },
    handleCommand (command) {
      console.log(command)
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
          this.$router.push({ path: '/userManage' })
        }
      } else if (command == 6) {
        this.$router.push({ path: '/messageCenter' })
      } else if (command == 7) {
        this.$router.push({ path: '/zxbReportList' })
      } else if (command == 8){
        this.goLog()
      } else if (command == 9) {
        this.goOrgEdit()
      } else if (command == 10) {
        this.$router.push({ path: '/ZxbApplyList' })
      }else if(command == 11){
        this.$router.push({ path: '/RoleManage' })
      }
    },
    getBlackList () {
      let param = {
        "userCode": sessionStorage.getItem('userCode')
      }
      this.$ajax.manage.getBlackList(param).then(res => {
        if (res.data.code == 0) {
          this.blackListData = res.data.blackList
        }
      })
    },
    seachContent () {
      if (this.searchVal == '') {
        this.showBox = 1;
        this.$message.warning('请输入查询内容');
        return;
      } else {
        //已登录=>搜索
        let param = {
          "keyword": this.searchVal,
          "page": 1,
          "userId": parseInt(this.$Cookies.get('userId'))
        }
        this.$ajax.manage.getSearchList(param).then(res => {
          console.log(res);
          if (res.status == 200) {
            //console.log(res.data);
            this.searchList = res.data.searchList
            this.getIsBlack(this.blackListData,this.searchList)
            this.sourceType = res.data.sourceType;
            this.showBox = 2;
            this.getLatestSearchList()
          }
        })
      }
    },
    getLatestSearchList () {
      let param = {
        userId: this.$Cookies.get('userId')
      }
      this.$ajax.manage.latestWords(param).then(res => {
        if (res.status == 200) {
          this.latestSearchList = res.data.latestWords
        }
      })
    },
    moreNews (item, index) {
      if (index === 0) {
        //基本信息
      } else if (index === 1) {
        //天眼查
      } else if (index === 2) {
        //中信保
      } else if (index === 3) {
        //中诚信
      } else if (index === 4) {
        //更多详情
      }
      if(item.entName){
        this.$ajax.manage.getCompanyInfoByName({companyName:item.entName}).then(res=>{
          if(res.status == 200){
            if(res.data.code == 0){
              item.id = res.data.company.id
              item.companyName = res.data.company.companyName
              item.companyId = res.data.company.companyId
              item.creditCode = res.data.company.creditCode
            }else{
              this.$message.error(res.data.msg)
              return
            }
            this.$router.push({
              path: '/essInfo',
              query: {
                id: item.id,
                companyName: item.companyName,
                companyId: item.companyId,
                creditCode: item.creditCode,
                index: index
              }
            })
          }
        });
      }else{
        this.$router.push({
          path: '/essInfo',
          query: {
            id: item.id,
            companyName: item.companyName,
            companyId: item.companyId,
            creditCode: item.creditCode,
            index: index
          }
        })
      }
    },
    getCareList () {
      //关注清单列表
      let param = {
        userId: this.$Cookies.get('userId')
      }
      this.$ajax.manage.getCareList(param).then(res => {
        if (res.data.code == 0) {
          this.careList = JSON.parse(res.data.careList)
        }
      })
    },
    cancleFocus (item) {
      //取消关注
      let param = {
        "userId": this.$Cookies.get('userId'),
        "companyId": item.companyId,
        "zhongchengxin": 0,
        "zhongxinbao": 0
      }
      this.$ajax.manage.careOrNot(param).then(res => {
        console.log(res);
        if (res.data.code == 0) {
          this.$message.success(res.data.msg);
          this.getCareList()
        } else {
          this.$message.error(res.data.msg);
        }
      })
    },
    blarSearch () {
      //模糊接口查询
      let param = {
        keyword: this.searchVal,
        userId: this.$Cookies.get('userId'),
        page: 1
      }
      this.$ajax.manage.directSearchList(param).then(res => {
        if (res.status == 200) {
          this.searchList = res.data.searchList
          this.getIsBlack(this.blackListData,this.searchList);
          this.sourceType = res.data.sourceType;
          this.showBox = 2;
        }
      })
    },
    searchCompany (item) {
      this.searchVal = item.keyWord;
      this.seachContent()
    },
    //搜索高亮
    brightenKeyword (val, keyword) {
      keyword = keyword.replace(/\s*/g,'');
      if (keyword.length > 0) {
        let keywordArr = keyword.split("");
        val = val + "";
        keywordArr.forEach(item => {
          if (val.indexOf(item) !== -1 && item !== "") {
            val = val.replace(
              new RegExp(item, 'g'),
              '<font color="#f75353">' + item + "</font>");
          }
        });
        return val;
      } else {
        return val;
      }
    },
    applyReport () {
      //打开报告申请弹框
      this.dialogXBVisible = true;
    },
    downloadFile() {
      //用户手册下载
      let param = {
        userId: parseInt(this.$Cookies.get('userId')),
        "noticeSerialno":"用户手册.docx",
      }
      this.$ajax.manage.getPDF(param).then(res => {
        const content = res.data
          const blob = new Blob([content])
          console.log(res.data)
          const fileName = '用户手册.docx'
          if ('download' in document.createElement('a')) { // 非IE下载
            const elink = document.createElement('a')
            elink.download = '用户手册.docx'
            elink.style.display = 'none'
            elink.href = URL.createObjectURL(blob)
            console.log(elink.href);
            document.body.appendChild(elink)
            elink.click()
            URL.revokeObjectURL(elink.href) // 释放URL 对象
            document.body.removeChild(elink)
          } else { // IE10+下载
            navigator.msSaveBlob(blob, '用户手册.docx')
          }
      })
    },
    getIsBlack(blackList,searchList){
      for(let i = 0; i < searchList.length; i++){
        searchList[i].isBlack = false;
        for(let j = 0; j < blackList.length; j++){
          if(blackList[j].code == searchList[i].creditCode){
            searchList[i].isBlack = true;
          }
        }
      }
      console.log(searchList)
    }
  },
}
</script>
<style>
.el-card {
  border: none;
  background: #f8f8f8;
}
</style>
<style lang="less" scoped>
.main-wrapper {
  width: 100%;
  height: 100%;
  overflow: auto;
  .search-content {
    /deep/.el-avatar--small {
      position: relative;
      top: 9px;
      background: #00a4ff;
      color: #333333;
    }
    height: 515px;
    width: 100%;
    text-align: center;
    box-sizing: border-box;
    background: url(../../public/img/bg.png) no-repeat;
    background-size: cover;
    .header-box {
	  padding: 0 20px;
      height: 70px;
      background: none;
      display: flex;
      justify-content: space-between;
      color: #fff !important;
      line-height: 70px;
      position: relative;
      img {
        vertical-align: middle;
        position: relative;
        top: 10px;
		height: 44px;
      }
    }
    .title {
      font-size: 40px;
      color: #fff;
      width: 100%;
      margin-top: 100px;
      margin-bottom: 20px;
    }
    .content {
      /deep/.el-button {
        border-radius: 0;
        height: 58px;
        width: 121px;
        background: #409eff;
        color: #fff;
        //border-top-right-radius: 38px;
        //border-bottom-right-radius: 38px;
        border: none;
        font-size: 20px;
        font-weight: bold;
      }
      /deep/.el-input__inner {
        height: 60px;
        line-height: 76px;
        font-size: 16px;
        //border-top-left-radius: 38px;
        //border-bottom-left-radius: 38px;
        padding: 0 30px;
        font-size: 20px;
        border: 1px solid #00f1fe;
        box-sizing: border-box;
        color: #9b9b9b;
        background: none;
      }
      /deep/.el-input-group__append,
      .el-input-group__prepend {
        border: none;
      }
    }
    .latest-search {
      font-size: 14px;
      color: #fff;
      margin: 25px auto;
      text-align: left;
      width: 920px;
      font-size: 16px;
      span {
        color: #00f1fe;
        margin-right: 20px;
        cursor: pointer;
        &:hover {
          color: #fff;
        }
      }
    }
  }

  .main-content {
    margin: auto;
    // display: flex;
    text-align: center;
    margin-top: 20px;
    .content-item {
      padding: 15px 10px;
      background: #f8f8f8;
      //box-shadow: 0 0 5px 5px #e3e3e3;
      display: inline-block;
      text-align: left;
      box-sizing: border-box;
      .tab-content-wrapper {
        div {
          height: 46px;
          line-height: 46px;
          background: #efefef;
          font-size: 16px;
          margin-bottom: 10px;
          box-sizing: border-box;
          padding: 0 10px;
          &:hover {
            border: 1px solid #409eff;
          }
        }
      }
    }

    .leftBox {
      margin-right: 30px;
      width: 500px;
      vertical-align: top;
    }

    .rightBox {
      width: 500px;
      vertical-align: top;
    }

    .title {
      margin-bottom: 10px;
      font-size: 16px;
      font-weight: bold;

      .icon {
        display: inline-block;
        width: 5px;
        height: 20px;
        background: #1b7fbd;
        vertical-align: middle;
        margin-right: 5px;
      }

      .text {
        font-size: 12px;
        color: #999;
        float: right;

        .postLink {
          color: #1b7fbd;
          text-decoration-line: underline;
          margin-left: 10px;
          cursor: pointer;
        }
      }
    }

    .main {
      .proList_li {
        li {
          padding: 10px;
          border-bottom: 1px solid #d3d3d3;
        }

        .clear {
          font-size: 12px;
          color: #666;
          display: flex;
          justify-content: space-between;
          border-bottom: 1px solid #e3e3e3;

          .pro_content_right {
            display: flex;
            align-items: center;
          }
        }

        .proList_txt {
          font-weight: 600;
          margin-bottom: 5px;
          color: #000;
          font-size: 14px;
          cursor: pointer;
        }

        .proList_btn {
          display: flex;
          align-items: center;
          // width: 40%;
          // text-align: right;
          // position: relative;
          // top: 25px;
        }
      }
    }
  }

  .usually-box {
    width: 1300px;
    padding: 20px;
    background: #f8f8f8;
    box-shadow: 0 0 5px 5px #e3e3e3;
    margin: 15px auto;
    box-sizing: border-box;

    .title {
      margin-bottom: 10px;

      .icon {
        display: inline-block;
        width: 5px;
        height: 20px;
        background: #1b7fbd;
        vertical-align: middle;
        margin-right: 5px;
      }
    }

    .img-box {
      display: inline-block;
      text-align: center;
      width: 120px;
      font-size: 14px;

      img {
        width: 30px;
        height: 30px;
        margin-bottom: 10px;
      }
    }
  }
  .tab-content-wrapper {
    min-height: 240px;
    overflow: auto;

    .tab-content {
      border: 1px solid #e3e3e3;
      border-top: 2px solid #1b7fbd;
      padding: 10px 20px;
      margin-bottom: 10px;

      p {
        display: flex;
        justify-content: space-between;
        line-height: 28px;
      }
      .status-style {
        border-radius: 20%;
        padding: 3px;
        color: #fff;
        margin-left: 5px;
        text-align: center;
        font-size: 12px;
      }
    }

    .care-list {
      height: 36px;
      line-height: 36px;
      font-size: 14px;

      &:hover {
        background: #efefef;
        cursor: pointer;
      }

      span {
        margin: 0 5px;
      }

      img {
        width: 24px;
        height: 24px;
        vertical-align: middle;
        position: relative;
        bottom: 2px;
      }

      .care {
        width: 20px;
        height: 20px;
        margin: 0 5px;
      }
    }
  }
  table {
    width: 100%;
    text-align: center;
    border-collapse: collapse;
    border-spacing: 0;
    border: 1px solid #e3e3e3;
    margin: 15px auto;
    table-layout: fixed;
    td {
      word-break: break-all;
      /*允许在字内换行,即单词可分*/
      word-wrap: break-word;
      /*允许长单词或URL地址换行*/
      border-right: 1px solid #e3e3e3;
      border-bottom: 1px solid #e3e3e3;
      font-size: 14px;
      height: 36px;
    }

    .gbGray {
      background: #f1f3f4;
    }
  }

}
</style>