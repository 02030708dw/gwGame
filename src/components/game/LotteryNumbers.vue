<template>
  <div class="lottery-table">
    <div
      class="table-row"
      v-for="(numbers, rank) in parsedAwardNum"
      :key="rank"
    >
      <div class="table-cell rank">{{ rank }}</div>
      <div class="table-cell numbers">
        <span
          class="number"
          v-for="(number, index) in numbers.split(',')"
          :key="index"
          >{{ number }}</span
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  awardNum: String,
});

const parsedAwardNum = computed(() => {
  // 检查是否为空或未定义的JSON字符串
  if (!props.awardNum || props.awardNum === "undefined") {
    console.error("Error: awardNum prop is undefined or not a valid JSON.");
    return {};
  }

  try {
    const parsedData = JSON.parse(props.awardNum);
    const translatedData: Record<string, string> = {};

    for (const [key, value] of Object.entries(parsedData)) {
      translatedData[translateKey(key)] = value;
    }

    return translatedData;
  } catch (error) {
    console.error("Error parsing awardNum:", error);
    return {};
  }
});

function translateKey(key: string): string {
  const keyTranslations: Record<string, string> = {
    head: "头奖",
    end: "二星",
    firstThree: "前三",
    afterThree: "后三",
    "0": "特奖",
    "1": "七奖",
    "2": "六奖",
    "3": "五奖",
    "4": "四奖",
    "5": "三奖",
    "6": "二奖",
    "7": "一奖",
    "8": "八奖",
  };
  return keyTranslations[key] || key;
}
</script>

<style scoped>
.lottery-table {
  display: table;
  width: 100%;
  text-align: left;
  border-collapse: collapse;
  margin: 20rpx 0;
}

.table-row {
  display: table-row;
}

.table-cell {
  display: table-cell;
  padding: 8px;
  border: 1px solid #ddd;
}

.table-cell.rank {
  font-weight: bold;
  background-color: #f0f0f0;
  vertical-align: middle;
  text-align: center;
  width: 80rpx;
}

.table-cell.numbers {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.number {
  margin-right: 8px;
  background-color: #e8e8e8;
  padding: 4px 8px;
  border-radius: 4px;
  margin-bottom: 4px;
}
</style>
