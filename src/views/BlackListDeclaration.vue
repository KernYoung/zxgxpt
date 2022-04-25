<!-- 黑名单申报 -->
<template>
  <div class="blackListDeclaration">
    <div style="margin-bottom: 15px;">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/homePage' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>黑名单申报</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <el-row class="searchBox">
      <el-select v-model="status" placeholder="请选择审核状态" clearable style="width: 200px;margin-right: 10px;" multiple @change="changeProfession">
        <el-option v-for="item in statusList" :key="item" :label="item" :value="item">
        </el-option>
      </el-select>
      <el-button style="margin-left:10px;" type="primary" icon="el-icon-search" @click="searchData(1)">查询</el-button>
      <el-button style="margin-left:10px;" type="success" @click="clickToApply">点击申请</el-button>
    </el-row>

    <div class="table-box">
      <el-table
          :data="tableData"
          size="mini">
        <el-table-column
            prop="entName"
            label="企业名称"
            width="150">
        </el-table-column>
        <el-table-column
            prop="startDate"
            label="公示开始时间"黑名单申请
            width="150">
        </el-table-column>
        <el-table-column
            prop="reason"
            label="风险原因">
        </el-table-column>
        <el-table-column
            prop="grade"
            label="风险等级" width="150px"
            >
        </el-table-column>
        <el-table-column
            prop="publishBy"
            label="申请人">
        </el-table-column>
        <el-table-column
            prop="publishDept"
            label="申请单位">
        </el-table-column>
        <el-table-column
            prop="publishTime"
            label="申请时间">
        </el-table-column>
        <el-table-column
            prop="status"
            label="审核状态">
        </el-table-column>
        <el-table-column
            label="文件下载">
          <template slot-scope="scope">
            <span v-if="scope.row.reasonUrl">
                 <el-button type="primary" plain size="small" @click="downloadDocument(scope.row.reasonUrl)">文件下载</el-button>
            </span>
            <span v-else>
                  无上传文件
            </span>
          </template>
        </el-table-column>
        <el-table-column
            prop="status"
            label="点击修改">
          <template slot-scope="scope">
            <span v-if="scope.row.status == '已审核' || scope.row.status == '已过期'">
                  已审核/已过期状态不可编辑
            </span>
            <span v-else>
              <el-button type="primary" plain size="small" @click="editBlackInfo(scope.row)">编辑</el-button>
            </span>

          </template>
        </el-table-column>
        <el-table-column
            prop="status"
            label="续期/取消">
          <template slot-scope="scope">
            <span v-if="scope.row.status != '已过期'">
                 未过期的状态下不可续期
            </span>
            <span v-else>
              <el-button type="primary" size="small" plain @click="clickRenewalCancellation(scope.row)">续期/取消</el-button>
            </span>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div style="text-align: center;margin-top: 10px;">
      <el-pagination background layout="prev, pager, next,total,jumper" :total="page.total"
                     :current-page.sync="page.currentPage" :pageSize="page.pageSize" @current-change="handleCurrentChange">
      </el-pagination>
    </div>

    <el-dialog :title="editType" :visible.sync="editBlackDialog" width="730px" @close="closeDialog" :rules="rules" :close-on-click-modal='false'>
      <el-form :model="blackInfo" :inline="true" label-width="140px" :rules="rules" ref="blackInfo">
        <el-form-item label="申请单位:" prop="publishDept">
          <el-input v-model="blackInfo.publishDept" disabled></el-input>
        </el-form-item>
        <el-form-item label="申请时间:" prop="publishTime">
          <el-input v-model="blackInfo.publishTime" disabled></el-input>
        </el-form-item>
        <el-form-item label="企业名称:" prop="entName">
