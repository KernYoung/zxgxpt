<template>
    <el-dialog title="下发接口服务"
               :visible.sync="dialogVisible"
               @close="QualityDialogClose"
               width="1200px"
               class="report-dialog"
    >
      <pre style="font-size: 12px">
        一、基本说明：
        1.网络申请：
        资信库测试IP端口为10.0.132.12:9292，需得到集团运维中心网络授权许可。
        2.测试授权：
        tokenid（各公司单独分配）及token（统一秘钥）需向集团资信门户管理员（信息中心-黎婷）申请授权使用，申请时需说明申请接口类型（如：数据下发、页面调用、模糊查询等）及测试周期，便于授权管理及统计。
        3.生产授权：
        待测试环境测试完成后可统一向集团申请正式环境授权，不同成员公司将提供不同token。
        4.费用说明：
        由于接口需要和第三方接口交互，因此测试环境接口也会调用第三方正式接口产生费用（如天眼查工商信息），请测试过程以测通功能为主，勿批量使用或投产。

        <table border="1" class="report-table">
        <tr class="gbGray">
              <th width="100px">工商信息接口</th>
              <th width="90px">主动请求</th>
              <th width="200px">主动获取客商工商信息</th>
              <th width="80px">天眼查</th>
              <th width="70px">下载</th>
          </tr>
          <tr class="gbGray">
              <th width="100px">企业基本信息接口</th>
              <th width="90px">主动请求</th>
              <th width="200px">主动获取客商企业基本信息</th>
              <th width="80px">天眼查</th>
              <th width="70px">下载</th>
          </tr>
          <tr class="gbGray">
              <th width="100px">舆情信息接口</th>
              <th width="90px">主动请求</th>
              <th width="200px">主动获取客商舆情信息</th>
              <th width="80px">天眼查</th>
              <th width="70px">下载</th>
          </tr>
          <tr class="gbGray">
              <th width="100px">联系信息接口</th>
              <th width="90px">主动请求</th>
              <th width="200px">主动获取客商联系信息</th>
              <th width="80px">天眼查</th>
              <th width="70px">下载</th>
          </tr>
          <tr class="gbGray">
              <th width="100px">模糊查询接口</th>
              <th width="90px">主动请求</th>
              <th width="200px">主动获取关键字查询后的模糊检索结果</th>
              <th width="80px">天眼查</th>
              <th width="70px">下载</th>
          </tr>
          <tr class="gbGray">
              <th width="100px">中诚信报告接口</th>
              <th width="90px">主动请求</th>
              <th width="200px">主动获取中诚信提供的资信报告，共五类，均为HTML格式。</th>
              <th width="80px">中诚信</th>
              <th width="70px">下载</th>
          </tr>
          <tr class="gbGray">
              <th width="100px">门户平台页面接口</th>
              <th width="90px">主动请求</th>
              <th width="200px">主动获取资信门户平台页面</th>
              <th width="80px">资信库</th>
              <th width="70px">下载</th>
          </tr>
          <tr class="gbGray">
              <th width="100px">天眼查页面接口</th>
              <th width="90px">主动请求</th>
              <th width="200px">主动获取天眼查网址嵌入页面</th>
              <th width="80px">天眼查</th>
              <th width="70px">下载</th>
          </tr>
          <tr class="gbGray">
              <th width="100px">关注接口</th>
              <th width="90px">主动请求</th>
              <th width="200px">调用后触发门户的客商关注功能</th>
              <th width="80px">资信库</th>
              <th width="70px">下载</th>
          </tr>
          <tr class="gbGray">
              <th width="100px">消息推送接口-天眼查</th>
              <th width="90px">被动获取</th>
              <th width="200px">需成员公司提供回调接口，资信库调用回调接口推送天眼查实时预警</th>
              <th width="150px">天眼查</th>
              <th width="150px">下载</th>
          </tr>
          <tr class="gbGray">
              <th width="100px">消息推送接口-中诚信</th>
              <th width="90px">被动获取</th>
              <th width="200px">需成员公司提供回调接口，资信库调用回调接口推送中诚信风险早报及新闻早报</th>
              <th width="80px">中诚信</th>
              <th width="70px">下载</th>
          </tr>
          <tr class="gbGray">
              <th width="100px">信保PDF下载接口</th>
              <th width="90px">主动获取</th>
              <th width="200px">主动获取已有报告的PDF下载链接</th>
              <th width="80px">资信库</th>
              <th width="70px">下载</th>
          </tr>
          <tr class="gbGray">
              <th width="100px">信保报告信息申请接口</th>
              <th width="90px">主动获取</th>
              <th width="200px">主动申请信保报告（免门户审核）</th>
              <th width="80px">资信库</th>
              <th width="70px">下载</th>
          </tr>
          <tr class="gbGray">
              <th width="100px">信保摘要页面获取接口</th>
              <th width="90px">主动获取</th>
              <th width="200px">主动获取门户信保摘要页面</th>
              <th width="80px">资信库</th>
              <th width="70px">下载</th>
          </tr>

        </table>
        二、接口文档：
        接口名称	接口类型	接口说明	数据源	下载入口
        工商信息接口	主动请求	主动获取客商工商信息	天眼查	下载
        企业基本信息接口	主动请求	主动获取客商企业基本信息	天眼查	下载
        舆情信息接口	主动请求	主动获取客商舆情信息	天眼查	下载
        联系信息接口	主动请求	主动获取客商联系信息	天眼查	下载
        模糊查询接口	主动请求	主动获取关键字查询后的模糊检索结果	天眼查	下载
        中诚信报告接口	主动请求	主动获取中诚信提供的资信报告，共五类，均为HTML格式。	中诚信	下载
        门户平台页面接口	主动请求	主动获取资信门户平台页面	资信库	下载
        天眼查页面接口	主动请求	主动获取天眼查网址嵌入页面	天眼查	下载
        关注接口	主动请求	调用后触发门户的客商关注功能	资信库	下载
        消息推送接口-天眼查	被动获取	需成员公司提供回调接口，资信库调用回调接口推送天眼查实时预警	天眼查	下载
        消息推送接口-中诚信	被动获取	需成员公司提供回调接口，资信库调用回调接口推送中诚信风险早报及新闻早报	中诚信	下载
        信保PDF下载接口	主动获取	主动获取已有报告的PDF下载链接	资信库	下载
        信保报告信息申请接口	主动获取	主动申请信保报告（免门户审核）	资信库	下载
        信保摘要页面获取接口	主动获取	主动获取门户信保摘要页面	资信库	下载

        三、联系方式：
        如有疑问，请成员公司子管理员联系集团信息中心黎婷进行咨询沟通。

      </pre>
    </el-dialog>
</template>
<script>
	import $ from 'jquery'
    export default {
        name: 'InterfaceDownload',
        props: {
          dialogInterfaceDownload:{
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
                nationTypeOptions:[],
                istranslation: [{ name: '否', id: '0' }, { name: '是', id: '1' }],
                noIstranslation: [{ name: '否', id: '0' }, { name: '是', id: '1' }],
                isClientNo:false,
                isZxbreportAudit:false,
            }
        },
        mounted() {
            this.getNationCode()
            this.getCodeInfo()
            this.getReviewer()
        },
        methods: {
            QualityDialogClose() {
                this.$emit("update:dialogInterfaceDownload", false);
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
                this.dialogInterfaceDownload = true;
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
                        this.dialogInterfaceDownload = false;
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
						/* if(res.data.isExist == 'true'){
							console.log("============================")
							console.log(res.data.isExist)
							console.log("============================")
							this.$message.warning('该企业代码已被申请，请进入信保列表查看');
							return;
						}else{ */
							this.$message.success(res.data.returnMsg);
							this.dialogInterfaceDownload = false
						/* } */

                    }
                })
            }
        },
        watch:{
          dialogInterfaceDownload(newVal){
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