<template>
	<Layout>
		<template #top>
			<GameHeader :showContent="false" activeTitle="越南30秒彩" />
		</template>
		<GameHeaderTab :typeTab="typeTab" />
		<GameContent />
		<!-- <GameTime /> -->
		<!-- <gameTime :ac="gameAwardConfig"/> -->

		<!-- 选择2D,3D,PL2,PL3 -->
		<GameType @cutGameType="(val)=>playingMethod=val.gamePlayTypeName" :typeList="typeList" />
		<!-- 地区选择 -->
		<!-- <CitySelection :background-image="urls1" :list="southCityList" @change="changeCitySelection"/> -->

		<!-- 2D----------------------------------- -->
		<GameMethod :background-image="urls1" @change="(val)=>active2Dmethod=val" v-show="playingMethod == '2D'"
			:fredList="method2DList" />
		<KeyNum :background-image="urls1" :showHeader="false" @changeNum="(val)=>active2Dnum=val"
			v-show="playingMethod == '2D'" :unlock="active2Dmethod.length" :numList="keyNum2Ddata" />
		<!-- 3D-------------------------------------- -->
		<GameMethod :background-image="urls1" @change="(val)=>active3Dmethod=val" v-show="playingMethod == '3D'"
			:fredList="method3DList" />

		<KeyNum :background-image="urls1" :showHeader="true" @changeNum="(val)=>active3Dnum=val"
			v-show="playingMethod == '3D'" :unlock="active3Dmethod.length" :numList="keyNum3Ddata" />


		<!-- PL -->
		<GameMethod :background-image="urls1" @change="(val:any)=>activePLmethod=val.gamePlayName"
			v-show="playingMethod == 'PL2/PL3'" :fredList="methodPLList" :radio="true" />
		<KeyNum :background-image="urls1" @changeNum="(val:any)=>activePL2num=val"
			v-show="activePLmethod == 'PL2'&&playingMethod=='PL2/PL3'" :numList="keyNumPL2data" :unlock="true"
			:astrict="2" />

		<KeyNum :background-image="urls1" @changeNum="(val)=>activePL3num=val" v-show="activePLmethod == 'PL3'"
			:numList="keyNumPL3data" :unlock="true" :astrict="3" />
		<template #bot>
			<Footer @click-handle="show = true" :num="current" />
		</template>
	</Layout>

	<BetListPop :show="show" @close="show = false" :list="betlist" @del="delBetList" @bet="bet" />
