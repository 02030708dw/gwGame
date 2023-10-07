<template>
	<view style="width: 100%;height: 100%;">
		<!-- #ifdef MP-WEIXIN -->
		<wxEcharts id="order" :canvasId="canvasId" :ref="canvasId" :onInit="initEcharts"></wxEcharts>
		<!-- #endif -->
		<!-- #ifdef H5|APP-PLUS|APP-VUE|APP -->
		<echartsEl ref="echartsEl" :datas="eOption"  @echartClick="onclick" style="width: 100%;height:100%;"
		 @echartComplete="echartComplete">
		</echartsEl>
		<!-- #endif -->
	</view>
</template>


<script>
	import echartsEl from './uni-echarts/echarts-el.vue'

	import wxEcharts from './wx-echarts/echarts.vue'
	import echarts from './echarts.js'
	let chart = null
	let mThis = null
	export default {
		components: {
			wxEcharts,
			echartsEl
		},
		props: {
			canvasId: {
				type: String,
				default: 'wx-echarts'
			},
			option: {
				type: Object,
				default: () => {
					return {}
				}
			}
		},
		data() {
			return {
				eOption: this.option
			}
		},
		watch: {
			option(val) {
				this.eOption = val
				// #ifdef MP-WEIXIN
				chart.setOption(mThis.option)
				// #endif
			}
		},
		created() {
			mThis = this
		},
		methods: {
			initEcharts(canvas, width, height) {
				chart = echarts.init(canvas, null, {
					width: width,
					height: height
				});
				canvas.setChart(chart)
				chart.setOption(mThis.option)
				chart.on('click',(params)=>{
					mThis.onclick(params)
				})
				mThis.initFinish()
				return chart
			},
			initFinish() {
				this.$emit('onEchartsComplete')
			},
			echartComplete(){
				this.initFinish()
			},
			onclick(e){
				this.$emit('echartClick',e)
			}
		}
	}
</script>
<style>
</style>