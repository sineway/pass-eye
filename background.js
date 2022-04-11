importScripts(
	"/node_modules/webextension-polyfill/dist/browser-polyfill.js"
)

let revealPassword = async () => {
	let [tab] = await browser.tabs.query({
		currentWindow: true,
		active: true
	})
	browser.tabs.executeScript(tab.id, {
		file: "content.js",
		allFrames: true
	}).catch(
		console.error
	)
}

browser.action.onClicked.addListener(
	revealPassword
)

browser.contextMenus.removeAll().then(() => {
	browser.contextMenus.create({
		id: "reveal_password",
		contexts: ["editable"],
		title: browser.i18n.getMessage("context_menu")
	})
})

browser.contextMenus.onClicked.addListener(info => {
	if (info.menuItemId == "reveal_password") {
		revealPassword()
	}
})

browser.commands.onCommand.addListener(name => {
	if (name == "reveal_password") {
		revealPassword()
	}
})
