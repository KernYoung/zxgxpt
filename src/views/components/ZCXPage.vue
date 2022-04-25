<!-- 中诚信 -->
<template>
  <div class="ZCXpage">
	  <h4 style="margin-bottom: 15px;">评级报告</h4>
    <div>
      <el-button type="primary" @click="toReportPage(1, '风险初筛')" size="small">风险初筛</el-button>
      <el-button type="primary" @click="toReportPage(2, '财务排雷')" size="small">财务排雷</el-button>
      <el-button type="primary" @click="toReportPage(3, '产业企业评价')" size="small">产业企业评价</el-button>
      <el-button type="primary" @click="toReportPage(4, '区域信用评价')" size="small">区域信用评价</el-button>
      <el-button type="primary" @click="toReportPage(5,'城投企业评价')" size="small">城投企业评价</el-button>
    </div>
    <div class="table-box" >
      <div style="margin: 13px 0;font-weight: bold;">历史报告列表</div>
      <el-table :data="tableData.slice((page.currentPage-1)*page.pageSize,page.currentPage*page.pageSize)"
        style="width: 100%" v-loading="tableLoading" border >
<!--        <el-table-column prop="reportId" label="单号" width="50px" align="center">-->
<!--        </el-table-column>-->
        <el-table-column prop="address" label="报告类型" width="150px" show-overflow-tooltip align="center">
          <template slot-scope="scope">
            {{scope.row.reportType}}
          </template>
        </el-table-column>
        <el-table-column prop='param' label="区域"  show-overflow-tooltip align="center">
          <template slot-scope="scope">
            {{scope.row.area}}
          </template>
        </el-table-column>
        <el-table-column prop='param' label="行业"  show-overflow-tooltip align="center">
          <template slot-scope="scope">
            {{scope.row.industry}}
          </template>
        </el-table-column>
        <el-table-column prop='param' label="企业类型"  show-overflow-tooltip align="center">
          <template slot-scope="scope">
            {{scope.row.companyType}}
          </template>
        </el-table-column>
        <el-table-column prop="address" label="更新时间" width="115px" show-overflow-tooltip align="center">
          <template slot-scope="scope">
            {{$formatDate(scope.row.updateTime)}}
          </template>
        </el-table-column>
        <el-table-column prop="pdfName" label="操作"  width="160px"  align="center">
          <template slot-scope="scope">
<!--            <span class="text" style="color: #409EFF;cursor: pointer;">-->
<!--              <i :class="{'el-icon-loading':scope.row.fileLoading}"></i>-->
<!--              {{scope.row.pdfName}}-->
<!--            </span>-->
            <el-button type="primary" size="mini" plain style="margin-left: 10px;" @click="checkPdf(scope.row)">预览
            </el-button>
            <el-button type="primary" size="mini" plain style="margin-left: 10px;" @click="downloadFile(scope.row)">下载
            </el-button>
            <el-button type="primary" size="mini" plain style="width: 123px;margin-top: 10px;" @click="seeMore(scope.row)">查看历史报告
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div style="text-align: center;margin-top: 10px;">
      <el-pagination background layout="prev, pager, next,total,jumper" :total="page.total"
        :current-page.sync="page.currentPage" :pageSize="page.pageSize" @current-change="handleCurrentChange">
      </el-pagination>
    </div>
    <el-dialog title="查看" :visible.sync="dialogVisible" width="800px">
      <div style="height: 500px;overflow: auto;">
        <JsonView :value="data"></JsonView>
      </div>
    </el-dialog>
    <el-dialog title="预览" :visible.sync="pdfDialogVisible" width="70%" :fullscreen="false">
      <el-progress v-if="pdfProgressVisible" :text-inside="true" :stroke-width="20" :percentage="progressNum"></el-progress>
      <div v-loading="pdfLoading">
