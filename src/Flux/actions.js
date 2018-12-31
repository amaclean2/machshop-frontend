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

export function setPasswordReset() {
	dispatcher.dispatch({
		type: 'SET_PASS_RESET'
	});
}

export function addOrder(body, category) {
	dispatcher.dispatch({
		type: 'NEW_ORDER',
		body: body,
		category: category
	});
};

export function editOrder(body, category) {
	dispatcher.dispatch({
		type: 'EDIT_ORDER',
		body: body,
		category: category
	});
};

export function editUser(body) {
	dispatcher.dispatch({
		type: 'EDIT_USER',
		body: body
	});
};

export function addUser(body) {
	dispatcher.dispatch({
		type: 'CREATE_USER',
		body: body
	});
};

export function editCompany(body) {
	dispatcher.dispatch({
		type: 'EDIT_COMPANY',
		body: body
	});
};

export function createCompany(body) {
	dispatcher.dispatch({
		type: 'CREATE_COMPANY',
		body: body
	});
};

export function deleteOrder(id, category) {
	dispatcher.dispatch({
		type: 'DELETE_ORDER',
		id: id,
		category: category
	});
};

export function updateForm(newProperty, addData) {
	dispatcher.dispatch({
		type: 'UPDATE_FORM',
		property: newProperty,
		additionalData: addData
	})
}

export function resetForm() {
	dispatcher.dispatch({
		type: 'RESET_FORM'
	})
}