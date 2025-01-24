const db = uniCloud.database()
module.exports = {
	_before: function () { // 通用预处理器

	},
	async getUser({size=3}=param){
		if(!isNaN(size)){
			size=Number(size)
		}else{
			return {errMsg:"需要number类型"}
		}
		// return size //这里的return是把size给了前端函数调用者，以promise对象的形式，给了前端的res，会打印出3；用url方式返回给apiPost工具则会打印出对象，需要解构测绘识别
		let res = await db.collection("default-user").limit(size).get();
		return res  //这里的return是把res给了前端函数调用者，以promise对象的形式，给了前端的res或者apipost工具，会打印出default-user数据
	}
}
