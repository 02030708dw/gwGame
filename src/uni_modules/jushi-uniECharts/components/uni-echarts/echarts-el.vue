/**
 *  renderjs实现的echarts组件, 直接传入option和height即可
 *  app端不支持直接传入formart回调函数, 可以利用自定义参数传进来, 然后在组件内部判断再调用组件内部的方法来实现
 *  例子下面有, 但是比较麻烦.
 *  by: KyouSeki
 */

<template>
	<view>
		<view class="echarts" :prop="option" :change:prop="echarts.delay"></view>
	</view>
</template>

<script>
	import {eventsFunc } from './events.js';
	export default {
		name: 'EchartsEl',
		props: {
			datas: {
				type: Object,
				required: true
			},
			height: {
				type: Number,
				required: 0
			},
		},
		data() {
			return {
				option: {},
			}
		},
		mounted() {
			this.$nextTick(() => {
				this.getMapData()
			})
		},
		watch: {
				//监听数据变化
			datas(newValue, oldValue) {
				console.log('oldValueEl', oldValue)
				console.log('newValueEl', newValue)
				this.getMapData()
			},
		},
		methods: {
			// 模拟从后台获取地图数据
			getMapData() {
				console.log('进来了吗El', this.datas)
				this.option = this.datas;
			},
			echartComplete(e){
				this.$emit('echartComplete')
			},
			...eventsFunc
		}
	}
</script>

