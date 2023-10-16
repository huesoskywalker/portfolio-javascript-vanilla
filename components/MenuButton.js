import { menuItems } from "../constants/menu/menuItems.js"
import { ContentLoader } from "../util/ContentLoader.js"
import { ContentLoaderInjector } from "../util/ContentLoaderInjector.js"

class MenuButton extends HTMLElement {
    static get observedAttributes() {
        return ["state"]
    }
    /**
     * @param {ContentLoader} contentLoader
     */
    constructor(contentLoader) {
        super()
        this.attachShadow({ mode: "open" })
        this.contentLoader = contentLoader
        this.menuItems = menuItems
        this.toggleMenuHandler = this.toggleMenu.bind(this)
        this.menuCheckbox = undefined
        this.navContainer = undefined
    }
    async loadContent() {
        const templatePath = `/templates/global/menu-button.html`
        const stylePath = `/styles/global/menu-button.css`
        const nonce = `menu-button`
        const { template, style } = await this.contentLoader.loadContent(
            templatePath,
            stylePath,
            nonce
        )

        this.shadowRoot.appendChild(template.content.cloneNode(true))
        this.shadowRoot.appendChild(style)
    }

    renderMenu() {
        this.navContainer = this.shadowRoot.getElementById("navContainer")

        const navMenu = document.createElement("ul")
        navMenu.classList.add("nav-menu")

        const fragment = new DocumentFragment()

        this.menuItems.forEach((item) => {
            const listItem = document.createElement("li")
            listItem.classList.add("nav-menu__item")

            const itemLink = document.createElement("a")
            itemLink.href = item.link
            itemLink.classList.add("nav-menu__link")
            listItem.appendChild(itemLink)

            const itemTitle = document.createElement("span")
            itemTitle.classList.add("item-title")
            itemTitle.textContent = item.title
            itemLink.appendChild(itemTitle)

            const itemImage = document.createElement("img")
            itemImage.classList.add("item-image")
            itemImage.src = item.image
            itemImage.loading = "lazy"
            itemLink.appendChild(itemImage)

            fragment.appendChild(listItem)
        })
        navMenu.appendChild(fragment)
        this.navContainer.appendChild(navMenu)
    }

    attributeChangedCallback(props, oldValue, newValue) {
        if (props === "state") {
            if (newValue === "hold") {
                alert("Please interact to keep walking")
                this.menuCheckbox.checked = false
                this.toggleMenuHandler()
            }
        }
    }

    toggleMenu() {
        const navItems = this.navContainer.querySelectorAll(".nav-menu__item")

        this.navContainer.classList.toggle("open")
        navItems.forEach((item) => item.classList.toggle("moveX"))
    }

    async connectedCallback() {
        await this.loadContent()
        this.renderMenu()

        this.menuCheckbox = this.shadowRoot.getElementById("menuCheckbox")
        this.menuCheckbox.addEventListener("click", () => this.toggleMenuHandler())
    }

    disconnectedCallback() {
        this.menuCheckbox.removeEventListener("click", () => this.toggleMenuHandler())
    }
}
const contentLoaderInstance = ContentLoaderInjector.getInstance()

customElements.define(
    "menu-button",
    class extends MenuButton {
        constructor() {
            super(contentLoaderInstance)
        }
    }
)
