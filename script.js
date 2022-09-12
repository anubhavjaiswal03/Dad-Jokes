const jokeEl = document.getElementById('joke');
const jokeBtn = document.getElementById('jokeBtn');

generateJoke();
// Using .then()
// function generateJoke() {
// 	const config = {
// 		headers: {
// 			Accept: 'application/json',
// 		},
// 	};

// 	fetch('https://icanhazdadjoke.com', config)
// 		.then((res) => res.json())
// 		.then((data) => {
// 			jokeEl.innerHTML = data.joke;
// 		});
// }

// Using ASYNC/AWAIT
async function generateJoke() {
	const config = {
		headers: {
			Accept: 'application/json',
		},
	};

	const res = await fetch('https://icanhazdadjoke.com', config);
	const data = await res.json();

	jokeEl.innerText = data.joke;
	jokeEl.setAttribute('open', '');
	expandElement(jokeEl, 'collapse');
}

jokeBtn.addEventListener('click', () => {
	expandElement(jokeEl, 'collapse');
	generateJoke();
});

function expandElement(elem, collapseClass) {
	// debugger;
	elem.style.height = '';
	elem.style.transition = 'none';

	const startHeight = window.getComputedStyle(elem).height;

	// Remove the collapse class, and force a layout calculation to get the final height
	elem.classList.toggle(collapseClass);
	const height = window.getComputedStyle(elem).height;

	// Set the start height to begin the transition
	elem.style.height = startHeight;

	// wait until the next frame so that everything has time to update before starting the transition
	requestAnimationFrame(() => {
		elem.style.transition = '';

		requestAnimationFrame(() => {
			elem.style.height = height;
		});
	});

	// Clear the saved height values after the transition
	elem.addEventListener('transitionend', () => {
		elem.style.height = '';
		elem.removeEventListener('transitionend', arguments.callee);
	});
}
