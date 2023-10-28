import { ContentLoaderInjector } from "../../util/ContentLoaderInjector.js"
import { ContentLoaderInterface } from "../../interfaces/ContentLoaderInterface.js"

class ContactTittle extends HTMLElement {
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
        const templatePath = "/templates/contact/contact-title.html"
        const stylePath = "/styles/contact/contact-title.css"
        const nonce = "contact-title"

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
    "contact-tittle",
    class extends ContactTittle {
        constructor() {
            super(contentLoaderInstance)
        }
    }
)
