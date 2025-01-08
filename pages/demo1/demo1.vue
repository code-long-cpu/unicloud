<template>
	<view class="layout">
		<input v-model="formData.name" placeholder="请输入名称"/>
		<input v-model.number="formData.age" placeholder="请输入年龄"/>
		<button @click="handleAdd">新增</button>
	</view>
</template>

<script setup>
	import {ref} from 'vue';
	const db = uniCloud.database();
	const formData = ref({
		name:'',
		age:''
	})
	const handleAdd =async()=>{
		uni.showLoading({
			title: '新增中..',
		});
		// ①promise sync和await的分层语法
		try{
			const res = await db.collection("default-user").add(formData.value)
			if(res.result.errCode===0){
				uni.showToast({
					title:"新增成功"
				})
			}
			console.log(res)
		}catch(err){
			uni.showModal({
				content:err.errMsg||'新增失败',
				showCancel:false
			})
			console.log(err)
		}finally{
			uni.hideLoading()
		}
		// ②异步请求链式调用可改写为promise sync和await的分层语法
		// db.collection("default-user").add([
		// 	{
		// 		name:"小明",
		// 		age:20,
		// 		gender:1
		// 	},
		// 	{
		// 		name:"小红",
		// 		age:22,
		// 		gender:2
		// 	}]
		// ).then(res=>{
		// 	console.log(res)
		// }).catch(err=>{
		// 	uni.showModal({
		// 		content:err.errMsg,
		// 		showCancel:false
		// 	})
		// }).finally(()=>{
		// 	uni.hideLoading()
		// })
	}
	
	
</script>

<style lang="scss" scoped>
.layout{
	padding:30rpx;
	input{
		border:solid 1rpx black;
		margin-bottom: 10rpx;
		height:80rpx;
		padding-left: 20rpx;
		
	}
}
</style>
