<template>
	<view>
	    <canvas style="width: 300px; height: 200px;" canvas-id="firstCanvas" id="firstCanvas"></canvas>
	  </view>
</template>

<script lang="ts" setup>
	//原文地址 https://zhuanlan.zhihu.com/p/437718422?utm_id=0
	// 首先封装图片请求
	const getImageInfo = (url: string): Promise<string> => {
	  return new Promise((req, rej) => {
	    uni.getImageInfo({
	      src: url,
	      success: (res) => {
	        req(res.path)
	      }
	    })
	  })
	}
	// 调用
	const genPoster = async() => {
	  const imgPath = await getImageInfo('img-url') // 建议所有图片在开始绘制canvas前加载好
	
	  const ctx = uni.createCanvasContext('firstCanvas')
	  ctx.drawImage(imgPath, 0, 0, 300, 200)
	  ctx.draw()
	}
	
	
	// 封装
	const getBase64ImageInfo = (base64Data: string): Promise<string> => {
	  const fs = wx.getFileSystemManager()
	  let times = new Date().getTime()
	  let codeImg = wx.env.USER_DATA_PATH + '/' + times + '.png'
	  return new Promise((req, rej) => {
	    fs.writeFile({
	      filePath: imgPath,
	      data: base64Data,
	      encoding: 'base64',
	      success: () => {
	        req(imgPath)
	      }
	    })
	  })
	}
	
	// 调用
	const genPoster = async() => {
	  const imgPath = await getBase64ImageInfo(<your-base64-data>) // 建议所有图片在开始绘制canvas前加载好
	
	  const ctx = uni.createCanvasContext('firstCanvas')
	  ctx.drawImage(imgPath, 0, 0, 300, 200)
	  ctx.draw()
	}
</script>

<style>
</style>