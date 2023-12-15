<template>
  <view>
    <gameHeader :showContent="!showHeaderContent" activeTitle="账变纪录" />
  </view>
  <SearchDatePicker @selectedDates="onSelectedDates" />

  <view class="bgcolor" style="background-color: ghostwhite;">
    <view class="box-body">
      <div class="flex-container" v-for="(item, index) in items" :key="index">
        <ul class="left-content">
          <li   :style="{ color: item.color }">{{ item.value }}</li>
		  <li :style="{ color: item.color }">{{ item.position }}</li>
		  <li :style="{ color: item.color }">{{ item.color }}</li>
        </ul>
        <ul class="right-content">
          <li :style="{ color: item.color }">{{ item.name }}</li>
		  <li :style="{ color: item.color }">{{ item.type }}</li>
        </ul>
      </div>
    </view>
  </view>
</template>

<script setup lang="ts">
import gameHeader from '@/components/game/gameHeader.vue';
import SearchDatePicker from '@/components/SearchDatePicker.vue';
import { ref } from 'vue';

const showHeaderContent = ref(true);

const selectedDates = ref('');

const onSelectedDates = (dates) => {
  console.log(dates);
};

const items = ref([
  { value: '4', position: 'left', color: '1' ,name:'2',type:'3'},
  { value: '4', position: 'left', color: '1' ,name:'2',type:'3'},
  { value: '4', position: 'left', color: '1' ,name:'2',type:'3'},
  { value: '4', position: 'left', color: '1' ,name:'2',type:'3'},
  { value: '4', position: 'left', color: '1' ,name:'2',type:'3'},
  
]);
</script>

<style scoped>
.flex-container {
  background-color: #fff;
  display: flex;
  justify-content: space-between; /* 在水平方向上两侧靠墙并居中 */
  margin-bottom: 10px;
  padding: 10px;
}

.left-content, .right-content {
  text-align: center;
}

.right-content {
  align-self: end;
}
</style>
