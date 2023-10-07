/**
 * IM核心功能
 * 
 * 
**/
// 如果您已集成 v2.x 的 SDK，想升级到 V3 并且想尽可能地少改动项目代码，可以继续沿用 TIM
// import TIM from '@tencentcloud/chat';
import TencentCloudChat, { ChatSDK } from '@tencentcloud/chat';
import TIMUploadPlugin from 'tim-upload-plugin';
import TIMProfanityFilterPlugin from 'tim-profanity-filter-plugin';
import { ChartDefineStoreOptions, TIMCoreLoginParams } from "./type";


export default class TIMCore {
	public tim : ChatSDK | undefined;
	public userID = '';

	constructor(props : ChartDefineStoreOptions) {
		this.initTimSdk(props.SDKAppID)
	}

	private initTimSdk = (SDKAppID : number) => {
		console.log('SDKAppID==-----------------=====>',SDKAppID)
		let options = {
			SDKAppID // 接入时需要将0替换为您的即时通信 IM 应用的 SDKAppID
		};
		// 创建 SDK 实例，`TIM.create()`方法对于同一个 `SDKAppID` 只会返回同一份实例
		let chat = TencentCloudChat.create(options); // SDK 实例通常用 chat 表示


		chat.setLogLevel(0); // 普通级别，日志量较多，接入时建议使用
		// chat.setLogLevel(1); // release 级别，SDK 输出关键信息，生产环境时建议使用		
		// 注册腾讯云即时通信 IM 上传插件
		chat.registerPlugin({ 'tim-upload-plugin': TIMUploadPlugin });
		this.tim = chat;

		// 注册腾讯云即时通信 IM 本地审核插件
		chat.registerPlugin({ 'tim-profanity-filter-plugin': TIMProfanityFilterPlugin });


		// 注意！以下代码适用于 uni-app -> native app 项目集成离线推送能力。
		// 应合规要求，在用户同意隐私协议的前提下，登录成功后 SDK 会通过推送插件获取推送 token
		// 并将推送 token 传递至后台（若获取 token 失败则会导致离线推送无法正常使用）
		// const TUIOfflinePush = uni.requireNativePlugin("TencentCloud-TUIOfflinePush");
		// chat.registerPlugin({
		// 	'tim-offline-push-plugin': TUIOfflinePush,
		// 	'offlinePushConfig': {
		// 		// huawei
		// 		'huaweiBusinessID': '', // 在腾讯云控制台上传第三方推送证书后分配的证书 ID
		// 		// xiaomi
		// 		'xiaomiBusinessID': '', // 在腾讯云控制台上传第三方推送证书后分配的证书 ID
		// 		'xiaomiAppID': '', // 小米开放平台分配的应用 APPID
		// 		'xiaomiAppKey': '', // 小米开放平台分配的应用 APPKEY
		// 		// meizu
		// 		'meizuBusinessID': '', // 在腾讯云控制台上传第三方推送证书后分配的证书 ID
		// 		'meizuAppID': '', // 魅族开放平台分配的应用 APPID
		// 		'meizuAppKey': '', // 魅族开放平台分配的应用 APPKEY
		// 		// vivo
		// 		'vivoBusinessID': '', // 在腾讯云控制台上传第三方推送证书后分配的证书 ID
		// 		// oppo
		// 		'oppoBusinessID': '', // 在腾讯云控制台上传第三方推送证书后分配的证书 ID
		// 		'oppoAppKey': '', // oppo 开放平台分配的应用 APPID
		// 		'oppoAppSecret': '', // oppo 开放平台分配的应用 Secret
		// 		// ios
		// 		'iosBusinessID': '', // 在腾讯云控制台上传第三方推送证书后分配的证书 ID
		// 	}
		// });=> void

	}
	public timLogin = async (options : TIMCoreLoginParams) => {
		console.log('----options------->>>>>>>',options)
		// 第一步登录SDK
		await this.tim?.login(options);
		this.userID = options.userID

	}
	 
}