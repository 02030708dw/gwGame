<template>
  <Layout>
    <template #top>
      <GameHeader :showContent="false" activeTitle="越南5分彩" />
    </template>
    <GameHeaderTab :typeTab="typeTab" />
    <GameContent />
    <GameTime />

    <!-- 选择2D,3D,PL2,PL3 -->
    <GameType @cutGameType="cutGameType" :typeList="typeList" />

    <!-- 2D----------------------------------- -->
    <SelectMethed
      :fredList="methodList"
      :background-image="urls1"
      :row="3"
      @change="changeSelectMethed"
      v-if="playingMethod == 0"
    />
    <KeyNum
      :background-image="urls1"
      :showHeader="false"
      v-if="playingMethod == 0"
    />

    <!-- 3D------------------------------------- -->
    <SelectMethed
      :fredList="methodList"
      :background-image="urls1"
      :row="3"
      @change="changeSelectMethed"
      v-if="playingMethod == 1"
    />
    <KeyNum
      :background-image="urls1"
      :showHeader="true"
      v-if="playingMethod == 1"
    />

    <!-- PL2--------------------------------------- -->
    <KeyNum
      :background-image="urls1"
      :showHeader="false"
      :astrict="2"
      v-if="playingMethod == 2"
    />

    <!-- PL3 ------------------------------------------->
    <KeyNum
      :background-image="urls1"
      :showHeader="false"
      :astrict="3"
      v-if="playingMethod == 3"
    />
    <template #bot>
      <GameFooter />
    </template>
  </Layout>
  <popup />
</template>

<script lang="ts" setup>
import { reactive, ref, toRefs } from "vue";
import { storeToRefs } from "pinia";
import { useCommon } from "@/plugins/pinia/common.pinia";
import GameHeader from "@/components/game/gameHeader.vue";
import GameTime from "@/components/game/gameTime.vue";
import Layout from "@/layout/index.vue";
import GameHeaderTab from "@/components/game/gameHeaderTab.vue";
import GameContent from "@/components/game/gameContent.vue";
import GameFooter from "@/components/game/gameFooter.vue";
import FredHilloneD1 from "@/views/game/vietnameseLottery/components/FredHilloneD1.vue";
import FredHilloneD2 from "@/views/game/vietnameseLottery/components/FredHilloneD2.vue";
import FredHilltwoD1 from "@/views/game/vietnameseLottery/components/FredHilltwoD1.vue";
import GameType from "@/views/game/vietnameseLottery/components/GameType.vue";
import popup from "@/components/game/popup/popup.vue";

import SelectMethed from "@/views/game/vietnameseLottery/components/SelectMethed.vue";
import KeyNum from "@/views/game/vietnameseLottery/components/KeyNum.vue";
import { usethreeMinute } from "./pinia/threeMinute";
const storethreeMinute = usethreeMinute();
const { typeList, methodList } = storeToRefs(storethreeMinute);
const typeTab = reactive([
  { label: "动画", id: 1 },
  { label: "直播", id: 2 },
  { label: "视频", id: 3 },
  { label: "新闻", id: 4 },
]);

let urls1 = ref("src/static/images/fredHill1.png");
let urls2 = ref("src/static/images/fredHill2.png");
let urls3 = ref("src/static/images/fredHill3M.png");

const playingMethod = ref(0); //用来展示不同玩法

// 类型切换------------------------------------
const cutGameType = (item: any) => {
  // 每次切换类型时,取消游戏玩法的选中
  methodList.value.forEach(item=>item.checked=false)
  playingMethod.value = item.id;
};

// 玩法选中
const changeSelectMethed = (item: any) => {
  let arr= methodList.value.filter(item=>item.checked)
  console.log("当前选中的玩法有",arr)
};
// 2d-----------------------------------------------------2d
// const changeFredHilloneD1 = (item: any) => {
//   // 切换头尾包组时触发,传过来的是点击这一项的数据
//   console.log("当前选中的是:" + item.label);
// };
// const changeFredHilloneD2 = (item: any) => {
//   // 选择0-9的号码触发
//   item.checked = !item.checked;
//   // 选中的id
//   let arr = TabDataTwo.value
//     .filter((item) => item.checked)
//     .map((item) => item.id);
//   console.log("当前选中的有", arr);
// };

// 2d---------------------------------------2d
const changeThreeNum = (item: any) => {
  // 2d里的 000-900
  console.log("当前选中的是", item.label);
};
const changeNum2D = (arr: any) => {
  // 点击2d下面的数字触发
  console.log("2D选中的号码是" + arr);
};

// PL2----------------------------------PL2
const changeNumPL2 = (arr: any) => {
  console.log("PL2选中的号码是", arr);
};

// PL3----------------------------------PL3
const changeNumPL3 = (arr: Array<number>) => {
  console.log("PL3选中的号码是", arr);
};
</script>
