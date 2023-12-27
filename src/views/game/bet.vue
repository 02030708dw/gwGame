<template>
  <view class="bet">
    <gameHeader :showContent="!showHeaderContent" activeTitle="投注记录" />
    <view class="tabs">
      <!-- 彩种分类 -->
      <text
        class="tabs-item"
        v-for="(category, i) in categories"
        :key="category.country"
        @click="selectCategory(category, i)"
      >
        {{ category.name }}
      </text>
      <!-- 文字下滑线 -->
      <text class="line" :style="{ left: lineLeft }"></text>
    </view>
    <!-- 日期选择 -->
    <SearchDatePicker @selectedDates="onSelectedDates" />

    <!-- 投注列表 -->
    <view class="record-box" v-if="pageTabs && pageTabs.length > 0">
      <view class="record-item" v-for="item in pageTabs" :key="item.orderNo">
        <view class="left">
          <text class="name">{{ item.gameName }}</text>
          <text class="time">{{ item.createdAt }}</text>
        </view>

        <view class="right">
          <text
            v-for="status in statusList"
            :key="status.code"
            :style="{ color: status.color }"
          >
            <test v-if="item.status === status.code">{{ status.text }}</test>
          </text>
        </view>
        <text class="detail" @click="redirect(item)">详情</text>
      </view>
    </view>

    <view class="tips" v-else>无投注记录</view>
  </view>
</template>
<script setup lang="ts">
import gameHeader from "@/components/game/gameHeader.vue";
import SearchDatePicker from "@/components/SearchDatePicker.vue";
import { ref, onBeforeMount, computed } from "vue";
import { get } from "@/api";

//彩种分类
interface Category {
  country: string;
  name: string;
}
const categories = ref<Category[]>([
  { country: "", name: "全部" },
  { country: "th", name: "泰国" },
  { country: "vnd", name: "越南" },
  { country: "ph", name: "菲律宾" },
]);
const activeTab = ref(0); //当前选中的彩种

//彩种分类点击事件
const selectCategory = (category: Category, index: number) => {
  activeTab.value = index; // 更新选中的分类索引
  activeRegion.value = category.country; // 更新当前选中的地区
  fetchData(); // 重新获取数据
};

//开奖状态
const statusList = [
  { code: 0, text: "待开奖", color: "#c1c1c1" },
  { code: 1, text: "中奖", color: "#FF4242" },
  { code: 2, text: "未中奖", color: "#333333" },
  { code: 3, text: "用户撤单", color: "#c1c1c1" },
  { code: 4, text: "后台撤单", color: "#c1c1c1" },
  { code: 5, text: "停止派奖", color: "#c1c1c1" },
];

const showHeaderContent = ref(true); //显示下拉导航
const onSelectedDates = (dates: string) => {
  // 打印选择的日期
  console.log(dates);
};

// 计算下滑线的左边距
const lineLeft = computed(() => {
  return (
    (750 / categories.value.length) * activeTab.value +
    750 / categories.value.length / 2 -
    28 +
    "rpx"
  );
});

const redirect = ({ orderNo }: any) => {
  // 跳转详情
  uni.navigateTo({
    url: `betDetails?orderNo=${orderNo}`,
  });
};
const pageTabs = ref([]);

const activeRegion = ref(""); // 默认选中的地区代码
// 调用接口获取数据
const fetchData = async () => {
  try {
    const data = await get({
      url: "/gameRecords/order/search",
      data: { country: activeRegion.value },
    });
    console.log("🚀  data:", data.resultSet.data);
    pageTabs.value = data.resultSet.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

onBeforeMount(() => {
  fetchData();
});
</script>
<style scoped lang="scss">
body {
  background-color: #f9f9f9;
}
.bet {
  background-color: #f9f9f9;
  box-sizing: border-box;

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
  .record-box {
    padding: 20rpx 32rpx;
    box-sizing: border-box;
    .record-item {
      margin-bottom: 20rpx;
      width: 686rpx;
      height: 148rpx;
      background: #fff;
      border-radius: 24rpx;
      box-sizing: border-box;
      padding: 32rpx;
      display: flex;
      justify-content: space-between;
      font-family: PingFangSC, PingFang SC;
      .left {
        display: flex;
        flex-direction: column;
        .name {
          font-size: 36rpx;
          font-weight: 600;
          color: #333333;
          line-height: 36rpx;
        }
        .time {
          font-size: 32rpx;
          font-weight: 400;
          color: #c1c1c1;
          margin-top: 10rpx;
        }
      }
      .right {
        display: flex;
        align-items: center;
      }

      .detail {
        margin-left: 10rpx;
        width: 108rpx;
        height: 84rpx;
        background: #ffb023;
        border-radius: 16rpx;
        text-align: center;
        color: #fff;
        line-height: 84rpx;
        font-size: 32rpx;
      }
    }
  }

  .tips {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
