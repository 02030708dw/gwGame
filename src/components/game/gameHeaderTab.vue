<template>
  <view class="tabs-container">
    <!-- 标签头 -->
    <view class="headerTab">
      <view
        v-for="(item, index) in typeTab"
        :key="item.id"
        :class="['headerLabel', { active: index === activeIndex && showContent}]"
        @click="changeTab(index)"
      >
        <text>
          {{ item.label }}
        </text>
      </view>
    </view>
    <!-- 标签内容 -->
    <view class="tabs-content">
      <!-- 显示内容，基于activeIndex -->
      <view v-if="activeIndex === 0 && showContent">
        <GameAnimation :ac="ac"/>
      </view>
      <view v-if="activeIndex === 1 && showContent">直播内容</view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";
import GameAnimation from '@/components/game/gameAnimation.vue';

// 标签页数据
const props = defineProps({
  typeTab: Array,
  ac: Object,
});
const emits = defineEmits(["handleContry"]);

// 当前激活的标签页索引
const activeIndex = ref(-1); // 初始设置为-1，表示没有标签被选中
const showContent = ref(false); // 控制内容显示的状态

// 切换标签页
const changeTab = (index: number): void => {
  if (activeIndex.value === index) {
    showContent.value = !showContent.value;
  } else {
    showContent.value = true;
    activeIndex.value = index;
  }
};
</script>

<style scoped lang="scss">
.headerTab {
  // position: relative;
  display: flex;
  padding-bottom: 34rpx;
  flex-direction: row;
  justify-content: space-between;
}

.headerLabel {
  background-color: rgba(252, 239, 213, 1);
  border-radius: 16rpx;
  display: flex;
  flex-direction: column;
  padding: 12rpx 48rpx 12rpx 48rpx;

  &.active {
    background-color: #ffb023;

    text {
      color: #fff;
    }
  }

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

.headerContainer {
  font-family: Arial, sans-serif;
  max-width: 600px;

  table {
    width: 100%;
    border-collapse: collapse;

    th,
    td {
      border: 1px solid #ddd;
      padding: 8px;
      text-align: center;
    }

    th {
      background-color: #f2f2f2;
    }

    tr:nth-child(even) {
      background-color: #f9f9f9;
    }
  }
}
</style>
