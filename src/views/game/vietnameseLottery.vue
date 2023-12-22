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
      :background-image="urls1"
      :row="3"
      @change="changeSelectMethed"
      v-show="playingMethod == 0"
    />
    <KeyNum
      :background-image="urls1"
      :showHeader="false"
      @changeNum="changeNum2D"
      v-show="playingMethod == 0"
      :unlock="twoD.length"
    />

    <!-- 3D------------------------------------- -->
    <SelectMethed
      :background-image="urls1"
      :row="3"
      @change="changeSelectMethed"
      v-show="playingMethod == 1"
    />
    <KeyNum
      :background-image="urls1"
      :showHeader="true"
      @changeNum="changeNum3D"
      v-show="playingMethod == 1"
      :unlock="threeD.length"
    />

    <!-- PL2--------------------------------------- -->
    <KeyNum
      :background-image="urls1"
      :showHeader="false"
      :astrict="2"
      @changeNum="changeNumPL2"
      v-show="playingMethod == 2"
      :unlock="true"
    />

    <!-- PL3 ------------------------------------------->
    <KeyNum
      :background-image="urls1"
      :showHeader="false"
      :astrict="3"
      @changeNum="changeNumPL3"
      v-show="playingMethod == 3"
      :unlock="true"
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
import GameHeader from "@/components/game/gameHeader.vue";
import GameTime from "@/components/game/gameTime.vue";
import Layout from "@/layout/index.vue";
import GameHeaderTab from "@/components/game/gameHeaderTab.vue";
import GameContent from "@/components/game/gameContent.vue";
import GameFooter from "@/components/game/gameFooter.vue";
import popup from "@/components/game/popup/popup.vue";

import GameType from "@/components/game/YN/GameType.vue";
import SelectMethed from "@/components/game/YN/SelectMethed.vue";
import KeyNum from "@/components/game/YN/KeyNum.vue";
import { usethreeMinute } from "@/plugins/pinia/YNthreeMinute";
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
  // methodList.value.forEach((item) => (item.checked = false));
  playingMethod.value = item.id;
};

const twoD = ref([]); //2d选择的玩法
const threeD = ref([]); //2d选择的玩法
// 玩法选中
const changeSelectMethed = (selectData: any) => {
  // 判断当前是2d,还是3d
  if(playingMethod.value==0){
    twoD.value=selectData
  }
  if(playingMethod.value==1){
    threeD.value=selectData
  }
};

const changeNum2D = (selectNumber: any) => {
  console.log(twoD.value)
  console.log(selectNumber);
};
const changeNum3D = (selectNumber: any) => {
  console.log(threeD.value)
  console.log(selectNumber);
};
const changeNumPL2 = (selectNumber: any) => {
  console.log(selectNumber);
};
const changeNumPL3 = (selectNumber: any) => {
  console.log(selectNumber);
};

</script>
