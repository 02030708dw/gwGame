<template>
  <Layout>
    <template #top>
      <GameHeader :showContent="false" activeTitle="越南彩" />
    </template>
    <GameHeaderTab :typeTab="typeTab" />
    <GameContent />
    <GameTime />

    <!-- 选择1d 2d PL1 PL2 -->
    <GameType :typeList="TabDataYueNan" @cutGameType="cutGameType" />

    <!-- 1D 里的第一个fred -->
    <FredHilloneD1
      :fredList="TabDataTwoYueNan1D"
      :background-image="urls1"
      @change="changeFredHilloneD1"
      :row="3"
      :itemWidth="'198rpx'"
      v-if="playingMethod == 0"
    />

    <!-- 1D 里的第二个fred -->
    <FredHilloneD2
      :fredList="TabDataTwo"
      :background-image="urls2"
      @change="changeFredHilloneD2"
      :row="5"
      :itemWidth="'114rpx'"
      v-if="playingMethod == 0"
    />
    <!-- 2d -->
    <FredHilltwoD1
      :background-image="urls1"
      :showHeader="true"
      @changeThreeNum="changeThreeNum"
      @changeNum="changeNum2D"
      v-if="playingMethod == 1"
    />

    <!-- PL2 -->
    <FredHilltwoD1
      :background-image="urls1"
      :showHeader="false"
      @changeNum="changeNumPL2"
      v-if="playingMethod == 2"
    />

    <!-- PL3 -->
    <FredHilltwoD1
      @changeNum="changeNumPL3"
      v-if="playingMethod == 3"
      :background-image="urls1"
      :showHeader="false"
    />

    <template #bot>
      <GameFooter />
    </template>
  </Layout>
  <popup />

</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
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

const typeTab = reactive([
  { label: "动画", id: 1 },
  { label: "直播", id: 2 },
  { label: "视频", id: 3 },
  { label: "新闻", id: 4 },
]);

let urls1 = ref("src/static/images/fredHill1.png");
let urls2 = ref("src/static/images/fredHill2.png");
let urls3 = ref("src/static/images/fredHill3M.png");

const storeCommon = useCommon();
const { TabDataYueNan, TabDataTwo, TabDataTwoYueNan1D } =
  storeToRefs(storeCommon);

const playingMethod = ref(0); //用来展示不同玩法
// 玩法切换------------------------------------------------玩法切换
const cutGameType = ({ id }: any) => {
  // 当1D,2D,PL2,PL3切换时触发,传过来的是点击这一项的数据
  TabDataYueNan.value.forEach((item) => (item.checked = false));
  TabDataYueNan.value[id].checked = true; //选中
  console.log("当前选中的是" + TabDataYueNan.value[id].label);
  TabDataTwo.value.forEach((item) => (item.checked = false)); //切换后清空上一次的选择
  playingMethod.value = id; //切换玩法
};

// 1d-----------------------------------------------------1d
const changeFredHilloneD1 = (item: any) => {
  // 切换头尾包组时触发,传过来的是点击这一项的数据
  console.log("当前选中的是:" + item.label);
};
const changeFredHilloneD2 = (item: any) => {
  // 选择0-9的号码触发
  item.checked = !item.checked;
  // 选中的id
  let arr = TabDataTwo.value
    .filter((item) => item.checked)
    .map((item) => item.id);
  console.log("当前选中的有", arr);
};

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
