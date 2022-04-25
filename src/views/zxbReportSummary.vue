<template>
  <div class="zxbReportSummary">
    <pre style="font-size: 18px">
    </pre>
    信保基本信息
    <table border="1" style=" width: 100%;
	                        text-align: center;
	                        border-collapse: collapse;
	                        border-spacing: 0;
	                        border: 1px solid #e3e3e3;
	                        margin: 15px auto;
	                        table-layout: fixed;">
      <tr>
        <td style="background: #f1f3f4;">企业中文名称</td>
        <td>{{businessInfo.buyerchnName}}</td>
        <td style="background: #f1f3f4;">企业英文名称</td>
        <td>{{businessInfo.buyerengName}}</td>
        <td style="background: #f1f3f4;">报告编号</td>
        <td>{{businessInfo.reportNo}}</td>
      </tr>
      <tr>
        <td style="background: #f1f3f4;">注册时间</td>
        <td>{{businessInfo.dateRegistered }}</td>
        <td style="background: #f1f3f4;">经营状态</td>
        <td>{{businessInfo.operationStatus}}</td>
        <td style="background: #f1f3f4;">信保代码</td>
        <td>{{businessInfo.sinosureBuyerno}}</td>
      </tr>
      <tr>
        <td style="background: #f1f3f4;">注册资本</td>
        <td>{{businessInfo.registerCapital }}</td>
        <td style="background: #f1f3f4;">注册地址</td>
        <td>{{businessInfo.registerAddr}}</td>
        <td style="background: #f1f3f4;">母公司</td>
        <td>{{businessInfo.parent}}</td>
      </tr>
      <tr>
        <td style="background: #f1f3f4;">生产现状</td>
        <td>{{businessInfo.productionCapacity}}</td>
        <td style="background: #f1f3f4;">经营地类型</td>
        <td>{{businessInfo.locationType}}</td>
        <td style="background: #f1f3f4;">采购地区</td>
        <td>{{businessInfo.purchasingArea}}</td>
      </tr>
      <tr>
        <td style="background: #f1f3f4;">所属行业</td>
        <td>{{businessInfo.industName}}</td>
        <td style="background: #f1f3f4;">主营业务</td>
        <td>{{businessInfo.products}}</td>
        <td style="background: #f1f3f4;">报告获取时间</td>
        <td>{{businessInfo.updateTime}}</td>
      </tr>
    </table>
    背景规模
    <table border="1" style=" width: 100%;
	                        text-align: center;
	                        border-collapse: collapse;
	                        border-spacing: 0;
	                        border: 1px solid #e3e3e3;
	                        margin: 15px auto;
	                        table-layout: fixed;">
      <tr>
        <td style="background: #f1f3f4;">成立年限</td>
        <td>{{businessInfo.gisterYear}}</td>
        <td style="background: #f1f3f4;">员工人数</td>
        <td>{{businessInfo.employeeNum}}</td>
        <td style="background: #f1f3f4;">分支雇员数</td>
        <td>{{businessInfo.branchEmployeeNum}}</td>
      </tr>
      <tr>
        <td style="background: #f1f3f4;">上市公司</td>
        <td>{{businessInfo.listedFlag}}</td>
        <td style="background: #f1f3f4;">主要股票交易所</td>
        <td colspan="3">{{businessInfo.tockexChange}}</td>
      </tr>
    </table>
    持股信息
    <table border="1" style=" width: 100%;
	                        text-align: center;
	                        border-collapse: collapse;
	                        border-spacing: 0;
	                        border: 1px solid #e3e3e3;
	                        margin: 15px auto;
	                        table-layout: fixed;">
      <tr>
        <td class="gbGray">股东名称</td>
        <td class="gbGray">持股比例</td>
        <td class="gbGray">持股金额</td>
        <td class="gbGray">币种</td>
      </tr>
      <template v-if="shareInfo.length>0">
        <tr v-for="(item,index) in shareInfo" :key="index">
          <td>{{item.name}}</td>
          <td>{{item.ratio}}</td>
          <td>{{item.valueHold}}</td>
          <td>人民币</td>
        </tr>
      </template>
    </table>
    信保报告列表
    <table border="1" style=" width: 100%;
	                        text-align: center;
	                        border-collapse: collapse;
	                        border-spacing: 0;
	                        border: 1px solid #e3e3e3;
	                        margin: 15px auto;
	                        table-layout: fixed;">
      <tr>
        <td class="gbGray">报告</td>
        <td class="gbGray">更新时间</td>
      </tr>
      <template>
        <tr v-for="(item,index) in pdfList" :key="index">
          <td style="color:#1b7fbd;cursor:pointer">
            {{item.noticeSerialno}}
            <el-button size="mini" type="primary" plain v-on:click.stop="viewPdf('',item.noticeSerialno)" style="margin-left: 10px;">预览
            </el-button>
          </td>
          <td>{{item.updateTime}}</td>
        </tr>
      </template>
    </table>

    <el-dialog title="预览" :visible.sync="pdfDialogVisible" width="70%" :fullscreen="false">
      <el-progress v-if="pdfProgressVisible" :text-inside="true" :stroke-width="20" :percentage="progressNum"></el-progress>
      <div v-loading="pdfLoading" style="height: 100%;">
        <iframe :src="src" frameborder="0" width="100%" :height="iframeHeight"></iframe>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import JsonView from "../components/jsonView";

