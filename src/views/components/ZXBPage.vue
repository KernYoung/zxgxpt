<!-- 中信保 -->
<template>
  <div class="zxbPage">
	  <h4>信保报告</h4>
    <div style="margin:15px 0;">
      <el-button type="primary" @click="applyReport" size="small">信保报告申请</el-button>
    </div>
    <div class="main-box">
      <div class="titile">信保基本信息</div>
      <div class="table-wrapper">
        <table border="1">
          <tr>
            <td class="gbGray">企业名称</td>
            <td>{{businessInfo.buyerchnName}}</td>
            <td class="gbGray">报告编号</td>
            <td colspan="3">{{businessInfo.reportNo}}</td>
          </tr>
          <tr>
            <td class="gbGray">注册时间</td>
            <td>{{businessInfo.dateRegistered }}</td>
            <td class="gbGray">经营状态</td>
            <td>{{businessInfo.operationStatus}}</td>
            <td class="gbGray">信保代码</td>
            <td>{{businessInfo.sinosureBuyerno}}</td>
          </tr>
          <tr>
            <td class="gbGray">注册资本</td>
            <td>{{businessInfo.registerCapital }}</td>
            <td class="gbGray">注册地址</td>
            <td>{{businessInfo.registerAddr}}</td>
            <td class="gbGray">母公司</td>
            <td>{{businessInfo.parent}}</td>
          </tr>
          <tr>
            <td class="gbGray">生产现状</td>
            <td>{{businessInfo.productionCapacity}}</td>
            <td class="gbGray">经营地类型</td>
            <td>{{businessInfo.locationType}}</td>
            <td class="gbGray">采购地区</td>
            <td>{{businessInfo.purchasingArea}}</td>
          </tr>
          <tr>
            <td class="gbGray">所属行业</td>
            <td>{{businessInfo.industName}}</td>
            <td class="gbGray">主营业务</td>
            <td>{{businessInfo.products}}</td>
            <td class="gbGray">报告获取时间</td>
            <td>{{businessInfo.updateTime}}</td>
          </tr>
        </table>
      </div>
    </div>

    <div class="main-box">
      <div class="titile">背景规模</div>
      <div class="table-wrapper">
        <table border="1">
          <tr>
            <td class="gbGray">成立年限</td>
            <td>{{businessInfo.gisterYear}}</td>
            <td class="gbGray">员工人数</td>
            <td>{{businessInfo.employeeNum}}</td>
            <td class="gbGray">分支雇员数</td>
            <td>{{businessInfo.branchEmployeeNum}}</td>
          </tr>
          <tr>
            <td class="gbGray">上市公司</td>
            <td>{{businessInfo.listedFlag}}</td>
            <td class="gbGray">主要股票交易所</td>
            <td colspan="3">{{businessInfo.tockexChange}}</td>
          </tr>
        </table>
      </div>
    </div>

    <div class="main-box" v-if="shareInfo.length>0">
      <div class="titile">持股信息</div>
      <div class="table-wrapper">
        <table border="1">
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
      </div>
    </div>

    <div class="main-box" v-if="pdfList.length>0">
      <div class="titile">信保报告列表</div>
      <div class="table-wrapper">
        <table border="1">
          <tr>
            <td class="gbGray">报告</td>
            <td class="gbGray">更新时间</td>
          </tr>
          <template v-if="pdfList.length>0">
            <tr v-for="(item,index) in pdfList" :key="index">
              <td style="color:#1b7fbd;cursor:pointer" @click="downPdf(item.noticeSerialno)">
                {{item.noticeSerialno}}
                <el-button size="mini" type="primary" plain v-on:click.stop="viewPdf(item.noticeSerialno)" style="margin-left: 10px;">预览
                </el-button>
              </td>
              <td>{{item.updateTime}}</td>
            </tr>
          </template>
        </table>
      </div>
    </div>

    <ZxbReportApply :dialogXBVisible.sync="dialogXBVisible"></ZxbReportApply>
    <!-- <el-dialog title="预览" :visible.sync="dialogPDFVisible" width="80%">
            <div style="height: 500px; overflow: auto;">
                <pdfView :url="pdfUrl"></pdfView>
            </div>
        </el-dialog> -->
    <el-dialog title="预览" :visible.sync="pdfDialogVisible" width="90%" :fullscreen="false">
      <el-progress v-if="pdfProgressVisible" :text-inside="true" :stroke-width="20" :percentage="progressNum"></el-progress>
      <div v-loading="pdfLoading" style="height: 100%;">
        <iframe :src="src" frameborder="0" width="100%" :height="iframeHeight"></iframe>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import axios from 'axios';
