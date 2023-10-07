<template>
	<view class="xuanz">
		<l-viewer :images="images" />
	</view>
</template>


<script setup lang="ts">
	// 需要放在页面里面才能运行
	import { ref } from "vue";
	const images = ref([
		'https://dz.shningmi.com/cz/1.png',
		'https://dz.shningmi.com/cz/2.png',
		'https://dz.shningmi.com/cz/3.png',
		'https://dz.shningmi.com/cz/4.png',
		'https://dz.shningmi.com/cz/5.png',
		'https://dz.shningmi.com/cz/6.png',
		'https://dz.shningmi.com/cz/7.png',
		'https://dz.shningmi.com/cz/8.png',
		'https://dz.shningmi.com/cz/9.png',
		'https://dz.shningmi.com/cz/10.png',
		'https://dz.shningmi.com/cz/11.png',
		'https://dz.shningmi.com/cz/12.png',
		'https://dz.shningmi.com/cz/13.png',
		'https://dz.shningmi.com/cz/14.png',
		'https://dz.shningmi.com/cz/15.png',
		'https://dz.shningmi.com/cz/16.png'

	])
</script>

<style scoped lang="scss"> 
	.xuanz {
		width: 100%;
		height: 100vh;
	}
</style>