export default {
  name: "zxbReportSummary",
  components: {
    JsonView,
  },
  data(){
    return{
      search:{
        xcode:'',
        companyName:'',
        approve:''
      },
      loading: false,
      page:{
        total:0,
        currentPage:0,
        pageSize:10
      },
      tableData:[],
      businessInfo: {},
      shareInfo: [],
      pdfList:[],
      zhongXinBaoApplyProgressList:[],
      fileLoading: false,
      src: '',
      pdfDialogVisible: false,
      pdfLoading: false,
      iframeHeight: document.documentElement.clientHeight*0.67 || document.body.clientHeight*0.67,
      pdfProgressVisible: true,
      pdfBasicInformation: true,
      progressNum: 0,
      startTimer: '',
      endTimer: '',
      approves:['通过', '不通过', '待审核','异常'],
    }
  },
  mounted () {
    this.getData();
    this.getSummary();

  },
  methods:{
    getData(page){
      let param = {
        pageIndex: page ? page : 1,
        pageSize: this.page.pageSize,
        companyName: this.search.companyName,
        xcode: this.search.xcode,
        userName:this.$Cookies.get('userCode'),
        approve:this.search.approve
      }
      this.loading = true;
      this.$ajax.manage.getApplyProgressListNoToken(param).then(res => {
        this.loading = false;
        if (res.data.code == 0) {
          console.log(res.data.zhongXinBaoApplyProgressList);
          this.tableData = res.data.zhongXinBaoApplyProgressList;
          this.page.total = res.data.totalRecords
        }else{
          this.$message.error(res.data.msg)
          console.log(res.data.msg)
        }
      }).catch(error=>{
        console.log(error);
        this.$message.error(error)
      })
    },
    searchData() {
      this.page.currentPage = 1;
      this.getData()
    },
    handleCurrentChange(val) {
      //页码切换
      this.getData(val)
    },
    getSummary(){  //摘要弹框
      // this.pdfBasicInformation = true;
      let param = {
        userId: parseInt(this.$Cookies.get('userId')),
        reportcorpchnname:this.$route.query.reportcorpchnname,
        reportcorpengname:this.$route.query.reportcorpengname,
        reportbuyerno:this.$route.query.reportbuyerno
      }
      this.$ajax.manage.getAllBusinessInfoNoToken(param).then(res => {
        console.log("param"+param);
        if (res.data.code == 0) {
          this.businessInfo = res.data.businessInfo;
          this.shareInfo = res.data.shareList;
          this.pdfList = res.data.pdfList;;
        }
      })
    },
    downPdf (row) {
      //pdf下载
      let param = {
        userId: parseInt(this.$Cookies.get('userId')),
        "noticeSerialno":row.reportName,
        "reportbuyerno":row.reportbuyerno,
        "reportcorpchnname":row.reportcorpchnname,
        "reportcorpengname":row.reportcorpengname,
        "updatetime":row.updatetime,
        "isDownload":"1"
      }
      this.$ajax.manage.getPDF(param).then(res => {
        const content = res.data
        const blob = new Blob([content])
        const fileName = row.reportName
        if ('download' in document.createElement('a')) { // 非IE下载
          const elink = document.createElement('a')
          elink.download = row.reportName
          elink.style.display = 'none'
          elink.href = URL.createObjectURL(blob)
          console.log(elink.href);
          document.body.appendChild(elink)
          elink.click()
          URL.revokeObjectURL(elink.href) // 释放URL 对象
          document.body.removeChild(elink)
        } else { // IE10+下载
          navigator.msSaveBlob(blob, row.reportName)
        }
      })
    },
    viewPdf (row,pdfName) {
      let src = '';
      let param = {
        userId: parseInt(this.$Cookies.get('userId')),
        "noticeSerialno":row.reportName,
        "reportbuyerno":row.reportbuyerno,
        "reportcorpchnname":row.reportcorpchnname,
        "reportcorpengname":row.reportcorpengname,
        "updatetime":row.updatetime,
        "isDownload":"0"
      }
      if(param.noticeSerialno == null){
        param.noticeSerialno = pdfName
      }
      this.pdfDialogVisible = true;
      this.pdfProgressVisible = true;
      this.startProgress();
      this.pdfLoading = true;
      this.$ajax.manage.getPDF(param).then(res => {
        this.pdfLoading = false;
        this.pdfProgressVisible=false;
        const content = res.data
        const blob = new Blob([content], {
          type: 'application/pdf;chartset=UTF-8'
        })
        let fileURL = URL.createObjectURL(blob);
        this.src = fileURL
      });
    },
    startProgress () {
      this.progressNum = 0;
      this.startTimer = setInterval(() => {
        this.progressNum ++
        if (this.progressNum > 95) {
          clearInterval(this.startTimer)
        }
      }, 100);
    },
    endProgress () {
      clearInterval(this.startTimer)
      this.endTimer = setInterval(() => {
        this.progressNum ++
        if (this.progressNum > 99) {
          clearInterval(this.endTimer)
          this.finishProgress()
        }
      }, 10);
    },
    finishProgress () {
      this.$emit('finishProgress', false)
    },
  }
}
</script>

