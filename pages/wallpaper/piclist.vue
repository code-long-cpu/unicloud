<template>
	<view class="layout">
		<view class="add" @click="handleAdd">
			<button size="mini" type="primary">添加</button>
		</view>
		<view class="list">
			<view class="item" v-for="item in listData" :key="item._id">
				<view class="left">
					<image :src="item.url" mode="aspectFill"></image>
				</view>
				<view class="right">
					<view class="desc">{{item.description}}</view>
					<view class="classname">{{item.classid}}</view>
				</view>
			</view>
		</view>
	</view>
	
		
	<uni-popup ref="popup" border-radius="10px 10px 0 0" :is-mask-click="false">
		<view class="popupOut">			
			<uni-file-picker
			v-model="formData.picture"
			return-type="object"
			></uni-file-picker>
			<textarea placeholder="请输入壁纸描述" v-model="formData.description"></textarea>			
			<uni-data-select
			      collection="demo_classify"
			      field="_id as value, name as text"
			      label="应用选择"
			      v-model="formData.classid"
			      :clear="true"
			    />
			<view class="group">
				<button type="primary" size="mini" @click="onSubmit" :disabled="disabled">提交</button>
				<button type="default" size="mini" @click="onCancel">取消</button>
			</view>	
		</view>
	</uni-popup>
</template>

<script setup>
import { computed, ref } from 'vue';
const db = uniCloud.database(); 
const listData = ref([]);
const popup = ref(null);
const formData = ref({
	description:"",
	picture:{},
	classid:""
})
const disabled = computed(()=>{
	if(formData.value.description && formData.value.classid && Object.keys(formData.value.picture).length>0){
		return false
	}else{
		return true
	}
})

const getData = async()=>{
	console.log("获取数据");
	let {result:{data,errCode}} = await db.collection("demo_wallpaper")
	.field("description,classid,picture.url as url")
	// .orderBy("data")
	.get(); 
	console.log(data);
	if(errCode==0){
		listData.value=data
	}
}
const handleAdd = ()=>{
	popup.value.open();
}

const onSubmit = async()=>{	
	console.log("点击提交表单");
	uni.showLoading();
	let res = await db.collection("demo_wallpaper").add(formData.value);
	uni.showToast({
		title:"发布成功",
		icon:"none"
	})
	onCancel()
	init();
	getData()
}

const onCancel = ()=>{
	popup.value.close();
}

const init = ()=>{
	formData.value = {
		description:"",
		picurl:{},
		classid:""
	}
}

getData();

</script>

<style lang="scss" scoped>
.layout{
	padding:30rpx;
	.add{
		margin-bottom:30rpx;
	}
	.list{
		.item{
			padding:15rpx 0;
			border-top:1px solid #eee;
			display: flex;
			.left{
				width: 200rpx;
				height: 200rpx;
				image{
					width: 100%;
					height: 100%;
					border-radius: 8rpx;
				}
			}
			.right{
				flex:1;
				padding-left:30rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				.desc{
					font-size: 30rpx;
					line-height: 1.6em;
				}
				.classname{
					font-size: 28rpx;
					color:#999;
					padding-top:20rpx;
				}
			}
		}
		.item:last-child{
			border-bottom:1px solid #eee;
		}
	}
}
.popupOut{
	width: 660rpx;
	background: #fff;
	border-radius: 10rpx;
	min-height: 400rpx;
	padding:30rpx;
	box-sizing: border-box;
	textarea{
		border:1px solid #efefef;
		padding:10rpx;
		width: 100%;
		height: 150rpx;
		box-sizing: border-box;
		margin:30rpx 0;
	}
	.group{
		padding-top:60rpx;
		padding-bottom:30rpx;
		gap:30rpx;
		display: flex;
		button{
			width: 100%;
		}
	}
}
</style>
