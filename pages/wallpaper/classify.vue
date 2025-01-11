<template>
	<view class="layout">		
		<view class="add">
			<input class="ipt" type="text" v-model="classname" placeholder="请输入分类名称" @confirm="onConfirm">			
		</view>
		<view class="list">
			<view class="item" v-for="item in 5">				
				<view class="name">分类名称</view>
				<view class="status">
					<switch :checked="true" style="transform:scale(0.6)" @change="switchChange"/>
				</view>
				<view class="remove">
					<uni-icons type="trash" size="26" @click="handleRemove"></uni-icons>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';
const classname = ref("");
const classList = ref([]);
const db = uniCloud.database();


const getClassify = async()=>{
	console.log("获取分类");
}

const switchChange = async(e)=>{
	console.log(e);	
}


const handleRemove = async()=>{
	console.log("删除方法");
}

const onConfirm = async()=>{
	console.log("确认提交");
}

getClassify();

</script>

<style lang="scss" scoped>
.layout{
	padding:30rpx;
	.add{
		margin-bottom: 30rpx;
		display: flex;
		gap:20rpx;
		.ipt{
			width: 100%;
			border:1px solid #eee;
			height: 70rpx;
			padding:0 20rpx;
			box-sizing: border-box;
		}		
	}
	.item{
		display: flex;
		padding:10rpx 0;
		align-items: center;
		justify-content: space-between;
		.name{
			color:#007AFF;
			flex:1;
		}
		.status{
			width: 100rpx;			
		}
		.remove{
			width:100rpx;
			display: flex;
			justify-content: flex-end;
		}
	}
}
</style>