<style scoped>
.zxbReportSummary {
  width: 90%;
  height: 100%;
  margin: auto;
  background-color: #f8f8f8;
  box-sizing: border-box;
  padding: 20px;
  overflow-block: auto;
.main-box{
td{
  word-break: break-all;
  /*允许在字内换行,即单词可分*/
  word-wrap: break-word;
  /*允许长单词或URL地址换行*/
  border-right: 1px solid #e3e3e3;
  border-bottom: 1px solid #e3e3e3;
  font-size: 14px;
  height: 36px;
}
}
.table-box {
  margin: 20px auto;
}
}
</style>

<!--<template>-->
<!--  <div class="zxbReportSummary">-->

<!--    <el-dialog title="预览" :visible.sync="pdfDialogVisible" width="70%" :fullscreen="false">-->
<!--      <el-progress v-if="pdfProgressVisible" :text-inside="true" :stroke-width="20" :percentage="progressNum"></el-progress>-->
<!--      <div v-loading="pdfLoading" style="height: 100%;">-->
<!--        <iframe :src="src" frameborder="0" width="100%" :height="iframeHeight"></iframe>-->
<!--      </div>-->
<!--    </el-dialog>-->
<!--    <el-dialog-->
<!--        title="摘要信息"-->
<!--        :visible.sync="pdfBasicInformation"-->
<!--        width="70%"-->
<!--        :before-close="handleClose">-->
<!--      <div class="main-box">-->
<!--        <div style="font-weight: bold;-->
<!--	          font-size: 14px;">信保基本信息</div>-->
<!--        <div class="table-wrapper">-->
<!--          <table border="1" style=" width: 100%;-->
<!--	                        text-align: center;-->
<!--	                        border-collapse: collapse;-->
<!--	                        border-spacing: 0;-->
<!--	                        border: 1px solid #e3e3e3;-->
<!--	                        margin: 15px auto;-->
<!--	                        table-layout: fixed;">-->
<!--            <tr>-->
<!--              <td style="background: #f1f3f4;">企业中文名称</td>-->
<!--              <td>{{businessInfo.buyerchnName}}</td>-->
<!--              <td style="background: #f1f3f4;">企业英文名称</td>-->
<!--              <td>{{businessInfo.buyerengName}}</td>-->
<!--              <td style="background: #f1f3f4;">报告编号</td>-->
<!--              <td>{{businessInfo.reportNo}}</td>-->
<!--            </tr>-->
<!--            <tr>-->
<!--              <td style="background: #f1f3f4;">注册时间</td>-->
<!--              <td>{{businessInfo.dateRegistered }}</td>-->
<!--              <td style="background: #f1f3f4;">经营状态</td>-->
<!--              <td>{{businessInfo.operationStatus}}</td>-->
<!--              <td style="background: #f1f3f4;">信保代码</td>-->
<!--              <td>{{businessInfo.sinosureBuyerno}}</td>-->
<!--            </tr>-->
<!--            <tr>-->
<!--              <td style="background: #f1f3f4;">注册资本</td>-->
<!--              <td>{{businessInfo.registerCapital }}</td>-->
<!--              <td style="background: #f1f3f4;">注册地址</td>-->
<!--              <td>{{businessInfo.registerAddr}}</td>-->
<!--              <td style="background: #f1f3f4;">母公司</td>-->
<!--              <td>{{businessInfo.parent}}</td>-->
<!--            </tr>-->
<!--            <tr>-->
<!--              <td style="background: #f1f3f4;">生产现状</td>-->
<!--              <td>{{businessInfo.productionCapacity}}</td>-->
<!--              <td style="background: #f1f3f4;">经营地类型</td>-->
<!--              <td>{{businessInfo.locationType}}</td>-->
<!--              <td style="background: #f1f3f4;">采购地区</td>-->
<!--              <td>{{businessInfo.purchasingArea}}</td>-->
<!--            </tr>-->
<!--            <tr>-->
<!--              <td style="background: #f1f3f4;">所属行业</td>-->
<!--              <td>{{businessInfo.industName}}</td>-->
<!--              <td style="background: #f1f3f4;">主营业务</td>-->
<!--              <td>{{businessInfo.products}}</td>-->
<!--              <td style="background: #f1f3f4;">报告获取时间</td>-->
<!--              <td>{{businessInfo.updateTime}}</td>-->
<!--            </tr>-->
<!--          </table>-->
<!--        </div>-->
<!--      </div>-->
<!--      <div class="main-box">-->
<!--        <div style="font-weight: bold;-->
<!--	          font-size: 14px;">背景规模</div>-->
<!--        <div class="table-wrapper">-->
<!--          <table border="1" style=" width: 100%;-->
<!--	                        text-align: center;-->
<!--	                        border-collapse: collapse;-->
<!--	                        border-spacing: 0;-->
<!--	                        border: 1px solid #e3e3e3;-->
<!--	                        margin: 15px auto;-->
<!--	                        table-layout: fixed;">-->
<!--            <tr>-->
<!--              <td style="background: #f1f3f4;">成立年限</td>-->
<!--              <td>{{businessInfo.gisterYear}}</td>-->
<!--              <td style="background: #f1f3f4;">员工人数</td>-->
<!--              <td>{{businessInfo.employeeNum}}</td>-->
<!--              <td style="background: #f1f3f4;">分支雇员数</td>-->
<!--              <td>{{businessInfo.branchEmployeeNum}}</td>-->
<!--            </tr>-->
<!--            <tr>-->
<!--              <td style="background: #f1f3f4;">上市公司</td>-->
<!--              <td>{{businessInfo.listedFlag}}</td>-->
<!--              <td style="background: #f1f3f4;">主要股票交易所</td>-->
<!--              <td colspan="3">{{businessInfo.tockexChange}}</td>-->
<!--            </tr>-->
<!--          </table>-->
<!--        </div>-->

