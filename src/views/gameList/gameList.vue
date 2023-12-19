<template>
  <view>
    <GameHeader active-title="游戏列表" />
    <u-tabs
      style="background: #fff"
      @change="tabChange"
      :list="gameList"
      lineWidth="50"
      lineColor="#C2611C"
      :scrollable="false"
      :activeStyle="{
        color: '#303133',
        fontWeight: 'bold',
        transform: 'scale(1.05)',
      }"
      :inactiveStyle="{
        color: '#606266',
        transform: 'scale(1)',
      }"
      itemStyle="padding-left: 15px; padding-right: 15px; height: 54px;"
    ></u-tabs>
    <view>
      <TabNav
        v-for="(g, i) in gameListSub[uTabsIndex]"
        :title="g.title"
        :path="g.path"
        :img="g.img"
        :key="i"
        @onSelect="onGameSelect"
      />
    </view>
  </view>
</template>

<script setup lang="ts">
import TabNav from "@/components/tabnav/index.vue";
import GameHeader from "@/components/game/gameHeader.vue";
import { onMounted, ref } from "vue";
const uTabsIndex = ref<number>(0);
const tabChange = (e: any) => (uTabsIndex.value = e.index);
const gameList = ref([
  {
    name: "泰国彩",
  },
  {
    name: "越南彩",
  },
  {
    name: "菲律宾彩",
  },
]);
const gameListSub = [
  [
    {
      title: "泰国彩1",
      img: "https://lanhu-dds-backend.oss-cn-beijing.aliyuncs.com/merge_image/imgs/dd822cb9ec924c43a774b56f655f0c86_mergeImage.png",
      path: "thailandLottery",
    },
    {
      title: "泰国彩2",
      img: "https://lanhu-dds-backend.oss-cn-beijing.aliyuncs.com/merge_image/imgs/dd822cb9ec924c43a774b56f655f0c86_mergeImage.png",
      path: "thailandLottery",
    },
  ],
  [
    {
      title: "越南彩666",
      img: "https://lanhu-dds-backend.oss-cn-beijing.aliyuncs.com/merge_image/imgs/dd822cb9ec924c43a774b56f655f0c86_mergeImage.png",
      path: "vietnameseLottery",
    },
  ],
  [
    {
      title: "菲律宾彩1",
      img: "https://lanhu-dds-backend.oss-cn-beijing.aliyuncs.com/merge_image/imgs/dd822cb9ec924c43a774b56f655f0c86_mergeImage.png",
      path: "philippinesLottery",
    },
  ],
];
const onGameSelect = (d: any) => {
  if (d.path === "") return uni.showToast({ icon: "error", title: "暂无游戏" });
  uni.navigateTo({
    url: `/views/game/${d.path}`,
    animationType: "pop-in",
    animationDuration: 300,
  });
};
onMounted(() => {});
</script>

<style lang="less" scoped>
body {
  background: #f9f9f9;
}
</style>
