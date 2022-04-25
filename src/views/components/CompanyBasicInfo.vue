<!-- 企业基本信息 -->
<template>
    <div class="companyBasicInfo">
        <div class="main-box">
            <div class="left-box">
                <div>
                    <div class="titile" style="margin-bottom: 25px;">
                      企业基本信息
                      <span style="float:right">
                        <slot></slot>
                      </span>
                      <span v-if="isBlack" style="color:white;background-color: #c1c1c1;padding: 3px;">黑名单</span>
                      <span v-if="isGrey" style="color:white;background-color: #c1c1c1;padding: 3px;">灰名单</span>
					          </div>
                    <div class="table-wrapper">
                        <table border="1">
                            <tr>
                                <td class="gbGray">公司名称</td>
                                <td colspan="2">&nbsp;{{basicInfo.name}}</td>
                                <td class="gbGray">统一社会信用代码</td>
                                <td colspan="2">&nbsp;{{basicInfo.creditCode}}</td>
                            </tr>
                            <tr>
								<td class="gbGray">公司类型</td>
								<td colspan="2">&nbsp;{{basicInfo.companyorgtype}}</td>
                                <td class="gbGray">行业</td>
                                <td colspan="2">&nbsp;{{basicInfo.industry}}</td>
                            </tr>
							<tr>
								<td class="gbGray">注册地址</td>
								<td colspan="2">&nbsp;{{basicInfo.reglocation}}</td>
								<td class="gbGray">注册资本</td>
								<td colspan="2">&nbsp;{{basicInfo.regcapital}}</td>
							</tr>
                            <tr>
                                <td class="gbGray">企业法人</td>
                                <td colspan="2">&nbsp;{{basicInfo.legalPersonName}}</td>
                                <td class="gbGray">成立时间</td>
                                <td colspan="2">&nbsp;{{$formatDate(basicInfo.estiblishtime)}}</td>
                            </tr>
							<tr>
								<td class="gbGray">登记开始时间</td>
								<td colspan="2">&nbsp;{{basicInfo.fromTime}}</td>
								<td class="gbGray">登记结束时间</td>
								<td colspan="2">&nbsp;{{basicInfo.toTime}}</td>
							</tr>
                        </table>
                    </div>
                </div>
               <!-- <div style="margin-top:40px;">
                    <div class="titile">预警推送</div>
                    <div class="table-wrapper">
                        <table border="1">
                            <tr>
                                <td class="gbGray">企业名称</td>
                                <td class="gbGray">风险原因</td>
                                <td class="gbGray">发布单位</td>
                                <td class="gbGray">审核机构</td>
                                <td class="gbGray">风险提示起止时间</td>
                            </tr>
                            <tr>
                                <td>{{basicInfo.name}}</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        </table>
                    </div>
                </div> -->
            </div>
            <!-- <div class="right-box">
                <div>
                    <div class="titile">资信信息综合画像</div>
                    <div class="table-wrapper">
                        <useMap :main="main"></useMap>
                    </div>
                </div>
                <div style="margin-top:30px;">
                    <div class="titile">预警推送</div>
                    <div class="table-wrapper">
                        <table border="1">
                            <tr>
                                <td class="gbGray">报告名称</td>
                                <td class="gbGray">查看地址</td>
                                <td class="gbGray">报告来源</td>
                                <td class="gbGray">更新日期</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div> -->
        </div>
    </div>
</template>
<script>
import useMap from '@/components/useMap'

export default {
    components: {
        useMap
    },
    data () {
        return {
            basicInfo: {},
            main: 'userMap',
            isBlack:false,  // 判断当前企业是不是在黑名单列表中
            isGrey:false
        }
    },
    created () {
	   if(this.$route.query.companyId || this.$route.query.companyName){
		   this.getBaseInfo()
	   }
	   this.getIsBlack()
      this.getIsGrey()
    },
	methods:{
		getBaseInfo(){
			let param = {
			  userId: parseInt(this.$Cookies.get('userId')),
				companyId:this.$route.query.companyId,
        companyName:this.$route.query.companyName
			}
			this.$ajax.manage.getBaseInfo(param).then(res=>{
				if(res.status==200){
					this.basicInfo = res.data.baseInfo
          sessionStorage.setItem('tycIndustry', res.data.baseInfo.industry)
				}
			})
		},
    /**
     *  判断当前企业是不是在黑名单列表中
     */
    getIsBlack(){
      let param = {
        "userCode": sessionStorage.getItem('userCode'),
        "code": this.$route.query.creditCode,
        "id": this.$route.query.id,
        "pid":this.$route.query.pid,
      }
      this.$ajax.manage.getIsBlack(param).then(res => {
        if (res.data.code == 0) {
            this.isBlack = res.data.isBlack
        }
      })

    },
    /**
     *  判断当前企业是不是在黑名单列表中
     */
    getIsGrey(){
      let param = {
        "userCode": sessionStorage.getItem('userCode'),
        "code": this.$route.query.creditCode,
        "id": this.$route.query.id,
        "pid":this.$route.query.pid,
      }
      this.$ajax.manage.getIsGrey(param).then(res => {
        if (res.data.code == 0) {
          this.isGrey = res.data.isGrey
        }
      })

    }
	}
}
</script>
<style lang="less" scoped>
.companyBasicInfo {
    width: 100%;
    height: 100%;
    margin: auto;
    //background-color: #f8f8f8;
    box-sizing: border-box;
    .main-box {
        display: flex;
        .titile {
            font-weight: bold;
            font-size: 14px;
        }
        table {
            width: 100%;
            text-align: center;
            border-collapse: collapse;
            border-spacing: 0;
            table-layout: fixed;
            margin: 15px auto;
            border: 1px solid #e3e3e3;
            td {
                word-break: break-all; /*允许在字内换行,即单词可分*/
                word-wrap: break-word; /*允许长单词或URL地址换行*/
                border-right: 1px solid #e3e3e3;
                border-bottom: 1px solid #e3e3e3;
                font-size: 14px;
                height: 36px;
				padding:0 5px
            }
            .gbGray {
                background: #f1f3f4;
            }
        }
        .left-box {
            flex: 2;
            margin-right: 15px;
        }
        .right-box {
            flex: 1;
        }
    }
}
</style>