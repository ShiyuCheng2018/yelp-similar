import {get} from "../../utils/request";

// needs to be done by middleware
export const FETCH_DATA = "FETCH_DATA";

export default store => next => action => {
	const callAPI = action[FETCH_DATA]
	if(typeof callAPI === "undefined"){
		return next(action)
	}

	const {endpoint, schema, types} = callAPI;
	if(typeof endpoint !== "string"){
		throw new Error("Endpoint has to be a string URL")
	}
	if(!schema){
		throw Error("It has to have a entities' schema")
	}
	if(!Array.isArray(types) && types.length !== 3){
		throw new Error("It needs to have an array that has three actions")
	}
	if(!types.every(type=>typeof type === "string")){
		throw new Error("Action has to be string type")
	}


	const actionWith = data => {
		const finalAction = {...action, ...data}
		delete finalAction[FETCH_DATA]
		return finalAction;
	}

	const [requestType, successType, failureType] = types;
	next(actionWith({type: requestType}))

	return fetchData(endpoint, schema).then(
		response=>next(actionWith({
		type: successType,
		response
		}),
		error =>next(actionWith({
			type: failureType,
			error: error.message || "fetch data failed"
		})))
	)
}


// educate requests
const fetchData = (endpoint, schema) =>{
	return get(endpoint).then(data=>{
		return normalizeData(data, schema)
	})
}

const normalizeData = (data, schema) => {
	const {id, name} = schema;
	let kvObj = {};
	let ids = {};
	if(Array.isArray(data)){
		data.forEach(item=>{
			kvObj[item[id]] = item;
			ids.push(item[id])
		})
	}else {
		kvObj[data[id]] = data;
		ids.push(data[id])
	}

	return {
		[name]: kvObj,
		ids
	}
}