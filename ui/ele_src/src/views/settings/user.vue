<template>
  <div class="app-container">
    <el-form ref="form" :model="form" :rules="formRules" label-width="120px" auto-complete="off"   label-position="left">
      <el-form-item label="帐户名" prop="username">
        <el-input ref="username" v-model="form.username" :disabled="true" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input ref="password" v-model="form.password" type="password" />
      </el-form-item>
      <el-form-item label="确认密码" prop="re_password">
        <el-input v-model="form.re_password" type="password" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click.native.prevent="onSubmit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { change_user } from "@/api/user"
import { validUsername, validPassword } from '@/utils/validate'
export default {

  data() {
    const validateUsername = (rule, value, callback) => {
      validUsername(value, callback)
    }
    const validatePassword = (rule, value, callback) => {
      validPassword(value, callback)
    }
    const validateRePassword = (rule, value, callback) => {
      if (value != this.form.password) {
        callback(new Error('再次密码输入不一致'))
      } else {
        callback()
      }
    }

    return {
      formRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }],
        re_password: [{ required: true, trigger: 'blur', validator: validateRePassword }]
      },
      form: {
        username: this.$store.getters.name,
        password: '',
        re_password: '',
      }
    }
  },
  created() {
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (!valid) {
          return false
        }
        change_user({
          username: this.form.username,
          password: this.form.password,
        }).then(res => {
          this.$message({ message: res.msg, "type": res.msg_type })
        });
      });
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    },

  }
}
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
  }
}
  .line {
    text-align: center;
  }
 </style>
