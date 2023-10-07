import {
	isObject,
	isArray,
	isFunction,
	isString
} from 'lodash';

// 定义事件
const events = ['click'];

// 获取事件名
const getEventName = (eventName) => {
	return `echart${eventName.substring(0, 1).toUpperCase()}${eventName.substring(1)}`
}

// 定义事件方法
let eventsFunc = {};

// 定义传入事件参数名
let eventsFuncProps = {}

events.forEach(eventName => {
	let propEventName = getEventName(eventName)

	eventsFunc[eventName] = function(...param) {
		// 直接调用方法
		this.$emit(propEventName, ...param)
	}

	eventsFuncProps[propEventName] = {
		type: Function
	}
})


export {
	events,
	eventsFunc,
	getEventName,
	eventsFuncProps,
}
