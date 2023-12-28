<template>
  <Layout>
    <template #top>
      <GameHeader :showContent="false" activeTitle="越南30秒彩" />
    </template>
    <GameHeaderTab :typeTab="typeTab" />
    <GameContent />
    <!-- <GameTime /> -->
    <!-- <gameTime :ac="gameAwardConfig"/> -->

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
    <pre>{{ current }}</pre>
    <pre>{{ betlist }}</pre>
    <template #bot>
      <Footer @click-handle="show = true" :num="current" />
    </template>
  </Layout>

  <BetListPop
    :show="show"
    @close="show = false"
    :list="betlist"
    @del="delBetList"
    @bet="bet"
  />
</template>
<script lang="ts" setup>
import { reactive, ref, computed, onBeforeUpdate } from "vue";
import GameHeader from "@/components/game/gameHeader.vue";
import GameTime from "@/components/game/gameTime.vue";
import gameTime from "@/components/game/gameTime/index.vue";

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
  let arr=[1,1,2,18,7]
  method2DList.value = list
    .find((item: any) => item.gamePlayTypeName == "2D")
    .gamePlayList.map((val: any,index:number) => {
      return { ...val, checked: false,sum:arr[index] };
    });
  // 定义3d玩法类型,头尾
  method3DList.value = list
    .find((item: any) => item.gamePlayTypeName == "3D")
    .gamePlayList.map((val: any,index:number) => {
      return { ...val, checked: false,sum:arr[index] };
    });

  // 请求越南地区选项
  // res = await get({ url: "/gameRecords/game" });
  // res = res.resultSet[0].games.filter((item: any) => item.vndArea);
  // console.log(res)

// 获取倒计时
  const getAwardNum = await post({
    url: '/getAwardNum',
    data: {gameCode: data.code}
  })
  console.log(getAwardNum)
});
const show = ref(false); //弹出层的显示隐藏

const typeTab = reactive([
  { label: "动画", id: 1 },
  { label: "直播", id: 2 },
  { label: "视频", id: 3 },
  { label: "新闻", id: 4 },
]);
let urls1 = ref("src/static/images/fredHill1.png");
let urls2 = ref("src/static/images/fredHill2.png");
let urls3 = ref("src/static/images/fredHill3M.png");
const typeList = ref([]); //不同类型的数据
const playingMethod = ref("2D"); //用来展示不同玩法&&初始展示2D
// 玩法切换2d||3||PL2||PL3------------------------------------
const cutGameType = (item: any) => {
  playingMethod.value = item.gamePlayTypeName;
};
const current=computed(()=>{
  let num=0
  betlist.value.forEach(item=>{
    num+= item.betNums.length*item.sum
  })
  return num
})
//全部选中的玩法
const betlist = computed({
  get() {
    let arr=[...active2D.value,...active3D.value,activePL2.value,activePL3.value,].filter((item: any) => {
      return item?.betNums?.length;
    });
    console.log(
      arr
    )
    return [...active2D.value,...active3D.value,activePL2.value,activePL3.value,].filter((item: any) => {
      return item?.betNums?.length;
    });
  },
  set(value) {
    betlist.value = value;
    console.log(value); //value是计算属性改变后的值
  },
});

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
  // 选择3D的玩法触发,头,尾,组选
  active3Dmethod.value = val;
};
const changeNum3D = (val: any) => {
  // 选择3D中的号码触发
  active3Dnum.value = val;
};

// PL2---------------------------
const activePL2num = ref([]); //已经选中的号码
const activePL2 = computed(() => {
  let betNums = [...activePL2num.value.map((item: any) => item.label)];
  let data: any = typeList.value.find(
    (item: any) => item.gamePlayTypeName == "PL2"
  );
  if (betNums.length != 2) return [];
  return {
    gamePlayTypeName: data.gamePlayTypeName,
    gamePlayTypeCode: data.gamePlayTypeCode,
    betNums,
    id: crypto.randomUUID(),
    sum:18
  };
});
const changeNumPL2 = (val: any) => {
  activePL2num.value = val;
};
// PL3---------------------------
const activePL3num = ref([]); //已经选中的号码
const activePL3 = computed(() => {
  let betNums = [...activePL3num.value.map((item: any) => item.label)];
  let data: any = typeList.value.find(
    (item: any) => item.gamePlayTypeName == "PL3"
  );
  if (betNums.length != 3) return [];
  return {
    gamePlayTypeName: data.gamePlayTypeName,
    gamePlayTypeCode: data.gamePlayTypeCode,
    betNums,
    id: crypto.randomUUID(),
    sum:18

  };
});
const changeNumPL3 = (val: any) => {
  // 已选中的号码
  activePL3num.value = val;
};

