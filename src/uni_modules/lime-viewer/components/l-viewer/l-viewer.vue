<template>
	<view 
		class="lime-viewer" 
		id="viewer"
		@touchstart="touchStart"
		@touchmove="touchMove"
		@touchend="touchEnd"
		>
		<view v-if="!isAnyPreloadFinished || !images.length" class="loading">
			<slot v-if="$slots.loading" name="loading"></slot>
			<block v-else>
				<view class="loading-inner">{{progress}}%</view>
			</block>
		</view>
		<view class="item" v-for="(item, index) in images" :key="item" :style="'opacity: ' + (currentFrame === index + 1 ? 1 : 0)">
			<image class="item-img" lazy-load mode="widthFix" :src="item" @load="imageLoad"></image>
		</view>
	</view>
</template>
<script>
	import {Animation} from './animation'
	import {DragInput} from './dragInput'
	import {normalizeFrameNumber} from './utils'
	export default {
		props: {
			images: {
				type: Array,
				default:() => []
			},
			fps: {
				type: Number,
				default: 30,
			},
			loop: {
				type: Boolean,
				default: true
			},
			autoplay: Boolean,
			reverse: Boolean,
			inversion: Boolean,
			draggable: {
				type: Boolean,
				default: true
			},
			dragModifier: {
				type: Number,
				default: 1
			},
			// fillMode: {
			// 	type: String,
			// 	default: 'contain'
			// }
		},
		data() {
			return {
				currentFrame: 1,
				colorActive: 0,
				loading: 0,
				element: null,
				inInit: false,
				isAnyPreloadFinished: false,
				isAnyFrameChanged: false,
				animation: null,
				dragInput: null,
				deferredAction: null
			}
		},
		watch:{
			images() {
				this.loading = 0
			}
		},
		computed: {
			progress() {
				let num = ((this.loading) / (this.totalImages || 1) * 100).toFixed(0)
				this.isAnyPreloadFinished = num * 1 === 100
				this.$emit('progress', num)
				return num
			},
			totalImages() {
				return this.images.length
			},
			settings() {
				const {fps, loop, autoplay, reverse, fillMode, dragModifier, inversion} = this
				return {fps, loop, autoplay, reverse, fillMode, dragModifier, inversion}
			},
		},
		mounted() {
			this.$nextTick(this.getRect)
			this.$watch('progress', (v) => {
				// if(this.inInit && this.autoplay && this.isAnyPreloadFinished) this.play();
				// if(this.inInit) return
				if(!this.inInit && this.isAnyPreloadFinished) {
					this.inInit = true
					this.animation = new Animation({
						settings: this.settings,
						context: this.getContext.bind(this),
						changeFrame:  this.changeFrame.bind(this)
					})
					if ( this.autoplay) this.play();
					if ( this.draggable ) this.toggleDrag(true);
				}
				
			})
		},
		methods: {
			getContext() {
				return this
			},
			getRect() {
				uni.createSelectorQuery().in(this).select('#viewer').boundingClientRect().exec(res => {
					this.element = res[0]
				})
			},
			toggleDrag(enable) {
				if(enable) {
					if(!this.dragInput) this.dragInput = new DragInput({
						context: this.getContext.bind(this),
						settings: this.settings,
						changeFrame: this.changeFrame.bind(this),
						getNextFrame: this.animation._getNextFrame.bind(this.animation)
					})
					this.dragInput._enableDrag();
				} else {
					if (this.dragInput) this.dragInput._disableDrag();
				}
			},
			imageLoad(e) {
				this.loading++
			},
			play() {
				if(this.animation._isAnimating) return this
				if(this.isAnyPreloadFinished) {
					this.animation._play();
				} else {
					this.deferredAction = this.play.bind(this)
				}
			},
			stop() {
				this.animation._stop();
			},
			next() {
				if(this.isAnyPreloadFinished) {
					this.stop();
					this.changeFrame( this.animation._getNextFrame(1) );
				} else {
					this.deferredAction = this.next.bind(this);
				}
			},
			prev() {
				if (this.isAnyPreloadFinished) {
					this.stop();
					this.changeFrame( this.animation._getNextFrame(1, !this.reverse) );
				} else {
					this.deferredAction = this.prev.bind(this);
				}
			},
			toggle() {
				if (!this.animation._isAnimating) this.play();
				else this.stop();
			},
			setFrame(frameNumber) {
				if ( this.isAnyPreloadFinished ) {
					this.stop();
					this.changeFrame(normalizeFrameNumber(frameNumber, this.totalImages));
				} else {
					this.deferredAction = this.setFrame.bind(this, frameNumber)
				}
			},
			changeFrame(frameNumber) {
				if(this.currentFrame == frameNumber && this.isAnyFrameChanged) return
				if(!this.isAnyFrameChanged) this.isAnyFrameChanged = true
				this.currentFrame = frameNumber
			},
			getCurrentFrame() {
				return this.currentFrame
			},
			
			touchStart(e) {
				this.dragInput && this.dragInput.swipeHandler(e)
			},
			touchMove(e) {
				this.dragInput && this.dragInput.swipeHandler(e)
			},
			touchEnd(e) {
				this.dragInput && this.dragInput.swipeHandler(e)
			},
		}
	}
</script>
<style scoped lang="scss">
	.lime-viewer
		{width: 100%;
		height: 100%;
		flex: 1;
		touch-action: none;
		display: flex;
		position: relative}
		.loading{
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
			z-index: 1}
			 .inner{
				width: 50px;
				height: 50px;
				line-height: 50px;
				background-color: rgba(0,0,0,0.5);
			 
				text-align: center;
				border-radius: 50%}
		.item
			{position: absolute;
			left: 50%;
			transform: translateX(-50%);
			width: 100%;
			height: 100%;
			// padding: 0 18px;
			-webkit-box-sizing: border-box;
			box-sizing: border-box;
			display: flex;
			align-items: center}
			 img
				{width: 100%;
				transform: translateY(10px)}
		
			
</style>
