<template>
  <view class="headerTab">
    <view
      class="headerLabel"
      @click="handleContrys(item)"
      v-for="(item, index) in props.typeTab"
      :key="index"
    >
      <text>
        {{ item.label }}
      </text>
    </view>
  </view>

  <!-- <view class="headerContainer">
    <table>
      <tr>
        <td lass="periods" colspan="4">{{ period }}</td>
      </tr>
      <tr>
        <td>头奖</td>
        <td>前三</td>
        <td>后三</td>
        <td>二星</td>
      </tr>
      <tr>
        <td>{{ head }}</td>
        <td>{{ firstThree.replace(/,/g, ' ') }}</td>
        <td>{{ afterThree.replace(/,/g, ' ') }}</td>
        <td>{{ end }}</td>
      </tr>
    </table>
  </view> -->
</template>

<script setup lang="ts">
import { useCommon } from "@/plugins/pinia/common.pinia";
// import { get } from "vant/lib/utils";
import { ref, onMounted } from "vue";
import { post } from "@/api";

const storeCommon = useCommon();
const props = defineProps(["typeTab"]);
const emits = defineEmits(["handleContry"]);
const handleContrys = (item: any) => {
  storeCommon.setTabData(item.id);
  // emits('handleContry', item)
};

const head = ref(""); // 头奖
const firstThree = ref(""); //前三
const afterThree = ref(""); //后三
const end = ref(""); //二星
const period = ref(""); // 当前期
const countdown = ref(""); //倒计时
const gameCode = ref(""); //游戏code
const lastAwardPeriod = ref(""); //下一期

const fetchData = async () => {
  try {
    const data = await post({
      url: "/getAwardNum",
      data: { gameCode: "TH" },
    });
    const { awardNum } = data;

    head.value = awardNum.head;
    firstThree.value = awardNum.firstThree;
    afterThree.value = awardNum.afterThree;
    end.value = awardNum.end;
    period.value = awardNum.period;

  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

onMounted(() => {
  // fetchData();
});
</script>

<style scoped lang="scss">
.headerTab {
  // position: relative;
  display: flex;
  padding-bottom: 34rpx;
  flex-direction: row;
  justify-content: space-between;
}

.headerLabel {
  background-color: rgba(252, 239, 213, 1);
  border-radius: 16rpx;
  display: flex;
  flex-direction: column;
  padding: 12rpx 48rpx 12rpx 48rpx;

  text {
    overflow-wrap: break-word;
    color: rgba(51, 51, 51, 1);
    font-size: 32rpx;
    font-family: PingFangSC-Semibold;
    font-weight: 600;
    text-align: center;
    white-space: nowrap;
    line-height: 44rpx;
  }
}

.headerContainer {
  font-family: Arial, sans-serif;
  max-width: 600px;

  table {
    width: 100%;
    border-collapse: collapse;

    th,
    td {
      border: 1px solid #ddd;
      padding: 8px;
      text-align: center;
    }

    th {
      background-color: #f2f2f2;
    }

    tr:nth-child(even) {
      background-color: #f9f9f9;
    }
  }
}
</style>