<!--          <el-input v-model="blackInfo.entName" ></el-input>-->
          <el-autocomplete
              style="width: 500px"
              class="inline-input"
              v-model="blackInfo.entName"
              :fetch-suggestions="querySearch"
              placeholder="请输入企业名称"
              @select="handleSelect"
			  v-bind:disabled="blackInfo.isNew !=true"
          ></el-autocomplete>
        </el-form-item>
        <el-form-item label="社会统一信用代码:" prop="creditCode">
          <el-input v-model="blackInfo.creditCode" disabled></el-input>
        </el-form-item>
        <el-form-item label="企业类型:" prop="type">
          <el-select v-model="blackInfo.type" placeholder="请选择企业类型" clearable style="width: 170px;margin-right: 10px;">
            <el-option v-for="item in typeOfEnterprises" :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="风险等级:" prop="grade">
          <el-select v-model="blackInfo.grade" placeholder="请选择风险等级" clearable style="width: 179px;margin-right: 10px;">
            <el-option v-for="item in riskLevels" :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="企业状态:" prop="status">
<!--          <el-input v-model="blackInfo.enterpriseState" style="width: 500px"></el-input>-->
          {{blackInfo.status}}
        </el-form-item>
        <el-form-item label="风险原因:" prop="reason">
          <el-input
              type="textarea"
              :rows="6"
              placeholder="请输入内容"
              v-model="blackInfo.reason"
              style="width: 500px"
              resize="none">
          </el-input>
        </el-form-item>
        <el-form-item label="风险文件上传:" prop="reasonUrl" >
          <el-upload
              ref="upload"
              class="upload-demo"
              drag
              :before-upload="beforeUpload"
              :on-success="success"
              name="file"
              accept=".jpg,.jpeg,.gif,.bmp,.png,.pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.zip"
              action="api/common/uploadFile"
              :headers="headers"
              :limit="1"
              :show-file-list="true"
              >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">可上传文件类型：jpg、jpeg、gif、bmp、png、pdf、doc、docx、ppt、pptx、xls、xlsx、zip。</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <pre style="font-size: 12px">
        申请说明：
        1.风险等级说明：
        高：风险等级最高，审核通过后建议全集团用户公示。
        中：风险等级中等，审核通过后建议关注过的公司对应成员进行公示。
        低：风险等级较低，审核通过后建议关注后的用户进行公示。
        目前推广初期风险等级不做限制，统一二级成员公司内部公示（即二三四级公司申请的黑名单二级公司内所有用户公示）。
        2.企业状态：
        未申请：该公司当前不属于黑名单。
        未审核：该公司已申请未审核。
        黑名单有效期：该公司已申请且审核，并在有效期之内。
        被驳回：该公司已申请但被驳回，可从申请列表内编辑重新申请。
        已撤销：该公司已申请且通过审核，提前由审核人撤销公示。
        已过期：该公司已申请且审核，但已过有效期，可进行续期。
        已取消续期：该公司已申请且审核，但已过有效期，且选择取消续期，可再次申请，记录保留。
      </pre>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialog()">取 消</el-button>
        <el-button type="primary" @click="saveBlackInfo('blackInfo')">保 存</el-button>
      </div>
    </el-dialog>

    <el-dialog :title="editRenewalCancellationType" :visible.sync="editRenewalCancellationDialog" width="700px" @close="closeRenewalCancellationDialog"  :close-on-click-modal='false'>
      <el-form :model="blackInfo" :inline="true" label-width="130px" :rules="renewalCancellation" ref="blackInfo">
        <el-form-item label="审核人:"  prop="approveBy">
          <el-input v-model="blackInfo.approveBy" disabled></el-input>
        </el-form-item>
        <el-form-item label="审核时间:" prop="approveTime">
          <el-input v-model="blackInfo.approveTime" disabled></el-input>
        </el-form-item>
        <el-form-item label="企业名称:" prop="entName">
<!--          <el-input v-model="blackInfo.entName" ></el-input>-->
          <el-autocomplete
              class="inline-input"
              v-model="blackInfo.entName"
              :fetch-suggestions="querySearch"
              placeholder="请输入企业名称"
			   v-bind:disabled="blackInfo.status!='未申请'"
          ></el-autocomplete>
        </el-form-item>
        <el-form-item label="操作选择:" prop="operationSelection">
          <el-select v-model="blackInfo.operationSelection" placeholder="请选择" clearable style="width: 170px;margin-right: 10px;">
            <el-option v-for="item in operationSelections" :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="取消原因:" prop="reasonsForRenewal">
            <el-input
                type="textarea"
                :rows="6"
                placeholder="请输入内容"
                v-model="blackInfo.reasonsForRenewal"
                style="width: 500px"
                resize="none">
            </el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="closeRenewalCancellationDialog()">取 消</el-button>
        <el-button type="primary" @click="saveBlackInfo('blackInfo')">保 存</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>

