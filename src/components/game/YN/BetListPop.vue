<template>
  <u-popup :show="show" :round="10" mode="bottom" @close="close">
    <view class="bet-box">
      <view class="top">
        <text style="font-size: 24rpx; color: #333">20230902-0292</text>
        <text class="title">Bet Details</text>
        <image
          class="close"
          src="/src/static/images/close.png"
          @click="close"
        />
      </view>
      <scroll-view scroll-y="true" class="scroll-view">
        <view class="item" v-for="(item,index) in list" v-if="list.length" :key="item.id">

          <text class="title">[{{ item.gamePlayCode}}]</text>
          
          <text class="num" v-if="!(item.gamePlayTypeName=='3D')">
            {{ item.betNums.slice(0,4).join(',') }}
            <text v-if="item.betNums.length>4" class="more" @click="more(`${item.id}`)">更多</text>
          </text>

          <text class=num v-else>
            {{ item.betNums.slice(0,3).join(',') }}
            <text v-if="item.betNums.length>3" class="more" @click="more(`${item.id}`)">更多</text>
          </text>

          <view class="tmis-box">
             <input type="text" v-model="times[index]" />
            <text class="tmis" style="width: 82rpx; height: 44rpx">Tmis</text>
          </view>
          <image
            src="/src/static/images/del.png"
            style="width: 44rpx; height: 44rpx"
            @click="del(item,index)"
          />
          <!-- <text class="title">[{{ item.gamePlayCode }}]</text> -->
        </view>
        
        <view v-else style="line-height:404rpx;text-align: center;">暂无历史记录</view>
        <!-- 不要动这两个v-show 每行代码都有他存在的意义 -->
        <pre v-show="false">{{ times }}</pre>
        <pre v-show="false">{{ list }}</pre>
      </scroll-view>
      <view class="condinm-box">
        <view class="condinm-tmis">
          <input type="text" placeholder="1" v-model="Alltimes"/>
          <text @click="changeAllTimes">Tmis</text>
        </view>
        <view class="condinm">Condinm</view>
      </view>
      <view class="bottom">

        <image
          src="@/static/images/footerleft.png"
          style="width: 64rpx; height: 52rpx; margin-right: 20rpx"
        />
        <view class="titleLeft">27,973.00</view>
        <u-icon name="arrow-right" color="#999" size="16"></u-icon>
        <image
          src="@/static/images/footerq1.png"
          style="width: 64rpx; height: 64rpx; margin-left: 100rpx"
        />
        <image
          src="@/static/images/footerq2.png"
          style="width: 64rpx; height: 64rpx; margin-left: 16rpx"
        />
        <view class="btn" @click="emits('bet')">投注</view>
      </view>
    </view>
  </u-popup>
</template>
<script setup lang="ts">
import {ref,watch,toRef} from 'vue'
const props = defineProps(["show", "list"]);
const emits = defineEmits(["close","del","bet"]);
const lists=toRef(props,'list')
const delIndex=ref()//删除的id,为了删除倍数
const close = () => {
  emits("close");
};
const del=(item:any,index:number)=>{
  delIndex.value=index
    emits('del',item)
}
const Alltimes=ref(1)
const times:any=ref([])
// 

watch(lists,(newvalue,oldvalue)=>{
  // 监听增加或者减少
  if(newvalue.length-oldvalue.length>0){
    times.value.push(1)
  }else if(oldvalue.length-newvalue.length>0){
    let index=findMissingIndexes(oldvalue,newvalue)
    times.value.splice(index,1)
  }
  correct()
},{deep:true,immediate:false})

const changeAllTimes=()=>{
  props.list.forEach((item:any)=>{
    item.times=Alltimes.value
  })
  times.value=props.list.map((item:any)=>item.times)
}


