<template>
	<Layout>
		<template #top>
			<GameHeader :active-title=titleData />
		</template>
		<GameHeaderTab :typeTab="typeTab" />
		<gameFlb />
		<GameTime />
		<view class="block_7">
			<view class="box_19">
				<view v-for="(gamePlayType, index) in gamePlayAndTypeListRespList" :key="index">
					<view class="text-wrapper_16"
						:class="{ 'highlight': currentOption === gamePlayType.gamePlayTypeName }"
						@click="changeOption(gamePlayType.gamePlayTypeName)">
						<text lines="1" decode="true" class="text_21">{{ gamePlayType.gamePlayTypeName }}</text>
					</view>
				</view>
			</view>

			<view class="box_20">
				<view v-for="(gamePlay, index) in gamePlayList" :key="index" class="group_1"
					:class="{ 'highlighted': currentOptionTwo === gamePlay.gamePlayName }"
					@click="changeOptionTwo(gamePlay.gamePlayName)">
					<view class="image-text_3">
						<text lines="1" class="text-group_2">{{ gamePlay.gamePlayName }}</text>
					</view>
				</view>
			</view>




			<view class="box_21">
				<view class='text-wrapper_20'>
					<text lines="1" class="text_25">1st</text>
				</view>
				<view class='text-wrapper_20'>
					<text lines="1" class="text_26">2nd</text>
				</view>
			</view>

			<!-- mini键盘 -->
			<!-- 2d复试 -->
			<GameKeyboard v-show="currentOptionTwo === '2d_复式'" :items1="items1" :selectedItems1="selectedItems1"
				:handleClick1="handleClick1" :items2="items2" :selectedItems2="selectedItems2"
				:handleClick2="handleClick2" />
			<!-- 1S -->

			<!-- 2d 1位 -->
			<GameKeyboard v-show="currentOptionTwo === '2d_1位'" :items1="items1S" :selectedItems1="selectedItems1S"
				:handleClick1="handleClick1S" :items2="items2S" :selectedItems2="selectedItems2S"
				:handleClick2="handleClick2S" />
			<!-- mini键盘 -->

			<!-- 九宫格键盘 -->
			<!-- 九宫格键盘 -->
			<!-- 2d组合 -->
			<view class="Keyboard8" v-show="currentOptionTwo === '2d_组合'">
				<view class="group_14">
					<view class="group_15">
						<view class="group_15_box" style="display: flex;flex-wrap: wrap;">
							<view v-for="(item, index) in data8" :key="index" @click="handleClick8st(item,index)"
								:selectedItems8s="selectedItems8st"
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
							<view v-for="(item, index) in data9" :key="index" @click="handleClick8nd(item,index)"
								:selectedItems8n="selectedItems8nd"
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
			<!-- 2d组合 -->
		</view>
		<!-- <template #bot>
			<GameFooter />
		</template> -->
		<template #bot>
			<Footer @click-handle="show = true" :num="current" />
		</template>
	</Layout>
	<!-- <popup /> -->
	<BetListPopPL :show="show" @close="show = false" :list="selectedValues" @del="delBetList" @bet="bet"
		@update:newTimes="handleNewTimes" :totalBets="current"/>
</template>

