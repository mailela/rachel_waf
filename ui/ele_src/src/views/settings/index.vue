<template>
  <div class="app-container">
    <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column label="项目">
        <template slot-scope="scope">
          {{ scope.row.info.title }}
        </template>
      </el-table-column>
      <el-table-column label="设置">
        <template slot-scope="scope">
          <div v-if="scope.row.settingFlag || showEditor">
            <el-switch v-model="scope.row.value" :active-value=1 :inactive-value=0 v-if="isBool(scope.row.value)" />
            <div v-else>
              <el-input v-model="scope.row.value" v-if="(scope.row.value || '').length > 50" type="textarea" :rows="3" />
              <el-input-number v-model="scope.row.value" :min="1" :max="100" 
                v-else-if="scope.row.value > 1 && scope.row.value < 100 && scope.row.type=='integer'"></el-input-number>
              <el-input v-model="scope.row.value" v-else />
            </div>
          </div>
          <div v-else>
            <span>{{ scope.row.value }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="描述">
        <template slot-scope="scope">
          <div v-html="(scope.row.info.desc)"></div>
          类型：{{ scope.row.type }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button v-if="!scope.row.settingFlag && !showEditor"
            @click="handleRowEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button v-else @click="Save(scope.$index, scope.row)">保存</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<style scoped>
.el-table .cell {
  line-height: 36px;
}
</style>
<script>
import { parse } from "@/utils/marked"
import { get_setting, set_setting } from '@/api/setting'
let Type = "";
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
    parseMark(value) {
      return parse(value)
    },
    formatDate(value, formatString = 'YYYY-MM-DD HH:mm:ss') {
      if (!value) return '';
      const date = new Date(value);
      return moment(date).format(formatString);
    }
  },
  data() {
    return {
      showEditor: true,
      tabRowIndex: null,
      list: null,
      listLoading: false,
    }
  },
  created() {
    this.fetchData()
  },
  mounted() {
  },
  beforeRouteEnter(to, from, next) {
    Type = to.path.split('/')[2]
    next()
  },
  methods: {
    isBool(val) {
      return ((val == 0 || val == 1) && (typeof val === "boolean" || typeof val === "number")) ? true : false
    },
    handleRowEdit(index, row) {
      if (this.isBool(row.value)) {
        row.value = (row.value > 0 && row.value == 1) ? true : false
      }
      this.$set(row, "settingFlag", true)
    },
    Save(index, row) {
      this.$set(row, "settingFlag", false)
      set_setting({
        key: row.key,
        value: row.value,
      }).then(response => {
        console.log(response.msg)
        this.$message({ message: response.msg, type: 'success' });
      })
    },
    /**
     * 获取数据
     */
    fetchData() {
      this.listLoading = true
      get_setting(Type).then(response => {
        this.list = response.data.items
        for (let index in this.list) {
          try {
            this.list[index].info.desc = parse(this.list[index].info.desc || "")
          } catch (e) { }
        }
        this.listLoading = false
      })
    }
  }
}
</script>