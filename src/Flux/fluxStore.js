import { EventEmitter } from 'events';
import dispatcher from './dispatcher';


class FluxStore extends EventEmitter {
	constructor() {
		super()
		this.store = {
			form: {}
		}

		this.setMaxListeners(30);
	}

	setUrl() {
		let url;

		if(window.location.href.indexOf('localhost') !== -1) {
			url = 'http://localhost:3001/api';
		} else {
			url = 'https://toolbbe.herokuapp.com/api';
		}

		this.store = {...this.store, url: url};
	}

	setUserInfo(position) {
		if ( typeof position === 'object' ) {
			this.store = {...this.store, user: position};

			this.populateOrdering();
			this.populateUsers();
			this.populateCompanies();
		}

		else {
			fetch('https://toolbbe.herokuapp.com/api/allusers')
				.then( response => {
					return response.json();
				}).then( data => {
					this.store = {...this.store, user: data.find( item => {
						return item._id === sessionStorage.getItem('userId');
					})};

					this.populateOrdering();
					this.populateUsers();
					this.populateCompanies();
				})
		}
	}

	setPasswordReset() {
		this.store.limited = true;
	}

	getPasswordReset() {
		return this.store.limited;
	}

	unsetPasswordReset() {
		this.store.limited = false;
	}

	getUserInfo() {
		return this.store.user;
	}

	getReady(location) {
		return this.store[location];
	}

	getCompanyId() {
		return this.store.user.company_id;
	}

	checkFullUpdated() {
		this.fullUpdated.push(true);
		if(this.fullUpdated.length > 3) {
			this.emit('allUpdated');
			this.fullUpdated = [];
		}
	}

	populateOrdering() {
		let company = this.getCompanyId();

		this.store = {...this.store, ordering: this.store.ordering ? this.store.ordering : [] };

		this.store.t = false;

		this.fullUpdated = [];

		fetch(this.store.url + '/shopping/mill?company_id=' + company)
			.then( response => {
				return response.json();
			}).then( data => {
				this.store.ordering = {...this.store.ordering, mill: data };
				this.emit('millUpdated');

				this.checkFullUpdated();
			});
		fetch(this.store.url + '/shopping/lathe?company_id=' + company)
			.then( response => {
				return response.json();
			}).then( data => {
				this.store.ordering = {...this.store.ordering, lathe: data };

				this.checkFullUpdated();
			});
		fetch(this.store.url + '/shopping/other?company_id=' + company)
			.then( response => {
				return response.json();
			}).then( data => {
				this.store.ordering = {...this.store.ordering, other: data };

				this.checkFullUpdated();
			});
		fetch(this.store.url + '/setup?company_id=' + company)
			.then( response => {
				return response.json();
			}).then( data => {
				this.store = {...this.store, setupSheets: data };
				this.store.t = true;

				this.checkFullUpdated();
			});
	}

	populateUsers() {
		let company = this.getCompanyId(),
			url = this.store.url.replace('http://localhost:3001', 'https://toolbbe.herokuapp.com');

		url = url + '/users?company_id=' + company;

		this.store.u = false;

		fetch(url)
			.then( response => {
				return response.json();
			}).then( data => {
				this.store = {...this.store, users: data};
				this.store.u = true;
				this.emit('change');
			})
	}

	populateCompanies() {
		let companyId = this.getCompanyId(),
			url = this.store.url.replace('http://localhost:3001', 'https://toolbbe.herokuapp.com');

		url = url + '/companies/' + companyId;

		this.store.c = false;

		fetch(url)
			.then( response => {
				return response.json();
			}).then( data => {
				if(!Array.isArray(data))
					data = [data];
				this.store = {...this.store, companies: data};
				this.store.c = true;
				this.emit('updatedCompanies');
			})
	}

	getForm(page, itemId, category) {
		let data = JSON.parse(JSON.stringify(this.store[page]));

		data = category ? data[category] : data;

		let returnData = data.find( item => {
			return item._id === itemId;
		});

		if(category || page === 'setupSheets') {
			for (var dataItem in returnData.tool_data) {
				returnData[dataItem] = returnData.tool_data[dataItem];
			}

			for (dataItem in returnData.setup_data) {
				returnData[dataItem] = returnData.setup_data[dataItem];
			}

			delete returnData.tool_data;
			delete returnData.setup_data;
		}

		this.store.form = returnData;

		return returnData;
	}

