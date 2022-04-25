<!-- 消息中心 -->
<template>
	<div class="message-center">
		<div style="margin-bottom: 5px;">
			<el-breadcrumb separator-class="el-icon-arrow-right">
			  <el-breadcrumb-item :to="{ path: '/homePage' }">首页</el-breadcrumb-item>
			  <el-breadcrumb-item>消息中心</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
<!--		<div class="main-content">-->
<!--		<div class="content-item leftBox" style="margin-top: 10px;">-->
		    <!--<div class="title">
		        <span class="icon"></span>
		        <span>预警推送</span>
		    </div>-->
<!--		    <div class="main">-->
<!--		        <el-tabs v-model="activeAlarmTab" stretch>-->
<!--		            <el-tab-pane label="实时预警" name="1">-->
<!--		                <div class="tab-content-wrapper">-->
<!--							<iframe width="100%" :height="curHeight" frameborder="0" marginwidth="0" marginheight="5" :src="urlTab1"></iframe>-->
<!--		                </div>-->
<!--		            </el-tab-pane>-->
<!--		            <el-tab-pane label="风险早报" name="2">-->
<!--		                <div class="tab-content-wrapper">-->
<!--							<iframe width="100%" :height="curHeight" frameborder="0" marginwidth="0" marginheight="5" :src="urlTab2"></iframe>-->
<!--						</div>-->
<!--		            </el-tab-pane>-->
<!--		            <el-tab-pane label="新闻早报" name="3">-->
<!--		                <div class="tab-content-wrapper">-->
<!--							<iframe width="100%" :height="curHeight" frameborder="0" marginwidth="0" marginheight="5" :src="urlTab3"></iframe>-->
<!--						</div>-->
<!--		            </el-tab-pane>-->
<!--		            <el-tab-pane label="平台消息" name="4">-->
<!--		                <div class="tab-content-wrapper">-->
<!--							<iframe width="100%" :height="curHeight" frameborder="0" marginwidth="0" marginheight="5" :src="urlTab4"></iframe>-->
<!--						</div>-->
<!--		            </el-tab-pane>-->
<!--              <el-tab-pane label="测试消息中心" name="5">-->
<!--                <div class="tab-content-wrapper">-->
<!--                  <iframe width="100%" :height="curHeight" frameborder="0" marginwidth="0" marginheight="5" :src="urlTab5"></iframe>-->
<!--                </div>-->
<!--              </el-tab-pane>-->
<!--		        </el-tabs>-->
<!--		    </div>-->
<!--		</div>-->
<!--	</div>-->
   <div style="height: calc(100% - 50px);min-height: 800px;border: none;">
    <!-- <iframe :src="srcUrl"  width="100%" height="100%" frameborder="0" scrolling="no" marginwidth="0" marginheight="5"></iframe> -->
      <template>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="实时预警" name="first">
		    <real-time-warning></real-time-warning>
          </el-tab-pane>
          <el-tab-pane label="风险早报" name="second"> 
             <risk-morning-post></risk-morning-post>
          </el-tab-pane>
          <el-tab-pane label="新闻早报" name="third"> 
             <morning-news></morning-news>
          </el-tab-pane>
          <el-tab-pane label="平台消息" name="fourth">
			   <platform-news></platform-news>
          </el-tab-pane>
        </el-tabs>
      </template>
		</div>
	</div>
</template>

<script>
import RealTimeWarning  from './components/RealTimeWarning'
import RiskMorningPost  from './components/RiskMorningPost'
import MorningNews  from './components/MorningNews'
import PlatformNews  from './components/PlatformNews'
	export default{
    components:{
      RealTimeWarning,
      RiskMorningPost,
      MorningNews,
      PlatformNews
    },

    data(){
			return{
        activeName: 'first',
        companyName: '',
        careBy:'',
				activeAlarmTab: "1",
				qichachaData: [
				    {
				        'company': 'ABC有限公司',
				        'level': '2级别',
				        'reason': '鉴于国内猪肉价格上涨',
				        'person': '张三',
				        'time': '2020-7-24'

				    },
				    {
				        'company': 'ABC有限公司',
				        'level': '2级别',
				        'reason': '鉴于国内猪肉价格上涨',
				        'person': '张三',
				        'time': '2020-7-24'
				    },
				],//天眼查
				zhongchengxinData:[
					{
						companyName:'顾家家股份有限公司',
						type:'开庭公告',
						status:'1',
						time:'2020-07-29'
					},
					{
						companyName:'顾家家股份有限公司',
						type:'注册资本',
						status:'2',
						time:'2020-07-29'
					}
				],
				curHeight:'',
				urlTab1: `${process.env.VUE_APP_FR_URL}/webroot/decision/view/form?viewlet=Homepage/TYC_RISK.cpt&op=write&userCode=`+this.$Cookies.get('userCode'),
				urlTab2: `${process.env.VUE_APP_FR_URL}/webroot/decision/view/form?viewlet=Homepage/ZCX_RISK.cpt&op=write&userCode=`+this.$Cookies.get('userCode'),
				urlTab3: `${process.env.VUE_APP_FR_URL}/webroot/decision/view/form?viewlet=Homepage/ZCX_NEWS.cpt&op=write&userCode=`+this.$Cookies.get('userCode'),
				urlTab4: `${process.env.VUE_APP_FR_URL}/webroot/decision/view/form?viewlet=Homepage/ZNX_PUSH.cpt&op=write&userCode=`+this.$Cookies.get('userCode'),
        srcUrl: `${process.env.VUE_APP_FR_URL}/webroot/decision/view/form?viewlet=Homepage/NEWS_ALL.frm&op=write&userCode=`+this.$Cookies.get('userCode'),


			}
		},

    created() {
      this.activeName = this.$route.query.activeName,
      this.companyName = this.$route.query.companyName,
      this.careBy = this.$route.query.careBy
    },

		mounted() {
			var h = document.documentElement.clientHeight || document.body.clientHeight;
			this.curHeight =h-230;
		},
		methods:{
			gobi(){
			    this.$router.push({
			        path: '/iframePage',
			        query: {
			            title:encodeURIComponent('中诚信'),
			            url:encodeURIComponent(`${process.env.VUE_APP_FR_URL}/webroot/decision/view/form?viewlet=test.cpt&op=view&userCode=${this.$Cookies.get('userCode')}`)
			        }
			    })
			},
      handleClick(tab, event) {
        console.log(tab, event);
      }
		}
	}
</script>

<style lang="less" scoped>
	.message-center{
		width: 90%;
		height: 100%;
		margin: auto;
		background-color: #f8f8f8;
		box-sizing: border-box;
		padding: 20px;
		overflow-block: auto;
		.title {
		    margin-bottom: 5px;
		    font-size: 14px;
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
				.status-style{
					border-radius: 20%;
					padding: 3px;
					color: #fff;
					margin-left: 5px;
					text-align: center;
					font-size: 12px;
				}
		    }
		}
	}
</style>
