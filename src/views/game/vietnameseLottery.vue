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
    <!-- 地区选择 -->
    <!-- <CitySelection :background-image="urls1" :list="southCityList" @change="changeCitySelection"/> -->

    <!-- 2D----------------------------------- -->
    <GameMethod
      :background-image="urls1"
      @change="changeGameMethod2D"
      v-show="playingMethod == '2D'"
      :fredList="method2DList"
    />
    <KeyNum
      :background-image="urls1"
      :showHeader="false"
      @changeNum="changeNum2D"
      v-show="playingMethod == '2D'"
      :unlock="active2Dmethod.length"
      :numList="keyNum2Ddata"
    />
    <!-- 3D-------------------------------------- -->
    <GameMethod
      :background-image="urls1"
      @change="changeGameMethod3D"
      v-show="playingMethod == '3D'"
      :fredList="method3DList"
    />
    <KeyNum
      :background-image="urls1"
      :showHeader="true"
      @changeNum="changeNum3D"
      v-show="playingMethod == '3D'"
      :unlock="active3Dmethod.length"
      :numList="keyNum3Ddata"
    />

    <KeyNum
      :background-image="urls1"
      @changeNum="changeNumPL2"
      v-show="playingMethod == 'PL2'"
      :numList="keyNumPL2data"
      :unlock="true"
      :astrict="2"
    />

    <KeyNum
      :background-image="urls1"
      @changeNum="changeNumPL3"
      v-show="playingMethod == 'PL3'"
      :numList="keyNumPL3data"
      :unlock="true"
      :astrict="3"
    />
    <!-- <pre>{{ active2D }}</pre>
    <pre>{{ active3D }}</pre>
    <pre>{{ activePL2 }}</pre>
    <pre>{{ activePL3 }}</pre> -->
    <pre>{{ betlist }}</pre>
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
import { reactive, ref, computed } from "vue";
import GameHeader from "@/components/game/gameHeader.vue";
import GameTime from "@/components/game/gameTime.vue";
import Layout from "@/layout/index.vue";
import GameHeaderTab from "@/components/game/gameHeaderTab.vue";
import GameContent from "@/components/game/gameContent.vue";
import Footer from "@/components/game/YN/Footer.vue";
import GameType from "@/components/game/YN/GameType.vue";
import BetListPop from "@/components/game/YN/BetListPop.vue";

import CitySelection from "@/components/game/YN/CitySelection.vue";
import { onLoad } from "@dcloudio/uni-app";
import { get, post } from "@/api";
import GameMethod from "@/components/game/YN/GameMethod.vue";
import KeyNum from "@/components/game/YN/KeyNum.vue";

onLoad(async (data: any) => {
  console.log(data);

  let res = await post({
    url: "/gameRecords/gamePlayAndType",
    data: { gameId: data.gameId, merchantId: 1 },
  });
  let list = res.resultSet.gamePlayAndTypeListRespList;
  // 只要接口里的2d,3d,pl2,pl3
  list = list.filter((item: any) => {
    if (item.gamePlayTypeName === "2D") return item;
    if (item.gamePlayTypeName === "3D") return item;
    if (item.gamePlayTypeName === "PL3") return item;
    if (item.gamePlayTypeName === "PL2") return item;
  });
  // 换位置
  [list[0], list[1], list[2], list[3]] = [list[2], list[3], list[1], list[0]];
  // 加checked,第一个默认选中
  list = list.map((item: any, index: number) => {
    return { ...item, checked: !index ? true : false };
  });
  console.log(list);
  // 定义2d3dpl类型
  typeList.value = list;

  // 定义2d玩法类型,头尾
  method2DList.value = list
    .find((item: any) => item.gamePlayTypeName == "2D")
    .gamePlayList.map((val: any) => {
      return { ...val, checked: false };
    });

  // 定义3d玩法类型,头尾
  method3DList.value = list
    .find((item: any) => item.gamePlayTypeName == "3D")
    .gamePlayList.map((val: any) => {
      return { ...val, checked: false };
    });


  // 请求越南地区选项
  // res = await get({ url: "/gameRecords/game" });
  // res = res.resultSet[0].games.filter((item: any) => item.vndArea);
  // console.log(res)
});
const typeTab = reactive([
  { label: "动画", id: 1 },
  { label: "直播", id: 2 },
  { label: "视频", id: 3 },
  { label: "新闻", id: 4 },
]);
let urls1 = ref("../../static/images/fredHill1.png");
let urls2 = ref("../../static/images/fredHill2.png");
let urls3 = ref("../../static/images/fredHill3M.png");
const playingMethod = ref(0); //用来展示不同玩法
// 类型切换------------------------------------
const cutGameType = (item: any) => {
  playingMethod.value = item.gamePlayTypeName;
};
const betlist: any = computed(()=>{
    let arr=[
    ...active2D.value,
    ...active3D.value,
    activePL2.value,
    activePL3.value
    ]
    arr=arr.filter((item:any)=>{
        return item?.betNums?.length
    })
    console.log(arr)

   return arr
}); //全部选中的玩法