import pdfView from '../../components/pdfView';
import ZxbReportApply from "../../components/zxbReportApply";
export default {
  components: {
    pdfView,
    ZxbReportApply,
  },
  data () {
    return {
      pdfUrl: '',
      dialogVisible: false,
      dialogPDFVisible: false,
      haveCreditCode: {
        clientNo: '',
        userId: parseInt(this.$Cookies.get('userId')),
        reportbuyerNo: '',
        reportCorpCountryCode: '',
        reportCorpChnName: '',
        reportCorpEngName: '',
        reportCorpaddress: '',
        creditno: '',
        istranslation: '0'
      },
      noCreditCode: {
        clientNo: '',
        userId: parseInt(this.$Cookies.get('userId')),
        reportbuyerNo: '',
        reportCorpCountryCode: '',
        reportCorpChnName: '',
        reportCorpEngName: '',
        reportCorpaddress: '',
        creditno: '',
        istranslation: '0',
      },
      istranslation: [{ name: '否', id: '0' }, { name: '是', id: '1' }],
      noIstranslation: [{ name: '否', id: '0' }, { name: '是', id: '1' }],
      pdfDialogVisible: false,
      pdfLoading: false,
      src: '',
      businessInfo: {},
      shareInfo: [],
      nationTypeOptions: [],
      pdfList:[],
	  iframeHeight: document.documentElement.clientHeight-220 || document.body.clientHeight-80,
      pdfProgressVisible: true,
      progressNum: 0,
      startTimer: '',
      endTimer: '',
      dialogXBVisible: false
    }
  },
  mounted () {
	  if(this.$route.query.companyId){
		  this.getBusinessInfo();
		  this.getShareInfo();
		  this.getPDFList();
	  }else{
		  //this.dialogVisible=true;
	  }
  },
  methods: {
    getShareInfo () {
      //持股信息
      //   let param = {
      //     "userId": "1",
      //     "companyId": "2081"
      //   }
      let param = {
        userId: parseInt(this.$Cookies.get('userId')),
        companyId: this.$route.query.companyId
      }
      this.$ajax.manage.getShareInfo(param).then(res => {
        if (res.data.code == 0) {
          if (res.data.shareInfo) {
            this.shareInfo = res.data.shareInfo;
          }
        }
      })
    },
    getBusinessInfo () {
      let param = {
        userId: parseInt(this.$Cookies.get('userId')),
        companyId: this.$route.query.companyId
      }
      this.$ajax.manage.getBusinessInfo(param).then(res => {
        console.log(res.data);
        if (res.data.code == 0) {
          if (res.data.shareInfo) {
            this.businessInfo = res.data.shareInfo;
          }
        }
      })
    },
    getPDFList (){
      let param = {
        companyId: this.$route.query.companyId
      }
      this.$ajax.manage.getPDFList(param).then(res => {
        if (res.data.code == 0) {
          if (res.data.pdfList) {
            this.pdfList = res.data.pdfList;
          }
        }
      })
    },
    downPdf (pdfName) {
      //pdf下载
      let param = {
        userId: parseInt(this.$Cookies.get('userId')),
        "noticeSerialno": pdfName,
      }
      this.$ajax.manage.getPDF(param).then(res => {
        console.log(res)
        const content = res.data
        const blob = new Blob([content])
        const fileName = pdfName
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
    viewPdf (pdfName) {
      let src = '';
      let param = {
        userId: parseInt(this.$Cookies.get('userId')),
        "noticeSerialno": pdfName
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
    applyReport () {
      //打开报告申请弹框
      this.dialogXBVisible = true;
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
    }
  }
}
</script>
<style lang="less" scoped>
.zxbPage {
  /deep/.el-input__inner {
    border: none;
  }

  width: 100%;
  height: 100%;
  margin: auto;
  box-sizing: border-box;

  .main-box {
    .titile {
      font-weight: bold;
      font-size: 14px;
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