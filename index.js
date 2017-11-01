#!/usr/bin/env node
const yargs = require('yargs');

const options = {
	's': {
		alias: 'start-day',
        // default: 1,
        describe: 'The day the month start at',
        type: 'number'
    },
    'n': {
    	alias: 'n-month-days',
    	default: 30,
    	describe: 'Number of days in this month',
    	type: 'number'
    },
    'v': {
    	alias: 'vacation-days',
    	describe: 'The days you were in vacation',
    	type: 'array',
    	default: []
    }
};


const days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

function printCsv(currentDay, vacationDays, nMonthDays) {
	console.log('date, day, hours, vacation')
	let current = currentDay - 1;
	let total = 0;
	for (let i = 1; i <= nMonthDays; i++, current++) {
		current = (current % 7);
		// console.log("***** ", current, argv.v.find( e => e == i));
		let vacation = vacationDays.find( e => e == i) ? 1 : 0;
		let hours = current === 5 || current === 6 || vacation ? 0 : 10; 
		total+=hours
		console.log(`${i}, ${days[current]}, ${hours}, ${vacation}`);
	}	
}

if (require.main === module) {
	const argv = require('yargs')
	.options(options)
	.demandOption(['s'])
	.version('0.0.0')
	.help()
	.argv;

	printCsv(argv.s, argv.v, argv.n);
}

module.exports = printCsv;


