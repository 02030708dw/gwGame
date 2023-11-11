<template>
		<gameHeader />
		<gameHeaderTab :typeTab="typeTab" />
		<gameContent />
		<gameTime />
		<gameFredHill :urls="urls1"/>
		<gameFredHill :urls="urls2"/>
		<gameFredHill :urls="urls3"/>
		<gameFooter/>
</template>

<script setup lang="ts">
	import gameHeader from "@/components/game/gameHeader";
	import gameContent from "@/components/game/gameContent";
	import gameTime from "@/components/game/gameTime";
	import gameFooter from "@/components/game/gameFooter";
	import gameFredHill from "@/components/game/gameFredHill";
	import gameHeaderTab from "@/components/game/gameHeaderTab";

	import { reactive, ref } from "vue";
    let urls1=ref('../../static/images/fredHill1.png')
    let urls2=ref('../../static/images/fredHill2.png')
    let urls3=ref('../../static/images/fredHill3.png')
	/**
	 * 
	 * 类型切换
	*/ 
  const typeTab = reactive([
		{ label: "动画", id: 1 },
		{ label: "直播", id: 2 },
		{ label: "视频", id: 3 },
		{ label: "新闻", id: 4 },
	])
</script>

<style scoped lang="scss">
</style>