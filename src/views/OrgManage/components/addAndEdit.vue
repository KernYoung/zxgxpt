<template>
  <el-form :model="form" ref="form" label-width="150px" class="demo-ruleForm">
    <el-form-item label="编码：" prop="code">
      <el-input v-model="form.code" style="width:300px"></el-input>
    </el-form-item>
    <el-form-item label="名称：" prop="name">
      <el-input v-model="form.name" style="width:300px"></el-input>
    </el-form-item>
    <el-form-item label="用户前缀规则：" prop="rule">
      <el-input v-model="form.rule" style="width:300px"></el-input>
    </el-form-item>
    <el-form-item label="上级组织名称：" prop="parentName">
      <el-input v-model="form.parentName" style="width:300px"></el-input>
    </el-form-item>
    <el-form-item label="上级组织编码：" prop="parentCode">
      <el-input v-model="form.parentCode" style="width:300px"></el-input>
    </el-form-item>
    <el-form-item label="单位简称：" prop="abbr">
      <el-input v-model="form.abbr" style="width:300px"></el-input>
    </el-form-item>
    <el-form-item label="是否启用：" prop="ifOpen">
      <el-switch v-model="form.ifOpen" :active-value="0" :inactive-value="1">
      </el-switch>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  props: {
    id: String,
  },
  data() {
    return {
      form: {
        code: "",
        name: "",
        rule: "",
        parentName: "",
        parentCode: "",
        abbr: "",
        ifOpen: 0,
      },
    };
  },
  watch: {
    id: {
      handler(val) {
        if (val) this.getDetail();
      },
      immediate: true,
    },
  },
  methods: {
    getDetail() {
      this.form = {
        code: "ZHR001",
        name: "中国人寿保险有限公司",
        rule: "zhrs",
        parentName: "浙江省国际贸易集团有限公司",
        parentCode: "010",
        abbr: "中韩人寿",
        ifOpen: 0,
      };
    },
  },
};
</script>
<style scoped lang="less"></style>
