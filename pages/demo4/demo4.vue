<template>
	<view class="">
		
	</view>
</template>

<script setup>
	
	// const demoObj = uniCloud.importObject("demoObj");
	// const getData = async()=>{
	// 	let res = await demoObj.getUser();
	// 	console.log(res)
	// }
	// getData()
	import { computed, ref } from 'vue';
	const Data = ref([]);
	
	uni.request({
	    url: 'https://env-00jxt113ioao.dev-hz.cloudbasefunction.cn/demoObj/getUser', 
		data:{size:"2"},
	    success: (res) => {
	        console.log(res.data);
	    }
	});
</script>

<style lang="scss" scoped>
	
</style>
