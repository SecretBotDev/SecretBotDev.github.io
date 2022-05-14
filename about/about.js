function show_info() {
	fetch('userinfo.json').then(response => {
		return response.json();
	}).then(data => {
		//save the icon's URL
		let icons = {};
		for (let icon in data.Icons) {
			icons[icon] = data.Icons[icon]
		}


		//save the user info
		let userinfo = data.Users

		//loop through the user info and add them to page
		for (username in userinfo) {
			let user = userinfo[username];
			let social = ``;
			for (connection in user.Connections) {
				social += `<a href="${user.Connections[connection]}"><img src="${icons[connection]}"></a>`;
			}

			let userstring = `<div class="gallery-item"><img class="pfp" src="${user.UserIcon}" alt="${username}"><br><div class="name"><h3 class="firstName">${user.FirstName}</h3><h4 class="alias">${username}</h4></div><div class="description"><h4>${user.About}</h4></div><div class="socials">${social}</div></div>`;
			document.getElementById('gallery').innerHTML = userstring;
		}
	}).catch(err => {
		// Do something for an error here
	});
}
show_info()