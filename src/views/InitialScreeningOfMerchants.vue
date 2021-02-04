<!-- 客商初筛 -->
<template>
  <div class="initialScreeningOfMerchants">
    <div style="margin-bottom: 15px;">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/homePage' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>客商填报</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <el-row>
      <el-button type="primary" @click="saveInfo('initialScreeningOfMerchantsForm')" >提交</el-button>
      <el-upload
          class="upload-demo"
          ref="uploadExcel"
          action="#"
          :on-change="handleChange"
          :on-exceed="handleExceed"
          :on-remove="handleRemove"
          :file-list="fileListUpload"
          :before-upload="beforeUpload"
          :limit="limitUpload"
          accept=".xlsx"
          :auto-upload="false"
          :show-file-list="false">
        <el-button  type="primary" @click="" >导入[Excel]</el-button>
      </el-upload>
      <el-button type="primary" @click="downloadFile">导入模版下载</el-button>
      <el-button type="primary" @click="goToResultsView">查看结果</el-button>
    </el-row>
    <div class="contentTips">
        <h3 class="title">客商初筛上传</h3>
        <div>
          <span>填报流水号：</span>
          <span>{{this.SerialNumber}}</span>
        </div>
        <div>
          <span>填 报 说 明：</span>
          <pre>
          1.若您的上传客商记录数较少，建议直接在本页面逐条填写客商信息，若客商记录数较多，建议EXCEL导入上传客商信息。
          2.若您是首次使用本功能，请点击右侧下载按钮下载客商导入模板，EXCEL维护完成后点击工具栏中的"EXCEL"导入即可导入数据，提交后点击按钮查看结果。
             导入模板下载
          3.学院等社会组织类型的非工商性质企业，暂不支持工商信息获取。
          </pre>
        </div>
    </div>
    <el-form :model="initialScreeningOfMerchantsForm" ref="initialScreeningOfMerchantsForm" :rules="rules" >
		<div v-if="loading"  style="width: 100px;height: 100px;margin-left: 700px;">
		      <i class="el-icon-loading" style="font-size: 40px;"></i>
		    </div>
				  <div
				  v-else
				  >
      <el-table
          :data="initialScreeningOfMerchantsForm.tableData"
          style="width: 100%;text-align: center" border="true" :header-cell-style="headClass">
        <el-table-column
            prop="customSocialCode"
            label="客商社会信用代码" width="150px">
          <template slot-scope="scope">
            <el-form-item>
              <el-input  v-model="scope.row.customSocialCode" type="text"></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column
            prop="customName"
            label="客商全称*">
          <template slot-scope="scope">
            <el-form-item :prop="'tableData.' + scope.$index + '.customName'" :rules="rules.customName">
              <el-input v-model="scope.row.customName" type="text"></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column
            prop="customCreditCode"
            label="客商信保代码">
          <template slot-scope="scope">
            <el-form-item>
              <el-input v-model="scope.row.customCreditCode" type="text"></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column
            prop="dunsCode"
            label="邓白氏码">
          <template slot-scope="scope">
            <el-form-item>
              <el-input v-model="scope.row.dunsCode" type="text"></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column
            prop="customExportCode"
            label="客商海关编码">
          <template slot-scope="scope">
            <el-form-item>
              <el-input v-model="scope.row.customExportCode" type="text"></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column
            prop="province"
            label="省份">
          <template slot-scope="scope">
            <el-form-item>
              <el-input v-model="scope.row.province" type="text"></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column
            prop="city"
            label="地级市">
          <template slot-scope="scope">
            <el-form-item>
              <el-input v-model="scope.row.city" type="text"></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column
            prop="nationType"
            label="国内外类型">
          <template slot-scope="scope">
            <el-form-item>
<!--                <el-input v-model="scope.row.nationType"></el-input>-->
              <el-select v-model="scope.row.nationType" placeholder="请选择" clearable>
                <el-option v-for="item in nationTypes" :key="item" :label="item" :value="item">
                </el-option>
              </el-select>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column
            prop="companyType"
            label="公司类型">
          <template slot-scope="scope">
            <el-form-item>
<!--              <el-input v-model="scope.row.companyType"></el-input>-->
              <el-select v-model="scope.row.companyType" placeholder="请选择" clearable>
                <el-option v-for="item in companyTypes" :key="item" :label="item" :value="item">
                </el-option>
              </el-select>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column
            label="操作" width="200px">
          <template slot-scope="scope">
            <el-form-item>
              <el-button type="primary" plain @click="addDomain">新增行</el-button>
              <el-button type="danger" plain @click="removeDomain(scope.row)">删除行</el-button>
            </el-form-item>
          </template>
        </el-table-column>
      </el-table>
	  </div>
    </el-form>
	</div>
  </div>
