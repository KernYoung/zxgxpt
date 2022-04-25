<!-- 平台消息 -->
<template>
  <div>
    <el-row class="searchBox">
      <el-date-picker
          v-model="search.startDate"
          type="date"
          placeholder="选择推送开始日期"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd">
      </el-date-picker>
      -
      <el-date-picker
          v-model="search.endDate"
          type="date"
          placeholder="选择推送结束日期"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd">
      </el-date-picker>
      <el-button style="margin-left:10px;" type="primary" icon="el-icon-search" @click="searchData(1)">查询</el-button>
    </el-row>
   <div v-if="loading"  style="width: 100px;height: 100px;margin-left: 700px;">
         <i class="el-icon-loading" style="font-size: 40px;"></i>
       </div>
   		  <div
   		  v-else
   		  >
    <div style="margin: 15px 0;">
      <el-table
          :data="tableData">
        <el-table-column
            prop="pushType"
            label="推送类型"
            >
        </el-table-column>
        <el-table-column
            prop="promptinfo"
            label="推送内容"
            >
        </el-table-column>
        <el-table-column
            prop="userName"
            label="推送人">
        </el-table-column>
        <el-table-column
            prop="updateTime"
            label="推送时间"
        >
        </el-table-column>
      </el-table>
    </div>
</div>

    <div style="text-align: center;margin-top: 10px;">
      <el-pagination background layout="prev, pager, next,total,jumper" :total="page.total"
                     :current-page.sync="page.currentPage" :pageSize="page.pageSize" @current-change="handleCurrentChange">
      </el-pagination>
    </div>
  </div>
</template>
<script>

export default {
  data(){
    return{
	  loading:false,
      tableData:[],
      search:{
        startDate:'',
        endDate:''
      },
      page: {
        currentPage: 1,
        total: 0,
        pageSize: 10
      },
    }
  },
created() {
	//当前设定的日期时间
	      let d = new Date
	      let year1,month1,day1;
	      [year1,month1,day1] = [d.getFullYear(),d.getMonth(),d.getDate()]
	      // let date1 = new Date(year1, month1, day1,7)
  let date1 = this.formatDate(d, 'yyyy-MM-dd');
	      this.search.startDate = date1
		  this.search.endDate = date1
},
  methods:{
    formatDate(date, fmt) {
      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
      }
      let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
      }
      for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
          let str = o[k] + ''
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : this.padLeftZero(str))
        }
      }
      return fmt
    },

    padLeftZero(str) {
      return ('00' + str).substr(str.length)
    },
    searchData(page){
		this.loading = true
		this.page.currentPage = page
      let param = {
        pageIndex: page ? page : 1,
        pageSize: this.page.pageSize,
        userName:this.$Cookies.get('userCode'),
        startDate:this.search.startDate,
        endDate:this.search.endDate
      }
      this.$ajax.manage.getPlatformNews(param).then(res => {
        console.log(param)
        console.log(res.data)
        if(res.data.code == '0') {
          this.tableData = res.data.platformNewsList;
          console.log(this.tableData);
          this.page.total = res.data.totalRecords;
          this.tableData.splice(1, 0);
          this.$message.success(res.data.msg);
        }
      })
	  this.loading = false
    },
    handleCurrentChange(val){
      this.searchData(val);
    },

  }
}
</script>

<style scoped lang="less">

</style>