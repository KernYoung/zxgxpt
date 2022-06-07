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
            :props="defaultProps"
            default-expand-all
            :filter-node-method="filterNode"
            ref="tree"
          >
          </el-tree>
        </div>
      </div>
      <div class="right">
        <div class="right-container">
          <div
            style="display:flex;justify-content:space-between;align-items:center"
          >
            <el-button type="primary" plain size="medium" @click="openDialog"
              >新增</el-button
            >
            <span class="note"
              >说明：手动添加的公司公司编码请附带公司简称英文缩写，便于维护，如中韩人寿，则维护ZHRS001</span
            >
          </div>
          <el-table
            :data="tableData"
            style="margin-top:15px"
            size="small"
            max-height="calc(100% - 90px)"
            border
            :header-cell-style="{ background: '#ECF1FE' }"
          >
            <el-table-column prop="code" label="编码" width="100px">
            </el-table-column>
            <el-table-column prop="name" label="名称"> </el-table-column>
            <el-table-column prop="rule" label="用户前缀规则">
            </el-table-column>
            <el-table-column prop="parentName" label="上级组织名称">
            </el-table-column>
            <el-table-column prop="parentCode" label="上级组织编码">
            </el-table-column>
            <el-table-column prop="abbr" label="单位简称"> </el-table-column>
            <el-table-column prop="open" label="启用状态" width="100px">
            </el-table-column>
            <el-table-column label="操作" width="100px">
              <template slot-scope="scope">
                <el-button
                  type="text"
                  size="small"
                  v-if="!!scope.row.selfAdd"
                  @click="openDialog(scope.row)"
                  >编辑</el-button
                >
                <el-button type="text" size="small" v-if="!!scope.row.selfAdd"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
          <div class="page">
            <el-pagination
              @current-change="getTableData"
              :current-page.sync="page.currentPage"
              :page-size="page.pageSize"
              layout="total, prev, pager, next"
              :total="page.total"
            >
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      :title="dialog.title"
      :visible.sync="dialog.visible"
      width="550px"
    >
      <AddAndEdit :key="keys" :id="id"></AddAndEdit>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog.visible = false">取 消</el-button>
        <el-button type="primary">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import AddAndEdit from "./components/addAndEdit.vue";
export default {
  components: {
    AddAndEdit,
  },
  data() {
    return {
      filterText: "",
      data: [
        {
          id: 1,
          label: "浙江省国际贸易集团有限公司",
          children: [
            {
              id: 4,
              label: "浙江东方金融控股集团有限公司",
              children: [
                {
                  id: 9,
                  label: "浙江东方金融控股集团有限公司2",
                },
                {
                  id: 10,
                  label: "浙江东方金融控股集团有限公司3",
                },
              ],
            },
            {
              id: 5,
              label: "浙江东方金融控股集团有限公司",
              children: [
                {
                  id: 59,
                  label: "浙江东方金融控股集团有限公司2",
                },
                {
                  id: 50,
                  label: "浙江东方金融控股集团有限公司3",
                },
              ],
            },
          ],
        },
      ],
      defaultProps: {
        children: "children",
        label: "label",
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
      id: "",
    };
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },
  },
  mounted() {
    this.getTableData();
  },
  methods: {
    getTableData() {
      this.tableData = [
        {
          id: "1",
          code: "ZHR001",
          name: "中国人寿保险有限公司",
          rule: "zhrs",
          parentName: "浙江省国际贸易集团有限公司",
          parentCode: "010",
          abbr: "中韩人寿",
          open: "是",
          selfAdd: true,
        },
        {
          id: "2",
          code: "01201",
          name: "浙江东方金融控股集团股份有限公司",
          rule: "",
          parentName: "浙江省国际贸易集团有限公司",
          parentCode: "010",
          abbr: "浙江东方",
          open: "是",
        },
        {
          id: "2",
          code: "01201",
          name: "浙江东方金融控股集团股份有限公司",
          rule: "",
          parentName: "浙江省国际贸易集团有限公司",
          parentCode: "010",
          abbr: "浙江东方",
          open: "是",
        },
        {
          code: "01201",
          name: "浙江东方金融控股集团股份有限公司",
          rule: "",
          parentName: "浙江省国际贸易集团有限公司",
          parentCode: "010",
          abbr: "浙江东方",
          open: "是",
        },
        {
          id: "2",
          code: "01201",
          name: "浙江东方金融控股集团股份有限公司",
          rule: "",
          parentName: "浙江省国际贸易集团有限公司",
          parentCode: "010",
          abbr: "浙江东方",
          open: "是",
        },
        {
          id: "2",
          code: "01201",
          name: "浙江东方金融控股集团股份有限公司",
          rule: "",
          parentName: "浙江省国际贸易集团有限公司",
          parentCode: "010",
          abbr: "浙江东方",
          open: "是",
        },
      ];
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    openDialog(row) {
      console.log(row);
      this.id = row.id;
      this.keys = +new Date();
      this.dialog.title = row.id ? "编辑" : "新增";
      this.dialog.visible = true;
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
      width: 350px;
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
