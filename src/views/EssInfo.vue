<template>
    <div class="essInfo">
		<!-- <div style="margin-bottom: 15px;">
			<div class="title" v-if="activeTab=='1'">
			    <span @click="cancleTYCFoucus" v-if="tianyanchaCare">
                    <el-button @click="isFullscreen=true" @click.stop="isFullscreen=true" size="mini" type="success" round>
                        <i class="el-icon-full-screen"></i>
                        全屏查看
                    </el-button>
			        <img src="../../public/img/images/notice.png" alt="">
                    取消关注
                    (数据源：天眼查)
			    </span>
			    <span @click="goTYCFocus" v-else>
                    <el-button @click="isFullscreen=true" @click.stop="isFullscreen=true" size="mini" type="success" round>
                        <i class="el-icon-full-screen"></i>
                        全屏查看
                    </el-button>
			        <img src="../../public/img/images/noticeDel.png" alt="">
			        关注
                    (数据源：天眼查)
			    </span>
			</div>
			<div class="title" v-else-if="activeTab=='0'">
			    <span @click="cancleZCXFoucus" v-if="zhongchengxinCare">
			        <img src="../../public/img/images/notice.png" alt="">
			        取消关注
                    (数据源：中诚信)
			    </span>
			    <span @click="goZCXFocus" v-else>
			        <img src="../../public/img/images/noticeDel.png" alt="">
			        关注
                    (数据源：中诚信)
			    </span>
			</div>
		</div> -->
       <!-- <div class="name">{{companyName}}</div> -->
        <el-tabs type="border-card" v-model="activeTab" tabPosition="left" @tab-click="handleClick">
            <el-tab-pane label="基本信息" >
                <CompanyBasicInfo>
					<span>
						<el-button type="primary" size="small" @click="cancleZCXFoucus" v-if="zhongchengxinCare" style="margin-right: 10px;" >
							<i class="el-icon-star-on" style="font-size: 16px;"></i> 
							取消关注（数据源：中诚信）</el-button>
						<el-button type="primary" size="small" @click="goZCXFocus" v-else style="margin-right: 10px;">
							<i class="el-icon-star-off" style="font-size: 16px;"></i> 
							关注（数据源：中诚信）</el-button>
					</span>
					<span>
						<el-button type="primary" size="small" @click="cancleTYCFoucus" v-if="tianyanchaCare">
							<i class="el-icon-star-on" style="font-size: 16px;"></i> 
							取消关注（数据源：天眼查）</el-button>
						<el-button type="primary" size="small" @click="goTYCFocus" v-else>
							<i class="el-icon-star-off" style="font-size: 16px;"></i> 
							关注（数据源：天眼查）</el-button>
					</span>
				</CompanyBasicInfo>
				<div style="display: flex;">
					<div style="flex: 1;margin-right: 15px;"><ZXBPage></ZXBPage></div>
					<div style="flex: 1;"> <ZCXPage></ZCXPage></div>
				</div>

              <pre>







              </pre>
<!--				 -->
            </el-tab-pane>
			<!-- 天眼查 -->
<!--            <el-tab-pane label="工商舆情">-->
<!--&lt;!&ndash;                <TYCPage class="tyc" :target="tycUrl"></TYCPage>&ndash;&gt;-->
<!--               <iframe id="tycUrl" width="100%" :height="curHeight"  frameborder="0" marginwidth="0" marginheight="5" :src="tycUrl"></iframe>-->
<!--            </el-tab-pane>-->

          <el-tab-pane label="工商舆情">
<!--            <iframe id="tycUrl" width="100%" :height="curHeight"  frameborder="0" marginwidth="0" marginheight="5" :src="tycUrl"></iframe>-->
            <iframe :src="tycUrl" id="tycUrl" frameborder="0" width="100%" :height="curHeight"></iframe>
          </el-tab-pane>

			<!-- 中信保 -->
           <!-- <el-tab-pane label="信保报告">
                <ZXBPage></ZXBPage>
            </el-tab-pane> -->
			<!-- 中诚信 -->
            <!-- <el-tab-pane label="企业评级报告">
                <ZCXPage></ZCXPage>
            </el-tab-pane> -->



