customElements.define("x-password", class extends HTMLElement {
	constructor() {
		super()
		this.attachShadow({
			mode: "open"
		}).innerHTML = `
			<input type="password" value="qwerty123">
		`
	}
})
