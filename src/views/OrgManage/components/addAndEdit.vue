<template>
  <div>
    <el-form
      :model="form"
      ref="form"
      label-width="150px"
      class="demo-ruleForm"
      :rules="rules"
    >
      <el-form-item label="编码：" prop="code">
        <el-input v-model="form.code" style="width:300px"></el-input>
      </el-form-item>
      <el-form-item label="名称：" prop="name">
        <el-input v-model="form.name" style="width:300px"></el-input>
      </el-form-item>
      <el-form-item label="用户前缀规则：" prop="rule">
        <el-input v-model="form.rule" style="width:300px"></el-input>
      </el-form-item>
      <el-form-item label="上级组织名称：" prop="sname">
        <el-input v-model="form.sname" style="width:300px" disabled></el-input>
      </el-form-item>
      <el-form-item label="上级组织编码：" prop="scode">
        <el-input v-model="form.scode" style="width:300px" disabled></el-input>
      </el-form-item>
      <el-form-item label="单位简称：" prop="shortName">
        <el-input v-model="form.shortName" style="width:300px"></el-input>
      </el-form-item>
      <el-form-item label="是否启用：" prop="enableState">
        <el-switch
          v-model="form.enableState"
          :active-value="1"
          :inactive-value="0"
        >
        </el-switch>
      </el-form-item>
    </el-form>
    <div style="text-align:right">
      <el-button type="primary" @click="submitForm('form')">保 存</el-button>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    currentRow: Object,
  },
  data() {
    var validateCode = (rule, value, callback) => {
      var judgeFn = new RegExp(/\s+/g);
      if (value === "") {
        callback(new Error("请输入编码"));
      }else if(judgeFn.test(value)){
        callback(new Error("编码不能有空格"));
      }else {
        if (this.orginData.code == value) {
          callback();
          return;
        }
        this.$ajax.manage.checkCompany({ code: value }).then((res) => {
          if (res.data.data.flag) {
            callback();
          } else {
            callback(new Error("该编码已存在!"));
          }
        });
      }
    };
    var validateName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入名称"));
      } else {
        if (this.orginData.name == value) {
          callback();
          return;
        }
        this.$ajax.manage.checkCompany({ name: value }).then((res) => {
          if (res.data.data.flag) {
            callback();
          } else {
            callback(new Error("该名称已存在!"));
          }
        });
      }
    };
    var validatePre = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户前缀规则"));
      } else {
        if (this.orginData.name == value) {
          callback();
          return;
        }
        this.$ajax.manage.checkCompany({
          pre: value,
          scode:this.form.scode,
          zcode:this.form.code,
        }).then((res) => {
          if (res.data.data.flag) {
            callback();
          } else {
            callback(new Error("该前缀已存在!"));
          }
        });
      }
    };
    return {
      form: {
        code: "",
        name: "",
        rule: "",
        scode: "",
        sname: "",
        shortName: "",
        enableState: 0,
      },
      orginData: {},
      rules: {
        code: [
          { required: true, message: "请输入编码", trigger: "blur" },
          { validator: validateCode, trigger: "blur" },
        ],
        name: [
          { required: true, message: "请输入名称", trigger: "blur" },
          { validator: validateName, trigger: "blur" },
        ],
        rule: [
          { required: true, message: "请输入用户前缀规则", trigger: "blur" },
          { validator: validatePre, trigger: "blur" },
        ],
      },
    };
  },
  watch: {
    currentRow: {
      handler(val) {
        console.log(val);
        this.orginData = val;
        this.form = Object.assign({}, val);
      },
      immediate: true,
      deep: true,
    },
  },
  mounted() {
    // console.log(this.$store.state.codeList);
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.form);
          let param = Object.assign({ orgType: "手工" }, this.form);
          param.updateTimeBy =this.$Cookies.get("userCode")
          console.log(param);
          this.$ajax.manage.SaveHrOrg(param).then((res) => {
            if (res.data.code == "0") {
              this.$message.success(res.data.msg || "保存成功");
              this.$emit("savesuccess");
            }
          });
        } else {
          // console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>
<style scoped lang="less"></style>