<!--          <el-tab-pane label="测试">-->
<!--            &lt;!&ndash;                <TYCPage class="tyc" :target="tycUrl"></TYCPage>&ndash;&gt;-->
<!--            <iframe id="test" width="100%" :height="curHeight"  frameborder="0" marginwidth="0" marginheight="5" :src="testUrl"></iframe>-->
<!--          </el-tab-pane>-->

<!--          <el-tab-pane label="测试1">-->
<!--            	<span>-->
<!--						<el-button type="primary" size="small" @click="toBaidu" >-->
<!--							<i class="el-icon-star-on" style="font-size: 16px;"></i>-->
<!--							跳转测试</el-button>-->
<!--					</span>-->
<!--          </el-tab-pane>-->


        </el-tabs>

        <el-dialog title="关注" :visible.sync="dialogFormVisible" width="450px" @close="cancle">
            <div slot="title" class="header-title">
                <span>关注 &nbsp;&nbsp;&nbsp;&nbsp;</span>
                <!--<br>
                <span style="color: #409EFF;font-size: smaller"> 温馨提示：如果企业类型为城投企业，则行政级别和省/市/区必填</span>-->
            </div>
<!--            <div align="center">-->
<!--                <label style="font-size: smaller;color: #9b9b9b">如果企业类型为城投企业，则行政级别和省/市/区必填</label>-->
<!--            </div>-->
            <el-form :model="form" label-width="150px" :rules="rules" ref="form">
                <el-form-item label="统一社会信用代码：" prop="code">
                    <el-input v-model="form.code" disabled style="width:220px"></el-input>
                </el-form-item>
                <el-form-item label="企业名称：" prop="entName">
                    <el-input v-model="form.entName" disabled style="width:220px"></el-input>
                </el-form-item>
                <el-form-item label="企业类型：" prop="entType">
                    <el-select v-model="form.entType" placeholder="请选择企业类型" style="width:220px" clearable>
                        <el-option :label="item.value" :value="item.code" v-for="item in entTypeOptions"
                            :key="item.code"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="行政级别：" prop="areaLevel">
                    <el-select v-model="form.areaLevel" placeholder="请选择行政级别" style="width:220px" clearable>
                        <el-option :label="item.value" :value="item.value" v-for="item in areaLevelOptions"
                            :key="item.code"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="省：" prop="provinceCode">
                    <el-select v-model="form.provinceCode" placeholder="请选择省级名称" style="width:220px" clearable
                        @change="changeProvince">
                        <el-option :label="item.areaName" :value="item.areaCode" v-for="item in provinceOptions"
                            :key="item.areaCode"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="市：" prop="cityCode">
                    <el-select v-model="form.cityCode" placeholder="请选择地市级名称" style="width:220px" clearable
                        @change="changeCity">
                        <el-option :label="item.areaName" :value="item.areaCode" v-for="item in cityOptions"
                            :key="item.areaCode">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="区：" prop="countyCode">
                    <el-select v-model="form.countyCode" placeholder="请选择区县级名称" style="width:220px" clearable>
                        <el-option :label="item.areaName" :value="item.areaCode" v-for="item in countyOptions"
                            :key="item.areaCode"></el-option>
                    </el-select>
                </el-form-item>
                <div align="center">
                    <label style="font-size: smaller;color: #409EFF">如果企业类型为城投企业，则行政级别和省/市/区必填</label>
                </div>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancle">取 消</el-button>
                <el-button type="primary" @click="confirmTYC('form')" v-if="type==1" >确 定</el-button>
                <el-button type="primary" @click="confirmZCX('form')" v-else-if="type==2">确 定</el-button>
            </div>
        </el-dialog>
       <el-dialog width="100%" height="100%"  :visible.sync="isFullscreen" fullscreen title="全屏查看">
         <iframe width="100%" :height="maxHeight"  frameborder="0" marginwidth="0" marginheight="5" :src="tycUrl"></iframe>-->
      </el-dialog>
    </div>
