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

	jokeEl.removeAttribute('close');
	jokeEl.setAttribute('open', '');
	jokeEl.innerText = data.joke;
}

jokeBtn.addEventListener('click', () => {
	jokeEl.removeAttribute('open');
	jokeEl.setAttribute('close', '');
	document.querySelector('.container').classList.add('try');
	generateJoke();
});
