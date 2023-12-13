<template>
  <view>
    <gameHeader :showContent="!showHeaderContent" activeTitle="投注纪录" />
  </view>
  <common-tabs :tabs="pageTabs" />
  <SearchDatePicker @selectedDates="onSelectedDates" />
</template>

<script setup lang="ts">
import gameHeader from '@/components/game/gameHeader.vue';
import { ref } from 'vue';
import CommonTabs from '@/components/CommonTabs.vue';
import SearchDatePicker from '@/components/SearchDatePicker.vue';
const showHeaderContent = ref(true);
const selectedDates = ref('');

const onSelectedDates = (dates) => {
  console.log(dates)
};
const pageTabs = ref([
  { title: '标签 1', content: '内容 1' },
  { title: '标签 2', content: '内容 2' },
  { title: '标签 3', content: '内容 3' },
  { title: '标签 4', content: '内容 4' },
]);
</script>