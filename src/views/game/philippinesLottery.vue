<template>
  <Layout>
    <template #top>
      <GameHeader active-title="菲律宾彩" />
    </template>
    <GameHeaderTab :typeTab="typeTab" />
    <GameContent />
    <GameTime />

    <template #bot>
      <GameFooter />
    </template>
  </Layout>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { storeToRefs } from "pinia";
import GameHeader from "@/components/game/gameHeader.vue";
import GameTime from "@/components/game/gameTime.vue";
import Layout from "@/layout/index.vue";
import GameHeaderTab from "@/components/game/gameHeaderTab";
import GameContent from "@/components/game/gameContent";
import GameTab from "@/components/keyboard/gameTab";
import GameFooter from "@/components/game/gameFooter";


/**
 *
 * 类型切换
 */
const typeTab = reactive([
  { label: "动画", id: 1 },
  { label: "直播", id: 2 },
  { label: "视频", id: 3 },
  { label: "新闻", id: 4 },
]);
</script>

<style></style>
