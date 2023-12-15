<template>
  <view>
    <gameHeader :showContent="!showHeaderContent" activeTitle="盈亏报表" />
    <SearchDatePicker @selectedDates="onSelectedDates" />
    <u-cell-group>
      <u-cell title="盈亏查询:" :value="totalTime" center></u-cell>
      <u-cell v-for="(item, index) in timeItems" :key="index" :title="item.title" :value="item.value" center></u-cell>
    </u-cell-group>
  </view>
</template>

<script setup lang="ts">
import gameHeader from '@/components/game/gameHeader.vue';
import SearchDatePicker from '@/components/SearchDatePicker.vue';
import { ref, computed } from 'vue';

const showHeaderContent = ref(true);
const selectedDates = ref('');

const timeItems = [
  { title: '时间:', value: 5 },
  { title: '时间:', value: 5 },
  { title: '时间:', value: 5 },
  { title: '时间:', value: 5 },
];

const totalTime = computed(() => {
  return timeItems.reduce((total, item) => total + item.value, 0);
});

const onSelectedDates = (dates) => {
  console.log(dates);
};
</script>
