let DrillSizes = [
	{ size: '107', diameter: '0.0019', flute_length: '', oal_length: '' },
	{ size: '106', diameter: '0.0023', flute_length: '', oal_length: '' },
	{ size: '105', diameter: '0.0027', flute_length: '', oal_length: '' },
	{ size: '104', diameter: '0.0031', flute_length: '', oal_length: '' },
	{ size: '103', diameter: '0.0035', flute_length: '', oal_length: '' },
	{ size: '102', diameter: '0.0039', flute_length: '', oal_length: '' },
	{ size: '101', diameter: '0.0043', flute_length: '', oal_length: '' },
	{ size: '100', diameter: '0.0047', flute_length: '', oal_length: '' },
	{ size: '99', diameter: '0.0051', flute_length: '', oal_length: '' },
	{ size: '98', diameter: '0.0055', flute_length: '', oal_length: '' },
	{ size: '97', diameter: '0.0059', flute_length: '', oal_length: '' },
	{ size: '96', diameter: '0.0063', flute_length: '', oal_length: '' },
	{ size: '95', diameter: '0.0067', flute_length: '', oal_length: '' },
	{ size: '94', diameter: '0.0071', flute_length: '', oal_length: '' },
	{ size: '93', diameter: '0.0075', flute_length: '', oal_length: '' },
	{ size: '92', diameter: '0.0079', flute_length: '', oal_length: '' },
	{ size: '91', diameter: '0.0083', flute_length: '', oal_length: '' },
	{ size: '90', diameter: '0.0087', flute_length: '', oal_length: '' },
	{ size: '89', diameter: '0.0091', flute_length: '', oal_length: '' },
	{ size: '88', diameter: '0.0095', flute_length: '', oal_length: '' },
	{ size: '87', diameter: '0.01', flute_length: '', oal_length: '' },
	{ size: '86', diameter: '0.0105', flute_length: '', oal_length: '' },
	{ size: '85', diameter: '0.011', flute_length: '', oal_length: '' },
	{ size: '84', diameter: '0.0115', flute_length: '', oal_length: '' },
	{ size: '83', diameter: '0.012', flute_length: '', oal_length: '' },
	{ size: '82', diameter: '0.0125', flute_length: '', oal_length: '' },
	{ size: '81', diameter: '0.013', flute_length: '', oal_length: '' },
	{ size: '1/64', diameter: '.0156', flute_length: '0.1875', oal_length: '0.75'},
	{ size: '80', diameter: '0.0135', flute_length: '0.125', oal_length: '0.75' },
	{ size: '79', diameter: '0.0145', flute_length: '0.125', oal_length: '0.75' },
	{ size: '78', diameter: '0.016', flute_length: '0.1875', oal_length: '0.875' },
	{ size: '77', diameter: '0.018', flute_length: '0.1875', oal_length: '0.875' },
	{ size: '76', diameter: '0.020', flute_length: '0.1875', oal_length: '0.875' },
	{ size: '75', diameter: '0.021', flute_length: '0.25', oal_length: '1.0' },
	{ size: '74', diameter: '0.0225', flute_length: '0.25', oal_length: '1.0' },
	{ size: '73', diameter: '0.024', flute_length: '0.3125', oal_length: '1.125' },
	{ size: '72', diameter: '0.025', flute_length: '0.3125', oal_length: '1.125' },
	{ size: '71', diameter: '0.026', flute_length: '0.375', oal_length: '1.25' },
	{ size: '70', diameter: '0.028', flute_length: '0.375', oal_length: '1.25' },
	{ size: '69', diameter: '0.0292', flute_length: '0.5', oal_length: '1.375' },
	{ size: '68', diameter: '0.031', flute_length: '0.5', oal_length: '1.375' },
	{ size: '67', diameter: '0.032', flute_length: '0.5', oal_length: '1.375' },
	{ size: '66', diameter: '0.033', flute_length: '0.5', oal_length: '1.375' },
	{ size: '65', diameter: '0.035', flute_length: '0.625', oal_length: '1.5' },
	{ size: '64', diameter: '0.036', flute_length: '0.625', oal_length: '1.5' },
	{ size: '63', diameter: '0.037', flute_length: '0.625', oal_length: '1.5' },
	{ size: '62', diameter: '0.038', flute_length: '0.625', oal_length: '1.5' },
	{ size: '61', diameter: '0.039', flute_length: '0.6875', oal_length: '1.625' },
	{ size: '60', diameter: '0.04', flute_length: '0.6875', oal_length: '1.625' },
	{ size: '59', diameter: '0.041', flute_length: '0.6875', oal_length: '1.625' },
	{ size: '58', diameter: '0.042', flute_length: '0.6875', oal_length: '1.625' },
	{ size: '57', diameter: '0.043', flute_length: '0.75', oal_length: '1.75' },
	{ size: '56', diameter: '0.0465', flute_length: '0.75', oal_length: '1.75' },
	{ size: '55', diameter: '0.052', flute_length: '0.875', oal_length: '1.875' },
	{ size: '54', diameter: '0.055', flute_length: '0.875', oal_length: '1.875' },
	{ size: '53', diameter: '0.0595', flute_length: '0.875', oal_length: '1.875' },
	{ size: '52', diameter: '0.0635', flute_length: '0.875', oal_length: '1.875' },
	{ size: '51', diameter: '0.067', flute_length: '1.0', oal_length: '2.0' },
	{ size: '50', diameter: '0.07', flute_length: '1.0', oal_length: '2.0' },
	{ size: '49', diameter: '0.073', flute_length: '1.0', oal_length: '2.0' },
	{ size: '48', diameter: '0.076', flute_length: '1.0', oal_length: '2.0' },
	{ size: '47', diameter: '0.0785', flute_length: '1.0', oal_length: '2.0' },
	{ size: '46', diameter: '0.081', flute_length: '1.125', oal_length: '2.125' },
	{ size: '45', diameter: '0.082', flute_length: '1.125', oal_length: '2.125' },
	{ size: '44', diameter: '0.086', flute_length: '1.125', oal_length: '2.125' },
	{ size: '43', diameter: '0.089', flute_length: '1.25', oal_length: '2.25' },
	{ size: '42', diameter: '0.0935', flute_length: '1.25', oal_length: '2.25' },
	{ size: '41', diameter: '0.096', flute_length: '1.375', oal_length: '1.375' },
	{ size: '40', diameter: '0.098', flute_length: '1.375', oal_length: '1.375' },
	{ size: '39', diameter: '0.0995', flute_length: '1.375', oal_length: '1.375' },
	{ size: '38', diameter: '0.1015', flute_length: '1.4375', oal_length: '2.5' },
	{ size: '37', diameter: '0.104', flute_length: '1.4375', oal_length: '2.5' },
	{ size: '36', diameter: '0.1065', flute_length: '1.4375', oal_length: '2.5' },
	{ size: '35', diameter: '0.11', flute_length: '1.5', oal_length: '2.625' },
	{ size: '34', diameter: '0.111', flute_length: '1.5', oal_length: '2.625' },
	{ size: '33', diameter: '0.113', flute_length: '1.5', oal_length: '2.625' },
	{ size: '32', diameter: '0.116', flute_length: '1.625', oal_length: '2.75' },
	{ size: '31', diameter: '0.12', flute_length: '1.625', oal_length: '2.75' },
	{ size: '30', diameter: '0.1285', flute_length: '1.625', oal_length: '2.75' },
	{ size: '29', diameter: '0.136', flute_length: '1.75', oal_length: '2.875' },
	{ size: '28', diameter: '0.1405', flute_length: '1.75', oal_length: '2.875' },
	{ size: '27', diameter: '0.144', flute_length: '1.875', oal_length: '3.0' },
	{ size: '26', diameter: '0.147', flute_length: '1.875', oal_length: '3.0' },
	{ size: '25', diameter: '0.1495', flute_length: '1.875', oal_length: '3.0' },
	{ size: '24', diameter: '0.152', flute_length: '2.0', oal_length: '3.125' },
	{ size: '23', diameter: '0.154', flute_length: '2.0', oal_length: '3.125' },
	{ size: '22', diameter: '0.157', flute_length: '2.0', oal_length: '3.125' },
	{ size: '21', diameter: '0.159', flute_length: '2.125', oal_length: '3.25' },
	{ size: '20', diameter: '0.161', flute_length: '2.125', oal_length: '3.25' },
	{ size: '19', diameter: '0.166', flute_length: '2.125', oal_length: '3.25' },
	{ size: '18', diameter: '0.1695', flute_length: '2.125', oal_length: '3.25' },
	{ size: '17', diameter: '0.173', flute_length: '2.1875', oal_length: '3.375' },
	{ size: '16', diameter: '0.177', flute_length: '2.1875', oal_length: '3.375' },
	{ size: '15', diameter: '0.18', flute_length: '2.1875', oal_length: '3.375' },
	{ size: '14', diameter: '0.182', flute_length: '2.1875', oal_length: '3.375' },
	{ size: '13', diameter: '0.185', flute_length: '2.3125', oal_length: '3.5' },
	{ size: '12', diameter: '0.189', flute_length: '2.3125', oal_length: '3.5' },
	{ size: '11', diameter: '0.191', flute_length: '2.3125', oal_length: '3.5' },
	{ size: '10', diameter: '0.1935', flute_length: '2.4375', oal_length: '3.625' },
	{ size: '9', diameter: '0.196', flute_length: '2.4375', oal_length: '3.625' },
	{ size: '8', diameter: '0.199', flute_length: '2.4375', oal_length: '3.625' },
	{ size: '7', diameter: '0.201', flute_length: '2.4375', oal_length: '3.625' },
	{ size: '6', diameter: '0.204', flute_length: '2.5', oal_length: '3.75' },
	{ size: '5', diameter: '0.2055', flute_length: '2.5', oal_length: '3.75' },
	{ size: '4', diameter: '0.209', flute_length: '2.5', oal_length: '3.75' },
	{ size: '3', diameter: '0.213', flute_length: '2.5', oal_length: '3.75' },
	{ size: '2', diameter: '0.221', flute_length: '2.625', oal_length: '3.875' },
	{ size: '1', diameter: '0.228', flute_length: '2.625', oal_length: '3.875' },
	{ size: 'A', diameter: '0.234', flute_length: '2.625', oal_length: '3.875' },
	{ size: 'B', diameter: '0.238', flute_length: '2.75', oal_length: '4.0' },
	{ size: 'C', diameter: '0.242', flute_length: '2.75', oal_length: '4.0' },
	{ size: 'D', diameter: '0.246', flute_length: '2.75', oal_length: '4.0' },
	{ size: 'E', diameter: '0.25', flute_length: '2.875', oal_length: '4.125' },
	{ size: 'F', diameter: '0.257', flute_length: '2.875', oal_length: '4.125' },
	{ size: 'G', diameter: '0.261', flute_length: '2.875', oal_length: '4.125' },
	{ size: 'H', diameter: '0.266', flute_length: '2.875', oal_length: '4.125' },
	{ size: 'I', diameter: '0.272', flute_length: '2.875', oal_length: '4.125' },
	{ size: 'J', diameter: '0.277', flute_length: '2.875', oal_length: '4.125' },
	{ size: 'K', diameter: '0.281', flute_length: '2.9375', oal_length: '4.25' },
	{ size: 'L', diameter: '0.29', flute_length: '2.9375', oal_length: '4.25' },
	{ size: 'M', diameter: '0.295', flute_length: '3.0625', oal_length: '4.375' },
	{ size: 'N', diameter: '0.302', flute_length: '3.0625', oal_length: '4.375' },
	{ size: 'O', diameter: '0.316', flute_length: '3.1875', oal_length: '4.5' },
	{ size: 'P', diameter: '0.323', flute_length: '3.3125', oal_length: '4.625' },
	{ size: 'Q', diameter: '0.332', flute_length: '3.4375', oal_length: '4.75' },
	{ size: 'R', diameter: '0.339', flute_length: '3.4375', oal_length: '4.75' },
	{ size: 'S', diameter: '0.348', flute_length: '3.5', oal_length: '4.875' },
	{ size: 'T', diameter: '0.358', flute_length: '3.5', oal_length: '4.875' },
	{ size: 'U', diameter: '0.368', flute_length: '3.625', oal_length: '4.0' },
	{ size: 'V', diameter: '0.377', flute_length: '3.625', oal_length: '4.0' },
	{ size: 'W', diameter: '0.386', flute_length: '3.75', oal_length: '5.125' },
	{ size: 'X', diameter: '0.397', flute_length: '3.75', oal_length: '5.125' },
	{ size: 'Y', diameter: '0.404', flute_length: '3.875', oal_length: '5.25' },
	{ size: 'Z', diameter: '0.413', flute_length: '3.875', oal_length: '5.25'  }

]


export default DrillSizes;