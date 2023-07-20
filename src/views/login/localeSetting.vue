<template>
	<view class="container">
		<view class="locale-setting">{{ $t('locale.auto') }}</view>
		<view class="list-item">
			<text class="k">{{ $t('locale.auto') }}:</text>
			<text class="v">{{ systemLocale }}</text>
		</view>
		<view class="list-item">
			<text class="k">{{ $t('locale.auto') }}:</text>
			<text class="v">{{ applicationLocale }}</text>
		</view>
		<view class="locale-setting">{{ $t('index.language') }}</view>
		<view class="locale-list">
			<view class="locale-item" v-for="(item, index) in locales" :key="index" @click="onLocaleChange(item)">
				<text class="text">{{ item.text }}</text>
				<text class="icon-check" v-if="item.code == applicationLocale"></text>
			</view>
		</view>
	</view>
</template>
  
<script setup lang="ts">
import { ref, computed } from "vue";
import { useI18n } from "vue-i18n";
import { onLoad } from "@dcloudio/uni-app"
 const { t, locale } = useI18n();
const systemLocale = ref('');
const applicationLocale = ref('');
const isAndroid = ref('');




const locales = computed(() => {
	return [{
		text: t('locale.auto'),
		code: 'auto'
	}, {
		text: t('locale.en'),
		code: 'en'
	},
	{
		text: t('locale.zh-hans'),
		code: 'zh-Hans'
	},
	{
		text: t('locale.zh-hant'),
		code: 'zh-Hant'
	},
	{
		text: t('locale.ja'),
		code: 'ja'
	}
	]
})

onLoad(() => {
	let systemInfo = uni.getSystemInfoSync();
	systemLocale.value = systemInfo.language;
	applicationLocale.value = uni.getLocale();
	isAndroid.value = systemInfo.platform.toLowerCase() === 'android';
	uni.onLocaleChange((e) => {
		applicationLocale.value = e.locale;
	})

})

const onLocaleChange = (e: any) => {
	if (isAndroid.value) {
		uni.showModal({
			content: t('index.language-change-confirm'),
			success: (res) => {
				if (res.confirm) {
					uni.setLocale(e.code);
				}
			}
		})
	} else {
		uni.setLocale(e.code);
		locale.value = e.code;
	}
}
</script>
  
<style lang="scss" scoped>
.title {
	font-size: 16px;
	font-weight: bold;
	margin-bottom: 15px;
}

.description {
	font-size: 14px;
	opacity: 0.6;
	margin-bottom: 15px;
}

.detail-link {
	font-size: 14px;
	word-break: break-all;
}

.link {
	color: #007AFF;
	margin-left: 10px;
}

.locale-setting {
	font-size: 16px;
	font-weight: bold;
	margin-top: 25px;
	margin-bottom: 5px;
	padding-bottom: 5px;
	border-bottom: 1px solid #f0f0f0;
}

.list-item {
	font-size: 14px;
	padding: 10px 0;
}

.list-item .v {
	margin-left: 5px;
}

.locale-item {
	display: flex;
	flex-direction: row;
	padding: 10px 0;
}

.locale-item .text {
	flex: 1;
}

.icon-check {
	margin-right: 5px;
	border: 2px solid #007aff;
	border-left: 0;
	border-top: 0;
	height: 12px;
	width: 6px;
	transform-origin: center;
	/* #ifndef APP-NVUE */
	transition: all 0.3s;
	/* #endif */
	transform: rotate(45deg);
}
</style>
  