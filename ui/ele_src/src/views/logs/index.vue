<template>
  <div class="app-container">
    <el-form>
      <el-form-item label="自动更新">
        <el-switch v-model="autoFetch" />
      </el-form-item>
    </el-form>
    <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label="索引" width="130">
        <template slot-scope="scope">
          {{ scope.row.index }}
        </template>
      </el-table-column>
      <el-table-column label="日志">
        <template slot-scope="scope">
          {{ scope.row.log }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { get_logs } from '@/api/logs'
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
      interval:null
    }
  },
  created() {
    this.fetchData()
    setTimeout(() => {
      this.autoFetch=store.getters.config.log_refresh || false;
    },1);
  },
  mounted() {
    clearInterval(this.interval)
    this.startFetch()
   
  },
  destroyed(){
    clearInterval(this.interval)
  },
  beforeRouteEnter(to, from, next) {
    Type = to.path.split('/')[2]
    next()
  },
  methods: {
    /**
     * 自动获取数据
     *
     * @returns 无返回值
     */
    startFetch() {
      this.interval= setInterval(() => {
      if (this.autoFetch) {
        this.fetchData();
      }
      }, 1000);
    },
    /**
     * 获取数据
     */
    fetchData() {
      // this.listLoading = true
      get_logs(Type).then(response => {
        this.list = response.data.items
        // this.listLoading = false
      })
    }
  }
}
</script>