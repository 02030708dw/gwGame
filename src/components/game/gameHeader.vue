<template>
  <view class="headerStyle">
    <view class="headerMore" @click="handleCountry">
      <image class="headerMoreimage" src="@/static/images/more.png" />
    </view>
    <view class="headerTitle" v-if="activeTitle === '游戏列表'">
      <view class="headerText">
        {{ activeTitle }}
      </view>
    </view>
    <view v-else class="headerTitle" @click="handleTopCountry">
      <image
        class="headerImg"
        src="@/static/images/heart.png"
        alt=""
        srcset=""
      />
      <view class="headerText">
        {{ activeTitle }}
      </view>
      <image
        v-if="showContent"
        class="headerImg"
        :src="topShow ? closeImg : openImg"
        alt=""
        srcset=""
      />
    </view>
    <router-link :to="{ path:`/views/gameList/gameList`}">
     <view class="headerMore">
      <image class="headerMoreimage" src="@/static/images/home.png" alt="" srcset="" />
	 </view>
	</router-link>
  </view>
  <u-popup :show="show" mode="left" @close="close" @open="open">
    <view class="poupLeft">
      <view
        class="poupLeftText"
        v-for="l in headers.sliderLists"
        :key="l.id"
        @click="onSlideClick(l.path)"
        >{{ l.title }}</view
      >
    </view>
  </u-popup>
  <u-popup
    v-if="showContent"
    :show="topShow"
    :round="20"
    mode="top"
    @close="TopClose"
    @open="TopOpen"
  >
    <view class="poupTOP">
      <view
        class="poupLeftText"
        :class="l.title === activeTitle ? 'active' : ''"
        v-for="l in headers.topLists"
        :key="l.id"
        @click="onTopClick(l.path)"
        >{{ l.title }}</view
      >
    </view>
  </u-popup>
  <u-action-sheet
    @close="handleClose"
    @select="handleSelect"
    :actions="countryList"
    :title="countryTitle"
    :show="countryShow"
  ></u-action-sheet>
</template>

<script setup lang="ts">
import openImg from "@/static/images/selects.png";
import closeImg from "@/static/images/selectsTop.png";
import { useCommon } from "@/plugins/pinia/common.pinia";
import { ref } from "vue";
import { headers } from "@/constants";

const props = defineProps<{
  activeTitle: string;
  showContent?: boolean; // 添加 showContent prop
}>();
const emits = defineEmits(["handleContry"]);

const countryTitle = ref("Select a country");
const countryShow = ref(false);
const countryList = ref([
  {
    name: "Japan",
    id: 1,
  },
  {
    name: "Malaysia",
    id: 2,
  },
]);
const show = ref(false);
const close = () => {
  show.value = false;
};
const open = () => {};
const topShow = ref(false);
const TopClose = () => {
  topShow.value = false;
};
const TopOpen = () => {};
const handleTopCountry = () => {
  topShow.value = !topShow.value;
  show.value = false;
};
const handleCountry = () => {
  topShow.value = false;
  show.value = !show.value;
};
const handleClose = () => {
  countryShow.value = false;
};
const onSlideClick = (p: string) => {
  if (p === "gameList") {
    uni.redirectTo({
      url: `/views/gameList/${p}`,
    });
  } else {
    uni.redirectTo({
      url: `/views/game/${p}`,
    });
  }
  show.value = false;
};
const onTopClick = (p: string) => {
  if (p === "gameList") {
    uni.redirectTo({
      url: `/views/gameList/${p}`,
    });
  } else {
    uni.redirectTo({
      url: `/views/game/${p}`,
    });
  }
  topShow.value = false;
  show.value = false;
};
const handleSelect = (item: any) => {
  storeCommon.setTabData(item.id);
  handleClose();
};
</script>

<style scoped lang="scss">
.u-popup:deep(.u-slide-down-enter-active) {
  margin-top: 120rpx !important;
}
.poupLeft:deep(.poupLeftText):first-child {
  margin-top: 80rpx !important;
}
.headerStyle {
  position: relative;
  z-index: 999999;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: #333;
  flex-direction: row;
  display: flex;
  justify-content: flex-center;
  padding: 28rpx 32rpx 22rpx 32rpx;
}

.headerTitle {
  font-size: 32rpx;
  color: #fff;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.headerText {
  margin: 0 10rpx;
}

.poupLeft {
  height: 100vh;
  background-color: #333;
}

.poupTOP {
  height: 25vh;
  background-color: #333;
}

.poupLeftText {
  color: #fff;
  padding: 35rpx 60rpx;
  text-align: center;
  border-top: 1px solid #555;
}

.poupTOP .poupLeftText {
  text-align: center;
  &.active {
    color: red;
  }
}

.headerImg {
  width: 30rpx;
  height: 30rpx;
}

.headerMore {
  display: flex;
  width: 40rpx;
  height: 40rpx;
}

.headerMoreimage {
  display: flex;
  width: 100%;
  height: 100%;
}
</style>