	viewForm() {
		return this.store.form;
	}

	getFormValue(location, additionalData) {
		if(additionalData) {
			if(this.store.form[additionalData.subClass]) {
				if (this.store.form[additionalData.subClass].length === additionalData.index) {
					this.store.form[additionalData.subClass].push({});
				}
				return this.store.form[additionalData.subClass][additionalData.index][location];
			} else {
				return '';
			}
		} else {
			return this.store.form[location]
		}
	}

	updateFormItem(property, additionalData) {
		for( var name in property ) {
			if(additionalData && additionalData.subClass) {
				if ( !this.store.form[additionalData.subClass] ) {
					this.store.form[additionalData.subClass] = [{}];
				}
				this.store.form[additionalData.subClass][additionalData.index][name] = property[name];
			} else {
				this.store.form[name] = property[name];
			}
		}
		this.emit('changeForm');
	}

	resetForm() {
		this.store.form = {};
	}

	getOrdering(category) {
		if(!this.store.ordering) return [];
		let ordering = JSON.parse(JSON.stringify(this.store.ordering));
		let data = ordering[category];
		data = data.filter( item => {
    		return item.tool_data && item.tool_data.shopping === true;
    	});

		data.forEach( item => {

			for (var dataItem in item.tool_data) {
				item[dataItem] = item.tool_data[dataItem];
			}
			delete item.tool_data;
		});

		return data;
	}

	getSetupSheets() {
		if(!this.store.setupSheets) return [];
		let data = JSON.parse(JSON.stringify(this.store.setupSheets));

		data.forEach( item => {

			for (var dataItem in item.setup_data) {
				item[dataItem] = item.setup_data[dataItem];
			}
			delete item.setup_data;
		});

		return data;
	}

	getAllToolsInCat(cat) {
		if(!this.store.ordering) return [];
		let data = JSON.parse(JSON.stringify(this.store.ordering))
		data = data[cat];

		return data;
	}

	getUsers() {
		return this.store.users;
	}

	getCompanies() {
	  	return this.store.companies;
	}

	getPurchased(category) {
		if(!this.store.ordering) return [];
		let purchased = JSON.parse(JSON.stringify(this.store.ordering));
		let data = purchased[category];
		data = data.filter( item => {
    		return item.tool_data && !item.tool_data.shopping && item.tool_data.purchased;
    	});

		data.forEach( item => {

			for (var dataItem in item.tool_data) {
				item[dataItem] = item.tool_data[dataItem];
			}
			delete item.tool_data;
		});

		return data;
	}

	getShipped(category) {
		if(!this.store.ordering) return [];
		let shipped = JSON.parse(JSON.stringify(this.store.ordering));
		let data = shipped[category];
		data = data.filter( item => {
    		return item.tool_data && !item.tool_data.shopping && !item.tool_data.purchased;
    	});

		data.forEach( item => {

			for (var dataItem in item.tool_data) {
				item[dataItem] = item.tool_data[dataItem];
			}
			delete item.tool_data;
		});

		return data;
	}

	sendOrder(body, category) {

		body.company_id = this.getCompanyId();
		body.created_at = new Date().getTime();

		fetch(this.store.url + '/shopping/' + category, {
			method: 'POST',
			headers: new Headers({'Content-Type': 'application/json'}),
			body: JSON.stringify(body)
		}).then( response => {
			return response.json();
		}).then( data => {
			this.populateOrdering();
		})
	}

	addSetup(body, url) {

		body.company_id = this.getCompanyId();
		body.created_at = new Date().getTime();

		fetch(this.store.url + url, {
			method: 'POST',
			headers: new Headers({'Content-Type': 'application/json'}),
			body: JSON.stringify(body)
		}).then( response => {
			return response.json();
		}).then( data => {
			this.populateOrdering();
		});
	}

	editSetup(body, url) {
		body.company_id = body.setup_data.company_id;
		delete body.setup_data.company_id;

		body._id = body.setup_data._id;
		delete body.setup_data._id;

		body.updated_at = new Date().getTime();
		delete body.setup_data.updated_at;

		body.user = body.setup_data.user;
		delete body.setup_data.user;

		body.created_at = body.setup_data.created_at;
		delete body.setup_data.created_at;

		fetch(this.store.url + url + '/' + body._id, {
			method: 'PUT',
			headers: new Headers({'Content-Type': 'application/json'}),
			body: JSON.stringify(body)
		}).then( response => {
			return response.json();
		}).then( data => {
			this.populateOrdering();
		});
	}

