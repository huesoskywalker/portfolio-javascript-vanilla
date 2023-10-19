import { ContentLoaderInterface } from "../../interfaces/ContentLoaderInterface.js"
import { ContentLoaderInjector } from "../../util/ContentLoaderInjector.js"
import { slotsData } from "../../constants/home/slotsData.js"

class HeaderInfo extends HTMLElement {
    /**
     *
     * @param {ContentLoaderInterface} contentLoader
     */
    constructor(contentLoader) {
        super()
        this.attachShadow({ mode: "open" })
        this.contentLoader = contentLoader
        this.slotsData = slotsData
    }
    async loadContent() {
        const templatePath = "/templates/home/header-info.html"
        const stylePath = "/styles/home/header-info.css"
        const nonce = "header-info"

        const { template, style } = await this.contentLoader.loadContent(
            templatePath,
            stylePath,
            nonce
        )

        this.shadowRoot.appendChild(template.content.cloneNode(true))
        this.shadowRoot.appendChild(style)
    }
    renderSlots() {
        console.log(this.slotsData)
        const fragment = new DocumentFragment()
        this.slotsData.forEach((data) => {
            const element = document.createElement(data.tag)
            element.slot = data.slot
            element.textContent = data.content
            fragment.appendChild(element)
        })
        this.appendChild(fragment)
    }

    async connectedCallback() {
        await this.loadContent()
        this.renderSlots()
    }
}

const contentLoaderInstance = ContentLoaderInjector.getInstance()

customElements.define(
    "header-info",
    class extends HeaderInfo {
        constructor() {
            super(contentLoaderInstance)
        }
    }
)
