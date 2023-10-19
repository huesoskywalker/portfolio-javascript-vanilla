import { ContentLoaderInterface } from "../interfaces/ContentLoaderInterface.js"
import { ContentLoaderInjector } from "../util/ContentLoaderInjector.js"
class ThemeButton extends HTMLElement {
    static get observedAttributes() {
        return ["state"]
    }
    /**
     *
     * @param {ContentLoaderInterface} contentLoader
     */
    constructor(contentLoader) {
        super()
        this.attachShadow({ mode: "open" })
        this.contentLoader = contentLoader
        this.themeButton = undefined
        this.themeMap = {
            "dark-side": ["dark-theme", "dark-side"],
            "bright-side": ["light-theme", "bright-side"],
        }
        this.toggleThemeHandler = this.toggleTheme.bind(this)
    }
    async loadContent() {
        const templatePath = `/templates/global/theme-button.html`
        const stylePath = `/styles/global/theme-button.css`
        const nonce = `theme-button`
        const { template, style } = await this.contentLoader.loadContent(
            templatePath,
            stylePath,
            nonce
        )

        this.shadowRoot.appendChild(template.content.cloneNode(true))
        this.shadowRoot.appendChild(style)
    }
    get state() {
        return this.getAttribute("state")
    }
    set state(value) {
        return this.setAttribute("state", value)
    }
    attributeChangedCallback(props, oldValue, newValue) {
        if (props === "state") {
            localStorage.setItem("theme", newValue)
        }
    }

    toggleTheme() {
        document.body.classList.remove(...this.themeMap[this.state])

        const stateTransition = {
            "dark-side": "bright-side",
            "bright-side": "dark-side",
        }

        this.state = stateTransition[this.state]

        document.body.classList.add(...this.themeMap[this.state])
    }

    async connectedCallback() {
        const localStorageTheme = localStorage.getItem("theme")
        const validThemes = ["dark-side", "bright-side"]

        this.state = validThemes.includes(localStorageTheme) ? localStorageTheme : "dark-side"

        document.body.classList.add(...this.themeMap[this.state])

        await this.loadContent()

        this.themeButton = this.shadowRoot.getElementById("themeButton")
        this.themeButton.addEventListener("click", () => this.toggleThemeHandler())
    }
    disconnectedCallback() {
        this.themeButton.removeEventListener("click", () => this.toggleThemeHandler())
    }
}

const contentLoaderInstance = ContentLoaderInjector.getInstance()

customElements.define(
    "theme-button",
    class extends ThemeButton {
        constructor() {
            super(contentLoaderInstance)
        }
    }
)
