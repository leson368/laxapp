<template>
  <div :class="{ layout: true }">
    <div
      :class="{
        'full-height': true,
        normal: true,
        pdh: header.show,
      }"
    >
      <div
        v-if="header.show"
        class="layout-top"
        :style="header.style ? header.style : {}"
      ></div>
      <div class="layout-middle full-height">
        <sider-bar
          v-if="sider.show"
          :default-active="defaultActive"
          :text-color="sider.textColor"
          :active-background-color="sider.activeBackgroundColor"
          :active-text-color="sider.defaultActive"
          :background-color="sider.backgroundColor"
          :styles="sider.style"
        />

        <div :class="['layout-middle-right', 'full-height']">
          <div
            :class="[
              'layout-main',
              header.show && 'layout-mh',
              sider.show && 'layout-ms',
              footer.show && 'layout-mf',
            ]"
          >
            <router-view />
          </div>

          <div
            v-if="footer.show"
            class="layout-footer"
            :style="footer.style ? footer.style : {}"
          ></div>
        </div>
      </div>
    </div>

    <!-- <router-view v-else /> -->
  </div>
</template>

<script>
import SiderBar from "./SiderBar";
import { layout } from "./router";
// import { layout } from "@/page.json";
// import LaxApp from "./index";

export default {
  name: "Layout",
  components: {
    SiderBar,
  },

  data() {
    return {
      ...layout,
      // ...LaxApp.page.layout,

      defaultActive: "",
    };
  },

  watch: {
    $route: {
      handler() {
        if (this.controlable) this.control();
        this.showActive();
      },
    },
  },

  created() {
    if (this.controlable) this.control();
    let gap = "0px",
      headerHeight = "40px",
      footerHeight = "40px";
    if (this.gap) gap = this.gap;
    if (this.header.style?.height) headerHeight = this.header.style.height;
    if (this.footer.style?.height) footerHeight = this.footer.style.height;
    const dom = document.documentElement;
    dom.style.setProperty("--layout-gap", gap);
    dom.style.setProperty("--layout-header", headerHeight);
    dom.style.setProperty("--layout-footer", footerHeight);
  },

  mounted() {
    this.showActive();
  },

  methods: {
    showActive() {
      if (this.sider.show) {
        let route = this.$route;
        this.defaultActive = route.name;
      }
    },

    control() {
      const pathname = window.location.pathname;
      if (pathname.startsWith(this.controlPath)) {
        this.controlSet.forEach((item) => {
          this[item].show = true;
        });
      } else {
        this.controlSet.forEach((item) => {
          this[item].show = false;
        });
      }
    },
    handleOpen() {},
    handleClose() {},
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.layout {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  // padding: var(--layout-gap);

  .normal {
    box-sizing: border-box;
  }

  .pdh {
    padding-top: var(--layout-header);
  }

  .layout-top {
    width: 100%;
    height: var(--layout-header);
    background-color: #f25618;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
  }

  .layout-middle {
    display: flex;
    position: relative;
  }

  .full-height {
    height: 100%;
  }

  .layout-middle-right {
    flex: 1;
    position: relative;
  }
  .layout-main {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    overflow: auto;
  }

  .layout-mh {
    &.layout-ms {
      margin-top: var(--layout-gap);
      margin-left: var(--layout-gap);
      width: calc(100% - var(--layout-gap));
      height: calc(100% - var(--layout-gap));

      &.layout-mf {
        width: calc(100% - var(--layout-gap) * 2);
        height: calc(100% - var(--layout-footer) - var(--layout-gap) * 2);
      }
    }
  }

  .layout-ms {
    &.layout-mf {
      margin-bottom: var(--layout-gap);
      margin-left: var(--layout-gap);
      width: calc(100% - var(--layout-gap));
      height: calc(100% - var(--layout-footer) - var(--layout-gap));
    }
  }

  .layout-mf {
    height: calc(100% - var(--layout-footer));
  }

  .layout-footer {
    width: 100%;
    height: var(--layout-footer);
    background-color: aqua;
    position: absolute;
    right: 0;
    bottom: 0;
  }
}
</style>
