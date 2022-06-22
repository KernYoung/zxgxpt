<template>
  <div class="container-wrapper">
    <div style="margin-bottom: 15px;">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/homePage' }"
          >首页</el-breadcrumb-item
        >
        <el-breadcrumb-item>组织架构维护</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="container">
      <div class="left">
        <div class="search-box">
          <el-input placeholder="输入关键字进行过滤" v-model="filterText">
          </el-input>
        </div>
        <div class="tree-box">
          <el-tree
            class="filter-tree"
            :data="data"
            node-key="code"
            :default-expanded-keys="[defaultNode]"
            :current-node-key="defaultNode"
            :props="defaultProps"
            :filter-node-method="filterNode"
            ref="tree"
            highlight-current
            @node-click="nodeClick"
            v-loading="treeLoading"
          >
          </el-tree>
        </div>
      </div>
      <div class="right">
        <div class="right-container">
          <div
            style="display:flex;justify-content:space-between;align-items:center"
          >
            <div>
              <el-button type="primary" plain size="medium" @click="add"
                >新增</el-button
              >
              <el-button type="primary" plain size="medium" @click="exportExcel"
                >导出</el-button
              >
            </div>
            <span class="note"
              >说明：手动添加的公司公司编码请附带公司简称英文缩写，便于维护，如中韩人寿，则维护ZHRS001</span
            >
          </div>
          <el-table
            :data="tableData"
            style="margin-top:15px"
            size="small"
            height="calc(100% - 90px)"
            border
            :header-cell-style="{ background: '#ECF1FE' }"
            ref="table"
          >
            <el-table-column prop="code" label="编码" width="100px">
            </el-table-column>
            <el-table-column prop="name" label="名称"> </el-table-column>
            <el-table-column prop="rule" label="用户前缀规则">
            </el-table-column>
            <el-table-column prop="sname" label="上级组织名称">
            </el-table-column>
            <el-table-column prop="scode" label="上级组织编码">
            </el-table-column>
            <el-table-column prop="shortName" label="单位简称">
            </el-table-column>
            <el-table-column prop="enableState" label="启用状态" width="100px">
              <template slot-scope="scope">
                <el-tag
                  type="primary"
                  size="small"
                  v-if="
                    scope.row.enableState == 1 || scope.row.enableState == 2
                  "
                  >是</el-tag
                >
                <el-tag
                  type="danger"
                  size="small"
                  v-if="scope.row.enableState == 0"
                  >否</el-tag
                >
              </template>
            </el-table-column>
            <el-table-column label="操作" width="100px">
              <template slot-scope="scope">
                <el-button
                  type="text"
                  size="small"
                  v-if="scope.row.orgType !== 'NC'"
                  @click="openDialog(scope.row)"
                  >编辑</el-button
                >
                <el-button
                  type="text"
                  size="small"
                  v-if="scope.row.orgType !== 'NC'"
                  @click="deleteRow(scope.row)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
          <!-- <div class="page">
            <el-pagination
              @current-change="handleCurrentChange"
              :current-page.sync="page.currentPage"
              :page-size="page.pageSize"
              layout="total, prev, pager, next"
              :total="page.total"
            >
            </el-pagination>
          </div> -->
        </div>
      </div>
    </div>
    <el-dialog
      :title="dialog.title"
      :visible.sync="dialog.visible"
      width="550px"
    >
      <AddAndEdit
        :key="keys"
        :currentRow="currentRow"
        @savesuccess="savesuccess"
      ></AddAndEdit>
    </el-dialog>
  </div>
</template>
<script>
import AddAndEdit from "./components/addAndEdit.vue";
import XLSX from "xlsx";
import FileSaver from "file-saver";
export default {
  components: {
    AddAndEdit,
  },
  data() {
    return {
      filterText: "",
      data: [],
      defaultProps: {
        children: "childHrOrg",
        label: "name",
      },
      tableData: [],
      page: {
        currentPage: 1,
        pageSize: 10,
        total: 0,
      },
      dialog: {
        title: "",
        visible: false,
        type: "",
      },
      keys: +new Date(),
      currentRow: {},
      currentNode: null,
      treeLoading: true,
      defaultNode: "010",
    };
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },
  },
  mounted() {
    // this.getTableData("");
    this.getOrg();
  },
  methods: {
    getOrg() {
      this.$ajax.manage.getHrOrg({ code: "" }).then((res) => {
        this.treeLoading = false;
        if (res.data.code == "0") {
          this.data = [res.data.data[0]];
          this.defaultNode = res.data.data[0].code;
          this.getTableData(this.defaultNode);
          this.currentNode = res.data.data[0];
        }
      });
    },
    getTableData(code) {
      this.$ajax.manage.getHrOrg({ code }).then((res) => {
        if (res.data.code == "0") {
          this.tableData = res.data.data;
          this.page.total = res.data.data.length;
        }
      });
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    },
    openDialog(row) {
      this.currentRow = row;
      this.keys = +new Date();
      this.dialog.title = "编辑";
      this.dialog.visible = true;
    },
    add() {
      if (!this.currentNode) {
        this.$message.warning("请选择组织架构");
        return;
      }
      this.currentRow = {
        scode: this.currentNode.code,
        sname: this.currentNode.name,
      };
      this.keys = +new Date();
      this.dialog.title = "新增";
      this.dialog.visible = true;
    },
    savesuccess() {
      this.dialog.visible = false;
      this.getTableData(this.currentNode.code);
    },
    nodeClick(data) {
      console.log(data);
      this.currentNode = data;
      this.getTableData(data.code);
    },
    handleCurrentChange(val) {
      this.table;
    },
    deleteRow(row) {
      this.$confirm("确定删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let param = {
            dr: 1,
            pkOrg: row.pkOrg,
            orgType: row.orgType,
          };
          this.$ajax.manage.SaveHrOrg(param).then((res) => {
            if (res.data.code == "0") {
              this.$message({
                type: "success",
                message: res.data.msg,
              });
              this.getTableData(this.currentNode.code);
            }
          });
        })
        .catch(() => {});
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
          `组织架构维护(${this.currentNode.name}).xlsx`
        );
      } catch (e) {
        if (typeof console !== "undefined") {
          console.log(e, wbout);
        }
      }
      console.log("222");
      return wbout;
    },
  },
};
</script>
<style scoped lang="less">
.container-wrapper {
  .container {
    display: flex;
    height: calc(100% - 50px);
    box-sizing: border-box;
    .left {
      width: 450px;
      background: #fff;
      margin-right: 10px;
      overflow: auto;
      .search-box {
        position: sticky;
        top: 0;
        z-index: 1;
        margin-bottom: 5px;
        padding: 15px 15px 0;
        background: #fff;
      }
      .tree-box {
        padding: 5px 15px 15px;
      }
    }
    .right {
      flex: 1;
      background: #fff;

      position: relative;
      .right-container {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        padding: 15px;
        box-sizing: border-box;
      }

      .note {
        color: #e6a23c;
        font-size: 12px;
        margin-left: 10px;
        font-weight: bold;
      }
    }
  }
}
</style>
