import { ContentLoaderInterface } from "../../interfaces/ContentLoaderInterface.js"
import { ContentLoaderInjector } from "../../util/ContentLoaderInjector.js"
import { headerInfoData } from "../../constants/home/headerInfoData.js"

class HeaderInfo extends HTMLElement {
    /**
     *
     * @param {ContentLoaderInterface} contentLoader
     */
    constructor(contentLoader) {
        super()
        this.attachShadow({ mode: "open" })
        this.contentLoader = contentLoader
        this.headerData = headerInfoData
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
    renderData() {
        const rightContainer = this.shadowRoot.getElementById("rightHome")

        const shadowFragment = new DocumentFragment()

        this.headerData.forEach((data) => {
            const element = document.createElement(data.tag)

            element.classList.add(data.class)
            element.textContent = data.content
            shadowFragment.appendChild(element)
        })

        rightContainer.insertBefore(shadowFragment, rightContainer.firstChild)
    }

    async connectedCallback() {
        await this.loadContent()
        this.renderData()
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
