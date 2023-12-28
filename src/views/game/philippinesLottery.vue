<template>
	<Layout>
		<template #top>
			<GameHeader active-title="菲律宾彩" />
		</template>
		<GameHeaderTab :typeTab="typeTab" />
		<gameFlb />
		<GameTime />
		<view class="block_7">
			<view class="box_19">
				<view class="text-wrapper_16" :class="{ 'highlight': currentOption === 1 }" @click="changeOption(1)">
					<text lines="1" decode="true" class="text_21">2&nbsp;Digits</text>
				</view>

				<view class="text-wrapper_17" :class="{ 'highlight': currentOption === 2 }" @click="changeOption(2)">
					<text lines="1" decode="true" class="text_22">1&nbsp;Digit</text>
				</view>
				<view class="text-wrapper_18" :class="{ 'highlight': currentOption === 3 }" @click="changeOption(3)">
					<text lines="1" class="text_23">Combinations</text>
				</view>
			</view>

			<view class="box_20" v-show="currentOption === 1||currentOption === 2">
				<view class="group_1" :class="{ 'highlighted': currentOptionTwo === 1 }" @click="changeOptionTwo(1)">
					<image v-show="currentOptionTwo === 1"
						src="https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPng48a1ecb2a14ef1845289baf45e29f20ff7b00e5e244fa770a63ca2821b7cfc93"
						class="icon_7"></image>
					<view class="image-text_3">
						<text lines="1" class="text-group_2">Straight</text>
						<image v-show="currentOptionTwo === 1"
							src="https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPng08d4b08fbe4d235212c28ef007791828205c6ada431cadf17a3c82bb2aa1afb7"
							class="icon_8"></image>
					</view>
				</view>
				<view class="group_1" :class="{ 'highlighted': currentOptionTwo === 2 }" @click="changeOptionTwo(2)">
					<image v-show="currentOptionTwo === 2"
						src="https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPng48a1ecb2a14ef1845289baf45e29f20ff7b00e5e244fa770a63ca2821b7cfc93"
						class="icon_7"></image>
					<view class="image-text_4">
						<text lines="1" class="text-group_2">Rambolito</text>
						<image v-show="currentOptionTwo === 2"
							src="https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPng08d4b08fbe4d235212c28ef007791828205c6ada431cadf17a3c82bb2aa1afb7"
							class="icon_8"></image>
					</view>
				</view>
			</view>

			<view class="oneBox" v-show="currentOption === 2 && currentOptionTwo ===2">
				<view class="text-wrapper_21">
					<text v-for="(item, index) in textItems" :key="index" :class="{ 'active': activeText === item }"
						@click="handleTextClick(item)">
						{{ item }}
					</text>
				</view>
				<view class="box_4">
					<view class="box_item">
						<view v-for="(item, index) in data1R" :key="index" @click="handleClick1R(item,selectedData1R)"
							:class="{ 'highlighted': selectedData1R.includes(item), 'block_3': !selectedData1R.includes(item)}">
							<view class="text-group_11">
								<text lines="1" class="text_31">01</text>
								<text lines="1" class="text_32">8.4398</text>
							</view>
						</view>
					</view>
				</view>
			</view>

			<view class="box_21"
				v-show="currentOption === 1 && currentOptionTwo ===1 || currentOption === 2 && currentOptionTwo === 1 || currentOption===3">
				<view class='text-wrapper_20'>
					<text lines="1" class="text_25">1st</text>
				</view>
				<view class='text-wrapper_20'>
					<text lines="1" class="text_26">2nd</text>
				</view>
			</view>
			<view class="itembox_10">
				<view class="box_10" v-show="currentOption === 1 && currentOptionTwo === 2">
					<view class="text-wrapper_19">
						<text lines="1" class="text_25">-</text>
					</view>
					<view class="text-wrapper_20">
						<text lines="1" class="text_26">-</text>
					</view>
					<view class="text-wrapper_21">
						<text lines="1" class="text_27">-</text>
					</view>
					<view class="text-wrapper_22">
						<text lines="1" class="text_28">-</text>
					</view>
					<view class="image-wrapper_1">
						<image
							src="https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPng85a9a430e00a68aae31d45d1f3033c77be0fd7b0b5c78fef3a7dc0ac45b72a46"
							class="thumbnail_4"></image>
						<image
							src="https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPng64bebf2a36b4b691ac52232696d4648c807f68b40d2f4b0ea79d3ac075dda240"
							class="label_1"></image>
					</view>
				</view>
			</view>

			<!-- mini键盘 -->
			<!-- 2S -->
			<GameKeyboard v-show="currentOption === 1 && currentOptionTwo === 1 " :items1="items1"
				:selectedItems1="selectedItems1" :handleClick1="handleClick1" :items2="items2"
				:selectedItems2="selectedItems2" :handleClick2="handleClick2" />
			<!-- 1S -->
			<GameKeyboard v-show="currentOption === 2 && currentOptionTwo === 1" :items1="items1S"
				:selectedItems1="selectedItems1S" :handleClick1="handleClick1S" :items2="items2S"
				:selectedItems2="selectedItems2S" :handleClick2="handleClick2S" />
			<!-- mini键盘 -->

			<!-- 九宫格键盘 -->
			<view class="Keyboard9" v-show="currentOption === 1 && currentOptionTwo === 2">
				<view class="box_12">
					<view v-for="num in [1, 2, 3]" :key="num" @click="handleClick9(num)"
						:class="{ 'highlighted': isSelected9(num), 'text-wrapper_23': !isSelected9(num) }">
						<text lines="1" class="text_29">{{ num }}</text>
					</view>
				</view>
				<view class="box_12">
					<view v-for="num in [4, 5, 6]" :key="num" @click="handleClick9(num)" class="text-wrapper_23"
						:class="{ 'highlighted': isSelected9(num) }">
						<text lines="1" class="text_29">{{ num }}</text>
					</view>
				</view>
				<view class="box_12">
					<view v-for="num in [7, 8, 9]" :key="num" @click="handleClick9(num)" class="text-wrapper_23"
						:class="{ 'highlighted': isSelected9(num) }">
						<text lines="1" class="text_29">{{ num }}</text>
					</view>
				</view>
				<view class="box_12">
					<view class="section_6" @click="handleDelete">
						<view class="image-text_6">
							<image
								src="https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPngf3c8e4ebcd5196c552597442ed829665a963ebaf6243656914f0fec1d2250a38"
								class="thumbnail_5"></image>
							<text lines="1" class="text-group_3">Delete</text>
						</view>
					</view>
					<view @click="handleClick9(0)" class="text-wrapper_23" :class="{ 'highlighted': isSelected9(0) }">
						<text lines="1" class="text_29">0</text>
					</view>
					<view class="section_7" @click="handleBack">
						<view class="image-text_7">
							<image
								src="https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPng1467db9dd09d153c0a03c0067e6f8d0ddc00973e4ffc2ea976954ce3b8532687"
								class="thumbnail_6"></image>
							<text lines="1" class="text-group_4">Back</text>
						</view>
					</view>
				</view>
			</view>
			<!-- 九宫格键盘 -->
			<!-- combinations -->
			<view class="Keyboard8" v-show="currentOption === 3">
				<view class="group_14">
					<view class="group_15">
						<view class="group_15_box" style="display: flex;flex-wrap: wrap;">
							<view v-for="(item, index) in data8" :key="index" @click="handleClick8(item,index)"
								:class="{ 'highlighted': item.highlighted, 'box_8': !item.highlighted }">
								<view class="text-group_12">
									<text lines="1" class="text_26">{{ item.label }}</text>
									<text lines="1" class="text_27">{{ item.value }}</text>
								</view>
							</view>
						</view>
					</view>
					<div class="box_10 flex-col"></div>
					<view class="group_15">
						<view class="group_15_box" style="display: flex;flex-wrap: wrap;">
							<view v-for="(item, index) in data9" :key="index" @click="handleClick8(item,index)"
								:class="{ 'highlighted': item.highlighted, 'box_88': !item.highlighted }">
								<view class="text-group_12">
									<text lines="1" class="text_26">{{ item.label }}</text>
									<text lines="1" class="text_27">{{ item.value }}</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- combinations -->
		</view>
		<template #bot>
			<GameFooter />
		</template>
	</Layout>
	<popup />
