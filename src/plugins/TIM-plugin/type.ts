export interface ChartDefineStoreOptions {
	SDKAppID : number
}

export interface TIMCoreLoginParams {
	userID : any
	userSig : any
}
export interface TIMPayload {
	payload : {
		text : string
	}
	type : string
	flow : string
}