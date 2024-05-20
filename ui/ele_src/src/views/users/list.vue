<template>
  <div class="app-container">
    <div class="pannel">
      <el-button type="primary" @click.native.prevent="addUser">添加帐户</el-button>
    </div>
    <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column label="帐户">
        <template slot-scope="scope">
          {{ scope.row.username }}
        </template>
      </el-table-column>
      <el-table-column label="角色">
        <template slot-scope="scope">
          {{ scope.row.role_name }}
        </template>
      </el-table-column>
      <el-table-column label="过期时间">
        <template slot-scope="scope">
          {{ scope.row.expire|formatDate }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button @click="editUser(scope.row.key)" >编辑</el-button>
          <el-button @click="delUser(scope.row.key)" v-if="scope.row.is_system!=1">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
 
</template>

<script>
import { MessageBox, Message } from "element-ui";
import { getUserList,del_user, kickOut } from '@/api/user'
import store from "@/store"
import moment from "moment"
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
      if (!value) return '永久';
      const date = new Date(value);
      return moment(date).format(formatString);
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
    editUser(key) {
      this.$router.push({path: '/user/edit', query:{key: key}});
    },
    /**
     * 获取数据
     */
     delUser(key) {
      MessageBox.confirm(
        "确认要删除该帐户吗？",
        "删除帐户",
        {
          confirmButtonText: "删除",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).then(() => {
        del_user({"key":key}).then(res => {
        this.$message({"message":res.msg,"type":res.msg_type})
        this.fetchData();
      })
      });
    
    },
    fetchData() {
      // this.listLoading = true
      getUserList().then(response => {
        this.list = response.data.items
        // this.listLoading = false
      })
    },
    addUser() {
      this.$router.push('/user/add')
    }
  }
}
</script>
<style lang="scss" scoped>
.pannel{
  margin-bottom:1rem;
  float:right;
}
</style>