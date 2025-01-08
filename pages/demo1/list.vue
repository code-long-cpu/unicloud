<template>
	<view class="layout">
		<view class="box" v-for = "item,index in userList" :key="item._id">
			<view>序号：{{index+1}}</view>
			<view>名字：{{item.name}}</view>
			<view>年纪：{{item.age}}</view>
			<view>性别：{{item.gender}}</view>
			<view>id：{{item._id}}</view>
		</view>
	</view>
</template>

<script setup>
	import { ref } from 'vue';
	const db = uniCloud.database();
	const userList = ref([]);
	
	const getData = async()=>{
		const res = await db.collection("default-user")
		.orderBy('_id desc')
		.limit(4)
		.get();
		console.log(res)
		if(res.result.errCode===0){
			userList.value = res.result.data;
		}else{
			uni.showToast({
				title:res.result.errMsg||'返回错误',
			})
		}
	}
	
	getData()
	
</script>

<style lang="scss" scoped>
.layout{
	.box{
		padding:20rpx;
		border-bottom: solid 1rpx #eee;
	}
}
</style>
