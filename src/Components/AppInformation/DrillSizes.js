let DrillSizes = [
	{ size: '107', diameter: '0.0019' },
	{ size: '106', diameter: '0.0023' },
	{ size: '105', diameter: '0.0027' },
	{ size: '104', diameter: '0.0031' },
	{ size: '103', diameter: '0.0035' },
	{ size: '102', diameter: '0.0039' },
	{ size: '101', diameter: '0.0043' },
	{ size: '100', diameter: '0.0047' },
	{ size: '99', diameter: '0.0051' },
	{ size: '98', diameter: '0.0055' },
	{ size: '97', diameter: '0.0059' },
	{ size: '96', diameter: '0.0063' },
	{ size: '95', diameter: '0.0067' },
	{ size: '94', diameter: '0.0071' },
	{ size: '93', diameter: '0.0075' },
	{ size: '92', diameter: '0.0079' },
	{ size: '91', diameter: '0.0083' },
	{ size: '90', diameter: '0.0087' },
	{ size: '89', diameter: '0.0091' },
	{ size: '88', diameter: '0.0095' },
	{ size: '87', diameter: '0.0100' },
	{ size: '86', diameter: '0.0105' },
	{ size: '85', diameter: '0.0110' },
	{ size: '84', diameter: '0.0115' },
	{ size: '83', diameter: '0.0120' },
	{ size: '82', diameter: '0.0125' },
	{ size: '81', diameter: '0.0130' },
	{ size: '80', diameter: '0.0135' },
	{ size: '79', diameter: '0.0145' },
	{ size: '78', diameter: '0.0160' },
	{ size: '77', diameter: '0.0180' },
	{ size: '76', diameter: '0.0200' },
	{ size: '75', diameter: '0.0210' },
	{ size: '74', diameter: '0.0225' },
	{ size: '73', diameter: '0.0240' },
	{ size: '72', diameter: '0.0250' },
	{ size: '71', diameter: '0.0260' },
	{ size: '70', diameter: '0.0280' },
	{ size: '69', diameter: '0.0292' },
	{ size: '68', diameter: '0.0310' },
	{ size: '67', diameter: '0.0320' },
	{ size: '66', diameter: '0.0330' },
	{ size: '65', diameter: '0.0350' },
	{ size: '64', diameter: '0.0360' },
	{ size: '63', diameter: '0.0370' },
	{ size: '62', diameter: '0.0380' },
	{ size: '61', diameter: '0.0390' },
	{ size: '60', diameter: '0.0400' },
	{ size: '59', diameter: '0.0410' },
	{ size: '58', diameter: '0.0420' },
	{ size: '57', diameter: '0.0430' },
	{ size: '56', diameter: '0.0465' },
	{ size: '55', diameter: '0.0520' },
	{ size: '54', diameter: '0.0550' },
	{ size: '53', diameter: '0.0595' },
	{ size: '52', diameter: '0.0635' },
	{ size: '51', diameter: '0.0670' },
	{ size: '50', diameter: '0.0700' },
	{ size: '49', diameter: '0.0730' },
	{ size: '48', diameter: '0.0760' },
	{ size: '47', diameter: '0.0785' },
	{ size: '46', diameter: '0.0810' },
	{ size: '45', diameter: '0.0820' },
	{ size: '44', diameter: '0.0860' },
	{ size: '43', diameter: '0.0890' },
	{ size: '42', diameter: '0.0935' },
	{ size: '41', diameter: '0.0960' },
	{ size: '40', diameter: '0.0980' },
	{ size: '39', diameter: '0.0995' },
	{ size: '38', diameter: '0.1015' },
	{ size: '37', diameter: '0.1040' },
	{ size: '36', diameter: '0.1065' },
	{ size: '35', diameter: '0.1100' },
	{ size: '34', diameter: '0.1110' },
	{ size: '33', diameter: '0.1130' },
	{ size: '32', diameter: '0.1160' },
	{ size: '31', diameter: '0.1200' },
	{ size: '30', diameter: '0.1285' },
	{ size: '29', diameter: '0.1360' },
	{ size: '28', diameter: '0.1405' },
	{ size: '27', diameter: '0.1440' },
	{ size: '26', diameter: '0.1470' },
	{ size: '25', diameter: '0.1495' },
	{ size: '24', diameter: '0.1520' },
	{ size: '23', diameter: '0.1540' },
	{ size: '22', diameter: '0.1570' },
	{ size: '21', diameter: '0.1590' },
	{ size: '20', diameter: '0.1610' },
	{ size: '19', diameter: '0.1660' },
	{ size: '18', diameter: '0.1695' },
	{ size: '17', diameter: '0.1730' },
	{ size: '16', diameter: '0.1770' },
	{ size: '15', diameter: '0.1800' },
	{ size: '14', diameter: '0.1820' },
	{ size: '13', diameter: '0.1850' },
	{ size: '12', diameter: '0.1890' },
	{ size: '11', diameter: '0.1910' },
	{ size: '10', diameter: '0.1935' },
	{ size: '9', diameter: '0.1960' },
	{ size: '8', diameter: '0.1990' },
	{ size: '7', diameter: '0.2010' },
	{ size: '6', diameter: '0.2040' },
	{ size: '5', diameter: '0.2055' },
	{ size: '4', diameter: '0.2090' },
	{ size: '3', diameter: '0.2130' },
	{ size: '2', diameter: '0.2210' },
	{ size: '1', diameter: '0.2280' },
	{ size: 'A', diameter: '0.2340' },
	{ size: 'B', diameter: '0.2380' },
	{ size: 'C', diameter: '0.2420' },
	{ size: 'D', diameter: '0.2460' },
	{ size: 'E', diameter: '0.2500' },
	{ size: 'F', diameter: '0.2570' },
	{ size: 'G', diameter: '0.2610' },
	{ size: 'H', diameter: '0.2660' },
	{ size: 'I', diameter: '0.2720' },
	{ size: 'J', diameter: '0.2770' },
	{ size: 'K', diameter: '0.2810' },
	{ size: 'L', diameter: '0.2900' },
	{ size: 'M', diameter: '0.2950' },
	{ size: 'N', diameter: '0.3020' },
	{ size: 'O', diameter: '0.3160' },
	{ size: 'P', diameter: '0.3230' },
	{ size: 'Q', diameter: '0.3320' },
	{ size: 'R', diameter: '0.3390' },
	{ size: 'S', diameter: '0.3480' },
	{ size: 'T', diameter: '0.3580' },
	{ size: 'U', diameter: '0.3680' },
	{ size: 'V', diameter: '0.3770' },
	{ size: 'W', diameter: '0.3860' },
	{ size: 'X', diameter: '0.3970' },
	{ size: 'Y', diameter: '0.4040' },
	{ size: 'Z', diameter: '0.4130' }

]


export default DrillSizes;