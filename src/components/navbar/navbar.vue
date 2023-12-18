<template>
    <view class="navHeaderStyle">
        <view class="navHeaderLeft">
            <image src="@/static/images/message-fav.png"></image>
            <view>{{ propDtata.titleLeft }}</view>
        </view>
        <view class="navHeaderCenter">{{ propDtata.title }}</view>
        <view class="navHeaderRight">
            <image src="@/static/images/xioaxiright.png"></image>
        </view>
    </view>
</template>
<script setup lang="ts">
// https://blog.csdn.net/qq_27517377/article/details/123163381
import { ref, reactive } from 'vue'
const propDtata = defineProps({
    title: {
        type: String,
        default: ""
    },
    titleLeft: {
        type: String,
        default: ""
    },
    iconRight: {
        type: String,
        default: ""
    }
})
const rightClick = () => {
    console.log("======")
}
const leftClick = () => {
    console.log("===leftClick===")
}

</script>
<style scoped lang="scss">
.navHeaderStyle {
    height: 88rpx;
    line-height: 88rpx;
    padding: 0 20rpx;
    display: flex;
    flex-direction: row;
    align-content: center;
    justify-content: space-between;
    background-color: #CDE7FF ;
}
.navHeaderLeft{
    display: flex;
    flex-direction: row;
    align-content: center;
    align-items: center;
    font-size: 24rpx;
    color:#666666 ;
}
.navHeaderLeft image{
    width: 40rpx;
    height: 40rpx;
    border-radius: 20rpx;
    margin-right: 10rpx;
}
.navHeaderCenter {
    color: #333333;
    font-weight: 600;
}

.navHeaderRight image {
    width: 20px;
    height: 20px;
    display: inline-block;
}
</style>