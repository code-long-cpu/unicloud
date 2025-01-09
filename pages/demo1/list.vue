<template>
	<view class="layout">
		<view class="head">
			共{{queryParams.total}}条数据，已获取{{userList.length}}条数据
		</view>
		<input @confirm="Confirm" class="search" type="text" placeholder="请输入搜索内容" v-model="keyword"></input>
		<view class="box" v-for = "item,index in userList" :key="item._id"
		@click="goDetail(item._id)">
			<view>序号：{{index+1}}</view>
			<view>名字：{{item.name}}</view>
			<view>年纪：{{item.age}}</view>
			<view>性别：{{item.gender}}</view>
			<view>id：{{item._id}}</view>
			<view>创建时间：{{dayjs(item.createTime).format("YYYY-MM-DD HH:mm:ss")}}</view>
		</view>
	</view>
</template>

<script setup>
	import { ref } from 'vue';
	import {onReachBottom} from '@dcloudio/uni-app'
	import dayjs from 'dayjs'
	const db = uniCloud.database();
	const keyword = ref("")
	const userList = ref([]);
	const queryParams = ref({
		pageNum:1,
		pageSize:6,
		total:0
	})
	const noData = ref(false);
	
	const Confirm = ()=>{
		userList.value = [];
		getData()
	}

	const getData = async()=>{
		const current = queryParams.value.pageSize*(queryParams.value.pageNum-1)
		const res = await db.collection("default-user")
		// .orderBy('_id desc')
		// .where(`age>30`)
		.where(`${new RegExp(keyword.value, 'i')}.test(name)`)
		.skip(current)  //跳过多少条
		.limit(queryParams.value.pageSize)  //获取多少条
		.field("name,age,gender,createTime") //省流量，需要哪个现实那个
		.get({
			getCount:true
		});
		console.log(res)
		if(res.result.errCode===0){
			userList.value = [...userList.value,...res.result.data]
			queryParams.value.total = res.result.count
			if(queryParams.value.pageSize>res.result.data.length) noData.value = true
		}else{
			uni.showToast({
				title:res.result.errMsg||'返回错误',
			})
		}
	}
	onReachBottom(()=>{
		// console.log("触底了")
		if(noData.value) return
		queryParams.value.pageNum++;
		getData()
	})
	const goDetail=((e)=>{
		// console.log(e)
		uni.navigateTo({
			url:"/pages/demo1/detail?id="+e
		})
	})
	
	getData()
	
</script>

<style lang="scss" scoped>
.layout{
	.head{
		text-align: center;
		padding:10rpx 0;
		width: 100%;
		font-size:26rpx;
		color:#888; 
		margin-top: 0rpx;
		background-color: #eee;
		z-index: 1;
	}
	.search{
		border: solid 1rpx black;
		height:80rpx;
	}
	.box{
		padding:20rpx;
		border-bottom: solid 1rpx #eee;
		z-index: -1;
	}
	.box:hover{
			background-color: #EFEFEF;
		}
}
</style>