<!--        <iframe :src="src" id="zxcPage" frameborder="0"></iframe>-->
<!--        <iframe :src="src" id="tycUrl" :width="iframeWidth" :height="iframeHeight" frameborder="0" ></iframe>-->
        <iframe :src="src" frameborder="0" width="100%" :height="iframeHeight"></iframe>
      </div>
    </el-dialog>
    <el-dialog
        title="提示"
        :visible.sync="moreDialogVisible"
        width="80%"
        @close="moreCloseDialog">
      <div style="padding: 0 30px; min-height: 500px;" >
          <div style="margin: 13px 0;font-weight: bold;">历史报告列表</div>
          <el-table :data="tableTypeData.slice((page.currentPage-1)*page.pageSize,page.currentPage*page.pageSize)"
                    style="width: 100%" v-loading="tableLoading" border >
            <!--        <el-table-column prop="reportId" label="单号" width="50px" align="center">-->
            <!--        </el-table-column>-->
            <el-table-column prop="address" label="报告类型" width="150px" show-overflow-tooltip align="center">
              <template slot-scope="scope">
                {{scope.row.reportType}}
              </template>
            </el-table-column>
            <el-table-column prop='param' label="区域"  show-overflow-tooltip align="center">
              <template slot-scope="scope">
                {{scope.row.area}}
              </template>
            </el-table-column>
            <el-table-column prop='param' label="行业"  show-overflow-tooltip align="center">
              <template slot-scope="scope">
                {{scope.row.industry}}
              </template>
            </el-table-column>
            <el-table-column prop='param' label="企业类型"  show-overflow-tooltip align="center">
              <template slot-scope="scope">
                {{scope.row.companyType}}
              </template>
            </el-table-column>
            <el-table-column prop="address" label="更新时间"  show-overflow-tooltip align="center">
              <template slot-scope="scope">
                {{$formatDate(scope.row.updateTime)}}
              </template>
            </el-table-column>
            <el-table-column prop="pdfName" label="操作"   align="center">
              <template slot-scope="scope">
                <el-button type="primary" size="mini" plain style="margin-left: 10px;" @click="checkPdf(scope.row)">预览
                </el-button>
                <el-button type="primary" size="mini" plain style="margin-left: 10px;" @click="downloadFile(scope.row)">下载
                </el-button>
              </template>
            </el-table-column>
          </el-table>
      </div>
  <div style="text-align: center;margin-top: 10px;">
    <el-pagination background layout="prev, pager, next,total,jumper" :total="typePage.total"
                   :current-page.sync="typePage.currentPage" :pageSize="typePage.pageSize" @current-change="handleCurrentChange">
    </el-pagination>
  </div>
  </el-dialog>
  </div>
