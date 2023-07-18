 

<template>
    <view class="rTab">
        <view class="rTabText" :class="name==item.name?'activeTabText':''" @click="handleTab(item)" v-for="item in propDtata.list" :key="item.name">
            <view>{{ item.name }}</view>
            <view   :class="name==item.name?'actives':''"></view>
        </view>
    </view>
</template>
 
<script setup lang="ts">

// https://blog.csdn.net/qq_27517377/article/details/123163381
import { ref, reactive } from 'vue'
const name =ref<any>('进行中')
const propDtata = defineProps({
    list: {
        type: Array,
        default: [{
            name: '进行中',
        }, {
            name: '已完成',
        }, {
            name: '已取消'
        }]
    },

})
const handleTab = (item:any) => {
    name.value = item.name
    console.log("======")
}
const leftClick = () => {
    console.log("===leftClick===")
}

</script>
<style scoped lang="scss">
.rTab {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    align-items: center;
}

.rTabText {
    color: #999;
    font-size: 14px;
    height: 40px;
    line-height: 40px; 
}

.activeTabText {
    color: #333;
    font-size: 16px;
}

.actives {

    /* margin-left: 30px; */
    width: 70rpx;
    height: 8rpx;
    margin: 0 auto;
    margin-top: -8px;
    border-radius: 4px;
    background: linear-gradient(90deg, #0088FF 0%, #0088FF 100%);
}
</style>