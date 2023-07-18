<template>
	<u-tabbar :value="Tabbar.tabbarValue" @change="handleTabbar" :border="true" inactiveColor="#999999" zIndex="999"
		activeColor="#0087FD" :fixed="true" :placeholder="true" :safeAreaInsetBottom="true">
		<u-tabbar-item v-for="item in tabList" :text="item.text" :icon="item.name"></u-tabbar-item>
	</u-tabbar>
</template>
 
<script setup lang="ts">
import { ref } from "vue";
import { useTabbar } from "../../store/useTabbar"
import { StagingEnd, tabCustomerService, tabDriverEnd } from "./tabData/index"
const tabList = ref(StagingEnd);
console.log(tabList.value);
const Tabbar = useTabbar()

const handleTabbar = (e: any) => {
	Tabbar.tabbarValue = e;
	uni.switchTab({
		url: '/' + tabList.value[e].pagePath,
	})
}
</script>
 
<style lang="scss" scoped></style>