<template>
  <view>
    <gameHeader :showContent="!showHeaderContent" activeTitle="玩法说明" />
  </view>
  <common-tabs :tabs="pageTabs">
    <template #content="{ tab }">
      <u-cell-group>
        <u-cell v-for="(data, dataIndex) in tab.dataList" :key="dataIndex" :title="data.name" :label="data.date" center>
        </u-cell>
      </u-cell-group>
    </template>
  </common-tabs>
</template>

<script setup lang="ts">
import gameHeader from '@/components/game/gameHeader.vue';
import { ref } from 'vue';
import CommonTabs from '@/components/CommonTabs.vue';
const showHeaderContent = ref(true);
const pageTabs = ref([
  {
    title: '标签 1', dataList: [
      { name: '名字1', date: '2009'},
      { name: '名字2', date: '2010'},
    ]
  },
  {
    title: '标签 2', dataList: [
      { name: '2', date: '5'},
    ]
  },
  {
    title: '标签 3', dataList: [
      { name: '3', date: '5'},
    ]
  },
  {
    title: '标签 4', dataList: [
      { name: '4', date: '5'},
    ]
  },
]);
</script>
