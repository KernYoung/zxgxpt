<template>
    <el-dialog title="信保报告申请"
               :visible.sync="dialogVisible"
               @close="QualityDialogClose"
               width="1200px"
               class="report-dialog">
      <el-dialog title="预览" :visible.sync="pdfDialogVisible" width="100%" :fullscreen="true">
        <el-progress v-if="pdfProgressVisible" :text-inside="true" :stroke-width="20" :percentage="progressNum"></el-progress>
        <div v-loading="pdfLoading" style="height: 100%;">
          <iframe :src="src" frameborder="0" width="100%" :height="iframeHeight"></iframe>
        </div>
      </el-dialog>

        <div class="report-box">

            <table border="1" class="report-table">
                <tr>
                    <td colspan="12" style="background:#E3E3E3;font-weight:bold">信保报告申请（已有信保代码）</td>
                </tr>
                <tr class="gbGray">
                    <th width="80px">买方代码</th>
                    <th width="200px">待调查企业中国信保企业代码</th>
                    <th width="100px">待调查企业国别</th>
                    <th width="150px">待调查企业中文名称</th>
                    <th width="150px">待调查企业英文名称 </th>
                    <th width="100px">待调查企业地址</th>
                    <th width="220px">待调查企业统一社会信用代码</th>
                    <th width="35px">是否导读</th>
                    <th width="70px">待调查企业联系电话</th>
                    <th width="70px">待调查企业邮箱</th>
                    <th width="35px">紧急度</th>
                    <th></th>
                </tr>
                <tr>
                    <td>
                        <el-input disabled v-model="haveCreditCode.clientNo"></el-input>
                    </td>
                    <td>
                        <el-input v-model="haveCreditCode.reportbuyerNo"></el-input>
                    </td>
                    <td style="background:#FAFAFA"></td>
                  <td>
                    <el-input v-model="haveCreditCode.reportCorpChnName"></el-input>
                  </td>
                  <td>
                    <el-input v-model="haveCreditCode.reportCorpEngName"></el-input>
                  </td>
                    <td style="background:#FAFAFA"></td>
                    <td style="background:#FAFAFA"></td>
                    <td>
                        <el-select v-model="haveCreditCode.istranslation">
                            <el-option v-for="(item,index) in istranslation" :value="item.id" :key="item.id" :label="item.name">
                            </el-option>
                        </el-select>
                    </td>
                  <td style="background:#FAFAFA"></td>
                  <td style="background:#FAFAFA"></td>
                  <td>
                    <el-select v-model="haveCreditCode.speed">
                      <el-option v-for="(item,index) in speedSelected" :value="item.id" :key="item.id" :label="item.name">
                      </el-option>
                    </el-select>
                  </td>
                    <td>
                        <el-button type="primary" size="mini" @click="applyHaveCode">点击申请</el-button>
                    </td>
                </tr>
            </table>
        </div>

        <div class="report-box">
            <table border="1" class="report-table">
                <tr>
                    <td colspan="12" style="background:#E3E3E3;font-weight:bold">信保报告申请（无信保代码）</td>
                </tr>
                <tr class="gbGray">
                    <th width="80px">买方代码</th>
                    <th width="200px">待调查企业中国信保企业代码</th>
                    <th width="100px">待调查企业国别</th>
                    <th width="150px">待调查企业中文名称</th>
                    <th width="150px">待调查企业英文名称 </th>
                    <th width="100px">待调查企业地址</th>
                    <th width="220px">待调查企业统一社会信用代码</th>
                    <th width="35px">是否导读</th>
                    <th width="70px">待调查企业联系电话</th>
                    <th width="70px">待调查企业邮箱</th>
                    <th width="35px">紧急度</th>
                    <th></th>
                </tr>
                <tr>
                    <td>
                        <el-input disabled v-model="haveCreditCode.clientNo"></el-input>
                    </td>
                    <td style="background:#FAFAFA"></td>
                    <td> 
                        <!-- <el-input v-model="noCreditCode.reportCorpCountryCode"></el-input> -->
                         <el-select v-model="noCreditCode.reportCorpCountryCode" placeholder='' filterable>
                            <el-option v-for="item in nationTypeOptions" :key="item.nationCode" :label="item.nationName"
                                       :value="item.nationCode">
                                <span style="float: left">{{ item.nationName }}</span>
                                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.nationCode }}</span>
                            </el-option>
                        </el-select>
                    </td>
                    <td>
                        <el-input v-model="noCreditCode.reportCorpChnName"></el-input>
                    </td>
                    <td>
                        <el-input v-model="noCreditCode.reportCorpEngName"></el-input>
                    </td>
                    <td>
                        <el-input v-model="noCreditCode.reportCorpaddress"></el-input>
                    </td>
                    <td>
                        <el-input v-model="noCreditCode.creditno"></el-input>
                    </td>
                    <td>
                        <el-select v-model="noCreditCode.istranslation">
                            <el-option v-for="(item,index) in istranslation" :value="item.id" :key="item.id" :label="item.name">
                            </el-option>
                        </el-select>
                    </td>
                  <td>
                    <el-input v-model="noCreditCode.phone"></el-input>
                  </td>
                  <td>
                    <el-input v-model="noCreditCode.email"></el-input>
                  </td>
                  <td>
                    <el-select v-model="noCreditCode.speed">
                      <el-option v-for="(item,index) in speedSelected" :value="item.id" :key="item.id" :label="item.name">
                      </el-option>
                    </el-select>
                  </td>
                    <td>
                        <el-button type="primary" size="mini" @click="applyNoCode">点击申请</el-button>
                    </td>
                </tr>
            </table>
        </div>
    </el-dialog>

