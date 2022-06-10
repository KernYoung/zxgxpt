export default {
	formatTreeData: function(data, child, parent, topValue,flag) {
		//将list整理为树结构   child子节点字段名,parent父节点字段名,topValue最顶级父节点字段值
		var arr = [];
		for (var i = 0, l = data.length; i < l; i++) {
			var item = data[i];
			if (item != null && item[parent] === topValue) {
				this.tranData(data, item, child, parent,flag);
				arr.push(item);
			}
		}
		return arr
	},
	tranData: function(data, parent, idField, parentField,flag) {
		var temp = [];
		for (var i = 0, l = data.length; i < l; i++) {
			var item = data[i];
			if (item != null && item[parentField] == parent[idField]) {
				this.tranData(data, item, idField, parentField,flag);
				temp.push(item);
			}
		}
		
		if (temp.length > 0) {
			if(!flag){
				parent.isLevel=true
				let obj = {
					code:parent.code,
					name:'查看本部人员信息',
					pname:parent.name,
					isLevel:false
				}
				temp.unshift(obj)
			}
			parent['children'] = temp;
		}
		
		
		
	},
	//该方法用于给日期、时间补零
	addZero:function (num) {
	    if (parseInt(num) < 10) {
	        num = "0" + num
	    }
	    return num
	},
	
	
	//把毫秒数转化成具体日期   2021-06-04 00:00:00
	//参数 毫秒数  
	   formatMsToDate:function (ms) {
	    if (ms) {
	        var oDate = new Date(ms),
	            oYear = oDate.getFullYear(),
	            oMonth = oDate.getMonth() + 1,
	            oDay = oDate.getDate(),
	            oHour = oDate.getHours(),
	            oMin = oDate.getMinutes(),
	            oSen = oDate.getSeconds(),
	            oTime = oYear + '-' + this.addZero(oMonth) + '-' + this.addZero(oDay) + ' ' + this.addZero(oHour) + ':' +
	                this.addZero(oMin) + ':' + this.addZero(oSen);
	        return oTime;
	    } else {
	        return ""
	    }
	}
}
