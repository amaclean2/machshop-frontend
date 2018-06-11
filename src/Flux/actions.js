import dispatcher from './dispatcher';

export function setUserInfo(position) {
	dispatcher.dispatch({
		type: 'SET_INFO',
		position: position
	});
};

export function setUrl() {
	dispatcher.dispatch({
		type: 'SET_URL'
	});
};

export function addOrder(body, category) {
	dispatcher.dispatch({
		type: 'NEW_ORDER',
		body: body,
		category: category
	});
};