</template>
<script>
import CompanyBasicInfo from './components/CompanyBasicInfo'
import ZXBPage from './components/ZXBPage'//中信保
import TYCPage from './components/TYCPage' //天眼查
import ZCXPage from './components/ZCXPage' //中诚信
export default {

    components: {
        CompanyBasicInfo,
        ZXBPage,
        TYCPage,
        ZCXPage
    },
    data () {
        let validateAreaLevel = (rule, value, callback) => {
            if (this.form.entType == '1') {
                if (value === '') {
                    callback(new Error('请选择行政级别'));
                } else {
                    callback()
                }
            } else {
                callback()
            }
        };
        let validateProvince = (rule, value, callback) => {
            if (this.form.entType == '1' && this.form.areaLevel != '') {
                if (value === '') {
                    callback(new Error('请选择省级名称'));
                } else {
                    callback()
                }
            } else {
                callback()
            }
        };
        let validateCity = (rule, value, callback) => {
            if (this.form.entType == '1' && (this.form.areaLevel == '2' || this.form.areaLevel == '3')) {
                if (value === '') {
                    callback(new Error('请选择地市级名称'));
                } else {
                    callback()
                }
            } else {
                callback()
            }
        };
        let validateCounty = (rule, value, callback) => {
            if (this.form.entType == '1' && this.form.areaLevel == '3') {
                if (value === '') {
                    callback(new Error('请选择区县级名称'));
                } else {
                    callback()
                }
            } else {
                callback()
            }
        };
        return {
            companyName: '',
            activeTab: this.$route.query.index,
            careStatus: {},
            isCare: '',
            tianyanchaCare: false,
            zhongchengxinCare: false,
            dialogFormVisible: false,
            form: {
                code: this.$route.query.creditCode ,
                entName: '',
                entType: '',
                areaLevel: '',
                provinceCode: '',
                provinceName: '',
                cityCode: '',
                cityName: '',
                countyCode: '',
                countyName: ''
            },
            provinceOptions: [],
            cityOptions: [],
            countyOptions: [],
            entTypeOptions: [
                {
                    code: '0',
                    value: '非城投企业'
                },
                {
                    code: '1',
                    value: '城投企业'
                }
            ],
            areaLevelOptions: [
                {
                    code: '1',
                    value: '省级'
                },
                {
                    code: '2',
                    value: '地市级'
                },
                {
                    code: '3',
                    value: '区县级'
                }
            ],
            type: null,
            rules: {
                code: [
                    { required: true, message: '请输入统一社会信用代码', trigger: 'blur' }
                ],
                entName: [
                    { required: true, message: '请输入企业名称', trigger: 'blur' }
                ],
                entType: [
                    { required: true, message: '请选择企业类型', trigger: 'change' }
                ],
                areaLevel: [
                    { validator: validateAreaLevel, trigger: 'change' }
                ],
                provinceCode: [
                    { validator: validateProvince, trigger: 'change' }
                ],
                cityCode: [
                    { validator: validateCity, trigger: 'change' }
                ],
                countyCode: [
                    { validator: validateCounty, trigger: 'change' }
                ]
            },
            tycUrl:'',
            testUrl:'',
            curHeight:'',
            maxHeight: document.documentElement.clientHeight || document.body.clientHeight,
            isFullscreen: false
        }
    },
    created () {
        this.getCareStatus();
        this.getArea();
      console.log(this.$route.query)
		  this.$Bus.$on('largerWindow',()=>{
			this.isFullscreen=true
		})
    },
    mounted() {
        var h = document.documentElement.clientHeight || document.body.clientHeight;
        this.curHeight =h-50; //减去页面上固定高度height
        this.getTYCUrl();
      this.getTestUrl();

      /**
       * iframe-宽高自适应显示
       */
      function changeMobsfIframe(){
        const tycUrl = document.getElementById('tycUrl');
        const deviceWidth = document.body.clientWidth||document.documentElement.clientWidth;
        const deviceHeight = document.body.clientHeight||document.documentElement.clientHeight;


        tycUrl.style.width = (Number(deviceWidth)-120) + 'px'; //数字是页面布局宽度差值
        tycUrl.style.height = (Number(deviceHeight)-80) + 'px'; //数字是页面布局高度差


      }

      changeMobsfIframe()

      window.onresize = function(){
        changeMobsfIframe()
      }

    },
    methods: {
        handleClick(tab,event){
          this.$Bus.$emit('showLargeBtn',tab.index)
        },
        getCareStatus () {
            let param = {
                companyId: parseInt(this.$route.query.companyId),
                userId: parseInt(this.$Cookies.get('userId'))
            }
            this.$ajax.manage.getCareStatus(param).then(res => {
                if (res.data.code == '0') {
					console.log(res)
					if(res.data.careStatus){
						this.careStatus = JSON.parse(res.data.careStatus);
						//this.companyName = this.careStatus.companyName;
						//this.form.entName = this.careStatus.companyName;
						this.companyName = this.$route.query.companyName;
						this.form.entName =this.$route.query.companyName;
						if (this.careStatus.zhongchengxin == '1') {
						    this.zhongchengxinCare = true
						} else {
						    this.zhongchengxinCare = false
						};
						if (this.careStatus.tianyancha == '1') {
						    this.tianyanchaCare = true
						} else {
						    this.tianyanchaCare = false
						}
					}
                }
            })
        },
        getArea () {
            //获取省市区县信息
            this.$ajax.manage.getArea({}).then(res => {
                if (res.status == 200) {
                    this.provinceOptions = res.data.areaList
                }
            })
        },
        changeProvince (val) {
            //省份下拉框改变时
            this.form.cityCode = '';
            this.form.countyCode = '';
            this.cityOptions = this.provinceOptions.find(item => item.areaCode === val).children;
        },
        changeCity (val) {
            //市级下拉框改变时
            this.form.countyCode = ''
            this.countyOptions = this.cityOptions.find(item => item.areaCode === val).children;
        },
        cancle () {
            this.dialogFormVisible = false;
            this.resetForm();
            this.$refs.form.resetFields();
        },
        resetForm () {
            this.form = {
                code: this.$route.query.creditCode,
                entName: this.companyName,
                entType: '',
                areaLevel: '',
                provinceCode: '',
                provinceName: '',
                cityCode: '',
                cityName: '',
                countyCode: '',
                countyName: ''
            };
        },
        confirmZCX (formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let param = {
                        userId: this.$Cookies.get('userId'),
                        companyId: this.$route.query.companyId,
                        code: this.$route.query.creditCode,
                        entName: this.companyName,
                        entType: this.form.entType,
                        areaLevel: this.form.areaLevel,
                        provinceCode: this.form.provinceCode,
                        provinceName: this.form.provinceCode !== '' ? this.provinceOptions.find(item => item.areaCode == this.form.provinceCode).areaName : '',
                        cityCode: this.form.cityCode,
                        cityName: this.form.cityCode !== '' ? this.cityOptions.find(item => item.areaCode == this.form.cityCode).areaName : '',
                        countyCode: this.form.countyCode,
                        countyName: this.form.countyCode !== '' ? this.countyOptions.find(item => item.areaCode == this.form.countyCode).areaName : '',
                        zhongchengxin: '1'
                    }
                    console.log(param);
					if(param.entType=='1'){
						if(param.areaLevel==''){
							this.$message.warning('请选择行政级别');
							return;
						}
					}
                    this.$ajax.manage.careOrNot(param).then(res => {
                        console.log(res);
                        if (res.data.code == 0) {
                            this.$message.success(res.data.msg);
                            this.dialogFormVisible = false;
                            this.getCareStatus()
                        } else {
                            this.$message.error(res.data.msg);
                        }
                    })
                } else {
                    return false;
                }
            });
        },
        confirmTYC (formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let param = {
                        userId: this.$Cookies.get('userId'),
                        companyId: this.$route.query.companyId,
                        code: this.$route.query.creditCode,
                        entName: this.companyName,
                        entType: this.form.entType,
                        areaLevel: this.form.areaLevel,
                        provinceCode: this.form.provinceCode,
                        provinceName: this.form.provinceCode !== '' ? this.provinceOptions.find(item => item.areaCode == this.form.provinceCode).areaName : '',
                        cityCode: this.form.cityCode,
                        cityName: this.form.cityCode !== '' ? this.cityOptions.find(item => item.areaCode == this.form.cityCode).areaName : '',
                        countyCode: this.form.countyCode,
                        countyName: this.form.countyCode !== '' ? this.countyOptions.find(item => item.areaCode == this.form.countyCode).areaName : '',
                        tianyancha: '1'
                    }
                    console.log(param);
                    this.$ajax.manage.careOrNot(param).then(res => {
                        console.log(res);
                        if (res.data.code == 0) {
                            this.$message.success(res.data.msg);
                            this.dialogFormVisible = false;
                            this.getCareStatus()
                        } else {
                            this.$message.error(res.data.msg);
                        }
                    })
                } else {
                    return false;
                }
            });
        },
        cancleZCXFoucus () {
            //取消关注
            let param = {
                userId: this.$Cookies.get('userId'),
                companyId: this.$route.query.companyId,
                zhongchengxin: '0'
            }
            this.$ajax.manage.careOrNot(param).then(res => {
                console.log(res);
                if (res.data.code == 0) {
                    this.$message.success(res.data.msg);
                    this.getCareStatus()
                } else {
                    this.$message.error(res.data.msg);
                }
            })
        },
		cancleTYCFoucus () {
		    //取消关注
		    let param = {
		        userId: this.$Cookies.get('userId'),
		        companyId: this.$route.query.companyId,
		        tianyancha: '0'
		    }
		    this.$ajax.manage.careOrNot(param).then(res => {
		        console.log(res);
		        if (res.data.code == 0) {
		            this.$message.success(res.data.msg);
		            this.getCareStatus()
		        } else {
		            this.$message.error(res.data.msg);
		        }
		    })
		},
        goTYCFocus () {
            //zxb关注
            // this.resetForm();
            //this.dialogFormVisible = true;
            //this.type = 1;
            let param = {
                userId: this.$Cookies.get('userId'),
                companyId: this.$route.query.companyId,
                tianyancha: '1'
            }
            this.$ajax.manage.careOrNot(param).then(res => {
                console.log(res);
                if (res.data.code == 0) {
                    this.$message.success(res.data.msg);
                    this.getCareStatus()
                } else {
                    this.$message.error(res.data.msg);
                }
            })
        },
        goZCXFocus () {
            //zcx关注
            // this.resetForm();
            this.dialogFormVisible = true;
            this.type = 2;
        },
        getTYCUrl(){
            //TODO 组装天眼查URL
            let tycid = this.$route.query.id;
          console.log('tycid: ' + tycid);
            let username = "zjb_"+this.$Cookies.get('userCode');
          console.log('username: ' + username);
            let sign = this.$md5(username+"44bce5ef-873e-4689-b515-a1ef9775aa82");
          console.log('sign: ' + sign);
            //this.tycUrl = `http://std.tianyancha.com/cloud-std-security/aut/login.json?username=1111&authId=2701&sign=4d53b6d11889e8eb3cd5c77cce7358d0&redirectUrl=/company/${tycid}/background`
            this.tycUrl = `https://pro.tianyancha.com/cloud-std-security/aut/login.json?username=${username}&authId=lf2b4yqy4lsfgp1x&sign=${sign}&redirectUrl=/company/${tycid}/background`
            //this.tycUrl = `https://std.test.s.tianyancha.cn/cloud-std-security/aut/login.json?username=${username}&authId=lf2b4yqy4lsfgp1x&sign=${sign}&redirectUrl=/company/${tycid}/background`
          console.log('tycUrl: ' + tycUrl);
          /**
            this.$ajax.manage.getData(this.$route.query.companyName).then(res=>{
                let tycid = res.data.result.items[0].id
                alert(tycid);
                this.tycUrl = `http://std.tianyancha.com/cloud-std-security/aut/login.json?username=1111&authId=2701&sign=4d53b6d11889e8eb3cd5c77cce7358d0&redirectUrl=/company/${tycid}/background`
            })
            */
        },
      getTestUrl(){
        this.testUrl = `https://pro.tianyancha.com/cloud-std-security/aut/login.json?username=zjb_admin&authId=lf2b4yqy4lsfgp1x&sign=83e7336999ffe9f03900f878c8c6db54&redirectUrl=/company/1211192073/background`;
      },
      toBaidu(){
        window.location.href = this.testUrl;
      },


    }
}






</script>
<style lang="less" scoped>
.essInfo {
	/deep/ .el-dialog__body{
		padding: 0;
	}
    width: 100%;
    min-width: 1300px;
    height: 100%;
    margin: auto;
    padding: 20px 5%;
    box-sizing: border-box;
    overflow: auto;

    .title {
        text-align: right;
        color: #ffa931;
        height: 35px;
        line-height: 35px;

        span {
            cursor: pointer;

            img {
                width: 24px;
                height: 24px;
                vertical-align: middle;
                position: relative;
                bottom: 3px;
            }
        }
    }

    .name {
        margin-bottom: 22px;
        font-size: 18px;
    }

}
</style>