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

export function deleteOrder(id, category) {
	dispatcher.dispatch({
		type: 'DELETE_ORDER',
		id: id,
		category: category
	});
};

export function changeForm(newProperty) {
	dispatcher.dispatch({
		type: 'CHANGE_FORM',
		property: newProperty
	})
}