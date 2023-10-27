import { portfolioData } from "../../constants/portfolio/portfolioData.js"
import { ContentLoaderInjectorInterface } from "../../interfaces/ContentLoaderInjectorInterface.js"
import { ContentLoaderInjector } from "../../util/ContentLoaderInjector.js"

class PortfolioItems extends HTMLElement {
    static get observedAttributes() {
        return ["state"]
    }
    /**
     *
     * @param {ContentLoaderInjectorInterface} contentLoader
     */
    constructor(contentLoader) {
        super()
        this.attachShadow({ mode: "open" })
        this.contentLoader = contentLoader
        this.portfolioData = portfolioData
    }
    async loadContent() {
        const templatePath = "/templates/portfolio/portfolio-items.html"
        const stylePath = "/styles/portfolio/portfolio-items.css"
        const nonce = "portfolio-items"

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
            // this should be renamed none or default
            if (newValue === "hide" || newValue === "default") {
                this.portfolioItems.innerHTML = ``
            } else {
                this.renderItems()
            }
        }
    }

    renderItems() {
        const fragment = new DocumentFragment()

        const filteredData = this.portfolioData.filter(({ section }) => section === this.state)

        filteredData.forEach((data) => {
            const item = document.createElement("div")
            item.classList.add("portfolio-item")
            if (data.type.toLocaleLowerCase() === "book") {
                item.classList.add("tall")
            } else {
                item.classList.add("wide")
            }

            const itemImage = document.createElement("img")
            itemImage.classList.add("item-image")
            itemImage.src = data.image.src
            // itemImage.srcset = data.image.srcset
            itemImage.alt = data.image.alt
            itemImage.loading = "lazy"
            item.appendChild(itemImage)

            const itemDescription = document.createElement("div")
            itemDescription.classList.add("item-description")

            const itemTitle = document.createElement("h3")
            itemTitle.classList.add("item-title")
            itemTitle.textContent = data.title
            itemDescription.appendChild(itemTitle)

            const itemLink = document.createElement("a")
            itemLink.classList.add("item-link")
            itemLink.href = data.link
            itemLink.target = "_blank"
            itemLink.textContent = data.author
            itemDescription.appendChild(itemLink)

            item.appendChild(itemDescription)

            fragment.appendChild(item)
        })

        const tempDiv = document.createElement("div")
        tempDiv.appendChild(fragment)

        this.portfolioItems.innerHTML = tempDiv.innerHTML
    }

    async connectedCallback() {
        await this.loadContent()

        this.portfolioItems = this.shadowRoot.getElementById("portfolioContainer")
    }
}

const contentLoaderInstance = ContentLoaderInjector.getInstance()

customElements.define(
    "portfolio-items",
    class extends PortfolioItems {
        constructor() {
            super(contentLoaderInstance)
        }
    }
)