</template>
<script lang="ts" setup>
	import { reactive, ref, computed, onBeforeUpdate } from "vue";
	import GameHeader from "@/components/game/gameHeader.vue";
	import GameTime from "@/components/game/gameTime.vue";
	import gameTime from "@/components/game/gameTime/index.vue";

	import Layout from "@/layout/index.vue";
	import GameHeaderTab from "@/components/game/gameHeaderTab.vue";
	import GameContent from "@/components/game/gameContent.vue";
	import Footer from "@/components/game/YN/Footer.vue";
	import GameType from "@/components/game/YN/GameType.vue";
	import BetListPop from "@/components/game/YN/BetListPop.vue";

	import CitySelection from "@/components/game/YN/CitySelection.vue";
	import { onLoad } from "@dcloudio/uni-app";
	import { get, post, UrlType } from "@/api";
	import GameMethod from "@/components/game/YN/GameMethod.vue";
	import KeyNum from "@/components/game/YN/KeyNum.vue";
	import { UUID } from "@/utils/uuid";
	const Router = ref(); //url信息
	onLoad(async (data : any) => {
		Router.value = data;
		let res = await post({
			url: "/gameRecords/gamePlayAndType",
			data: { gameId: data.gameId, merchantId: 1 },
		});
		let list = res.resultSet.gamePlayAndTypeListRespList;
		// 只要接口里的2d,3d,pl2,pl3
		list = list.filter((item : any) => {
			if (item.gamePlayTypeName === "2D") return item;
			if (item.gamePlayTypeName === "3D") return item;
			if (item.gamePlayTypeName === "PL2/PL3") return item;
		});
		// 换位置
		[list[0], list[1], list[2]] = [list[1], list[2], list[0]];
		console.log(list)

		// 加checked,第一个默认选中
		list = list.map((item : any, index : number) => {
			return { ...item, checked: !index ? true : false };
		});
		// 定义2d3dpl类型
		typeList.value = list;
		// 定义2d玩法类型,头尾
		let arr = [1, 1, 2, 18, 7];
		method2DList.value = list
			.find((item : any) => item.gamePlayTypeName == "2D")
			.gamePlayList.map((val : any, index : number) => {
				return { ...val, checked: false, sum: arr[index] };
			});
		// 定义3d玩法类型,头尾
		method3DList.value = list
			.find((item : any) => item.gamePlayTypeName == "3D")
			.gamePlayList.map((val : any, index : number) => {
				return { ...val, checked: false, sum: arr[index] };
			});
		// 定义PL玩法类型,PL2||PL3
		methodPLList.value = list
			.find((item : any) => item.gamePlayTypeName == "PL2/PL3")
			.gamePlayList.map((val : any, index : number) => {
				return { ...val, checked: index ? false : true, sum: 1 };
			});
		// 请求越南地区选项
		// res = await get({ url: "/gameRecords/game" });
		// res = res.resultSet[0].games.filter((item: any) => item.vndArea);
		// console.log(res)

		// 获取倒计时
		const getAwardNum = await post({
			url: "/getAwardNum",
			data: { gameCode: data.code },
		});
		betMainReq.value = getAwardNum.resultSet.awardNum;
		console.log(betMainReq.value);
	});
	const show = ref(false); //弹出层的显示隐藏
	const betMainReq = ref(); //中奖信息
	const typeTab = reactive([
		{ label: "动画", id: 1 },
		{ label: "直播", id: 2 },
		{ label: "视频", id: 3 },
		{ label: "新闻", id: 4 },
	]);
	let urls1 = ref("src/static/images/fredHill1.png");
	let urls2 = ref("src/static/images/fredHill2.png");
	let urls3 = ref("src/static/images/fredHill3M.png");
	const typeList : any = ref([]); //不同类型的数据
	const playingMethod = ref("2D"); //用来展示不同玩法&&初始展示2D
	const current = computed(() => {
		// 计算出有多少注
		let num = 0;
		betlist.value.forEach((item) => {
			num += item.betNums.length * item.sum;
		});
		return num;
	});
	const betlist = computed(() => {
		// 计算出当前选中的所有号码
		let arr = [
			...active2D.value,
			...active3D.value,
			activePL2.value,
			activePL3.value,
		].filter((item : any) => {
			return item?.betNums?.length;
		});
		console.log(arr);
		return arr;
	});
	// 地区选中------------------------------
	//   const changeCitySelection = (val: any) => {
	//     console.log(val);
	//   };

	// 2D--------------------------------------------
	const method2DList = ref([]); //头,尾组选的数据
	const active2Dmethod = ref([]); //已经选中的玩法
	const active2Dnum = ref([]); //已经选中的号码
	const active2D = computed(() => {
		let betNums = [...active2Dnum.value.map((item : any) => item.label)];
		let data : any = typeList.value.find(
			(item : any) => item.gamePlayTypeName == "2D"
		);
		if (!betNums.length) return [];
		return active2Dmethod.value.map((item : any, index : number) => {
			return {
				id: UUID(),
				...item,
				betNums,
				gamePlayTypeName: data.gamePlayTypeName,
				gamePlayTypeCode: data.gamePlayTypeCode,
				times: 1,
			};
		});
	});
	// 3D--------------------------------------------------------
	const method3DList = ref([]); //头,尾组选的数据
	const active3Dmethod = ref([]); //已经选中的玩法
	const active3Dnum = ref([]); //已经选中的号码
	const active3D = computed(() => {
		let betNums = [...active3Dnum.value.map((item : any) => item.label)];
		let data : any = typeList.value.find(
			(item : any) => item.gamePlayTypeName == "3D"
		);
		if (!betNums.length) return [];
		return active3Dmethod.value.map((item : any) => {
			return {
				id: UUID(),
				...item,
				betNums,
				gamePlayTypeName: data.gamePlayTypeName,
				gamePlayTypeCode: data.gamePlayTypeCode,
				times: 1,
			};
		});
	});

	// PL---------------
	const methodPLList = ref([])//PL3/PL2里的玩法
	const activePLmethod = ref('PL2')//选中的是PL2还是PL3,默认选中一个
	// PL2---------------------------
	const activePL2num = ref([]); //已经选中的号码
	const activePL2 = computed(() => {
		let betNums = [...activePL2num.value.map((item : any) => item.label)]
		let data =
			typeList.value[2]?.gamePlayList.find((item : any) => {
				return item.gamePlayName == "PL2"
			})

		if (betNums.length != 2) return [];
		return {
			id: UUID(),
			gamePlayTypeName: typeList.value[2].gamePlayTypeName,
			gamePlayTypeCode: typeList.value[2].gamePlayTypeCode,
			...data,
			betNums,
			sum: 18,
			times: 1,
		};
	});

	// PL3---------------------------
	const activePL3num = ref([]); //已经选中的号码
	const activePL3 = computed(() => {
		let betNums = [...activePL3num.value.map((item : any) => item.label)]
		let data =
			typeList.value[2]?.gamePlayList.find((item : any) => {
				return item.gamePlayName == "PL3"
			})
		if (betNums.length != 3) return [];
		return {
			id: UUID(),
			gamePlayTypeName: typeList.value[2].gamePlayTypeName,
			gamePlayTypeCode: typeList.value[2].gamePlayTypeCode,
			...data,
			betNums,
			sum: 18,
			times: 1,
		};
	});

	onBeforeUpdate(() => {
		// 数据变化时监听是否还需要选中键盘
		let flag2D = active2Dmethod.value.every((item : any) => item.checked == false);
		let flag3D = active3Dmethod.value.every((item : any) => item.checked == false);
		if (flag2D) {
			keyNum2Ddata.value.forEach((item : any) => (item.checked = false)); //取消键盘选中状态
			active2Dnum.value = []; //选中数据清空
		}
		if (flag3D) {
			keyNum3Ddata.value.forEach((item : any) => (item.checked = false)); //取消键盘选中状态
			active3Dnum.value = []; //选中数据清空
		}
	});
	// 删除一项
	const delBetList = (val : any) => {
		// 首先找出这一项的分类
		let delobj : any =
			method2DList.value.find(
				(item : any) => item.gamePlayName == val.gamePlayName
			) ||
			method3DList.value.find(
				(item : any) => item.gamePlayName == val.gamePlayName
			);
		console.log(delobj)
		if (delobj) {
			delobj.checked = false;
			active2Dmethod.value = method2DList.value.filter(
				(item : any) => item.checked
			);
			active3Dmethod.value = method3DList.value.filter(
				(item : any) => item.checked
			);
		} else {
			// 这里判断删的是PL2还是PL3
			if (val.gamePlayCode == "vnd_PL2") {
				keyNumPL2data.value.forEach((item : any) => (item.checked = false)); //取消选中
				activePL2num.value = []; //清空列表
			}
			if (val.gamePlayCode == "vnd_PL3") {
				keyNumPL3data.value.forEach((item : any) => (item.checked = false)); //取消选中
				activePL3num.value = []; //清空列表
			}
		}
	};

	const bet = () => {
		if (betlist.value.length) {
			post(
				{
					url: "/bet",
					data: {
						awardPeriod: betMainReq.value.lastAwardPeriod,
						gameCode: Router.value.code,
						betInfos: betlist.value.map((item : any) => {
							return {
								betNums: 'PL2/PL3' == item.gamePlayTypeName ? [item.betNums.join('&')] : item.betNums,
								gamePlayCode: item.gamePlayCode,
								gamePlayTypeCode: item.gamePlayTypeCode,
								oneBetAmount: item.betAmount,
								sumAmount: item.betNums.length * item.sum * item.betAmount,
							}
						})
					},
				}, UrlType.bet).then(res => {
					console.log(res)
					uni.showToast({ icon: 'success', title: res.resDesc })
					betlist.value.forEach(item => {
						delBetList(item)
					})
				}).catch(res => {
					uni.showToast({ icon: 'error', title: '投注失败' })
				})
		} else {
			uni.showToast({ icon: 'error', title: '无选号' })
		}

	};

	const createNum = () => {
		// 生成00-99的键盘数据
		let arr : any = [];
		for (let i = 0; i < 100; i++) {
			if (i < 10) {
				arr.push({ label: "0" + i, id: "0" + i, checked: false });
			} else {
				arr.push({ label: "" + i, id: "" + i, checked: false });
			}
		}
		return ref(arr);
	};
	const keyNum2Ddata = createNum(); // 生成键盘2d键盘数据
	const keyNumPL2data = createNum(); // 生成键盘PL2键盘数据
	const keyNumPL3data = createNum(); // 生成键盘PL3键盘数据
	// 生成键盘3d键盘数据
	const keyNum3Ddata = computed(() => {
		let arr : any = [];
		for (let i = 0; i < 1000; i++) {
			if (i < 10) {
				arr.push({ label: "00" + i, id: "00" + i, checked: false });
			} else if (i < 100) {
				arr.push({ label: "0" + i, id: "0" + i, checked: false });
			} else {
				arr.push({ label: "" + i, id: "" + i, checked: false });
			}
		}
		return arr;
	});
</script>