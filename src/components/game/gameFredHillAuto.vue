<template>
  <view
    class="headerFred"
    :style="{ backgroundImage: 'url(' + props.urls + ')' }"
  >
    <view class="headerFredTitle"> Fred Hill </view>
    <gameTab
      :backActive="props.backActive"
      @handleActives="handleActives"
      :countId="countId"
      :typeTab="props.TabData"
    />
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";
import gameTab from "./gameTab.vue";

import { useCommon } from "@/plugins/pinia/common.pinia";
const props = defineProps(["urls", "TabData", "backActive"]);
const emits = defineEmits(["handleId"]);
const countId = ref(1);
const storeCommon = useCommon();
const handleActives = (id: number) => {
  countId.value = id;
  emits("handleId", id);
};
</script>

<style scoped lang="scss">
.headerFredTitle {
  font-size: 22px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: #ffffff;
  margin-top: 30rpx;
  padding-left: 20rpx;
}

.headerFred {
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  background-size: cover;
  //background-size: 100% 100%;
  background-repeat: no-repeat;
}
</style>
