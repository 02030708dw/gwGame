<template>
  <view class="explain">
    <gameHeader :showContent="!showHeaderContent" activeTitle="玩法说明" />
    <view class="tabs">
      <text
        v-for="(item, index) in explainData"
        :key="index"
        class="tabs-item"
        @click="changeTab(index)"
        >{{ item.title }}</text
      >
      <text
        class="line"
        :style="{
          left:
            (750 / explainData.length) * activeTab +
            750 / explainData.length / 2 -
            28 +
            'rpx',
        }"
      ></text>
    </view>
    <view class="explain-box">
      <view
        class="explain-item"
        v-for="(item, i) in explainData[activeTab].list"
        :key="i"
      >
        <text class="name">{{ item.name }}</text>
        <text class="desc">{{ item.desc }}</text>
        <text class="example">【示例】{{ item.example }}</text>
        <view class="wire"></view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import gameHeader from "@/components/game/gameHeader.vue";
import { ref } from "vue";
const showHeaderContent = ref(true);
const activeTab = ref(0);
const changeTab = (index: number) => {
  activeTab.value = index;
};
const explainData = [
  {
    title: "泰国彩",
    list: [
      {
        name: "1D-头",
        desc: "选择1个号码为一注,若头奖之后三位中有出现,顺序不限,即为中奖。",
        example: "投注1;头奖号码为516461,后三码包含1为中奖。",
      },
      {
        name: "1D-尾",
        desc: "选择1个号码为一注,若二星中有出现,顺序不限,即为中奖。",
        example: "投注4;二型号码为46,其中包含4为中奖。",
      },
      {
        name: "2D-头",
        desc: "选择2个号码为一注,若与头奖后二位之号码及顺序皆相同,即为中奖。",
        example: "投注61;头奖号码为516461,后二码为61即中奖。",
      },
      {
        name: "2D-尾",
        desc: "选择2个号码为一注,若与二星号码相同,顺序一样,即为中奖。",
        example: "投注46;二星号码为46,号码及顺序皆相同为中奖。",
      },
      {
        name: "2D-头奖组合",
        desc: "选择2个号码为一注,若头奖之后三位中有出现,顺序不限,即为中奖。",
        example: "投注16;头奖号码为516461,后三码包含16为中奖。",
      },
      {
        name: "2D-包组",
        desc: "点击包组,接下来玩家所选的数字,系统会依该数字的排列组合勾选所有选项。",
        example: "点击包组,选择14,系统同时勾选14和41。",
      },
      {
        name: "2D-包胆",
        desc: "包胆有0~9共10个按钮,点击后系统勾选包含该数字的所有号码。",
        example:
          "点击包胆的2,系统勾选02、12、20、21、22、23、24、25、26、27、28、29、32、42、52、62、72、82和92。",
      },
      {
        name: "3D-头",
        desc: "选择3个号码为一注,若与头奖后三位之号码及顺序皆相同,即为中奖。",
        example: "投注461;头奖号码为516461,后三码为461即中奖。",
      },
      {
        name: "3D-前三",
        desc: "选择3个号码为一注,若与前三中任一组号码相同,顺序一样,即为中奖。",
        example: "投注713;前三号码中一组为713,号码及顺序皆相同为中奖。",
      },
      {
        name: "3D-后三",
        desc: "选择3个号码为一注,若与后三中任一组号码相同,顺序一样,即为中奖。",
        example: "投注215;后三号码中一组为215,号码及顺序皆相同为中奖。",
      },
      {
        name: "3D-头奖组合",
        desc: "选择3个号码为一注,若头奖之后三位中有出现,顺序不限,即为中奖。",
        example: "投注146;头奖号码为516461,后三码包含146为中奖。",
      },
      {
        name: "3D-包组",
        desc: "点击包组,接下来玩家所选的数字,系统会依该数字的排列组合勾选所有选项。",
        example: "点击包组,选择142,系统同时勾选142、124、214、241、412和421。",
      },
    ],
  },
  {
    title: "越南彩",
    classify: [
      {
        title: "越南5分彩",
        list: [
          {
            name: "2D-头",
            desc: "所选号码与八奖相同,顺序一致,即为中奖。",
            example: "投注方案:01;八奖号码:01,顺序一致,即为中奖。",
          },
          {
            name: "2D-尾",
            desc: "所选号码与特奖的后二码相同,顺序一致,即为中奖。",
            example: "投注方案:01;特奖号码:543201,后二码01,顺序一致,即为中奖。",
          },
          {
            name: "2D-头尾",
            desc: "所选号码与八奖或特奖的后二码相同,顺序一致,即为中奖。若对中多组号码,可重复派奖。",
            example: "投注方案:01;特奖号码:543201,后二码01,顺序一致,即为中奖。",
          },
          {
            name: "2D-包组",
            desc: "所选号码与任一奖号的后二码相同，顺序一致，即为中奖。若对中多组号码，可重复派奖。",
            example: "投注方案:01;五奖号码:3201,后二码01,顺序一致,即为中奖。",
          },
          {
            name: "2D-包组7",
            desc: "所选号码与八奖或七奖、六奖、五奖、特奖的后二码相同，顺序一致，即为中奖。若对中多组号码，可重复派奖。",
            example: "投注方案:01;五奖号码:3201,后二码01,顺序一致,即为中奖。",
          },
          {
            name: "3D-头",
            desc: "所选码与七奖相同,顺序一致,即为中奖。",
            example: "投注方案:001;七奖号码:001,顺序一致,即为中奖",
          },
          {
            name: "3D-尾",
            desc: "所选号码与特将的后三码相同,循序一致,即为中奖",
            example: "投注方案:001;特奖号码:123001,后三码001,顺序一致,即为中奖",
          },
          {
            name: "3D-头尾",
            desc: "所选号码与七奖或特奖的后三码相同,顺序一致,即为中奖。若对中多组号码,可重复派奖",
            example: "投注方案:001;特奖号码:123001,后三码001,顺序一致,即为中奖",
          },
          {
            name: "3D-包组",
            desc: "所选号码与七奖或六奖、五奖、四奖、三奖、二奖、一奖、特奖的后三码相同,顺序一致,即为中奖。若对中多组号码,可重复派奖。",
            example: "投注方案:001;五奖号码:1001,后三码001,顺序一致,即为中奖。",
          },
          {
            name: "3D-包组7",
            desc: "所选号码与七奖或六奖、五奖、四奖第一组、特奖的后三码相同,顺序一致,即为中奖。若对中多组号码,可重复派奖。",
            example: "投注方案:001;五奖号码:1001,后三码001,顺序一致,即为中奖。",
          },
          {
            name: "4D-尾",
            desc: "所选号码与特奖的后四码相同,顺序一致,即为中奖。",
            example:
              "投注方案:0001;特奖号码:120001,后四码0001,顺序一致,即为中奖。",
          },
          {
            name: "4D-包组",
            desc: "所选号码与六奖、五奖、四奖、三奖、二奖、一奖、特奖的后四码相同,顺序一致,即为中奖。若对中多组号码,可重复派奖。",
            example:
              "投注方案:0001;特奖号码:120001,后四码0001,顺序一致,即为中奖。",
          },
          {
            name: "PL2",
            desc: "所选的2组号码与任两个开奖号码的后二码相同,顺序一致,即为中奖。不重复派奖。",
            example:
              "投注方案:01、23;八奖:01、五奖:1023;01、23皆有出现,即为中奖。",
          },
          {
            name: "PL3",
            desc: "所选的3组号码与任三个开奖号码的后二码相同,顺序一致,即为中奖。不重复派奖。",
            example:
              "投注方案:01、23、45;八奖:01、五奖:1023,一奖32145;01、23、45皆有出现,即为中奖。",
          },
        ],
      },
      {
        title: "越南30秒彩",
        list: [
          {
            name: "2D-头",
            desc: "所选号码与八奖相同,顺序一致,即为中奖。",
            example: "投注方案:01;八奖号码:01,顺序一致,即为中奖。",
          },
          {
            name: "2D-尾",
            desc: "所选号码与特奖的后二码相同,顺序一致,即为中奖。",
            example: "投注方案:01;特奖号码:543201,后二码01,顺序一致,即为中奖。",
          },
          {
            name: "2D-头尾",
            desc: "所选号码与八奖或特奖的后二码相同,顺序一致,即为中奖。若对中多组号码,可重复派奖。",
            example: "投注方案:01;特奖号码:543201,后二码01,顺序一致,即为中奖。",
          },
          {
            name: "2D-包组",
            desc: "所选号码与任一奖号的后二码相同，顺序一致，即为中奖。若对中多组号码，可重复派奖。",
            example: "投注方案:01;五奖号码:3201,后二码01,顺序一致,即为中奖。",
          },
          {
            name: "2D-包组7",
            desc: "所选号码与八奖或七奖、六奖、五奖、特奖的后二码相同，顺序一致，即为中奖。若对中多组号码，可重复派奖。",
            example: "投注方案:01;五奖号码:3201,后二码01,顺序一致,即为中奖。",
          },
          {
            name: "3D-头",
            desc: "所选码与七奖相同,顺序一致,即为中奖。",
            example: "投注方案:001;七奖号码:001,顺序一致,即为中奖",
          },
          {
            name: "3D-尾",
            desc: "所选号码与特将的后三码相同,循序一致,即为中奖",
            example: "投注方案:001;特奖号码:123001,后三码001,顺序一致,即为中奖",
          },
          {
            name: "3D-头尾",
            desc: "所选号码与七奖或特奖的后三码相同,顺序一致,即为中奖。若对中多组号码,可重复派奖",
            example: "投注方案:001;特奖号码:123001,后三码001,顺序一致,即为中奖",
          },
          {
            name: "3D-包组",
            desc: "所选号码与七奖或六奖、五奖、四奖、三奖、二奖、一奖、特奖的后三码相同,顺序一致,即为中奖。若对中多组号码,可重复派奖。",
            example: "投注方案:001;五奖号码:1001,后三码001,顺序一致,即为中奖。",
          },
          {
            name: "3D-包组7",
            desc: "所选号码与七奖或六奖、五奖、四奖第一组、特奖的后三码相同,顺序一致,即为中奖。若对中多组号码,可重复派奖。",
            example: "投注方案:001;五奖号码:1001,后三码001,顺序一致,即为中奖。",
          },
          {
            name: "4D-尾",
            desc: "所选号码与特奖的后四码相同,顺序一致,即为中奖。",
            example:
              "投注方案:0001;特奖号码:120001,后四码0001,顺序一致,即为中奖。",
          },
          {
            name: "4D-包组",
            desc: "所选号码与六奖、五奖、四奖、三奖、二奖、一奖、特奖的后四码相同,顺序一致,即为中奖。若对中多组号码,可重复派奖。",
            example:
              "投注方案:0001;特奖号码:120001,后四码0001,顺序一致,即为中奖。",
          },
          {
            name: "PL2",
            desc: "所选的2组号码与任两个开奖号码的后二码相同,顺序一致,即为中奖。不重复派奖。",
            example:
              "投注方案:01、23;八奖:01、五奖:1023;01、23皆有出现,即为中奖。",
          },
          {
            name: "PL3",
            desc: "所选的3组号码与任三个开奖号码的后二码相同,顺序一致,即为中奖。不重复派奖。",
            example:
              "投注方案:01、23、45;八奖:01、五奖:1023,一奖32145;01、23、45皆有出现,即为中奖。",
          },
        ],
      },
      {
        title: "南、中部",
        list: [],
      },
      {
        title: "北部",
        list: [],
      },
    ],
  },
  {
    title: "菲律宾彩",
  },
];
</script>
<style scoped lang="scss">
.explain {
  background-color: #f9f9f9;
  .tabs {
    width: 750rpx;
    height: 100rpx;
    background-color: #fff;
    display: flex;
    align-items: center;
    position: relative;
    .tabs-item {
      font-family: PingFangSC, PingFang SC;
      font-weight: 600;
      font-size: 32rpx;
      text-align: center;
      flex: 1;
    }
    .line {
      width: 56rpx;
      height: 8rpx;
      background: #c2611c;
      border-radius: 4rpx;
      position: absolute;
      top: 76rpx;
      transition: all 0.2s linear;
    }
  }
  .explain-box {
    background-color: #fff;
    width: 686rpx;
    box-sizing: border-box;
    margin: 32rpx auto 0;
    padding: 32rpx;
    padding-bottom: 0;
    .explain-item {
      display: flex;
      flex-direction: column;
      .name {
        font-size: 32rpx;
      }
      .desc {
        margin-top: 10rpx;
        font-size: 28rpx;
        color: #a1a1a1;
      }
      .example {
        margin-top: 10rpx;
        font-size: 28rpx;
        color: #a1a1a1;
      }
      .wire {
        width: 100%;
        height: 1rpx;
        background-color: #a1a1a1;
        // margin: 64rpx 0;
        margin: 30rpx 0;
      }
    }
  }
}
</style>
