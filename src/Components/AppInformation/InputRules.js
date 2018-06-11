import DrillSizes from './DrillSizes';

let InputRules = {
	number: {
		format: (e, callback) => {
			let number = e.target.value;
		    number = number.replace(/[^0-9.]/g, '');

		    if (number.split('.').length > 2) {
		      number = number.substr(0, number.length - 1);
		    }
		    e.target.value = number;
		    
		    callback(e);
		} 
	},
	math: {
		format: (e, callback) => {
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

			callback(e);
		}
	},
	phone: {
		format: (e, callback) => {
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

			callback(e);
		}
	},
	textOnly: {
		format: (e, callback) => {
			e.target.value = e.target.value.replace(/[^A-z`' ]/g, '');

			callback(e);
		}
	},
	makeMoney: {
		format: (e, callback) => {
			let price = Number(e.target.value);
    		e.target.value = price.toFixed(2);

    		callback(e);
		}
	},
	checkSize: {
		format: (e, callback) => {
			let preVal = e.target.value;

    		// this.makeMath(e);

    		let val = DrillSizes.find( drill => {
      			return drill.diameter === e.target.value;
    		});

    		if(val) e.target.value = val.size;
    		else e.target.value = preVal;

    		callback(e);
		}
	},
	fields: {
		undercutWidth: {
			format: props => {
				if(props.data.tool_type === 'Endmill' && props.data.diameter !== '') {
					props.data.undercut_width = props.data.diameter;
					console.log(props);
				} 
				return props;
			}
		}
	}
}

export default InputRules;