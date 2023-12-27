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
      <CitySelection :background-image="urls1" :list="southCityList" @change="changeCitySelection"/>
      <!-- 2D----------------------------------- -->
      
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
  
  import CitySelection from "@/components/game/YN/CitySelection.vue";
  import { usethreeMinute } from "@/plugins/pinia/YNthreeMinute";
  import { onLoad } from "@dcloudio/uni-app";
  import { get, post } from "@/api";
  import GameMethod from "@/components/game/YN/GameMethod.vue"
  const storethreeMinute = usethreeMinute();
  const {
    typeList,
    methodList2D,
    methodList3D,
    num3Data,
    numPL2Data,
    numPL3Data,
    southCityList,
  } = storeToRefs(storethreeMinute);
  onLoad(async (data: any) => {
    console.log(data);
    let res;
    res = await post({
      url: "/gameRecords/gamePlayAndType",
      data: { gameId: data.gameId, merchantId: 1 },
    });
    let list = res.resultSet.gamePlayAndTypeListRespList;
    list = list.filter((item: any) => {
      if (item.gamePlayTypeName === "2D") return item;
      if (item.gamePlayTypeName === "3D") return item;
      if (item.gamePlayTypeName === "PL3") return item;
      if (item.gamePlayTypeName === "PL2") return item;
    });
    [list[0],list[1],list[2],list[3]]=[list[2],list[3],list[1],list[0]]
    console.log(list)
    list=list.map((item:any,index:number)=>{
      return {...item,checked:!index?true:false}
    })
    typeList.value=list
    console.log(typeList.value)
    // 请求越南地区选项
    res = await get({ url: "/gameRecords/game" });
    res = res.resultSet[0].games.filter((item: any) => item.vndArea);
    // console.log(res)
  });
  
  const typeTab = reactive([
    { label: "动画", id: 1 },
    { label: "直播", id: 2 },
    { label: "视频", id: 3 },
    { label: "新闻", id: 4 },
  ]);
  let urls1 = ref("src/static/images/fredHill1.png");
  let urls2 = ref("src/static/images/fredHill2.png");
  let urls3 = ref("src/static/images/fredHill3M.png");
  const playingMethod = ref('2D'); //用来展示不同玩法
  // 类型切换------------------------------------
  const cutGameType = (item: any) => {
    console.log(item)
    playingMethod.value = item.gamePlayTypeName;
  };
  const betlist: any = ref([]); //全部选中的玩法
 
  
  // 地区选中------------------------------
  const changeCitySelection = (val: any) => {
    console.log(val);
  };


  // 2D--------------------------------------------
  
  // 3D--------------------------------------------------------
  
  // PL2---------------------------
 
  
  // PL3---------------------------
 
  
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
  </script>
  