</template>
<script>
import JsonView from '../../components/jsonView'
import json from '../../assets/json/产业企业信用评价data.json'
export default {
  components: {
    JsonView,
  },
  data () {
    return {
      data: '',
      dialogVisible: false,
      moreDialogVisible:false,
      creditCode: this.$route.query.creditCode,
      buildDate: this.$route.query.buildDate,
      credit: '1',
      options: [
        {
          code: '1',
          value: '产业企业信用评价'
        },
        {
          code: '2',
          value: '区域信用评价'
        },
        {
          code: '3',
          value: '城投企业信用评价'
        }
      ],
      fileName: '',
      loading: false,
      tableData: [],
      tableTypeData:[],
      page: {
        currentPage: 1,
        total: 0,
        pageSize: 8
      },
      typePage: {
        currentPage: 1,
        total: 0,
        pageSize: 8
      },
      tableLoading: false,
      fileLoading: false,
      src: '',
      pdfDialogVisible: false,
      pdfLoading: false,
	  iframeHeight: document.documentElement.clientHeight-220 || document.body.clientHeight-80,
      iframeWidth: '100%',
      pdfProgressVisible: true,
      progressNum: 0,
      startTimer: '',
      endTimer: '',
      fxcsData:null
    }
  },
  created () {
    this.data = JSON.stringify(json, null, '\t');
    //this.getHtml();
    this.getReportList()
  },
  mounted() {
    // /**
    //  * iframe-宽高自适应显示
    //  */
    // function changeMobsfIframe(){
    //   const tycUrl = document.getElementById('tycUrl');
    //   const deviceWidth = document.body.clientWidth - 400 || document.documentElement.clientWidth - 500;
    //   const deviceHeight = document.documentElement.clientHeight - 220 || document.body.clientHeight - 80;
    //   tycUrl.style.height = Number(deviceHeight) + 'px'; //数字是页面布局高度差
    //   tycUrl.style.width = Number(deviceWidth) + 'px'; //数字是页面布局宽度差值
    //   // this.iframeHeight = document.documentElement.clientHeight-220 || document.body.clientHeight-80;
    // }
    //
    // changeMobsfIframe()
    //
    // window.onresize = function(){
    //   changeMobsfIframe()
    // }
  },
  methods: {
    getReportList () {
      let param = {
        companyId: this.$route.query.companyId,
      }
      this.tableLoading = true;
      //this.$ajax.manage.getLiteRatingList(param).then(res=>{
      this.$ajax.manage.getReportList(param).then(res => {
        this.tableLoading = false;
        console.log(res.data.reportList)
        if (res.data.code == '0') {
          this.tableData = res.data.reportList.map(row => {
            row.fileLoading = false;
            return row
          });
          this.page.total = res.data.reportList.length
        }
      })

    },
    getReportTypeList(reportType){
      let param = {
        companyId: this.$route.query.companyId,
        reportType:reportType
      }
      this.tableLoading = true;
      this.$ajax.manage.getReportList(param).then(res => {
        this.tableLoading = false;
        console.log(res.data.reportList)
        if (res.data.code == '0') {
          this.tableTypeData = res.data.reportList.map(row => {
            row.fileLoading = false;
            return row
          });
          this.typePage.total = res.data.reportList.length
        }
      })
    },
    seeMore(row){
      this.moreDialogVisible = true;
      this.getReportTypeList(row.reportType)
    },
    moreCloseDialog() {
      this.moreDialogVisible = false;
    },
    fxcsIsDay(fxcsData,param){
        // if (new Date().getTime() - this.fxcsData.updateTime < 86400000) {
        if(new Date(fxcsData.updateTime).toDateString() === new Date().toDateString()){
          this.checkPdf(this.fxcsData)
        } else {
          this.$msgbox.confirm('已有本地报告，是否直接查阅?', '提示', {
            distinguishCancelAndClose: true,
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.checkPdf(this.fxcsData)
          }).catch(action => {
            if(action === 'cancel'){
              this.$router.push({
                path: '/report/riskScreen',
                query: param
              })
            }
          });
        }
      },
    getHtml () {
      let param = {
        userId: this.$Cookies.get("userId"),
        companyId: this.$route.query.companyId.toString()
      }
      console.log(param);
      this.$ajax.manage.getHtml(param).then(res => {
        if (res.status == 200) {
          let temp = 'content-disposition'
          let data = res.headers[temp];
          this.fileName = data.split('=')[1]
        }
      })
    },
    showJSON () {
      this.dialogVisible = true;
    },
    toReportPage (type, reportType) {
      let param = {
        companyId: this.$route.query.companyId,
        companyName: this.$route.query.companyName,
        creditCode: this.$route.query.creditCode,
        id: this.$route.query.id,
        index: this.$route.query.index,
        reportType: reportType
      }
      if (type == 1) {
        let fxFaram = {
          companyId: this.$route.query.companyId,
          reportType:"风险初筛"
        }
        this.$ajax.manage.getReportList(fxFaram).then(res => {

          if (res.data.code == '0') {
            if(res.data.reportList.length > 0){
              this.fxcsData = res.data.reportList[0];
              console.log(res.data);
              console.log(this.fxcsData)
              this.fxcsIsDay(this.fxcsData,param)
            }else{
              this.$router.push({
                path: '/report/riskScreen',
                query: param
              })
            }
          }
        })
      } else if (type == 2) {
        //财务排雷
		this.$router.push({
		  path: '/report/financialDemining',
		  query: param
		})
      } else if (type == 3) {
        //产业企业信用评价
        this.$router.push({
          path: '/report/creditEvaluate',
          query: param
        })
      } else if (type == 4) {
        //区域信用评价
        this.$router.push({
          path: '/report/areaCreditEvaluate',
          query: param
        })
      } else if (type == 5) {
        //城投企业信用评价  
        this.$router.push({
          path: '/report/cityInvEvaluate',
          query: param
        })
      }
    },
    // downloadFile (row) {
    //   let param = {
    //     fileName: row.fileName,
    //     reportId:row.reportId,
    //     reportType:row.reportType,
    //     updateTime:row.updateTime,
    //     isDownload:"1"
    //   }
    //   row.fileLoading = true;
    //   this.$notify({
    //     title: '提示',
    //     message: 'PDF正在加载中，等待期间可以使用门户其他功能',
    //     position: 'top-left',
    //     duration: 10000,
    //     type: 'success'
    //   });
    //   this.$ajax.manage.getLiteRatingPDF(param).then(res => {
    //     console.log(res)
    //     row.fileLoading = false
    //     const content = res.data
    //     const blob = new Blob([content])
    //     const fileName = `${row.fileName}.pdf`
    //     if ('download' in document.createElement('a')) { // 非IE下载
    //       const elink = document.createElement('a')
    //       elink.download = fileName
    //       elink.style.display = 'none'
    //       elink.href = URL.createObjectURL(blob)
    //       console.log(elink.href);
    //       document.body.appendChild(elink)
    //       elink.click()
    //       URL.revokeObjectURL(elink.href) // 释放URL 对象
    //       document.body.removeChild(elink)
    //     } else { // IE10+下载
    //       navigator.msSaveBlob(blob, fileName)
    //     }
    //   })
    // },
    downloadFile (row) {
      let param = {
        fileName: row.fileName,
        reportId:row.reportId,
        reportType:row.reportType,
        updateTime:row.updateTime,
        isDownload:"1"
      }
      row.fileLoading = true;
      this.$notify({
        title: '提示',
        message: 'PDF正在加载中，等待期间可以使用门户其他功能',
        position: 'top-left',
        duration: 10000,
        type: 'success'
      });
      this.$ajax.manage.getLiteRatingPDF(param).then(res => {
      // this.$ajax.manage.getReportFromFTP(param).then(res => {
        console.log(res)
        row.fileLoading = false
        const content = res.data
        const blob = new Blob([content])
        const fileName = `${row.fileName}`.split('.')[0] + '.pdf'
        debugger;
        // const fileName = `${row.fileName}.pdf`
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
    checkPdf (row) {
      this.src = '';
      let param = {
        fileName: row.fileName,
        reportId:row.reportId,
        reportType:row.reportType,
        updateTime:row.updateTime,
        isDownload:"0"
      }
      this.pdfDialogVisible = true;
      this.pdfProgressVisible = true;
      this.startProgress();
      this.pdfLoading = true;
      this.$notify({
        title: '提示',
        message: 'PDF正在加载中，请耐心等待...',
        position: 'top-left',
        duration: 10000,
        type: 'success'
      });
      this.$ajax.manage.getLiteRatingPDF(param).then(res => {
      // this.$ajax.manage.getReportFromFTP(param).then(res => {
        this.endProgress();
        this.finishProgress();
        this.pdfProgressVisible=false;
        this.pdfLoading = false;
        const content = res.data
        console.log("content: "+ content);
        const fileName = `${row.fileName}.pdf`
        const blob = new Blob([content], {
          type: 'application/pdf;chartset=UTF-8'
        })
        let fileURL = URL.createObjectURL(blob);
        //window.open(fileURL);
        this.src = fileURL
      })
    },
    // checkPdf (row) {
    //   this.src = '';
    //   let param = {
    //     fileName: row.fileName,
    //     reportId:row.reportId,
    //     reportType:row.reportType,
    //     updateTime:row.updateTime,
    //     isDownload:"0"
    //   }
    //   this.pdfDialogVisible = true;
    //   this.pdfProgressVisible = true;
    //   this.startProgress();
    //   this.pdfLoading = true;
    //   this.$notify({
    //     title: '提示',
    //     message: 'PDF正在加载中，请耐心等待...',
    //     position: 'top-left',
    //     duration: 10000,
    //     type: 'success'
    //   });
    //   this.$ajax.manage.getLiteRatingPDF(param).then(res => {
    //     this.endProgress();
    //     this.finishProgress();
    //     this.pdfProgressVisible=false;
    //     this.pdfLoading = false;
    //     const content = res.data
    //     const fileName = `${row.fileName}.pdf`
    //     const blob = new Blob([content], {
    //       type: 'application/pdf;chartset=UTF-8'
    //     })
    //     let fileURL = URL.createObjectURL(blob);
    //     //window.open(fileURL);
    //     this.src = fileURL
    //   })
    // },
    handleCurrentChange (val) {
      this.page.currentPage = val
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
.ZCXPage {
  width: 100%;
  height: 100%;
  margin: auto;
  box-sizing: border-box;
  .list-box {
    .list {
      border: 1px solid red;
    }
  }
  .text {
    color: blue !important;
  }
}
</style>