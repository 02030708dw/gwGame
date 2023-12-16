<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "layout",
});
</script>

<template>
  <div class="gameLayout">
    <div class="top">
      <slot name="top" />
    </div>
    <div class="main">
      <slot />
    </div>
    <div class="bot">
      <slot name="bot" />
    </div>
  </div>
</template>

<style scoped lang="less">
.gameLayout {
  display: grid;
  // grid-template-rows: 128rpx 1fr 96rpx;
  .main {
    overflow: auto;
    // height: 100%;
    // width: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 32rpx 30rpx 156rpx 32rpx;
  }
  .top {
    // height: 128rpx;
    // width: 100%;
  }
  .bot {
    height: 96rpx;
    width: 100%;
  }
}
</style>
