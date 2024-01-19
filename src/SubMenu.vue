<template>
  <div>
    <div v-for="menu in menus" :key="menu.name">
      <el-submenu
        v-if="menu.children && menu.children.length"
        :index="menu.name"
      >
        <template slot="title">
          <i v-if="menu.meta.icon" :class="['menu-icon', menu.meta.icon]"></i>
          <span>{{ menu.meta.title }}</span>
        </template>

        <sub-menu :menus="menu.children" />
      </el-submenu>

      <el-menu-item v-else :index="menu.name">
        {{ menu.meta.title }}
      </el-menu-item>
    </div>
  </div>
</template>

<script>
export default {
  name: "SubMenu",

  props: {
    menus: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style lang="scss" scoped>
.menu-icon {
  color: #fff;
}
</style>
