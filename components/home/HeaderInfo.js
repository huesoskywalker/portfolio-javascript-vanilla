import { ContentLoaderInterface } from "../../interfaces/ContentLoaderInterface.js"
import { ContentLoaderInjector } from "../../util/ContentLoaderInjector.js"
import { rightHeaderData, leftHeaderData } from "../../constants/home/headerInfoData.js"

class HeaderInfo extends HTMLElement {
    /**
     *
     * @param {ContentLoaderInterface} contentLoader
     */
    constructor(contentLoader) {
        super()
        this.attachShadow({ mode: "open" })
        this.contentLoader = contentLoader
        this.leftHeader = leftHeaderData
        this.rightHeader = rightHeaderData
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
    renderLeftHeader() {
        const leftContainer = this.shadowRoot.getElementById("leftHome")

        const profileImage = document.createElement("img")
        profileImage.src = this.leftHeader.image.src
        profileImage.alt = this.leftHeader.image.alt
        profileImage.srcset = this.leftHeader.image.srcset
        profileImage.width = 170
        profileImage.height = 320
        profileImage.loading = "lazy"

        leftContainer.appendChild(profileImage)
    }
    renderRightHeader() {
        const rightContainer = this.shadowRoot.getElementById("rightHome")

        const fragment = new DocumentFragment()

        this.rightHeader.forEach((data) => {
            const element = document.createElement(data.tag)

            element.classList.add(data.class)
            element.textContent = data.content
            fragment.appendChild(element)
        })

        rightContainer.appendChild(fragment)

        const roadMapComponent = document.createElement("road-map")
        rightContainer.appendChild(roadMapComponent)
    }

    async connectedCallback() {
        await this.loadContent()
        this.renderLeftHeader()
        this.renderRightHeader()
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