<script module="echarts" lang="renderjs">
	import { events } from './events.js';
	export default {
		data() {
			return {
				timeoutId: null,
				chart: null
			}
		},
		mounted() {
			this.$nextTick(() => {
				if (typeof window.echarts === 'object') {
					this.init()
				} else {
					// 动态引入类库
					const script = document.createElement('script')
					script.src = 'static/echarts.js'
					script.onload = this.init
					document.head.appendChild(script)
				}
			})
		},
		methods: {
			/**
			 * 初始化echarts
			 */
			init() {
				// 根据id初始化图表
				this.chart = echarts.init(this.$el)
				// #ifdef APP|APP-NVUE|APP-PLUS|APP-VUE
				this.$ownerInstance.callMethod('echartComplete',{})
				// #endif
				// #ifdef H5
				this.$emit('echartComplete')
				// #endif
				this.update(this.option)
				// 事件暴露出去
				events.forEach(eventName => {
					this.chart.on(eventName, (param) => {
						delete param.event
						this.$ownerInstance.callMethod(eventName, {
							...param
						})
					})
				})
			},
			/**
			 * 防抖函数，500毫秒内只运行最后一次的方法
			 * @param {Object} option
			 */
			delay(option) {
				if (this.timeoutId) {
					clearTimeout(this.timeoutId)
					this.timeoutId = null
				}
				this.timeoutId = setTimeout(() => {
					this.update(option)
					if(option.chartsHeight){
						 this.chart.resize({height:option.chartsHeight+'px'});
					}

				}, 500)
			},
			/**
			 * 监测数据更新
			 * @param {Object} option
			 */
			update(option) {
				console.log('数据有更新El', option)
				if (this.chart) {
					// 因App端，回调函数无法从renderjs外传递，故在此自定义设置相关回调函数
					if (option) {
						// tooltip
						if (option.tooltip) {
							// 判断是否设置tooltip的位置
							if (option.tooltip.positionStatus) {
								option.tooltip.position = this.tooltipPosition()
							}
							// 判断是否格式化tooltip
							if (option.tooltip.formatterStatus) {
								option.tooltip.formatter = this.tooltipFormatter(option.tooltip.formatterUnit, option.tooltip.formatFloat2, option.tooltip.formatThousands)
							}
						}
						// 颜色渐变
						if (option.series) {
							for (let i in option.series) {
								let linearGradient = option.series[i].linearGradient
								if (linearGradient) {
									option.series[i].color = new echarts.graphic.LinearGradient(linearGradient[0],linearGradient[1],linearGradient[2],linearGradient[3],linearGradient[4])
								}
								// 随机循环颜色
								if(option.series[i].itemStyle){
									if(option.series[i].itemStyle.colorStatus){
										let colorList = []
										let borderColorList = []
										option.series[i].data.forEach((data, index)=>{
											if(option.series[i].itemStyle.detailData.currentTaskActor.split(',').indexOf(data.name) > -1){
												if(data.name == option.series[i].itemStyle.nodeKey){
													colorList.push('#ff383b')  
												}else{
													colorList.push('#ff9001') 
												}												
											}else if(option.series[i].itemStyle.detailData.currentFinishNodes && option.series[i].itemStyle.detailData.currentFinishNodes.indexOf(data.name) > -1){											
												colorList.push('#4fba4f')
											}else{
												colorList.push(data.fill)
											}
										})
										option.series[i].itemStyle.color = this.formatColors(colorList);
									}
								}
							}
						}
					}
					// 设置新的option
					this.chart.setOption(option, option.notMerge)
				}
			},
			/**
			 * 设置tooltip的位置，防止超出画布
			 */
			tooltipPosition() {
				return (point, params, dom, rect, size) => {
					// 其中point为当前鼠标的位置，size中有两个属性：viewSize和contentSize，分别为外层div和tooltip提示框的大小
					let x = point[0]
					let y = point[1]
					let viewWidth = size.viewSize[0]
					let viewHeight = size.viewSize[1]
					let boxWidth = size.contentSize[0]
					let boxHeight = size.contentSize[1]
					let posX = 0 // x坐标位置
					let posY = 0 // y坐标位置
					if (x >= boxWidth) { // 左边放的下
						posX = x - boxWidth - 1
					}
					if (y >= boxHeight) { // 上边放的下
						posY = y - boxHeight - 1
					}
					return [posX, posY]
				}
			},
			/**
			 * tooltip格式化
			 * @param {Object} unit 数值后的单位
			 * @param {Object} formatFloat2 是否保留两位小数
			 * @param {Object} formatThousands 是否添加千分位
			 */
			tooltipFormatter(unit, formatFloat2, formatThousands) {
				return params => {
					let result = ''
					unit = unit ? unit : ''
					for (let i in params) {
						if (i == 0) {
							result += params[i].axisValueLabel
						}
						let value = '--'
						if (params[i].data !== null) {
							value = params[i].data
							// 保留两位小数
							if (formatFloat2) {
								value = this.formatFloat2(value)
							}
							// 添加千分位
							if (formatThousands) {
								value = this.formatThousands(value)
							}
						}
						// #ifdef H5
						result += '\n' + params[i].seriesName + '：' + value + ' ' + unit
						// #endif

						// #ifdef APP-PLUS
						result += '<br/>' + params[i].marker + params[i].seriesName + '：' + value + ' ' + unit
						// #endif
					}
					return result
				}
			},
			/**
			 * 保留两位小数
			 * @param {Object} value
			 */
			formatFloat2(value) {
				let temp = Math.round(parseFloat(value) * 100) / 100
				let xsd = temp.toString().split('.')
				if (xsd.length === 1) {
					temp = (isNaN(temp) ? '0' : temp.toString()) + '.00'
					return temp
				}
				if (xsd.length > 1) {
					if (xsd[1].length < 2) {
						temp = temp.toString() + '0'
					}
					return temp
				}
			},
			/**
			 * 添加千分位
			 * @param {Object} value
			 */
			formatThousands(value) {
				if (value === undefined || value === null) {
					value = ''
				}
				if (!isNaN(value)) {
					value = value + ''
				}
				let re = /\d{1,3}(?=(\d{3})+$)/g
				let n1 = value.replace(/^(\d+)((\.\d+)?)$/, function(s, s1, s2) {
					return s1.replace(re, '$&,') + s2
				})
				return n1
			},
			/**
			 * 循环颜色
			 * @param {Object} value
			 */
			formatColors(colorList) {
				return params => {
					return colorList[params.dataIndex % colorList.length];
					return result
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.echarts {
		width: 100%;
		height: 100%;
	}
</style>
