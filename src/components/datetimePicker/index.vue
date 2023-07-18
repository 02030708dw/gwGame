<template>
	  <u-datetime-picker
				ref="datetimePicker"
				:show="props.isPicker" 
				mode="date"
				:formatter="formatter"
				@confirm="confirm"
				@cancel="cancel"
				v-model="value1"
	        ></u-datetime-picker>
	<!-- <u-action-sheet round="10" :actions="props.lipei==1?list:list2" :show="props.isSheet" @select="selectClick"></u-action-sheet> -->
</template>

<script setup lang="ts"> 
import {ref} from "vue";
	const emits = defineEmits(['handleClosePicker','handleConfirmPicker']);
	const props = defineProps(['isPicker']); 
	var value1= ref(Number(new Date())) 
	// const selectClick = (v : any) => {
	// 	 emits("handlePicker", v.name);
		 
	// }
	const formatter=(type: any, value: any) =>{
	                if (type === 'year') {
	                    return `${value}年`
	                }
	                if (type === 'month') {
	                    return `${value}月`
	                }
	                if (type === 'day') {
	                    return `${value}日`
	                }
	                return value
	            }
				const confirm=(v:any)=>{
					 
				const timeFormat = uni.$u.timeFormat;
				emits("handleConfirmPicker",{
					dates:timeFormat(v.value,'yyyy-mm-dd'),
					valString:v.value
				});
				  // console.log("==============>",timeFormat(v.value,'yyyy-mm-dd hh:MM'));
					  emits("handleClosePicker"); 
				}
				 
				const cancel=()=>{
						 emits("handleClosePicker"); 
				}
</script>

<style>
</style>