<template>
  <div class="dashboard-container">
    <el-card class="box-card" v-for="(item, index) in logsType">
      <div slot="header" class="clearfix">
        <span>{{ item.title }}</span>
        <div style="float: right;"> <el-switch v-model="item.autoFetch" title="自动更新" /></div>
      </div>
      <logger class="logger" :logType="index" :logRefresh="item.autoFetch" />
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logger from "@/layout/components/Logger"
import store from "@/store";
export default {
  name: 'Dashboard',
  components: {
    Logger
  },
  data() {
    return {
      logsType: {
        "web": {
          title: "WEB日志"
          , autoFetch: false
        },
        "attack": {
          title: "攻击日志"
          , autoFetch: false
        },
        "flag": {
          title: "FLAG日志"
          , autoFetch: false
        },
        "flag_eye_to_eye": {
          title: "FLAG监测"
          , autoFetch: false
        },
      }
    }
  },
  created() {
    this.setConfig();
  },
  mounted() {


  },
  computed: {
    ...mapGetters([
      'name',
      'version',
      'config'

    ])
  },
  methods: {
    setConfig() {
      let that = this;
      setTimeout(() => {
        for (let key in that.logsType) {
          that.logsType[key].autoFetch = store.getters.config.log_refresh || false;
        }
      }, 1);
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }

  &-text {
    font-size: 24px;
    line-height: 46px;
  }
}

.el-card {

  @media screen and(min-width:720px) {
    float: left;
    margin: 1rem;
    width: 46%;
  }

  .logger {
    width: 100%;
    overflow-y: scroll;
    height: 260px;
    padding-bottom: 1rem;
  }
}
</style>