<!--      </div>-->
<!--      <div class="main-box">-->
<!--        <div style="font-weight: bold;-->
<!--	          font-size: 14px;">持股信息</div>-->
<!--        <div class="table-wrapper">-->
<!--          <table border="1" style=" width: 100%;-->
<!--	                        text-align: center;-->
<!--	                        border-collapse: collapse;-->
<!--	                        border-spacing: 0;-->
<!--	                        border: 1px solid #e3e3e3;-->
<!--	                        margin: 15px auto;-->
<!--	                        table-layout: fixed;">-->
<!--            <tr>-->
<!--              <td class="gbGray">股东名称</td>-->
<!--              <td class="gbGray">持股比例</td>-->
<!--              <td class="gbGray">持股金额</td>-->
<!--              <td class="gbGray">币种</td>-->
<!--            </tr>-->
<!--            <template v-if="shareInfo.length>0">-->
<!--              <tr v-for="(item,index) in shareInfo" :key="index">-->
<!--                <td>{{item.name}}</td>-->
<!--                <td>{{item.ratio}}</td>-->
<!--                <td>{{item.valueHold}}</td>-->
<!--                <td>人民币</td>-->
<!--              </tr>-->
<!--            </template>-->
<!--          </table>-->
<!--        </div>-->
<!--      </div>-->

