<template>
  <div class="app-container">
    <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column label="帐户">
        <template slot-scope="scope">
          {{ scope.row.USERNAME }}
        </template>
      </el-table-column>
      <el-table-column label="登录IP">
        <template slot-scope="scope">
          {{ scope.row.REMOTE_ADDR }}
        </template>
      </el-table-column>
      <el-table-column label="帐户标识">
        <template slot-scope="scope">
          {{ scope.row.USER_AGENT }}
        </template>
      </el-table-column>
      <el-table-column label="登录时间">
        <template slot-scope="scope">
          {{ scope.row.LOGIN_TIME }}
        </template>
      </el-table-column>
      <el-table-column label="过期时间">
        <template slot-scope="scope">
          {{ scope.row.EXPIRED }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button @click="kickOut(scope.$index, scope.row)" v-if="!isMe(scope.row.TOKEN)">踢除</el-button>
          <div v-else>当前帐户</div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { MessageBox, Message } from "element-ui";
import { getOnline, kickOut } from '@/api/user'
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
    Type = to.path.split('/')[2]
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
    /**
     * 获取数据
     */
    fetchData() {
      // this.listLoading = true
      getOnline().then(response => {
        this.list = response.data.items
        // this.listLoading = false
      })
    },
    kickOut: function (index, row) {
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
          this.fetchData();
        })
      });
    }
  }
}
</script>