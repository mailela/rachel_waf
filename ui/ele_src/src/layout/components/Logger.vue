<template>
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
</template>
<script>
import { get_logs } from '@/api/logs'
export default {
  props:{
    logType: {
      type: String,
    },
    logRefresh: {
      type: Boolean,
      default:true
    },
  },
  watch:{
    "logRefresh":{
      handler(newVal,oldVal){ 
        this.autoFetch=newVal;
      }
    },
    "autoFetch":{
      handler(newVal,oldVal){   
        if(newVal){
          this.startFetch();
        }else{
          clearInterval(this.interval);
        }
      }
    }
  },
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
      Type: "all",
      list: null,
      autoFetch: true,
      listLoading: false,
      interval:null
    }
  },
  created() {
    this.Type=this.$props.logType;
    this.fetchData();
    this.autoFetch=this.$props.logRefresh; 
    if(this.autoFetch){
      this.startFetch();
    }
  },
  mounted() {
  },
  beforeDestroy() {
    console.log(this.interval,"清除计时器")
    clearInterval(this.interval)
  },
  beforeRouteEnter(to, from, next) {
    clearInterval(this.interval)
    next()
  },
  methods: {
    /**
     * 自动获取数据
     *
     * @returns 无返回值
     */
    startFetch() {
      this.interval=setInterval(() => {
      if (this.autoFetch) {
        this.fetchData();
      }
      }, 1000);
    },
    /**
     * 获取数据
     */
    fetchData() {
      //  console.log(this.interval)
      get_logs(this.Type).then(response => {
        this.list = response.data.items
      })
    }
  }
}
</script>