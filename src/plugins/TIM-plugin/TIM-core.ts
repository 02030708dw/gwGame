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
import { useSaveTimUser } from "@/plugins/TIM-plugin/loginParams.pinia";


export default class TIMCore {
	public tim : ChatSDK | undefined;
	public userID = '';

	constructor(props : ChartDefineStoreOptions) {
		this.initTimSdk(props.SDKAppID)
	}

	private initTimSdk = (SDKAppID : number) => {
		console.log('SDKAppID==-----------------=====>', SDKAppID)
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
		//每次进入都调用一下，看是否保持登录
        this.persistedLogin();

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
	private persistedLogin =() =>{
		/**
		 * 看pinia里面是否有 TIMCoreLoginParams 数据
		 * 如果有userID就重新登录
		 * 
        **/
		const storeSaveTimUser = useSaveTimUser();
		const timLoginParams =storeSaveTimUser.TIMCoreLoginParams;
		if(timLoginParams?.userID){
			this.timLogin(timLoginParams)
		}
		console.log('----timLoginParam------->>>>>>>', timLoginParams)
	}
	public timLoginOut = () =>{
		this.unBindTIMEvent();
		// 退出IM登录
		this.tim?.logout();
	}
	//解绑所有的监听事件，目前只有两个
	public unBindTIMEvent = () =>{
		this.tim?.off(TencentCloudChat.EVENT.MESSAGE_RECEIVED,()=>{}) 
		this.tim?.off(TencentCloudChat.EVENT.SDK_READY,()=>{}) 
	}
	public timLogin = async (options : TIMCoreLoginParams) => {
		console.log('----options------->>>>>>>', options)
		const storeSaveTimUser = useSaveTimUser()
		// 第一步登录SDK
		await this.tim?.login(options);
		// 持久化相关密钥
		storeSaveTimUser.saveTimUser(options);
		
		this.userID = options.userID;
		this.bindTIMEvent();
	}
	// 绑定相关的监听事件
	private bindTIMEvent = () => {
		// 监听SDK准备完成事件
		this.tim?.on(TencentCloudChat.EVENT.SDK_READY, this.handleSDKReady, this)
	}
	private handleSDKReady = () => {
		console.log('SDK准备完成')
		/**
		 * onReady 方法是每次准备完成就要调用的接口
		 * 
		**/
		this.onReady()
		this.tim?.on(TencentCloudChat.EVENT.MESSAGE_RECEIVED, this.handleMessageReceived, this)
	}
	public onReady =() =>{
		
	}
	private handleMessageReceived = (event : any) => {
		console.log('接收到的消息', event);
		this.messageReceived(event)
	}
	/**
	 * 向外暴露接收消息的方法
	 * @param event
	*/
	public messageReceived = (event : any) => {

	}
	// 发送消息,并且创建消息类型
	// payload的类型自定义
	private getMessageOptions = (userID : string, payload : any) => {
		return this.tim?.createTextMessage({
			to: userID,
			conversationType: TencentCloudChat.TYPES.CONV_C2C,
			// 消息优先级，用于群聊。如果某个群的消息超过了频率限制，后台会优先下发高优先级的消息
			// priority: TencentCloudChat.TYPES.MSG_PRIORITY_NORMAL,
			payload,
			// 如果您发消息需要已读回执，需购买旗舰版套餐，并且创建消息时将 needReadReceipt 设置为 true
			needReadReceipt: true
			// 消息自定义数据（云端保存，会发送到对端，程序卸载重装后还能拉取到）
			// cloudCustomData: 'your cloud custom data'
		});
	}
	public sendMessage = async (userID : string, payload : any) => {
		// 创建消息
		const messageOption = this.getMessageOptions(userID, payload);
		//发送消息 !发送消息，强制以为他有
		await this.tim?.sendMessage(messageOption!);
		console.log('发送成功------')
	}

}