const more=(id:string)=>{
  console.log(id)
}
function correct(){
  // 防止记录倍数的数据没有已选号码多
  let num= lists.value.length-times.value.length
  if(num>0){
    for(let i=0;i<num;i++){
      times.value.push(1)
    }
  }
}

function findMissingIndexes(oldvalue:any, newvalue:any) {  
    let missingIndexes ;  
    for (let i = 0; i < oldvalue.length; i++) {  
        let found = false;  
        for (let j = 0; j < newvalue.length; j++) {  
            if (oldvalue[i].gamePlayCode === newvalue[j].gamePlayCode) {  
                found = true;  
                break;  
            }  
        }  
        if (!found) {  
            missingIndexes=i;  
        }  
    }  
    return missingIndexes;  
}  
</script>
<style lang="scss" scoped>
.bet-box {
  background-color: #fff;
  width: 750rpx;
  height: 750rpx;
  .top {
    height: 96rpx;
    box-sizing: border-box;
    padding: 32rpx;
    display: flex;
    align-items: center;
    .title {
      font-size: 32rpx;
      color: #ffb023;
      margin-left: 72rpx;
    }
    .close {
      width: 32rpx;
      height: 32rpx;
      margin-left: 226rpx;
    }
  }
  .scroll-view {
    background-color: #f9f9f9;
    height: 470rpx;
    box-sizing: border-box;
    padding: 32rpx;
    .item {
      background-color: #fff;
      margin-bottom: 16rpx;
      height: 92rpx;
      border-radius: 16rpx;
      box-sizing: border-box;
      padding: 0 30rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .title{
        word-wrap: break-word;
        width: 160rpx; 
        font-size: 24rpx;
      }
      .num{
        width: 160rpx; 
        font-size: 28rpx; 
        color: #00cd6a;
        position: relative; 
        .more{
          position: absolute;right: -60rpx;top: -4rpx; color: #000;
        }
      }
      .tmis-box {
        transform: translateX(20rpx);
        width: 130rpx;
        height: 44rpx;
        border-radius: 8rpx;
        border: 1rpx solid #dedede;
        display: flex;
        input {
          width: 146rpx;
          height: 44rpx;
        }
        .tmis {
          line-height: 44rpx;
          text-align: center;
          width: 82rpx;
          height: 44rpx;
          background-color: #efefef;
          font-size: 24rpx;
          color: #333;
        }
      }
    }
  }
  .condinm-box {
    height: 104rpx;
    box-sizing: border-box;
    padding: 0 32rpx;
    display: flex;
    align-items: center;
    .condinm-tmis {
      box-sizing: border-box;
      width: 268rpx;
      height: 46rpx;
      background: #ffffff;
      border-radius: 8rpx;
      border: 1rpx solid #dedede;
      display: flex;
      font-size: 24rpx;
      input {
        width: 186rpx;
        height: 46rpx;
      }
      text {
        width: 82rpx;
        height: 46rpx;
        background-color: #efefef;
        color: #333;
        text-align: center;
        line-height: 46rpx;
      }
    }
    .condinm {
      text-align: center;
      box-sizing: border-box;
      width: 164rpx;
      height: 46rpx;
      line-height: 46rpx;
      border-radius: 8rpx;
      border: 1rpx solid #dedede;
      font-size: 24rpx;
      font-weight: 400;
      color: #333333;
      margin-left: 48rpx;
    }
  }
  .bottom {
    width: 750rpx;
    position: absolute;
    bottom: 0;
    background-color: #fff;
    position: fixed;
    width: 750rpx;
    height: 96rpx;
    bottom: 0;
    box-sizing: border-box;
    padding: 0 32rpx;
    display: flex;
    align-items: center;
    .btn {
      width: 152rpx;
      height: 72rpx;
      background: #ffb023;
      border-radius: 8rpx;
      font-size: 44rpx;
      font-weight: 600;
      color: #ffffff;
      line-height: 72rpx;
      text-align: center;
      margin-left: 32rpx;
    }
  }
}
</style>
