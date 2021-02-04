<!-- 单次信用评价 -->
<template>
  <div class="credit-evaluate">
    <div style="margin-bottom: 15px;">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/homePage' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/essInfo' ,query:$route.query}">查看</el-breadcrumb-item>
        <el-breadcrumb-item>产业企业信用评价</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="content">
      <div class="steps">
        <el-steps :active="active" finish-status="success" align-center>
          <el-step title="主体信息"></el-step>
          <el-step title="财务信息"></el-step>
          <el-step title="风险评价"></el-step>
          <el-step title="评价结果下载"></el-step>
        </el-steps>
      </div>
      <div class="main" v-if="active===0">
        <table>
          <tr>
            <td style="text-align: right;" width="300px">企业名称：</td>
            <td>{{companyName}}</td>
          </tr>
          <tr>
            <td style="text-align: right;">统一社会信用代码/注册码：</td>
            <td>{{creditNo}}</td>
          </tr>
          <tr>
            <td colspan="2" style="text-align: right;">
              <el-button type="primary" size="small" @click="reset">恢复默认</el-button>
            </td>
          </tr>
          <tr>
            <td style="text-align: right;">
              <span style="color:red">*</span>
              所属行业：
            </td>
            <td>
              <el-select v-model="profession" placeholder="请选择" size="medium" @change="changeProfession">
                <el-option v-for="item in professionOptions" :key="item" :label="item" :value="item">
                </el-option>
              </el-select>
              <el-select v-model="professionDetail" placeholder="请选择" size="medium" style="margin-left: 15px;">
                <el-option v-for="item in professionDetailOptions" :key="item" :label="item" :value="item">
                </el-option>
              </el-select>
            </td>
          </tr>
          <tr>
            <td style="text-align: right;">
              <span style="color:red">*</span>
              企业性质：
            </td>
            <td>
              <el-select v-model="companyType" placeholder="请选择" size="medium">
                <el-option v-for="item in companyTypeOptions" :key="item" :label="item" :value="item">
                </el-option>
              </el-select>
            </td>
          </tr>
          <tr>
            <td style="text-align: right;">
              <span style="color:red">*</span>
              是否行业头部企业：
            </td>
            <td>
              <el-radio v-model="isIndustryLeader" label='1'>是</el-radio>
              <el-radio v-model="isIndustryLeader" label='0'>否</el-radio>
            </td>
          </tr>
        </table>
      </div>

      <div class="main" v-if="active===1">
        <table>
          <tr>
            <td style="text-align: right;" width="300px">企业名称：</td>
            <td>{{companyName}}</td>
          </tr>
          <tr>
            <td style="text-align: right;">统一社会信用代码/注册码：</td>
            <td>{{creditNo}}</td>
          </tr>
          <tr>
            <td style="text-align: right;">所属行业：</td>
            <td>{{profession}}-{{professionDetail}}</td>
          </tr>
          <tr>
            <td style="text-align: right;">财报信息：</td>
            <td>数据取自近两年财报</td>
          </tr>
        </table>
      </div>

      <div class="main" v-if="active===2">
        <el-card class="box-card">
			<iframe :srcdoc="htmlContent" height="600px" width="100%" frameborder="0" marginwidth="0">
			</iframe>
          <!-- <div v-html="htmlContent" style="overflow: auto;height: 400px;margin: auto;"></div> -->
        </el-card>

      </div>
      <div class="main" v-if="active===3">
        <div class="btn-box">
          <el-button type="primary" @click="getLiteRatingPDF" style="align:center">
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
      profession: '',
      professionDetail: '',
      companyType: '',
      professionOptions: [],
      professionDetailOptions: [],
      companyTypeOptions: ['中央国有企业', '国企非上市公司', '国企上市公司', '民企非上市公司', '民企上市公司'],
      lastDisabled: true,
      nextDisabled: false,
      tableData: [],
      htmlContent: '',
      backData: {},
      multipleSelection: [],
      //htmlPage: () => import('../../static/zhongchengxin.html')
      loading: false,
      fileName: '',
      isIndustryLeader: '1'
    }
  },
  watch: {
    active (newVal, oldVal) {
      if (newVal === 0) {
        this.lastDisabled = true;
        this.nextDisabled = false;
      } else if (newVal == 3) {
        this.lastDisabled = false;
        this.nextDisabled = true;
      } else if (newVal > 0) {
        this.lastDisabled = false;
      }
    }
  },
  created () {
    this.getIndustry();
  },
  mounted () {
  },
  methods: {
    nextStep () {
      // if(this.active==1){
      // 	if(this.multipleSelection.length==0){
      // 		this.$message.warning('请选择数据');
      // 		return;
      // 	}
      // }
      if (this.active == 0) {
        console.log()
        if (this.profession == '') {
          this.$message.warning('请选择所属行业');
          return;
        } else if (this.professionDetail == '') {
          this.$message.warning('请选择所属行业');
          return;
        } else if (this.companyType == '') {
          this.$message.warning('请选择企业性质');
          return;
        } else if (this.isIndustryLeader == '') {
          this.$message.warning('请选择是否是头部企业');
          return;
        }
      } else if (this.active == 1) {
        this.getHtml();
      }
      this.active++
    },
    lastStep () {
      if (this.active > 0) {
        this.active--;
        this.lastDisabled = false
      } else {
        this.lastDisabled = true
      }
      this.multipleSelection = []
    },
    getHtml () {
      let param = {
        userId: this.$Cookies.get("userId"),
        companyId: this.$route.query.companyId.toString(),
        industryCategory: this.profession,
        industry: this.professionDetail,
        isIndustryLeader: this.isIndustryLeader == '1' ? true : false,
        nature: this.companyType
      }
      console.log(param)
      this.$ajax.manage.getHtml(param).then(res => {
        console.log(res);
        if (res.status == 200) {
          // if(res.data.code&&res.data.code!='0'){
          //   this.htmlContent=JSON.stringify(res.data)
          // }else{
          //   this.htmlContent = res.data;
          // }
          if(res.data.code&&res.data.code!='0'){
            this.htmlContent=JSON.stringify(res.data)
            this.nextDisabled = true;
          }else{
            if(res.data.toString().lastIndexOf("{\"code\":\"0\"}")){
              this.htmlContent =  res.data.toString().replace("{\"code\":\"0\"}","");
            }
          }
          //document.getElementById("html").innerHTML=res.data\
          let temp = 'content-disposition'
          let data = res.headers[temp];
          this.fileName = data.split('=')[1];
        }
      })
    },
    getIndustry () {
      this.$ajax.manage.getIndustry({}).then(res => {
        if (res.status == 200) {
          let list = [];
          for (let i in res.data.areaList) {
            list.push(i)
          }
          this.professionOptions = list;
          this.backData = res.data.areaList
          if(sessionStorage.getItem('tycIndustry')){
            let tycIndustry = sessionStorage.getItem('tycIndustry');
            list.forEach(e1=>{
              let e2 = this.backData[e1]
              e2.forEach(e3=>{
                if(e3.indexOf(tycIndustry)>-1){
                  this.professionDetailOptions = e2
                  this.profession = e1
                  this.professionDetail = e3
                }
              });
            });
          }
        }
      })
    },
    changeProfession (val) {
      console.log(this.backData)
      for (let i in this.backData) {
        if (i == val) {
          this.professionDetailOptions = this.backData[i]
        }
      }
    },
    handleSelectionChange (val) {
      this.multipleSelection = val;
      console.log(this.multipleSelection)
    },
    reset () {
      this.profession = this.professionOptions[0];
      for (let i in this.backData) {
        if (i == this.profession) {
          this.professionDetailOptions = this.backData[i]
        }
      }
      this.professionDetail = this.professionDetailOptions[0];
    },
    getLiteRatingPDF () {
      //产业信用评价下载
      let param = {
        fileName: this.fileName,
        industryCategory: this.profession,
        industry: this.professionDetail,
        isIndustryLeader: this.isIndustryLeader == '1' ? true : false,
        nature: this.companyType
      }
      this.loading = true;
      this.$notify({
        title: '提示',
        message: 'PDF正在加载中，请耐心等待...',
        position: 'top-left',
        duration: 10000,
        type: 'success'
      });
      this.$ajax.manage.getLiteRatingPDF(param).then(res => {
        // console.log(res)
        this.loading = false
        const content = res.data
        const blob = new Blob([content])
        const fileName = `产业信用评价-${this.$route.query.companyName}.pdf`
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
    }
  }
}
</script>
<style>
.header {
  margin-bottom: 0 !important;
  margin-top: 0 !important;
}
p {
  margin: 0 !important;
}
	.el-step__title{
		font-size: 14px;
		line-height: 30px;
	}
</style>
<style lang="less" scoped>
.credit-evaluate {
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
    }
    .btn-box {
      text-align: center;
      margin-top: 20px;
    }
  }
}
</style>
