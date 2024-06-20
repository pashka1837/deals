async function post_deal(userId, companyId, formJson) {
	const res = await fetch(`/deal?userId=${userId}&companyId=${companyId}`, {
		method: 'POST',
		body: JSON.stringify(formJson),
		headers: {
			'Content-Type': 'application/json',
		},
	});

	const data = await res.json();
	return data;
}

function getCookie(name) {
	const value = '; ' + document.cookie;
	const parts = value.split('; ' + name + '=');
	if (parts.length === 2) {
		return parts.pop().split(';').shift();
	}
}

export {post_deal, getCookie};
