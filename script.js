const jokeEl = document.getElementById('joke');
const jokeBtn = document.getElementById('jokeBtn');

var prevHeight = window.getComputedStyle(jokeEl).height;

// console.log(prevHeight);
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

	console.log('prev: ', window.getComputedStyle(jokeEl).height);

	jokeEl.innerText = data.joke;

	jokeEl.classList.add('collapse');
	expandElement(jokeEl, 'collapse');

	jokeEl.removeAttribute('close');
	jokeEl.setAttribute('open', '');
}

jokeBtn.addEventListener('click', () => {
	jokeEl.removeAttribute('open');
	jokeEl.setAttribute('close', '');
	// expandElement(jokeEl, 'collapse');

	generateJoke();
});

function expandElement(elem, collapseClass) {
	// debugger;
	elem.style.height = '';
	elem.style.transition = 'none';

	const startHeight = prevHeight;
	// console.log('start', startHeight);
	// Remove the collapse class, and force a layout calculation to get the final height
	elem.classList.remove(collapseClass);
	const height = window.getComputedStyle(elem).height;
	console.log('next: ', height);
	prevHeight = height;
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
	// elem.addEventListener('transitionend', () => {
	// 	elem.style.height = '';
	// 	elem.removeEventListener('transitionend', arguments.callee);
	// 	console.log('transition end');
	// });
	console.log('----------------------------------------------');
}
