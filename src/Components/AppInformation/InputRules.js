import DrillSizes from './DrillSizes';
import * as fluxActions from '../../Flux/actions';
import fluxStore from '../../Flux/fluxStore';

let InputRules = {
	number: {
		format: (e) => {
			let number = e.target.value;
		    number = number.replace(/[^0-9.]/g, '');

		    if (number.split('.').length > 2) {
		      number = number.substr(0, number.length - 1);
		    }
		    e.target.value = number;
		    
		    change(e);
		} 
	},
	math: {
		format: (e) => {
			let string = e.target.value;

			string = string.toString();
			string = string.replace(/[^0-9\/*+\-.^]/g, '');

			var addends = string.split('+'),
				finished = '';

			addends.forEach( (addend, l) => {
				let subs = addend.split('-');

				subs.forEach( (sub, k) => {
					let factors = sub.split('*'),
						multiplying;

					factors.forEach( (factor, j) => {
						let divisors = factor.split('/');

						divisors.forEach( (divisor, i) => {
							divisor = Number(divisor);
							if(i === 0) {
								factor = divisor;
							} else {
								factor /= divisor;
							}
						});

						factor = Number(factor);
						if(j === 0) {
							sub = factor;
						} else {
							sub *= factor;
						}
					});

					sub = Number(sub);
					if(k === 0) {
						addend = sub;
					} else {
						addend -= sub;
					}
				});

				addend = Number(addend);
				if(l === 0) {
					finished = addend;
				} else {
					finished += addend;
				}
			});

			finished = Math.round(finished * 100000) / 100000;
			finished = finished.toString();

			e.target.value = finished;

			change(e);
		}
	},
	phone: {
		format: (e) => {
			let number = e.target.value;
			number = number.replace(/[^0-9()\- ]/g, '');

			if(number && number.match(/[0-9]/g).length === 3) {
				number = '(' + number + ') ';
			} else if (number && number.match(/[0-9]/g).length === 6) {
				number = number + '-';
			} else if (number && number.match(/[0-9]/g).length > 10) {
				number = number.substr(0, number.length - 1);
			}

			e.target.value = number;

			change(e);
		}
	},
	textOnly: {
		format: (e) => {
			e.target.value = e.target.value.replace(/[^A-z`' ]/g, '');

			change(e);
		}
	},
	makeMoney: {
		format: (e) => {
			let price = Number(e.target.value);
    		e.target.value = price.toFixed(2);

    		change(e);
		}
	},
	checkSize: {
		format: (e) => {
			let preVal = e.target.value;

    		// this.makeMath(e);

    		let val = DrillSizes.find( drill => {
      			return drill.diameter === e.target.value;
    		});

    		if(val) e.target.value = val.size;
    		else e.target.value = preVal;

    		change(e);
		}
	},
	fields: (e) => {
		switch(e.target.name) {
			case 'tool_type' :
				switch(e.target.value) {
					case 'Endmill' :
						fluxActions.updateForm({
							material: 'Carbide',
							undercut_width: '0',
							undercut_length: '0' });
						break;
					case 'Drill' :
						fluxActions.updateForm({ 
							material: 'Cobalt', 
							tip_angle: '118',
							undercut_width: '0',
							undercut_length: '0'  });
					case 'Spot Drill' :
						fluxActions.updateForm({
							flutes: '2'
						})
					default :
						return;
				}
				break;
			case 'diameter' :
				if(fluxStore.getFormValue('diameter') !== '') {
					fluxActions.updateForm({undercut_width: fluxStore.getFormValue('diameter')});
				}
				break;
			case 'size' :
				let drill = DrillSizes.find( item => { return item.size === e.target.value; })
				if(drill) {
					let newProps = {
						diameter: drill.diameter,
						flute_length: drill.flute_length,
						tool_length: drill.oal_length
					};
					fluxActions.updateForm( newProps );
				}
				break;
		}
	},
	change: function(e) {
		change(e);
	}
}

let change = e => {
	let newObject = {};
    newObject[e.target.name] = e.target.value;
    fluxActions.updateForm(newObject);

    InputRules.fields(e);
}

export default InputRules;