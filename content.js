(() => {
	let { frameElement } = window;
	console.debug({ frameElement });

	let roots = [document];

	document.querySelectorAll("*").forEach(item => {
		if (item.shadowRoot) {
			roots.push(item.shadowRoot);
		}
	});
	console.debug({ roots });

	roots.forEach(root => {
		root.querySelectorAll(`input[type~="password"]`).forEach(input => {
			if (input.type == "password") {
				input.type += " ";
			} else {
				input.type = "password";
			}
		});
	});
})();

