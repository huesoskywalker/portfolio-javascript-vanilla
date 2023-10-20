import { ContentLoaderInterface } from "../../interfaces/ContentLoaderInterface.js"
import { ContentLoaderInjector } from "../../util/ContentLoaderInjector.js"
class AboutLife extends HTMLElement {
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
        const templatePath = "/templates/about/about-life.html"
        const stylePath = "/styles/about/about-life.css"
        const nonce = "about-life"

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
        this.renderContent()
        // const codeAnimation = this.shadowRoot.querySelector(".codeAnim")
    }

    disconnectedCallback() {}
}

const contentLoaderInstance = ContentLoaderInjector.getInstance()

customElements.define(
    "about-life",
    class extends AboutLife {
        constructor() {
            super(contentLoaderInstance)
        }
    }
)
