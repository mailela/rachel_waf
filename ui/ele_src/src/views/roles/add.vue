<template>
  <div class="app-container" v-if="isLoad">
    <el-form ref="form" :model="form" :rules="formRules" auto-complete="off" label-position="left">
      <el-form-item label="角色名" prop="name">
        <el-input ref="name" v-model="form.name" />
      </el-form-item>
      <el-form-item label="权限" prop="value">
        <el-transfer v-model="form.value" :data="right_data" filterable filter-placeholder="请输入关键字" :titles="['所有权限', '选中权限']"></el-transfer>
      </el-form-item>
      <el-form-item label="菜单" prop="value">
        <el-transfer v-model="form.menus" :data="menus_data" filterable filter-placeholder="请输入关键字" :titles="['所有菜单', '选中菜单']"></el-transfer>
      </el-form-item>
      <el-form-item label="描述" prop="desc">
        <el-input ref="desc" v-model="form.desc" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click.native.prevent="onSubmit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { edit_roles, getRole } from "@/api/user"
import { api_list } from '@/api/system'
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
      isLoad:false,
      right_data: [],
      menus_data: [],
      formRules: {},
      form: {
        name: '',
        value: [],
        menus: [],
        desc: '',
        key:this.$route.query.key,
      }
    }
  },
  created() {
    this.fetchApiData();
    this.fetchMenu(this.$router.options.routes);
    this.$nextTick(() => {
      this.fetchData();
      this.isLoad = true;
    })
  },
  mounted() {

  },
  methods: {
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (!valid) {
          return false
        }
        edit_roles(this.form).then(res => {
            this.$message({ message: res.msg, "type": res.msg_type })
            this.$router.push({ path: '/user/roles' })
          });
      });
    },
    fetchData() {
      if (!this.$route.query.key) {
        return;
      }
      getRole({ key: this.$route.query.key }).then(res => {
        this.form = res.data;
        this.isLoad = true;
      }).catch(err => {
        this.$router.push({ path: '/user/roles' })
      })
    },
    fetchMenu(menus, pre) {
      for (let i in menus) {
        let item = menus[i]
        if (!item.hidden) {
          this.menus_data.push({
            label: item.meta.title,
            // key:  item.path,
            key: ((pre || "") + item.path).replace("//", "/"),
          });
        }
        if (item.children) {
          this.fetchMenu(item.children, item.path + "/")
        }
      }
    },
    fetchApiData() {
      api_list().then(response => {
        this.right_data = response.data.items;
      })
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

    .el-input {
      max-width: 520px;
    }

    max-width: 100%;
    overflow: hidden;
  }
}

.line {
  text-align: center;
}
</style>
