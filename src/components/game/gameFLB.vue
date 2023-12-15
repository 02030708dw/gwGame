<template>
	<view class="headerFred" :style="{backgroundImage: 'url('+ props.urls +')'}">
	

		<gameTabAuto :backActive="props.backActive" @handleActives="handleActives" :countId="countId"
			:typeTab="props.TabData" />

	</view>
</template>

<script setup lang="ts">
	import { ref } from "vue";
	import gameTabAuto from "./gameTabAuto.vue"
	import { useCommon } from "@/plugins/pinia/common.pinia";
	const storeCommon = useCommon();
	// import { useCommon } from "@/plugins/pinia/common.pinia";
	const props = defineProps(['urls', 'TabData', 'backActive']);
	const emits = defineEmits(['handleId'])
	const countId = ref(0);
	// const storeCommon = useCommon();
	const handleActives = (id : number) => {
		storeCommon.TabDataTwo1D2D3DID = id;
		countId.value = id;
		emits('handleId', id)
	}
</script>

<style scoped lang="scss">

	.headerFred {
		width: 96%;
		display: flex;
		flex-direction: column;
		margin: 0 auto;
		background-size: cover;
		background-repeat: no-repeat;
	}
</style>