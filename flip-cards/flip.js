// flip cards
console.log("Working");
let flipCards = document.querySelectorAll(".flippable");
for (let i = 0; i < flipCards.length; i++) {
	console.log("add event listener");
	flipCards[i].addEventListener("click", function () {
		flipCards[i].classList.toggle("is-flipped");
	});
}

function correctAnswer() {
	console.log("Correct working");
	let discardCard = document.querySelector(".flippable");
	discardCard.classList.toggle("discard");
}

function wrongAnswer() {
	console.log("Wrong working");
	let keepCard = document.querySelector(".flippable");
	keepCard.classList.toggle("returnToPile");
}
