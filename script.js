const jokeEl = document.getElementById('joke');
const jokeBtn = document.getElementById('jokeBtn');

jokeEl.addEventListener('transitionstart', () => {
	console.log('Transition Started');
});
jokeEl.addEventListener('transitionrun', () => {
	console.log('Transition Running');
});
jokeEl.addEventListener('transitionend', () => {
	console.log('Transition Finished');
});
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
}

jokeBtn.addEventListener('click', generateJoke);
