<template>
	<div class="zxbApplyProgressList">
	              <div style="margin-bottom: 15px;">
	                  <el-breadcrumb separator-class="el-icon-arrow-right">
	                      <el-breadcrumb-item :to="{ path: '/homePage' }">首页</el-breadcrumb-item>
	                      <el-breadcrumb-item>我的信保报告</el-breadcrumb-item>
	                  </el-breadcrumb>
	              </div>
	             <div class="searchbox">
	                         <el-input class="fl-left manageTableInput" v-model="search.xcode" placeholder="请输入信保代码" clearable
	                                   style="width: 200px;margin-right: 10px;">
	                         </el-input>
	                         <el-input class="fl-left manageTableInput" v-model="search.companyName" placeholder="请输入中/英文名称" clearable
	                                   style="width: 200px;margin-right: 10px;" show-overflow-tooltip>
	                         </el-input>
	             <!--           @change="changeApprove(approve)"-->
	                         <el-select v-model="search.approve" clearable placeholder="请选择审批标识" size="medium" style="margin: 0 10px">
	                           <el-option
	                               v-for="item in approves"
	                               :key="item"
	                               :label="item"
	                               :value="item">
	                           </el-option>
	                         </el-select>
	                         <el-button type="primary" icon="el-icon-search" @click="searchData(1)">查询</el-button>
	                     </div>
	              <div class="table-box">
	                  <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" stripe
	                            v-loading="loading" :default-sort="{prop: 'status', order: 'descending'}">
	                      <!--<el-table-column type="selection" width="55">
	                      </el-table-column>-->
	                      <el-table-column width="100px" prop="reportbuyerno" label="信保代码">
	                      </el-table-column>
	      <!--                <el-table-column prop="reportcorpchnname" show-overflow-tooltip label="中文名称">-->
	      <!--                </el-table-column>-->
	      <!--                <el-table-column prop="reportcorpengname" show-overflow-tooltip label="英文名称">-->
	      <!--                </el-table-column>-->
	                    <el-table-column min-width="80px" prop="reportcorpchnname,reportcorpengname" show-overflow-tooltip label="中英文名称">
	                      <template slot-scope="scope">
	                        {{scope.row.reportcorpchnname}}/{{scope.row.reportcorpengname}}
	                      </template>
	                    </el-table-column>
						<el-table-column min-width="55px" prop="tbtime" show-overflow-tooltip label="填报时间">
						</el-table-column>
						<el-table-column min-width="50px" prop="" show-overflow-tooltip label="审批标识">
							<template slot-scope="scope">
							    <el-tag type="primary" v-if="scope.row.approveCode==1" >通过</el-tag>
							    <el-tag type="danger" v-else-if="scope.row.approveCode==999">不通过</el-tag>
							    <el-tag type="info" v-else-if="scope.row.approveCode==2">待审核</el-tag>
							    <el-tag type="warning" v-else>异常</el-tag>
							</template>
						</el-table-column>
						<el-table-column min-width="45px" prop="approveby" show-overflow-tooltip label="审核人">
						</el-table-column>
						<el-table-column min-width="55px" prop="approveDate" show-overflow-tooltip label="审核时间">
						</el-table-column>
	                      <el-table-column min-width="50px" prop="zxbresults" show-overflow-tooltip label="中信保反馈">
	                      </el-table-column>
	                      <el-table-column prop="updatetime"min-width="55px" show-overflow-tooltip label="更新时间">
	                      </el-table-column>
	                    <el-table-column prop="getTime" min-width="55px" show-overflow-tooltip label="摘要时间">
	                    </el-table-column>
	                      <el-table-column align="center" width="240px" label="操作">
	                          <template slot-scope="scope">
	                              <el-button size="mini" :disabled="scope.row.updatetime == '暂无报告'" type="primary" @click="viewPdf(scope.row)" plain>
	                                  预览</el-button>
	                              <el-button size="mini" :disabled="scope.row.updatetime == '暂无报告'" type="primary" @click="downPdf(scope.row)" plain>
	                                  下载</el-button>
	                            <el-button size="mini" :disabled="scope.row.updatetime == '暂无报告'" type="primary" @click="getSummary(scope.row)" plain>
	                              摘要信息</el-button>
	                          </template>
	                      </el-table-column>
	                  </el-table>
	      
	                  <div style="text-align: center;margin-top: 10px;">
	                      <el-pagination background layout="prev, pager, next,total,jumper" :total="page.total"
	                                     :current-page.sync="page.currentPage" :pageSize="page.pageSize" @current-change="handleCurrentChange">
	                      </el-pagination>
	                  </div>
	              </div>
	              <el-dialog title="预览" :visible.sync="pdfDialogVisible" width="70%" :fullscreen="false">
	                  <el-progress v-if="pdfProgressVisible" :text-inside="true" :stroke-width="20" :percentage="progressNum"></el-progress>
	                  <div v-loading="pdfLoading" style="height: 100%;">
	                      <iframe :src="src" frameborder="0" width="100%" :height="iframeHeight"></iframe>
	                  </div>
	              </el-dialog>
	            <el-dialog
	                title="摘要信息"
	                :visible.sync="pdfBasicInformation"
	                width="70%"
	                :before-close="handleClose">
	                    <div class="main-box">
	                      <div style="font-weight: bold;
	          font-size: 14px;">信保基本信息</div>
	                      <div class="table-wrapper">
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
	                      </div>
	                    </div>
	                    <div class="main-box">
	                      <div style="font-weight: bold;
	          font-size: 14px;">背景规模</div>
	                      <div class="table-wrapper">
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
	                      </div>
	      
	                    </div>
	              <div class="main-box">
	                <div style="font-weight: bold;
	          font-size: 14px;">持股信息</div>
	                <div class="table-wrapper">
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
	                </div>
	              </div>
	      
	              <div class="main-box">
	                <div style="font-weight: bold;
	          font-size: 14px;">信保报告列表</div>
	                <div class="table-wrapper">
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
	                </div>
	              </div>
	            </el-dialog>
	    </div>
</template>

<script>
    import JsonView from "../components/jsonView";

    export default {
        name: "zxbApplyProgressList",
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
                pdfBasicInformation: false,
                progressNum: 0,
                startTimer: '',
                endTimer: '',
				approves:['通过', '不通过', '待审核','异常'],
            }
        },
        mounted () {
            this.getData();
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
                this.$ajax.manage.getApplyProgressList(param).then(res => {
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
            getSummary(row){  //摘要弹框
              this.pdfBasicInformation = true;
              let param = {
                userId: parseInt(this.$Cookies.get('userId')),
                reportcorpchnname:row.reportcorpchnname,
                reportcorpengname:row.reportcorpengname,
				reportbuyerno:row.reportbuyerno
				
              }
              this.$ajax.manage.getAllBusinessInfo(param).then(res => {
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
.zxbApplyProgressList {
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
