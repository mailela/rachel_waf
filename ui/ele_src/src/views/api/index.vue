<template>
  <div class="app-container">
    <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column label="接口">
        <template slot-scope="scope">
          {{ scope.row.uri }}
        </template>
      </el-table-column>
      <el-table-column label="参数">
        <template slot-scope="scope">
          {{ scope.row.params }}
        </template>
      </el-table-column>
      <el-table-column label="请求类型">
        <template slot-scope="scope">
          {{ scope.row.method }}
        </template>
      </el-table-column>
      <el-table-column label="描述">
        <template slot-scope="scope">
          {{ scope.row.desc }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { api_list } from '@/api/system'
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
  },
  mounted() {
   
  },
  destroyed(){
  },
  beforeRouteEnter(to, from, next) {
    Type = to.path.split('/')[2]
    next()
  },
  methods: {
    /**
     * 获取数据
     */
    fetchData() {
      // this.listLoading = true
      api_list().then(response => {
        this.list = response.data.items
        // this.listLoading = false
      })
    }
  }
}
</script>