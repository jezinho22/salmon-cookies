// switch menu tabs
function setFocus(element) {
	let x = document.querySelector("li.gotFocus");
	x.className = "noFocus";
	console.log(x);
	element.className = "gotFocus";
}

// stores sales section
// hours for table header
const hours = [
	"6am",
	"7am",
	"8am",
	"9am",
	"10am",
	"11am",
	"12pm",
	"1pm",
	"2pm",
	"3pm",
	"4pm",
	"5pm",
	"6pm",
	"7pm",
];
const tableElement = document.getElementById("sales-table");

// get hold of your form element by it's id
const storesFormEl = document.getElementById("stores");
console.log(storesFormEl.textContent);

storesFormEl.addEventListener("submit", function (event) {
	event.preventDefault();
	console.log("Working");
	// get the values from the inputs
	const locationName = event.target.locationName.value;
	const minCustPerHour = event.target.minCustPerHour.value;
	const maxCustPerHour = event.target.maxCustPerHour.value;
	const avgCookiePerSale = event.target.avgCookiePerSale.value;

	// plug into constructor
	const newStore = new CookieStand(
		locationName,
		minCustPerHour,
		maxCustPerHour,
		avgCookiePerSale
	);
	state.allCookieStands.push(newStore);
	// //delete existing rendering
	// let oldTable = document.getElementById("sales-table");
	// oldTable.remove();
	// // create and append new one
	// let newTableSpace = document.getElementById("table-space");
	// let newTable = document.createElement("table");
	// newTable.setAttribute("id", "sales-table");
	// newTableSpace.appendChild(newTable);

	// remove last row from table
	let rows = tableElement.querySelectorAll("tr");
	let lastRow = rows[rows.length - 1];
	lastRow.remove();
	newStore.render();
	makeFooterRow();
	//renderTable();
});
const state = {
	allCookieStands: [],
};

// constructor function for new locations
// make sure that the form info fits this
function CookieStand(
	locationName,
	minCustPerHour,
	maxCustPerHour,
	avgCookiePerSale
) {
	this.locationName = locationName;
	this.minCustPerHour = minCustPerHour;
	this.maxCustPerHour = maxCustPerHour;
	this.avgCookiePerSale = avgCookiePerSale;
	// this will be calculated by calcCustomersEachHour method added below
	this.customersEachHour = [];
	// this will be calculated by calcCookiesEachhour method added below
	this.cookiesEachHour = [];
	// this is added to by calcCookiesEachhour
	this.totalDailySales = 0;
}

CookieStand.prototype.calcCustomersEachHour = function () {
	for (let i = 0; i < hours.length; i++) {
		let randomCust = random(this.minCustPerHour, this.maxCustPerHour)
		this.customersEachHour.push(randomCust)
	}
};

CookieStand.prototype.calcCookiesEachhour = function () {
	for (let i = 0; i < hours.length; i++) {
		const eachHour = Math.ceil(
			this.customersEachHour[i] * this.avgCookiePerSale
		);
		this.cookiesEachHour.push(eachHour);
		this.totalDailySales += eachHour;
	}
};

//
CookieStand.prototype.render = function () {
	//'this' refers to instance of CookieStand
	// call these methods on instance
	this.calcCustomersEachHour();
	this.calcCookiesEachhour();
	// add location row to table
	const tableRow = document.createElement("tr");
	let tableDataElement = document.createElement("td");
	tableDataElement.textContent = this.locationName;
	tableRow.appendChild(tableDataElement);
	// add hourly sales to location row
	for (let i = 0; i < hours.length; i++) {
		tableDataElement = document.createElement("td");
		tableDataElement.textContent = this.cookiesEachHour[i];
		tableRow.appendChild(tableDataElement);
	}
	// add a final total sales cell to the location row
	const tableHeader = document.createElement("th");
	tableHeader.textContent = this.totalDailySales;
	tableRow.appendChild(tableHeader);
	tableElement.appendChild(tableRow);
};

// data to be replaced by form input
let seattle = new CookieStand("Seattle", 23, 65, 6.3);
let tokyo = new CookieStand("Tokyo", 3, 24, 1.2);
let dubai = new CookieStand("Dubai", 11, 38, 3.7);
let paris = new CookieStand("Paris", 20, 38, 2.3);
let lima = new CookieStand("Lima", 2, 16, 4.6);

// add CookieStand instances to an array
state.allCookieStands.push(seattle, tokyo, dubai, paris, lima);

// random number between min and max - to be used to create distribution of sales
function random(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

// making the table
//
function makeHeaderRow() {
	const tableRow = document.createElement("tr");
	let tableHeader = document.createElement("th");
	tableHeader.textContent = "Locations";
	tableRow.appendChild(tableHeader);
	// make header cells for each of the times in the hours array
	for (let i = 0; i < hours.length; i++) {
		tableHeader = document.createElement("th");
		tableHeader.textContent = hours[i];
		tableRow.appendChild(tableHeader);
	}
	// make a header cell for the totals column
	tableHeader = document.createElement("th");
	tableHeader.textContent = "Location Totals";
	tableRow.appendChild(tableHeader);
	tableElement.appendChild(tableRow);
}

// make totals row for adding up the hourly sales from all locations
function makeFooterRow() {
	const tableRow = document.createElement("tr");
	let tableHeader = document.createElement("th");
	tableHeader.textContent = "Hourly Totals for All Locations";
	tableRow.appendChild(tableHeader);
	//populate totals row with totals, taken from array of cookie stands
	let totalOfTotals = 0;
	// calculate totals
	for (let i = 0; i < hours.length; i++) {
		let hourlyTotal = 0;
		for (let j = 0; j < state.allCookieStands.length; j++) {
			hourlyTotal += state.allCookieStands[j].cookiesEachHour[i];
			totalOfTotals += state.allCookieStands[j].cookiesEachHour[i];
		}
		// add totals to row
		tableHeader = document.createElement("th");
		tableHeader.textContent = hourlyTotal;
		tableRow.appendChild(tableHeader);
	}
	// add final total to end of row
	tableHeader = document.createElement("th");
	tableHeader.textContent = totalOfTotals;
	tableRow.appendChild(tableHeader);
	tableElement.appendChild(tableRow);
}
// call header row in open script
// copy the relevant part into the event listener
// to render extra row
// copy part of makeFooterRow to change values of cells
// rather than create them
function renderTable() {
	makeHeaderRow();
	for (let i = 0; i < state.allCookieStands.length; i++) {
		state.allCookieStands[i].render();
	}
	makeFooterRow();
}

renderTable();

