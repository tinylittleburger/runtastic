function poll(name) {
	function poll(count) {
		if (count++ > 100) {
			return;
		}

		var menu = getMenu(name);

		if (menu) {
			inject(menu);
		} else {
			setTimeout(poll, 100, count);
		}
	}

	return poll(0);
}

poll("header-main-navigation");
poll("mobile-nav");

function getMenu(name) {
	var header = document.getElementsByClassName(name);

	if (header.length > 0) {
		var menu = header[0].getElementsByClassName("navigation-list");

		if (menu.length > 0) {
			return menu[0];
		}
	}
}

function inject(menu) {
	var item = document.createElement("li");
	item.className = "navigation-list__item";

	var link = document.createElement("a");
	link.className = "ember-view rt-link-to header-navigation__link";
	link.innerHTML = "Export";
	link.addEventListener("click", getActivities, false);

	item.appendChild(link);
	menu.appendChild(item);
}

function getActivities() {
	var elements = document.querySelectorAll("[data-gaq-label]");

	for (var i = 0; i < elements.length; i++) {
		if (elements[i].getAttribute("data-gaq-label") === "user_menu.activities") {
			alert(elements[i].href);
			return;
		}
	}
}
