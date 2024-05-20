<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px" auto-complete="off" label-position="left">
      <el-form-item label="升级码" prop="server_code">
        <el-input ref="server_code" v-model="form.server_code" :disabled="true" />
        <i class="el-icon-document-copy" @click="onCopy(form.server_code)">复制</i>
      </el-form-item>
      <el-form-item label="资源码" prop="file_code">
        <el-input ref="file_code" v-model="form.file_code" :disabled="true" />
        <i class="el-icon-document-copy" @click="onCopy(form.file_code)">复制</i>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click.native.prevent="BuildVersion">发布</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { update_server, build_version } from '@/api/system'
import copy from '@/utils/clipboard'
export default {
  data() {
    return {
      form: {
        server_code: '',
        file_code: '',
      }
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      update_server({
        username: this.form.username,
        password: this.form.password,
      }).then((res) => {
        const { server_code,file_code } = res.data;
        this.form.server_code = server_code;
        this.form.file_code = file_code;
      });
    },
    BuildVersion() {
      build_version().then((res) => {
        this.$message({ message: res.msg, type: res.msg_type });
      });
    },

    onCopy(text) {
      copy(text).then(res => {
        this.$message(res);
      })
    },
  },
};
</script>

<style scoped>
.app-container {
  min-height: 100%;
  width: 100%;
  overflow: hidden;

  .el-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    overflow: hidden;
    i{
      margin-left: 1rem;
      cursor: pointer;
    }
  }
}

.line {
  text-align: center;
}
</style>
