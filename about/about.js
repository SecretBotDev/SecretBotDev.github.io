function show_info() {
	fetch('userinfo.json').then(response => {
		return response.json();
	}).then(data => {
		// Work with JSON data here
		console.log(data);

		//save the icon's URL
		let icons = {};
		for (let icon in data.Icons) {
			icons[icon] = data.Icons[icon]
			console.log(icon)
		}
		console.log(icons);


		//save the user info
		let userinfo = data.Users
		console.log(userinfo)

		//loop through the user info and add them to page
		for (username in userinfo) {
			let user = userinfo[username];
			console.log(user);
			let social = ``;
			for (connection in user.Connections) {
				console.log(connection);
				social += `<a href="${user.Connections[connection]}"><img src="${icons[connection]}"></a>`;
			}
			console.log(social);

			let userstring = `<div class="gallery-item"><img class="pfp" src="${user.UserIcon}" alt="${username}"><br><div class="name"><h3 class="firstName">${user.FirstName}</h3><h4 class="alias">${username}</h4></div><div class="description"><h4>${user.About}</h4></div><div class="socials">${social}</div></div>`;
			document.getElementById('gallery').innerHTML = userstring;
		}
	}).catch(err => {
		// Do something for an error here
	});
}
show_info()