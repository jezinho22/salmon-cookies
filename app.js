const norwich = { minCustomers: 0, maxCustomers: 0, CookiesPerCust: 0 };
const leeds = { minCustomers: 0, maxCustomers: 0, CookiesPerCust: 0 };
const manchester = { minCustomers: 0, maxCustomers: 0, CookiesPerCust: 0 };
const liverpool = { minCustomers: 0, maxCustomers: 0, CookiesPerCust: 0 };

console.log(norwich.minCustomers);

function CookieStore(location, minCustomers, maxCustomers, avgPurchase) {
	this.location = location;
	this.minCustomers = minCustomers;
	this.maxCustomers = maxCustomers;
	this.avgPurchase = avgPurchase;
}
CookieStore.prototype.randomCustomers = function () {
	Math.floor(Math.random()) * (this.maxCustomers - this.minCustomers) +
		this.minCustomers;
};
