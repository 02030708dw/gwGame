<template>
	<view class="search-date-picker">
		<van-search input-align=center shape=round right-icon="calendar-o" v-model="value" show-action label="" placeholder="请输入搜索关键词"
			@search="onSearch" @focus="onFocus">
			<template #action>
				<u-button  shape="circle" type="warning" style="height: 30px;" text="搜索" @click="onClickButton"></u-button>
			</template>
		</van-search>
		<van-overlay z-index="100" :show="showOverlay" @click="onCancel">
			<div class="wrapper" @click.stop>
			    <div class="block">
					<van-picker-group  title="查询日期" :tabs="['开始日期', '结束日期']" @confirm="onConfirmHandler"
						@cancel="onCancel">
						<van-date-picker v-model="startDate" :min-date="minDate" :max-date="maxDate" />
						<van-date-picker v-model="endDate" :min-date="minDate" :max-date="maxDate" />
					</van-picker-group>
				</div>
			  </div>
		</van-overlay>
	</view>
</template>

<script setup lang="ts">
	import { ref, defineEmits } from 'vue';
	import { showToast } from 'vant';

	const value = ref('');
	// const showCalendar = ref(false);
	const showOverlay = ref(false);
	const startDate = ref(['2022', '06', '01']);
	const endDate = ref(['2023', '06', '01']);

	const minDate = new Date(2020, 0, 1);
	const maxDate = new Date(2025, 5, 1);

	const emits = defineEmits(['selectedDates']);

	const onSearch = (val:any) => showToast(val);

	const onFocus = () => {
		// showCalendar.value = true;
		showOverlay.value = true;
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
		// showCalendar.value = false;
		showOverlay.value = false; 
		value.value = dates;
	};
	const onCancel = () => {
		// showCalendar.value = false;
		showOverlay.value = false; 
	};
</script>
<style scoped >
	 .wrapper {
	    display: flex;
	    align-items: center;
	    justify-content: center;
	    height: 100%;
		.block{
			width: 80%;
		}
	  }
	 /deep/ .van-tabs__wrap{
		  display: flex;
		  justify-content: center;
	  }
</style>