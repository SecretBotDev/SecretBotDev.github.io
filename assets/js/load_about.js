!(async () => {
	const { members } =
		(
			localStorage.getItem('memberStore')
			&& window.query.get('nocache')
			&& JSON.parse(localStorage.memberStore)
		)
		|| await fetch('/assets/about.json').then(
			(res) => res.json()
		);


	localStorage.setItem('memberStore', JSON.stringify({
		members
	}));

	function createConnection(platform, handle) {
		const img = document.createElement('img');
		img.src = '/assets/img/' + platform + '.svg';
		img.alt = `${platform} icon`;

		const elem = document.createElement("a");
		switch (platform) {
			case 'github': {
				elem.href = `https://github.com/${handle}`;
				elem.target = '_blank';
				break;
			}
			case 'discord': {
				elem.href = '#';
				elem.onclick = function (event) {
					event.preventDefault();
					navigator.clipboard.writeText(handle);
					elem.textContent = '[Copied!]';
					setTimeout(() => {
						elem.textContent = undefined;
						elem.appendChild(img);
					}, 2000);
				};
				break;
			}
		}

		elem.appendChild(img);

		return elem;
	}

	function createAvatar(platform, identifier) {
		return platform === 'github' ? `https://avatars.githubusercontent.com/u/${identifier}` : platform;
	}

	for (const member of members) {

		const div = document.createElement('div');
		div.className = 'gallery-item';

		const avatar = document.createElement('img');
		avatar.src = createAvatar(...member.avatar.split(':'));
		avatar.alt = `${member.names.displayName}'s avatar`;
		avatar.className = 'avatar';

		div.appendChild(avatar);
		div.appendChild(document.createElement('br'));

		const nameDiv = document.createElement('div');
		nameDiv.className = 'name';

		const displayName = document.createElement('h3');
		displayName.className = 'displayName'; // TODO: consistency
		displayName.textContent = member.names.displayName;

		nameDiv.appendChild(displayName);

		const alias = document.createElement('h4');
		alias.className = 'alias';
		alias.textContent = member.names.alts;

		member.names.aliases.forEach(alias => {
			const element = document.createElement('h4');
			element.className = 'alias';
			element.textContent = alias;
			nameDiv.appendChild(element);
		});

		

		div.appendChild(nameDiv);

		const bioDiv = document.createElement('div');
		bioDiv.className = 'bio';

		const bio = document.createElement('h4');
		bio.textContent = member.bio;

		bio.appendChild(document.createElement('br'));
		bio.appendChild(document.createElement('br'))
		bio.appendChild(document.createElement('q')).textContent = member.quote;
		

		bioDiv.appendChild(bio);

		div.appendChild(bioDiv);

		/**
		 * @type {HTMLAnchorElement[]}
		 */
		const connections = member.connections.map(conn => createConnection(conn.platform, conn.handle));

		const socials = document.createElement('div');
		socials.className = 'socials';

		for (const connection of connections) {
			socials.appendChild(connection);
		}

		div.appendChild(socials);

		document.getElementById('gallery').appendChild(div);
	}
})();