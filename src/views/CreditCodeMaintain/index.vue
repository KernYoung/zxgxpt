<template>
  <div class="container-wrapper">
    <div style="margin-bottom: 15px;">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/homePage' }"
          >首页</el-breadcrumb-item
        >
        <el-breadcrumb-item>信保代码维护</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div style="color:#409eff;font-weight:bold;">
        成员公司中信保买方代码填报
      </div>
      <div style="margin-top:10px">
        <el-input
          v-model="form.code"
          placeholder="公司HR编码"
          style="width:220px"
        ></el-input>
        <el-input
          v-model="form.name"
          placeholder="公司HR名称"
          style="width:220px;margin:0 10px"
        ></el-input>
        <el-button type="primary" @click="search">查询</el-button>
        <el-button type="primary" @click="download">导出</el-button>
      </div>
      <div style="margin-top:10px;font-size:14px">
        共 {{ page.total }} 条数据
      </div>
      <el-table
        :data="tableData"
        style="margin-top:15px"
        size="small"
        height="calc(100% - 120px)"
        border
        :header-cell-style="{ background: '#ECF1FE' }"
        ref="table"
      >
        <el-table-column prop="code" label="公司HR编码" width="100px">
        </el-table-column>
        <el-table-column prop="name" label="公司HR名称"> </el-table-column>
        <el-table-column prop="companyName" label="所属成员公司HR名称">
        </el-table-column>
        <el-table-column prop="companyType" label="数据来源"> </el-table-column>
        <el-table-column prop="clientNo" label="信保通买方代码">
          <template slot-scope="scope">
            <div
              style="width:100%;height:30px;line-height:30px;cursor:pointer"
              @click="open(scope.row)"
            >
              <el-link :type="scope.row.clientNo ? 'info' : 'primary'">{{
                scope.row.clientNo ? scope.row.clientNo : ""
              }}</el-link>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <!-- <div class="page">
        <el-pagination
          @current-change="getTableData"
          :current-page.sync="page.currentPage"
          :page-size="15"
          layout="total, prev, pager, next"
          :total="page.total"
        >
        </el-pagination>
      </div> -->
    </div>
  </div>
</template>
<script>
import XLSX from "xlsx";
import FileSaver from "file-saver";
export default {
  data() {
    return {
      tableData: [],
      page: {
        currentPage: 1,
        pageSize: 500,
        total: 0,
      },
      form: {
        code: "",
        name: "",
      },
    };
  },
  mounted() {
    this.getTableData();
  },
  methods: {
    getTableData() {
      let param = {
        code: this.form.code,
        name: this.form.name,
        pageIndex: this.page.currentPage,
        pageSize: this.page.pageSize,
      };
      this.$ajax.manage.getXbMapping(param).then((res) => {
        if (res.data.code == "0") {
          this.tableData = res.data.data;
          this.page.total = res.data.totalRecords;
        }
      });
    },
    search() {
      this.page.currentPage = 1;
      this.getTableData();
    },
    open(row) {
      this.$prompt("", "请输入信保通买方代码", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputValue: row.clientNo !== "" ? row.clientNo : null,
        inputValidator: (val) => {
          if (!val || val == "") {
            return "请填写";
          }
        },
      })
        .then(({ value }) => {
          let param = {
            code: row.code,
            clientNo: value,
            name: row.name,
            companyType:row.companyType,
            updateBy:this.$Cookies.get('userCode')
          };
          this.$ajax.manage.saveXbMapping(param).then((res) => {
            if (res.data.code == "0") {
              this.$message.success("保存成功");
              this.getTableData();
            }
          });
        })
        .catch(() => {});
    },
    download() {
      console.log(this.exportExcel());
    },
    exportExcel() {
      const tableComp = this.$refs.table.$el;
      var wb;
      var fix = tableComp.querySelector(".el-table__fixed");
      // 1.从el-table中生成Excel工作簿
      if (fix) {
        // 解决固定列时导出两份的bug
        wb = XLSX.utils.table_to_book(tableComp.removeChild(fix), {
          raw: true,
        });
        tableComp.appendChild(fix);
      } else {
        wb = XLSX.utils.table_to_book(tableComp, { raw: true });
      }
      // 2.输出二进制字符串
      let wbout = XLSX.write(wb, {
        bookType: "xlsx",
        bookSST: true,
        type: "array",
      });
      try {
        FileSaver.saveAs(
          new Blob([wbout], { type: "application/octet-stream" }),
          `信保代码维护.xlsx`
        );
      } catch (e) {
        if (typeof console !== "undefined") {
          console.log(e, wbout);
        }
      }
      return wbout;
    },
  },
};
</script>
<style scoped lang="less">
.container {
  padding: 15px;
  height: calc(100% - 50px);
  box-sizing: border-box;
  background: #fff;
}
</style>
