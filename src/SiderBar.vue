<template>
  <div ref="siderMenu" class="layout-sider" :style="styles">
    <el-menu
      class="sider-menu"
      :default-active="defaultActive"
      :text-color="textColor"
      :active-text-color="activeTextColor"
      unique-opened
      @select="handleSelect"
    >
      <sub-menu :menus="asyncRoutes" />
    </el-menu>
  </div>
</template>

<script>
import SubMenu from "./SubMenu";
import { asyncRoutes } from "./router";

export default {
  name: "SiderBar",
  components: {
    SubMenu,
  },

  props: {
    menus: {
      type: Array,
      default: () => [],
    },

    styles: {
      type: Object,
      default: () => {},
    },

    defaultActive: {
      type: String,
      default: "",
    },

    textColor: {
      type: String,
      default: "",
    },

    backgroundColor: {
      type: String,
      default: "",
    },

    activeBackgroundColor: {
      type: String,
      default: "",
    },

    activeTextColor: {
      type: String,
      default: "",
    },
  },

  data() {
    return {
      asyncRoutes,
    };
  },

  mounted() {
    const dom = this.$refs.siderMenu;
    dom.style.setProperty("--bg-color", this.backgroundColor);
    dom.style.setProperty("--active-color", this.activeBackgroundColor);
  },

  methods: {
    handleSelect(index, paths) {
      this.$router.push({ name: index }).catch((err) => console.log(err));
    },
  },
};
</script>

<style lang="scss" scoped>
.layout-sider {
  width: 12.5%;
  min-width: $sider-width;
  height: 100%;
  box-sizing: border-box;
  z-index: 999;
}

.sider-menu {
  height: 100%;
  overflow: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;
  background: var(--bg-color);
  border-right: 0;
  &::-webkit-scrollbar {
    display: none; /* Chrome Safari */
  }

  ::v-deep {
    .el-menu-item:hover,
    .el-submenu__title:hover {
      background-color: var(--active-color);
    }

    .el-menu {
      background-color: transparent;
    }

    .el-menu-item.is-active {
      background-color: var(--active-color);
    }
  }
}
</style>
