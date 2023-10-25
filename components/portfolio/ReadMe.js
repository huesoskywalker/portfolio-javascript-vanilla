import { ContentLoaderInterface } from "../../interfaces/ContentLoaderInterface.js"
import { ContentLoaderInjector } from "../../util/ContentLoaderInjector.js"

class ReadMe extends HTMLElement {
    /**
     *
     * @param {ContentLoaderInterface} contentLoader
     */
    constructor(contentLoader) {
        super()
        this.attachShadow({ mode: "open" })
        this.contentLoader = contentLoader
        this.openModal = undefined
        this.closeModal = undefined
    }

    async loadContent() {
        const templatePath = "/templates/portfolio/read-me.html"
        const stylePath = "/styles/portfolio/read-me.css"
        const nonce = "read-me"

        const { template, style } = await this.contentLoader.loadContent(
            templatePath,
            stylePath,
            nonce
        )

        this.shadowRoot.appendChild(template.content.cloneNode(true))
        this.shadowRoot.appendChild(style)
    }
    toggleModal(event) {
        const readMe = this.shadowRoot.getElementById("modal")
        const buttonId = event.target.id

        if (buttonId === "openModal") {
            readMe.showModal()
            readMe.scrollTo({
                top: 0,
            })
        } else {
            readMe.close()
        }
    }
    async connectedCallback() {
        await this.loadContent()

        this.openModal = this.shadowRoot.getElementById("openModal")
        this.openModal.addEventListener("click", (event) => this.toggleModal(event))

        this.closeModal = this.shadowRoot.getElementById("closeModal")
        this.closeModal.addEventListener("click", (event) => this.toggleModal(event))
    }
    disconnectedCallback() {
        this.openModal.removeEventListener("click", () => this.toggleModal())
        this.closeModal.removeEventListener("click", () => this.toggleModal())
    }
}

const contentLoaderInstance = ContentLoaderInjector.getInstance()

customElements.define(
    "read-me",
    class extends ReadMe {
        constructor() {
            super(contentLoaderInstance)
        }
    }
)
