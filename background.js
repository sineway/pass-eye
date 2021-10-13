let { homepage_url } = browser.runtime.getManifest();

browser.contextMenus.removeAll().then(async () => {
	let command = (await browser.commands.getAll()).find(command => {
		return command.name == "view_password";
	});
	if (command.shortcut) {
		command.shortcut = `(${ command.shortcut })`;
	}
	browser.contextMenus.create({
		contexts: ["page", "frame", "editable"],
		title: `${ browser.i18n.getMessage("name") } ${ command.shortcut }`,
		id: "view_password"
	});
	browser.contextMenus.create({
		contexts: ["browser_action"],
		title: browser.i18n.getMessage("contributeTranslation"),
		id: `${ homepage_url }/issues/2`
	});
	browser.contextMenus.create({
		contexts: ["browser_action"],
		title: browser.i18n.getMessage("contributeBugReport"),
		id: `${ homepage_url }/issues/new?labels=bug`
	});
});

browser.contextMenus.onClicked.addListener(info => {
	if (info.menuItemId == "view_password") {
		viewPassword();
	}
	else if (info.menuItemId.startsWith(homepage_url)) {
		browser.tabs.create({
			url: info.menuItemId
		});
	}
});

browser.commands.onCommand.addListener(name => {
	if (name == "view_password") {
		viewPassword();
	}
});

browser.browserAction.onClicked.addListener(viewPassword);

async function viewPassword() {
	let [tab] = await browser.tabs.query({
		currentWindow: true,
		active: true
	});
	browser.tabs.executeScript(tab.id, {
		file: "content.js",
		allFrames: true
	}).catch(error => {
		console.trace(error.message);
	});
}






