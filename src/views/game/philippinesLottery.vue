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
					<text lines="1" class="text_25">All</text>
					<text lines="1" class="text_26">Big</text>
					<text lines="1" class="text_27">Small</text>
					<text lines="1" class="text_28">Odd</text>
					<text lines="1" class="text_29">Even</text>
					<text lines="1" class="text_30">Delete</text>
				</view>
				<view class="section_3"></view>
				<view class="box_4">
					<view class="block_2">
						<view class="text-group_11">
							<text lines="1" class="text_31">01</text>
							<text lines="1" class="text_32">8.4398</text>
						</view>
					</view>
					<view class="block_3">
						<view class="text-group_12">
							<text lines="1" class="text_33">01</text>
							<text lines="1" class="text_34">8.4398</text>
						</view>
					</view>
					<view class="block_4">
						<view class="text-group_13">
							<text lines="1" class="text_35">01</text>
							<text lines="1" class="text_36">8.4398</text>
						</view>
					</view>
					<view class="block_5">
						<view class="text-group_14">
							<text lines="1" class="text_37">01</text>
							<text lines="1" class="text_38">8.4398</text>
						</view>
					</view>
					<view class="block_6">
						<view class="text-group_15">
							<text lines="1" class="text_39">01</text>
							<text lines="1" class="text_40">8.4398</text>
						</view>
					</view>
				</view>
				<view class="box_4">
					<view class="block_2">
						<view class="text-group_11">
							<text lines="1" class="text_31">01</text>
							<text lines="1" class="text_32">8.4398</text>
						</view>
					</view>
					<view class="block_3">
						<view class="text-group_12">
							<text lines="1" class="text_33">01</text>
							<text lines="1" class="text_34">8.4398</text>
						</view>
					</view>
					<view class="block_4">
						<view class="text-group_13">
							<text lines="1" class="text_35">01</text>
							<text lines="1" class="text_36">8.4398</text>
						</view>
					</view>
					<view class="block_5">
						<view class="text-group_14">
							<text lines="1" class="text_37">01</text>
							<text lines="1" class="text_38">8.4398</text>
						</view>
					</view>
					<view class="block_6">
						<view class="text-group_15">
							<text lines="1" class="text_39">01</text>
							<text lines="1" class="text_40">8.4398</text>
						</view>
					</view>
				</view>
				<view class="box_4">
					<view class="block_2">
						<view class="text-group_11">
							<text lines="1" class="text_31">01</text>
							<text lines="1" class="text_32">8.4398</text>
						</view>
					</view>
					<view class="block_3">
						<view class="text-group_12">
							<text lines="1" class="text_33">01</text>
							<text lines="1" class="text_34">8.4398</text>
						</view>
					</view>
					<view class="block_4">
						<view class="text-group_13">
							<text lines="1" class="text_35">01</text>
							<text lines="1" class="text_36">8.4398</text>
						</view>
					</view>
					<view class="block_5">
						<view class="text-group_14">
							<text lines="1" class="text_37">01</text>
							<text lines="1" class="text_38">8.4398</text>
						</view>
					</view>
					<view class="block_6">
						<view class="text-group_15">
							<text lines="1" class="text_39">01</text>
							<text lines="1" class="text_40">8.4398</text>
						</view>
					</view>
				</view>
				<view class="box_4">
					<view class="block_2">
						<view class="text-group_11">
							<text lines="1" class="text_31">01</text>
							<text lines="1" class="text_32">8.4398</text>
						</view>
					</view>
					<view class="block_3">
						<view class="text-group_12">
							<text lines="1" class="text_33">01</text>
							<text lines="1" class="text_34">8.4398</text>
						</view>
					</view>
					<view class="block_4">
						<view class="text-group_13">
							<text lines="1" class="text_35">01</text>
							<text lines="1" class="text_36">8.4398</text>
						</view>
					</view>
					<view class="block_5">
						<view class="text-group_14">
							<text lines="1" class="text_37">01</text>
							<text lines="1" class="text_38">8.4398</text>
						</view>
					</view>
					<view class="block_6">
						<view class="text-group_15">
							<text lines="1" class="text_39">01</text>
							<text lines="1" class="text_40">8.4398</text>
						</view>
					</view>
				</view>
				<view class="box_4">
					<view class="block_2">
						<view class="text-group_11">
							<text lines="1" class="text_31">01</text>
							<text lines="1" class="text_32">8.4398</text>
						</view>
					</view>
					<view class="block_3">
						<view class="text-group_12">
							<text lines="1" class="text_33">01</text>
							<text lines="1" class="text_34">8.4398</text>
						</view>
					</view>
					<view class="block_4">
						<view class="text-group_13">
							<text lines="1" class="text_35">01</text>
							<text lines="1" class="text_36">8.4398</text>
						</view>
					</view>
					<view class="block_5">
						<view class="text-group_14">
							<text lines="1" class="text_37">01</text>
							<text lines="1" class="text_38">8.4398</text>
						</view>
					</view>
					<view class="block_6">
						<view class="text-group_15">
							<text lines="1" class="text_39">01</text>
							<text lines="1" class="text_40">8.4398</text>
						</view>
					</view>
				</view>
			
			</view>

			<view class="box_21"
				v-show="currentOption === 1 && currentOptionTwo ===1 || currentOption === 2 && currentOptionTwo === 1 || currentOption===3">
				<view class="text-wrapper_20">
					<text lines="1" class="text_25">1st</text>
				</view>
				<view class="text-wrapper_21">
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


			<view class="Keyboard1" v-show="currentOption === 1 && currentOptionTwo === 1 || currentOption === 2 && currentOptionTwo === 1">
				<view class="box_22">
					<view class="box_23">
						<view class="text-wrapper_22">
							<text lines="1" class="text_27">01</text>
						</view>
						<view class="text-wrapper_23">
							<text lines="1" class="text_28">01</text>
						</view>
						<view class="text-wrapper_24">
							<text lines="1" class="text_29">01</text>
						</view>
						<view class="text-wrapper_25">
							<text lines="1" class="text_30">01</text>
						</view>
						<view class="text-wrapper_26">
							<text lines="1" class="text_31">01</text>
						</view>
						<view class="text-wrapper_27">
							<text lines="1" class="text_32">01</text>
						</view>
						<view class="text-wrapper_28">
							<text lines="1" class="text_33">01</text>
						</view>
						<view class="text-wrapper_29">
							<text lines="1" class="text_34">01</text>
						</view>
						<view class="text-wrapper_30">
							<text lines="1" class="text_35">01</text>
						</view>
						<view class="text-wrapper_31">
							<text lines="1" class="text_36">01</text>
						</view>
					</view>
					<view class="box_24">
						<view class="text-wrapper_32">
							<text lines="1" class="text_37">01</text>
						</view>
						<view class="text-wrapper_33">
							<text lines="1" class="text_38">01</text>
						</view>
						<view class="text-wrapper_34">
							<text lines="1" class="text_39">01</text>
						</view>
						<view class="text-wrapper_35">
							<text lines="1" class="text_40">01</text>
						</view>
						<view class="text-wrapper_36">
							<text lines="1" class="text_41">01</text>
						</view>
						<view class="text-wrapper_37">
							<text lines="1" class="text_42">01</text>
						</view>
						<view class="text-wrapper_38">
							<text lines="1" class="text_43">01</text>
						</view>
						<view class="text-wrapper_39">
							<text lines="1" class="text_44">01</text>
						</view>
						<view class="text-wrapper_40">
							<text lines="1" class="text_45">01</text>
						</view>
						<view class="text-wrapper_41">
							<text lines="1" class="text_46">01</text>
						</view>
					</view>
					<view class="box_25">
						<view class="text-wrapper_42">
							<text lines="1" class="text_47">01</text>
						</view>
						<view class="text-wrapper_43">
							<text lines="1" class="text_48">01</text>
						</view>
						<view class="text-wrapper_44">
							<text lines="1" class="text_49">01</text>
						</view>
						<view class="text-wrapper_45">
							<text lines="1" class="text_50">01</text>
						</view>
						<view class="text-wrapper_46">
							<text lines="1" class="text_51">01</text>
						</view>
						<view class="text-wrapper_47">
							<text lines="1" class="text_52">01</text>
						</view>
						<view class="text-wrapper_48">
							<text lines="1" class="text_53">01</text>
						</view>
						<view class="text-wrapper_49">
							<text lines="1" class="text_54">01</text>
						</view>
						<view class="text-wrapper_50">
							<text lines="1" class="text_55">01</text>
						</view>
						<view class="text-wrapper_51">
							<text lines="1" class="text_56">01</text>
						</view>
					</view>
					<view class="text-wrapper_52">
						<text lines="1" class="text_57">01</text>
					</view>
					<view class="box_9"></view>
					<view class="box_26">
						<view class="text-wrapper_53">
							<text lines="1" class="text_58">01</text>
						</view>
						<view class="text-wrapper_54">
							<text lines="1" class="text_59">01</text>
						</view>
						<view class="text-wrapper_55">
							<text lines="1" class="text_60">01</text>
						</view>
						<view class="text-wrapper_56">
							<text lines="1" class="text_61">01</text>
						</view>
						<view class="text-wrapper_57">
							<text lines="1" class="text_62">01</text>
						</view>
						<view class="text-wrapper_58">
							<text lines="1" class="text_63">01</text>
						</view>
						<view class="text-wrapper_59">
							<text lines="1" class="text_64">01</text>
						</view>
						<view class="text-wrapper_60">
							<text lines="1" class="text_65">01</text>
						</view>
						<view class="text-wrapper_61">
							<text lines="1" class="text_66">01</text>
						</view>
						<view class="text-wrapper_62">
							<text lines="1" class="text_67">01</text>
						</view>
					</view>
					<view class="box_27">
						<view class="text-wrapper_63">
							<text lines="1" class="text_68">01</text>
						</view>
						<view class="text-wrapper_64">
							<text lines="1" class="text_69">01</text>
						</view>
						<view class="text-wrapper_65">
							<text lines="1" class="text_70">01</text>
						</view>
						<view class="text-wrapper_66">
							<text lines="1" class="text_71">01</text>
						</view>
						<view class="text-wrapper_67">
							<text lines="1" class="text_72">01</text>
						</view>
						<view class="text-wrapper_68">
							<text lines="1" class="text_73">01</text>
						</view>
						<view class="text-wrapper_69">
							<text lines="1" class="text_74">01</text>
						</view>
						<view class="text-wrapper_70">
							<text lines="1" class="text_75">01</text>
						</view>
						<view class="text-wrapper_71">
							<text lines="1" class="text_76">01</text>
						</view>
						<view class="text-wrapper_72">
							<text lines="1" class="text_77">01</text>
						</view>
					</view>
					<view class="box_28">
						<view class="text-wrapper_73">
							<text lines="1" class="text_78">01</text>
						</view>
						<view class="text-wrapper_74">
							<text lines="1" class="text_79">01</text>
						</view>
						<view class="text-wrapper_75">
							<text lines="1" class="text_80">01</text>
						</view>
						<view class="text-wrapper_76">
							<text lines="1" class="text_81">01</text>
						</view>
						<view class="text-wrapper_77">
							<text lines="1" class="text_82">01</text>
						</view>
						<view class="text-wrapper_78">
							<text lines="1" class="text_83">01</text>
						</view>
						<view class="text-wrapper_79">
							<text lines="1" class="text_84">01</text>
						</view>
						<view class="text-wrapper_80">
							<text lines="1" class="text_85">01</text>
						</view>
						<view class="text-wrapper_81">
							<text lines="1" class="text_86">01</text>
						</view>
						<view class="text-wrapper_82">
							<text lines="1" class="text_87">01</text>
						</view>
					</view>
					<view class="text-wrapper_83">
						<text lines="1" class="text_88">01</text>
					</view>
				</view>
			</view>

			<view class="Keyboard9" v-show="currentOption === 1 && currentOptionTwo === 2">
				<view class="box_12">
					<view class="text-wrapper_23">
						<text lines="1" class="text_29">1</text>
					</view>
					<view class="text-wrapper_24">
						<text lines="1" class="text_30">2</text>
					</view>
					<view class="text-wrapper_25">
						<text lines="1" class="text_31">3</text>
					</view>
				</view>
				<view class="box_12">
					<view class="text-wrapper_26">
						<text lines="1" class="text_32">4</text>
					</view>
					<view class="text-wrapper_27">
						<text lines="1" class="text_33">5</text>
					</view>
					<view class="text-wrapper_28">
						<text lines="1" class="text_34">6</text>
					</view>
				</view>
				<view class="box_12">
					<view class="text-wrapper_29">
						<text lines="1" class="text_35">7</text>
					</view>
					<view class="text-wrapper_30">
						<text lines="1" class="text_36">8</text>
					</view>
					<view class="text-wrapper_31">
						<text lines="1" class="text_37">9</text>
					</view>
				</view>
				<view class="box_12">
					<view class="section_6">
						<view class="image-text_6">
							<image
								src="https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPngf3c8e4ebcd5196c552597442ed829665a963ebaf6243656914f0fec1d2250a38"
								class="thumbnail_5"></image>
							<text lines="1" class="text-group_3">Delete</text>
						</view>
					</view>
					<view class="text-wrapper_32">
						<text lines="1" class="text_38">0</text>
					</view>
					<view class="section_7">
						<view class="image-text_7">
							<image
								src="https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPng1467db9dd09d153c0a03c0067e6f8d0ddc00973e4ffc2ea976954ce3b8532687"
								class="thumbnail_6"></image>
							<text lines="1" class="text-group_4">Back</text>
						</view>
					</view>
				</view>
			</view>

			<view class="Keyboard8" v-show="currentOption === 3">
				<view class="group_14">
					<view class="group_15">
						<view class="box_8">
							<view class="text-group_12">
								<text lines="1" class="text_26">Big</text>
								<text lines="1" class="text_27">8.4398</text>
							</view>
						</view>
						<view class="tag_4">
							<view class="text-group_13">
								<text lines="1" class="text_28">Odd</text>
								<text lines="1" class="text_29">8.4398</text>
							</view>
						</view>
					</view>
					<view class="group_16">
						<view class="block_1">
							<view class="text-group_14">
								<text lines="1" class="text_30">Small</text>
								<text lines="1" class="text_31">8.4398</text>
							</view>
						</view>
						<view class="tag_5">
							<view class="text-group_15">
								<text lines="1" class="text_32">Even</text>
								<text lines="1" class="text_33">8.4398</text>
							</view>
						</view>
					</view>
					<view class="box_10"></view>
					<view class="group_17">
						<view class="box_12">
							<view class="text-group_16">
								<text lines="1" class="text_34">Big</text>
								<text lines="1" class="text_35">8.4398</text>
							</view>
						</view>
						<view class="tag_6">
							<view class="text-group_17">
								<text lines="1" class="text_36">Odd</text>
								<text lines="1" class="text_37">8.4398</text>
							</view>
						</view>
					</view>
					<view class="group_18">
						<view class="group_4">
							<view class="text-group_18">
								<text lines="1" class="text_38">Small</text>
								<text lines="1" class="text_39">8.4398</text>
							</view>
						</view>
						<view class="group_5">
							<view class="text-group_19">
								<text lines="1" class="text_40">Even</text>
								<text lines="1" class="text_41">8.4398</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
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
	import GameHeaderTab from "@/components/game/gameHeaderTab.vue";
	import gameFlb from "@/components/game/gameFLB.vue";
	import GameTab from "@/components/keyboard/gameTab.vue";
	import GameFooter from "@/components/game/gameFooter.vue";


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
		console.log(option)
		currentOption.value = option;
	};

	const currentOptionTwo = ref(1);

	const changeOptionTwo = (option : number) => {
		console.log(option)
		currentOptionTwo.value = option;
	};