</template>

<script setup lang="ts">
	import { reactive, ref } from "vue";
	import popup from "@/components/game/popup/popup.vue";
	import GameHeader from "@/components/game/gameHeader.vue";
	import GameTime from "@/components/game/gameTime.vue";
	import Layout from "@/layout/index.vue";
	import GameHeaderTab from "@/components/game/gameHeaderTab.vue";
	import gameFlb from "@/components/game/gameFLB.vue";
	import GameFooter from "@/components/game/gameFooter.vue";
	import GameKeyboard from "@/components/game/gameKeyboard.vue";
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
	const currentOption = ref(1);

	const changeOption = (option : number) => {
		currentOption.value = option;
	};

	const currentOptionTwo = ref(1);

	const changeOptionTwo = (option : number) => {
		currentOptionTwo.value = option;
	};

	// mini键盘
	// 2S
	const items1 = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]);
	const selectedItems1 = ref([]);
	const handleClick1 = (item) => {
		if (selectedItems1.value.includes(item)) {
			selectedItems1.value = selectedItems1.value.filter((selectedItem1) => selectedItem1 !== item);
		} else {
			selectedItems1.value.push(item);
		}
	};

	const items2 = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]);
	const selectedItems2 = ref([]);
	const handleClick2 = (item) => {
		if (selectedItems2.value.includes(item)) {
			selectedItems2.value = selectedItems2.value.filter((selectedItem2) => selectedItem2 !== item);
		} else {
			selectedItems2.value.push(item);
		}
		console.log('选中的值:', selectedItems2.value);
	};

	// 1S
	const items1S = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]);
	const selectedItems1S = ref([]);
	const handleClick1S = (item) => {
		if (selectedItems1S.value.includes(item)) {
			selectedItems1S.value = selectedItems1S.value.filter((selectedItem1S) => selectedItem1S !== item);
		} else {
			selectedItems1S.value.push(item);
		}
		console.log('选中的值:', selectedItems1S.value);
	};

	const items2S = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]);
	const selectedItems2S = ref([]);
	const handleClick2S = (item) => {
		if (selectedItems2S.value.includes(item)) {
			selectedItems2S.value = selectedItems2S.value.filter((selectedItem2S) => selectedItem2S !== item);
		} else {
			selectedItems2S.value.push(item);
		}
		console.log('选中的值:', selectedItems2S.value);
	};
	// mini键盘

	// 九宫格键盘 
	const selectedNumbers = ref([]);
	const handleClick9 = (num) => {
		if (isSelected9(num)) {
			// 如果已经被选中，则从数组中移除
			selectedNumbers.value = selectedNumbers.value.filter((selectedNum) => selectedNum !== num);
			console.log(selectedNumbers)
		} else {
			// 如果没有被选中，则添加到数组中
			selectedNumbers.value.push(num);
			console.log(selectedNumbers)
		}
	};

	const isSelected9 = (num) => {
		// 判断数字是否在数组中
		return selectedNumbers.value.includes(num);
	};

	const handleBack = () => {
		if (selectedNumbers.value.length > 0) {
			selectedNumbers.value.splice(-1, 1);
			console.log(selectedNumbers)
		}
	};

	const handleDelete = () => {
		selectedNumbers.value = [];
		console.log(selectedNumbers)
	};
	// 九宫格键盘 
	const textItems = ref(['All', 'Big', 'Small', 'Odd', 'Even', 'Delete']);
	const activeText = ref('All');

	const handleTextClick = (item : string) => {
		activeText.value = item;
	};


	const data8 = ref([
		{ label: 'Big', value: '8.4398', highlighted: false },
		{ label: 'Odd', value: '8.4398', highlighted: false },
		{ label: 'Small', value: '8.4398', highlighted: false },
		{ label: 'Even', value: '8.4398', highlighted: false },

	]);
	const data9 = ref([
		{ label: 'Big', value: '8.4398', highlighted: false },
		{ label: 'Odd', value: '8.4398', highlighted: false },
		{ label: 'Small', value: '8.4398', highlighted: false },
		{ label: 'Even', value: '8.4398', highlighted: false },

	]);
	const clickedValues8 = ref([]);
	const handleClick8 = (item, index) => {
		item.highlighted = !item.highlighted;
		if (item.highlighted) {
			clickedValues8.value.push(item);
		} else {
			clickedValues8.value = clickedValues8.value.filter(value => value !== item);
		}
		console.log(clickedValues8)
	};

	const data1R = ref([
		{ id: 1, label: '01', value: '8.4398' },
		{ id: 2, label: '01', value: '8.4398' },
		{ id: 3, label: '01', value: '8.4398' },
		{ id: 4, label: '01', value: '8.4398' },
		{ id: 5, label: '01', value: '8.4398' },
		{ id: 6, label: '01', value: '8.4398' },
		{ id: 7, label: '01', value: '8.4398' },
		{ id: 8, label: '01', value: '8.4398' },
		{ id: 9, label: '01', value: '8.4398' },
		{ id: 10, label: '01', value: '8.4398' },
	]);
	const selectedData1R = ref([]);

	const handleClick1R = (item) => {
		// 判断是否已经在数组中
		const index = selectedData1R.value.findIndex((selectedItem1R) => selectedItem1R.id === item.id);

		// 切换选中状态
		if (index !== -1) {
			// 如果数组中已经有该项，则从数组中移除
			selectedData1R.value.splice(index, 1);
		} else {
			// 如果数组中没有该项，则添加
			selectedData1R.value.push(item);
		}

		console.log('选中的数据:', selectedData1R.value);
	};
	const isSelected = (item) => {
		return selectedData1R.value.some((selectedItem1R) => selectedItem1R.id === item.id);
	};
