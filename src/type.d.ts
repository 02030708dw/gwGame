import 'pinia';
import { ChartDefineStoreOptions } from "./plugins/TIM-plugin/type";
import TIMCore from "./plugins/TIM-plugin/TIM-core";
declare module 'pinia' {
	export interface DefineStoreOptionsBase<S, Store> {
		TIMOptions?: () => ChartDefineStoreOptions;
	}

	export interface PiniaCustomProperties {
		// TIM核心功能
		timCore : TIMCore
	}
}