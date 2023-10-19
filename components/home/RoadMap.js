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
        this.showRoadMapHandler = this.showRoadMap.bind(this)
        this.closeRoadMapHandler = this.closeRoadMap.bind(this)
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

    showRoadMap() {
        const modal = this.shadowRoot.getElementById("myModal")
        const currentDisplay = modal.style.display

        modal.style.display = currentDisplay === "flex" ? "none" : "flex"
    }
    closeRoadMap() {
        const modal = this.shadowRoot.getElementById("myModal")
        modal.style.display = "none"
    }
    async connectedCallback() {
        await this.loadContent()

        this.openButton = this.shadowRoot.getElementById("roadMap")
        this.openButton.addEventListener("click", () => this.showRoadMapHandler())

        this.closeButton = this.shadowRoot.getElementById("closeModal")
        this.closeButton.addEventListener("click", () => this.closeRoadMapHandler())
    }
    disconnectedCallback() {
        this.openButton.removeEventListener("click", () => this.showRoadMapHandler())
        this.closeButton.removeEventListener("click", () => this.closeRoadMapHandler())
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