</template>

<script>

import XLSX from "xlsx";
export default {

  data(){
    return{	
		loading:false,
      SerialNumber:'',
      limitUpload:1, // 限制只能上传1个文件
      fileTemp:null,
      nationTypes:['国内','国外'],
      companyTypes:['客商','成员单位'],
      initialScreeningOfMerchantsForm:{
        tableData:[{
          customSocialCode:'', // 客商社会信用代码
          customName:'', // 客商全称
          customCreditCode:'', // 客商信保代码
          dunsCode:'', // 邓白氏码
          customExportCode:'', // 客商海关编码
          province:'', // 省份
          city:'', // 地级市
          nationType:'', // 国内外类型
          companyType:'', // 公司类型
        }]
      },
      initialScreeningOfMerchantsInfo:{
        // CUSTOM_SOCIAL_CODE:'', // 客商社会信用代码
        // CUSTOM_NAME:'', // 客商全称
        // CUSTOM_CREDIT_CODE:'', // 客商信保代码
        // DUNS_CODE:'', // 邓白氏码
        // CUSTOM_EXPORT_CODE:'', // 客商海关编码
        // PROVINCE:'', // 省份
        // CITY:'', // 地级市
        // NATION_TYPE:'', // 国内外类型
        // COMPANY_TYPE:'', // 公司类型

        customSocialCode:'', // 客商社会信用代码
        customName:'', // 客商全称
        customCreditCode:'', // 客商信保代码
        dunsCode:'', // 邓白氏码
        customExportCode:'', // 客商海关编码
        province:'', // 省份
        city:'', // 地级市
        nationType:'', // 国内外类型
        companyType:'', // 公司类型
      },
      rules:{
        customName:[{ required: true, message: '请输入客商全称', trigger: ['blur','change'] }],
      },
    }
  },
  mounted() {
    this.getSerialNumber();
  },
  methods:{
    headClass() { //表头居中显示
      return "text-align:center"
    },
    appendZero(obj){
      return  obj < 10  ? "0" + obj : obj
    },
    getSerialNumber(){
      let date = new Date();
      let userCode = this.$Cookies.get('userCode');
      let year = date.getFullYear();
      let mon = (date.getMonth() + 1);
      let day = date.getDate();
      let hours = date.getHours();
      let minutes = date.getMinutes();
      let seconds = date.getSeconds();
      this.SerialNumber  = userCode + year + this.appendZero(mon) + this.appendZero(day) + this.appendZero(hours) + this.appendZero(minutes) + this.appendZero(seconds);
      console.log(this.SerialNumber);
    },
    addDomain() {
      this.initialScreeningOfMerchantsForm.tableData.push({
            customSocialCode:'', // 客商社会信用代码
            customName:'', // 客商全称
            customCreditCode:'', // 客商信保代码
            dunsCode:'', // 邓白氏码
            customExportCode:'', // 客商海关编码
            province:'', // 省份
            city:'', // 地级市
            nationType:'', // 国内外类型
            companyType:'', // 公司类型
      });
    },
    removeDomain(row) {
      var index = this.initialScreeningOfMerchantsForm.tableData.indexOf(row)
      if (index !== -1 && this.initialScreeningOfMerchantsForm.tableData.length - 1 > 0) {
        this.initialScreeningOfMerchantsForm.tableData.splice(index, 1)
      }else{
        this.initialScreeningOfMerchantsForm.tableData = [{
          customSocialCode:'', // 客商社会信用代码
          customName:'', // 客商全称
          customCreditCode:'', // 客商信保代码
          dunsCode:'', // 邓白氏码
          customExportCode:'', // 客商海关编码
          province:'', // 省份
          city:'', // 地级市
          nationType:'', // 国内外类型
          companyType:'', // 公司类型
        }]
      }
    },
    saveInfo(formName){
		this.loading = true
      this.$refs[formName].validate((valid) => {
        if(valid){
          let param = {
            serialNumber:this.SerialNumber,  // 流水号
            userName: this.$Cookies.get('userCode'), // 工号
            formInfo:this.initialScreeningOfMerchantsForm.tableData, // 表单数据
          }
          console.log(param);
          this.$ajax.manage.saveInitialScreeningOfMerchants(param).then(res => {
            if(res.data.code === '0'){
              this.$message.success(res.data.msg);
              this.initialScreeningOfMerchantsForm.tableData = [{
                customSocialCode:'', // 客商社会信用代码
                customName:'', // 客商全称
                customCreditCode:'', // 客商信保代码
                dunsCode:'', // 邓白氏码
                customExportCode:'', // 客商海关编码
                province:'', // 省份
                city:'', // 地级市
                nationType:'', // 国内外类型
                companyType:'', // 公司类型
              }];
            }
           
          })
        }else{
          return false;
        }
      });
	   this.loading = false
    },
    goToResultsView(){
      this.$router.push({
        path: '/ResultsView'
      });
    },
    downloadFile() {
      // 客商导入模板 下载
      let param = {
        userId: parseInt(this.$Cookies.get('userId')),
        "noticeSerialno":"客商导入模板.xlsx",
      }
      this.$ajax.manage.getPDF(param).then(res => {
        const content = res.data
        const blob = new Blob([content])
        console.log(res.data)
        const fileName = '客商导入模板.xlsx'
        if ('download' in document.createElement('a')) { // 非IE下载
          const elink = document.createElement('a')
          elink.download = '客商导入模板.xlsx'
          elink.style.display = 'none'
          elink.href = URL.createObjectURL(blob)
          console.log(elink.href);
          document.body.appendChild(elink)
          elink.click()
          URL.revokeObjectURL(elink.href) // 释放URL 对象
          document.body.removeChild(elink)
        } else { // IE10+下载
          navigator.msSaveBlob(blob, '客商导入模板.xlsx')
        }
      })
    },
    handleChange(file, fileList){
	 this.loading = true
      this.$refs.uploadExcel.clearFiles();
      this.fileTemp = file.raw
      if(this.fileTemp){
        if(this.fileTemp.name.endsWith(".xlsx")){
		  
          this.importKS(this.fileTemp)
		  
        }else{
          this.$message({
            type:'warning',
            message:'文件类型只支持 .xlsx , 请确认后重新上传！'
          })
        }

      } else {
        this.$message({
          type:'warning',
          message:'请上传附件！'
        })
      }
	 this.loading = false   
    },
    importKS(obj){
      let _this = this;
      // 通过DOM取文件数据
      this.file = obj
      var rABS = false; //是否将文件读取为二进制字符串
      var f = this.file;
      var reader = new FileReader();
      //if (!FileReader.prototype.readAsBinaryString) {
      FileReader.prototype.readAsBinaryString = function(f) {
        var binary = "";
        var rABS = false; //是否将文件读取为二进制字符串
        var pt = this;
        var wb; //读取完成的数据
        var outdata;
        var reader = new FileReader();
        reader.onload = function(e) {
          var bytes = new Uint8Array(reader.result);
          var length = bytes.byteLength;
          for(var i = 0; i < length; i++) {
            binary += String.fromCharCode(bytes[i]);
          }
          if(rABS) {
            wb = XLSX.read(btoa(fixdata(binary)), { //手动转化
              type: 'base64'
            });
          } else {
            wb = XLSX.read(binary, {
              type: 'binary'
            });
          }
          outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);//outdata就是你想要的东西
          let arr = []
          outdata.map(v => {
            let obj = {}
            obj.customSocialCode = v['客商社会信用代码']
            obj.customName = v['客商全称*']
            obj.customCreditCode = v['客商信保代码']
            obj.dunsCode = v['邓白氏码']
            obj.customExportCode = v['客商海关编码']
            obj.province = v['省份']
            obj.city = v['地级市']
            obj.nationType = v['国内外类型']
            obj.companyType = v['公司类型']
            arr.push(obj)
          })
          _this.initialScreeningOfMerchantsForm.tableData = arr;
        }
        reader.readAsArrayBuffer(f);
      }

      if(rABS) {
        reader.readAsArrayBuffer(f);
      } else {
        reader.readAsBinaryString(f);
      }
	
    }
  }
}
</script>

<style lang="less" scoped>
  .initialScreeningOfMerchants {
    width: 95%;
    height: 100%;
    margin: auto;
    background-color: #f8f8f8;
    box-sizing: border-box;
    padding: 20px;
    overflow-block: auto;
    .contentTips{
      text-align: center;
    }
    .contentTips div{
      display: inline-block;
      width: 90%;
      text-align: left;
    }
    .upload-demo{
      display: inline-block;
      margin: 0 10px;
    }
  }

</style>