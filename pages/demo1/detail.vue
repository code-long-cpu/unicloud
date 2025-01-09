 <template>
	<view class="detail" v-if="detail">
		<view class="content">
			<view>姓名：{{detail.name}}</view>
			<view>性别：{{detail.gender}}</view>
			<view>年龄：{{detail.age}}</view>
			<view>创建时间：{{dayjs(detail.createTime).format("YYYY-MM-DD HH:mm:ss")}}</view>
		</view>
		<view class="group">
			<button type="primary" @click="update(detail._id)">修改</button>
			<button type="warn" @click="delet">删除</button>
		</view>
		
	</view>
</template>

<script setup>
	import {onLoad} from "@dcloudio/uni-app"
	import { ref } from "vue";
	import dayjs from "dayjs"
	const db = uniCloud.database();
	let id
	const detail=ref({})
	onLoad((e)=>{
		// console.log(e);
		id=e.id;
		getDetail()
	})
	const getDetail = async()=>{
		// let res = await db.collection('default-user').where(`_id=="${id}"`).get();
		let res = await db.collection('default-user').doc(id).get({getOne:true});
		// console.log(res)
		detail.value = res.result.data
		// console.log(detail.value)
	}
	const delet = async()=>{
		// 全部删除
		// let res = await db.collection("default-user").remove();
		// return
		uni.showModal({
			title:"是否确认删除",
			success:async res=>{
				console.log(res)
				if(res.confirm){
					let res = await db.collection("default-user").doc(id).remove();
					uni.showToast({
						title:"删除成功",
						icon:"none"
					})
					setTimeout(()=>{
						uni.navigateBack()
					},1500)
				}
			}
		})
	}
	const update = (e)=>{
		console.log(e)
		uni.navigateTo({
			url:"/pages/demo1/update?id="+e
		})
	}
	
</script>

<style lang="scss" scoped>
	.detail{
		padding:20rpx;
		.group{
			margin-top: 20rpx;
			display: flex;
			gap:20rpx;
			button{
				width: 100%;
			}
			
		}
	}
</style>
