export function request(url, method, data) {
	return fetch(`http://localhost:3002/api/${url}`, {
		headers: {
			'content-type': 'application/json',
		},
		method: method || 'GET',
		body: data ? JSON.stringify(data) : undefined,
	}).then((res) => res.json());
}
