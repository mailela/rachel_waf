<template>
  <div class="app-container" v-if="isLoad">
    <el-form ref="form" :model="form" :rules="formRules" label-width="120px" auto-complete="off" label-position="left">
      <el-form-item label="帐户名" prop="username">
        <el-input ref="username" v-model="form.username" />
      </el-form-item>
      <el-form-item label="角色" prop="role">
        <el-select v-model="form.role" placeholder="请选择">
          <el-option v-for="item in roles" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="过期时间" prop="expire">
        <el-date-picker v-model="form.expire" type="datetime" placeholder="选择日期时间" default-time="12:00:00"
          :picker-options="pickerOptions">
        </el-date-picker>
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
import { edit_user, getRoleList, getUser } from "@/api/user"
import { validUsername, validPassword } from '@/utils/validate'
import { nextTick } from "vue";
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
      isLoad:false,
      formRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
      },
      form: {
        username: '',
        password: '',
        re_password: '',
        expire: new Date().getTime() + 3600 * 1000 * 24 * 30,
        role: "",
      },
      roles: [],
      pickerOptions: {
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date());
          }
        }, {
          text: '明天',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() + 3600 * 1000 * 24);
            picker.$emit('pick', date);
          }
        }
          , {
          text: '一周后',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() + 3600 * 1000 * 24 * 7);
            picker.$emit('pick', date);
          }
        }
          , {
          text: '一月后',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() + 3600 * 1000 * 24 * 30);
            picker.$emit('pick', date);
          }
        }
          , {
          text: '一年后',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() + 3600 * 1000 * 24 * 365);
            picker.$emit('pick', date);
          }
        }
        ]
      },
    }
  },
  created() {
    this.fetchRoles();
    this.$nextTick(() => { 
      this.fetchData();
      this.isLoad = true;
     })
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (!valid) {
          return false
        }
        edit_user(this.form).then(res => {
          this.$message({ message: res.msg, "type": res.msg_type })
          this.$router.push({ path: '/user/list' })
        });
      });
    },
    fetchData() {
      if (!this.$route.query.key) {
        return;
      }
      getUser({ key: this.$route.query.key }).then(res => {
        this.form = res.data;
        this.isLoad = true;
      }).catch(err => {
        this.$router.push({ path: '/user/list' })
      })
    },
    fetchRoles() {
      getRoleList().then(res => {
        let roles = [];
        for (let i in res.data.items) {
          let item = res.data.items[i];
          // console.log(item)
          roles.push({ label: item.name, value: item.key })
        }
        // console.log(roles)
        this.roles = roles
        this.form.role = roles[0].value
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
