import DrillSizes from './DrillSizes';
import CenterdrillSizes from './CenterdrillSizes';
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
					let factors = sub.split('*');

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
			let preVal = e.target.value, directory;

			if (fluxStore.getFormValue('tool_type') === 'Center Drill') {
				directory = CenterdrillSizes;
			} else if (fluxStore.getFormValue('tool_type') === 'Drill') {
				directory = DrillSizes;
			}

    		let val = directory.find( drill => {
      			return drill.diameter === e.target.value;
    		});

    		if(val) e.target.value = val.size;
    		else e.target.value = preVal;

    		change(e);
		}
	},
	fields: (e) => {
		let newObject = {};
		newObject[e.target.name] = e.target.value;

		switch(e.target.name) {
			case 'tool_type' :
				switch(e.target.value) {
					case 'Groove Tool' :
					case 'Endmill' :
						newObject.material = 'Carbide';
						newObject.undercut_width = '0';
						newObject.undercut_length = '0';
						newObject.corner_radius = '0';
						break;
					case 'Drill' :
						newObject.material = 'Cobalt';
						newObject.tip_angle = '118';
						newObject.undercut_width = '0';
						newObject.undercut_length = '0';
						break;
					case 'Center Drill' :
						newObject.tip_angle = '60';
						newObject.material = 'High Speed Steel';
						break;
					case 'Spot Drill' :
						newObject.flutes = '2';
						break;
					case 'Cutoff Tool' :
					case 'Reamer' :
					case 'Tap' :
						newObject.material = 'High Speed Steel';
						break;
					case 'Dove Mill' :
					case 'Groove Tool' :
						newObject.corner_radius = '0';
						break;
					default :
						break;
				}
				newObject.count = '1';
				break;
			case 'diameter' :
				if(fluxStore.getFormValue('diameter') !== '') {
					newObject.undercut_width = fluxStore.getFormValue('diameter');
				}
				break;
			case 'size' :
				let directory;

				if (fluxStore.getFormValue('tool_type') === 'Center Drill') {
					directory = CenterdrillSizes;
				} else if (fluxStore.getFormValue('tool_type') === 'Drill') {
					directory = DrillSizes;
				}

				let drill = directory.find( item => { return item.size === e.target.value; })
				if(drill) {
					newObject.diameter = drill.diameter;
					newObject.flute_length = drill.flute_length;
					newObject.tool_length = drill.oal_length;
				}
				break;
			default :
				break;
		}

		fluxActions.updateForm(newObject);
	}
}

let change = e => {

    InputRules.fields(e);
}

export default InputRules;