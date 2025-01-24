<template>
	<view class="">
		
	</view>
</template>

<script setup>
	const demoObj = uniCloud.importObject("demoObj");
	const getData = async()=>{
		let res = await demoObj.getUser();
		console.log(res)
	}
	getData()

</script>

<style lang="scss" scoped>
	
</style>
