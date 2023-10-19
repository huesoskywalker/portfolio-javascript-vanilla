import { ContentLoaderInterface } from "../../interfaces/ContentLoaderInterface.js"
import { ContentLoaderInjector } from "../../util/ContentLoaderInjector.js"

class HeaderInfo extends HTMLElement {
    /**
     *
     * @param {ContentLoaderInterface} contentLoader
     */
    constructor(contentLoader) {
        super()
        this.attachShadow({ mode: "open" })
        this.contentLoader = contentLoader
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

    async connectedCallback() {
        await this.loadContent()
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
