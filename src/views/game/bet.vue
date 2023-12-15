<template>
  <view>
    <gameHeader :showContent="!showHeaderContent" activeTitle="投注纪录" />
  </view>
  <SearchDatePicker @selectedDates="onSelectedDates" />
  <common-tabs :tabs="pageTabs">
    <template #content="{ tab }">
      <u-cell-group>
        <u-cell v-for="(data, dataIndex) in tab.dataList" :key="dataIndex" :title="data.name" :label="data.date" center>
          <template #value>
            <span :style="{ color: data.status === 1 ? 'red' : (data.status === 0 ? 'black' : 'gray'), margin: '20px' }">
              {{ data.status === 1 ? '中奖' : (data.status === 0 ? '未中奖' : '未开奖') }}
            </span>
            <router-link :to="{ path:'betDetails', query: { name: data.name, date: data.date, status: data.status } }">
              <u-button type="warning" style="width: 50px;" text="详情"></u-button>
            </router-link>
          </template>
        </u-cell>
      </u-cell-group>
    </template>
  </common-tabs>
</template>

<script setup lang="ts">
import gameHeader from '@/components/game/gameHeader.vue';
import { ref } from 'vue';
import CommonTabs from '@/components/CommonTabs.vue';
import SearchDatePicker from '@/components/SearchDatePicker.vue';

const showHeaderContent = ref(true);
const selectedDates = ref('');

const onSelectedDates = (dates) => {
  console.log(dates);
};

const pageTabs = ref([
  {
    title: '标签 1', dataList: [
      { name: 'name', date: '2009', status: 1 },
      { name: 'name', date: '2010', status: 0 },
    ]
  },
  {
    title: '标签 2', dataList: [
      { name: '2', date: '5', status: 0 },
    ]
  },
  {
    title: '标签 3', dataList: [
      { name: '3', date: '5', status: 2 },
    ]
  },
  {
    title: '标签 4', dataList: [
      { name: '4', date: '5', status: 1 },
    ]
  },
]);
</script>
