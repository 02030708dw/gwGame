<template>
  <van-tabs color="red" v-model:active="active">
    <van-tab  v-for="(tab, index) in tabs" :key="index" :title="tab.title">
      <slot :name="`content`" :tab="tab"></slot>
    </van-tab>
  </van-tabs>
</template>

<script setup lang="ts">
import { ref, PropType } from 'vue';

interface Tab {
  title: string;
  content: string;
}

const props = defineProps({
  tabs: {
    type: Array as PropType<Tab[]>,
    required: true,
  },
});

const active = ref(0);
</script>
