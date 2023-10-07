export class Animation {
	_isAnimating = false
	_framesLeftToPlay
	
	_lastUpdate
	_duration
	_stopRequested = false
	_framesQueue = 0
	_progressThreshold = 0.35
	_changeFrame
	_settings
	// 组件上下文
	_context
	_rAF = function() {} 
	
	constructor({context, settings, changeFrame}) {
		this._context = context
		this._settings = settings
		this._changeFrame = changeFrame
		this._updateDuration()
		this._initRequestAnimationFrame()
	}
	_initRequestAnimationFrame() {
		if(window) {
			this._rAF = window.requestAnimationFrame ||
				// window['webkitRequestAnimationFrame'] ||
				// window['mozRequestAnimationFrame'] ||
				function (callback) {
					window.setTimeout(callback, 1000 / 60)
			}
		} else {
			this._rAF = (callback) => setTimeout(callback, 16.7)
		}
	}
	_play() {
		const {_rAF} = this
		this._isAnimating = true;
		this._stopRequested = false; 
		
		if(!this._context().isAnyFrameChanged) {
			this._changeFrame(1);
			this._framesLeftToPlay--;
		}
		this._lastUpdate = null;
		_rAF(this.animate.bind(this));
	}
	_stop() {
		if ( this._isAnimating ){
			// this._settings.onAnimationEnd(this._context);
		}
		this._isAnimating = false;
		this._framesLeftToPlay = undefined;
	}
	/**
	 * 根据当前状态和设置获取下一帧编号
	 * @param {Number} deltaFrames -
	 * @param {Boolean} reverse
	 * @returns {number|*}
	 */
	_getNextFrame(deltaFrames, reverse = undefined) {
		deltaFrames = Math.floor(deltaFrames);
		const context = this._context()
		if ( reverse === undefined ) reverse = this._settings.reverse;
		let newFrameNumber = reverse ? context.currentFrame - deltaFrames : context.currentFrame + deltaFrames
		// Handle loop
		if (this._settings.loop) { 
			// 循环和帧外
			if (newFrameNumber <= 0) {
				// 例如 newFrame = -2, total = 50, newFrame = 50 - abs(-2) = 48
				newFrameNumber = context.totalImages - Math.abs(newFrameNumber);
			}
			else if (newFrameNumber > context.totalImages) {
				// 例如 newFrame = 53, total 50, newFrame = newFrame - totalFrames = 53 - 50 = 3
				newFrameNumber = newFrameNumber - context.totalImages;
			}
		} else { // 无循环和帧外
			if (newFrameNumber <= 0) {
				newFrameNumber = 1;
				this._stopRequested = true;
			}
			else if (newFrameNumber > context.totalImages) {
				newFrameNumber = context.totalImages;
				 this._stopRequested = true;
			}
		}
		return newFrameNumber;
	}
	animate(timestamp) {
		if(!timestamp) timestamp = performance.now()
		if (!this._isAnimating) return;
		if (!this._lastUpdate) this._lastUpdate = performance.now();
		const context = this._context()
		let deltaFrames;
		let isLongTaskBeforeRaf = (Math.abs(timestamp - performance.now()) /  this._duration) >  this._progressThreshold;
		let progress = (timestamp -  this._lastUpdate) /  this._duration;
		if (progress >  this._progressThreshold ) isLongTaskBeforeRaf = true;
		
		if (isLongTaskBeforeRaf) {
			deltaFrames = 1
		} else {
			if (progress < 0) progress = 0;
			deltaFrames = progress * context.totalImages;
			deltaFrames = deltaFrames +  this._framesQueue; 
		}
		
		if (deltaFrames >= 1) {
			const newLastUpdate = isLongTaskBeforeRaf ? performance.now() : timestamp;
			this._framesQueue = deltaFrames % 1; 
			deltaFrames = Math.floor(deltaFrames) % context.totalImages;
			if ( deltaFrames > this._framesLeftToPlay ) deltaFrames = this._framesLeftToPlay;
			const newFrame = this._getNextFrame( deltaFrames );  
			 
			if ( this._stopRequested ) { // 动画结束后 getNextFrame()
				context.stop();
				this._stopRequested = false;
				if (context.currentFrame !== newFrame ) this._changeFrame(newFrame); //last frame fix if fps > device fps
			} else { // 动画已打开
				this._lastUpdate = newLastUpdate;
				this._changeFrame(newFrame);
				if (typeof this._framesLeftToPlay !== 'undefined') {
					this._framesLeftToPlay = this._framesLeftToPlay - deltaFrames;
					// 如果剩余0帧，立即停止，不要等待下一帧计算
					// 因为如果动画设置为真，这将是一个新的动画
					if ( this._framesLeftToPlay <= 0 ) context.stop();
				}
			}  
		} 
		const {_rAF} = this
		if ( this._isAnimating ) _rAF(this.animate.bind(this));
	}
	/**
	 * 在fps或总图像更改后重新计算动画持续时间
	 */
	_updateDuration(){
		this._duration = this._context().totalImages / this._settings.fps  * 1000;
	}
}