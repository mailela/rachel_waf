<template>
  <div class="app-container">
    <div class="pannel">
      <el-button type="primary" @click.native.prevent="addRoles">添加角色</el-button>
    </div>
    <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column label="名称">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="描述">
        <template slot-scope="scope">
          {{ scope.row.desc }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button @click="editRole(scope.row.key)">编辑</el-button>
          <el-button @click="delRole(scope.row.key)" v-if="scope.row.is_system != 1">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { MessageBox, Message } from "element-ui";
import { getRoleList, del_role, kickOut } from '@/api/user'
import store from "@/store"
let Type = "all"
export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    },
    formatDate(value, formatString = 'YYYY-MM-DD HH:mm:ss') {
      if (!value) return '';
      const date = new Date(value);
      try {
        return moment(date).format(formatString);
      } catch (e) {
      }
      return value;
    }
  },
  data() {
    return {
      list: null,
      autoFetch: false,
      listLoading: false,
      interval: null
    }
  },
  created() {
    this.fetchData()
  },
  mounted() {

  },
  destroyed() {
  },
  beforeRouteEnter(to, from, next) {
    next()
  },
  methods: {
    isMe(value) {
      console.log(store.getters.token)
      if (value == store.getters.token) {
        return true;
      }
      return false;
    },
    editRole(key) {
      this.$router.push({ path: '/user/roles/edit', query: { key: key } });
    },
    /**
     * 获取数据
     */
    delRole(key) {
      MessageBox.confirm(
        "确认要删除该角色吗？",
        "删除角色",
        {
          confirmButtonText: "删除",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).then(() => {
        del_role({ "key": key }).then(res => {
          this.$message({ "message": res.msg, "type": res.msg_type })
          this.fetchData();
        })
      });
    },
    fetchData() {
      // this.listLoading = true
      getRoleList().then(response => {
        this.list = response.data.items
        // this.listLoading = false
      })
    },
    addRoles() {
      this.$router.push('/user/roles/add')
    },
    LogOut: function (index, row) {
      MessageBox.confirm(
        "确认要踢除该帐户吗？",
        "踢除帐户",
        {
          confirmButtonText: "踢除",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).then(() => {
        kickOut({ "token": row.TOKEN, "salt": row.SALT }).then(res => {
          this.$message({ "message": res.msg, "type": res.msg_type });
          location.reload();
        })
      });
    }
  }
}
</script>
<style lang="scss" scoped>
.pannel {
  margin-bottom: 1rem;
  float: right;
}
</style>