// 地区选中------------------------------
//   const changeCitySelection = (val: any) => {
//     console.log(val);
//   };

// 2D--------------------------------------------
const method2DList = ref([]); //头,尾组选的数据
const active2Dmethod = ref([]); //已经选中的玩法
const active2Dnum = ref([]); //已经选中的号码
const active2D = computed(() => {
  let betNums = [...active2Dnum.value.map((item: any) => item.label)];
  let data: any = typeList.value.find(
    (item: any) => item.gamePlayTypeName == "2D"
  );
  if (!betNums.length) return [];
  return active2Dmethod.value.map((item: any) => {
    return {
      ...item,
      betNums,
      id: crypto.randomUUID(),
      gamePlayTypeName: data.gamePlayTypeName,
      gamePlayTypeCode: data.gamePlayTypeCode,
    };
  });
});

const changeGameMethod2D = (val: any) => {
  // 点击2D中的玩法触发
  active2Dmethod.value = val;
};
const changeNum2D = (val: any) => {
    // 点击2D中的号码触发
  active2Dnum.value = val;
};

// 3D--------------------------------------------------------
const method3DList = ref([]); //头,尾组选的数据
const active3Dmethod = ref([]); //已经选中的玩法
const active3Dnum = ref([]); //已经选中的号码
const active3D = computed(() => {
  let betNums = [...active3Dnum.value.map((item: any) => item.label)];
  let data: any = typeList.value.find(
    (item: any) => item.gamePlayTypeName == "3D"
  );

  if (!betNums.length) return [];
  return active3Dmethod.value.map((item: any) => {
    return {
      ...item,
      betNums,
      id: crypto.randomUUID(),
      gamePlayTypeName: data.gamePlayTypeName,
      gamePlayTypeCode: data.gamePlayTypeCode,
    };
  });
});
const changeGameMethod3D = (val: any) => {
  active3Dmethod.value = val;
};
const changeNum3D = (val: any) => {
  active3Dnum.value = val;
};

// PL2---------------------------
const activePL2num = ref([]); //已经选中的号码
const activePL2 = computed(() => {
  let betNums = [...activePL2num.value.map((item: any) => item.label)];
  let data: any = typeList.value.find(
    (item: any) => item.gamePlayTypeName == "PL2"
  );
  if (betNums.length!=2) return [];
  return {
    gamePlayTypeName: data.gamePlayTypeName,
    gamePlayTypeCode: data.gamePlayTypeCode,
    betNums,
    id: crypto.randomUUID(),
  };
});
const changeNumPL2 = (val: any) => {
  console.log(val);
  activePL2num.value = val;
};
// PL3---------------------------
const activePL3num = ref([]); //已经选中的号码
const activePL3 = computed(() => {
  let betNums = [...activePL3num.value.map((item: any) => item.label)];
  let data: any = typeList.value.find(
    (item: any) => item.gamePlayTypeName == "PL3"
  );
  if (betNums.length!=3) return [];
  return {
    gamePlayTypeName: data.gamePlayTypeName,
    gamePlayTypeCode: data.gamePlayTypeCode,
    betNums,
    id: crypto.randomUUID(),
  };
});
const changeNumPL3 = (val: any) => {
  // 已选中的号码
  console.log(val);
  activePL3num.value=val
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
  console.log(betlist.value);
};

const closeBetList = () => {
  show.value = false;
  // 关闭底部弹出层
};

// 生成键盘2d键盘数据
const keyNum2Ddata = computed(() => {
  let arr: any = [];
  for (let i = 0; i < 100; i++) {
    if (i < 10) {
      arr.push({ label: "0" + i, id: "0" + i, checked: false });
    } else {
      arr.push({ label: "" + i, id: "" + i, checked: false });
    }
  }
  return arr;
});

// 生成键盘3d键盘数据
const keyNum3Ddata = computed(() => {
  let arr: any = [];
  for (let i = 0; i < 1000; i++) {
    if (i < 10) {
      arr.push({ label: "00" + i, id: "00" + i, checked: false });
    } else if (i < 100) {
      arr.push({ label: "0" + i, id: "0" + i, checked: false });
    } else {
      arr.push({ label: "" + i, id: "" + i, checked: false });
    }
  }
  return arr;
});

// 生成键盘PL2键盘数据
const keyNumPL2data = computed(() => {
  let arr: any = [];
  for (let i = 0; i < 100; i++) {
    if (i < 10) {
      arr.push({ label: "0" + i, id: "0" + i, checked: false });
    } else {
      arr.push({ label: "" + i, id: "" + i, checked: false });
    }
  }
  return arr;
});

// 生成键盘PL3键盘数据
const keyNumPL3data = computed(() => {
  let arr: any = [];
  for (let i = 0; i < 100; i++) {
    if (i < 10) {
      arr.push({ label: "0" + i, id: "0" + i, checked: false });
    } else {
      arr.push({ label: "" + i, id: "" + i, checked: false });
    }
  }
  return arr;
});
</script>