<script setup lang="ts">
	import { reactive, ref, computed, defineProps } from "vue";
	// import popup from "@/components/game/popup/popup.vue";
	import Footer from "@/components/game/YN/Footer.vue";
	import BetListPopPL from "@/components/game/YN/BetListPopPL.vue";
	import GameHeader from "@/components/game/gameHeader.vue";
	import GameTime from "@/components/game/gameTime.vue";
	import Layout from "@/layout/index.vue";
	import GameHeaderTab from "@/components/game/gameHeaderTab.vue";
	import gameFlb from "@/components/game/gameFLB.vue";
	import GameKeyboard from "@/components/game/gameKeyboard.vue";
	import { get, post, UrlType } from "@/api";
	import { onLoad } from "@dcloudio/uni-app";
	const Router = ref(); //url信息
	// 明确声明 props
	const props = defineProps(['gameId', 'type', 'code', 'name', 'vndArea']);
	const titleData = ref([]);
	const gamePlayAndTypeListRespList = ref([]);
	const gamePlayList = ref([]);
	const betMainReq = ref(); //开奖信息
	const newTimes = ref([]);
	const handleNewTimes = (times) => {
		newTimes.value = times;
	};
	onLoad(async (data : any) => {
		Router.value = data;
		let res = await post({
			url: "/gameRecords/gamePlayAndType",
			data: { gameId: data.gameId },
		});
		titleData.value = res.resultSet.gameName
		gamePlayAndTypeListRespList.value = res.resultSet.gamePlayAndTypeListRespList;
		gamePlayList.value = gamePlayAndTypeListRespList.value[0]?.gamePlayList || [];

		const getAwardNum = await post({
			url: "/getAwardNum",
			data: { gameCode: data.code },
		});

		if (getAwardNum.resultSet && getAwardNum.resultSet.awardNum !== undefined && getAwardNum.resultSet.awardNum !== null) {
			betMainReq.value = getAwardNum.resultSet.awardNum;
			// console.log(betMainReq.value);
		} else {
			// 没有数据的情况，通过消息提示框通知用户
			uni.showToast({
				title: '未找到奖号数据',
				icon: 'none',
				duration: 2000,
			});
		}
	})
	const bet = () => {
		if (selectedValues.value.length) {
			post({
				url: "/bet",
				data: {
					awardPeriod: betMainReq.value.lastAwardPeriod, //奖期
					gameCode: Router.value.code,
					betInfos: selectedValues.value.map((item) => {
						const selectedGamePlay = gamePlayAndTypeListRespList.value.find(
							(play) => play.gamePlayTypeName === item.gamePlayName
						);
						return {
							betNums: [].concat(...item.betNums),
							gamePlayCode: item.gamePlayCode,
							gamePlayTypeCode: selectedGamePlay ? selectedGamePlay.gamePlayTypeCode : '',
							oneBetAmount: isNaN(parseInt(newTimes.value)) || parseInt(newTimes.value) === 1 ? item.betAmount : parseInt(newTimes.value),
							sumAmount: isNaN(parseInt(newTimes.value)) || parseInt(newTimes.value) === 1 ? item.betNums.length * item.betAmount : parseInt(newTimes.value) * item.betNums.length,
							winAmount: isNaN(parseInt(newTimes.value)) || parseInt(newTimes.value) === 1 ? item.betNums.length * item.winAmount : item.winAmount,
						};
					}),
				},
			},
				UrlType.bet
			)
				.then((res) => {
					uni.showToast({
						icon: 'success',
						title: res.resDesc
					});
					selectedValues.value.forEach((item) => {
						delBetList(item);
						console.log(item)
					});
					// 投注成功后查看当前用户余额
					get({
						url: "/memberWallet",
					})
						.then((response) => {
							uni.showToast({
								icon: 'success',
								title: response.resDesc
							});
						})
						.catch((error) => {
							uni.showToast({
								icon: 'error',
								title: error.resDesc
							});
						});
				})
				.catch((res) => {
					uni.showToast({
						icon: 'error',
						title: res.resDesc
					});

				});
		} else {
			uni.showToast({
				icon: 'error',
				title: '无选号'
			});
		}
	};


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
	// 投注弹出层
	const show = ref(false); //弹出层的显示隐藏



	// 存储2D下的选中值
	const selectedValues = computed(() => {
		return [
			...selectedValues2D.value,
			...selectedValues1D.value,
			...selectedValues3C.value,

		];
	});

	const updateSelectedValues = (gamePlayNameValue) => {
		selectedValues.value = [

		];
	};

	// 2d头层类型
	const currentOption = ref('2D');
	const changeOption = (gamePlayName) => {
		currentOption.value = gamePlayName;
	};

	// 2D玩法
	const currentOptionTwo = ref('2d_复式');
	const changeOptionTwo = (gamePlayName) => {
		currentOptionTwo.value = gamePlayName;
	};

	// 大小注
	const data8 = ref([
		{ label: '大', value: '8.4398', highlighted: false },
		{ label: '单', value: '8.4398', highlighted: false },
		{ label: '小', value: '8.4398', highlighted: false },
		{ label: '双', value: '8.4398', highlighted: false },

	]);
	const data9 = ref([
		{ label: '大', value: '8.4398', highlighted: false },
		{ label: '单', value: '8.4398', highlighted: false },
		{ label: '小', value: '8.4398', highlighted: false },
		{ label: '双', value: '8.4398', highlighted: false },

	]);
	const clickedValues8st = ref([]);
	const selectedItems8st = ref([]);
	const selectedItems8nd = ref([]);
	const selectedValues3C = ref([]);
	// 处理点击事件的函数
	const handleClick3C = (item, selectedItems, gameType) => {
		if (selectedItems.value.includes(item)) {
			selectedItems.value = selectedItems.value.filter((selectedItem) => selectedItem !== item);
		} else {
			selectedItems.value.push(item);
		}
		// 更新 selectedValues2D 的数据
		updateSelectedValues3C(gameType);
	};
	// 创建更新 selectedValues3C 的函数
	const updateSelectedValues3C = (gameType) => {
		// 清空数组，重新添加被选中的元素
		const betNums = [];

		// 处理1st的数据
		for (const item of data8.value) {
			if (item.highlighted) {
				betNums.push(`${item.label}_1`);
			}
		}

		// 处理2nd的数据
		for (const item of data9.value) {
			if (item.highlighted) {
				betNums.push(`${item.label}_2`);
			}
		}

		const selectedGamePlay = gamePlayList.value.find(
			(play) => play.gamePlayName === currentOptionTwo.value
		);

		const selectedGamePlayCode = selectedGamePlay?.gamePlayCode || '';
		const selectedGamePlayId = selectedGamePlay?.gamePlayId || '';
		const winAmount = selectedGamePlay?.winAmount || 0;
		const betAmount = selectedGamePlay?.betAmount || 0;

		selectedValues3C.value = [
			{
				gamePlayName: currentOption.value,
				gamePlayTypeName: currentOptionTwo.value,
				gamePlayCode: selectedGamePlayCode,
				gamePlayId: selectedGamePlayId,
				betNums: betNums,
				winAmount: winAmount,
				betAmount: betAmount,
			},
		];
		console.log(selectedValues3C.value);
	};


	const handleClick8st = (item, index) => {
		item.highlighted = !item.highlighted;

		handleClick3C(item, selectedItems8st, '1st');
	};
	const handleClick8nd = (item, index) => {
		item.highlighted = !item.highlighted;

		handleClick3C(item, selectedItems8nd, '2nd');
	};

	// 2d_1位
	const items1S = ref(Array.from({ length: 31 }, (_, index) => (index + 1).toString().padStart(2, '0')));
	const items2S = ref(Array.from({ length: 31 }, (_, index) => (index + 1).toString().padStart(2, '0')));
	const selectedItems1S = ref([]);
	const selectedItems2S = ref([]);

	// 处理点击事件的函数
	const handleClick1b = (item, selectedItems, gameType) => {
		if (selectedItems.value.includes(item)) {
			selectedItems.value = selectedItems.value.filter((selectedItem) => selectedItem !== item);
		} else {
			selectedItems.value.push(item);
		}
		// 更新 selectedValues2D 的数据
		updateSelectedValues1D(gameType);

	};
	const handleClick1S = (item) => {
		handleClick1b(item, selectedItems1S, '1st');
	};

	const handleClick2S = (item) => {
		handleClick1b(item, selectedItems2S, '2nd');
	};
	const selectedValues1D = ref([]);
	// 创建更新 selectedValues1D 的函数
	const updateSelectedValues1D = (gameType) => {
		const betNums = [];

		selectedItems1S.value.forEach((item1) => {
			betNums.push(`${item1}_1`);
		});

		selectedItems2S.value.forEach((item2) => {
			betNums.push(`${item2}_2`);
		});

		const selectedGamePlay = gamePlayList.value.find(
			(play) => play.gamePlayName === currentOptionTwo.value
		);

		const selectedGamePlayCode = selectedGamePlay?.gamePlayCode || '';
		const selectedGamePlayId = selectedGamePlay?.gamePlayId || '';
		const winAmount = selectedGamePlay?.winAmount
		const betAmount = selectedGamePlay?.betAmount

		selectedValues1D.value = [
			{
				gamePlayName: currentOption.value,
				gamePlayTypeName: currentOptionTwo.value,
				gamePlayCode: selectedGamePlayCode,
				gamePlayId: selectedGamePlayId,
				betNums: betNums,
				winAmount: winAmount,
				betAmount: betAmount,
			},
		];
	};

	// ___2d_1位end

	// 2d复试
	const items1 = ref(Array.from({ length: 31 }, (_, index) => (index + 1).toString().padStart(2, '0')));
	const items2 = ref(Array.from({ length: 31 }, (_, index) => (index + 1).toString().padStart(2, '0')));
	const selectedItems1 = ref([]);
	const selectedItems2 = ref([]);
	// 处理点击事件的函数
	const handleClick = (item, selectedItems, gameType) => {
		if (selectedItems.value.includes(item)) {
			selectedItems.value = selectedItems.value.filter((selectedItem) => selectedItem !== item);
		} else {
			selectedItems.value.push(item);
		}
		// 更新 selectedValues2D 的数据
		updateSelectedValues2D(gameType);

	};
	const handleClick1 = (item) => {
		handleClick(item, selectedItems1, '1st');
	};

	const handleClick2 = (item) => {
		handleClick(item, selectedItems2, '2nd');
	};
	const selectedValues2D = ref([]);
	// 定义更新 selectedValues2D 的函数
	const updateSelectedValues2D = () => {
		const betNums = [];

		if (selectedItems1.value.length > 0 && selectedItems2.value.length > 0) {
			for (const item1 of selectedItems1.value) {
				for (const item2 of selectedItems2.value) {
					if (currentOptionTwo.value === '2d_复式') {
						// 当选择的是 '2d_复式' 时，拼接两个值
						betNums.push(`${item1}&${item2}`);
					} else if (currentOptionTwo.value === '2d_1位') {
						// 当选择的是 '2d_1位' 时，分别处理两个值
						betNums.push(`${item1}_1`);
						betNums.push(`${item2}_2`);
					}
					// 其他情况可以根据实际需求进行处理
				}
			}
		}

		const selectedGamePlay = gamePlayList.value.find(
			(play) => play.gamePlayName === currentOptionTwo.value
		);
		const selectedGamePlayCode = selectedGamePlay?.gamePlayCode || '';
		const selectedGamePlayId = selectedGamePlay?.gamePlayId || '';
		const winAmount = selectedGamePlay?.winAmount;
		const betAmount = selectedGamePlay?.betAmount;

		selectedValues2D.value = [
			{
				gamePlayName: currentOption.value,
				gamePlayTypeName: currentOptionTwo.value,
				gamePlayCode: selectedGamePlayCode,
				gamePlayId: selectedGamePlayId,
				betNums: betNums,
				winAmount: winAmount,
				betAmount: betAmount,
			},
		];
	};



	// ~~~2d复试end

	// 定义一个处理删除事件的方法
	const delBetList = (val) => {
		const gamePlayTypeName = val.gamePlayTypeName;
		if (val.gamePlayName == '2D') {
			selectedValues2D.value = selectedValues2D.value.filter(
				(item) => item.gamePlayTypeName !== gamePlayTypeName
			);
			selectedItems1.value = [];
			selectedItems2.value = [];
			selectedValues1D.value = selectedValues1D.value.filter(
				(item) => item.gamePlayTypeName !== gamePlayTypeName
			);
			selectedItems1S.value = [];
			selectedItems2S.value = [];
			selectedValues3C.value = selectedValues3C.value.filter(
				(item) => item.gamePlayTypeName !== gamePlayTypeName
			);
			data8.value.forEach(item => item.highlighted = false);
			data9.value.forEach(item => item.highlighted = false);
		}
	};
	// 标注数量
	const current = computed(() => {
		let num = 0;
		selectedValues.value.forEach((item) => {
			num += item.betNums.length;
		});
		return num;
	});
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
		// align-self: center;
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
		font-size: 28rpx;
		font-family: PingFangSC-Regular;
		font-weight: normal;
		text-align: center;
		white-space: nowrap;
		line-height: 28rpx;
	}

	.Keyboard8 {
		.group_14 {
			margin-top: 32rpx;
			flex-direction: row;
			display: flex;
			justify-content: space-evenly;
			padding: 0rpx 25rpx 0rpx 25rpx;

			.box_10 {
				background-color: rgba(255, 176, 35, 0.300000);
				width: 2rpx;
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
				color: #FFF;
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
		animation: heartBeat 1s;
		animation-duration: 1s;
		animation-timing-function: ease;
		animation-delay: 0s;
		animation-iteration-count: 1;
		animation-direction: normal;
		animation-fill-mode: none;
		animation-play-state: running;
		animation-name: heartBeat;
		animation-timeline: auto;
		animation-range-start: normal;
		animation-range-end: normal;
		background-color: #FFB023;
	}

	.text_26 {
		overflow-wrap: break-word;
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
	}
</style>