GoImage() {
	uni.chooseImage({
		count: 2,
		sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
		sourceType: ['album'], // 从相册选择
		success: (res) => {
			let message = this.tim.createImageMessage({
				// to: '5MYfeMTrSEvmAF1cLct',
				to: this.orderid,
				conversationType: this.TIM.TYPES.CONV_GROUP,
				payload: {
					file: res
				},
				onProgress: function(event) {
					console.log('file uploading:', event)
				}
			});
			// 2. 发送消息
			let promise = this.tim.sendMessage(message);
			// this.messages.push(message)    
			promise.then((imResponse) => {
				this.messages.push(message)
				this.scrollToBottom()
				uni.setStorage({
					key: 'messages',
					data: this.messages
				})
				console.log(message);
				// 发送成功
				console.log(imResponse);
			}).catch((imError) => {
				// 发送失败
				console.warn('sendMessage error:', imError);
			});
		}
	});
},