onBeforeUpdate(() => {
  // 数据变化时监听是否还需要选中键盘
  let flag2D = active2Dmethod.value.every((item: any) => item.checked == false);
  let flag3D = active3Dmethod.value.every((item: any) => item.checked == false);
  if (flag2D) {
    keyNum2Ddata.value.forEach((item: any) => (item.checked = false));//取消键盘选中状态
    active2Dnum.value=[]//选中数据清空
  }
  if (flag3D) {
    keyNum3Ddata.value.forEach((item: any) => (item.checked = false));//取消键盘选中状态
    active3Dnum.value=[]//选中数据清空
  }
});
// 删除一项
const delBetList = (val: any) => {
  console.log(val)
  // 首先找出这一项的分类
  let delobj: any =
    method2DList.value.find((item: any) => item.gamePlayCode == val.gamePlayCode) 
    ||
    method3DList.value.find((item: any) => item.gamePlayCode == val.gamePlayCode);
    if(delobj){
      // delobj为true代表选择的是2D3D,因为PL2,PL3没有玩法类型
      delobj.checked = false;
      active2Dmethod.value = method2DList.value.filter((item: any) => item.checked);
      active3Dmethod.value = method3DList.value.filter((item: any) => item.checked);
    }else{
      // 这里判断删的是PL2还是PL3
      if(val.gamePlayTypeCode=='vnd_PL2'){
        keyNumPL2data.value.forEach((item:any)=>item.checked=false)//取消键盘选中
        activePL2num.value=[]//列表删除
      }
      if(val.gamePlayTypeCode=='vnd_PL3'){
        keyNumPL3data.value.forEach((item:any)=>item.checked=false)//取消键盘选中
        activePL3num.value=[]//列表删除
      }
    }
};

const bet=()=>{
  console.log("ok")
  // post({
  //   url:'/bet',
  //   data:{}
  // })
}


const createNum = () => {
  // 生成00-99的键盘数据
  let arr: any = [];
  for (let i = 0; i < 100; i++) {
    if (i < 10) {
      arr.push({ label: "0" + i, id: "0" + i, checked: false });
    } else {
      arr.push({ label: "" + i, id: "" + i, checked: false });
    }
  }
  return ref(arr);
};
const keyNum2Ddata = createNum();// 生成键盘2d键盘数据
const keyNumPL2data = createNum();// 生成键盘PL2键盘数据
const keyNumPL3data = createNum();// 生成键盘PL3键盘数据
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
// const keyNumPL2data=computed(() => {
//   let arr: any = [];
//   for (let i = 0; i < 100; i++) {
//     if (i < 10) {
//       arr.push({ label: "0" + i, id: "0" + i, checked: false });
//     } else {
//       arr.push({ label: "" + i, id: "" + i, checked: false });
//     }
//   }
//   return arr;
// });
// const keyNumPL2data = computed(() => {
//   let arr: any = [];
//   for (let i = 0; i < 100; i++) {
//     if (i < 10) {
//       arr.push({ label: "0" + i, id: "0" + i, checked: false });
//     } else {
//       arr.push({ label: "" + i, id: "" + i, checked: false });
//     }
//   }
//   return arr;
// });
// const keyNumPL3data = computed(() => {
//   let arr: any = [];
//   for (let i = 0; i < 100; i++) {
//     if (i < 10) {
//       arr.push({ label: "0" + i, id: "0" + i, checked: false });
//     } else {
//       arr.push({ label: "" + i, id: "" + i, checked: false });
//     }
//   }
//   return arr;
// });
</script>