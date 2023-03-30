// flip cards
console.log("Working");
let flipCard = document.querySelector(".flippable");

flipCard.addEventListener("click", function () {
	flipCard.classList.toggle("is-flipped");
});

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
