<template>
  <view>
    <gameHeader :showContent="!showHeaderContent" activeTitle="语言" />
  </view>
</template>

<script setup lang="ts">
import gameHeader from '@/components/game/gameHeader.vue';
import { ref } from 'vue';
const showHeaderContent = ref(true);

</script>
