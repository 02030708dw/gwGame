<template>
  <div class="flex-container">
    <van-cell title="选择日期区间" :value="date" @click="show = true" />
    <van-calendar v-model:show="show" type="range" @confirm="onConfirm" />
    <button class="search" @click="search">搜索</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const date = ref('');
const show = ref(false);
const value = ref('');

const formatDate = (date) => `${date.getMonth() + 1}/${date.getDate()}`;
const onConfirm = (values) => {
  const [start, end] = values;
  show.value = false;
  date.value = `${formatDate(start)} - ${formatDate(end)}`;
  value.value = date.value; // 更新 value
};

const search = () => {
  // 处理搜索逻辑，可以在这里输出日期或者进行其他操作
  console.log('搜索日期:', value.value);
};
</script>

<style scoped lang="scss">
.flex-container {
  display: flex;
  justify-content: space-between;
}
.search {
  flex: none;
}
</style>
