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
      <Footer @click-handle="clickBet" />
    </template>
  </Layout>

  <BetListPop
    :show="show"
    @close="closeBetList"
    :list="betlist"
    @del="delBetList"
  />
</template>
<script lang="ts" setup>
import { reactive, ref, toRefs, computed } from "vue";
import { storeToRefs } from "pinia";
import GameHeader from "@/components/game/gameHeader.vue";
import GameTime from "@/components/game/gameTime.vue";
import Layout from "@/layout/index.vue";
import GameHeaderTab from "@/components/game/gameHeaderTab.vue";
import GameContent from "@/components/game/gameContent.vue";
import Footer from "@/components/game/YN/Footer.vue";
import GameType from "@/components/game/YN/GameType.vue";
import SelectMethed from "@/components/game/YN/SelectMethed.vue";
import KeyNum from "@/components/game/YN/KeyNum.vue";
import BetListPop from "@/components/game/YN/BetListPop.vue";
import { usethreeMinute } from "@/plugins/pinia/YNthreeMinute";
const storethreeMinute = usethreeMinute();
const { typeList } = storeToRefs(storethreeMinute);
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
  playingMethod.value = item.id;
};
const betlist: any = ref([]); //全部选中的玩法

const twoD = ref([]); //2d选择的玩法
const threeD = ref([]); //3d选择的玩法

// 玩法选中-----------------------------------
const changeSelectMethed = (selectData: any) => {
  // 判断当前是2d,还是3d
  if (playingMethod.value == 0) twoD.value = selectData;
  if (playingMethod.value == 1) threeD.value = selectData;
};
// 2D--------------------------------------------
const num2D = ref([]); //2d所选的全部数字
const active2D = computed(() => {
  //计算2d里面选中的玩法与数字
    return twoD.value.map((item: any) => {
      return {
        label: "2D-" + item.label,
        num: [...num2D.value],
        sum: item.sum,
        id: crypto.randomUUID(),
      };
    });
});
const changeNum2D = (selectNumber: any) => {
  let num = selectNumber.map((item: any) => item.label); //选中的号码
  num2D.value = num;
};
// 3D--------------------------------------------------------
const num3D = ref([]); //3D所选的全部数据
const active3D = computed(() => {
  return threeD.value.map((item: any) => {
    return {
      label: "3D-" + item.label,
      num: [...num3D.value],
      sum: item.sum,
      id: crypto.randomUUID(),
    };
  });
});
const changeNum3D = (selectNumber: any) => {
  let num = selectNumber.map((item: any) => item.label); //选中的号码
  num3D.value = num;
};
// PL2---------------------------
const numPL2 = ref([]);
const activePL2 = computed(() => {
  // PL2选两个号码才会加入列表
  if (numPL2.value.length == 2) {
    return {
      label: "PL2",
      num: [...numPL2.value],
      sum: 36,
      id: crypto.randomUUID(),
    };
  }
});
const changeNumPL2 = (selectNumber: any) => {
  let num = selectNumber.map((item: any) => item.label); //选中的号码
  numPL2.value = num;
};

// PL3---------------------------
const numPL3 = ref([]);
const activePL3 = computed(() => {
  // PL3选三个号码才会加入列表
  if (numPL3.value.length == 3) {
    return {
      label: "PL3",
      num: [...numPL3.value],
      sum: 54,
      id: crypto.randomUUID(),
    };
  }
});
const changeNumPL3 = (selectNumber: any) => {
  let num = selectNumber.map((item: any) => item.label); //选中的号码
  numPL3.value = num;
};

// 删除一项
const delBetList = (id: string) => {
  console.log(id);
  betlist.value = betlist.value.filter((item: any) => item.id !== id);
};
const show = ref(false);
const clickBet = () => {
  // 打开底部弹出层,同时要将选中的号码传入
  show.value = true;
  let arr = [
    ...active2D.value,
    ...active3D.value,
    activePL2.value,
    activePL3.value,
  ];
  betlist.value = arr.filter((item) =>item?.num.length );
  console.log(betlist.value);
};

const closeBetList = () => {
  show.value = false;
  // 关闭底部弹出层
};
</script>
