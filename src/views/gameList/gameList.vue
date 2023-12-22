<template>
  <view>
    <GameHeader active-title="游戏列表" />
    <u-tabs
      style="background: #fff"
      @change="tabChange"
      :list="gameList"
      lineWidth="50"
      lineColor="#C2611C"
      :keyName="'countryName'"
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
    <view v-if="gameList.length">
      <TabNav
        v-for="g in gameList[uTabsIndex].games"
        :title="g.name"
        :path="g.code"
        :img="img"
        :key="g.gameId"
        @onSelect="onGameSelect(g)"
      />
    </view>
  </view>
</template>

<script setup lang="ts">
import TabNav from "@/components/tabnav/index.vue";
import GameHeader from "@/components/game/gameHeader.vue";
import {onBeforeMount, onMounted, ref} from "vue";
import {get} from "@/api";
import {disposeUrl} from "@/utils/tools";
const uTabsIndex = ref<number>(0);
const tabChange = (e: any) => (uTabsIndex.value = e.index);
const gameList = ref([]);
const img='https://lanhu-dds-backend.oss-cn-beijing.aliyuncs.com/merge_image/imgs/dd822cb9ec924c43a774b56f655f0c86_mergeImage.png'
const onGameSelect = (data:any) => {
  switch (uTabsIndex.value) {
    case 0:
      return router('vietnameseLottery',data)
    case 1:
      return router('thailandLottery',data)
    default:
      return router('philippinesLottery',data)
  }
};
const router = (url:string,data:any) => {
  uni.navigateTo({
    url: `/views/game/${disposeUrl(url,data)}`,
    animationType: "pop-in",
    animationDuration: 300,
  });
}
onBeforeMount(() => {
  get({
    url:'/gameRecords/game'+'\\'+1
  }).then(v=>{
    gameList.value=v.resultSet
  })
});
</script>

<style lang="less" scoped>
body {
  background: #f9f9f9;
}
</style>
