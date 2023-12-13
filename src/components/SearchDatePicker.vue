<!-- SearchDatePicker.vue -->

<template>
	<view class="search-date-picker">
		<van-search shape=round right-icon="calendar-o" v-model="value" show-action label="" placeholder="请输入搜索关键词"
			@search="onSearch" @focus="onFocus">
			<template #action>
				<div @click="onClickButton">搜索</div>
			</template>
		</van-search>

		<van-picker-group v-show="showCalendar" title="预约日期" :tabs="['开始日期', '结束日期']" @confirm="onConfirmHandler"
			@cancel="onCancel">
			<van-date-picker v-model="startDate" :min-date="minDate" :max-date="maxDate" />
			<van-date-picker v-model="endDate" :min-date="minDate" :max-date="maxDate" />
		</van-picker-group>
	</view>
</template>

<script setup lang="ts">
	import { ref, defineEmits } from 'vue';
	import { showToast } from 'vant';

	const value = ref('');
	const showCalendar = ref(false);
	const startDate = ref(['2022', '06', '01']);
	const endDate = ref(['2023', '06', '01']);

	const minDate = new Date(2020, 0, 1);
	const maxDate = new Date(2025, 5, 1);

	const emits = defineEmits(['selectedDates']);

	const onSearch = (val) => showToast(val);

	const onFocus = () => {
		showCalendar.value = true;
	};

	const onClickButton = () => {
		if (!value.value.trim()) {
			showToast('搜索关键词不能为空');
		} else {
			showToast(value.value);
			onConfirmHandler();
		}
	};

	const onConfirmHandler = () => {
		const startTimestamp = new Date(startDate.value.join('/')).getTime();
		const endTimestamp = new Date(endDate.value.join('/')).getTime();

		if (startTimestamp > endTimestamp) {
			showToast('起始日期不能大于结束日期');
			return;
		}

		const dates = `${startDate.value.join('/')} ~ ${endDate.value.join('/')}`;
		emits('selectedDates', dates);
		showCalendar.value = false;
		value.value = dates;
	};

	const onCancel = () => {
		showCalendar.value = false;
	};
</script>