<!--      <div class="main-box">-->
<!--        <div style="font-weight: bold;-->
<!--	          font-size: 14px;">信保报告列表</div>-->
<!--        <div class="table-wrapper">-->
<!--          <table border="1" style=" width: 100%;-->
<!--	                        text-align: center;-->
<!--	                        border-collapse: collapse;-->
<!--	                        border-spacing: 0;-->
<!--	                        border: 1px solid #e3e3e3;-->
<!--	                        margin: 15px auto;-->
<!--	                        table-layout: fixed;">-->
<!--            <tr>-->
<!--              <td class="gbGray">报告</td>-->
<!--              <td class="gbGray">更新时间</td>-->
<!--            </tr>-->
<!--            <template>-->
<!--              <tr v-for="(item,index) in pdfList" :key="index">-->
<!--                <td style="color:#1b7fbd;cursor:pointer">-->
<!--                  {{item.noticeSerialno}}-->
<!--                  <el-button size="mini" type="primary" plain v-on:click.stop="viewPdf('',item.noticeSerialno)" style="margin-left: 10px;">预览-->
<!--                  </el-button>-->
<!--                </td>-->
<!--                <td>{{item.updateTime}}</td>-->
<!--              </tr>-->
<!--            </template>-->
<!--          </table>-->
<!--        </div>-->
<!--      </div>-->
<!--    </el-dialog>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--import JsonView from "../components/jsonView";-->