export default {
    data(){
      var statusExists = (rule, value, callback) => { //校验公司名称
	      console.log(this.blackInfo.companyStatus)
	      console.log(value)
		  if(this.blackInfo.pid ==undefined){
			/*  if((this.blackInfo.companyStatus == true&&this.blackInfo.isMe != true) ||(this.blackInfo.isMe == true && value =='已审核'||value =='未审核')){  */
				if((value =='已审核'||value =='未审核')&&this.blackInfo.companyStatus == true){
				  callback(new Error("已申请"));
			  }else{
				  callback();
			  }
		  }else{
			  callback();
		  }
	   };
	  /* console.log("rule:"+rule+"value"+value)
	  console.log(this.blackInfo.pid)
        if (value == "未申请") {
			
          callback();
      }else{
		  if(this.blackInfo.pid !=undefined){
			  
			 callback(); 
		  }else{
			
			  callback(new Error("已申请"));
		  }
          
        } */
     
      return{
        headers:'',
        status:[],
        statusCopy:[],
        fileList:[],
        newFileName:'',
        operationSelections:['续期','取消续期'],
        typeOfEnterprises:['重点合作企业','一般合作企业','非合作企业'],
        riskLevels:['高','中','低'],
        compayNameAndCreditCodes:[{"companyName":'',"creditCode":''}],
        editType:'',
        editRenewalCancellationType:'续期/取消黑名单表',
        editBlackDialog: false,//用户编辑对话框
        editRenewalCancellationDialog:false, // 续期/取消黑名单表 弹出框
        isNew:false,
        formData:null,
        tableData:[],
        statusList:['未审核','已审核','被驳回','已撤销','已过期'],
        blackInfo:{
		  companyStatus:'',
		  isMe:'',
          pid:'',//pid
          publishDept:'',   // 申请单位
          publishTime:'', // 申请时间
          entName:'',     // 企业名称
          creditCode:'',      // 社会统一信用代码
          type:'',// 企业类型
          grade:'',       // 风险等级
          status:'未申请', // 企业状态
          reason:'',     // 风险原因
          reasonUrl:'',   // 风险文件上传
          approveBy:'',   // 审核人
          approveTime:'', // 审核时间
          operationSelection:'', // 操作选择
          reasonsForRenewal:'',  // 取消原因

        },
        page: {
          currentPage: 1,
          total: 0,
          pageSize: 10
        },
        rules: {
          publishDept:[{
            required: true, message: '申请单位不能为空！', trigger: 'change'
          }],
          publishTime:[{
            required: true, message: '申请时间不能为空！', trigger: 'change'
          }],
          creditCode:[{
            required: true, message: '社会统一信用代码！', trigger: 'change'
          }],
          entName: [
            { required: true, message: '请选择公司名称', trigger: 'change' }
          ],
          status:[
            { validator: statusExists, message: '', trigger: 'change' }
          ],
          type : [
            { required: true, message: '请选择企业类型', trigger: 'change' }
          ],
          grade : [
            { required: true, message: '请选择风险类型', trigger: 'change' }
          ],
          reason:[
            { required: true, message: '风险原因不能为空！', trigger: 'change' }
          ]
        },
        renewalCancellation:{
          entName: [
            { required: true, message: '公司名称不能为空！', trigger: 'change' }
          ],
          operationSelection:[
            { required: true, message: '操作选择不能为空！', trigger: 'change' }
          ]
        }
      }
    },
    created() {
      this.searchData(1);
      this.getCompayNameAndCreditCode();
      let token = this.$Cookies.get(this.$getCookieKey());
      this.headers = {
          token:token,

      }
    },
  methods:{
      getDate(){
        let date = new Date();
        let year = date.getFullYear();
        let mon = (date.getMonth() + 1);
        let day = date.getDate();
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();
        return year +'-'+ this.appendZero(mon) +'-'+ this.appendZero(day) +' '+ this.appendZero(hours) + ':' + this.appendZero(minutes) + ':' + this.appendZero(seconds);
      },
      appendZero(obj){
        return  obj < 10  ? "0" + obj : obj
      },
      closeDialog() {
        this.editBlackDialog = false
		this.$refs['blackInfo'].clearValidate();
      },
      closeRenewalCancellationDialog(){
        this.editRenewalCancellationDialog = false
      },
      clickToApply(){
        this.clearBlackInfo();

        this.editType = '黑名单申请';
        this.isNew = true;
        this.editBlackDialog = true;
        this.blackInfo.isNew = this.isNew;
        if(this.$refs.upload){
          this.$refs.upload.clearFiles();
        }
        this.blackInfo.publishDept = this.$Cookies.get('companyName');
        if('null' == this.$Cookies.get('companyName') || '' == this.$Cookies.get('companyName') || undefined == this.$Cookies.get('companyName')){
            this.$message.error("未查找到公司信息, 请联系管理员,将用户添加到对应公司 ！！！");
            this.editBlackDialog = false;
        }
        this.blackInfo.publishTime = this.getDate();
        console.log(this.blackInfo)
      },
    clickRenewalCancellation(row){
      this.clearBlackInfo();
      this.editRenewalCancellationDialog = true;
      this.isNew = false;

      this.blackInfo = Object.assign({},row);
      this.blackInfo.isNew = this.isNew;
      console.log(this.blackInfo)
    },
    clearBlackInfo() {
      this.blackInfo = {
		companyStatus:'', //是否已被当前登录人的同一二级公司已申请
		isMe:'',
        publishDept:'',   // 申请单位
        publishTime:'', // 申请时间
        entName:'',     // 企业名称
        creditCode:'',      // 社会统一信用代码
        type:'',// 企业类型
        grade:'',       // 风险等级
        status:'未申请', // 企业状态
        reason:'',     // 风险原因
        reasonUrl:'',   // 风险文件上传
        approveBy:'',   // 审核人
        approveTime:'', // 审核时间
        operationSelection:'', // 操作选择
        reasonsForRenewal:'',  // 取消原因
      }
    },
      handleCurrentChange(val) {
        //页码切换
        this.searchData(val);
      },
      editBlackInfo(row){
        this.clearBlackInfo();
        this.isNew = false;
        this.editBlackDialog = true;
        this.editType = '黑名单编辑';
        if(this.$refs.upload){
          this.$refs.upload.clearFiles();
        }
        this.blackInfo = Object.assign({},row);
        this.blackInfo.isNew = this.isNew;
        console.log(this.blackInfo)
      },
      changeProfession (val) {
        this.statusCopy = []
        for (let i = 0; i < val.length; i++) {
            switch(val[i]){
              case "未审核":
                this.statusCopy.push(1)
                break
              case "已审核":
                this.statusCopy.push(2)
                break
              case "被驳回":
                this.statusCopy.push(3)
                break
              case "已撤销":
                this.statusCopy.push(4)
                break
              case "已过期":
                this.statusCopy.push(5)
                break
            }
          }
        console.log(this.statusCopy)
      },
      downloadDocument(fileName){
        let param = {
          fileName:fileName
        }
        this.$ajax.manage.downloadDocument(param).then(res => {
          console.log(param.fileName.split("/"));
          const content = res.data
          const blob = new Blob([content])
          console.log(res.data)
          const fileName = param.fileName.split("/")[param.fileName.split("/").length - 1];
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
      searchData(page){
		this.page.currentPage = page
        let param = {
          pageIndex: page ? page : 1,
          pageSize: this.page.pageSize,
          status:this.statusCopy,
          publishBy:this.$Cookies.get('userCode')
        }

        this.$ajax.manage.getAllBlackListResultList(param).then(res => {
          console.log(param)
          console.log(res.data)
          if(res.data.code === 0) {
            this.tableData = res.data.blackListResultList;
            for (let i = 0; i < this.tableData.length; i++) {
              switch(this.tableData[i].status){
                case "1":
                  this.tableData[i].status = '未审核';
                  break
                case "2":
                  this.tableData[i].status = '已审核';
                  break
                case "3":
                  this.tableData[i].status = '被驳回';
                  break
                case "4":
                  this.tableData[i].status = '已撤销';
                  break
                case "5":
                  this.tableData[i].status = '已过期';
                  break
                case "6":
                  this.tableData[i].status = '取消过期';
                  break
              }
            }
            this.page.total = res.data.totalRecords;
            this.tableData.splice(1, 0);
            this.$message.success(res.data.msg);
          }
        })
      },
    getCompayNameAndCreditCode(){
        let param = {}
        this.$ajax.manage.getCompayNameAndCreditCode(param).then(res => {
          this.compayNameAndCreditCodes = res.data.compayNameAndCreditCodes
        })
      },
    querySearch(queryString, cb) {

      var results = queryString ? this.compayNameAndCreditCodes.filter(this.createFilter(queryString)) : this.compayNameAndCreditCodes;
      let newCompayNameAndCreditCodes = [];
      for(let item of results){
        newCompayNameAndCreditCodes.push({
          value:item.companyName,
          id:item.creditCode
        });
      }
      // 调用 callback 返回建议列表的数据
      cb(newCompayNameAndCreditCodes);
    },
    createFilter(queryString) {
      return (CompayNameCode) => {
        return (CompayNameCode.companyName.indexOf(queryString) >= 0);
      };
    },
    handleSelect(item) {
      console.log(item);
      this.blackInfo.creditCode = item.id;
      let param = {
        companyName:this.blackInfo.entName,
        creditCode:this.blackInfo.creditCode,
        updateBy:this.$Cookies.get('userCode')
      }
      this.$ajax.manage.getCompanyStatus(param).then(res => {
          if(res.data.code === 0){
			  this.blackInfo.companyStatus = res.data.companyStatus
			  console.log(res.data.isMe)
			  this.blackInfo.isMe = res.data.isMe
            switch(res.data.status){
              case "1":
                this.blackInfo.status = '未审核';
                break
              case "2":
                this.blackInfo.status = '已审核';
                break
              case "3":
                this.blackInfo.status = '被驳回';
                break
              case "4":
                this.blackInfo.status = '已撤销';
                break
              case "5":
                this.blackInfo.status = '已过期';
                break
              case "6":
                this.blackInfo.status = '取消过期';
                break
              default:
                this.blackInfo.status = '未申请';
            }
          }
      })
      console.log(this.blackInfo);
    },
    saveBlackInfo(formName){
      this.$refs[formName].validate((valid) => {
		  console.log("valid"+valid)
        if(valid){
          this.blackInfo.publishBy = this.$Cookies.get('userCode');
          this.$ajax.manage.saveOrEdit(this.blackInfo).then(res => {
            this.closeDialog();
            this.closeRenewalCancellationDialog();
            this.$message.success(res.data.msg);
            this.searchData(1);// 更新数据
            console.log(res.data)
          })
        }else{
          return false;
        }
      })

    },
    beforeUpload(file){
      console.log(this.blackInfo.reasonUrl);
      let param = {
        filePathName:this.blackInfo.reasonUrl
      }
      console.log(param)
      this.$ajax.manage.deleteFile(param).then(res => {
          console.log(res.data)
      })
      this.blackInfo.reasonUrl = "/home/ftpuser/upload/"+file.name;
    },
    success(response, file, fileLis){
       this.blackInfo.reasonUrl = "/home/ftpuser/upload/"+file.name;
       console.log(file);
       console.log( this.blackInfo.reasonUrl);
    }
    }
}
</script>

<style lang="less" scoped>
.blackListDeclaration {
  width: 95%;
  height: 100%;
  margin: auto;
  background-color: #f8f8f8;
  box-sizing: border-box;
  padding: 20px;
  overflow-block: auto;

  .searchBox{
    margin: 20px 0;
  }

  .low-row {
    color: #2327FF;
  }
  .medium-row {
     color: #88BC68;
  }
  .high-row {
     color: #FCA4CE;
  }

}

</style>