!(async function () {
	const elements = document.querySelectorAll('*');

	for (const element of elements) {
		const src = element.getAttribute('include-page');
		if (!src) continue;

		const data = await fetch(src);
		if (!data.ok) element.textContent = 'Error while fetching component';

		// FIXME: remove this insecure usage of innerHTML
		element.innerHTML = await data.text();
	}
})();

window.query = new URLSearchParams(window.location.search);