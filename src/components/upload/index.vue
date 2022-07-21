<template>
  <div class="upload-file">
    <el-upload
      :action="uploadFileUrl"
      :file-list="fileList"
      :list-type="listType"
      :limit="limit"
      name="file"
      :http-request="uploadFile"
      :on-exceed="handleExceed"
      :on-remove="handleDelete"
      :before-upload="handleBeforeUpload"
      :on-preview="handlePreview"
      :headers="headers"
      class="upload-file-uploader"
      ref="upload"
    >
      <!-- 上传按钮 -->
      <el-button size="small" type="primary">导入</el-button>
      <!-- 上传提示 -->
    </el-upload>
    <!-- 文件列表 -->
  </div>
</template>

<script>
import store from '@/store'
import Cookies from 'js-cookie'
import { getCookieKey, getCookie } from '@/assets/utils.js'
export default {
  props: {
    // 值
    value: [String, Object, Array],
    // 大小限制(MB)
    // fileSize: {
    //   type: Number,
    //   default: 100,
    // },
    //
    listType: {
      type: String,
      default: 'text',
    },
    limit: {
      type: Number,
      default: 5,
    },
    // 文件类型, 例如['doc', 'xls', 'ppt', 'txt', 'pdf'],
    fileType: {
      type: Array,
      default: () => ['xlsx', 'xls'],
    },
    // // 是否显示提示
    // isShowTip: {
    //   type: Boolean,
    //   default: true,
    // },
  },
  data() {
    return {
      headers: {
        Authorization: Cookies.get(getCookieKey()),
        token: Cookies.get(getCookieKey()),
      },
      fileList: [],
      //   文件回显名字
      fileName: '',
    }
  },
  computed: {
    uploadFileUrl() {
      return `${process.env.VUE_APP_WEB_URL}/api/common/ZXB/uploadSpeedMapping`
    },
    // 是否显示提示
    // showTip() {
    //   return this.isShowTip && (this.fileType || this.fileSize)
    // },
    // 列表    //这个list是用来回显文件名字的，原版本是拿this.value,      但是$emit拿的this.value为fileId不是fileName，所以只能增加一个fileName字段，用来回显文件名称
    // list() {
    //   let temp = 1
    //   if (this.fileName) {
    //     // 首先将值转为数组
    //     const list = Array.isArray(this.fileName) ? this.fileName : [this.fileName]
    //     // 然后将数组转为对象数组
    //     return list.map((item) => {
    //       console.log('item', item)
    //       if (typeof item === 'string') {
    //         item = { name: item, url: item }
    //       }
    //       item.uid = item.uid || new Date().getTime() + temp++
    //       return item
    //     })
    //   } else {
    //     this.fileList = []
    //     return []
    //   }
    // },
  },
  watch: {
    value(file) {
      if (typeof file === 'string') {
        this.fileList = [{ name: this.getFileName(file) }]
      } else {
        this.fileList = file.map((item) => {
          item.name = this.getFileName(item.fileUrl)
          return item
        })
      }
    },
  },
  mounted() {
    if (this.value) {
      console.log(this.value)
      // this.fileList = this.value
    }
  },
  methods: {
    uploadFile(param) {
      const formData = new FormData()
      formData.append('file', param.file)
      this.$ajax.manage.uploadSpeedMapping(formData).then((res) => {
        console.log(res)
        if (res.data.code == '0') {
          this.fileName = res.data
          this.$message.success(res.data.msg)
          this.$emit('success', res.data)
          param.onSuccess()
        } else {
          this.$message.error(res.data.msg)
          param.onError()
        }
      })
      // UploadImageApi(formData).then(response => {
      //     console.log('上传图片成功')
      //   param.onSuccess()  // 上传成功的图片会显示绿色的对勾
      //   // 但是我们上传成功了图片， fileList 里面的值却没有改变，还好有on-change指令可以使用
      // }).catch(response => {
      //   console.log('图片上传失败')
      //   param.onError()
      // })
    },
    // 上传前校检格式和大小
    handleBeforeUpload(file) {
      // 校检文件类型
      if (this.fileType) {
        let fileExtension = ''
        if (file.name.lastIndexOf('.') > -1) {
          fileExtension = file.name.slice(file.name.lastIndexOf('.') + 1)
        }
        const isTypeOk = this.fileType.some((type) => {
          if (file.type.indexOf(type) > -1) return true
          if (fileExtension && fileExtension.indexOf(type) > -1) return true
          return false
        })
        if (!isTypeOk) {
          this.$message.error(`文件格式不正确, 请上传${this.fileType.join('/')}格式文件!`)
          return false
        }
      }
      // 校检文件大小
      if (this.fileSize) {
        const isLt = file.size / 1024 / 1024 < this.fileSize
        if (!isLt) {
          this.$message.error(`上传文件大小不能超过 ${this.fileSize} MB!`)
          return false
        }
      }
      return true
    },
    // 文件个数超出
    handleExceed() {
      this.$message.error(`超出文件个数限制`)
    },
    // 上传失败
    handleUploadError(err) {
      this.$message.error('上传失败, 请重试')
    },
    // 上传成功回调
    handleUploadSuccess(res, file) {
      console.log(res)

      this.fileName = res.data
      console.log(res)
      if (res.code == '0') {
        this.$message.success(res.msg)
        this.$emit('success', res.data)
      }
      //传给父级fileId字段
    },
    // 删除文件
    handleDelete(file, fileList) {
      // this.fileList.splice(index, 1)
      this.$emit('remove', fileList)
      // this.fileName = ''
    },
    handlePreview(file) {
      // console.log(`${process.env.VUE_APP_FILE}${this.value}`)
      window.open(`${process.env.VUE_APP_FILE}${this.value}`)
    },
    // 获取文件名称
    getFileName(name) {
      if (name.lastIndexOf('/') > -1) {
        return name.slice(name.lastIndexOf('/') + 1).toLowerCase()
      } else {
        return ''
      }
    },
  },
  created() {
    // this.fileList = this.list
  },
}
</script>

<style scoped>
.upload-file-uploader {
  margin-bottom: 5px;
}
.upload-file-list .el-upload-list__item {
  border: 1px solid #e4e7ed;
  line-height: 2;
  margin-bottom: 10px;
  position: relative;
}
.upload-file-list .ele-upload-list__item-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: inherit;
}
.ele-upload-list__item-content-action .el-link {
  margin-right: 10px;
}
::v-deep .el-upload-list {
  display: inline-block;
  vertical-align: middle;
}
</style>