	editOrder(body, category) {
		body.company_id = body.tool_data.company_id;
		delete body.tool_data.company_id;

		body._id = body.tool_data._id;
		delete body.tool_data._id;

		body.updated_at = new Date().getTime();
		delete body.tool_data.updated_at;

		body.user = body.tool_data.user;
		delete body.tool_data.user;

		body.created_at = body.tool_data.created_at;
		delete body.tool_data.created_at;

		let url = this.store.url + '/shopping/' + category + '/' + body._id,
			request = new Request(url, {
				method: 'PUT',
				headers: new Headers({'Content-Type': 'application/json'}),
				body: JSON.stringify(body)
			} )

		fetch(request).then( response => {
			return response.json();
		}).then( data => {
			this.populateOrdering();
		});
	}

	putUser(body) {
		let url = this.store.url + '/users/' + body._id;
		url = url.replace('http://localhost:3001', 'https://toolbbe.herokuapp.com');

		let request = new Request(url, {
			method: 'PUT',
			headers: new Headers({ 'Content-Type': 'application/json' }),
			body: JSON.stringify(body)
		});

		fetch(request).then( response => {
			return response.json();
		}).then( data => {
			this.populateUsers();
		});
	}

	postUser(body) {
		let url = this.store.url + '/users';
		url = url.replace('http://localhost:3001', 'https://toolbbe.herokuapp.com');

		let request = new Request(url, {
			method: 'POST',
			headers: new Headers({ 'Content-Type': 'application/json' }),
			body: JSON.stringify(body)
		});

		fetch(request).then( response => {
			return response.json();
		}).then( data => {
			this.populateUsers();
		})
	}

	putCompany(body) {
		let url = this.store.url + '/companies/' + body._id;
		url = url.replace('http://localhost:3001', 'https://toolbbe.herokuapp.com');

		let request = new Request(url, {
			method: 'PUT',
			headers: new Headers({ 'Content-Type': 'application/json' }),
			body: JSON.stringify(body)
		});

		fetch(request).then( response => {
			return response.json();
		}).then( dadta => {
			this.populateCompanies();
		})
	}

	postCompany(body) {
		let url = this.store.url + '/companies';
		url = url.replace('http://localhost:3001', 'https://toolbbe.herokuapp.com');

		let request = new Request(url, {
			method: 'POST',
			headers: new Headers({ 'Content-Type': 'application/json' }),
			body: JSON.stringify(body)
		});

		fetch(request).then( response => {
			return response.json();
		}).then( dadta => {
			this.populateCompanies();
		})
	}

	deleteOrder(id, category) {
		fetch(this.store.url + '/shopping/' + category + '/' + id, { method: 'DELETE' })
			.then( response => {
				return response.json();
			}).then( data => {
				this.populateOrdering();
			});
	}

	handleActions(action) {
		switch(action.type) {
			case 'SET_INFO' :
				this.setUserInfo(action.position);
				break;
			case 'SET_PASS_RESET' :
				this.setPasswordReset();
				break;
			case 'SET_URL' :
				this.setUrl();
				break;
			case 'NEW_ORDER' :
				this.sendOrder(action.body, action.category);
				break;
			case 'NEW_SETUP' :
				this.addSetup(action.body, action.url);
				break;
			case 'EDIT_SETUP' :
				this.editSetup(action.body, action.url);
				break;
			case 'EDIT_ORDER' :
				this.editOrder(action.body, action.category);
				break;
			case 'DELETE_ORDER' :
				this.deleteOrder(action.id, action.category);
				break;
			case 'UPDATE_FORM' :
				this.updateFormItem(action.property, action.additionalData);
				break;
			case 'RESET_FORM' :
				this.resetForm();
				break;
			case 'EDIT_USER' :
				this.putUser(action.body);
				break;
			case 'CREATE_USER' :
				this.postUser(action.body);
				break;
			case 'EDIT_COMPANY' :
				this.putCompany(action.body);
				break;
			case 'CREATE_COMPANY' :
				this.postCompany(action.body);
				break;
			default :
				break;
		}
	}
}

const fluxStore = new FluxStore();
dispatcher.register(fluxStore.handleActions.bind(fluxStore));

window.fluxStore = fluxStore;
window.dispatcher = dispatcher;

export default fluxStore;