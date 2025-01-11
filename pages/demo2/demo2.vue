<template>
	<view class="layout">
		<view class="paper" v-for="item in datalist" :key="item._id">
			<view class="left">
				<image :src="item.picture" mode="widthFix"></image>
			</view>
			<view class="right">
				<view class="desc">{{item.description}}</view>
				<view class="name">{{item.classid[0].name}}</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import { ref } from 'vue';
	const db = uniCloud.database();
	const datalist = ref()
	
	const getData = async () =>{
		
		const wallTamp = db.collection("demo_wallpaper").getTemp();
		const classTamp = db.collection("demo_classify").getTemp();
		
		let res = await db.collection(wallTamp,classTamp).get();
		console.log(res)
		datalist.value = res.result.data
	}
	getData()
</script>

<style lang="scss" scoped>
	.layout{
		padding:20rpx;
		.paper{
			display:flex;
			gap:20rpx;
			margin:10rpx;
			background-color: #EFEFEF;
			.left{
				width:200rpx;
				image{
					display: block;
					width:100%;
				}
			}
			.right{
				flex:1;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				.name{
					font-weight: 800;
				}
			}
		}
		
	}
</style>
