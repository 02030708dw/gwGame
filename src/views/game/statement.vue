<template>
  <view>
    <gameHeader :showContent="!showHeaderContent" activeTitle="盈亏报表" />
  </view>
  <SearchDatePicker @selectedDates="onSelectedDates" />
</template>

<script setup lang="ts">
import gameHeader from '@/components/game/gameHeader.vue';
import SearchDatePicker from '@/components/SearchDatePicker.vue';
import { ref } from 'vue';

const showHeaderContent = ref(true);

const selectedDates = ref('');

const onSelectedDates = (dates) => {
  console.log(dates)
};
</script>
