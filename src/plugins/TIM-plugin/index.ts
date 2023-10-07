// IM SDK的初始化
// 插件登录功能
// 收发功能
// 可以返回并在pinia在pinia模块里面注册一个tim事咧

import {PiniaPluginContext} from "pinia";
import TIMCore from "./TIM-core";
export default (context:PiniaPluginContext) =>{
	console.log('----context---2---->>>>>>>', context)
	// console.log('----context------->>>>>>>', context.options?.TIMOptions)
	//如果有TIMOptions，说明此模块需要IM 
	if(context.options?.TIMOptions){
		const timeCore = new TIMCore(context.options.TIMOptions());
		context.store.timCore=timeCore;
	}
}