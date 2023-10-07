// 事件处理
export class DragInput {
	_isSwiping = false
	
	_prevX = 0
	_prevY = 0
	_curX = 0
	_curY = 0
	
	_threshold
	_pixelsCorrection
	_lastInteractionTime
	_prevDirection
	
	_changeFrame
	_getNextFrame
	
	_context
	_settings
	
	_boundSwipeHandler
	constructor({context, settings, changeFrame, getNextFrame}) {
		this._context = context;
		this._settings = settings
		this._changeFrame = changeFrame;
		this._getNextFrame = getNextFrame;
		
		this._isSwiping = false;
		this._pixelsCorrection = 0;
		this._boundSwipeHandler = this.swipeHandler.bind(this)
		this._updateThreshold()
	}
	_enableDrag() {}
	_disableDrag() {}
	/**
	 * 更新一帧阈值（像素）
	 * @param newValue
	 */
	_updateThreshold(newValue = null){
		if (newValue) {
			this._threshold = newValue;
		} else {
			const context = this._context()
			this._threshold = context.element.width / context.totalImages;
		}
	}
	swipeHandler(event) {
		let touches;
		if ( event.touches !== undefined && event.touches.length ) touches = event.touches;
		this._curX = (touches) ? (touches[0].pageX || touches[0].x) : event.clientX;
		this._curY = (touches) ? (touches[0].pageY || touches[0].y) : event.clientY;
		switch(event.type) {
			case 'touchstart':
				if ( event.type === 'touchstart' && event.cancelable ) {
					this.maybeDisableScroll(event);
				}
				this.swipeStart();
				break;
			case 'touchmove':
				const wasMoved = (this._prevX !== this._curX && this._prevY !== this._curX);
				if ( this._isSwiping && wasMoved) {
					this.swipeMove();
				}
				break;
			case 'touchend': 
				if ( this._isSwiping ) {
					this.swipeEnd();
				}
				break;
		}
	}
	swipeStart() {
		this._context().stop()
		this._isSwiping = true;
		this._prevX = this._curX;
		this._prevY = this._curY;
	}
	swipeMove() {
		const direction = this.swipeDirection();
		const context = this._context()
		if(this._prevDirection && this._prevDirection !== direction) {
			 this._pixelsCorrection = 0;
		}
		this._prevDirection = direction;
		const pixelDiffX = Math.abs(this._curX - this._prevX );
		const swipeLength = (pixelDiffX + this._pixelsCorrection) * this._settings.dragModifier;
		
		this._prevX = this._curX; 
		this._prevY = this._curY;
		
		if ((direction !== 'left' && direction !== 'right') || (swipeLength < this._threshold)) { 
			this._pixelsCorrection += pixelDiffX;
			return;
		} 
		const progress = swipeLength / context.element.width;
		let deltaFrames = Math.floor(progress * context.totalImages);
		deltaFrames = deltaFrames % context.totalImages;
		
		this._pixelsCorrection = (swipeLength - (this._threshold * deltaFrames)) / this._settings.dragModifier;
		let isReverse = (direction === 'left');
		if (this._settings.inversion) isReverse = !isReverse;
		let frame = this._getNextFrame && this._getNextFrame( deltaFrames, isReverse ) || 0
		this._changeFrame(frame);
	}
	swipeEnd() {
		this._curX = this._curY = this._prevX = this._prevY = null;
		this._isSwiping = false;
		this._lastInteractionTime = new Date().getTime();
	}
	swipeDirection() {
		let r, swipeAngle,
			xDist = this._prevX - this._curX,
			yDist = this._prevY - this._curY;
		r = Math.atan2(yDist, xDist);
		swipeAngle = Math.round(r * 180 / Math.PI);
		if (swipeAngle < 0) swipeAngle = 360 - Math.abs(swipeAngle);

		if ( (swipeAngle >= 0 && swipeAngle <= 60) || (swipeAngle <= 360 && swipeAngle >= 300 )) return 'left';
		else if ( swipeAngle >= 120 && swipeAngle <= 240 ) return 'right';
		else if ( swipeAngle >= 241 && swipeAngle <= 299 ) return 'bottom';
		else return 'up';
	}
	maybeDisableScroll(event){
		// always prevent
		if (this._settings.touchScrollMode === "preventPageScroll") event.preventDefault();
		// check timer
		if (this._settings.touchScrollMode === "pageScrollTimer") {
			const now = new Date().getTime();
			// less time than delay => prevent page scroll
			if (this._lastInteractionTime && (now - this._lastInteractionTime < this._settings.pageScrollTimerDelay) ){
				event.preventDefault();
			} else { // more time than delay or first interaction => clear timer
				this._lastInteractionTime = null;
			}
		}
		// if touchScrollMode="allowPageScroll" => don't prevent scroll
	}
}