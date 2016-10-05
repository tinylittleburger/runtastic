var header = document.getElementsByClassName("header-main-navigation");

if (header.length > 0) {
	var menu = header[0].getElementsByClassName("navigation-list");

	if (menu.length > 0) {
		var item = document.createElement("li");
		item.className = "navigation-list__item";

		var link = document.createElement("a");
		link.className = "ember-view rt-link-to header-navigation__link";
		link.innerHTML = "Export";

		item.appendChild(link);
		menu[0].appendChild(item);
	}
}
