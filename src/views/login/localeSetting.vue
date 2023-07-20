<template>
	<view class="locale-item" v-for="(item, index) in locales" :key="index" @click="onLocaleChange(item)">
		<text class="text">{{ item.text }}</text>
		<text class="icon-check" v-if="item.code == applicationLocale"></text>
	</view>
</template>
  
<script setup lang="ts">
import { ref, computed } from "vue";
import { useI18n } from "vue-i18n";
import { onLoad } from "@dcloudio/uni-app"
const { t, locale } = useI18n();
const systemLocale = ref();
const applicationLocale = ref();
const isAndroid = ref(true);

const locales = computed(() => {
	return [{
		text: t('locale.auto'),
		code: 'auto'
	}, {
		text: t('locale.zh-hans'),
		code: 'zh-Hans'
	}, {
		text: t('locale.en'),
		code: 'en'
	}, {
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
		console.log('============', e.locale)
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
  