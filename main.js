var id = "b35569fd-bcec-4bdc-807d-d4b8cd2f319e";

var request = new Request("https://hubs.runtastic.com/samples/v2/users/93431237/samples/1404404249?include=trace_collection", {
	credentials: "include",
	headers: new Headers({
		'X-App-Key': 'com.runtastic.ember',
		'X-App-Version': '1.0'
	})
});

fetch(request)
	.then(response => response.json())
	.then(result => alert(result.data.id));

poll("header-main-navigation");
poll("mobile-nav");

window.addEventListener("message", receiveMessage, false);

function receiveMessage(event) {
	if (event.data.id === id) {
		var ids = getIds(event.data.data);
		alert(JSON.stringify(ids, null, "  "));
	}
}

function getIds(data) {
	return data.map(element => element[0]);
}

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
	var url = getActivitiesURL();

	if (!url) {
		return;
	}

	var iframe = document.createElement("iframe");
	iframe.src = url;

	iframe.setAttribute("style", "display:none;");
	document.body.appendChild(iframe);

	var script = iframe.contentDocument.createElement("script");
	script.type = "text/javascript";
	script.text = 'window.onload = () => { window.parent.postMessage({ "id": "b35569fd-bcec-4bdc-807d-d4b8cd2f319e", "data": index_data }, "*")};';

	iframe.contentDocument.body.appendChild(script);
}

function getActivitiesURL() {
	var elements = document.querySelectorAll("[data-gaq-label]");

	for (var i = 0; i < elements.length; i++) {
		if (elements[i].getAttribute("data-gaq-label") === "user_menu.activities") {
			return elements[i].href;
		}
	}
}
