let revealPassword = async () => {
	let [tab] = await chrome.tabs.query({
		currentWindow: true,
		active: true
	})
	chrome.scripting.executeScript({
		files: ["content.js"],
		target: {
			tabId: tab.id,
			allFrames: true
		}
	}).catch(
		console.error
	)
}

chrome.action.onClicked.addListener(
	revealPassword
)

chrome.contextMenus.removeAll(() => {
	chrome.contextMenus.create({
		id: "reveal_password",
		contexts: ["editable"],
		title: chrome.i18n.getMessage("context_menu")
	})
})

chrome.contextMenus.onClicked.addListener(info => {
	if (info.menuItemId == "reveal_password") {
		revealPassword()
	}
})

chrome.commands.onCommand.addListener(name => {
	if (name == "reveal_password") {
		revealPassword()
	}
})
