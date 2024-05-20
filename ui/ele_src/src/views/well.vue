<template>
  <div class="wscn-well-container">
    <div class="wscn-well">
      <div class="pic-well">
        <img class="pic-well__parent" src="@/assets/img/logo.svg" alt="well" />
        <img class="pic-well__child left" src="@/assets/images/cloud.png" />
        <img class="pic-well__child mid" src="@/assets/images/cloud.png" />
        <img class="pic-well__child right" src="@/assets/images/cloud.png" />
      </div>
      <div class="bullshit">
        <div class="bullshit__oops">
          Rachel WAF!{{ version }}
          <el-badge
            v-if="version != n_version && !isUpdating"
            :value="
              is_gov ? '官方[' + n_version + ']' : '私有[' + n_version + ']'
            "
            class="item"
          >
            <el-button size="small" @click="UpdateSystem">升级</el-button>
          </el-badge>
        </div>
        <div class="bullshit__info">
          {{ message }}
        </div>
        <div class="bullshit__info">
          <ul>
            <li>数据库注入(sql injection)</li>
            <li>文件上传(upload)</li>
            <li>上传类型过滤</li>
            <li>文件包含(lfi)</li>
            <li>flag关键字</li>
            <li>PHP反序列化(unserialize)</li>
            <li>命令执行(rce)</li>
            <li>分布式拒绝服务攻击(ddos)</li>
            <li>请求头,请求参数(GET/POST)关键字</li>
            <li>特殊字符</li>
            <li>IP白名单</li>
            <li>IP黑名单</li>
          </ul>
        </div>
        <a href="#/dashboard" class="bullshit__return-home">开始</a>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { mapGetters } from "vuex";
import { update } from "@/api/system";
export default {
  name: "Welcome",
  data() {
    return {
      isUpdating: false,
    };
  },
  methods: {
    UpdateSystem() {
      this.isUpdating = true;
      update().then((res) => {
        this.$message({ message: res.msg, type: res.msg_type });
        this.isUpdating = false;
      });
    },
  },
  computed: {
    ...mapGetters(["name", "n_version", "is_gov", "version"]),
    message() {
      return "是一个专门为AWD而生的PHP防火墙,采用PHP+JS+CSS编写而成,单文件设计模式,无任何外部依赖,其特点有将原始请求包拼凑出来而实现的内网转发,基于putenv和ld_preload的命令执行保护,一个漂亮的前端以及流量重放功能.";
    },
  },
};
</script>

<style lang="scss" scoped>
@media screen and (max-width: 720px) {
  .wscn-well-container {
    transform: none !important;
    top: 10% !important;
    left: 0 !important;

    .pic-well {
      display: none !important;
    }

    .wscn-well {
      width: 100% !important;
    }
  }
}

.wscn-well-container {
  transform: translate(-50%, -50%);
  position: absolute;
  top: 40%;
  left: 50%;
}

.wscn-well {
  position: relative;
  width: 1200px;
  padding: 0 50px;
  overflow: hidden;

  .pic-well {
    position: relative;
    float: left;
    width: 600px;
    overflow: hidden;

    &__parent {
      width: 100%;
    }

    &__child {
      position: absolute;

      &.left {
        width: 80px;
        top: 37px;
        left: 220px;
        opacity: 0;
        animation-name: cloudLeft;
        animation-duration: 2s;
        animation-timing-function: linear;
        animation-fill-mode: forwards;
        animation-delay: 1s;
      }

      &.mid {
        width: 46px;
        top: 10px;
        left: 420px;
        opacity: 0;
        animation-name: cloudMid;
        animation-duration: 2s;
        animation-timing-function: linear;
        animation-fill-mode: forwards;
        animation-delay: 1.2s;
      }

      &.right {
        width: 62px;
        top: 100px;
        left: 500px;
        opacity: 0;
        animation-name: cloudRight;
        animation-duration: 2s;
        animation-timing-function: linear;
        animation-fill-mode: forwards;
        animation-delay: 1s;
      }

      @keyframes cloudLeft {
        0% {
          top: 17px;
          left: 220px;
          opacity: 0;
        }

        20% {
          top: 33px;
          left: 188px;
          opacity: 1;
        }

        80% {
          top: 81px;
          left: 92px;
          opacity: 1;
        }

        100% {
          top: 97px;
          left: 60px;
          opacity: 0;
        }
      }

      @keyframes cloudMid {
        0% {
          top: 10px;
          left: 420px;
          opacity: 0;
        }

        20% {
          top: 40px;
          left: 360px;
          opacity: 1;
        }

        70% {
          top: 130px;
          left: 180px;
          opacity: 1;
        }

        100% {
          top: 160px;
          left: 120px;
          opacity: 0;
        }
      }

      @keyframes cloudRight {
        0% {
          top: 100px;
          left: 500px;
          opacity: 0;
        }

        20% {
          top: 120px;
          left: 460px;
          opacity: 1;
        }

        80% {
          top: 180px;
          left: 340px;
          opacity: 1;
        }

        100% {
          top: 200px;
          left: 300px;
          opacity: 0;
        }
      }
    }
  }

  .bullshit {
    position: relative;
    float: left;
    width: 300px;
    padding: 30px 0;
    overflow: hidden;

    &__oops {
      font-size: 32px;
      font-weight: bold;
      line-height: 40px;
      color: #1482f0;
      opacity: 0;
      margin-bottom: 20px;
      animation-name: slideUp;
      animation-duration: 0.5s;
      animation-fill-mode: forwards;
    }

    &__headline {
      font-size: 20px;
      line-height: 24px;
      color: #222;
      font-weight: bold;
      opacity: 0;
      margin-bottom: 10px;
      animation-name: slideUp;
      animation-duration: 0.5s;
      animation-delay: 0.1s;
      animation-fill-mode: forwards;
    }

    &__info {
      font-size: 13px;
      line-height: 21px;
      color: grey;
      opacity: 0;
      margin-bottom: 30px;
      animation-name: slideUp;
      animation-duration: 0.5s;
      animation-delay: 0.2s;
      animation-fill-mode: forwards;
    }

    &__return-home {
      display: block;
      margin-left: 1rem;
      float: left;
      width: 110px;
      height: 36px;
      background: #1482f0;
      border-radius: 100px;
      text-align: center;
      color: #ffffff;
      opacity: 0;
      font-size: 14px;
      line-height: 36px;
      cursor: pointer;
      animation-name: slideUp;
      animation-duration: 0.5s;
      animation-delay: 0.3s;
      animation-fill-mode: forwards;
    }

    @keyframes slideUp {
      0% {
        transform: translateY(60px);
        opacity: 0;
      }

      100% {
        transform: translateY(0);
        opacity: 1;
      }
    }
  }
}
</style>
