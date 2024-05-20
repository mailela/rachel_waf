<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { MessageBox, Message } from "element-ui";
import { update } from '@/api/system'
import cookie from '@/utils/cookie'
export default {
  name: 'App'
  ,
  data: function () {
    return {
      isUpdating: false,
    }
  },
  computed: {
    ...mapGetters([
      'version',
      'is_gov',
      'n_version',
    ]),
  },
  created: function () {
    this.info();

  },
  mounted: function () {
  },
  methods: {
    info: function () {
      this.$store.dispatch('user/system_info').then(res => {
        if (res.data.first) {
          this.$router.push("/init")
        }
        if (this.version != this.n_version) {
          if(cookie.get("update") == "no"){
            return;
          }
          MessageBox.confirm(
            "发现新版本，是否更新？",
            "版本更新",
            {
              confirmButtonText: "开始更新",
              cancelButtonText: "暂不更新",
              type: "success",
            }
          ).then(() => {
            update().then(res => {
              this.$message({ message: res.msg, type: res.msg_type })
            })
            console.log("开始更新")
          }).catch(() => {
            cookie.set("update", "no",1);
          });
        }
      });
    }
  }
}
</script>
