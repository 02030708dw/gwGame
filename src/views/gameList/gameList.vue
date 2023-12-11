<template>
  <view>
    <gameHeader active-title="游戏列表"/>
    <u-tabs @change="tabChange"
            :list="gameList"  lineWidth="50"
            lineColor="#C2611C"
            :scrollable="false"
            :activeStyle="{
            color: '#303133',
            fontWeight: 'bold',
            transform: 'scale(1.05)'
        }"
            :inactiveStyle="{
            color: '#606266',
            transform: 'scale(1)'
        }"
            itemStyle="padding-left: 15px; padding-right: 15px; height: 54px;"></u-tabs>
    <view>
        <tabNav v-for="g in gameListSub[uTabsIndex]" :title="g.title" :path="g.path" :img="g.img" @onSelect="onGameSelect"/>
    </view>
  </view>
</template>

<script setup lang="ts">
import TabNav from '@/components/tabnav/index.vue'
import GameHeader from "@/components/game/gameHeader.vue";
import {onMounted, ref} from "vue";
const uTabsIndex=ref<number>(0)
const tabChange = (e:any) => uTabsIndex.value=e.index
const gameList = ref([{
  name: '泰国彩',
}, {
  name: '越南彩',
}, {
  name: '菲律宾彩',
}])
const gameListSub=[
    [
      {
        title:'泰国彩1',
        img:'src1',
        path:'thailandLottery'
      },
      {
        title:'泰国彩2',
        img:'src1',
        path: 'thailandLottery'
      }
    ],
  [
    {
      title:'越南彩666',
      img:'src1',
      path:'vietnameseLottery'
    },
  ],
  [
    {
      title:'菲律宾彩1',
      img:'src1',
      path:'philippinesLottery'
    },
  ]
]
const onGameSelect = (d:any) => {
  if (d.path==='') return  uni.showToast({icon:'error',title:'暂无游戏'})
  uni.navigateTo({
    url:`/views/game/${d.path}`,
    animationType: 'pop-in',
    animationDuration: 300
  })
}
onMounted(()=>{

})
</script>

<style lang="less" scoped>

</style>
