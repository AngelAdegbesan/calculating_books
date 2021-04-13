document.addEventListener("DOMContentLoaded", function (e) {
	//get a nodelist of items we care about
	const item_rows = document.querySelectorAll(".calculator .row:not(.total)");

	item_rows.forEach(function (row) {

		const qty_field = row.querySelector("input");
		qty_field.addEventListener("change", item_input_listener);
		qty_field.addEventListener("keyup", item_input_listener);
	});
});

function item_input_listener(e) {
	const this_input = e.target;
	const row = this_input.closest(".row");
	const qty = this_input.value;

	const shops = row.querySelectorAll(".amazon, .apple, .bam , .barnes");

	shops.forEach(function (shop) {
		let price = shop.dataset.price;
		price = parseFloat(price);

		const total = qty * price;
		shop.querySelector("span").innerHTML = round_number(total);
	});

	row.classList.add("active");
	calculate_totals();
};

function calculate_totals() {
	const item_rows = document.querySelectorAll(".calculator .row:not(.total)");

	let amazon = 0;
	let apple = 0;
	let bam = 0;
	let barnes = 0;

	item_rows.forEach(function (row) {
		const qty_field = row.querySelector("input");
		let qty = qty_field.value;

		qty = parseFloat(qty);
		const shops = row.querySelectorAll(".amazon, .apple, .bam, .barnes");

		shops.forEach(function (shop) {
			let price = shop.dataset.price;
			price = parseFloat(price);
			const total = qty * price;

			if (shop.classList.contains("bam")) {
				bam = bam + total;
			}

			if (shop.classList.contains("amazon")) {
				amazon = amazon + total;
			}

			if (shop.classList.contains("apple")) {
				apple = apple + total;
			}

			if (shop.classList.contains("barnes")) {
				barnes = barnes + total;
			}
		});

		const total_row = document.querySelector(".row.total");

		total_row.classList.add("active");

		total_row.querySelector(".amazon span").innerHTML = round_number(amazon);
		total_row.querySelector(".apple span").innerHTML = round_number(apple);
		total_row.querySelector(".bam span").innerHTML = round_number(bam);
		total_row.querySelector(".barnes span").innerHTML = round_number(barnes);

		let cheapest = false;

		if (amazon < bam && amazon < barnes && amazon < apple) {
			cheapest = 'amazon';
		}

		if (apple < amazon && apple < bam && apple < barnes) {
			cheapest = 'apple'
		}
		if (bam < amazon && bam < apple && bam < barnes) {
			cheapest = 'bam'
		}
		if (barnes < amazon && barnes < apple && barnes < bam) {
			cheapest = 'barnes'
		}


		const cheapest_item = total_row.querySelector(".cheapest");

		if (cheapest_item) {
			cheapest_item.classList.remove("cheapest");

		}
		if (cheapest !== false) {
			total_row.querySelector(`.${cheapest}`).classList.add("cheapest")
		}

	});
}

function round_number(num) {
	//first, move the decimal two places
	num = num * 100;

	//then, round the number to the nearest integer
	num = Math.round(num);

	//then move the decimal back two places
	num = num / 100;

	// handle trailing zeroes
	num = num.toFixed(2);

	return num;
}