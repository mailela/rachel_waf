<template>
  <div :class="{ 'has-logo': showLogo }">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu :default-active="activeMenu" :collapse="isCollapse" :background-color="variables.menuBg"
        :text-color="variables.menuText" :unique-opened="false" :active-text-color="variables.menuActiveText"
        :collapse-transition="false" mode="vertical">
        <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'
import store from "@/store"
export default {
  components: { SidebarItem, Logo },
  data() {
    return {
      menus: this.$router.options.routes
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'name',
      'role_name',
    ]),
    routes() {
      this.fix_menu()
      return this.menus;
    },
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  methods: {
    is_in_menu(path,parent) {
      let items = store.getters.menus;
      if(items===""){
        return true;
      }
      path=((parent||"")+"/"+path).replace(/(\/\/)/g,"/");
      // console.log("----------------",path)
      for (let i in items) {
        // console.log(items[i])
        if (path === items[i]) {
          return true;
        }
      }
      return false;
    },
    fix_menu() {
      for (let i in this.menus) {
        let item = this.menus[i];
        if (item.children) {
          for (let j in item.children) {
            if (!this.is_in_menu(item.children[j].path,item.path)) {
              this.menus[i].children[j].hidden = true;
            }
          }
        } else {
          if (!this.is_in_menu(item.path)) {
            this.menus[i].hidden = true;
          }
        }
      }
    }
  }
}
</script>
