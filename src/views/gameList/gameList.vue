<template>
  <view>
    <GameHeader active-title="游戏列表" :showContent="false"/>
    <u-tabs
      style="background: #fff"
      @change="tabChange"
      :list="gameList"
      lineWidth="28"
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
      itemStyle="height: 100rpx;"
    ></u-tabs>
    <view v-if="gameList.length">
      <TabNav
        v-for="g in gameList[uTabsIndex].games"
        :title="g.name"
        :path="g.code"
        :img="filterImg(uTabsIndex)"
        :key="g.gameId"
        @onSelect="onGameSelect(g,gameList[uTabsIndex].countryName)"
      />
    </view>
  </view>
</template>
<script setup lang="ts">
import th from '@/static/images/th.png';
import ph from '@/static/images/ph.png';
import vnd from '@/static/images/vnd.png';
import TabNav from "@/components/tabnav/index.vue";
import GameHeader from "@/components/game/gameHeader.vue";
import {onBeforeMount,ref} from "vue";
import {get, post, UrlType} from "@/api";
import {disposeUrl} from "@/utils/tools";
import {setStorage} from "@/utils/storage";
import gameListStore from "@/plugins/pinia/gameList";
import {storeToRefs} from "pinia";
const uTabsIndex = ref<number>(0);
const tabChange = (e: any) => (uTabsIndex.value = e.index)
const {getList,getBalance}=gameListStore()
const {gameList}=storeToRefs(gameListStore())
const onGameSelect = (data:any,countryName:string) => {
  switch (uTabsIndex.value) {
    case 0:
      return router('vietnameseLottery',{...data,countryName})
    case 1:
      return router('thailandLottery',{...data,countryName})
    default:
      return router('philippinesLottery',{...data,countryName})
  }
};
const router = (url:string,data:any) => {
  uni.navigateTo({
    url: `/views/game/${disposeUrl(url,data)}`,
    animationType: "pop-in",
    animationDuration: 300,
  });
}
onBeforeMount(async () => {
  try {
    let r=await post({
      url:'/api/login',
      data:{
        "merchantCode": "test",
        "plantformId": 1,
        "token": "test"
      }
    },UrlType.info,true)
    setStorage('token',r.resultSet.accessToken)
    await getList()
    await getBalance()
  }catch (e) {
    console.log(e)
  }
});
const filterImg = (n:number) => !n?vnd:n===1?th:ph
</script>
<style lang="less" scoped>
</style>