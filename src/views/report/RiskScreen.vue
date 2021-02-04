<!-- 风险初筛 -->
<template>
  <div class="risk-screen">
    <div style="margin-bottom: 15px;">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/homePage' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/essInfo' ,query:$route.query}">查看</el-breadcrumb-item>
        <el-breadcrumb-item>风险初筛</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="content">
      <div class="steps">
        <el-steps :active="active" finish-status="success" align-center>
          <el-step title="风险评价"></el-step>
          <el-step title="评价结果下载"></el-step>
        </el-steps>
      </div>
      <div class="main" v-if="active===0">
        <el-card class="box-card" v-loading="htmlLoading">
         <!-- <div v-html="htmlContent" style="overflow: auto;height: 550px;margin: auto;"></div> -->
		 <iframe :srcdoc="htmlContent" height="600px" width="100%" frameborder="0" marginwidth="0">
		 </iframe>
        </el-card>
      </div>
      <div class="main" v-if="active===1">
        <div class="btn-box">
          <el-button type="primary" style="align:center" @click="getLiteRatingPDF">
            <i :class="{'el-icon-loading':loading,'el-icon-download':!loading}"></i>
            报告下载</el-button>
        </div>
      </div>
      <div class="btn-box">
        <el-button type="primary" size="small" @click="lastStep" :disabled="lastDisabled" >上一步</el-button>
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
      fileName: '',
      htmlLoading: false
    }
  },
  mounted () {
    this.getRiskScreenHtml()
  },
  watch: {
    active (newVal, oldVal) {
      console.log(newVal);
      if (newVal == 1) {
        this.nextDisabled = true;
        this.lastDisabled = false
      } else if (newVal == 0) {
        this.nextDisabled = false;
        this.lastDisabled = true
      }
    }
  },
  methods: {
    getRiskScreenHtml () {
      let param = {
        userId: this.$Cookies.get("userId"),
        companyId: this.$route.query.companyId.toString(),
        creditCode: this.$route.query.creditCode
      }
      this.htmlLoading = true;
      this.$ajax.manage.getRiskScreenHtml(param).then(res => {
        this.htmlLoading = false;
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
      this.active++
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
      console.log(param)
      this.loading = true;
      this.$ajax.manage.getLiteRatingPDF(param).then(res => {
        // console.log(res)
        this.loading = false
        const content = res.data
        const blob = new Blob([content])
        const fileName = `风险初筛-${this.$route.query.companyName}.pdf`
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
	.el-step__title{
		font-size: 14px;
		line-height: 30px;
	}
</style>
<style lang="less" scoped="">
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
    }
    .btn-box {
      text-align: center;
      margin-top: 20px;
    }
  }
}
</style>
