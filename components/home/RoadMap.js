import { ContentLoaderInterface } from "../../interfaces/ContentLoaderInterface.js"
import { ContentLoaderInjector } from "../../util/ContentLoaderInjector.js"

class RoadMap extends HTMLElement {
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
        const templatePath = "/templates/home/road-map.html"
        const stylePath = "/styles/home/road-map.css"
        const nonce = "road-map"

        const { template, style } = await this.contentLoader.loadContent(
            templatePath,
            stylePath,
            nonce
        )
        this.shadowRoot.appendChild(template.content.cloneNode(true))
        this.shadowRoot.appendChild(style)
    }

    toggleRoadMap() {
        const modal = this.shadowRoot.getElementById("myModal")
        modal.classList.toggle("show-modal")
    }

    async connectedCallback() {
        await this.loadContent()

        this.openButton = this.shadowRoot.getElementById("roadMap")
        this.openButton.addEventListener("click", () => this.toggleRoadMap())

        this.closeButton = this.shadowRoot.getElementById("closeModal")
        this.closeButton.addEventListener("click", () => this.toggleRoadMap())
    }
    disconnectedCallback() {
        this.openButton.removeEventListener("click", () => this.toggleRoadMap())
        this.closeButton.removeEventListener("click", () => this.toggleRoadMap())
    }
}

const contentLoaderInstance = ContentLoaderInjector.getInstance()

customElements.define(
    "road-map",
    class extends RoadMap {
        constructor() {
            super(contentLoaderInstance)
        }
    }
)