</script>

<style scoped lang="scss">
	.highlighted {
		background-color: #FFB023;
	}

	.text-wrapper_16.highlight,
	.text-wrapper_17.highlight,
	.text-wrapper_18.highlight,
	.group_1.highlighted,
	.text-wrapper_19.highlighted {
		background-color: #FFB023;
		color: #FFF;
		font-size: 28rpx;
		font-family: PingFangSC-Semibold;
		font-weight: 600;
		text-align: center;
		white-space: nowrap;
		line-height: 28rpx;
	}

	.block_7 {
		background-color: rgba(252, 239, 213, 1.000000);
		border-radius: 16rpx;
		// width: 686rpx;
		align-self: center;
		margin-top: 20rpx;
		display: flex;
		flex-direction: column;
		//padding: 32rpx 28rpx 28rpx 32rpx;
	}

	.box_19 {
		margin: 25rpx;
		flex-direction: row;
		display: flex;
		justify-content: space-between
	}

	.text-wrapper_16 {
		background-color: rgba(255, 226, 180, 1.000000);
		border-radius: 16rpx;
		display: flex;
		flex-direction: column;
		padding: 16rpx 46rpx 16rpx 46rpx;
	}

	.text_21 {
		overflow-wrap: break-word;
		/* 	color: rgba(255, 255, 255, 1); */
		font-size: 28rpx;
		font-family: PingFangSC-Semibold;
		/* 	font-weight: 600; */
		text-align: center;
		white-space: nowrap;
		line-height: 28rpx;
	}

	.text-wrapper_17 {
		background-color: rgba(255, 226, 180, 1.000000);
		border-radius: 16rpx;
		margin-left: 18rpx;
		display: flex;
		flex-direction: column;
		padding: 16rpx 56rpx 16rpx 58rpx;
	}

	.text_22 {
		overflow-wrap: break-word;
		/* 	color: rgba(255, 255, 255, 1); */
		font-size: 28rpx;
		font-family: PingFangSC-Semibold;
		/* 	font-weight: 600; */
		text-align: center;
		white-space: nowrap;
		line-height: 28rpx;
	}

	.text-wrapper_18 {
		background-color: rgba(255, 226, 180, 1.000000);
		border-radius: 16rpx;
		margin-left: 16rpx;
		display: flex;
		flex-direction: column;
		padding: 16rpx 6rpx 16rpx 10rpx;
	}

	.text_23 {
		overflow-wrap: break-word;
		/* color: rgba(51, 51, 51, 1); */
		font-size: 28rpx;
		font-family: PingFangSC-Regular;
		font-weight: normal;
		text-align: center;
		white-space: nowrap;
		line-height: 28rpx;
	}

	.box_20 {
		// width: 622rpx;
		flex-direction: row;
		display: flex;
		justify-content: space-between;
		margin: 0 25rpx;
	}

	.group_1 {
		background-color: rgba(255, 226, 180, 1.000000);
		border-radius: 16rpx;
		// width: 302rpx;
		flex-direction: row;
		display: flex;
		justify-content: space-between;
		padding: 14rpx 56rpx 14rpx 54rpx;
	}

	.icon_7 {
		width: 32rpx;
		height: 32rpx;
	}

	.image-text_3 {
		// width: 150rpx;
		flex-direction: row;
		display: flex;
		justify-content: space-between;
	}

	.image-text_4 {
		// width: 180rpx;
		flex-direction: row;
		display: flex;
		justify-content: space-between;
	}

	.text-group_2 {
		overflow-wrap: break-word;
		/* color: rgba(51, 51, 51, 1); */
		font-size: 28rpx;
		font-family: PingFangSC-Regular;
		font-weight: normal;
		text-align: center;
		white-space: nowrap;
		line-height: 28rpx;
	}

	.icon_8 {
		width: 32rpx;
		height: 32rpx;
	}

	.text-wrapper_19 {
		background-color: rgba(255, 226, 180, 1.000000);
		border-radius: 16rpx;
		display: flex;
		flex-direction: column;
		padding: 16rpx 86rpx 16rpx 84rpx;
	}

	.text_24 {
		overflow-wrap: break-word;
		/* color: rgba(51, 51, 51, 1); */
		font-size: 28rpx;
		font-family: PingFangSC-Regular;
		font-weight: normal;
		text-align: center;
		white-space: nowrap;
		line-height: 28rpx;
	}

	.box_21 {
		// width: 482rpx;
		flex-direction: row;
		display: flex;
		justify-content: space-around;
		margin: 16rpx 0rpx 0rpx 0rpx;

		.highlighted {
			background-color: #FFB023;
			border-radius: 8rpx;
			display: flex;
			flex-direction: column;
			padding: 8rpx 60rpx 8rpx 62rpx;

			.text_25,
			.text_26 {
				color: #fff;
			}
		}

		.text-wrapper_21 {
			background-color: rgba(162, 162, 162, 0.180000);
			border-radius: 8rpx;
			display: flex;
			flex-direction: column;
			padding: 8rpx 52rpx 8rpx 56rpx;
		}
	}

	.text-wrapper_20 {
		background-color: rgba(162, 162, 162, 0.180000);
		border-radius: 8rpx;
		display: flex;
		flex-direction: column;
		padding: 8rpx 60rpx 8rpx 62rpx;
	}

	.text_25 {
		overflow-wrap: break-word;
		color: rgba(51, 51, 51, 1);
		font-size: 28rpx;
		font-family: PingFangSC-Regular;
		font-weight: normal;
		text-align: center;
		white-space: nowrap;
		line-height: 28rpx;
	}



	.text_26 {
		overflow-wrap: break-word;
		color: rgba(51, 51, 51, 1);
		font-size: 28rpx;
		font-family: PingFangSC-Regular;
		font-weight: normal;
		text-align: center;
		white-space: nowrap;
		line-height: 28rpx;
	}

	.itembox_10 {
		.box_10 {
			margin: 25rpx 25rpx 0 25rpx;

			flex-direction: row;
			display: flex;
		}

		.text-wrapper_19 {
			background-color: rgba(255, 255, 255, 0.720000);
			border-radius: 8rpx;
			display: flex;
			flex-direction: column;
			padding: 14rpx 40rpx 14rpx 40rpx;
		}

		.text_25 {
			overflow-wrap: break-word;
			color: rgba(51, 51, 51, 1);
			font-size: 28rpx;
			font-family: PingFangSC-Semibold;
			font-weight: 600;
			text-align: center;
			white-space: nowrap;
			line-height: 40rpx;
		}

		.text-wrapper_20 {
			background-color: rgba(255, 255, 255, 0.720000);
			border-radius: 8rpx;
			margin-left: 16rpx;
			display: flex;
			flex-direction: column;
			padding: 14rpx 40rpx 14rpx 40rpx;
		}

		.text_26 {
			overflow-wrap: break-word;
			color: rgba(51, 51, 51, 1);
			font-size: 28rpx;
			font-family: PingFangSC-Semibold;
			font-weight: 600;
			text-align: center;
			white-space: nowrap;
			line-height: 40rpx;
		}

		.text-wrapper_21 {
			background-color: rgba(255, 255, 255, 0.720000);
			border-radius: 8rpx;
			margin-left: 16rpx;
			display: flex;
			flex-direction: column;
			padding: 14rpx 40rpx 14rpx 40rpx;
		}

		.text_27 {
			overflow-wrap: break-word;
			color: rgba(51, 51, 51, 1);
			font-size: 28rpx;
			font-family: PingFangSC-Semibold;
			font-weight: 600;
			text-align: center;
			white-space: nowrap;
			line-height: 40rpx;
		}

		.text-wrapper_22 {
			background-color: rgba(255, 255, 255, 0.720000);
			border-radius: 8rpx;
			margin-left: 16rpx;
			display: flex;
			flex-direction: column;
			padding: 14rpx 40rpx 14rpx 40rpx;
		}

		.text_28 {
			overflow-wrap: break-word;
			color: rgba(51, 51, 51, 1);
			font-size: 28rpx;
			font-family: PingFangSC-Semibold;
			font-weight: 600;
			text-align: center;
			white-space: nowrap;
			line-height: 40rpx;
		}

		.image-wrapper_1 {
			background-color: rgba(220, 224, 235, 0.410000);
			border-radius: 8rpx;
			// width: 160rpx;
			// margin-left: 22rpx;
			flex-direction: row;
			display: flex;
			flex: 1;
			justify-content: center;
			align-items: center;
			// padding: 10rpx 32rpx 10rpx 40rpx;
		}

		.thumbnail_4 {
			width: 28rpx;
			height: 28rpx;
			margin-top: 20rpx;
		}

		.label_1 {
			width: 48rpx;
			height: 48rpx;
		}
	}


	/* 九键 */
	.Keyboard9 {
		padding-bottom: 30rpx;

		.text-wrapper_23 {
			background-color: rgba(255, 255, 255, 1.000000);
			border-radius: 8rpx;
			display: flex;
			flex-direction: column;
			padding: 24rpx 82rpx 22rpx 84rpx;
		}

		.highlighted {
			background-color: #FFB023;
			border-radius: 8rpx;
			display: flex;
			flex-direction: column;
			padding: 24rpx 82rpx 22rpx 84rpx;
		}

		.highlighted:active,
		.text-wrapper_23:active,
		.section_6:active,
		.section_7:active {
			background-color: #FFB023;
			animation: text-wrapper_23 0.4s infinite;
		}

		@keyframes text-wrapper_23 {
			25% {
				transform: scaleX(1.2);
			}

			50% {
				transform: scaleX(0.8);
			}

			75% {
				transform: scaleX(1.1);
			}

			100% {
				transform: scaleX(1);
			}
		}

		.text_29 {
			overflow-wrap: break-word;
			color: rgba(51, 51, 51, 1);
			font-size: 48rpx;
			font-family: PingFangSC-Semibold;
			font-weight: 600;
			text-align: center;
			white-space: nowrap;
			line-height: 48rpx;
		}

		.box_12 {
			// width: 622rpx;
			margin-top: 32rpx;
			flex-direction: row;
			display: flex;
			justify-content: space-evenly;
		}

		.section_6 {
			background-color: rgba(255, 255, 255, 1.000000);
			border-radius: 8rpx;
			display: flex;
			flex-direction: row;
			padding: 16rpx 54rpx 10rpx 60rpx;
			transition: transform 0.3s ease-out;
		}

		.image-text_6 {
			display: flex;
			flex-direction: column;
		}

		.thumbnail_5 {
			width: 40rpx;
			height: 40rpx;
			margin: 0 18rpx 0 14rpx;
		}

		.text-group_3 {
			overflow-wrap: break-word;
			color: rgba(51, 51, 51, 1);
			font-size: 24rpx;
			font-family: PingFangSC-Regular;
			font-weight: normal;
			text-align: center;
			white-space: nowrap;
			line-height: 24rpx;
			margin-top: 4rpx;
		}



		.section_7 {
			background-color: rgba(255, 255, 255, 1.000000);
			border-radius: 8rpx;
			display: flex;
			flex-direction: row;
			padding: 16rpx 64rpx 10rpx 66rpx;
			transition: transform 0.3s ease-out;
		}

		.image-text_7 {
			display: flex;
			flex-direction: column;
		}

		.thumbnail_6 {
			width: 40rpx;
			height: 40rpx;
			margin: 0 10rpx 0 6rpx;
		}

		.text-group_4 {
			overflow-wrap: break-word;
			color: rgba(51, 51, 51, 1);
			font-size: 24rpx;
			font-family: PingFangSC-Regular;
			font-weight: normal;
			text-align: center;
			white-space: nowrap;
			line-height: 24rpx;
			margin-top: 4rpx;
		}
	}

	.oneBox {
		margin: 0 25rpx;
		padding-bottom: 25rpx;

		.text-wrapper_21 {
			// width: 622rpx;
			margin-top: 32rpx;
			flex-direction: row;
			display: flex;
			justify-content: space-between;

			.active {
				position: relative;
				overflow-wrap: break-word;
				color: rgba(255, 176, 35, 1);
				font-size: 28rpx;
				font-family: PingFangSC-Semibold;
				font-weight: 600;
				text-align: center;
				white-space: nowrap;
				line-height: 28rpx;

				&::after {
					content: '';
					display: block;
					width: 100%;
					height: 4rpx;
					background-color: rgba(255, 176, 35, 1.000000);
					/* 下边框颜色，根据需要调整 */
					position: absolute;
					bottom: -10rpx;
					left: 0;
				}
			}
		}

		.text_25 {
			overflow-wrap: break-word;
			color: rgba(255, 176, 35, 1);
			font-size: 28rpx;
			font-family: PingFangSC-Semibold;
			font-weight: 600;
			text-align: center;
			white-space: nowrap;
			line-height: 28rpx;
		}

		.text_26 {
			overflow-wrap: break-word;
			color: rgba(51, 51, 51, 1);
			font-size: 28rpx;
			font-family: PingFangSC-Regular;
			font-weight: normal;
			text-align: left;
			white-space: nowrap;
			line-height: 28rpx;
		}

		.text_27 {
			overflow-wrap: break-word;
			color: rgba(51, 51, 51, 1);
			font-size: 28rpx;
			font-family: PingFangSC-Regular;
			font-weight: normal;
			text-align: left;
			white-space: nowrap;
			line-height: 28rpx;
		}

		.text_28 {
			overflow-wrap: break-word;
			color: rgba(51, 51, 51, 1);
			font-size: 28rpx;
			font-family: PingFangSC-Regular;
			font-weight: normal;
			text-align: left;
			white-space: nowrap;
			line-height: 28rpx;
		}

		.text_29 {
			overflow-wrap: break-word;
			color: rgba(51, 51, 51, 1);
			font-size: 28rpx;
			font-family: PingFangSC-Regular;
			font-weight: normal;
			text-align: left;
			white-space: nowrap;
			line-height: 28rpx;
		}

		.text_30 {
			overflow-wrap: break-word;
			color: rgba(51, 51, 51, 1);
			font-size: 28rpx;
			font-family: PingFangSC-Regular;
			font-weight: normal;
			text-align: left;
			white-space: nowrap;
			line-height: 28rpx;
		}

		.box_4 {
			margin-top: 20rpx;

			.box_item {
				display: flex;
				flex-wrap: wrap;
			}

			.highlighted {
				border-radius: 8rpx;
				margin: 10rpx;
				flex: 1;
				padding: 16rpx 20rpx 16rpx 22rpx;
				background-color: #FFB023;
			}
		}

		.block_2 {
			background-color: rgba(255, 255, 255, 1.000000);
			border-radius: 8rpx;
			display: flex;
			flex-direction: row;
			padding: 16rpx 20rpx 16rpx 22rpx;
		}

		.text-group_11 {
			display: flex;
			flex-direction: column;
		}

		.text_31 {
			overflow-wrap: break-word;
			color: rgba(51, 51, 51, 1);
			font-size: 28rpx;
			font-family: PingFangSC-Medium;
			font-weight: 500;
			text-align: center;
			white-space: nowrap;
			line-height: 28rpx;
			align-self: center;
		}

		.text_32 {
			overflow-wrap: break-word;
			color: rgba(244, 60, 62, 1);
			font-size: 20rpx;
			font-family: PingFangSC-Regular;
			font-weight: normal;
			text-align: center;
			white-space: nowrap;
			line-height: 20rpx;
			margin-top: 8rpx;
		}

		.block_3 {
			background-color: rgba(255, 255, 255, 1.000000);
			border-radius: 8rpx;
			margin: 10rpx;
			flex: 1;
			padding: 16rpx 20rpx 16rpx 22rpx;
		}

		.block_2,
		.block_3 {
			transition: transform 0.3s ease-out;
		}

		.highlighted:active,
		.block_2:active,
		.block_3:active {

			background-color: #FFB023;
			animation: text-wrapper_23 0.4s infinite;
		}

		.text-group_12 {
			display: flex;
			flex-direction: column;
		}

		.text_33 {
			overflow-wrap: break-word;
			color: rgba(51, 51, 51, 1);
			font-size: 28rpx;
			font-family: PingFangSC-Medium;
			font-weight: 500;
			text-align: center;
			white-space: nowrap;
			line-height: 28rpx;
			align-self: center;
		}

		.text_34 {
			overflow-wrap: break-word;
			color: rgba(244, 60, 62, 1);
			font-size: 20rpx;
			font-family: PingFangSC-Regular;
			font-weight: normal;
			text-align: center;
			white-space: nowrap;
			line-height: 20rpx;
			margin-top: 8rpx;
		}

		.block_4 {
			background-color: rgba(255, 255, 255, 1.000000);
			border-radius: 8rpx;
			margin-left: 22rpx;
			display: flex;
			flex-direction: row;
			padding: 16rpx 20rpx 16rpx 22rpx;
		}

		.text-group_13 {
			display: flex;
			flex-direction: column;
		}

		.text_35 {
			overflow-wrap: break-word;
			color: rgba(51, 51, 51, 1);
			font-size: 28rpx;
			font-family: PingFangSC-Medium;
			font-weight: 500;
			text-align: center;
			white-space: nowrap;
			line-height: 28rpx;
			align-self: center;
		}

		.text_36 {
			overflow-wrap: break-word;
			color: rgba(244, 60, 62, 1);
			font-size: 20rpx;
			font-family: PingFangSC-Regular;
			font-weight: normal;
			text-align: center;
			white-space: nowrap;
			line-height: 20rpx;
			margin-top: 8rpx;
		}

		.block_5 {
			background-color: rgba(255, 255, 255, 1.000000);
			border-radius: 8rpx;
			margin-left: 20rpx;
			display: flex;
			flex-direction: row;
			padding: 16rpx 20rpx 16rpx 22rpx;
		}

		.text-group_14 {
			display: flex;
			flex-direction: column;
		}

		.text_37 {
			overflow-wrap: break-word;
			color: rgba(51, 51, 51, 1);
			font-size: 28rpx;
			font-family: PingFangSC-Medium;
			font-weight: 500;
			text-align: center;
			white-space: nowrap;
			line-height: 28rpx;
			align-self: center;
		}

		.text_38 {
			overflow-wrap: break-word;
			color: rgba(244, 60, 62, 1);
			font-size: 20rpx;
			font-family: PingFangSC-Regular;
			font-weight: normal;
			text-align: center;
			white-space: nowrap;
			line-height: 20rpx;
			margin-top: 8rpx;
		}

		.block_6 {
			background-color: rgba(255, 255, 255, 1.000000);
			border-radius: 8rpx;
			margin-left: 20rpx;
			display: flex;
			flex-direction: row;
			padding: 16rpx 20rpx 16rpx 22rpx;
		}

		.text-group_15 {
			display: flex;
			flex-direction: column;
		}

		.text_39 {
			overflow-wrap: break-word;
			color: rgba(51, 51, 51, 1);
			font-size: 28rpx;
			font-family: PingFangSC-Medium;
			font-weight: 500;
			text-align: center;
			white-space: nowrap;
			line-height: 28rpx;
			align-self: center;
		}

		.text_40 {
			overflow-wrap: break-word;
			color: rgba(244, 60, 62, 1);
			font-size: 20rpx;
			font-family: PingFangSC-Regular;
			font-weight: normal;
			text-align: center;
			white-space: nowrap;
			line-height: 20rpx;
			margin-top: 8rpx;
		}
	}

	.Keyboard8 {
		.group_14 {
			margin-top: 32rpx;
			flex-direction: row;
			display: flex;
			justify-content: space-between;
			padding: 0rpx 25rpx 0rpx 25rpx;

			.box_10 {
				background-color: rgba(255, 176, 35, 0.300000);
				width: 2rpx;
				height: 586rpx;
				margin-right: 15rpx;
				display: flex;
				flex-direction: column;
			}
		}

		.group_15 {
			.highlighted {
				background-color: #FFB023;
				border-radius: 4px;
				width: 140rpx;
				margin-bottom: 20rpx;
				margin-right: 15rpx;
				padding: 10rpx 0rpx;
			}
		}

		.box_8,
		.box_88 {
			background-color: rgba(255, 255, 255, 1);
			border-radius: 4px;
			width: 140rpx;
			margin-bottom: 20rpx;
			margin-right: 15rpx;
			padding: 10rpx 0rpx;
		}

		.text-group_12 {
			display: flex;
			flex-direction: column;
		}

		.tag_4,
		.box_8,
		.box_88 {
			transition: transform 0.3s ease-out;
		}

		.highlighted:active,
		.box_88:active,
		.box_8:active,
		.tag_4:active,
		{
		animation: text-wrapper_23 0.4s infinite;
		background-color: #FFB023;
	}

	.text_26 {
		overflow-wrap: break-word;
		color: rgba(51, 51, 51, 1);
		font-size: 28rpx;
		font-family: PingFangSC-Semibold;
		font-weight: 600;
		text-align: center;
		white-space: nowrap;
		line-height: 28rpx;
		margin: 0 10rpx 0 12rpx;
	}

	.text_27 {
		overflow-wrap: break-word;
		color: rgba(244, 60, 62, 1);
		font-size: 20rpx;
		font-family: PingFangSC-Regular;
		font-weight: normal;
		text-align: center;
		white-space: nowrap;
		line-height: 20rpx;
		margin-top: 8rpx;
	}

	.tag_4 {
		background-color: rgba(255, 255, 255, 1.000000);
		border-radius: 8rpx;
		margin-top: 16rpx;
		display: flex;
		flex-direction: row;
		padding: 16rpx 32rpx 16rpx 32rpx;
	}

	.text-group_13 {
		display: flex;
		flex-direction: column;
	}

	.text_28 {
		overflow-wrap: break-word;
		color: rgba(51, 51, 51, 1);
		font-size: 28rpx;
		font-family: PingFangSC-Semibold;
		font-weight: 600;
		text-align: center;
		white-space: nowrap;
		line-height: 28rpx;
		margin: 0 6rpx 0 4rpx;
	}

	.text_29 {
		overflow-wrap: break-word;
		color: rgba(244, 60, 62, 1);
		font-size: 20rpx;
		font-family: PingFangSC-Regular;
		font-weight: normal;
		text-align: center;
		white-space: nowrap;
		line-height: 20rpx;
		margin-top: 8rpx;
	}

	.group_16 {
		display: flex;
		flex-direction: column;
		margin: 0 0 394rpx 16rpx;
	}

	.block_1 {
		background-color: rgba(255, 255, 255, 1.000000);
		border-radius: 8rpx;
		display: flex;
		flex-direction: row;
		padding: 16rpx 28rpx 16rpx 28rpx;
	}

	.text-group_14 {
		display: flex;
		flex-direction: column;
	}

	.text_30 {
		overflow-wrap: break-word;
		color: rgba(51, 51, 51, 1);
		font-size: 28rpx;
		font-family: PingFangSC-Semibold;
		font-weight: 600;
		text-align: center;
		white-space: nowrap;
		line-height: 28rpx;
	}

	.text_31 {
		overflow-wrap: break-word;
		color: rgba(244, 60, 62, 1);
		font-size: 20rpx;
		font-family: PingFangSC-Regular;
		font-weight: normal;
		text-align: center;
		white-space: nowrap;
		line-height: 20rpx;
		align-self: center;
		margin-top: 8rpx;
	}

	.tag_5 {
		background-color: rgba(255, 255, 255, 1.000000);
		border-radius: 8rpx;
		margin-top: 16rpx;
		display: flex;
		flex-direction: row;
		padding: 16rpx 32rpx 16rpx 32rpx;
	}

	.text-group_15 {
		display: flex;
		flex-direction: column;
	}

	.text_32 {
		overflow-wrap: break-word;
		color: rgba(51, 51, 51, 1);
		font-size: 28rpx;
		font-family: PingFangSC-Semibold;
		font-weight: 600;
		text-align: center;
		white-space: nowrap;
		line-height: 28rpx;
	}

	.text_33 {
		overflow-wrap: break-word;
		color: rgba(244, 60, 62, 1);
		font-size: 20rpx;
		font-family: PingFangSC-Regular;
		font-weight: normal;
		text-align: center;
		white-space: nowrap;
		line-height: 20rpx;
		margin-top: 8rpx;
	}



	.group_17 {
		display: flex;
		flex-direction: column;
		margin: 0 0 394rpx 32rpx;
	}

	.box_12 {
		background-color: rgba(255, 255, 255, 1.000000);
		border-radius: 8rpx;
		display: flex;
		flex-direction: row;
		padding: 16rpx 32rpx 16rpx 32rpx;
	}

	.text-group_16 {
		display: flex;
		flex-direction: column;
	}

	.text_34 {
		overflow-wrap: break-word;
		color: rgba(51, 51, 51, 1);
		font-size: 28rpx;
		font-family: PingFangSC-Semibold;
		font-weight: 600;
		text-align: center;
		white-space: nowrap;
		line-height: 28rpx;
		margin: 0 12rpx 0 10rpx;
	}

	.text_35 {
		overflow-wrap: break-word;
		color: rgba(244, 60, 62, 1);
		font-size: 20rpx;
		font-family: PingFangSC-Regular;
		font-weight: normal;
		text-align: center;
		white-space: nowrap;
		line-height: 20rpx;
		margin-top: 8rpx;
	}

	.tag_6 {
		background-color: rgba(255, 255, 255, 1.000000);
		border-radius: 8rpx;
		margin-top: 16rpx;
		display: flex;
		flex-direction: row;
		padding: 16rpx 32rpx 16rpx 32rpx;
	}

	.text-group_17 {
		display: flex;
		flex-direction: column;
	}

	.text_36 {
		overflow-wrap: break-word;
		color: rgba(51, 51, 51, 1);
		font-size: 28rpx;
		font-family: PingFangSC-Semibold;
		font-weight: 600;
		text-align: center;
		white-space: nowrap;
		line-height: 28rpx;
		margin: 0 4rpx 0 6rpx;
	}

	.text_37 {
		overflow-wrap: break-word;
		color: rgba(244, 60, 62, 1);
		font-size: 20rpx;
		font-family: PingFangSC-Regular;
		font-weight: normal;
		text-align: center;
		white-space: nowrap;
		line-height: 20rpx;
		margin-top: 8rpx;
	}

	.group_18 {
		display: flex;
		flex-direction: column;
		margin: 0 0 394rpx 16rpx;
	}

	.group_4 {
		background-color: rgba(255, 255, 255, 1.000000);
		border-radius: 8rpx;
		display: flex;
		flex-direction: row;
		padding: 16rpx 28rpx 16rpx 28rpx;
	}

	.text-group_18 {
		display: flex;
		flex-direction: column;
	}

	.text_38 {
		overflow-wrap: break-word;
		color: rgba(51, 51, 51, 1);
		font-size: 28rpx;
		font-family: PingFangSC-Semibold;
		font-weight: 600;
		text-align: center;
		white-space: nowrap;
		line-height: 28rpx;
	}

	.text_39 {
		overflow-wrap: break-word;
		color: rgba(244, 60, 62, 1);
		font-size: 20rpx;
		font-family: PingFangSC-Regular;
		font-weight: normal;
		text-align: center;
		white-space: nowrap;
		line-height: 20rpx;
		align-self: center;
		margin-top: 8rpx;
	}

	.group_5 {
		background-color: rgba(255, 255, 255, 1.000000);
		border-radius: 8rpx;
		margin-top: 16rpx;
		display: flex;
		flex-direction: row;
		padding: 16rpx 32rpx 16rpx 32rpx;
	}

	.text-group_19 {
		display: flex;
		flex-direction: column;
	}

	.text_40 {
		overflow-wrap: break-word;
		color: rgba(51, 51, 51, 1);
		font-size: 28rpx;
		font-family: PingFangSC-Semibold;
		font-weight: 600;
		text-align: center;
		white-space: nowrap;
		line-height: 28rpx;
	}

	.text_41 {
		overflow-wrap: break-word;
		color: rgba(244, 60, 62, 1);
		font-size: 20rpx;
		font-family: PingFangSC-Regular;
		font-weight: normal;
		text-align: center;
		white-space: nowrap;
		line-height: 20rpx;
		margin-top: 8rpx;
	}
	}
</style>