</script>

<style scoped lang="scss">
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
		width: 686rpx;
		align-self: center;
		margin-top: -2rpx;
		display: flex;
		flex-direction: column;
		//padding: 32rpx 28rpx 28rpx 32rpx;
	}

	.box_19 {
		margin: 25rpx;
		flex-direction: row;
		display: flex;
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
		justify-content: space-between;
		margin: 16rpx 76rpx 0 68rpx;
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

	.Keyboard1 {
		.box_22 {
			margin: 25rpx;
			flex-direction: row;
			display: flex;
			justify-content: center;
		}

		.box_23 {
			display: flex;
			flex-direction: column;
		}

		.text-wrapper_22 {
			background-color: rgba(255, 255, 255, 1.000000);
			border-radius: 8rpx;
			display: flex;
			flex-direction: column;
			padding: 8rpx 18rpx 10rpx 20rpx;
		}

		.text_27 {
			overflow-wrap: break-word;
			color: rgba(51, 51, 51, 1);
			font-size: 28rpx;
			font-family: PingFangSC-Semibold;
			font-weight: 600;
			text-align: center;
			white-space: nowrap;
			line-height: 28rpx;
		}

		.text-wrapper_23 {
			background-color: rgba(255, 255, 255, 1.000000);
			border-radius: 8rpx;
			margin-top: 8rpx;
			display: flex;
			flex-direction: column;
			padding: 8rpx 18rpx 10rpx 20rpx;
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
		}

		.text-wrapper_24 {
			background-color: rgba(255, 255, 255, 1.000000);
			border-radius: 8rpx;
			margin-top: 8rpx;
			display: flex;
			flex-direction: column;
			padding: 8rpx 18rpx 10rpx 20rpx;
		}

		.text_29 {
			overflow-wrap: break-word;
			color: rgba(51, 51, 51, 1);
			font-size: 28rpx;
			font-family: PingFangSC-Semibold;
			font-weight: 600;
			text-align: center;
			white-space: nowrap;
			line-height: 28rpx;
		}

		.text-wrapper_25 {
			background-color: rgba(255, 255, 255, 1.000000);
			border-radius: 8rpx;
			margin-top: 8rpx;
			display: flex;
			flex-direction: column;
			padding: 8rpx 18rpx 10rpx 20rpx;
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

		.text-wrapper_26 {
			background-color: rgba(255, 255, 255, 1.000000);
			border-radius: 8rpx;
			margin-top: 8rpx;
			display: flex;
			flex-direction: column;
			padding: 8rpx 18rpx 10rpx 20rpx;
		}

		.text_31 {
			overflow-wrap: break-word;
			color: rgba(51, 51, 51, 1);
			font-size: 28rpx;
			font-family: PingFangSC-Semibold;
			font-weight: 600;
			text-align: center;
			white-space: nowrap;
			line-height: 28rpx;
		}

		.text-wrapper_27 {
			background-color: rgba(255, 255, 255, 1.000000);
			border-radius: 8rpx;
			margin-top: 8rpx;
			display: flex;
			flex-direction: column;
			padding: 8rpx 18rpx 10rpx 20rpx;
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

		.text-wrapper_28 {
			background-color: rgba(255, 255, 255, 1.000000);
			border-radius: 8rpx;
			margin-top: 8rpx;
			display: flex;
			flex-direction: column;
			padding: 8rpx 18rpx 10rpx 20rpx;
		}

		.text_33 {
			overflow-wrap: break-word;
			color: rgba(51, 51, 51, 1);
			font-size: 28rpx;
			font-family: PingFangSC-Semibold;
			font-weight: 600;
			text-align: center;
			white-space: nowrap;
			line-height: 28rpx;
		}

		.text-wrapper_29 {
			background-color: rgba(255, 255, 255, 1.000000);
			border-radius: 8rpx;
			margin-top: 8rpx;
			display: flex;
			flex-direction: column;
			padding: 8rpx 18rpx 10rpx 20rpx;
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
		}

		.text-wrapper_30 {
			background-color: rgba(255, 255, 255, 1.000000);
			border-radius: 8rpx;
			margin-top: 8rpx;
			display: flex;
			flex-direction: column;
			padding: 8rpx 18rpx 10rpx 20rpx;
		}

		.text_35 {
			overflow-wrap: break-word;
			color: rgba(51, 51, 51, 1);
			font-size: 28rpx;
			font-family: PingFangSC-Semibold;
			font-weight: 600;
			text-align: center;
			white-space: nowrap;
			line-height: 28rpx;
		}

		.text-wrapper_31 {
			background-color: rgba(255, 255, 255, 1.000000);
			border-radius: 8rpx;
			margin-top: 8rpx;
			display: flex;
			flex-direction: column;
			padding: 8rpx 18rpx 10rpx 20rpx;
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
		}

		.box_24 {
			margin-left: 8rpx;
			display: flex;
			flex-direction: column;
		}

		.text-wrapper_32 {
			background-color: rgba(255, 255, 255, 1.000000);
			border-radius: 8rpx;
			display: flex;
			flex-direction: column;
			padding: 8rpx 18rpx 10rpx 20rpx;
		}

		.text_37 {
			overflow-wrap: break-word;
			color: rgba(51, 51, 51, 1);
			font-size: 28rpx;
			font-family: PingFangSC-Semibold;
			font-weight: 600;
			text-align: center;
			white-space: nowrap;
			line-height: 28rpx;
		}

		.text-wrapper_33 {
			background-color: rgba(255, 255, 255, 1.000000);
			border-radius: 8rpx;
			margin-top: 8rpx;
			display: flex;
			flex-direction: column;
			padding: 8rpx 18rpx 10rpx 20rpx;
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

		.text-wrapper_34 {
			background-color: rgba(255, 255, 255, 1.000000);
			border-radius: 8rpx;
			margin-top: 8rpx;
			display: flex;
			flex-direction: column;
			padding: 8rpx 18rpx 10rpx 20rpx;
		}

		.text_39 {
			overflow-wrap: break-word;
			color: rgba(51, 51, 51, 1);
			font-size: 28rpx;
			font-family: PingFangSC-Semibold;
			font-weight: 600;
			text-align: center;
			white-space: nowrap;
			line-height: 28rpx;
		}

		.text-wrapper_35 {
			background-color: rgba(255, 255, 255, 1.000000);
			border-radius: 8rpx;
			margin-top: 8rpx;
			display: flex;
			flex-direction: column;
			padding: 8rpx 18rpx 10rpx 20rpx;
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

		.text-wrapper_36 {
			background-color: rgba(255, 255, 255, 1.000000);
			border-radius: 8rpx;
			margin-top: 8rpx;
			display: flex;
			flex-direction: column;
			padding: 8rpx 18rpx 10rpx 20rpx;
		}

		.text_41 {
			overflow-wrap: break-word;
			color: rgba(51, 51, 51, 1);
			font-size: 28rpx;
			font-family: PingFangSC-Semibold;
			font-weight: 600;
			text-align: center;
			white-space: nowrap;
			line-height: 28rpx;
		}

		.text-wrapper_37 {
			background-color: rgba(255, 255, 255, 1.000000);
			border-radius: 8rpx;
			margin-top: 8rpx;
			display: flex;
			flex-direction: column;
			padding: 8rpx 18rpx 10rpx 20rpx;
		}

		.text_42 {
			overflow-wrap: break-word;
			color: rgba(51, 51, 51, 1);
			font-size: 28rpx;
			font-family: PingFangSC-Semibold;
			font-weight: 600;
			text-align: center;
			white-space: nowrap;
			line-height: 28rpx;
		}

		.text-wrapper_38 {
			background-color: rgba(255, 255, 255, 1.000000);
			border-radius: 8rpx;
			margin-top: 8rpx;
			display: flex;
			flex-direction: column;
			padding: 8rpx 18rpx 10rpx 20rpx;
		}

		.text_43 {
			overflow-wrap: break-word;
			color: rgba(51, 51, 51, 1);
			font-size: 28rpx;
			font-family: PingFangSC-Semibold;
			font-weight: 600;
			text-align: center;
			white-space: nowrap;
			line-height: 28rpx;
		}

		.text-wrapper_39 {
			background-color: rgba(255, 255, 255, 1.000000);
			border-radius: 8rpx;
			margin-top: 8rpx;
			display: flex;
			flex-direction: column;
			padding: 8rpx 18rpx 10rpx 20rpx;
		}

		.text_44 {
			overflow-wrap: break-word;
			color: rgba(51, 51, 51, 1);
			font-size: 28rpx;
			font-family: PingFangSC-Semibold;
			font-weight: 600;
			text-align: center;
			white-space: nowrap;
			line-height: 28rpx;
		}

		.text-wrapper_40 {
			background-color: rgba(255, 255, 255, 1.000000);
			border-radius: 8rpx;
			margin-top: 8rpx;
			display: flex;
			flex-direction: column;
			padding: 8rpx 18rpx 10rpx 20rpx;
		}

		.text_45 {
			overflow-wrap: break-word;
			color: rgba(51, 51, 51, 1);
			font-size: 28rpx;
			font-family: PingFangSC-Semibold;
			font-weight: 600;
			text-align: center;
			white-space: nowrap;
			line-height: 28rpx;
		}

		.text-wrapper_41 {
			background-color: rgba(255, 255, 255, 1.000000);
			border-radius: 8rpx;
			margin-top: 8rpx;
			display: flex;
			flex-direction: column;
			padding: 8rpx 18rpx 10rpx 20rpx;
		}

		.text_46 {
			overflow-wrap: break-word;
			color: rgba(51, 51, 51, 1);
			font-size: 28rpx;
			font-family: PingFangSC-Semibold;
			font-weight: 600;
			text-align: center;
			white-space: nowrap;
			line-height: 28rpx;
		}

		.box_25 {
			margin-left: 8rpx;
			display: flex;
			flex-direction: column;
		}

		.text-wrapper_42 {
			background-color: rgba(255, 255, 255, 1.000000);
			border-radius: 8rpx;
			display: flex;
			flex-direction: column;
			padding: 8rpx 18rpx 10rpx 20rpx;
		}

		.text_47 {
			overflow-wrap: break-word;
			color: rgba(51, 51, 51, 1);
			font-size: 28rpx;
			font-family: PingFangSC-Semibold;
			font-weight: 600;
			text-align: center;
			white-space: nowrap;
			line-height: 28rpx;
		}

		.text-wrapper_43 {
			background-color: rgba(255, 255, 255, 1.000000);
			border-radius: 8rpx;
			margin-top: 8rpx;
			display: flex;
			flex-direction: column;
			padding: 8rpx 18rpx 10rpx 20rpx;
		}

		.text_48 {
			overflow-wrap: break-word;
			color: rgba(51, 51, 51, 1);
			font-size: 28rpx;
			font-family: PingFangSC-Semibold;
			font-weight: 600;
			text-align: center;
			white-space: nowrap;
			line-height: 28rpx;
		}

		.text-wrapper_44 {
			background-color: rgba(255, 255, 255, 1.000000);
			border-radius: 8rpx;
			margin-top: 8rpx;
			display: flex;
			flex-direction: column;
			padding: 8rpx 18rpx 10rpx 20rpx;
		}

		.text_49 {
			overflow-wrap: break-word;
			color: rgba(51, 51, 51, 1);
			font-size: 28rpx;
			font-family: PingFangSC-Semibold;
			font-weight: 600;
			text-align: center;
			white-space: nowrap;
			line-height: 28rpx;
		}

		.text-wrapper_45 {
			background-color: rgba(255, 255, 255, 1.000000);
			border-radius: 8rpx;
			margin-top: 8rpx;
			display: flex;
			flex-direction: column;
			padding: 8rpx 18rpx 10rpx 20rpx;
		}

		.text_50 {
			overflow-wrap: break-word;
			color: rgba(51, 51, 51, 1);
			font-size: 28rpx;
			font-family: PingFangSC-Semibold;
			font-weight: 600;
			text-align: center;
			white-space: nowrap;
			line-height: 28rpx;
		}

		.text-wrapper_46 {
			background-color: rgba(255, 255, 255, 1.000000);
			border-radius: 8rpx;
			margin-top: 8rpx;
			display: flex;
			flex-direction: column;
			padding: 8rpx 18rpx 10rpx 20rpx;
		}

		.text_51 {
			overflow-wrap: break-word;
			color: rgba(51, 51, 51, 1);
			font-size: 28rpx;
			font-family: PingFangSC-Semibold;
			font-weight: 600;
			text-align: center;
			white-space: nowrap;
			line-height: 28rpx;
		}

		.text-wrapper_47 {
			background-color: rgba(255, 255, 255, 1.000000);
			border-radius: 8rpx;
			margin-top: 8rpx;
			display: flex;
			flex-direction: column;
			padding: 8rpx 18rpx 10rpx 20rpx;
		}

		.text_52 {
			overflow-wrap: break-word;
			color: rgba(51, 51, 51, 1);
			font-size: 28rpx;
			font-family: PingFangSC-Semibold;
			font-weight: 600;
			text-align: center;
			white-space: nowrap;
			line-height: 28rpx;
		}

		.text-wrapper_48 {
			background-color: rgba(255, 255, 255, 1.000000);
			border-radius: 8rpx;
			margin-top: 8rpx;
			display: flex;
			flex-direction: column;
			padding: 8rpx 18rpx 10rpx 20rpx;
		}

		.text_53 {
			overflow-wrap: break-word;
			color: rgba(51, 51, 51, 1);
			font-size: 28rpx;
			font-family: PingFangSC-Semibold;
			font-weight: 600;
			text-align: center;
			white-space: nowrap;
			line-height: 28rpx;
		}

		.text-wrapper_49 {
			background-color: rgba(255, 255, 255, 1.000000);
			border-radius: 8rpx;
			margin-top: 8rpx;
			display: flex;
			flex-direction: column;
			padding: 8rpx 18rpx 10rpx 20rpx;
		}

		.text_54 {
			overflow-wrap: break-word;
			color: rgba(51, 51, 51, 1);
			font-size: 28rpx;
			font-family: PingFangSC-Semibold;
			font-weight: 600;
			text-align: center;
			white-space: nowrap;
			line-height: 28rpx;
		}

		.text-wrapper_50 {
			background-color: rgba(255, 255, 255, 1.000000);
			border-radius: 8rpx;
			margin-top: 8rpx;
			display: flex;
			flex-direction: column;
			padding: 8rpx 18rpx 10rpx 20rpx;
		}

		.text_55 {
			overflow-wrap: break-word;
			color: rgba(51, 51, 51, 1);
			font-size: 28rpx;
			font-family: PingFangSC-Semibold;
			font-weight: 600;
			text-align: center;
			white-space: nowrap;
			line-height: 28rpx;
		}

		.text-wrapper_51 {
			background-color: rgba(255, 255, 255, 1.000000);
			border-radius: 8rpx;
			margin-top: 8rpx;
			display: flex;
			flex-direction: column;
			padding: 8rpx 18rpx 10rpx 20rpx;
		}

		.text_56 {
			overflow-wrap: break-word;
			color: rgba(51, 51, 51, 1);
			font-size: 28rpx;
			font-family: PingFangSC-Semibold;
			font-weight: 600;
			text-align: center;
			white-space: nowrap;
			line-height: 28rpx;
		}

		.text-wrapper_52 {
			background-color: rgba(255, 255, 255, 1.000000);
			border-radius: 8rpx;
			display: flex;
			flex-direction: column;
			margin: 0 0 486rpx 8rpx;
			padding: 8rpx 18rpx 10rpx 20rpx;
		}

		.text_57 {
			overflow-wrap: break-word;
			color: rgba(51, 51, 51, 1);
			font-size: 28rpx;
			font-family: PingFangSC-Semibold;
			font-weight: 600;
			text-align: center;
			white-space: nowrap;
			line-height: 28rpx;
		}

		.box_9 {
			background-color: rgba(255, 176, 35, 0.300000);
			width: 2rpx;
			height: 506rpx;
			display: flex;
			flex-direction: column;
			margin: 0 0 26rpx 16rpx;
		}

		.box_26 {
			margin-left: 16rpx;
			display: flex;
			flex-direction: column;
		}

		.text-wrapper_53 {
			background-color: rgba(255, 255, 255, 1.000000);
			border-radius: 8rpx;
			display: flex;
			flex-direction: column;
			padding: 8rpx 18rpx 10rpx 20rpx;
		}

		.text_58 {
			overflow-wrap: break-word;
			color: rgba(51, 51, 51, 1);
			font-size: 28rpx;
			font-family: PingFangSC-Semibold;
			font-weight: 600;
			text-align: center;
			white-space: nowrap;
			line-height: 28rpx;
		}

		.text-wrapper_54 {
			background-color: rgba(255, 255, 255, 1.000000);
			border-radius: 8rpx;
			margin-top: 8rpx;
			display: flex;
			flex-direction: column;
			padding: 8rpx 18rpx 10rpx 20rpx;
		}

		.text_59 {
			overflow-wrap: break-word;
			color: rgba(51, 51, 51, 1);
			font-size: 28rpx;
			font-family: PingFangSC-Semibold;
			font-weight: 600;
			text-align: center;
			white-space: nowrap;
			line-height: 28rpx;
		}

		.text-wrapper_55 {
			background-color: rgba(255, 255, 255, 1.000000);
			border-radius: 8rpx;
			margin-top: 8rpx;
			display: flex;
			flex-direction: column;
			padding: 8rpx 18rpx 10rpx 20rpx;
		}

		.text_60 {
			overflow-wrap: break-word;
			color: rgba(51, 51, 51, 1);
			font-size: 28rpx;
			font-family: PingFangSC-Semibold;
			font-weight: 600;
			text-align: center;
			white-space: nowrap;
			line-height: 28rpx;
		}

		.text-wrapper_56 {
			background-color: rgba(255, 255, 255, 1.000000);
			border-radius: 8rpx;
			margin-top: 8rpx;
			display: flex;
			flex-direction: column;
			padding: 8rpx 18rpx 10rpx 20rpx;
		}

		.text_61 {
			overflow-wrap: break-word;
			color: rgba(51, 51, 51, 1);
			font-size: 28rpx;
			font-family: PingFangSC-Semibold;
			font-weight: 600;
			text-align: center;
			white-space: nowrap;
			line-height: 28rpx;
		}

		.text-wrapper_57 {
			background-color: rgba(255, 255, 255, 1.000000);
			border-radius: 8rpx;
			margin-top: 8rpx;
			display: flex;
			flex-direction: column;
			padding: 8rpx 18rpx 10rpx 20rpx;
		}

		.text_62 {
			overflow-wrap: break-word;
			color: rgba(51, 51, 51, 1);
			font-size: 28rpx;
			font-family: PingFangSC-Semibold;
			font-weight: 600;
			text-align: center;
			white-space: nowrap;
			line-height: 28rpx;
		}

		.text-wrapper_58 {
			background-color: rgba(255, 255, 255, 1.000000);
			border-radius: 8rpx;
			margin-top: 8rpx;
			display: flex;
			flex-direction: column;
			padding: 8rpx 18rpx 10rpx 20rpx;
		}

		.text_63 {
			overflow-wrap: break-word;
			color: rgba(51, 51, 51, 1);
			font-size: 28rpx;
			font-family: PingFangSC-Semibold;
			font-weight: 600;
			text-align: center;
			white-space: nowrap;
			line-height: 28rpx;
		}

		.text-wrapper_59 {
			background-color: rgba(255, 255, 255, 1.000000);
			border-radius: 8rpx;
			margin-top: 8rpx;
			display: flex;
			flex-direction: column;
			padding: 8rpx 18rpx 10rpx 20rpx;
		}

		.text_64 {
			overflow-wrap: break-word;
			color: rgba(51, 51, 51, 1);
			font-size: 28rpx;
			font-family: PingFangSC-Semibold;
			font-weight: 600;
			text-align: center;
			white-space: nowrap;
			line-height: 28rpx;
		}

		.text-wrapper_60 {
			background-color: rgba(255, 255, 255, 1.000000);
			border-radius: 8rpx;
			margin-top: 8rpx;
			display: flex;
			flex-direction: column;
			padding: 8rpx 18rpx 10rpx 20rpx;
		}

		.text_65 {
			overflow-wrap: break-word;
			color: rgba(51, 51, 51, 1);
			font-size: 28rpx;
			font-family: PingFangSC-Semibold;
			font-weight: 600;
			text-align: center;
			white-space: nowrap;
			line-height: 28rpx;
		}

		.text-wrapper_61 {
			background-color: rgba(255, 255, 255, 1.000000);
			border-radius: 8rpx;
			margin-top: 8rpx;
			display: flex;
			flex-direction: column;
			padding: 8rpx 18rpx 10rpx 20rpx;
		}

		.text_66 {
			overflow-wrap: break-word;
			color: rgba(51, 51, 51, 1);
			font-size: 28rpx;
			font-family: PingFangSC-Semibold;
			font-weight: 600;
			text-align: center;
			white-space: nowrap;
			line-height: 28rpx;
		}

		.text-wrapper_62 {
			background-color: rgba(255, 255, 255, 1.000000);
			border-radius: 8rpx;
			margin-top: 8rpx;
			display: flex;
			flex-direction: column;
			padding: 8rpx 18rpx 10rpx 20rpx;
		}

		.text_67 {
			overflow-wrap: break-word;
			color: rgba(51, 51, 51, 1);
			font-size: 28rpx;
			font-family: PingFangSC-Semibold;
			font-weight: 600;
			text-align: center;
			white-space: nowrap;
			line-height: 28rpx;
		}

		.box_27 {
			margin-left: 8rpx;
			display: flex;
			flex-direction: column;
		}

		.text-wrapper_63 {
			background-color: rgba(255, 255, 255, 1.000000);
			border-radius: 8rpx;
			display: flex;
			flex-direction: column;
			padding: 8rpx 18rpx 10rpx 20rpx;
		}

		.text_68 {
			overflow-wrap: break-word;
			color: rgba(51, 51, 51, 1);
			font-size: 28rpx;
			font-family: PingFangSC-Semibold;
			font-weight: 600;
			text-align: center;
			white-space: nowrap;
			line-height: 28rpx;
		}

		.text-wrapper_64 {
			background-color: rgba(255, 255, 255, 1.000000);
			border-radius: 8rpx;
			margin-top: 8rpx;
			display: flex;
			flex-direction: column;
			padding: 8rpx 18rpx 10rpx 20rpx;
		}

		.text_69 {
			overflow-wrap: break-word;
			color: rgba(51, 51, 51, 1);
			font-size: 28rpx;
			font-family: PingFangSC-Semibold;
			font-weight: 600;
			text-align: center;
			white-space: nowrap;
			line-height: 28rpx;
		}

		.text-wrapper_65 {
			background-color: rgba(255, 255, 255, 1.000000);
			border-radius: 8rpx;
			margin-top: 8rpx;
			display: flex;
			flex-direction: column;
			padding: 8rpx 18rpx 10rpx 20rpx;
		}

		.text_70 {
			overflow-wrap: break-word;
			color: rgba(51, 51, 51, 1);
			font-size: 28rpx;
			font-family: PingFangSC-Semibold;
			font-weight: 600;
			text-align: center;
			white-space: nowrap;
			line-height: 28rpx;
		}

		.text-wrapper_66 {
			background-color: rgba(255, 255, 255, 1.000000);
			border-radius: 8rpx;
			margin-top: 8rpx;
			display: flex;
			flex-direction: column;
			padding: 8rpx 18rpx 10rpx 20rpx;
		}

		.text_71 {
			overflow-wrap: break-word;
			color: rgba(51, 51, 51, 1);
			font-size: 28rpx;
			font-family: PingFangSC-Semibold;
			font-weight: 600;
			text-align: center;
			white-space: nowrap;
			line-height: 28rpx;
		}

		.text-wrapper_67 {
			background-color: rgba(255, 255, 255, 1.000000);
			border-radius: 8rpx;
			margin-top: 8rpx;
			display: flex;
			flex-direction: column;
			padding: 8rpx 18rpx 10rpx 20rpx;
		}

		.text_72 {
			overflow-wrap: break-word;
			color: rgba(51, 51, 51, 1);
			font-size: 28rpx;
			font-family: PingFangSC-Semibold;
			font-weight: 600;
			text-align: center;
			white-space: nowrap;
			line-height: 28rpx;
		}

		.text-wrapper_68 {
			background-color: rgba(255, 255, 255, 1.000000);
			border-radius: 8rpx;
			margin-top: 8rpx;
			display: flex;
			flex-direction: column;
			padding: 8rpx 18rpx 10rpx 20rpx;
		}

		.text_73 {
			overflow-wrap: break-word;
			color: rgba(51, 51, 51, 1);
			font-size: 28rpx;
			font-family: PingFangSC-Semibold;
			font-weight: 600;
			text-align: center;
			white-space: nowrap;
			line-height: 28rpx;
		}

		.text-wrapper_69 {
			background-color: rgba(255, 255, 255, 1.000000);
			border-radius: 8rpx;
			margin-top: 8rpx;
			display: flex;
			flex-direction: column;
			padding: 8rpx 18rpx 10rpx 20rpx;
		}

		.text_74 {
			overflow-wrap: break-word;
			color: rgba(51, 51, 51, 1);
			font-size: 28rpx;
			font-family: PingFangSC-Semibold;
			font-weight: 600;
			text-align: center;
			white-space: nowrap;
			line-height: 28rpx;
		}

		.text-wrapper_70 {
			background-color: rgba(255, 255, 255, 1.000000);
			border-radius: 8rpx;
			margin-top: 8rpx;
			display: flex;
			flex-direction: column;
			padding: 8rpx 18rpx 10rpx 20rpx;
		}

		.text_75 {
			overflow-wrap: break-word;
			color: rgba(51, 51, 51, 1);
			font-size: 28rpx;
			font-family: PingFangSC-Semibold;
			font-weight: 600;
			text-align: center;
			white-space: nowrap;
			line-height: 28rpx;
		}

		.text-wrapper_71 {
			background-color: rgba(255, 255, 255, 1.000000);
			border-radius: 8rpx;
			margin-top: 8rpx;
			display: flex;
			flex-direction: column;
			padding: 8rpx 18rpx 10rpx 20rpx;
		}

		.text_76 {
			overflow-wrap: break-word;
			color: rgba(51, 51, 51, 1);
			font-size: 28rpx;
			font-family: PingFangSC-Semibold;
			font-weight: 600;
			text-align: center;
			white-space: nowrap;
			line-height: 28rpx;
		}

		.text-wrapper_72 {
			background-color: rgba(255, 255, 255, 1.000000);
			border-radius: 8rpx;
			margin-top: 8rpx;
			display: flex;
			flex-direction: column;
			padding: 8rpx 18rpx 10rpx 20rpx;
		}

		.text_77 {
			overflow-wrap: break-word;
			color: rgba(51, 51, 51, 1);
			font-size: 28rpx;
			font-family: PingFangSC-Semibold;
			font-weight: 600;
			text-align: center;
			white-space: nowrap;
			line-height: 28rpx;
		}

		.box_28 {
			margin-left: 8rpx;
			display: flex;
			flex-direction: column;
		}

		.text-wrapper_73 {
			background-color: rgba(255, 255, 255, 1.000000);
			border-radius: 8rpx;
			display: flex;
			flex-direction: column;
			padding: 8rpx 18rpx 10rpx 20rpx;
		}

		.text_78 {
			overflow-wrap: break-word;
			color: rgba(51, 51, 51, 1);
			font-size: 28rpx;
			font-family: PingFangSC-Semibold;
			font-weight: 600;
			text-align: center;
			white-space: nowrap;
			line-height: 28rpx;
		}

		.text-wrapper_74 {
			background-color: rgba(255, 255, 255, 1.000000);
			border-radius: 8rpx;
			margin-top: 8rpx;
			display: flex;
			flex-direction: column;
			padding: 8rpx 18rpx 10rpx 20rpx;
		}

		.text_79 {
			overflow-wrap: break-word;
			color: rgba(51, 51, 51, 1);
			font-size: 28rpx;
			font-family: PingFangSC-Semibold;
			font-weight: 600;
			text-align: center;
			white-space: nowrap;
			line-height: 28rpx;
		}

		.text-wrapper_75 {
			background-color: rgba(255, 255, 255, 1.000000);
			border-radius: 8rpx;
			margin-top: 8rpx;
			display: flex;
			flex-direction: column;
			padding: 8rpx 18rpx 10rpx 20rpx;
		}

		.text_80 {
			overflow-wrap: break-word;
			color: rgba(51, 51, 51, 1);
			font-size: 28rpx;
			font-family: PingFangSC-Semibold;
			font-weight: 600;
			text-align: center;
			white-space: nowrap;
			line-height: 28rpx;
		}

		.text-wrapper_76 {
			background-color: rgba(255, 255, 255, 1.000000);
			border-radius: 8rpx;
			margin-top: 8rpx;
			display: flex;
			flex-direction: column;
			padding: 8rpx 18rpx 10rpx 20rpx;
		}

		.text_81 {
			overflow-wrap: break-word;
			color: rgba(51, 51, 51, 1);
			font-size: 28rpx;
			font-family: PingFangSC-Semibold;
			font-weight: 600;
			text-align: center;
			white-space: nowrap;
			line-height: 28rpx;
		}

		.text-wrapper_77 {
			background-color: rgba(255, 255, 255, 1.000000);
			border-radius: 8rpx;
			margin-top: 8rpx;
			display: flex;
			flex-direction: column;
			padding: 8rpx 18rpx 10rpx 20rpx;
		}

		.text_82 {
			overflow-wrap: break-word;
			color: rgba(51, 51, 51, 1);
			font-size: 28rpx;
			font-family: PingFangSC-Semibold;
			font-weight: 600;
			text-align: center;
			white-space: nowrap;
			line-height: 28rpx;
		}

		.text-wrapper_78 {
			background-color: rgba(255, 255, 255, 1.000000);
			border-radius: 8rpx;
			margin-top: 8rpx;
			display: flex;
			flex-direction: column;
			padding: 8rpx 18rpx 10rpx 20rpx;
		}

		.text_83 {
			overflow-wrap: break-word;
			color: rgba(51, 51, 51, 1);
			font-size: 28rpx;
			font-family: PingFangSC-Semibold;
			font-weight: 600;
			text-align: center;
			white-space: nowrap;
			line-height: 28rpx;
		}

		.text-wrapper_79 {
			background-color: rgba(255, 255, 255, 1.000000);
			border-radius: 8rpx;
			margin-top: 8rpx;
			display: flex;
			flex-direction: column;
			padding: 8rpx 18rpx 10rpx 20rpx;
		}

		.text_84 {
			overflow-wrap: break-word;
			color: rgba(51, 51, 51, 1);
			font-size: 28rpx;
			font-family: PingFangSC-Semibold;
			font-weight: 600;
			text-align: center;
			white-space: nowrap;
			line-height: 28rpx;
		}

		.text-wrapper_80 {
			background-color: rgba(255, 255, 255, 1.000000);
			border-radius: 8rpx;
			margin-top: 8rpx;
			display: flex;
			flex-direction: column;
			padding: 8rpx 18rpx 10rpx 20rpx;
		}

		.text_85 {
			overflow-wrap: break-word;
			color: rgba(51, 51, 51, 1);
			font-size: 28rpx;
			font-family: PingFangSC-Semibold;
			font-weight: 600;
			text-align: center;
			white-space: nowrap;
			line-height: 28rpx;
		}

		.text-wrapper_81 {
			background-color: rgba(255, 255, 255, 1.000000);
			border-radius: 8rpx;
			margin-top: 8rpx;
			display: flex;
			flex-direction: column;
			padding: 8rpx 18rpx 10rpx 20rpx;
		}

		.text_86 {
			overflow-wrap: break-word;
			color: rgba(51, 51, 51, 1);
			font-size: 28rpx;
			font-family: PingFangSC-Semibold;
			font-weight: 600;
			text-align: center;
			white-space: nowrap;
			line-height: 28rpx;
		}

		.text-wrapper_82 {
			background-color: rgba(255, 255, 255, 1.000000);
			border-radius: 8rpx;
			margin-top: 8rpx;
			display: flex;
			flex-direction: column;
			padding: 8rpx 18rpx 10rpx 20rpx;
		}

		.text_87 {
			overflow-wrap: break-word;
			color: rgba(51, 51, 51, 1);
			font-size: 28rpx;
			font-family: PingFangSC-Semibold;
			font-weight: 600;
			text-align: center;
			white-space: nowrap;
			line-height: 28rpx;
		}

		.text-wrapper_83 {
			background-color: rgba(255, 255, 255, 1.000000);
			border-radius: 8rpx;
			display: flex;
			flex-direction: column;
			margin: 0 0 486rpx 8rpx;
			padding: 8rpx 18rpx 10rpx 20rpx;
		}

		.text_88 {
			overflow-wrap: break-word;
			color: rgba(51, 51, 51, 1);
			font-size: 28rpx;
			font-family: PingFangSC-Semibold;
			font-weight: 600;
			text-align: center;
			white-space: nowrap;
			line-height: 28rpx;
		}
	}

	.itembox_10{
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

		.text-wrapper_24 {
			background-color: rgba(255, 255, 255, 1.000000);
			border-radius: 8rpx;
			display: flex;
			flex-direction: column;
			padding: 24rpx 78rpx 22rpx 78rpx;
		}

		.text_30 {
			overflow-wrap: break-word;
			color: rgba(51, 51, 51, 1);
			font-size: 48rpx;
			font-family: PingFangSC-Semibold;
			font-weight: 600;
			text-align: center;
			white-space: nowrap;
			line-height: 48rpx;
		}

		.text-wrapper_25 {
			background-color: rgba(255, 255, 255, 1.000000);
			border-radius: 8rpx;
			display: flex;
			flex-direction: column;
			padding: 24rpx 76rpx 22rpx 80rpx;
		}

		.text_31 {
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

		.text-wrapper_26 {
			background-color: rgba(255, 255, 255, 1.000000);
			border-radius: 8rpx;
			display: flex;
			flex-direction: column;
			padding: 24rpx 76rpx 22rpx 80rpx;
		}

		.text_32 {
			overflow-wrap: break-word;
			color: rgba(51, 51, 51, 1);
			font-size: 48rpx;
			font-family: PingFangSC-Semibold;
			font-weight: 600;
			text-align: center;
			white-space: nowrap;
			line-height: 48rpx;
		}

		.text-wrapper_27 {
			background-color: rgba(255, 255, 255, 1.000000);
			border-radius: 8rpx;
			display: flex;
			flex-direction: column;
			padding: 24rpx 76rpx 22rpx 80rpx;
		}

		.text_33 {
			overflow-wrap: break-word;
			color: rgba(51, 51, 51, 1);
			font-size: 48rpx;
			font-family: PingFangSC-Semibold;
			font-weight: 600;
			text-align: center;
			white-space: nowrap;
			line-height: 48rpx;
		}

		.text-wrapper_28 {
			background-color: rgba(255, 255, 255, 1.000000);
			border-radius: 8rpx;
			display: flex;
			flex-direction: column;
			padding: 24rpx 76rpx 22rpx 80rpx;
		}

		.text_34 {
			overflow-wrap: break-word;
			color: rgba(51, 51, 51, 1);
			font-size: 48rpx;
			font-family: PingFangSC-Semibold;
			font-weight: 600;
			text-align: center;
			white-space: nowrap;
			line-height: 48rpx;
		}

	

		.text-wrapper_29 {
			background-color: rgba(255, 255, 255, 1.000000);
			border-radius: 8rpx;
			display: flex;
			flex-direction: column;
			padding: 24rpx 78rpx 22rpx 80rpx;
		}

		.text_35 {
			overflow-wrap: break-word;
			color: rgba(51, 51, 51, 1);
			font-size: 48rpx;
			font-family: PingFangSC-Semibold;
			font-weight: 600;
			text-align: center;
			white-space: nowrap;
			line-height: 48rpx;
		}

		.text-wrapper_30 {
			background-color: rgba(255, 255, 255, 1.000000);
			border-radius: 8rpx;
			display: flex;
			flex-direction: column;
			padding: 24rpx 76rpx 22rpx 80rpx;
		}

		.text_36 {
			overflow-wrap: break-word;
			color: rgba(51, 51, 51, 1);
			font-size: 48rpx;
			font-family: PingFangSC-Semibold;
			font-weight: 600;
			text-align: center;
			white-space: nowrap;
			line-height: 48rpx;
		}

		.text-wrapper_31 {
			background-color: rgba(255, 255, 255, 1.000000);
			border-radius: 8rpx;
			display: flex;
			flex-direction: column;
			padding: 24rpx 76rpx 22rpx 80rpx;
		}

		.text_37 {
			overflow-wrap: break-word;
			color: rgba(51, 51, 51, 1);
			font-size: 48rpx;
			font-family: PingFangSC-Semibold;
			font-weight: 600;
			text-align: center;
			white-space: nowrap;
			line-height: 48rpx;
		}

	
		.section_6 {
			background-color: rgba(255, 255, 255, 1.000000);
			border-radius: 8rpx;
			display: flex;
			flex-direction: row;
			padding: 16rpx 54rpx 10rpx 60rpx;
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

		.text-wrapper_32 {
			background-color: rgba(255, 255, 255, 1.000000);
			border-radius: 8rpx;
			display: flex;
			flex-direction: column;
			padding: 24rpx 76rpx 22rpx 80rpx;
		}

		.text_38 {
			overflow-wrap: break-word;
			color: rgba(51, 51, 51, 1);
			font-size: 48rpx;
			font-family: PingFangSC-Semibold;
			font-weight: 600;
			text-align: center;
			white-space: nowrap;
			line-height: 48rpx;
		}

		.section_7 {
			background-color: rgba(255, 255, 255, 1.000000);
			border-radius: 8rpx;
			display: flex;
			flex-direction: row;
			padding: 16rpx 64rpx 10rpx 66rpx;
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
		}
		.text_25 {
		  overflow-wrap: break-word;
		  color: rgba(255,176,35,1);
		  font-size: 28rpx;
		  font-family: PingFangSC-Semibold;
		  font-weight: 600;
		  text-align: center;
		  white-space: nowrap;
		  line-height: 28rpx;
		}
		.text_26 {
		  overflow-wrap: break-word;
		  color: rgba(51,51,51,1);
		  font-size: 28rpx;
		  font-family: PingFangSC-Regular;
		  font-weight: normal;
		  text-align: left;
		  white-space: nowrap;
		  line-height: 28rpx;
		}
		.text_27 {
		  overflow-wrap: break-word;
		  color: rgba(51,51,51,1);
		  font-size: 28rpx;
		  font-family: PingFangSC-Regular;
		  font-weight: normal;
		  text-align: left;
		  white-space: nowrap;
		  line-height: 28rpx;
		}
		.text_28 {
		  overflow-wrap: break-word;
		  color: rgba(51,51,51,1);
		  font-size: 28rpx;
		  font-family: PingFangSC-Regular;
		  font-weight: normal;
		  text-align: left;
		  white-space: nowrap;
		  line-height: 28rpx;
		}
		.text_29 {
		  overflow-wrap: break-word;
		  color: rgba(51,51,51,1);
		  font-size: 28rpx;
		  font-family: PingFangSC-Regular;
		  font-weight: normal;
		  text-align: left;
		  white-space: nowrap;
		  line-height: 28rpx;
		}
		.text_30 {
		  overflow-wrap: break-word;
		  color: rgba(51,51,51,1);
		  font-size: 28rpx;
		  font-family: PingFangSC-Regular;
		  font-weight: normal;
		  text-align: left;
		  white-space: nowrap;
		  line-height: 28rpx;
		}

		.box_4 {
			margin-top: 20rpx;
			flex-direction: row;
			display: flex;
			justify-content: center;
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
			margin-left: 20rpx;
			display: flex;
			flex-direction: row;
			padding: 16rpx 20rpx 16rpx 22rpx;
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



		.section_3 {
			background-color: rgba(255, 176, 35, 1.000000);
			border-radius: 2rpx;
			// width: 32rpx;
			height: 4rpx;
			display: flex;
			flex-direction: column;
			margin: 8rpx 590rpx 0 0;
		}
	}

	.Keyboard8 {
		.group_14 {
			margin-top: 32rpx;
			flex-direction: row;
			display: flex;
			justify-content: center;
			.box_10 {
				background-color: rgba(255, 176, 35, 0.300000);
				width: 2rpx;
				height: 586rpx;
				margin-left: 36rpx;
				display: flex;
				flex-direction: column;
			}
		}

		.group_15 {
			margin-bottom: 394rpx;
			display: flex;
			flex-direction: column;
		}

		.box_8 {
			background-color: rgba(255, 255, 255, 1.000000);
			border-radius: 8rpx;
			display: flex;
			flex-direction: row;
			padding: 16rpx 32rpx 16rpx 32rpx;
		}

		.text-group_12 {
			display: flex;
			flex-direction: column;
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