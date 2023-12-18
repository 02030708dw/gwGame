<template>
  <view class="headerTab">
    <view
      class="headerLabel"
      @click="handleContrys(item)"
      v-for="(item, index) in props.typeTab"
      :key="index"
    >
      <text>
        {{ item.label }}
      </text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { useCommon } from "@/plugins/pinia/common.pinia";

const storeCommon = useCommon();
const props = defineProps(["typeTab"]);
const emits = defineEmits(["handleContry"]);
const handleContrys = (item: any) => {
  console.log("9999-----", item);
  storeCommon.setTabData(item.id);
  // emits('handleContry', item)
};
</script>

<style scoped lang="scss">
.headerTab {
  position: relative;
  display: flex;
  flex-direction: column;
  padding-bottom: 34rpx;
  width: 688rpx;
  flex-direction: row;
  display: flex;
  justify-content: space-between;
}

.headerLabel {
  background-color: rgba(252, 239, 213, 1);
  border-radius: 16rpx;
  display: flex;
  flex-direction: column;
  padding: 12rpx 48rpx 12rpx 48rpx;

  text {
    overflow-wrap: break-word;
    color: rgba(51, 51, 51, 1);
    font-size: 32rpx;
    font-family: PingFangSC-Semibold;
    font-weight: 600;
    text-align: center;
    white-space: nowrap;
    line-height: 44rpx;
  }
}
</style>
