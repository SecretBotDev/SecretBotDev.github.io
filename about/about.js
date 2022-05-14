!(async () => {
	const { icons, users } =
		(localStorage.getItem('UserStore') && JSON.parse(localStorage.UserStore))
		?? await fetch('/about/data.json').then(
			(res) => res.json
		);

	localStorage.setItem('UserStore', JSON.stringify({
		icons, users
	}));

	function createConnection(type, username) {
		const img = document.createElement('img');
		img.src = icons[type];

		const elem = document.createElement("a");
		switch (type) {
			case 'github': {
				elem.href = `https://github.com/${name}`;
				elem.target = '_blank';
			}
			case 'discord': {
				elem.href = '#';
				elem.onclick = function (event) {
					event.preventDefault();
					navigator.clipboard.writeText(username);
					elem.textContent = '[]Copied!]';
					setTimeout(() => {
						elem.textContent = username;
					});
				};
			}
		}

		elem.appendChild(img);

		return elem;
	}

	for (const user of users) {
		const div = document.createElement('div');
		div.className = 'gallery-item';

		const icon = document.createElement('img');
		icon.src = user.icon;
		icon.alt = user.username;
		icon.className = 'pfp';

		div.appendChild(icon);
		div.appendChild(document.createElement('br'));

		const nameDiv = document.createElement('div');
		nameDiv.className = 'name';

		const firstName = document.createElement('h3');
		firstName.className = 'firstName'; // TODO: consistency
		firstName.textContent = user.name;

		nameDiv.appendChild(firstName);

		const alias = document.createElement('h4');
		alias.className = 'alias';
		alias.textContent = user.username;

		nameDiv.appendChild(alias);

		div.appendChild(nameDiv);

		const descriptionDiv = document.createElement('div');
		descriptionDiv.className = 'description';

		const description = document.createElement('h4');
		description.textContent = user.bio;

		descriptionDiv.appendChild(description);
		div.appendChild(descriptionDiv);

		/**
		 * @type {HTMLAnchorElement[]}
		 */
		const connections = user.connections.map(conn => createConnection(conn.type, conn.username));

		const socials = document.createElement('div');
		socials.className = 'socials';

		for (const connection of connections) {
			socials.appendChild(connection);
		}

		div.appendChild(socials);

		document.getElementById('gallery').appendChild(div);
	}
})();