</template>

<script>
	import $ from 'jquery'
    export default {
        name: 'zxbReportApply',
        props: {
            dialogXBVisible:{
                type:Boolean,
                require:false
            }
        },
        data() {
            return {
				result:'',
                dialogVisible: false,
                haveCreditCode: {
                    clientNo: '',
                    userId: parseInt(this.$Cookies.get('userId')),
                    reportbuyerNo: '',
                    reportCorpCountryCode: '',
                    reportCorpChnName: '',
                    reportCorpEngName: '',
                    reportCorpaddress: '',
                    creditno: '',
                    istranslation: '0',
                    speed: '1',
                    forcedApply: false
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
                nationTypeOptions:[],
                istranslation: [{ name: '否', id: '0' }, { name: '是', id: '1' }],
                noIstranslation: [{ name: '否', id: '0' }, { name: '是', id: '1' }],
                speedSelected: [{ name: '普通', id: '1' }, { name: '加急', id: '2' }, { name: '特急', id: '3' }],
                isClientNo:false,
                isZxbreportAudit:false,
              pdfLoading: false,
              pdfProgressVisible: true,
              pdfBasicInformation: false,
              startTimer: '',
              progressNum: 0,
              pdfDialogVisible: false,
              iframeHeight: document.documentElement.clientHeight*0.99 || document.body.clientHeight*0.99,
              endTimer: ''
            }
        },
      created() {
        this.haveCreditCode.speed = this.speedSelected[0].id
        this.noCreditCode.speed = this.speedSelected[0].id
      },
        mounted() {
            this.getNationCode()
            this.getCodeInfo()
            this.getReviewer()
        },
        methods: {
            QualityDialogClose() {
                this.$emit("update:dialogXBVisible", false);
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
          viewPdf (pdfName) {

            let src = '';
            let param = {
              userId: parseInt(this.$Cookies.get('userId')),
              "noticeSerialno":pdfName,
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
            //获取国家代码
            getNationCode () {
                this.$ajax.manage.getNationCode({}).then(res => {
                    console.log(res);
                    if (res.status == 200) {
                        this.nationTypeOptions = res.data.nationCode
                    }
                })
            },
            applyReport () {
                //打开报告申请弹框
                this.dialogXBVisible = true;
                this.getCodeInfo()
                this.getReviewer()
            },
            getCodeInfo () {
                let param = {
                    userId: this.$Cookies.get('userId')
                }
                this.$ajax.manage.getCodeInfoByUserId(param).then(res => {
                  console.log(res.data)
                    if (res.data.code == '0') {
                        this.isClientNo = false;
                        if (res.data.codeInfo) {
                            this.haveCreditCode.clientNo = res.data.codeInfo.clientNo;
                            this.noCreditCode.clientNo = res.data.codeInfo.clientNo;
                            //this.haveCreditCode.reportbuyerNo = res.data.codeInfo.reportbuyerNo
                           if(res.data.codeInfo.clientNo){
                             this.isClientNo = true;
                           }

                        }
                    }
                })
            },
          getReviewer() {
            let param = {
              userName: this.$Cookies.get('userCode')
            }
            this.$ajax.manage.getReviewer(param).then(res => {
              if (res.data.code == '0') {
                  this.isZxbreportAudit = res.data.isReviewer;
                  console.log(res.data.isReviewer)
              }
            })
          },
            applyNoCode () {
              // if (!this.noCreditCode.clientNo || this.noCreditCode.clientNo === '') {
              //      this.$message.warning('请输入买方代码');
              //      return;
              // } else
              if((!this.isClientNo && !this.isZxbreportAudit) || !this.isClientNo){
                this.$message.warning('您所在的二级公司没有开通信保通业务，如需使用该功能请咨询公司管理员。');
                return;
              }else if(!this.isZxbreportAudit){
                this.$message.warning('您所在的二级公司没有设置信保审核专员，如需使用该功能请咨询公司管理员。');
                return;
              }else if (this.noCreditCode.reportCorpCountryCode === '') {
                    this.$message.warning('请输入待调查企业国别');
                    return;
                } else if (this.noCreditCode.reportCorpChnName === '' && this.noCreditCode.reportCorpEngName === '') {
                    this.$message.warning('请输入待调查企业中文名称或英文名称');
                    return;
                } else if (this.noCreditCode.reportCorpaddress === '') {
                    this.$message.warning('请输入待调查企业地址');
                    return;
                } else if (this.noCreditCode.creditno === '' && this.noCreditCode.reportCorpEngName === '') {
                    this.$message.warning('请输入待调查企业统一社会信用代码');
                    return;
                }else if (this.noCreditCode.istranslation === '') {
                    this.$message.warning('请输入是否导读');
                    return;
                }
                this.$ajax.manage.zhongxinbaoApply(this.noCreditCode).then(res => {
                  console.log(!this.isClientNo)
                  console.log(!this.isZxbreportAudit)
                    if (res.status == 200) {
                        this.$message.success(res.data.returnMsg);
                        this.dialogXBVisible = false;
                    }
                })
            },
			/* reportbuyerNoIsExist: async function(val){
			    let param = {
			      reportbuyerNo: val
			    }
				var that = this
				var result = new Object();
				that.$http.jsonp('http://localhost:9292/common/reportbuyerNoIsExist',{
					params:{reportbuyerNo: val},
					jsonp:'onBack'
				}).then((res)=>{
					console.log(res)
				}) */
				/* that.$ajax.manage.reportbuyerNoIsExist(param).then(res => {
					console.log(res.data)
					if(res.data == true){
						result = true
						console.log("121221")
					}else{
						result = false
						console.log("4444444444")
					}
				}) */
			/* 	return result;
			}, */
            applyHaveCode () {
                // if (!this.haveCreditCode.clientNo || this.haveCreditCode.clientNo === '') {
                //     // this.$message.warning('请输入买方代码');
                //     // return;
                // } else
              this.haveCreditCode.forcedApply = false;
              if((!this.isClientNo && !this.isZxbreportAudit) || !this.isClientNo){
                this.$message.warning('您所在的二级公司没有开通信保通业务，如需使用该功能请咨询公司管理员。');
                return;
              }else if(!this.isZxbreportAudit){
                this.$message.warning('您所在的二级公司没有设置信保审核专员，如需使用该功能请咨询公司管理员。');
                return;
              }else  if (!this.haveCreditCode.reportbuyerNo || this.haveCreditCode.reportbuyerNo == '') {
                    this.$message.warning('请输入待调查企业中国信保企业代码');
                    return;
                } 
				else if (this.haveCreditCode.reportCorpChnName === '' && this.haveCreditCode.reportCorpEngName === '') {
                  this.$message.warning('请输入待调查企业中文名称或英文名称');
                  return;
                }
                this.$ajax.manage.zhongxinbaoApply(this.haveCreditCode).then(res => {
                  console.log(!this.isClientNo)
                  console.log(!this.isZxbreportAudit)
				  console.log("============================")
				  console.log(res.data.isExist)
				  console.log("============================")
                    if (res.status == 200) {
                       if(res.data.isExist == true){
                          console.log("============================")
                          console.log(res.data.isExist)
                          console.log("============================")
                         this.$confirm(res.data.confirmMessage, {
                           confirmButtonText: "是",
                           cancelButtonText: "放弃",
                           type: "warning",
                         })
                             .then(() => {
                               this.haveCreditCode.forcedApply = true;
                               this.$ajax.manage.zhongxinbaoApply(this.haveCreditCode).then(res => {
                                 if (res.status == 200) {
                                   this.$message.success(res.data.returnMsg);
                                   this.dialogXBVisible = false
                                 }
                               })
                               console.log("是");
                             })
                             .catch(() => {
                               if(res.data.isPreview){
                                 this.viewPdf(res.data.pdfName);
                                 // this.$message.warning('预览功能暂未开放!');
                                 // this.dialogXBVisible = false
                                 // this.$router.push({ path: '/zxbReportList' });
                               }
                               console.log("放弃");
                             });
                          return;
                        }else{
                          this.$message.success(res.data.returnMsg);
                          this.dialogXBVisible = false
                        }
                    }
                })
            }
        },
        watch:{
            dialogXBVisible(newVal){
                this.dialogVisible = newVal
            }
        }
    }
</script>

<style scoped>
    .el-dialog__body{
        padding-bottom:30px;
        padding-left:20px;
        padding-right:20px;
        padding-top:30px;
    }
	/*jina*/
	/deep/.el-input__inner {
	  border: none;
	}
	
    .report-dialog {
        line-height: 30px;
    }
    .report-table {
        line-height: 30px;
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
    .report-box {
        line-height: 30px;
        white-space: normal;
        table {
            table-layout: auto;
            th {
                border-right: 1px solid #e3e3e3;
                border-bottom: 1px solid #e3e3e3;
                height: 36px;
            }
            border: none;
            td {
                //border: none;
            }
        }
    }
</style>