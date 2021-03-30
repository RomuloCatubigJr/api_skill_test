  
const Utils = {
	isEmpty: (obj) => {
		return Object.entries(obj) && Object.entries(obj).length === 0 && obj.constructor === Object;
	}
};

export default Utils;