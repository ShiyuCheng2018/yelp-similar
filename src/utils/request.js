const header = new Headers({
	Accept: "application/json",
	"Content-Type": "application/json",
});

function get(url) {
	return fetch(url, {
		method: "GET",
		header: header,
	})
		.then((res) => {
			return handleResponse(res, url);
		})
		.catch((err) => {
			console.error(`Request failed. URL= ${url}`);
			return Promise.reject({error: {message: "Request failed due to your network error, please try later."}});
		});
}

function post(url, data) {
	return fetch(url, {
		method: "GET",
		header: header,
		body: data,
	})
		.then((res) => {
			return handleResponse(res, url);
		})
		.catch((err) => {
			console.error(`Request failed. URL= ${url}`);
			return Promise.reject({error: {message: "Request failed due to your network error, please try later."}});
		});
}

function handleResponse(response, url) {
	if (response.status === 200) {
		return response.json();
	} else {
		console.error(`Request failed. URL= ${url}`);
		return Promise.reject({error: {message: "Request failed due to a service error."}});
	}
}

export {get, post};