<!--export default {-->
<!--  name: "zxbReportSummary",-->
<!--  components: {-->
<!--    JsonView,-->
<!--  },-->
<!--  data(){-->
<!--    return{-->
<!--      search:{-->
<!--        xcode:'',-->
<!--        companyName:'',-->
<!--        approve:''-->
<!--      },-->
<!--      loading: false,-->
<!--      page:{-->
<!--        total:0,-->
<!--        currentPage:0,-->
<!--        pageSize:10-->
<!--      },-->
<!--      tableData:[],-->
<!--      businessInfo: {},-->
<!--      shareInfo: [],-->
<!--      pdfList:[],-->
<!--      zhongXinBaoApplyProgressList:[],-->
<!--      fileLoading: false,-->
<!--      src: '',-->
<!--      pdfDialogVisible: false,-->
<!--      pdfLoading: false,-->
<!--      iframeHeight: document.documentElement.clientHeight*0.67 || document.body.clientHeight*0.67,-->
<!--      pdfProgressVisible: true,-->
<!--      pdfBasicInformation: true,-->
<!--      progressNum: 0,-->
<!--      startTimer: '',-->
<!--      endTimer: '',-->
<!--      approves:['通过', '不通过', '待审核','异常'],-->
<!--    }-->
<!--  },-->
<!--  mounted () {-->
<!--    this.getData();-->
<!--    this.getSummary();-->

<!--  },-->
<!--  methods:{-->
<!--    getData(page){-->
<!--      let param = {-->
<!--        pageIndex: page ? page : 1,-->
<!--        pageSize: this.page.pageSize,-->
<!--        companyName: this.search.companyName,-->
<!--        xcode: this.search.xcode,-->
<!--        userName:this.$Cookies.get('userCode'),-->
<!--        approve:this.search.approve-->
<!--      }-->
<!--      this.loading = true;-->
<!--      this.$ajax.manage.getApplyProgressList(param).then(res => {-->
<!--        this.loading = false;-->
<!--        if (res.data.code == 0) {-->
<!--          console.log(res.data.zhongXinBaoApplyProgressList);-->
<!--          this.tableData = res.data.zhongXinBaoApplyProgressList;-->
<!--          this.page.total = res.data.totalRecords-->
<!--        }else{-->
<!--          this.$message.error(res.data.msg)-->
<!--          console.log(res.data.msg)-->
<!--        }-->
<!--      }).catch(error=>{-->
<!--        console.log(error);-->
<!--        this.$message.error(error)-->
<!--      })-->
<!--    },-->
<!--    searchData() {-->
<!--      this.page.currentPage = 1;-->
<!--      this.getData()-->
<!--    },-->
<!--    handleCurrentChange(val) {-->
<!--      //页码切换-->
<!--      this.getData(val)-->
<!--    },-->
<!--    getSummary(){  //摘要弹框-->
<!--      // this.pdfBasicInformation = true;-->
<!--      debugger;-->
<!--      let param = {-->
<!--        userId: parseInt(this.$Cookies.get('userId')),-->
<!--        reportcorpchnname:this.$route.query.reportcorpchnname,-->
<!--        reportcorpengname:this.$route.query.reportcorpengname,-->
<!--        reportbuyerno:this.$route.query.reportbuyerno-->
<!--      }-->
<!--      this.$ajax.manage.getAllBusinessInfo(param).then(res => {-->
<!--        console.log("param"+param);-->
<!--        if (res.data.code == 0) {-->
<!--          this.businessInfo = res.data.businessInfo;-->
<!--          this.shareInfo = res.data.shareList;-->
<!--          this.pdfList = res.data.pdfList;;-->
<!--        }-->
<!--      })-->
<!--    },-->
<!--    downPdf (row) {-->
<!--      //pdf下载-->
<!--      let param = {-->
<!--        userId: parseInt(this.$Cookies.get('userId')),-->
<!--        "noticeSerialno":row.reportName,-->
<!--        "reportbuyerno":row.reportbuyerno,-->
<!--        "reportcorpchnname":row.reportcorpchnname,-->
<!--        "reportcorpengname":row.reportcorpengname,-->
<!--        "updatetime":row.updatetime,-->
<!--        "isDownload":"1"-->
<!--      }-->
<!--      this.$ajax.manage.getPDF(param).then(res => {-->
<!--        const content = res.data-->
<!--        const blob = new Blob([content])-->
<!--        const fileName = row.reportName-->
<!--        if ('download' in document.createElement('a')) { // 非IE下载-->
<!--          const elink = document.createElement('a')-->
<!--          elink.download = row.reportName-->
<!--          elink.style.display = 'none'-->
<!--          elink.href = URL.createObjectURL(blob)-->
<!--          console.log(elink.href);-->
<!--          document.body.appendChild(elink)-->
<!--          elink.click()-->
<!--          URL.revokeObjectURL(elink.href) // 释放URL 对象-->
<!--          document.body.removeChild(elink)-->
<!--        } else { // IE10+下载-->
<!--          navigator.msSaveBlob(blob, row.reportName)-->
<!--        }-->
<!--      })-->
<!--    },-->
<!--    viewPdf (row,pdfName) {-->
<!--      let src = '';-->
<!--      let param = {-->
<!--        userId: parseInt(this.$Cookies.get('userId')),-->
<!--        "noticeSerialno":row.reportName,-->
<!--        "reportbuyerno":row.reportbuyerno,-->
<!--        "reportcorpchnname":row.reportcorpchnname,-->
<!--        "reportcorpengname":row.reportcorpengname,-->
<!--        "updatetime":row.updatetime,-->
<!--        "isDownload":"0"-->
<!--      }-->
<!--      if(param.noticeSerialno == null){-->
<!--        param.noticeSerialno = pdfName-->
<!--      }-->
<!--      this.pdfDialogVisible = true;-->
<!--      this.pdfProgressVisible = true;-->
<!--      this.startProgress();-->
<!--      this.pdfLoading = true;-->
<!--      this.$ajax.manage.getPDF(param).then(res => {-->
<!--        this.pdfLoading = false;-->
<!--        this.pdfProgressVisible=false;-->
<!--        const content = res.data-->
<!--        const blob = new Blob([content], {-->
<!--          type: 'application/pdf;chartset=UTF-8'-->
<!--        })-->
<!--        let fileURL = URL.createObjectURL(blob);-->
<!--        this.src = fileURL-->
<!--      });-->
<!--    },-->
<!--    startProgress () {-->
<!--      this.progressNum = 0;-->
<!--      this.startTimer = setInterval(() => {-->
<!--        this.progressNum ++-->
<!--        if (this.progressNum > 95) {-->
<!--          clearInterval(this.startTimer)-->
<!--        }-->
<!--      }, 100);-->
<!--    },-->
<!--    endProgress () {-->
<!--      clearInterval(this.startTimer)-->
<!--      this.endTimer = setInterval(() => {-->
<!--        this.progressNum ++-->
<!--        if (this.progressNum > 99) {-->
<!--          clearInterval(this.endTimer)-->
<!--          this.finishProgress()-->
<!--        }-->
<!--      }, 10);-->
<!--    },-->
<!--    finishProgress () {-->
<!--      this.$emit('finishProgress', false)-->
<!--    },-->
<!--  }-->
<!--}-->
<!--</script>-->

<!--<style scoped>-->
<!--.zxbReportSummary {-->
<!--  width: 90%;-->
<!--  height: 100%;-->
<!--  margin: auto;-->
<!--  background-color: #f8f8f8;-->
<!--  box-sizing: border-box;-->
<!--  padding: 20px;-->
<!--  overflow-block: auto;-->
<!--.main-box{-->
<!--td{-->
<!--  word-break: break-all;-->
<!--  /*允许在字内换行,即单词可分*/-->
<!--  word-wrap: break-word;-->
<!--  /*允许长单词或URL地址换行*/-->
<!--  border-right: 1px solid #e3e3e3;-->
<!--  border-bottom: 1px solid #e3e3e3;-->
<!--  font-size: 14px;-->
<!--  height: 36px;-->
<!--}-->
<!--}-->
<!--.table-box {-->
<!--  margin: 20px auto;-->
<!--}-->
<!--}-->
<!--</style>-->
