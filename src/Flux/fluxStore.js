import { EventEmitter } from 'events';
import dispatcher from './dispatcher';


class FluxStore extends EventEmitter {
	constructor() {
		super()
		this.store = {}
	}

	setUrl() {
		let url;

		if(window.location.href.indexOf('localhost') !== -1) {
			url = 'http://localhost:3001/api';
		} else {
			url = 'https://machapi.herokuapp.com/api';
		}

		this.store = {...this.store, url: url};
	}

	setUserInfo(position) {
		if ( typeof position === 'object' ) {
			this.store = {...this.store, user: position};

			this.populateOrdering();
		}

		else {
			fetch('https://machapi.herokuapp.com/api/allusers')
				.then( response => {
					return response.json();
				}).then( data => {
					this.store = {...this.store, user: data.find( item => {
						return item._id === sessionStorage.getItem('userId');
					})};

					this.populateOrdering();
				})
		}
	}

	getUserInfo() {
		return this.store.user;
	}

	populateOrdering() {
		let company = this.store.user.company_id;

		this.store = {...this.store, ordering: this.store.ordering ? this.store.ordering : [] };

		fetch(this.store.url + '/shopping/mill?company_id=' + company)
			.then( response => {
				return response.json();
			}).then( data => {
				this.store.ordering = {...this.store.ordering, mill: data };
				fetch(this.store.url + '/shopping/lathe?company_id=' + company)
					.then( response => {
						return response.json();
					}).then( data => {
						this.store.ordering = {...this.store.ordering, lathe: data };
						fetch(this.store.url + '/shopping/other?company_id=' + company)
							.then( response => {
								return response.json();
							}).then( data => {
								this.store.ordering = {...this.store.ordering, other: data };
								this.emit('change');
							});
					});
			});
	}

	populatePurchasing() {

	}

	populateStock() {

	}

	getOrdering(category) {
		let data = this.store.ordering[category];
		data = data.filter( item => {
    		return item.tool_data && item.tool_data.shopping === true;
    	});

		data.forEach( item => {
			item = {...item};

			for (var dataItem in item.tool_data) {
				item[dataItem] = item.tool_data[dataItem];
			}
			delete item.tool_data;
		});

		return data;
	}

	getPurchased(category) {
		let data = this.store.purchased[category];
		data = data.filter( item => {
    		return item.tool_data.shopping === false && item.tool_data.purchased === true;
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

		body.company_id = this.store.user.company_id;

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

	handleActions(action) {
		console.log('recieved an action', action);
		switch(action.type) {
			case 'SET_INFO' :
				this.setUserInfo(action.position);
				break;
			case 'SET_URL' :
				this.setUrl();
				break;
			case 'NEW_ORDER' :
				this.sendOrder(action.body, action.category);
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