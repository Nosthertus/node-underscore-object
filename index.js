var _ = require("utils-pkg");

module.exports.parse = (obj) => {
	var _obj = {};

	if(this.hasUnderscoredProps(obj)){
		Object.assign(_obj, this.flushUnderscored(obj));

		var properties = this.getProperties(obj);

		properties.forEach(el => {
			Object.assign(_obj, this.getChildObject(obj, el));
		});

		return _obj;
	}

	else{
		return obj;
	}
};


module.exports.hasUnderscoredProps = (obj) => {
	for(prop in obj){
		if(prop.indexOf("_") > -1){
			return true;
		}
	}

	return false;
};

module.exports.isNested = (str) => {
	var regex = /\w+\_\w+/;

	return regex.test(str);
};

module.exports.getChildObject = function(obj, prop = null){
	var _obj = {};

	if(prop && _.isString(prop)){
		for(p in obj){
			if(this.isNested(p)){
				// Split the props with _
				var _keyValue = p.split("_");
				var _prop = _keyValue[0];
				var _val = _keyValue[1];

				// Create object in obj if object does not exist
				if(!_.inKeyObject(_obj, _prop)){
					_obj[_prop] = {};
				}

				// Assign the value in the object
				_obj[_prop][_val] = obj[p];
			}
		}
	}

	return _obj;
};

module.exports.getProperties = (obj) => {
	var arr = [];

	for(prop in obj){
		if(prop.indexOf("_")){
			var _prop = prop.split("_")[0];

			if(!arr.includes(_prop)){
				arr.push(_prop);
			}
		}
	}

	return arr;
};

module.exports.flushUnderscored = (obj) => {
	var _obj = {};

	for(p in obj){
		if(!this.isNested(p)){
			_obj[p] = obj[p];
		}
	}

	return _obj;
};