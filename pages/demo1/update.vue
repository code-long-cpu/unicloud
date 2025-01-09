<template>
	<view class="layout">
		<input v-model="formData.name" placeholder="请输入名称"/>
		<input v-model.number="formData.age" placeholder="请输入年龄"/>
		<button @click="update">修改</button>
	</view>
</template>

<script setup>
	import {ref} from 'vue';
	import{onLoad} from '@dcloudio/uni-app'
	const db = uniCloud.database();
	let id;
	const formData = ref({
		name:'',
		age:''
	})
	onLoad((e)=>{
		id = e.id
		getdate()
	})
	
	// 回显信息到输入框
	// 查询对应id的数据库数据
	const getdate= async ()=>{
		const {result:{data}} = await db.collection("default-user").doc(id).get({getOne:true})
		console.log(data)
		formData.value.name = data.name;
		formData.value.age = data.age;
	}
	// 修改数据
	const update = async()=>{
		const res = await db.collection("default-user").doc(id).update(formData.value)
		console.log(res)
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
