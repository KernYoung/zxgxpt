<!-- 城投企业信用评价 -->
<template>
  <div class="risk-screen">
    <div style="margin-bottom: 15px;">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/homePage' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/essInfo' ,query:$route.query}">查看</el-breadcrumb-item>
        <el-breadcrumb-item>城投企业信用评价</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="content">
      <div class="steps">
        <el-steps :active="active" finish-status="success" align-center>
          <el-step title="财务信息"></el-step>
          <el-step title="非财务信息"></el-step>
          <el-step title="信用评价"></el-step>
          <el-step title="评价结果下载"></el-step>
        </el-steps>
      </div>
      <div class="main" v-if="active===0">
        <table>
          <tr>
            <td style="text-align: right;" width="300px">主体名称：</td>
            <td>{{companyName}}</td>
          </tr>
          <tr>
            <td style="text-align: right;">统一社会信用代码/注册码：</td>
            <td>{{creditNo}}</td>
          </tr>
          <tr>
            <td style="text-align: right;">所属行业：</td>
            <td>城投</td>
          </tr>
          <tr>
            <td style="text-align: right;">财报信息：</td>
            <td>数据取自近两年财报</td>
          </tr>
        </table>
      </div>
      <div class="main" v-if="active===1">
        <div class="title">选择区域：</div>
        <table style="margin-bottom: 15px;">
          <tr>
            <td style="text-align: right;">行政级别：</td>
            <td>
              <el-select v-model="form.areaLevel" placeholder="请选择行政级别" style="width:200px" clearable size="small">
                <el-option :label="item.value" :value="item.code" v-for="item in areaLevelOptions" :key="item.code">
                </el-option>
              </el-select>
            </td>
          </tr>
          <tr>
            <td style="text-align: right;">区域名称：</td>
            <td>
              <el-select v-model="form.provinceCode" placeholder="省名" style="width:200px" clearable
                @change="changeProvince" size="small">
                <el-option :label="item.areaName" :value="item.areaCode" v-for="item in provinceOptions"
                  :key="item.areaCode"></el-option>
              </el-select>
              <el-select v-model="form.cityCode" placeholder="地市名" style="width:200px;margin-left: 10px;" clearable
                @change="changeCity" size="small">
                <el-option :label="item.areaName" :value="item.areaCode" v-for="item in cityOptions"
                  :key="item.areaCode">
                </el-option>
              </el-select>
              <el-select v-model="form.countyCode" placeholder="区县名" style="width:200px;margin-left: 10px;" clearable
                size="small" @click="changeCounty">
                <el-option :label="item.areaName" :value="item.areaCode" v-for="item in countyOptions"
                  :key="item.areaCode"></el-option>
              </el-select>
            </td>
          </tr>
        </table>

        <div class="title">区域定量指标：</div>
        <div class="table-box">
          <table v-for="(item,index) in regionInfo.values" :key="index">
            <tr>
              <th>{{index}}</th>
              <th>数值</th>
            </tr>
            <tr>
              <td>
                <span style="color: red;font-size: 20px;">*</span>
                城镇居民人均可支配收入（元）</td>
              <td>{{item.v12}}</td>
            </tr>
            <tr>
              <td>
                <span style="color: red;font-size: 20px;">*</span>
                一般公共预算收入（亿元）</td>
              <td>{{item.v8}}</td>
            </tr>
            <tr>
              <td>
                <span style="color: red;font-size: 20px;">*</span>
                税收收入（亿元）</td>
              <td>{{item.v15}}</td>
            </tr>
            <tr>
              <td>
                <span style="color: red;font-size: 20px;">*</span>
                地方政府债务余额（亿元）</td>
              <td>{{item.v16}}</td>
            </tr>
            <tr>
              <td>
                <span style="color: red;font-size: 20px;">*</span>
                地方政府PPP余额（亿元）</td>
              <td>{{item.v17}}</td>
            </tr>
            <tr>
              <td>
                <span style="color: red;font-size: 20px;">*</span>
                一般公共预算支出（亿元）</td>
              <td>{{item.v14}}</td>
            </tr>
            <tr>
              <td>
                <span style="color: red;font-size: 20px;">*</span>
                区域内公开发债城投企业有息债务余额（亿元）</td>
              <td>{{item.v18}}</td>
            </tr>
            <tr>
              <td>
                <span style="color: red;font-size: 20px;">*</span>
                GDP（亿元）</td>
              <td>{{item.v10}}</td>
            </tr>
          </table>
        </div>

        <div class="title">区域调整项：</div>
        <div class="table-box">
          <el-table :data="tableData" style="width: 100%" border size="medium">
            <el-table-column prop="name" label="名称">
            </el-table-column>
            <el-table-column prop="detail" label="详情" width="400px">
            </el-table-column>
            <el-table-column prop="impress" label="影响">
            </el-table-column>
            <el-table-column label="操作">
              <template>
                <span>忽略</span>
                <el-divider direction="vertical"></el-divider>
                <span>恢复</span>
              </template>
            </el-table-column>
            <el-table-column prop="from" label="来源">
            </el-table-column>
          </el-table>
        </div>
        <div class="title">其他信息：</div>
        <div>
          该企业是否区域内最重要城投企业：
          <el-radio-group v-model="radio">
            <el-radio :label="0">是</el-radio>
            <el-radio :label="1">否</el-radio>
          </el-radio-group>
        </div>
      </div>
      <div class="main" v-if="active===2">
        <el-card class="box-card">
          <!-- <div v-html="htmlContent" style="overflow: auto;height: 550px;margin: auto;"></div> -->
		  <iframe :srcdoc="htmlContent" height="600px" width="100%" frameborder="0" marginwidth="0">
		  </iframe>
        </el-card>
      </div>
      <div class="main" v-if="active===3">
        <div class="btn-box">
          <el-button type="primary" style="align:center" @click="getLiteRatingPDF">
            <i :class="{'el-icon-loading':loading,'el-icon-download':!loading}"></i>
            报告下载</el-button>
        </div>
      </div>
      <div class="btn-box">
        <el-button type="primary" size="small" @click="lastStep" :disabled="lastDisabled">上一步</el-button>
        <el-button type="primary" size="small" @click="nextStep" :disabled="nextDisabled">下一步</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      active: 0,
      companyName: this.$route.query.companyName,
      creditNo: this.$route.query.creditCode,
      htmlContent: '',
      loading: false,
      lastDisabled: true,
      nextDisabled: false,
      form: {
        areaLevel: '',
        provinceCode: '',
        cityCode: '',
        cityName: '',
        countyCode: '',
        countyName: ''
      },
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
      provinceOptions: [],
      cityOptions: [],
      countyOptions: [],
      tableData: [
        {
          name: '非标风险事件',
          detail: '区域本级的城投企业未发生过非标风险事件',
          impress: '0',
          from: '系统'
        }
      ],
      radio: 0,
      fileName: '',
      regionInfo: {}
    }
  },
  mounted () {
    this.getArea()
  },
  watch: {
    active (newVal, oldVal) {
      console.log(newVal);
      if (newVal == 3) {
        this.nextDisabled = true;
        this.lastDisabled = false
      } else if (newVal == 0) {
        this.nextDisabled = false;
        this.lastDisabled = true
      } else {
        this.nextDisabled = false;
        this.lastDisabled = false
      }
    }
  },
  methods: {
    getArea () {
      //获取省市区县信息
      this.$ajax.manage.getArea({}).then(res => {
        console.log(res);
        if (res.status == 200) {
          this.provinceOptions = res.data.areaList
        }
      })
    },
    changeProvince (val) {
      //省份下拉框改变时
      this.form.cityCode = '';
      this.form.countyCode = '';
      if (val != '') {
        this.cityOptions = this.provinceOptions.find(item => item.areaCode === val).children;
      };
      if (this.form.areaLevel == '1') {
        this.getRegionInfo()
      }
    },
    changeCity (val) {
      //市级下拉框改变时
      if (val != '') {
        this.countyOptions = this.cityOptions.find(item => item.areaCode === val).children;
      }
      if (this.form.areaLevel == '2') {
        this.getRegionInfo()
      }
    },
    changeCounty (val) {
      if (this.form.areaLevel == '3') {
        this.getRegionInfo()
      }
    },
    getCityInvRatingHtml () {
      let areaCode = '';
      if (this.form.areaLevel == '1') {
        areaCode = this.form.provinceCode
      } else if (this.form.areaLevel == '2') {
        areaCode = this.form.cityCode
      } else if (this.form.areaLevel == '3') {
        areaCode = this.form.countyCode
      }
      let param = {
        ver: "1.0",
        companyId: this.$route.query.companyId.toString(),
        creditCode: this.$route.query.creditCode,
        isImportant: this.radio == 0 ? true : false,
        type: this.areaLevelOptions.find(item => item.code == this.form.areaLevel).value,
        level: this.areaLevelOptions.find(item => item.code == this.form.areaLevel).value,
        areaCode: areaCode,
        userId: this.$Cookies.get("userId")
      }
      this.$ajax.manage.getCityInvRatingHtml(param).then(res => {
        console.log(param);
        if (res.status == 200) {
          if(res.data.code&&res.data.code!='0'){
            this.htmlContent=JSON.stringify(res.data)
            this.nextDisabled = true;
          }else{
            if(res.data.toString().lastIndexOf("{\"code\":\"0\"}")){
              this.htmlContent =  res.data.toString().replace("{\"code\":\"0\"}","");
            }
          }
          let temp = 'content-disposition'
          let data = res.headers[temp];
          this.fileName = data.split('=')[1];
        }
      })
    },
    nextStep () {
      if (this.active == 1) {
        if (this.form.areaLevel == '1') {
          if (this.form.provinceCode == '') {
            this.$message.warning('请选择省级名称');
            return;
          }
        } else if (this.form.areaLevel == '2') {
          if (this.form.provinceCode == '') {
            this.$message.warning('请选择省级名称');
            return;
          } else if (this.form.cityCode == '') {
            this.$message.warning('请选择地市级名称');
            return;
          }
        } else if (this.form.areaLevel == '3') {
          if (this.form.provinceCode == '') {
            this.$message.warning('请选择省级名称');
            return;
          } else if (this.form.cityCode == '') {
            this.$message.warning('请选择地市级名称');
            return;
          } else if (this.form.countyCode == '') {
            this.$message.warning('请选择区县级名称');
            return;
          }
        } else if (this.form.areaLevel == '') {
          this.$message.warning('请选择行政级别');
          return;
        }
      }
      this.active++
      if (this.active == 2) {
        this.getCityInvRatingHtml()
      }
    },
    lastStep () {
      this.active--;
    },
    getLiteRatingPDF () {
      //报告下载
      let param = {
        fileName: this.fileName,
      }
      this.$notify({
        title: '提示',
        message: 'PDF正在加载中，请耐心等待...',
        position: 'top-left',
        duration: 10000,
        type: 'success'
      });
      this.loading = true;
      this.$ajax.manage.getLiteRatingPDF(param).then(res => {
        // console.log(res)
        this.loading = false
        const content = res.data
        const blob = new Blob([content])
        const fileName = `城投企业信用评价-${this.$route.query.companyName}.pdf`
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
    getRegionInfo () {
      let areaCode = '';
      if (this.form.areaLevel == '1') {
        areaCode = this.form.provinceCode
      } else if (this.form.areaLevel == '2') {
        areaCode = this.form.cityCode
      } else if (this.form.areaLevel == '3') {
        areaCode = this.form.countyCode
      }
      let param = {
        companyId: this.$route.query.companyId.toString(),
        creditCode: this.$route.query.creditCode,
        industry: this.form.professionDetail,
        areaCode: areaCode,
        type: this.areaLevelOptions.find(item => item.code == this.form.areaLevel).value,
        level: this.areaLevelOptions.find(item => item.code == this.form.areaLevel).value,
        userId: this.$Cookies.get("userId")
      }
      this.$ajax.manage.getRegionInfo(param).then(res => {
        console.log(res);
        if (res.data.code == '0') {
          this.regionInfo = JSON.parse(res.data.regionInfo.data);
          console.log(this.regionInfo)
        }
      })
    }
  }
}
</script>
<style>
	.el-step_title{
		font-size: 14px;
		line-height: 30px;
	}
</style>
<style lang="less" scoped>
.risk-screen {
  width: 100%;
  min-width: 1300px;
  height: 100%;
  margin: auto;
  padding: 20px 5%;
  box-sizing: border-box;
  overflow: auto;
  .content {
    background-color: #fff;
    padding: 30px;
    .main {
      //padding-left: 200px;
      padding: 0 100px;
      margin-top: 10px;
      table {
        width: 100%;
        tr {
          height: 40px;
        }
      }
      .title {
        //width: 300px;
        //text-align: right;
        font-weight: bold;
        margin-bottom: 5px;
      }
      .table-box {
        display: flex;
        margin-bottom: 15px;
        table {
          flex: 1;
          border-collapse: collapse;
          color: #909399;
          font-size: 14px;
          .bgGray {
            background-color: #efefef;
          }
          td {
            border: 1px solid #ebeef5;
            font-size: 14px;
            padding-left: 10px;
          }
          th {
            border: 1px solid #ebeef5;
            //background-color: #efefef;
          }
        }
      }
    }
    .btn-box {
      text-align: center;
      margin-top: 20px;
    }
  }
}
</style>
