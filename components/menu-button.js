const menuItems = [
    {
        title: "HOME",
        link: "index.html",
        image: "./img/menu/jedi.png",
    },
    {
        title: "ABOUT",
        link: "about.html",
        image: "./img/menu/jedi-order.png",
    },
    {
        title: "PORTFOLIO",
        link: "portfolio.html",
        image: "./img/menu/jedi-new-order.png",
    },
    {
        title: "CONTACT",
        link: "contact.html",
        image: "./img/menu/x-wing.png",
    },
]

class MenuButton extends HTMLElement {
    static get observedAttributes() {
        return ["state"]
    }
    constructor() {
        super()
        this.attachShadow({ mode: "open" })
        this.toggleMenuHandler = this.toggleMenu.bind(this)
        this.showInfo = false
    }
    async loadContent() {
        await Promise.all([
            fetch(`/templates/global/menu-button.html`).then((response) => response.text()),
            fetch(`/styles/global/menu-button.css`).then((response) => response.text()),
        ]).then(([html, css]) => {
            const template = document.createElement("template")
            template.innerHTML = html
            this.shadowRoot.appendChild(template.content.cloneNode(true))
            const style = document.createElement("style")
            style.textContent = css
            this.shadowRoot.appendChild(style)
        })
    }

    renderMenu() {
        const navContainer = this.shadowRoot.getElementById("navContainer")

        const navMenu = document.createElement("ul")
        navMenu.classList.add("nav-menu")

        const fragment = new DocumentFragment()

        menuItems.forEach((item) => {
            const listItem = document.createElement("li")
            listItem.classList.add("nav-menu__item")

            const itemAnchor = document.createElement("a")
            itemAnchor.href = item.link
            itemAnchor.classList.add("nav-menu__link")
            listItem.appendChild(itemAnchor)

            const itemTitle = document.createElement("span")
            itemTitle.classList.add("item-title")
            itemTitle.textContent = item.title
            itemAnchor.appendChild(itemTitle)

            const itemImage = document.createElement("img")
            itemImage.classList.add("item-image")
            itemImage.src = item.image
            itemAnchor.appendChild(itemImage)

            fragment.appendChild(listItem)
        })
        navMenu.appendChild(fragment)
        navContainer.appendChild(navMenu)
    }

    attributeChangedCallback(props, oldValue, newValue) {
        console.log(`attributeChangedCallback`)
        if (props === "state") {
            if (newValue === "hold") {
                alert("Please interact to keep walking")
                const checkbox = this.shadowRoot.getElementById("menuCheckbox")
                checkbox.checked = false
                this.toggleMenuHandler()
            }
        }
    }

    toggleMenu() {
        this.showInfo = !this.showInfo

        const navContainer = this.shadowRoot.getElementById("navContainer")
        const navItems = this.shadowRoot.querySelectorAll(".nav-menu__item")

        if (this.showInfo) {
            navContainer.classList.add("open")
            navItems.forEach((item) => item.classList.add("moveX"))
        } else {
            navContainer.classList.remove("open")
            navItems.forEach((item) => item.classList.remove("moveX"))
        }
    }

    async connectedCallback() {
        await this.loadContent()
        this.renderMenu()
        this.shadowRoot
            .querySelector(".menu-btn")
            .addEventListener("click", () => this.toggleMenuHandler())
    }

    disconnectedCallback() {
        this.shadowRoot.querySelector(".menu-btn").removeEventListener(this.toggleMenuHandler())
    }
}
window.customElements.define("menu-button", MenuButton)
