import { ContentLoaderInterface } from "../../interfaces/ContentLoaderInterface.js"
import { ContentLoaderInjector } from "../../util/ContentLoaderInjector.js"
import { headerData } from "../../constants/home/headerData.js"

class HeaderInfo extends HTMLElement {
    /**
     *
     * @param {ContentLoaderInterface} contentLoader
     */
    constructor(contentLoader) {
        super()
        this.attachShadow({ mode: "open" })
        this.contentLoader = contentLoader
        this.slotsData = headerData
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
        const rightContainer = this.shadowRoot.getElementById("rightHome")

        const lightFragment = new DocumentFragment()
        const shadowFragment = new DocumentFragment()

        this.slotsData.forEach((data) => {
            const slot = document.createElement("slot")
            slot.name = data.slot
            shadowFragment.appendChild(slot)

            const element = document.createElement(data.tag)
            element.slot = data.slot
            element.textContent = data.content
            lightFragment.appendChild(element)
        })

        rightContainer.insertBefore(shadowFragment, rightContainer.firstChild)
        this.appendChild(lightFragment)
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
